import React, { useEffect, useState } from "react";
import "./css/Buy.css";
import {
  TextInput,
  Select,
  ActionIcon,
  Button,
  Pagination,
} from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";
import TractorGif from "./css/tractor.gif";
import styled, { keyframes } from "styled-components";
import crop1 from "../data/CropsImage/crop1.svg";
import crop2 from "../data/CropsImage/crop2.svg";
import crop3 from "../data/CropsImage/crop3.svg";
import crop4 from "../data/CropsImage/crop4.svg";
import crop5 from "../data/CropsImage/crop5.svg";
import crop6 from "../data/CropsImage/crop6.svg";
import crop7 from "../data/CropsImage/crop7.svg";
import { InputBase } from "@mantine/core";
import { Districts } from "../data/Districts";
import { IconCurrencyRupee } from "@tabler/icons-react";
import { useAuth } from "../contexts/AuthContext";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import app from "../Firebase";

const Buy = () => {
  const CropsImage = [crop1, crop2, crop3, crop4, crop5, crop6, crop7];
  const db = getFirestore(app);
  const sellCropsRef = collection(db, "buyCropsList");

  const [currentPage, setCurrentPage] = useState(1);
  const [showData, setShowData] = React.useState([]); // data that want to be shown

  const [allCrops, setAllCrops] = React.useState([]); // all crops data from firebase

  const [searchTerm, setSearchTerm] = React.useState("");
  const [filterData, setFilterData] = React.useState([]); // filtered crops data from Search bar

  const [state, setState] = React.useState(""); // state for filter
  const [district, setDistrict] = React.useState(""); // district for filter
  const [secondFilterData, setSecondFilterData] = React.useState([]); // filtered crops data from filter

  // ------------------------------------------- All data -------------------------------------------
  const fetchAllCropsData = async () => {
    try {
      const fetchedData = await getDocs(sellCropsRef);
      const cropData = fetchedData.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      console.log("Fetch data successfull");
      // console.log(allCrops);
      setAllCrops(cropData);
      setShowData(cropData);
    } catch (error) {
      console.error(error);
      console.log("Error while fetching crop data");
    }
  };

  // ------------------------------------------- Search bar -------------------------------------------
  const handleSearch = () => {
    if (searchTerm === "") {
      setSearchTerm("");
      // setShowData(allCrops);
      // setFilterData([]);
      // setSecondFilterData([]);
    } else {
      const filteredData = allCrops.filter((item) => {
        const regex = new RegExp(searchTerm, "i"); // Case-insensitive regex pattern
        return regex.test(item.selectedCrop);
      });
      setShowData(filteredData);
      setFilterData(filteredData);
      setSecondFilterData([]);
      setCurrentPage(1);
    }
  };

  // ------------------------------------------- Apply Filter -------------------------------------------
  const handleApplyFilter = () => {
    if (state === "" && district === "") {
      console.log("Please select state or district");
    } else if (state !== "" && district === "") {
      if (filterData.length === 0) {
        const tempData = allCrops.filter(
          (item) => item.selectedState === state
        );
        setShowData(tempData);
        setSecondFilterData(tempData);
      } else {
        const tempData = filterData.filter(
          (item) => item.selectedState === state
        );
        setShowData(tempData);
        setSecondFilterData(tempData);
      }
      setCurrentPage(1);
    } else {
      if (filterData.length === 0) {
        const tempData = allCrops.filter(
          (item) => item.selectedDistrict === district
        );
        setShowData(tempData);
        setSecondFilterData(tempData);
      } else {
        const tempData = filterData.filter(
          (item) => item.selectedDistrict === district
        );
        setShowData(tempData);
        setSecondFilterData(tempData);
      }
      setCurrentPage(1);
    }
  };

  // ------------------------------------------- Clear Filter -------------------------------------------
  const handleClearFilter = () => {
    if (state !== "" || district !== "") {
      setState("");
      setDistrict("");
      if (filterData.length === 0) {
        setShowData(allCrops);
      } else {
        setShowData(filterData);
      }
      setCurrentPage(1);
    } else {
      console.log("No filter applied");
    }
  };

  // ------------------------------------------- Reset All -------------------------------------------
  const handleResetAll = () => {
    setSearchTerm("");
    setState("");
    setDistrict("");
    setShowData(allCrops);
    setFilterData([]);
    setSecondFilterData([]);
    setCurrentPage(1);
  };

  //  --------------------------------
  const getDistrictsByState = (state) => {
    const selectedStateData = Districts.find((item) => item.state === state);
    return selectedStateData ? selectedStateData.districts : [];
  };

  useState(() => {
    fetchAllCropsData();
  }, []);

  return (
    <div className="buy-container">
      <Marquee>
        <MarqueeGroup>
          {CropsImage.map((image, index) => (
            <Image2 id={index} src={image} />
          ))}
          <Image src={TractorGif} />
        </MarqueeGroup>
      </Marquee>

      <br />

      {/* Crop list available for buy Section */}

      <div className="search-crop">
        <div className="buy-form">
          <Button variant="light" color="red" onClick={handleResetAll}>
            {" "}
            All{" "}
          </Button>

          <TextInput
            className="search-bar"
            icon={<IconSearch size="1.1rem" stroke={1.5} />}
            radius="xl"
            size="md"
            rightSection={
              <ActionIcon onClick={handleSearch}>
                <IconArrowRight size="1.1rem" stroke={1.5} />
              </ActionIcon>
            }
            placeholder="Search crops and vegetables"
            rightSectionWidth={42}
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>

        <div className="search-crop-body">
          <div className="crop-filter-container-mobile">
            <div className="crop-sort"></div>
            <form className="crop-filter">
              <Select
                className="filter-input"
                searchable
                nothingFound="No options"
                label="Select State"
                placeholder="Select State"
                name="selectedState"
                value={state}
                onChange={setState}
                data={Districts.map((item) => item.state)}
                required
              />

              <Select
                searchable
                className="filter-input"
                label="Select District"
                placeholder="Select District"
                name="selectedDistrict"
                value={district}
                nothingFound="No options"
                onChange={setDistrict}
                data={getDistrictsByState(state)}
                disabled={!state}
                required
              />

              <Button
                style={{ marginTop: "1rem" }}
                onClick={handleApplyFilter}
                variant="light"
                color="green"
              >
                Apply
              </Button>
              <Button
                style={{ marginTop: "1rem" }}
                onClick={handleClearFilter}
                variant="light"
                color="orange"
              >
                Clear
              </Button>
            </form>
          </div>
          <div className="crop-list-container">
            {showData
              .slice((currentPage - 1) * 5, currentPage * 5)
              .map((crop) => {
                return (
                  <div className="crop-list">
                    <div className="crop-list-image">
                      <img
                        src="https://findfresh.in/attachments/shop_images/caps.webp"
                        alt="crop"
                      />
                    </div>

                    <div className="crop-list-details">
                      <div className="crop-list-name">
                        <div className="crop-list-name-crop">
                          {crop.selectedCrop}
                        </div>
                        <div className="crop-list-name-variety">
                          {crop.selectedVariety}
                        </div>
                      </div>

                      <div className="crop-list-location">
                        <div className="crop-list-seller-mobile">
                          {crop.selectedMobileNumber}
                        </div>
                        <div className="crop-list-location-city">
                          {crop.selectedDistrict}
                        </div>
                        <div className="crop-list-location-state">
                          {crop.selectedState}
                        </div>
                      </div>

                      <div className="crop-price-button">
                        <Button
                          className="crop-list-quantity"
                          style={{ marginTop: "1rem" }}
                          onClick={handleApplyFilter}
                          variant="light"
                          color="indigo"
                        >
                          {crop.selectedQuantity} kg
                        </Button>
                        <Button
                          variant="gradient" 
                          gradient={{ from: 'blue', to: 'green' , deg:'45' }}
                          leftIcon={<IconCurrencyRupee />}
                          className="crop-list-price"
                          style={{ marginTop: "1rem" }}
                          onClick={handleApplyFilter}
                          // variant="light"
                          // color="green"
                        >
                        {crop.selectedPrice} / Kg
                        </Button>
                      
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* Pageination  */}

            {showData.length > 0 && (
              <Pagination
                className="pagination"
                // total={totalPages}
                total={Math.ceil(showData.length / 5)}
                color="orange"
                radius="md"
                value={currentPage}
                onChange={setCurrentPage}
              />
            )}
          </div>
          <div className="crop-filter-container">
            <div className="crop-sort"></div>
            <form className="crop-filter">
              <Select
                className="filter-input"
                searchable
                nothingFound="No options"
                label="Select State"
                placeholder="Select State"
                name="selectedState"
                value={state}
                onChange={setState}
                data={Districts.map((item) => item.state)}
                required
              />

              <Select
                searchable
                className="filter-input"
                label="Select District"
                placeholder="Select District"
                name="selectedDistrict"
                value={district}
                nothingFound="No options"
                onChange={setDistrict}
                data={getDistrictsByState(state)}
                disabled={!state}
                required
              />

              <Button
                style={{ marginTop: "1rem" }}
                onClick={handleApplyFilter}
                variant="light"
                color="green"
              >
                Apply
              </Button>
              <Button
                style={{ marginTop: "1rem" }}
                onClick={handleClearFilter}
                variant="light"
                color="orange"
              >
                Clear
              </Button>
            </form>
          </div>
        </div>
      </div>
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
