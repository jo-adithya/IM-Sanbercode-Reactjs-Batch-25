/* cSpell:disable */

// Soal 1
var readBooks = require("./callback.js");

var books = [
  { name: "LOTR", timeSpent: 3000 },
  { name: "Fidas", timeSpent: 2000 },
  { name: "Kalkulus", timeSpent: 4000 },
  { name: "komik", timeSpent: 1000 },
];

const execute = (books, i = 0, initialTime = 10000) => {
  if (books.length > i){
    if (initialTime - books[i].timeSpent >= 0) {
      readBooks(initialTime, books[i], (time) => {
        execute(books, i + 1, time);
      });
    } else {
      readBooks(initialTime, books[i], (time) => {});
      return;
    }
  }
};

execute(books);
