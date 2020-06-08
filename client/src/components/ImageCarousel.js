import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

//returns the image carousel component by mapping an array of pictures passed in as a prop.

class ImageCarousel extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Carousel>
        {this.props.picturesArr.map((picture, index) => {
          return (            
              <img key={index} src={picture} alt="carousel" />
          );
        })}
      </Carousel>
    );
  }
}

export default ImageCarousel;
