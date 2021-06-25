/* cSpell:disable */
import React from 'react';

import './FormBuah.css'

class FormBuah extends React.Component {
  constructor() {
    super();
    this.dataBuah = ['Semangka', 'Jeruk', 'Nanas', 'Salak', 'Anggur'];
  }
  render() {
    return (
      <div className="form-container">
        <h1>Form Pembelian Buah</h1>
        <form>
          <table>
            <tr>
              <td className="form-label">
                <label htmlFor="nama">Nama Pelanggan</label>
              </td>
              <td className="form-control">
                <input type="text" name="nama" id="nama" />
              </td>
            </tr>
            <tr>
              <td className="form-label">Daftar Item</td>
              <td className="form-control">
                {this.dataBuah.map((el) => {
                  return (
                    <label>
                      <input type="checkbox" id={el} />
                      {el}
                    </label>
                  );
                })}
              </td>
            </tr>
          </table>
          <button type="submit">Kirim</button>
        </form>
      </div>
    );
  }
}

export default FormBuah;
