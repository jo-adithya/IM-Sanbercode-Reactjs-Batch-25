/* cSpell:disable */

import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
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
              <label>
                <input type="checkbox" name="" value="Semangka" />
                Semangka
              </label>
              <label>
                <input type="checkbox" name="" value="Jeruk" />
                Jeruk
              </label>
              <label>
                <input type="checkbox" name="" value="Nanas" />
                Nanas
              </label>
              <label>
                <input type="checkbox" name="" value="Salak" />
                Salak
              </label>
              <label>
                <input type="checkbox" name="" value="Anggur" />
                Anggur
              </label>
            </td>
          </tr>
        </table>
        <button type="submit">Kirim</button>
      </form>
    </div>
  );
}

export default App;
