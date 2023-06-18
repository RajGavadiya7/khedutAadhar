import React, { useEffect, useState  } from "react";
import {v4 as uuidv4} from "uuid";
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
import { Districts } from "../data/Districts";
import {
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import app from "../Firebase";
import loadable from "@loadable/component";
import { Navigate , useNavigate } from "react-router-dom";


const  BuyCropCard = loadable(() => import("../components/BuyCrop/BuyCropCard"));


const Buy = () => {

  const navigate = useNavigate();

  const CropsImage = [crop1, crop2, crop3, crop4, crop5, crop6, crop7];
  const db = getFirestore(app);
  const sellCropsRef = collection(db, "buyCropsList");

  const [currentPage, setCurrentPage] = useState(1);
  const [showData, setShowData] = useState([]); // data that want to be shown

  const [allCrops, setAllCrops] = useState([]); // all crops data from firebase

  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState([]); // filtered crops data from Search bar

  const [state, setState] = useState(""); // state for filter
  const [district, setDistrict] = useState(""); // district for filter
  const [sortBy , setSortBy] = useState("Any");


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
    if (searchTerm !== ""){
      const filteredData = allCrops.filter((item) => {
        const regex = new RegExp(searchTerm, "i"); // Case-insensitive regex pattern
        return regex.test(item.selectedCrop);
      });
      setShowData(filteredData);
      setFilterData(filteredData);
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
      } else {
        const tempData = filterData.filter(
          (item) => item.selectedState === state
        );
        setShowData(tempData);
       
      }
      setCurrentPage(1);
    } else {
      if (filterData.length === 0) {
        const tempData = allCrops.filter(
          (item) => item.selectedDistrict === district
        );
        setShowData(tempData);
     
      } else {
        const tempData = filterData.filter(
          (item) => item.selectedDistrict === district
        );
        setShowData(tempData);
       
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
    // setSecondFilterData([]);
    setCurrentPage(1);
  };

  //  --------------------------------
  const getDistrictsByState = (state) => {
    const selectedStateData = Districts.find((item) => item.state === state);
    return selectedStateData ? selectedStateData.districts : [];
  };


  // ------------------------------------------- Sort By -------------------------------------------
  useEffect(() => {

    let sortedData = [...showData];
  
    if (sortBy === "Price (Low to High)") {
      sortedData.sort((a, b) => a.selectedPrice - b.selectedPrice);
    } else if (sortBy === "Price (High to Low)") {
      sortedData.sort((a, b) => b.selectedPrice - a.selectedPrice);
    } else if (sortBy === "Crop Name (A to Z)") {
      sortedData.sort((a, b) => a.selectedCrop.localeCompare(b.selectedCrop));
    } else if (sortBy === "Crop Name (Z to A)") {
      sortedData.sort((a, b) => b.selectedCrop.localeCompare(a.selectedCrop));
    } else if (sortBy === "Any") {
      sortedData = allCrops;
    }
    setShowData(sortedData);
  }, [sortBy]);

  
  useEffect(() => {
    fetchAllCropsData();
  } , []);

  return (
    <div className="buy-container">
      <Marquee>
        <MarqueeGroup>
          {CropsImage.map((image) => (
            <Image2 key={uuidv4()} src={image} />
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
            
            <div className="sortby-container" style={{display: 'flex' ,  width: '100%' , justifyContent: 'flex-end' }}>
              <Select
                  label="Sort by:"
                  placeholder="sort by "
                  name="sortBy"
                  value={sortBy}
                  onChange={setSortBy}
                  data={["Any", "Price (Low to High)" , "Price (High to Low)",  "Crop Name (A to Z)" , "Crop Name (Z to A)"]}
                
                />
            </div>

          <hr style={{width: '100%', }}/>  


            <div className="buycropcard-container">
            { showData.length === 0 && <h1 style={{textAlign: 'center' , marginTop: '2rem'}}>No crops available</h1>}
             { showData
              .slice((currentPage - 1) * 5, currentPage * 5)
              .map((crop) => {
                return (  
                    <BuyCropCard crop={crop} key={uuidv4()} />
                );
              })}
            </div>

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
