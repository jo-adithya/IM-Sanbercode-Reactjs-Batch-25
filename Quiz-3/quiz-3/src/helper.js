import axios from 'axios';

export const fetchData = async (callback) => {
  try {
    let response = await axios.get(
      'http://backendexample.sanbercloud.com/api/mobile-apps'
    );
    let data = response.data.map((x) => {
      return {
        id: x.id,
        name: x.name,
        category: x.category,
        description: x.description,
        release_year: x.release_year,
        size: x.size,
        price: x.price,
        rating: x.rating,
        image_url: x.image_url,
        is_android_app: x.is_android_app,
        is_ios_app: x.is_ios_app,
      };
    });
    callback(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteData = async (id, callback) => {
  try {
    await axios.delete(
      `http://backendexample.sanbercloud.com/api/mobile-apps/${id}`
    );
    callback({
      status: 'success',
      message: `Successfully deleted data with id ${id}`,
    });
  } catch (error) {
    callback({
      status: 'error',
      message: `${error.message}  |  Failed to delete data with id ${id}, please try again later...`,
    });
  }
};

export const editData = async (id, inputData, callback) => {
  try {
    await axios.put(
      `http://backendexample.sanbercloud.com/api/mobile-apps/${id}`,
      inputData
    );
    callback({
      status: 'success',
      message: `Successfully edited data with id ${id}`,
    });
  } catch (error) {
    callback({
      status: 'error',
      message: `${error.message}  |  Failed to edit data with id ${id}, please try again later...`,
    });
  }
};

export const postData = async (inputData, callback) => {
  try {
    console.log(inputData)
    await axios.post(
      `http://backendexample.sanbercloud.com/api/mobile-apps/`,
      inputData
    );
    callback({
      status: 'success',
      message: `Successfully added data`,
    });
  } catch (error) {
    console.log(error);
    callback({
      status: 'error',
      message: `${error.message}  |  Failed to add data, please try again later...`,
    });
  }
};

export const setUserSession = (token, user) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', user);
}

export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return userStr;
  else return null;
}

export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
}

export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}
