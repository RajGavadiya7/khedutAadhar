import React, { useState } from "react";
import { InputBase, Select, Checkbox, TextInput, Tooltip  } from "@mantine/core";
import { IMaskInput } from "react-imask";
// import "./css/Sell.css";
import { Districts } from "../data/Districts";

const SellForm = ({ formData, setFormData, currentUser , handleSubmit }) => {
  
  const [focused, setFocused] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleStateChange = (stateValue) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedState: stateValue,
      selectedDistrict: "",
    }));

  };


  const handleDistrictChange = (districtValue) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedDistrict: districtValue,
    }));
  };


  const getDistrictsByState = (state) => {
    const selectedStateData = Districts.find((item) => item.state === state);
    return selectedStateData ? selectedStateData.districts : [];
  };


  

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-header">
        <p className="form-header-text">Sell Crops here</p>
      </div>

      <div className="form-section-header">
        <p className="form-section-header-text">Crop Details</p>
      </div>

      <div className="form-input-container">
        <div className="input-column-1">
          <InputBase
            className="input-label"
            label="Crop Name"
            name="selectedCrop"
            value={formData.selectedCrop}
            onChange={handleInputChange}
            required
          />
          <InputBase
            className="input-label"
            label="Crop Variety"
            name="selectedVariety"
            value={formData.selectedVariety}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-column-2">
          <div className="input-column-row">
            
            <InputBase
              className="input-label"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              label="Quantity /Kg"
              name="selectedQuantity"
              value={formData.selectedQuantity}
              onChange={handleInputChange}
              onKeyPress={(event) => {
                const onlyNumbers = /^[0-9\b]+$/;
                if (!onlyNumbers.test(event.key)) {
                  event.preventDefault();
                }
              }}
              required
              
            />
            <InputBase

              className="input-label"
              type="text"
              pattern="[0-9]*"
              inputMode="numeric"
              label="Price /Kg "
              name="selectedPrice"
              value={formData.selectedPrice}
              onChange={handleInputChange}
              onKeyPress={(event) => {
                const onlyNumbers = /^[0-9\b]+$/;
                if (!onlyNumbers.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />

           
          </div>
          <div className="input-column-row">
            <TextInput
              className="input-label"
              label="Certification level"
              placeholder="farmer certificate type"
              name="selectedCertification"
              value={formData.selectedCertification}
              onChange={handleInputChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              inputContainer={(children) => (
                <Tooltip
                  label="Leave black if not having certificate"
                  position="top-start"
                  opened={focused}
                >
                  {children}
                </Tooltip>
              )}
            />

            <Select
              className="input-label"
              label="Crop Season"
              placeholder="Select season"
              name="selectedSeason"
              value={formData.selectedSeason}
              onChange={(value) =>
                handleInputChange({
                  target: { name: "selectedSeason", value },
                })
              }
              data={["Kharif (JUN-NOV)", "Rabi (NOV-MAR)", "Zaid (MAR-JUN)"]}
              required
            />
          </div>
        </div>
      </div>

      <div className="form-section-header">
        <p className="form-section-header-text">Seller Details</p>
      </div>

      <div className="form-input-container">
        <div className="input-column-1">
          <InputBase
            className="input-label"
            label="Seller Name"
            name="selectedSellerName"
            value={formData.selectedSellerName}
            onChange={handleInputChange}
            required
          />
          <InputBase
            className="input-label"
            label="Mobile number"
            component={IMaskInput}
            mask="+91 0000000000"
            name="selectedMobileNumber"
            value={formData.selectedMobileNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-column-2">
          <div className="input-column-row">
            <InputBase
              style={{ maxWidth: "25rem", width: "100%" }}
              className="input-label"
              label="Email"
              value={currentUser.email}
              disabled
            />
          </div>
          <div className="input-column-row">
            <Select
              className="input-label"
              searchable
              nothingFound="No options"
              label="Select State"
              placeholder="Select State"
              name="selectedState"
              value={formData.selectedState}
              onChange={handleStateChange}
              data={Districts.map((item) => item.state)}
              required
            />

            <Select
              searchable
              className="input-label"
              label="Select District"
              placeholder="Select District"
              name="selectedDistrict"
              value={formData.selectedDistrict}
              nothingFound="No options"
              onChange={handleDistrictChange}
              data={getDistrictsByState(formData.selectedState)}
              disabled={!formData.selectedState}
              required
            />
          </div>
        </div>
      </div>

      <Checkbox
        className="form-ack"
        label="I hereby confirm that all information provided by me is genuine and not intended to mislead."
        radius="md"
        required
      />

      <div className="form-submit">
        <button type="submit" className="form-submit-button" onSubmit={handleSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default SellForm;
