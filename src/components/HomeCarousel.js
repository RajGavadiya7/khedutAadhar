import Button from 'react-bootstrap/Button';
import './Carousel.css'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function HomeCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    
    <Carousel  style={{marginTop:'0.5rem'  }} activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item style={{maxHeight: '30rem'}} >
        <Carousel.Caption>
          <h3 >First slide label</h3>
          <p className='label'>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
        <img
          className="d-block w-100 h-80"
          src="https://www.earthytales.in/forum/wp-content/uploads/2020/10/method-organic-farming.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item style={{maxHeight: '30rem'}}>
        <img
          className="d-block w-100 h-80"
          src="https://hitdoon.com/blog/wp-content/uploads/2019/05/Best-Agriculture-College-in-Dehradun-Uttarakhand-.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p className='label'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item >
      
      <Carousel.Item style={{maxHeight: '30rem'}}>
        <img
          className="d-block w-100"
          src="https://kj1bcdn.b-cdn.net/media/23618/vermiwash.jpg?width=1200"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Vermicompost</h3>
          <p className='label'>
          Organic compost produced by the action of earthworms on organic waste.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;