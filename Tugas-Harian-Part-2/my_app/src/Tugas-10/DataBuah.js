/* cSpell:disable */
import React, { Component } from 'react';
import TabelBuah from './TabelBuah'

class DataBuah extends Component {
  render() { 
    let dataBuah = [
      {nama: "Semangka", harga: 10000, berat: 1000},
      {nama: "Anggur", harga: 40000, berat: 500},
      {nama: "Strawberry", harga: 30000, berat: 400},
      {nama: "Jeruk", harga: 30000, berat: 1000},
      {nama: "Mangga", harga: 30000, berat: 500}
    ];
    return (
      <TabelBuah dataBuah={dataBuah} />
    );
  }
}
 
export default DataBuah;