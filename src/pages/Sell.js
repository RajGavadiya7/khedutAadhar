import React, { useEffect, useState } from "react";
import "./css/Sell.css";
import { useAuth } from "../contexts/AuthContext";
import SellForm from "../components/SellForm";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import app from "../Firebase";
import Button from 'react-bootstrap/Button';
import Accordion from "react-bootstrap/Accordion";
import { Table } from "@mantine/core";
// import { v4 as uuidv4 } from 'uuid';


const Sell = () => {

  // All firebase stuffs
  const { currentUser } = useAuth();
  const db = getFirestore(app);
  const sellCropsRef = collection(db, "buyCropsList");


  // all react states 
  const [userSelledCrops, setUserSelledCrops] = useState("");
  const [formData, setFormData] = useState({
    selectedCrop: "",
    selectedVariety: "",
    selectedQuantity: "",
    selectedPrice: "",
    selectedCertification: "",
    selectedSeason: "Kharif (JUN-NOV)",
    selectedSellerName: "",
    selectedMobileNumber: "",
    selectedEmail: currentUser ? currentUser.email : "",
    selectedState: "",
    selectedDistrict: "",
  });




  // all CRUD operations
  
  const createSell = async (data) => {
    try {
      await addDoc(sellCropsRef, data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUserData = async () => {
    const q = query( sellCropsRef, where("selectedEmail", "==", currentUser ? currentUser.email : ""));
    try {
      const fetchedData = await getDocs(q);
      const userData = fetchedData.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      setUserSelledCrops(userData);
      console.log(userData);
    } catch (error) {
      console.error(error);
      console.log("Error while fetching user data");
    }
  };

  
  const deleteData = async (id) => {
    console.log("Delete button clicked");
    const docRef = doc(db ,"buyCropsList" , id  );
      await deleteDoc(docRef);
      fetchUserData();
      console.log("Data deleted successfully");
    
  };

  


  const handleSubmit = (event) => {
    event.preventDefault();
    createSell(formData);
    fetchUserData();
    console.log(formData);

    // clear form data
    setFormData({
      selectedCrop: "",
      selectedVariety: "",
      selectedQuantity: "",
      selectedPrice: "",
      selectedCertification: "",
      selectedSeason: "Kharif (JUN-NOV)",
      selectedSellerName: "",
      selectedMobileNumber: "",
      selectedState: "",
      selectedDistrict: "",
    });

    alert("Form submitted");
  };




  useEffect(() => {
    fetchUserData();
  }, []);


  return (
    <div className="sell-page">
      <p className="form-heading">Let's step together to Organic Farming</p>

      <div className="your-crops-container">

        <div className="your-crops-header">
          <p className="your-crops-heading">Your Crops</p>
          <Button variant="success" onClick={fetchUserData}>Refresh Crops</Button>
        </div>



        {/* User selled Crops list */}
        {currentUser ? (

          userSelledCrops ? (
            <div className="crop-list-container">
            { userSelledCrops.map((crop) => (
              <>
              <Accordion
                className="crop-list-accordion"
                defaultActiveKey="0"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignContent: 'center',
                }}>
                  <Accordion.Item
                    className="crop-list-accordion-item"
                    eventKey={crop.id}
                  >
                  <Accordion.Header className="crop-list-accordion-header">
                      <div>{crop.selectedCrop} ( {crop.selectedVariety} )</div>
                      <div>{crop.selectedPrice} /Kg</div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <Table className="crop-list-accordion-table" striped>
                        <tbody>
                          <tr>
                            <td>Crop Id</td>
                            <td>{crop.id}</td>
                          </tr>
                          <tr>
                            <td>Quantity</td>
                            <td>{crop.selectedQuantity}</td>
                          </tr>
                          <tr>
                            <td>Price</td>
                            <td>{crop.selectedPrice}</td>
                          </tr>
                          <tr>
                            <td>Certification</td>
                            <td>{crop.selectedCertification}</td>
                          </tr>
                          <tr>
                            <td>Season</td>
                            <td>{crop.selectedSeason}</td>
                          </tr>
                          <tr>
                            <td>Seller Name</td>
                            <td>{crop.selectedSellerName}</td>
                          </tr>
                          <tr>
                            <td>Mobile Number</td>
                            <td>{crop.selectedMobileNumber}</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>{crop.selectedEmail}</td>
                          </tr>
                          <tr>
                            <td>State</td>
                            <td>{crop.selectedState}</td>
                          </tr>
                          <tr>
                            <td>District</td>
                            <td>{crop.selectedDistrict}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Accordion.Body>
                  </Accordion.Item>
              </Accordion>
              <Button variant="danger" onClick={() => deleteData(crop.id)}>Delete</Button>
              </>
               ) ) }
              </div>
          ) : (
            <p className="your-crops-card-text">No Crops</p>
          )
        ) : (
          <div className="your-crops">
            <p className="your-crops-card-text">Please login to see your crops</p>
          </div>
        )}
      </div>

      <div className="form-container">
        {currentUser ? (
          <>
            {/* <Button variant="primary" onClick={handleShow}>
              Launch demo modal
            </Button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                backdrop="static"
            >
              <Modal.Header closeButton>
                <Modal.Title>Sell Crops</Modal.Title>
              </Modal.Header> */}
            <SellForm
              formData={formData}
              setFormData={setFormData}
              currentUser={currentUser}
              handleSubmit={handleSubmit}
              dialogClassName="modal-90w"
            />

            {/* </Modal.Footer> */}
            {/* // </Modal> */}
          </>
        ) : (
          <div className="form-login">
            <p className="form-login-text">Please login to sell crops</p>
          </div>
        )}
      </div>
      <div className="form-guide-container"></div>
    </div>
  );
};

export default Sell;
