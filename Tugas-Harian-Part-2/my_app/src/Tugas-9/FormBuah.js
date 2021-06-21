/* cSpell:disable */
import React from 'react';

import './FormBuah.css'

class FormBuah extends React.Component {
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
                {this.props.dataBuah.map((el) => {
                  return (
                    <label>
                      <input type="checkbox" id={el.buah} />
                      {el.buah}
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
