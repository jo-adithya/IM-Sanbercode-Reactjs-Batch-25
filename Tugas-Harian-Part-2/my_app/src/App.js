/* cSpell:disable */

// import FormBuah from './Tugas-9/FormBuah';
// import TabelBuah from './Tugas-10/TabelBuah';
// import TimerContainer from './Tugas-11/TimerContainer';
// import DaftarBuah from './Tugas-12/DaftarBuah';
import DaftarNilai from './Tugas-13/DaftarNilai';
import './App.css';

function App() {
  let dataBuah = [
    { nama: 'Nanas', hargaTotal: 100000, beratTotal: 4000 },
    { nama: 'Manggis', hargaTotal: 350000, beratTotal: 10000 },
    { nama: 'Nangka', hargaTotal: 90000, beratTotal: 2000 },
    { nama: 'Durian', hargaTotal: 400000, beratTotal: 5000 },
    { nama: 'Strawberry', hargaTotal: 120000, beratTotal: 6000 },
  ];

  return (
    <div className="App">
      {/* <FormBuah dataBuah={dataBuah} />
      <TabelBuah dataBuah={dataBuah} />
      <div className="timer" id="timer">
        <TimerContainer start={100} />
      </div>
      <DaftarBuah dataBuah={dataBuah} /> */}
      <DaftarNilai />
    </div>
  );
}

export default App;
