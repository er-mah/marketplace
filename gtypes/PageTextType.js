const { attributeFields } = require('graphql-sequelize');
const _ = require('lodash');
const graphql = require('graphql');
const { PageTexts } = require('../models').mah;

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
      MAHtoken: { tpye: new NotNull(Gstring) },
      section: { type: new NotNull(Gstring) },
      text: { type: Gstring },
      resolve: (_nada, args) => {
        console.log('hola');
      },
    },
  },
};

module.exports = { PageTextsType, PageTextMutations };
