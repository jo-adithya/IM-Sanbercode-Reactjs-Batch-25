/* cSpell:disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../Tugas-12/DaftarBuah.css';
const BASE_URL = 'http://backendexample.sanbercloud.com/api/student-scores';

const DaftarNilai = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [inputNama, setInputNama] = useState('');
  const [inputMataKuliah, setInputMataKuliah] = useState('');
  const [inputNilai, setInputNilai] = useState('');
  const [editId, setEditId] = useState('');

  useEffect(() => {
    let fetchData = async () => {
      try {
        let response = await axios.get(BASE_URL);
        setMahasiswa(
          response.data.map((x) => {
            return { id: x.id, name: x.name, course: x.course, score: x.score };
          })
        );
      } catch (error) {
        console.log(error.message)
      }
    };

    fetchData();
  });

  const handleInputNama = (e) => {
    setInputNama(e.target.value);
  };
  const handleInputMataKuliah = (e) => {
    setInputMataKuliah(e.target.value);
  };
  const handleInputNilai = (e) => {
    setInputNilai(e.target.value);
  };
  const handleEdit = (e) => {
    let data = mahasiswa.filter((x) => x.id === parseInt(e.target.id))[0];
    setEditId(parseInt(e.target.id));
    setInputNama(data.name);
    setInputMataKuliah(data.course);
    setInputNilai(data.score);
  };
  const handleDelete = (e) => {
    axios
      .delete(`${BASE_URL}/${e.target.id}`)
      .then((res) => {
        let newMahasiswa = mahasiswa.filter((x) => x.id !== parseInt(e.target.id));
        setMahasiswa(newMahasiswa);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let inputData = {
      id: editId,
      name: inputNama,
      course: inputMataKuliah,
      score: inputNilai,
    };

    if (editId !== '') {
      axios
        .put(`${BASE_URL}/${editId}`, inputData)
        .then(() => {
          let data = mahasiswa;
          data.filter((x) => x.id === editId)[0] = inputData;
          console.log(data);
          setMahasiswa(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      axios
        .post(`${BASE_URL}`, inputData)
        .then(() => {
          setMahasiswa((prevMahasiswa) => {
            return [...prevMahasiswa, inputData];
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    setInputNama('');
    setInputMataKuliah('');
    setInputNilai('');
    setEditId('');
  };

  return (
    <>
      {/* Tabel */}
      <h1>Daftar Nilai Mahasiswa</h1>
      <table className="daftar-buah">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>Mata Kuliah</th>
            <th>Nilai</th>
            <th>Indeks Nilai</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((val, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{val.name}</td>
                <td>{val.course}</td>
                <td>{val.score}</td>
                <td>
                  {val.score >= 80
                    ? 'A'
                    : val.score >= 70
                    ? 'B'
                    : val.score >= 60
                    ? 'C'
                    : val.score >= 50
                    ? 'D'
                    : 'E'}
                </td>
                <td>
                  <button onClick={handleEdit} id={val.id}>
                    Edit
                  </button>
                  <button onClick={handleDelete} id={val.id}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Form */}
      <h1>Form Nilai Mahasiswa</h1>
      <form onSubmit={handleSubmit} className="form-daftar-buah">
        <p>
          <label htmlFor="nama">Nama</label>
          <input
            type="text"
            name="nama"
            id="nama"
            value={inputNama}
            onChange={handleInputNama}
            required
          />
        </p>
        <p>
          <label htmlFor="mata-kuliah">Mata Kuliah</label>
          <input
            type="text"
            name="mata-kuliah"
            id="mata-kuliah"
            value={inputMataKuliah}
            onChange={handleInputMataKuliah}
            required
          />
        </p>
        <p>
          <label htmlFor="nilai">Nilai</label>
          <input
            type="number"
            name="nilai"
            id="nilai"
            min="0"
            max="100"
            value={inputNilai}
            onChange={handleInputNilai}
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
};

export default DaftarNilai;
