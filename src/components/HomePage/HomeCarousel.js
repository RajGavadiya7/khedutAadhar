// import Button from 'react-bootstrap/Button';
import './Carousel.css'
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../data/HomeCorrImage/corrImg1.jpg';
import img2 from '../../data/HomeCorrImage/corrImg2.jpg';
import img3 from '../../data/HomeCorrImage/corrImg3.jpg';


function HomeCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    
    <Carousel  style={{marginTop:'0.5rem'  }} activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item style={{maxHeight: '30rem'}} >
        <Carousel.Caption className="carousel-caption">
          <span className="carousel-title">Profitable Harvests</span>
          <span className='label'>Increase your profits with bountiful crops and financial rewards.</span>
        </Carousel.Caption>

        <img className="d-block w-100" src={img1} alt="1 slide" loading='lazy ' /> 
      </Carousel.Item>
      <Carousel.Item style={{maxHeight: '30rem'}}>
      <img className="d-block w-100 " src={img2} alt="2 slide" loading='lazy' />
        <Carousel.Caption className="carousel-caption">
          <span className="carousel-title">Food Safety</span>
          <span className='label'>Growing safe, chemical-free food for a healthier tomorrow</span>
        </Carousel.Caption>
      </Carousel.Item >
      
      <Carousel.Item style={{maxHeight: '30rem'}}>
      <img className="d-block w-100 " src={img3} alt="3 slide" loading='lazy'/>

        <Carousel.Caption className="carousel-caption">
          <span className="carousel-title">Vermicompost</span>
          <span className='label'>
          Organic compost produced by the action of earthworms on organic waste.
          </span>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;