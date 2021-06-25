/* cSpell:disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getDatabase } from '../helper';

import '../Tugas-12/DaftarBuah.css';
const BASE_URL = 'http://backendexample.sanbercloud.com/api/student-scores';

const DaftarNilai = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [inputNama, setInputNama] = useState('');
  const [inputMataKuliah, setInputMataKuliah] = useState('');
  const [inputNilai, setInputNilai] = useState('');
  const [editId, setEditId] = useState('');
  const [message, setMessage] = useState({ status: null, message: '' });

  useEffect(() => {
    getDatabase(setMahasiswa, setMessage);
  }, [])

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
  const handleDelete = async (e) => {
    try {
      await axios.delete(`${BASE_URL}/${e.target.id}`);
      setMessage({
        status: 'success',
        message: `Successfully deleted data with id ${e.target.id}`,
      });
      getDatabase(setMahasiswa, setMessage);
    } catch (error) {
      setMessage({
        status: 'error',
        message: `${error.message}  |  Failed to delete data with id ${e.target.id}, please try again later...`,
      })
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let inputData = {
      name: inputNama,
      course: inputMataKuliah,
      score: inputNilai,
    };

    if (editId !== '') {
      try {
        await axios.put(`${BASE_URL}/${editId}`, inputData);
        setMessage({
          status: 'success',
          message: `Successfully edited data with id ${editId}`,
        });
        getDatabase(setMahasiswa, setMessage);
      } catch (error) {
        setMessage({
          status: 'error',
          message: `${error.message}  |  Failed to edit data with id ${editId}, please try again later...`,
        })
      }
    } else {
      try {
        let id = (await axios.post(`${BASE_URL}`, inputData)).data.id;
        setMessage({
          status: 'success',
          message: `Successfully added data with id ${id}`,
        });
        getDatabase(setMahasiswa, setMessage);
      } catch (error) {
        setMessage({
          status: 'error',
          message: `${error.message}  |  Failed to add data, please try again later...`,
        })
      }
    }

    setInputNama('');
    setInputMataKuliah('');
    setInputNilai('');
    setEditId('');
  };

  return (
    <>
      {(message.status !== null) ? ((message.status === 'success') ? (
        <div style={{width: '90%', padding: '1rem', margin: '0 auto 30px auto', textAlign: 'center', color: '#164ba0', borderRadius: '5px', border: '1px solid #b6d4fd', backgroundColor: '#cfe2fe'}}>
          {message.message}
        </div>
      ) : (
        <div style={{width: '90%', padding: '1rem', margin: '0 auto 30px auto', textAlign: 'center', color: '#8a2b34', borderRadius: '5px', border: '1px solid #f5c2c7', backgroundColor: '#fbd3db'}}>
          {message.message}
        </div>
      )) : null}
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
      <br /> <br />
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
