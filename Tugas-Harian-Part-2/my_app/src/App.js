/* cSpell:disable */

import logo from './logo.svg';
import FormBuah from './Tugas-9/FormBuah';
import TabelBuah from './Tugas-10/TabelBuah';
import './App.css';

function App() {
  let dataBuah = [
    { buah: 'Semangka', harga: 10000, berat: 1 },
    { buah: 'Anggur', harga: 40000, berat: 0.5 },
    { buah: 'Strawberry', harga: 30000, berat: 0.4 },
    { buah: 'Jeruk', harga: 30000, berat: 1 },
    { buah: 'Mangga', harga: 30000, berat: 0.5 },
  ]

  return (
    <div className="App">
      <TabelBuah dataBuah={dataBuah} />
      <FormBuah dataBuah={dataBuah} />
    </div>
  );
}

export default App;
