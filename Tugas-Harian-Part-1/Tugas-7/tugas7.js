/* cSpell:disable */

// Release 0
class Animal {
  constructor(name) {
    this._legs = 4;
    this._cold_blooded = false;
    this._name = name;
  }
  get legs() {
    return this._legs;
  }
  set legs(legs) {
    this._legs = legs;
  }
  get cold_blooded() {
    return this._cold_blooded;
  }
  set cold_blooded(cold_blooded) {
    this._cold_blooded = cold_blooded;
  }
  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }
}

var sheep = new Animal("shaun");

console.log("----- SOAL 1 -----");
console.log("\n----- Release 0 -----");
console.log(sheep.name); // "shaun"
console.log(sheep.legs); // 4
console.log(sheep.cold_blooded); // false
sheep.legs = 3;
console.log(sheep.legs);

// Release 1
class Ape extends Animal {
  constructor(name) {
    super(name);
    this.legs = 2;
  }
  yell() {
    console.log("Auooo");
  }
}

class Frog extends Animal {
  constructor(name) {
    super(name);
  }
  jump() {
    console.log("hop hop");
  }
}

var sungokong = new Ape("kera sakti");
console.log("\n----- Release 1 -----");
sungokong.yell(); // "Auooo"
sungokong.legs = 2;
console.log(sungokong.name);
console.log(sungokong.legs);
console.log(sungokong.cold_blooded);

var kodok = new Frog("buduk");
kodok.jump(); // "hop hop"
console.log(kodok.name);
console.log(kodok.legs);
console.log(kodok.cold_blooded);

// Soal 2
class Clock {
  constructor({ template }) {
    this._template = template;
    this._timer;
  }
  get template() {
    return this._template;
  }
  set template(template) {
    this._template = template;
  }
  get timer() {
    return this._timer;
  }
  set timer(timer) {
    this._timer = timer;
  }
  render() {
    var date = new Date();

    var hours = date.getHours();
    if (hours < 10) hours = "0" + hours;

    var mins = date.getMinutes();
    if (mins < 10) mins = "0" + mins;

    var secs = date.getSeconds();
    if (secs < 10) secs = "0" + secs;

    var output = this.template
      .replace("h", hours)
      .replace("m", mins)
      .replace("s", secs);

    console.log(output);
  }
  stop() {
    clearInterval(this.timer);
  }
  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

var clock = new Clock({ template: "h:m:s" });
console.log("\n----- SOAL 2 -----");
clock.start();
