/* cSpell:disable */

// Soal 3
var filterBooksPromise = require("./promise2.js");

// Kondisi 1: bukunya berwarna dan jumlah halamannya 40
filterBooksPromise(true, 40).then((data) => {
  console.log(data);
});

// Kondisi 2: bukunya tidak berwarna dan jumlah halamannya 250
const filterTwo = async () => {
  try {
    let book = await filterBooksPromise(false, 250);
    console.log(book);
  } catch (error) {
    console.log(error.message);
  }
}
filterTwo();

// Kondisi 3: bukunya berwarna dan jumlah halamannya 30
const filterThree = async () => {
  try {
    let book = await filterBooksPromise(true, 30);
    console.log(book);
  } catch (error) {
    console.log(error.message);
  }
}
filterThree();