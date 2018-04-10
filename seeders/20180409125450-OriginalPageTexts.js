

const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('PageTexts', [
    {
      route: 'home',
      section: 'title1',
      text: 'Cambia la forma de comprar o vender tu auto',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),

    },
    {
      route: 'home',
      section: 'title2',
      text: 'Créditos Prendarios',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'home',
      section: 'title3',
      text: 'Personal Shopper',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'home',
      section: 'title4',
      text: 'Créditos de libre destino',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'home',
      section: 'text2',
      text: 'Créditos a tu medida, a las tazas más bajas y hasta con 60 meses de plazo.',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'home',
      section: 'text3',
      text: '¿Cansado de buscar? Te ayudamos a buscar un auto a tu medida asesorándote en cada proceso.',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'home',
      section: 'text4',
      text: 'Hacé con tu préstamo lo que desees y lo que siempre soñaste.',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'pledgeCredits',
      section: 'title1',
      text: 'Llegó el momento de cambiar tu auto!',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'pledgeCredits',
      section: 'text1',
      text: 'Con nuestros planes de financiación lo harás de manera más fácil y rápida.',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'pledgeCredits',
      section: 'title2',
      text: '¿COMO?',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'pledgeCredits',
      section: 'text2',
      text: 'Comprando tu auto en miautohoy.com financiamos tu usado o 0km hasta en un 60% de su valor.',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'pledgeCredits',
      section: 'title3',
      text: '¿QUÉ NECESITAMOS?.',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'pledgeCredits',
      section: 'text3',
      text: 'Sólo con tu DNI.',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'pledgeCredits',
      section: 'text4',
      text: 'Elegí el monto que desees que te financien (*), la cantidad de cuotas (*2), y enterate de cuanto pagarías por mes. (*3,4,5 y 6)',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'pledgeCredits',
      section: 'text5',
      text: `(*) Monto mínimo de $10.000 y máximo de $500.000.

      (*2) Cuotas mínimas de 6 meses y máximas de 60 meses.
      
      (*3) Información valor cuota promedio.
      
      (*4) Incluye cuota pura, gastos administrativos e IVA.
      
      (*5) No incluye seguro del vehículo.
      
      (*6) Corresponde a simulación financiera. El presente cálculo es meramente indicativo, pudiendo variar en función del monto y plazo solicitado. El mismo no implica oferta de crédito ni aceptación de la solicitud de crédito. El efectivo otorgamiento está sujeto está sujeto al análisis que realice la institución de la aptitud crediticia del solicitante. CFTNA máximo: 66%`,

      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'personalShopperS1',
      section: 'title1',
      text: '¿Cansado de buscar?',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'personalShopperS1',
      section: 'text1',
      text: 'En simples pasos contanos lo que buscás y nosotros lo buscamos por vos.',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'freeDestinationCredits',
      section: 'title1',
      text: 'No hace falta que vendas tu auto!',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'freeDestinationCredits',
      section: 'text1',
      text: 'Usalo de garantía, solicitá un préstamo y usa el dinero para lo que vos quieras.',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'freeDestinationCredits',
      section: 'title2',
      text: '¿COMO?',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'freeDestinationCredits',
      section: 'text2',
      text: 'Completa los datos a continuación y un asesor se pondrá en contacto con vos a la brevedad.',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'freeDestinationCredits',
      section: 'title3',
      text: '¿QUÉ NECESITAMOS?',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },
    {
      route: 'freeDestinationCredits',
      section: 'text3',
      text: 'Sólo con tu DNI.',
      createdAt: moment().format('YYYY-MM-DD'),
      updatedAt: moment().format('YYYY-MM-DD'),
    },

  ], {}),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
