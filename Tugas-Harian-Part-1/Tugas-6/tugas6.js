/* cSpell:disable */

// Soal 1
const luasLingkaran = (radius) => Math.PI * Math.pow(radius, 2);
const kelilingLingkaran = (radius) => 2 * Math.PI * radius;

console.log('----- Soal 1 -----');
console.log(luasLingkaran(7));
console.log(kelilingLingkaran(7));

// Soal 2
const introduce = (...args) => {
  let prefix = "Bu";
  if (args[2] === "Laki-Laki") {
    prefix = "Pak";
  }

  return `${prefix} ${args[0]} adalah seorang ${args[3]} yang berusia ${args[1]} tahun`;
};

const perkenalan = introduce("John", "30", "Laki-Laki", "penulis");
console.log('\n----- Soal 2 -----');
console.log(perkenalan);

// Soal 3
const newFunction = (firstName, lastName) => {
  return {
    firstName,
    lastName,
    fullName: function () {
      console.log(`${firstName} ${lastName}`);
    },
  };
};

console.log('\n----- Soal 3 -----')
console.log(newFunction("John", "Doe").firstName);
console.log(newFunction("Richard", "Roe").lastName);
newFunction("William", "Imoh").fullName();

// Soal 4
let phone = {
  name: "Galaxy Note 20",
  brand: "Samsung",
  year: 2020,
  colors: ["Mystic Bronze", "Mystic White", "Mystic Black"]
}

const {name, brand, year, colors} = phone;
const [colorBronze, , colorBlack] = colors;
const [phoneName, phoneBrand] = [name, brand];

console.log('\n----- Soal 4 -----');
console.log(phoneBrand, phoneName, year, colorBlack, colorBronze)

// Soal 5
let warna = ["biru", "merah", "kuning" , "hijau"]

let dataBukuTambahan= {
  penulis: "john doe",
  tahunTerbit: 2020 
}

let buku = {
  nama: "pemograman dasar",
  jumlahHalaman: 172,
  warnaSampul:["hitam"]
}
buku.warnaSampul = [...buku.warnaSampul, ...warna]

const dataBuku = {...buku, ...dataBukuTambahan}

console.log('\n----- Soal 5 -----');
console.log(dataBuku);