/* cSpell:disable */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { NilaiContext } from '../Tugas-14/NilaiContext';
import { ThemeContext } from './ThemeContext';
import { getDatabase } from '../helper';
import axios from 'axios';

import '../Tugas-12/DaftarBuah.css';
const BASE_URL = 'http://backendexample.sanbercloud.com/api/student-scores';

const StudentScore = () => {
  const [[mahasiswa, setMahasiswa], , [message, setMessage]] =
    useContext(NilaiContext);
  const [[isLight, setIsLight]] = useContext(ThemeContext);
  let history = useHistory();

  const handleChangeTheme = () => {
    setIsLight((prevState) => {
      return !prevState;
    });
  };
  const handleCreate = () => {
    history.push('/tugas15/create');
  };
  const handleEdit = (e) => {
    history.push(`/tugas15/edit/${e.target.id}`);
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
      });
    }
  };

  return (
    <>
      {message.status !== null ? (
        message.status === 'success' ? (
          <div
            style={{
              width: '90%',
              padding: '1rem',
              margin: '0 auto 30px auto',
              textAlign: 'center',
              color: '#164ba0',
              borderRadius: '5px',
              border: '1px solid #b6d4fd',
              backgroundColor: '#cfe2fe',
            }}
          >
            {message.message}
          </div>
        ) : (
          <div
            style={{
              width: '90%',
              padding: '1rem',
              margin: '0 auto 30px auto',
              textAlign: 'center',
              color: '#8a2b34',
              borderRadius: '5px',
              border: '1px solid #f5c2c7',
              backgroundColor: '#fbd3db',
            }}
          >
            {message.message}
          </div>
        )
      ) : null}

      <button
        style={{
          padding: '.8rem',
          display: 'block',
          margin: 'auto auto 30px',
          fontSize: '.8rem',
        }}
        onClick={handleChangeTheme}
      >
        Change Navbar to {isLight ? 'Dark' : 'Light'} Theme
      </button>

      <h1>Daftar Nilai Mahasiswa</h1>
      <div style={{ width: '90%', maxWidth: '800px', margin: 'auto' }}>
        <button
          onClick={handleCreate}
          style={{ padding: '.4rem', marginBottom: '.6rem' }}
        >
          Buat Data Nilai Mahasiswa Baru
        </button>
      </div>
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

export default StudentScore;
