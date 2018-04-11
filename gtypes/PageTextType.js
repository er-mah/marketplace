const { UserError } = require('graphql-errors');
const decode = require('jwt-decode');
const { attributeFields } = require('graphql-sequelize');
const _ = require('lodash');
const graphql = require('graphql');
const { PageTexts, User } = require('../models').mah;

const {
  GraphQLObjectType: ObjectGraph,
  GraphQLNonNull: NotNull,
  GraphQLInt: Int,
  GraphQLBoolean: Gboolean,
  GraphQLString: Gstring,
} = graphql;

const PageTextsType = new ObjectGraph({
  name: 'TextosDePagina',
  description: 'Textos de página editables por el administrador',
  fields: _.assign(attributeFields(PageTexts)),
});

const PageTextMutations = {
  updateText: {
    type: PageTextsType,
    name: 'updateText',
    description: 'Usado para modificar los textos de las páginas',
    args: {
      MAHtoken: { type: new NotNull(Gstring) },
      section: { type: new NotNull(Gstring) },
      route: { type: new NotNull(Gstring) },
      text: { type: new NotNull(Gstring) },
    },
    resolve: (_nada, args) => {
      const userID = decode(args.MAHtoken).id;
      return User.findById(userID)
        .then((usr) => {
          if (!usr.isAdmin) {
            throw new UserError('Solo los administradores pueden editar');
          }
          return PageTexts.findOne({ where: { route: args.route, section: args.section } })
            .then(pt => pt.update({
              text: args.text,
            })
              .then(ptUpdated => ptUpdated));
        });
    },
  },
};
module.exports = { PageTextsType, PageTextMutations };
