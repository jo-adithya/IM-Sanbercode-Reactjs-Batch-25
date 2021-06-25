/* cSpell:disable */
import axios from 'axios';

export async function getDatabase(setMahasiswa, setMessage) {
  try {
    let response = await axios.get('http://backendexample.sanbercloud.com/api/student-scores');
    setMahasiswa(
      response.data.map((x) => {
        return { id: x.id, name: x.name, course: x.course, score: x.score };
      })
    );
    return 'success';
  } catch (error) {
    setMessage({
      status: 'error',
      message: `${error.message}  |  Failed to fetch database, please try again later...`,
    });
  }
};
