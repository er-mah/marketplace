const { attributeFields, resolver } = require('graphql-sequelize');
const _ = require('lodash');
const { UserError } = require('graphql-errors');
const graphql = require('graphql');
const { User, PublicationState } = require('../../../../models/index.js').mah;
const jwtDecode = require('jwt-decode');


// TODO CHANGE THIS LIBRARY -> bcrypt or bcryptjs
const bcrypt = require('bcrypt-nodejs');
const { ProvincesType } = require('./ProvincesType.js');
const { TownType } = require('./TownType');
const { Publication, CommentThread, sequelize } = require('../../../../models/index.js').mah;

const {
  GraphQLObjectType: ObjectGraph,
  GraphQLString: Gstring,
  GraphQLNonNull: NotNull,
  GraphQLBoolean: Gboolean,
  GraphQLList: List,
  GraphQLInt: Int,
} = graphql;

const UserType = new ObjectGraph({
  name: 'User',
  description: 'Usuario que puede ser agencia o un usuario común',
  fields: _.assign(
    attributeFields(User),
    {
      Province: {
        type: ProvincesType,
        resolve: resolver(User.Province),
      },
    },
    {
      Town: {
        type: TownType,
        resolve: resolver(User.Town),
      },
    },
  ),
});
const UserTypeWithResume = new ObjectGraph({
  name: 'UserResume',
  description: 'Resumen del usuario con campos con publicaciones y su estado',
  fields: _.assign(attributeFields(User), {
    Pendiente: { name: 'Pendiente', type: Int },
    Destacada: { name: 'Destacada', type: Int },
    Suspendida: { name: 'Suspendida', type: Int },
    Publicada: { name: 'Publicada', type: Int },
  }),
});

const SearchResumeType = new ObjectGraph({
  name: 'SearchResume',
  fields: {
    Users: { type: List(UserTypeWithResume) },
    totalCount: { type: Int },
    hasNextPage: { type: Gboolean },
  },
});

const SearchUserResultType = new ObjectGraph({
  name: 'SearchUserResult',
  fields: {
    Users: { type: List(UserType) },
    totalCount: { type: Int },
    hasNextPage: { type: Gboolean },
  },
});

