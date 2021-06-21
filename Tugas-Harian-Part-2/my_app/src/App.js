/* cSpell:disable */

import FormBuah from './Tugas-9/FormBuah';
import TabelBuah from './Tugas-10/TabelBuah';
import TimerContainer from './Tugas-11/TimerContainer';
import './App.css';

function App() {
  let dataBuah = [
    { buah: 'Semangka', harga: 10000, berat: 1 },
    { buah: 'Anggur', harga: 40000, berat: 0.5 },
    { buah: 'Strawberry', harga: 30000, berat: 0.4 },
    { buah: 'Jeruk', harga: 30000, berat: 1 },
    { buah: 'Mangga', harga: 30000, berat: 0.5 },
  ];

  return (
    <div className="App">
      <FormBuah dataBuah={dataBuah} />
      <TabelBuah dataBuah={dataBuah} />
      <div className="timer" id="timer">
        <TimerContainer start={100} />
      </div>
    </div>
  );
}

export default App;
