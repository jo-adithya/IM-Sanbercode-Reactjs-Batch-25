/* cSpell:disable */

// Soal 1
var kataPertama = 'saya';
var kataKedua = 'senang';
var kataKetiga = 'belajar';
var kataKeempat = 'javascript';

console.log(
    kataPertama.concat(
        ' ',
        kataKedua[0].toUpperCase(),
        kataKedua.substr(1),
        ' ',
        kataKetiga.substring(0, kataKetiga.length - 1),
        kataKetiga[kataKetiga.length - 1].toUpperCase(),
        ' ',
        kataKeempat.toUpperCase()
    )
);

// Soal 2
var panjangPersegiPanjang = '8';
var lebarPersegiPanjang = '5';

var alasSegitiga = '6';
var tinggiSegitiga = '7';

var kelilingPersegiPanjang =
    2 * (parseFloat(panjangPersegiPanjang) + parseFloat(lebarPersegiPanjang));
var luasSegitiga = 0.5 * parseFloat(alasSegitiga) * parseFloat(tinggiSegitiga);

console.log(kelilingPersegiPanjang, luasSegitiga);

// Soal 3
var sentences = 'wah javascript itu keren sekali';

var firstWord = sentences.substring(0, 3);
var secondWord = sentences.substr(4, 10); // do your own!
var thirdWord = sentences.substr(15, 3); // do your own!
var fourthWord = sentences.substr(19, 5); // do your own!
var fifthWord = sentences.substr(25, 6); // do your own!

console.log('Kata Pertama: ' + firstWord);
console.log('Kata Kedua: ' + secondWord);
console.log('Kata Ketiga: ' + thirdWord);
console.log('Kata Keempat: ' + fourthWord);
console.log('Kata Kelima: ' + fifthWord);

// Soal 4
var nilaiJohn = 80;
var nilaiDoe = 50;

var indexJohn =
    nilaiJohn >= 80
        ? 'A'
        : nilaiJohn >= 70
        ? 'B'
        : nilaiJohn >= 60
        ? 'C'
        : nilaiJohn >= 50
        ? 'D'
        : 'E';

var indexDoe =
    nilaiDoe >= 80
        ? 'A'
        : nilaiDoe >= 70
        ? 'B'
        : nilaiDoe >= 60
        ? 'C'
        : nilaiDoe >= 50
        ? 'D'
        : 'E';

console.log(indexJohn, indexDoe);

// Soal 5
var tanggal = 17;
var bulan = 7;
var tahun = 2003;

switch (bulan) {
    case 1:
        bulan = ' Januari ';
        break;
    case 2:
        bulan = ' Februari ';
        break;
    case 3:
        bulan = ' Maret ';
        break;
    case 4:
        bulan = ' April ';
        break;
    case 5:
        bulan = ' Mei ';
        break;
    case 6:
        bulan = ' Juni ';
        break;
    case 7:
        bulan = ' Juli ';
        break;
    case 8:
        bulan = ' Agustus ';
        break;
    case 9:
        bulan = ' September ';
        break;
    case 10:
        bulan = ' Oktober ';
        break;
    case 11:
        bulan = ' November ';
        break;
    case 12:
        bulan = ' Desember ';
        break;
    default:
        break;
}

console.log(String(tanggal).concat(bulan, tahun));
