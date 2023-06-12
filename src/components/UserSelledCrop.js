import React from 'react'
import Button from "react-bootstrap/Button";
import "./UserSelledCrop.css";

const UserSelledCrop = ({ crop, handleOpenUpdateModal, deleteData }) => {
  return (
    <div className="selled-crop-container">
      <div className="sellcard-row-1">
        <div className="sellcard-row-1-col">            
            <div className="selled-crop-name">{crop.selectedCrop}</div>
            <div className="selled-crop-variety">{crop.selectedVariety}</div>
        </div>

        <div className="sellcard-row-1-col">
            <div className="selled-crop-quantity">{crop.selectedQuantity} Kg</div>
            <div className="selled-crop-season">{crop.selectedSeason}</div>
        </div>
        <div className="sellcard-row-1-col-3">
            <div className="selled-crop-price">₹ {crop.selectedPrice} /Kg</div>
        </div>

        </div>
        <div className="sellcard-row-2">
       
        <Button
            style={{ marginRight: "2rem" }}
          variant="info"
          onClick={() => handleOpenUpdateModal(crop)}
        >
          Update
        </Button>
        <Button
          variant="danger"
          onClick={() => deleteData(crop.id)}
        >
          Delete
        </Button>
      
        </div>
    </div>

  );
};

export default UserSelledCrop;
