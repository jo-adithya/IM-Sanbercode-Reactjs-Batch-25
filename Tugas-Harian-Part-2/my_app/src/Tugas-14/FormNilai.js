/* cSpell:disable */
import React, { useContext, useState } from 'react';
import { NilaiContext } from './NilaiContext';
import axios from 'axios';

import '../Tugas-12/DaftarBuah.css';
const BASE_URL = 'http://backendexample.sanbercloud.com/api/student-scores';

const FormNilai = () => {
  const [[mahasiswa, setMahasiswa], [editId, setEditId]] =
    useContext(NilaiContext);
  const [nama, setNama] = useState('');
  const [mataKuliah, setMataKuliah] = useState('');
  const [nilai, setNilai] = useState('');

  const checkEdit = async () => {
    if (editId[0]) {
      let data = mahasiswa.filter((x) => x.id === editId[1])[0];
      await setEditId((prevState) => [false, prevState[1]]);
      setNama(data.name);
      setMataKuliah(data.course);
      setNilai(data.score);
    }
  };

  checkEdit();

  const handleInputNama = (e) => {
    setNama(e.target.value);
  };
  const handleInputMataKuliah = (e) => {
    setMataKuliah(e.target.value);
  };
  const handleInputNilai = (e) => {
    setNilai(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let inputData = {
      name: nama,
      course: mataKuliah,
      score: nilai,
    };

    if (editId[1] !== '') {
      axios
        .put(`${BASE_URL}/${editId[1]}`, inputData)
        .then(() => {
          let data = mahasiswa;
          data.filter((x) => x.id === editId[1])[0] = inputData;
          setMahasiswa([...data]);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      axios
        .post(`${BASE_URL}`, inputData)
        .then((res) => {
          setMahasiswa((prevMahasiswa) => {
            return [...prevMahasiswa, { id: res.data.id, ...inputData }];
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    setNama('');
    setMataKuliah('');
    setNilai('');
    setEditId([false, '']);
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
