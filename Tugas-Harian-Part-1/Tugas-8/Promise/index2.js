/* cSpell:disable */

// Soal 2
var readBooksPromise = require("./promise.js");

var books = [
  { name: "LOTR", timeSpent: 3000 },
  { name: "Fidas", timeSpent: 2000 },
  { name: "Kalkulus", timeSpent: 4000 },
];

const read = async (books) => {
  let timeLeft = 10000;
  for (let i = 0; i < books.length; i++) {
    try {
      let time = await readBooksPromise(timeLeft, books[i]);
      timeLeft = time;
    } catch (error) {
      break;
    }
  }
};

read(books);
