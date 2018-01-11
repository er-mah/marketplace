const moment = require('moment');
const casual = require('casual');
const fs = require('fs');

const array = [];
for (let i = 1; i < 401; i += 1) {
  const casualObj = {
    publication_id: i,
    publicationState_id: casual.random_value({
      a: 2, b: 3, c: 5, d: 9,
    }),
    createdAt: moment().format('YYYY-MM-DD'),
    updatedAt: moment().format('YYYY-MM-DD'),
  };
  array.push(casualObj);
}

fs.writeFile('./seederGenerators/results/historyAndStateOfPublicationObjs.js', JSON.stringify(array), (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('The file was saved!');
});
