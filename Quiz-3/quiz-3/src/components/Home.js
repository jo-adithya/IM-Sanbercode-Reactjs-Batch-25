import React, { Component } from 'react';
import { fetchData } from '../helper';

import '../assets/css/Home.css';

class Home extends Component {
  state = {
    apps: [],
  };
  componentDidMount() {
    fetchData(data => {
      console.log(data);
      this.setState({ apps: data });
    })
  }
  render() {
    return (
      <section>
        <h1 style={{ textAlign: 'center' }}>Popular Mobile Apps</h1>
        {this.state.apps.map((x, index) => (
          <div key={index}>
            <h2>{x.name}</h2>
            <img src={x.image_url} alt={x.name} className="image" />
            <h3>Release Year: {x.release_year}</h3>
            <h3>Price: Rp. {x.price.toLocaleString('id')},-</h3>
            <h3>Rating: {x.rating}</h3>
            <h3>
              Size: {x.size >= 1000 ? `${x.size / 1000} GB` : `${x.size} MB`}
            </h3>
            <h3>
              Platform:{' '}
              {x.is_android_app
                ? x.is_ios_app
                  ? 'Android\niOS'
                  : 'Android'
                : 'iOS'}
            </h3>
            <p style={{ clear: 'left', lineHeight: '1.8rem' }}>
              <b>Description: </b>
              {x.description}
            </p>
            <hr />
          </div>
        ))}
      </section>
    );
  }
}

export default Home;
