/* cSpell:disable */
import React, { useContext } from 'react';
import { NilaiContext } from './NilaiContext';
import axios from 'axios';

import '../Tugas-12/DaftarBuah.css';
const BASE_URL = 'http://backendexample.sanbercloud.com/api/student-scores';

const ListNilai = () => {
  const [[mahasiswa, setMahasiswa], [, setEditId]] = useContext(NilaiContext);

  const handleEdit = (e) => {
    setEditId([true, parseInt(e.target.id)]);
  };
  const handleDelete = (e) => {
    axios
      .delete(`${BASE_URL}/${e.target.id}`)
      .then(() => {
        let newMahasiswa = mahasiswa.filter(
          (x) => x.id !== parseInt(e.target.id)
        );
        setMahasiswa(newMahasiswa);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
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
    </>
  );
};

export default ListNilai;
