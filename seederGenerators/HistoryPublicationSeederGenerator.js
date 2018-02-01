const moment = require('moment');
const casual = require('casual');
const fs = require('fs');

const array = [];
for (let i = 1; i < 14001; i += 1) {
  const casualObj = {
    publication_id: i,
    publicationState_id: casual.random_value({
      a: 2, b: 3, c: 5, d: 9,
    }),
    createdAt: moment().add(casual.integer(from = 0, to = 1000) ,'days').format("YYYY-MM-DD hh:mm:ss"),
    updatedAt: moment().add(casual.integer(from = 1001, to = 2000) ,'days').format("YYYY-MM-DD hh:mm:ss"),
    active: true,
  };
  array.push(casualObj);
}

fs.writeFile('./seederGenerators/results/historyAndStateOfPublicationObjs.js', JSON.stringify(array), (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('The file was saved!');
});
