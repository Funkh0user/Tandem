import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

//returns the image carousel component by mapping an array of pictures passed in as a prop.

class ImageCarousel extends Component {

  render() {
    if(this.props.pictureArray) {

    return (
      <Carousel>
        {this.props.pictureArray.map((picture, index) => {
          return (            
              <img key={index} src={picture} alt="carousel" />
          );
        })}
      </Carousel>
    );
      } else {
        return null
      }
  }
}

export default ImageCarousel;
