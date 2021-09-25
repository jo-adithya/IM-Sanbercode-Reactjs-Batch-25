import axios from 'axios';

export const fetchGames = async (callback) => {
  try {
    let response = await axios.get(
      'https://backendexample.sanbersy.com/api/data-game'
    );
    let data = response.data.map((x) => {
      return {
        id: x.id,
        title: x.name,
        genre: x.genre,
        singlePlayer: x.singlePlayer,
        multiplayer: x.multiplayer,
        platform: x.platform,
        year: x.release,
        image_url: x.image_url,
      };
    });
    data = data.filter((x) => {
      return (
        x.id !== null &&
        x.title !== null &&
        x.year !== null &&
        x.singlePlayer !== null &&
        x.genre !== null &&
        x.multiplayer !== null &&
        x.platform !== null &&
        x.image_url !== null
      );
    });
    callback(data);
  } catch (error) {
    console.log(error.response.data.error);
  }
};

export const fetchMovies = async (callback) => {
  try {
    let response = await axios.get(
      'https://backendexample.sanbersy.com/api/data-movie'
    );
    let data = response.data.map((x) => {
      return {
        id: x.id,
        title: x.title,
        description: x.description,
        year: x.year,
        duration: x.duration,
        genre: x.genre,
        rating: x.rating,
        review: x.review,
        image_url: x.image_url,
      };
    });
    data = data.filter((x) => {
      return (
        x.id !== null &&
        x.title !== null &&
        x.year !== null &&
        x.duration !== null &&
        x.genre !== null &&
        x.image_url !== null
      );
    });
    callback(data);
  } catch (error) {
    console.log(error.response.data.error);
  }
};

export const deleteMovie = async (id, token, callback) => {
  try {
    await axios.delete(
      `https://backendexample.sanbersy.com/api/data-movie/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    callback();
  } catch (error) {
    console.log(error.response.data.error);
  }
};

export const deleteGame = async (id, token, callback) => {
  try {
    await axios.delete(
      `https://backendexample.sanbersy.com/api/data-game/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    callback();
  } catch (error) {
    console.log(error.response.data.error);
  }
};

export const postMovie = async (data, token, callback) => {
  try {
    await axios.post(
      'https://backendexample.sanbersy.com/api/data-movie',
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    callback();
  } catch (error) {
    console.log(error.response.data.error);
  }
};

export const postGame = async (data, token, callback) => {
  try {
    await axios.post(
      'https://backendexample.sanbersy.com/api/data-game',
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    callback();
  } catch (error) {
    console.log(error.response.data.error);
  }
};

export const editMovie = async (id, data, token, callback) => {
  try {
    await axios.put(
      `https://backendexample.sanbersy.com/api/data-movie/${id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    callback();
  } catch (error) {
    console.log(error.response.data.error);
  }
};

export const editGame = async (id, data, token, callback) => {
  try {
    await axios.put(
      `https://backendexample.sanbersy.com/api/data-game/${id}`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    callback();
  } catch (error) {
    console.log(error.response.data.error);
  }
};
