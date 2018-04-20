const { attributeFields } = require('graphql-sequelize');
const _ = require('lodash');
const { UserError } = require('graphql-errors');
const graphql = require('graphql');
const { User } = require('../models').mah;
const jwtDecode = require('jwt-decode');
const bcrypt = require('bcrypt-nodejs');

const {
  Publication,
  CommentThread,
  sequelize,
} = require('../models').mah;


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
  fields: _.assign(attributeFields(User)),
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
      name: { type: Gstring },
      address: { type: Gstring },
      phone: { type: Gstring },
    },
    resolve: (value, {
      name, address, phone, MAHtoken,
    }) => {
      const userId = jwtDecode(MAHtoken).id;
      return User.findById(userId)
        .then((us) => {
          if (!us) {
            throw new UserError('El usuario no existe.');
          } else {
            const UpdateData = {};
            if (name) { UpdateData.name = name; }
            if (address) { UpdateData.address = address; }
            if (phone) { UpdateData.phone = phone; }
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
      return User.findById(userId)
        .then((us) => {
          if (!us) {
            throw new UserError('El usuario no existe.');
          } else if (!us.validPassword(oldPassword, us.password)) {
            throw new UserError('La contraseña actual no es correcta.');
          } else {
            const newPass = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(8), null);
            return us.update({
              password: newPass,
            }).then(() => 'Contraseña actualizada con éxito.');
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
    resolve: (value, { oldPassword, newPassword }) => User.findOne({ where: { password: oldPassword } })
      .then((us) => {
        if (!us) {
          throw new UserError('Este link ya no es válido.');
        } else {
          const newPass = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(8), null);
          return us.update({
            password: newPass,
          }).then(() => 'Contraseña actualizada con éxito.');
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
      return User.findById(userId)
        .then((usr) => {
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
                  Publication.destroy({ where: { user_id: us.id } })
                    .then(() => CommentThread.destroy({ where: { [Op.or]: [{ participant1_id: us.id }, { participant2_id: us.id }] } })
                      .then(() => {
                        us.destroy()
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
    type: SearchUserResultType,
    description: 'Busca un usuario por mail o nombre',
    args: {
      text: { type: new NotNull(Gstring) },
    },
    resolve: (_,args)=>{
      args.text += '%';
      const {Op} = sequelize;
      return User.findAndCountAll({where:{[Op.or]: {email:{ [Op.iLike]: args.text }, name: { [Op.iLike]: args.text }}}})
      .then((res) => {
        const result = {};
        result.hasNextPage = res.count > res.rows.length && res.rows.length !== 0;
        result.totalCount = res.count;
        result.Users = res.rows;
        return result;
      });
    }
  },
};

module.exports = {
  UserType, UserMutations, SearchUserResultType, SearchResumeType,
};
