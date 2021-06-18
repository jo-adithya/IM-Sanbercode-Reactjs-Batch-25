/* cSpell:disable */
import React from 'react';

import './TabelBuah.css';

class TabelBuah extends React.Component {
  render() {
    return (
      <>
        <h1>Tabel Harga Buah</h1>
        <table className="tabel-buah">
          <thead>
            <tr>
              <th className="tabel-buah__nama">Nama</th>
              <th>Harga</th>
              <th>Berat</th>
            </tr>
          </thead>
          <tbody>
            {this.props.dataBuah.map(el => {
              return(
                <tr>
                  <td className="tabel-buah__nama">{el.buah}</td>
                  <td className="tabel-buah__harga">{el.harga}</td>
                  <td className="tabel-buah__berat">{el.berat}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default TabelBuah;
