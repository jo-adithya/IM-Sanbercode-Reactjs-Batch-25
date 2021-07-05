import { Typography, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import '../static/css/Card.css';

const Card = (props) => {
  const [hover, setHover] = useState(false);
  const history = useHistory();

  const handleMouseEnter = (e) => {
    setHover(true);
  };
  const handleMouseLeave = (e) => {
    setHover(false);
  };

  return (
    <>
      <div
        style={{
          width: '200px',
          height: '288px',
          transition: '.5s ease',
          position: 'relative',
          textAlign: 'left',
          color: 'white',
        }}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
      >
        {hover ? (
          <>
            <img
              src={props.data.image_url}
              alt={props.data.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '15px',
                opacity: 0.5,
              }}
            />
            <div className="image-desc">
              <Typography
                variant="h5"
                style={{ lineHeight: '1em', marginBottom: '5px' }}
              >
                {props.data.title}
              </Typography>
              <Typography variant="body1" style={{ lineHeight: '1.2em' }}>
                {props.data.genre}
              </Typography>
              {props.movie && (
                <Typography
                  variant="body1"
                  style={{ lineHeight: '1.2em' }}
                >{`${props.data.duration}m`}</Typography>
              )}
              <Typography variant="body1" style={{ lineHeight: '1.2em' }}>
                {props.data.year}
              </Typography>
              <br />
              <Button
                variant="outlined"
                onClick={() => {
                  props.movie
                    ? history.push(`/details/movies/${props.data.id}`)
                    : history.push(`/details/games/${props.data.id}`);
                }}
                style={{
                  color: 'white',
                  borderColor: 'white',
                  padding: '2px 15px',
                  borderRadius: '20px',
                }}
              >
                Details
              </Button>
            </div>
          </>
        ) : (
          <img
            src={props.data.image_url}
            alt={props.data.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '15px',
            }}
          />
        )}
      </div>
    </>
  );
};

export default Card;
