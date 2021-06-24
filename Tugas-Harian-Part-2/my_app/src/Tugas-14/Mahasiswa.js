/* cSpell:disable */
import React from 'react';
import NilaiProvider from './NilaiContext';
import ListNilai from './ListNilai';
import FormNilai from './FormNilai';

const Mahasiswa = () => {
  return (
    <NilaiProvider>
      <ListNilai />
      <FormNilai />
    </NilaiProvider>
  );
}
 
export default Mahasiswa;
