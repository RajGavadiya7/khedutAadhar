import React  from "react";
import './css/Buy.css';
import { TextInput, ActionIcon } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import TractorGif from './css/tractor.gif';
import styled, { keyframes } from 'styled-components';
import crop1 from '../data/CropsImage/crop1.svg'
import crop2 from '../data/CropsImage/crop2.svg'
import crop3 from '../data/CropsImage/crop3.svg'
import crop4 from '../data/CropsImage/crop4.svg'
import crop5 from '../data/CropsImage/crop5.svg'
import crop6 from '../data/CropsImage/crop6.svg'
import crop7 from '../data/CropsImage/crop7.svg'



const Buy = () => {

 

  const [buyCrop, setBuyCrop] = React.useState('');
  console.log(buyCrop);
  const CropsImage = [crop1, crop2, crop3, crop4, crop5, crop6, crop7];

  return (
    
    <div className="buy-container">

      <Marquee>
          <MarqueeGroup>
            {
              CropsImage.map((image, index) => ( 
                <Image2 id={index} src={image} />
              ))
            }
            <Image src={TractorGif} />
          </MarqueeGroup>
      </Marquee> 
      

   


    <div className="buy-form">
      <TextInput className="search-bar" icon={<IconSearch size="1.1rem" stroke={1.5} />} radius="xl" size="md" rightSection={
          <ActionIcon size={32} radius="xl" color="blue" variant="filled"> 
            <IconArrowRight size="1.1rem" stroke={1.5} />
          </ActionIcon>
        }
        placeholder="Search crops and vegetables"
        rightSectionWidth={42}
        value={buyCrop}
        onChange={(event) => setBuyCrop(event.currentTarget.value)}
      />
    </div>

    <br/>



    </div>
  );
};

export default Buy;



const Marquee = styled.div`
  overflow: hidden;
  display: flex;
  width:100%;
  user-select: none;
}
`;


const scrollX = keyframes`
from {
  transform: translateX(-100%);
}
to {
  transform: translateX(100%);
}
`;

const MarqueeGroup = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  white-space: nowrap;
  width: 100%;

  animation: ${scrollX} 25s linear infinite;
`;

const Image = styled.img`
  object-fit: contain;
  height: 10rem;
  border-radius: 0.5rem;
  margin: 0 1rem;

  `;

  const Image2 = styled.img`
  object-fit: contain;
  height: 4rem;
  border-radius: 0.5rem;
  margin: 0.1rem 1rem;

  `;


   






