import React, {useState} from 'react'
import "./BuyCropCard.css";
import { Link } from "react-router-dom";
import {Loader , Rating , Button} from "@mantine/core"
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const BuyCropCard = ({ crop }) => {

  const navigate = useNavigate();


  return (
    <div onClick={() => navigate(`/buy_crop/${crop.id}`)} className="buy-crop-container">
      
      <div className="buy-crop-image-container">
          {/* <img className="buy-crop-image" src={crop.selectedCropImage} alt="Selected Crop" /> */}
          <ImageWithSpinner  src={crop.selectedCropImage} alt={crop.selectedCrop} />
      </div>
      <div className="buycard-row-1">
        <div className="buycard-row-1-col">            
            <div className="buy-crop-name">{crop.selectedCrop}</div>
            <div className="buy-crop-variety">{crop.selectedVariety}</div>
        </div>

        <div className="buycard-row-1-col">
            <div className="buy-crop-quantity">{crop.selectedQuantity} Kg</div>
            <div className="buy-crop-season">{crop.selectedSeason}</div>
        </div>
        <div className="buycard-row-1-col-3">
            
            <span >{crop.totalReviews > 0 ? crop.totalRating / crop.totalReviews : 0 }</span>
            <Rating 
            style={{margin:'0.4rem 0 ' }}
            
            value={
              crop.totalReviews > 0 ? crop.totalRating / crop.totalReviews : 0
            } fractions={10} readOnly />

            {/* <Button variant="outline" color="blue" style={{fontSize:"0.9rem" , fontWeight:500 , marginBottom:'0.4rem'}}>
            {crop.totalReviews > 0 ? crop.totalRating / crop.totalReviews + ` (${crop.totalReviews} reviews)` :  "No Reviews Yet" } 
            </Button> */}
            <Link to={`/buy_crop/${crop.id}`} className="buy-crop-price">₹ {crop.selectedPrice} /Kg</Link>
        </div>

        </div>
    </div>
  );
};

export default BuyCropCard;




const ImageWithSpinner = ({ src, alt }) => {

  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };


  return (
      <>
        {isLoading && (
          <Loader className="loader" color="green" size="lg" variant="bars" />
          
      )}
      <img
        className="crop-list-image"
        src={src}
        alt={alt}
        style={{ display: isLoading ? 'none' : 'block' }}
        onLoad={handleImageLoad}
      />
  </>
  );
};