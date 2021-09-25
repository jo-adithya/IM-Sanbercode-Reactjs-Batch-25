/* cSpell:disable */
import React, { useContext, useState, useEffect } from 'react';
import { NilaiContext } from './NilaiContext';
import { getDatabase } from '../helper';
import axios from 'axios';

import '../Tugas-12/DaftarBuah.css';
const BASE_URL = 'http://backendexample.sanbercloud.com/api/student-scores';

const FormNilai = () => {
  const [
    [mahasiswa, setMahasiswa],
    [editId, setEditId],
    [, setMessage],
  ] = useContext(NilaiContext);
  const [nama, setNama] = useState('');
  const [mataKuliah, setMataKuliah] = useState('');
  const [nilai, setNilai] = useState('');

  useEffect(() => {
    if (editId !== '') {
      let data = mahasiswa.filter((x) => x.id === editId)[0];
      setNama(data.name);
      setMataKuliah(data.course);
      setNilai(data.score);
    }
  }, [editId, mahasiswa])

  const handleInputNama = (e) => {
    setNama(e.target.value);
  };
  const handleInputMataKuliah = (e) => {
    setMataKuliah(e.target.value);
  };
  const handleInputNilai = (e) => {
    setNilai(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let inputData = {
      name: nama,
      course: mataKuliah,
      score: nilai,
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

    setNama('');
    setMataKuliah('');
    setNilai('');
    setEditId('');
  };

  return (
    <>
      <h1>Form Nilai Mahasiswa</h1>
      <form onSubmit={handleSubmit} className="form-daftar-buah">
        <p>
          <label htmlFor="nama">Nama</label>
          <input
            type="text"
            name="nama"
            id="nama"
            value={nama}
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
            value={mataKuliah}
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
            value={nilai}
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

export default FormNilai;
