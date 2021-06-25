/* cSpell:disable */
import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import FormBuah from '../Tugas-9/FormBuah';
import DataBuah from '../Tugas-10/DataBuah';
import TimerContainer from '../Tugas-11/TimerContainer';
import DaftarBuah from '../Tugas-12/DaftarBuah';
import DaftarNilai from '../Tugas-13/DaftarNilai';
import Mahasiswa from '../Tugas-14/Mahasiswa';
import StudentScore from './StudentScore';
import StudentForm from './StudentForm';
import ThemeProvider, { ThemeContext } from './ThemeContext';
import NilaiProvider from '../Tugas-14/NilaiContext';

import './Routes.css';

const Nav = () => {
  const [[isLight], light, dark] = useContext(ThemeContext);

  return (
    <nav>
      <ul style={isLight ? light : dark}>
        <li>
          <Link to="/">
            <span>Tugas 9</span>
          </Link>
        </li>
        <li>
          <Link to="/tugas10">
            <span>Tugas 10</span>
          </Link>
        </li>
        <li>
          <Link to="/tugas11">
            <span>Tugas 11</span>
          </Link>
        </li>
        <li>
          <Link to="/tugas12">
            <span>Tugas 12</span>
          </Link>
        </li>
        <li>
          <Link to="/tugas13">
            <span>Tugas 13</span>
          </Link>
        </li>
        <li>
          <Link to="/tugas14">
            <span>Tugas 14</span>
          </Link>
        </li>
        <li>
          <Link to="/tugas15">
            <span>Tugas 15</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const Routes = () => {
  return (
    <ThemeProvider>
      <NilaiProvider>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/">
              <FormBuah />
            </Route>
            <Route exact path="/tugas10">
              <DataBuah />
            </Route>
            <Route exact path="/tugas11">
              <FormBuah /> <br />
              <DataBuah /> <br /> <br />
              <TimerContainer />
            </Route>
            <Route exact path="/tugas12">
              <DaftarBuah />
            </Route>
            <Route exact path="/tugas13">
              <DaftarNilai />
            </Route>
            <Route exact path="/tugas14">
              <Mahasiswa />
            </Route>
            <Route exact path="/tugas15">
              <StudentScore />
            </Route>
            <Route exact path="/tugas15/create">
              <StudentForm />
            </Route>
            <Route exact path="/tugas15/edit/:id">
              <StudentForm />
            </Route>
          </Switch>
        </Router>
      </NilaiProvider>
    </ThemeProvider>
  );
};

export default Routes;
