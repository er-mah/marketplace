
const graphql = require('graphql');
const { resolver } = require('graphql-sequelize');

const _ = require('lodash');

const { UserType } = require('../gtypes/UserType');
const { GruposType } = require('../gtypes/GruposType');
const { Tautos30type } = require('../gtypes/Tautos30type');
const { ExtradType } = require('../gtypes/ExtradType');
const { User } = require('../models').mah;
const { tautos30, grupos, extrad } = require('../models').tauto;


const {
  GraphQLSchema: Schema,
  GraphQLList: List,
  GraphQLNonNull: NotNull,
  GraphQLObjectType: ObjectGraph,
  GraphQLInt: Int,
  GraphQLString: Gstring,
} = graphql;

const schema = new Schema({
  query: new ObjectGraph({
    name: 'Root',
    fields: {
      User: {
        type: UserType,
        // args will automatically be mapped to `where`
        args: {
          id: {
            description: 'id of the user',
            type: new NotNull(Int),
          },
        },
        resolve: resolver(User),
      },
      AllUsers: {
        type: new List(UserType),
        args: {
          limit: {
            type: Int,
          },
          order: {
            type: Gstring,
          },
        },
        resolve: resolver(User),
      },
      AllBrands: {
        type: new List(Tautos30type),
        args: {
          limit: {
            type: Int,
          },
          order: {
            type: Gstring,
          },
          distinct: {
            type: Gstring,
          },
        },
        resolve: resolver(tautos30, {
          before: (options) => {
            options.attributes = ['ta3_marca', 'ta3_nmarc'];
            return options;
          },
          after(result) {
            const brand = [];
            result.map((row) => {
              if (row.ta3_marca !== '') {
                brand.push(row);
              }
              return false;
            });
            return (_.uniqBy(brand, 'ta3_marca'));
          },
        }),

      },
      Group: {
        type: List(GruposType),
        args: {
          gru_nmarc: {
            description: 'id de la marca (ta3_nmarc pero gru_nmarc)',
            type: new NotNull(Int),
          },
        },
        resolve: resolver(grupos),
      },
      Models: {
        type: List(Tautos30type),
        args: {
          ta3_nmarc: {
            description: 'Id de la marca',
            type: new NotNull(Int),
          },
          ta3_cgrup: {
            description: 'Id del grupo',
            type: new NotNull(Int),
          },
        },
        resolve: resolver(tautos30, {
          before: (options) => {
            options.attributes = ['ta3_model', 'ta3_codia'];
            return options;
          },
        }),
      },
      Price: {
        type: List(new ObjectGraph({
          name: 'precios',
          fields: {
            anio: { type: graphql.GraphQLInt },
            precio: { type: graphql.GraphQLInt },
          },
        })),
        args: {
          ta3_codia: {
            description: 'id del auto',
            type: new NotNull(Int),
          },
        },
        resolve: resolver(tautos30, {
          after: (result) => {
            const precios = [];
            let actualYear = parseInt(result[0].ta3_anioe, 10);
            Object.keys(result[0].dataValues).map((row) => {
              if (row.startsWith('ta3_pre')) {
                const priceRow = {};
                priceRow.anio = actualYear;
                priceRow.precio = parseInt(`${result[0].dataValues[row]}000`, 10);
                actualYear -= 1;
                precios.push(priceRow);
              }
            });
            if (precios[0].precio === 0) {
              for (let i = 0; i < 31; i += 1) {
                if (precios[i].precio !== 0) {
                  for (let j = i; j >= 0; j -= 1) {
                    precios[j].precio = precios[i].precio;
                  }
                  break;
                }
              }
            }
            return (precios);
          },
        }),
      },
      Caracteristics: {
        type: new ObjectGraph({
          name: 'Caracteristicas',
          fields: {
            Combustible: { type: Gstring },
            Alimentacion: { type: Gstring },
            Motor: { type: Gstring },
            Puertas: { type: graphql.GraphQLInt },
            Clasificacion: { type: Gstring },
            Cabina: { type: Gstring },
            Carga: { type: Gstring },
            PesoTotal: { type: Gstring },
            VelocidadMax: { type: Gstring },
            Potencia: { type: Gstring },
            Direccion: { type: Gstring },
            AireAcondicionado: { type: Gstring },
            Traccion: { type: Gstring },
            Importado: { type: Gstring },
            Caja: { type: Gstring },
            FrenosAbs: { type: Gstring },
            AirBag: { type: Gstring },
          },
        }),
        args: {
          ext_codia:
            {
              description: 'El id del auto',
              type: new NotNull(Int),
            },
        },
        resolve: resolver(extrad, {
          after(result) {
            return {
              Combustible: result.dataValues.ext_combu,
              Alimentacion: result.dataValues.ext_alime,
              Motor: result.dataValues.ext_motor,
              Puertas: result.dataValues.ext_puert,
              Clasificacion: result.dataValues.ext_clasi,
              Cabina: result.dataValues.ext_cabin,
              Carga: result.dataValues.ext_carga,
              PesoTotal: result.dataValues.ext_pesot,
              VelocidadMax: result.dataValues.ext_veloc,
              Potencia: result.dataValues.ext_poten,
              Direccion: result.dataValues.ext_direc,
              AireAcondicionado: result.dataValues.ext_airea,
              Traccion: result.dataValues.ext_tracc,
              Importado: result.dataValues.ext_impor,
              Caja: result.dataValues.ext_cajav,
              FrenosAbs: result.dataValues.ext_frabs,
              AirBag: result.dataValues.ext_airba,
            };
          },
        }),
      },
    },
  }),
});


module.exports = schema;
