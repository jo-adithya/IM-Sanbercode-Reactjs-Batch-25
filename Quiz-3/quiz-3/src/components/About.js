/* cSpell:disable */
import { Link } from 'react-router-dom';


const About = () => {
  return (
    <section>
      <h1>Data Peserta Sanbercode Bootcamp Reactjs</h1>
      <ol>
        <li>
          <b>Nama:</b> Jonathan Adithya
        </li>
        <li>
          <b>Email:</b> jo.adithya391@gmail.com
        </li>
        <li>
          <b>Sistem Operasi yang digunakan:</b> MacOS
        </li>
        <li>
          <b>Akun Gitlab/Github:</b> @jo-adithya
        </li>
        <li>
          <b>Akun Telegram:</b> Jonathan Adithya
        </li>
      </ol>
      <Link to="/">Kembali Ke Index</Link>
    </section>
  );
};

export default About;
