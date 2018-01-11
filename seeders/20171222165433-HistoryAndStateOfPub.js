
const moment = require('moment');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('HistoryStates', [{
    publication_id: 1, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 2, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 3, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 4, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 5, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 6, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 7, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 8, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 9, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 10, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 11, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 12, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 13, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 14, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 15, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 16, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 17, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 18, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 19, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 20, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 21, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 22, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 23, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 24, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 25, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 26, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 27, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 28, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 29, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 30, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 31, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 32, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 33, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 34, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 35, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 36, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 37, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 38, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 39, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 40, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 41, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 42, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 43, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 44, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 45, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 46, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 47, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 48, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 49, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 50, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 51, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 52, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 53, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 54, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 55, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 56, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 57, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 58, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 59, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 60, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 61, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 62, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 63, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 64, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 65, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 66, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 67, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 68, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 69, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 70, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 71, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 72, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 73, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 74, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 75, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 76, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 77, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 78, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 79, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 80, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 81, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 82, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 83, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 84, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 85, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 86, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 87, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 88, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 89, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 90, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 91, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 92, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 93, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 94, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 95, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 96, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 97, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 98, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 99, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 100, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 101, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 102, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 103, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 104, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 105, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 106, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 107, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 108, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 109, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 110, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 111, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 112, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 113, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 114, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 115, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 116, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 117, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 118, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 119, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 120, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 121, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 122, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 123, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 124, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 125, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 126, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 127, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 128, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 129, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 130, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 131, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 132, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 133, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 134, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 135, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 136, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 137, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 138, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 139, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 140, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 141, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 142, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 143, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 144, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 145, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 146, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 147, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 148, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 149, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 150, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 151, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 152, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 153, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 154, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 155, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 156, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 157, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 158, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 159, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 160, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 161, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 162, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 163, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 164, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 165, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 166, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 167, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 168, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 169, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 170, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 171, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 172, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 173, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 174, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 175, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 176, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 177, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 178, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 179, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 180, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 181, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 182, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 183, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 184, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 185, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 186, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 187, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 188, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 189, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 190, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 191, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 192, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 193, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 194, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 195, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 196, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 197, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 198, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 199, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 200, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 201, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 202, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 203, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 204, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 205, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 206, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 207, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 208, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 209, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 210, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 211, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 212, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 213, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 214, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 215, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 216, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 217, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 218, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 219, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 220, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 221, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 222, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 223, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 224, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 225, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 226, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 227, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 228, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 229, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 230, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 231, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 232, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 233, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 234, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 235, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 236, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 237, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 238, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 239, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 240, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 241, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 242, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 243, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 244, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 245, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 246, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 247, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 248, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 249, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 250, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 251, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 252, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 253, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 254, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 255, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 256, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 257, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 258, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 259, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 260, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 261, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 262, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 263, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 264, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 265, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 266, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 267, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 268, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 269, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 270, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 271, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 272, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 273, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 274, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 275, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 276, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 277, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 278, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 279, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 280, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 281, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 282, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 283, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 284, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 285, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 286, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 287, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 288, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 289, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 290, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 291, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 292, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 293, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 294, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 295, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 296, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 297, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 298, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 299, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 300, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 301, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 302, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 303, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 304, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 305, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 306, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 307, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 308, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 309, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 310, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 311, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 312, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 313, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 314, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 315, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 316, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 317, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 318, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 319, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 320, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 321, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 322, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 323, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 324, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 325, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 326, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 327, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 328, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 329, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 330, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 331, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 332, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 333, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 334, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 335, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 336, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 337, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 338, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 339, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 340, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 341, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 342, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 343, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 344, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 345, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 346, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 347, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 348, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 349, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 350, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 351, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 352, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 353, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 354, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 355, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 356, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 357, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 358, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 359, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 360, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 361, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 362, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 363, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 364, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 365, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 366, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 367, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 368, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 369, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 370, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 371, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 372, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 373, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 374, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 375, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 376, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 377, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 378, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 379, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 380, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 381, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 382, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 383, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 384, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 385, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 386, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 387, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 388, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 389, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 390, publicationState_id: 9, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 391, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 392, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 393, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 394, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 395, publicationState_id: 2, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 396, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 397, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 398, publicationState_id: 5, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 399, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }, {
    publication_id: 400, publicationState_id: 3, createdAt: '2018-01-11', updatedAt: '2018-01-11',
  }], {}),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
