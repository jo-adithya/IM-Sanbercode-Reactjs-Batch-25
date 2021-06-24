/* cSpell:disable */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const NilaiContext = createContext();

const NilaiProvider = (props) => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [editId, setEditId] = useState([false, '']);

  useEffect(() => {
    axios
      .get('http://backendexample.sanbercloud.com/api/student-scores')
      .then((res) => {
        setMahasiswa(
          res.data.map((x) => {
            return { id: x.id, name: x.name, course: x.course, score: x.score };
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  return (
    <NilaiContext.Provider value={[[mahasiswa, setMahasiswa], [editId, setEditId]]}>
      {props.children}
    </NilaiContext.Provider>
  );
};

export default NilaiProvider;
