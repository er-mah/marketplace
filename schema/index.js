
const graphql = require('graphql');
const { resolver } = require('graphql-sequelize');

const _ = require('lodash');

const { UserType } = require('../gtypes/UserType');
const { GruposType } = require('../gtypes/GruposType');
const { Tautos30type } = require('../gtypes/Tautos30type');
const { CaracteristicType } = require('../gtypes/CaracteristicType');
const { TechnicalDataType } = require('../gtypes/TechnicalDataType');
const { AdditionalsType } = require('../gtypes/AdditionalsType');
const { PublicationType } = require('../gtypes/PublicationType');
const { PublicationStateType } = require('../gtypes/PublicationStateType');
const { User, Publication, PublicationState } = require('../models').mah;
const {
  tautos30, grupos, extrad, extrad3,
  extrad2,
} = require('../models').tauto;


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

      // BD TAUTO
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
        type: CaracteristicType,
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
      TecnicalData: {
        type: TechnicalDataType,
        args: {
          ex2_codia:
            {
              description: 'El id del auto',
              type: new NotNull(Int),
            },
        },
        resolve: resolver(extrad2, {
          after(result) {
            return {
              Climatizador: result.dataValues.ex2_clima,
              FarosAntiniebla: result.dataValues.ex2_fanti,
              TechoCorredizo: result.dataValues.ex2_tcorr,
              SensorEstacionamiento: result.dataValues.ex2_sesta,
              AirbagLateral: result.dataValues.ex2_alate,
              AirbagCabezaConductor: result.dataValues.ex2_acabe,
              AirbagCortina: result.dataValues.ex2_acort,
              AirbagRodilla: result.dataValues.ex2_arodi,
              FijacionISOFIX: result.dataValues.ex2_isofi,
              ControlDeTraccion: result.dataValues.ex2_ctrac,
              ControlDeEstabilidad: result.dataValues.ex2_cesta,
              ControlDeDescenso: result.dataValues.ex2_cdesc,
              SistemaArranqueEnPendiente: result.dataValues.ex2_sapen,
              ControlDinamicoConduccion: result.dataValues.ex2_cdina,
              BloqueoDiferencial: result.dataValues.ex2_bdife,
              RepartidorElectronicoDeFrenado: result.dataValues.ex2_relef,
              AsistenteDeFrenadoDeEmergencia: result.dataValues.ex2_afree,
              ReguladorParFrenado: result.dataValues.ex2_rparf,
              Largo: result.dataValues.ex2_largo,
              Ancho: result.dataValues.ex2_ancho,
              Alto: result.dataValues.ex2_alto,
            };
          },
        }),
      },
      Additionals: {
        type: AdditionalsType,
        args: {
          ex3_codia:
            {
              description: 'Atributos adicionales del auto',
              type: new NotNull(Int),
            },
        },
        resolve: resolver(extrad3, {
          after(result) {
            return {
              TapizadoCuero: result.dataValues.ex3_tapcu,
              AsientosElectronicos: result.dataValues.ex3_aelec,
              ComputadoraABordo: result.dataValues.ex3_cabor,
              FarosDeXenon: result.dataValues.ex3_fxeno,
              LlantasDeAleacion: result.dataValues.ex3_lalea,
              TechoPanoramico: result.dataValues.ex3_tpano,
              SensorDeLluvia: result.dataValues.ex3_slluv,
              SensorCrepuscular: result.dataValues.ex3_screp,
              IndicadorPresionNeumaticos: result.dataValues.ex3_ipneu,
              VolanteConLevas: result.dataValues.ex3_vleva,
              Bluetooth: result.dataValues.ex3_bluet,
              AsientosTermicos: result.dataValues.ex3_aterm,
              RunFlat: result.dataValues.ex3_rflat,
            };
          },
        }),
      },

      // BD MAH
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
      Publication: {
        type: PublicationType,
        args: {
          id: {
            description: 'id de la publicación',
            type: new NotNull(Int),
          },
        },
        resolve: resolver(Publication),

      },
      AllPublications: {
        type: new List(PublicationType),
        args: {
          user_id: {
            type: Int,
            description: 'El id de un usuario registrado',
          },
          limit: {
            type: Int,
          },
          order: {
            type: Gstring,
          },
        },
        resolve: resolver(Publication),
      },
      PublicationState: {
        type: PublicationStateType,
        args: {
          id: {
            description: ' id de los estados',
            type: new NotNull(Int),
          },
        },
        resolve: resolver(PublicationState),

      },
    },
  }),
});


module.exports = schema;