const UserMutations = {
  modifyUserData: {
    type: UserType,
    description: 'Modifica los datos de un usuario',
    args: {
      MAHtoken: { type: new NotNull(Gstring) },
      userId: { type: Int },
      name: { type: Gstring },
      address: { type: Gstring },
      phone: { type: Gstring },
      agencyName: { type: Gstring },
      agencyAdress: { type: Gstring },
      agencyEmail: { type: Gstring },
      agencyPhone: { type: Gstring },
      province_id: { type: Int },
      town_id: { type: Int },
      state: { type: Gstring, description: 'Solo puede ser los strings Pendiente, Aprobado, Rechazado' },
    },
    resolve: (value, {
      userId, MAHtoken, ...updateData
    }) => {
      if (userId) {
        const adminId = jwtDecode(MAHtoken).id;
        return User.findById(adminId).then((us) => {
          if (!us.isAdmin) {
            throw new UserError('Solo los administradores pueden modificar datos de otro usuario.');
          } else {
            return User.findById(userId)
              .then(() => {
                if (!us) {
                  throw new UserError('El usuario no existe.');
                } else {
                  return us.update(updateData).then(usUp => usUp);
                }
              });
          }
        });
      }
      const user_id = jwtDecode(MAHtoken).id;
      return User.findById(user_id).then((us) => {
        if (!us) {
          throw new UserError('El usuario no existe.');
        } else {
          const UpdateData = {};
          if (name) {
            UpdateData.name = name;
          }
          if (address) {
            UpdateData.address = address;
          }
          if (phone) {
            UpdateData.phone = phone;
          }
          if (agencyName) {
            UpdateData.agencyName = agencyName;
          }
          if (agencyAdress) {
            UpdateData.agencyAdress = agencyAdress;
          }
          if (agencyEmail) {
            UpdateData.agencyEmail = agencyEmail;
          }
          if (agencyPhone) {
            UpdateData.agencyPhone = agencyPhone;
          }
          if (province_id) {
            UpdateData.province_id = province_id;
          }
          if (town_id) {
            UpdateData.town_id = town_id;
          }
          return us.update(UpdateData).then(usUp => usUp);
        }
      });
    },
  },
  updatePassword: {
    type: Gstring,
    args: {
      MAHtoken: { type: new NotNull(Gstring) },
      oldPassword: { type: new NotNull(Gstring) },
      newPassword: { type: new NotNull(Gstring) },
    },
    resolve: (value, { MAHtoken, oldPassword, newPassword }) => {
      const userId = jwtDecode(MAHtoken).id;
      return User.findById(userId).then((us) => {
        if (!us) {
          throw new UserError('El usuario no existe.');
        } else if (!us.validPassword(oldPassword, us.password)) {
          throw new UserError('La contraseña actual no es correcta.');
        } else {
          const newPass = bcrypt.hashSync(
            newPassword,
            bcrypt.genSaltSync(8),
            null,
          );
          return us
            .update({
              password: newPass,
            })
            .then(() => 'Contraseña actualizada con éxito.');
        }
      });
    },
  },
  resetPassword: {
    type: Gstring,
    args: {
      oldPassword: { type: new NotNull(Gstring) },
      newPassword: { type: new NotNull(Gstring) },
    },
    resolve: (value, { oldPassword, newPassword }) =>
      User.findOne({ where: { password_hash: oldPassword } }).then((us) => {
        if (!us) {
          throw new UserError('Este link ya no es válido.');
        } else {
          const newPass = bcrypt.hashSync(
            newPassword,
            bcrypt.genSaltSync(8),
            null,
          );
          return us
            .update({
              password: newPass,
            })
            .then(() => 'Contraseña actualizada con éxito.');
        }
      }),
  },
  deleteUser: {
    type: Gboolean,
    args: {
      MAHtoken: { type: new NotNull(Gstring) },
      userId: { type: new NotNull(Int) },
    },
    resolve: (_nada, args) => {
      const userId = jwtDecode(args.MAHtoken).id;
      const { Op } = sequelize;
      return User.findById(userId).then((usr) => {
        if (!usr.isAdmin) {
          throw new UserError('Solo los administradores pueden realizar esta acción');
        } else {
          return User.findById(args.userId)
            .then((us) => {
              if (!us) {
                throw new UserError('Este usuario no existe.');
              } else {
                if (us.isAdmin) {
                  throw new UserError('Para eliminar un administrador contáctese con el proveedor del servicio (info@as-one.com.ar)');
                }
                Publication.destroy({ where: { user_id: us.id } }).then(() =>
                  CommentThread.destroy({
                    where: {
                      [Op.or]: [
                        { participant1_id: us.id },
                        { participant2_id: us.id },
                      ],
                    },
                  }).then(() => {
                    us
                      .destroy()
                      .then(() => true)
                      .catch(error => error);
                  }));
              }
            })
            .catch(err => err);
        }
      });
    },
  },
  searchUser: {
    type: SearchResumeType,
    description: 'Busca un usuario por mail o nombre',
    args: {
      text: { type: new NotNull(Gstring) },
      userType: { type: Gstring },
    },
    resolve: (_, args) => {
      args.text += '%';
      const { Op } = sequelize;
      const options = {};
      options.where = {
        [Op.or]: {
          email: { [Op.iLike]: args.text },
          name: { [Op.iLike]: args.text },
        },
        [Op.and]: {},
      };
      if (args.userType) {
        if (args.userType === 'Agencia') {
          options.where[Op.and] = Object.assign(
            options.where[Op.and],
            { isAgency: true, isAdmin: false },
          );
        } else {
          options.where[Op.and] = Object.assign(
            options.where[Op.and],
            { isAgency: false },
          );
        }
      }
      return User.findAndCountAll(options).then((res) => {
        const getStatics = (stateName, user) =>
          Publication.count({
            where: { user_id: user.id },
            include: [
              {
                model: PublicationState,
                where: {
                  stateName,
                },
                through: { where: { active: true } },
              },
            ],
          }).then(t => (user[stateName] = t));
        const PromiseArray = res.rows.map(user =>
          getStatics('Pendiente', user)
            .then(() => getStatics('Suspendida', user))
            .then(() => getStatics('Publicada', user))
            .then(() => getStatics('Destacada', user)));
        return Promise.all(PromiseArray).then(() => {
          const result = {};
          result.hasNextPage =
            res.count > res.rows.length && res.rows.length !== 0;
          result.totalCount = res.count;
          result.Users = res.rows;
          return result;
        });
      });
    },
  },
};

module.exports = {
  UserType,
  UserMutations,
  SearchUserResultType,
  SearchResumeType,
};
