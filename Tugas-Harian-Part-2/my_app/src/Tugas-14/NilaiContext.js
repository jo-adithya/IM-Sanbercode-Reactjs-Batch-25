/* cSpell:disable */
import React, { createContext, useState, useEffect } from 'react';
import { getDatabase } from '../helper';

export const NilaiContext = createContext();

const NilaiProvider = (props) => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [editId, setEditId] = useState('');
  const [message, setMessage] = useState({ status: null, message: '' });

  useEffect(() => {
    getDatabase(setMahasiswa, setMessage);
  }, []);

  return (
    <NilaiContext.Provider
      value={[
        [mahasiswa, setMahasiswa],
        [editId, setEditId],
        [message, setMessage]
      ]}
    >
      {props.children}
    </NilaiContext.Provider>
  );
};

export default NilaiProvider;
