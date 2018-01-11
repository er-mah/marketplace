const moment = require('moment');
const casual = require('casual');
const fs = require('fs');

const array = [];
for (let i = 0; i < 400; i += 1) {
  const casualObj = {
    brand: casual.random_value({
      a: 'Citroen', b: 'BMW', c: 'Mercedez Benz', d: 'Audi', e: 'Chevrolet',
    }),
    group: casual.full_name,
    modelName: casual.string,
    kms: casual.integer(from = 2, to = 1000000),
    price: casual.integer(from = 10000, to = 1000000),
    year: casual.year,
    fuel: casual.word,
    observation: casual.sentences(n = 3),
    carState: 'Usado',
    imageGroup_id: 1,
    createdAt: moment().format('YYYY-MM-DD'),
    updatedAt: moment().format('YYYY-MM-DD'),
    deletedAt: null,
    user_id: casual.integer(from = 1, to = 2),
    publicationDetail_id: casual.integer(from = 1, to = 15),
  };
  array.push(casualObj);
}

fs.writeFile('./seederGenerators/results/publicationSeederObj.js', JSON.stringify(array), (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('The file was saved!');
});
