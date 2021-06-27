import React, { Component } from 'react';
import { fetchData, deleteData, editData, postData } from '../helper';
import { LoginContext } from './LoginContext';
import { withRouter } from 'react-router';

import '../assets/css/Apps.css';

class Apps extends Component {
  static contextType = LoginContext;
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      name: '',
      category: '',
      description: '',
      release_year: 2007,
      size: 0,
      price: 0,
      rating: 0,
      image_url: '',
      is_android_app: true,
      is_ios_app: true,
      editId: '',
      message: { status: null, message: '' },
    };
    this.handleName = this.handleName.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleYear = this.handleYear.bind(this);
    this.handleSize = this.handleSize.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.handleUrl = this.handleUrl.bind(this);
    this.handleAndroid = this.handleAndroid.bind(this);
    this.handleIos = this.handleIos.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    fetchData((data) => {
      this.setState({ apps: data });
    });
  }
  handleName(e) {
    this.setState({ name: e.target.value });
  }
  handleCategory(e) {
    this.setState({ category: e.target.value });
  }
  handleDescription(e) {
    this.setState({ description: e.target.value });
  }
  handleYear(e) {
    this.setState({ release_year: e.target.value });
  }
  handleSize(e) {
    this.setState({ size: e.target.value });
  }
  handlePrice(e) {
    this.setState({ price: e.target.value });
  }
  handleRating(e) {
    this.setState({ rating: e.target.value });
  }
  handleUrl(e) {
    this.setState({ image_url: e.target.value });
  }
  handleAndroid(e) {
    this.setState((prevState) => ({
      is_android_app: !prevState.is_android_app,
    }));
  }
  handleIos(e) {
    this.setState((prevState) => ({
      is_ios_app: !prevState.is_ios_app,
    }));
  }
  handleEdit(e) {
    let id = parseInt(e.target.id);
    let data = this.state.apps.filter((x) => x.id === id)[0];
    this.setState({
      name: data.name,
      category: data.category,
      description: data.description,
      release_year: data.release_year,
      size: data.size,
      price: data.price,
      rating: data.rating,
      image_url: data.image_url,
      is_android_app: data.is_android_app,
      is_ios_app: data.is_ios_app,
      editId: id,
    });
  }
  handleDelete(e) {
    deleteData(parseInt(e.target.id), (res) => {
      fetchData((data) => {
        this.setState({
          apps: data,
          message: res,
        });
      });
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.is_android_app && !this.state.is_ios_app) {
      document.getElementById('error').innerHTML =
        'At least check one of the platforms!';
      return;
    }

    let inputData = {
      name: this.state.name,
      category: this.state.category,
      description: this.state.description,
      release_year: this.state.release_year,
      size: this.state.size,
      price: this.state.price,
      rating: this.state.rating,
      image_url: this.state.image_url,
      is_android_app: this.state.is_android_app,
      is_ios_app: this.state.is_ios_app,
    };

    if (this.state.editId !== '') {
      editData(parseInt(this.state.editId), inputData, (res) => {
        fetchData((data) => {
          this.setState({
            apps: data,
            message: res,
          });
        });
      });
    } else {
      postData(inputData, (res) => {
        fetchData((data) => {
          this.setState({
            apps: data,
            message: res,
          });
        });
      });
    }

    this.setState({
      name: '',
      category: '',
      description: '',
      release_year: 2007,
      size: 0,
      price: 0,
      rating: 0,
      image_url: '',
      is_android_app: true,
      is_ios_app: true,
      editId: '',
    });
  }
  handleSearch(e) {
    e.preventDefault();
    let search = document.getElementById('search').value;
    fetchData((data) => {
      let filtered = data.filter((x) => {
        return (
          x.name.substring(0, search.length).toLowerCase() ===
          search.toLowerCase()
        );
      });
      this.setState({ apps: filtered });
    });
  }
  render() {
    const [isLogin, ] = this.context;
    if (isLogin) {
      return (
        <section>
          {this.state.message.status !== null ? (
            this.state.message.status === 'success' ? (
              <div
                style={{
                  width: '100%',
                  padding: '1rem',
                  margin: '0 auto 30px auto',
                  textAlign: 'center',
                  color: '#164ba0',
                  borderRadius: '5px',
                  border: '1px solid #b6d4fd',
                  backgroundColor: '#cfe2fe',
                  boxSizing: 'border-box',
                }}
              >
                {this.state.message.message}
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  padding: '1rem',
                  margin: '0 auto 30px auto',
                  textAlign: 'center',
                  color: '#8a2b34',
                  borderRadius: '5px',
                  border: '1px solid #f5c2c7',
                  backgroundColor: '#fbd3db',
                  boxSizing: 'border-box',
                }}
              >
                {this.state.message.message}
              </div>
            )
          ) : null}
          <form
            onSubmit={this.handleSearch}
            style={{ width: 'auto', margin: 'auto' }}
          >
            <input type="text" name="search" id="search" />
            <input type="submit" value="Search" />
          </form>
  
          {/* List */}
          <h1>Mobile Apps List</h1>
          <table className="mobile-apps">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
                <th>Release Year</th>
                <th>Size (MB)</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Platform</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.apps.map((x, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{x.name}</td>
                  <td>{x.category}</td>
                  <td
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '250px',
                      maxHeight: '45px',
                    }}
                  >
                    {x.description}
                  </td>
                  <td>{x.release_year}</td>
                  <td>{x.size}</td>
                  <td>{x.price}</td>
                  <td>{x.rating}</td>
                  <td>
                    {x.is_android_app
                      ? x.is_ios_app
                        ? 'Android\niOS'.split('\n').map((str, i) => (
                            <p key={i} style={{ margin: '0' }}>
                              {str}
                            </p>
                          ))
                        : 'Android'
                      : 'iOS'}
                  </td>
                  <td>
                    <button onClick={this.handleEdit} id={x.id}>
                      Edit
                    </button>
                    <button onClick={this.handleDelete} id={x.id}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          {/* Form */}
          <h1>Mobile Apps Form</h1>
          <form className="mobile-form" onSubmit={this.handleSubmit}>
            <div className="form-control">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                size="60"
                value={this.state.name}
                onChange={this.handleName}
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                name="category"
                id="category"
                size="60"
                value={this.state.category}
                onChange={this.handleCategory}
                required
              />
            </div>
            <div className="form-control">
              <label className="end" htmlFor="description">
                Description:
              </label>
              <textarea
                name="description"
                id="description"
                cols="58"
                rows="5"
                value={this.state.description}
                onChange={this.handleDescription}
                required
              ></textarea>
            </div>
            <div className="form-control">
              <label htmlFor="release_year">Release Year:</label>
              <input
                type="number"
                name="release_year"
                id="release_year"
                className="number"
                value={this.state.release_year}
                onChange={this.handleYear}
                min="2007"
                max="2021"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="size">Size (MB):</label>
              <input
                type="number"
                name="size"
                id="size"
                className="number"
                value={this.state.size}
                onChange={this.handleSize}
                min="0"
                step="1"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                name="price"
                id="price"
                className="number"
                value={this.state.price}
                onChange={this.handlePrice}
                min="0"
                step="1"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="rating">Rating:</label>
              <input
                type="number"
                name="rating"
                id="rating"
                className="number"
                value={this.state.rating}
                onChange={this.handleRating}
                min="0"
                max="5"
                step="1"
                required
              />
            </div>
            <div className="form-control">
              <label className="end" htmlFor="url">
                Image Url:
              </label>
              <textarea
                name="url"
                id="url"
                cols="58"
                rows="5"
                value={this.state.image_url}
                onChange={this.handleUrl}
                required
              ></textarea>
            </div>
            <div className="form-control">
              <label htmlFor="platform">Platform</label>
              <div>
                <label htmlFor="android">
                  <input
                    type="checkbox"
                    checked={this.state.is_android_app}
                    id="android"
                    onChange={this.handleAndroid}
                  />{' '}
                  &nbsp; Android
                </label>{' '}
                <br />
                <label htmlFor="ios">
                  <input
                    type="checkbox"
                    checked={this.state.is_ios_app}
                    id="ios"
                    onChange={this.handleIos}
                  />{' '}
                  &nbsp; iOS
                </label>
              </div>
            </div>
            <p id="error" style={{ color: 'red' }}></p>
            <input type="submit" value="Submit" />
          </form>
        </section>
      );
    } else {
      const { history } = this.props;
      history.push('/login')
      return null;
    }
  }
}

export default withRouter(Apps);
