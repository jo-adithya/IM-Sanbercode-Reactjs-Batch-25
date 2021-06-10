/* cSpell:disable */

// Soal 1
var i = 2;

console.log('LOOPING PERTAMA');
while (i <= 20) {
    console.log(String(i) + ' - I love coding');
    i += 2;
}

console.log('LOOPING KEDUA');
while (i >= 4) {
    i -= 2;
    console.log(String(i) + ' - I will become a frontend developer');
}

// Soal 2
for (i = 1; i < 21; i++) {
    if (i % 3 == 0 && i % 2 == 1) {
        console.log(String(i) + ' - I Love Coding');
    } else if (i % 2 == 0) {
        console.log(String(i) + ' - Berkualitas');
    } else {
        console.log(String(i) + ' - Santai');
    }
}

// Soal 3
for (i = 1; i < 8; i++) {
    let hashes = '';
    for (let j = 1; j <= i; j++) {
        hashes += '#';
    }
    console.log(hashes);
}

// Soal 4
var kalimat = [
    'aku',
    'saya',
    'sangat',
    'sangat',
    'senang',
    'belajar',
    'javascript',
];
var sentence = kalimat.slice(1, 3).concat(kalimat.slice(4));
console.log(sentence);

// Soal 5
var sayuran = [];
sayuran.push(
    'Kangkung',
    'Bayam',
    'Buncis',
    'Kubis',
    'Timun',
    'Seledri',
    'Tauge'
);
sayuran.sort();

for (let index = 0; index < sayuran.length; index++) {
    console.log(String(index + 1) + '. ' + sayuran[index]);
}
