/* cSpell:disable */
import React from 'react';

import './DaftarBuah.css';

export default class DaftarBuah extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBuah: [],
      inputNama: '',
      inputHarga: '',
      inputBerat: '',
      editId: '',
    };

    this.handleInputNama = this.handleInputNama.bind(this);
    this.handleInputHarga = this.handleInputHarga.bind(this);
    this.handleInputBerat = this.handleInputBerat.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.setState({ dataBuah: this.props.dataBuah });
  }
  handleInputNama(e) {
    this.setState({ inputNama: e.target.value });
  }
  handleInputHarga(e) {
    this.setState({ inputHarga: e.target.value });
  }
  handleInputBerat(e) {
    this.setState({ inputBerat: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let dataBuah = [];

    if (this.state.editId !== '') {
      dataBuah = [...this.state.dataBuah]
      dataBuah[this.state.editId] = {
        nama: this.state.inputNama,
        hargaTotal: this.state.inputHarga,
        beratTotal: this.state.inputBerat,
      };
    } else {
      dataBuah = [
        ...this.state.dataBuah,
        {
          nama: this.state.inputNama,
          hargaTotal: this.state.inputHarga,
          beratTotal: this.state.inputBerat,
        },
      ];
    }

    this.setState({
      dataBuah: dataBuah,
      inputNama: '',
      inputHarga: '',
      inputBerat: '',
      editId: '',
    });
  }
  handleEdit(e) {
    let buah = this.state.dataBuah[e.target.id];
    this.setState({
      inputNama: buah.nama,
      inputHarga: buah.hargaTotal,
      inputBerat: buah.beratTotal,
      editId: e.target.id,
    });
  }
  handleDelete(e) {
    this.state.dataBuah.splice(e.target.id, 1);
    this.setState({ dataBuah: this.state.dataBuah });
  }
  render() {
    return (
      <>
        <h1>Daftar Harga Buah</h1>

        {/* Tabel Harga */}
        <table className="daftar-buah">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Harga total</th>
              <th>Berat total</th>
              <th>Harga per kg</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {this.state.dataBuah.map((buah, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{buah.nama}</td>
                  <td>{buah.hargaTotal}</td>
                  <td className="daftar-buah__berat">
                    {buah.beratTotal / 1000}
                  </td>
                  <td>{(buah.hargaTotal / buah.beratTotal) * 1000}</td>
                  <td>
                    <input
                      type="button"
                      value="Edit"
                      onClick={this.handleEdit}
                      id={index}
                    />
                    <input
                      type="button"
                      value="Delete"
                      onClick={this.handleDelete}
                      id={index}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Form */}
        <h1>Form Daftar Harga Buah</h1>
        <form onSubmit={this.handleSubmit} className="form-daftar-buah">
          <p>
            <label htmlFor="nama">Nama</label>
            <input
              type="text"
              name="nama"
              id="nama"
              value={this.state.inputNama}
              onChange={this.handleInputNama}
              required
            />
          </p>
          <p>
            <label htmlFor="harga">Harga Total</label>
            <input
              type="number"
              name="harga"
              id="harga"
              value={this.state.inputHarga}
              onChange={this.handleInputHarga}
              required
            />
          </p>
          <p>
            <label htmlFor="berat">Berat Total (dalam gram)</label>
            <input
              type="number"
              name="berat"
              id="berat"
              min="2000"
              value={this.state.inputBerat}
              onChange={this.handleInputBerat}
              required
            />
          </p>
          <p>
            &nbsp;
            <input type="submit" value="Submit" />
          </p>
        </form>
      </>
    );
  }
}
