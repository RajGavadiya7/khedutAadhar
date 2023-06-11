import Button from 'react-bootstrap/Button';
import './Carousel.css'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../data/HomeCorrImage/corrImg1.jpg';
import img2 from '../data/HomeCorrImage/corrImg2.jpg';
import img3 from '../data/HomeCorrImage/corrImg3.jpg';


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

        <img className="d-block w-100" src={img1} alt="1 slide" /> 
      </Carousel.Item>
      <Carousel.Item style={{maxHeight: '30rem'}}>
      <img className="d-block w-100 " src={img2} alt="2 slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p className='label'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item >
      
      <Carousel.Item style={{maxHeight: '30rem'}}>
      <img className="d-block w-100 " src={img3} alt="3 slide" />

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