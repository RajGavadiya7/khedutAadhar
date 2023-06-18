import React, { useEffect, useState } from "react";
import "./css/Sell.css";
import { useAuth } from "../contexts/AuthContext";
import { getFirestore,collection,addDoc,query,where,getDocs,deleteDoc,doc,updateDoc} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import app from "../Firebase";
import Button from "react-bootstrap/Button";
import UserSelledCrop from "../components/SellCrop/UserSelledCrop";
import Modal from "react-bootstrap/Modal";
import {getStorage, uploadBytes, ref , getDownloadURL , deleteObject } from "firebase/storage";
const SellForm = React.lazy(() => import("../components/SellCrop/SellForm"));






const Sell = () => {
  // All firebase stuffs
  const { currentUser } = useAuth();
  const db = getFirestore(app);
  const sellCropsRef = collection(db, "buyCropsList");
  const storage = getStorage(app);

  // all react states
  const [userSelledCrops, setUserSelledCrops] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateFormData, setUpdateFormData] = useState(null);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [selectedCropId, setSelectedCropId] = useState(null);
  const [showSellForm, setShowSellForm] = useState(false);

  const [formData, setFormData] = useState({ 
    id: "",
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
    selectedCropImage: "",
    totalRating: 0,
    totalReviews: 0,
  });

  const [cropImage, setCropImage] = useState(null);



  // ----------------------------------- Fetch all data ---------------------- 
  const fetchUserData = async () => {
    const q = query(
      sellCropsRef,
      where("selectedEmail", "==", currentUser ? currentUser.email : "")
    );
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


  // ---------------------------Delete data and its confirmation dialog box --------------
  const deleteData = (id) => {
    setSelectedCropId(id);
    setShowConfirmationDialog(true);
  };


  const handleDeleteConfirmation = async () => {
    try {
      const docRef = doc(db, "buyCropsList", selectedCropId);
      await deleteDoc(docRef);
      fetchUserData();
      console.log("Data deleted successfully");
    } catch (error) {
      console.error(error);
      console.log("Error while deleting data");
    }
    setShowConfirmationDialog(false);
  };

  
  


  // --------------------------------------Update Data ---------------------------
  // const handleOpenUpdateModal = (crop) => {
  //   setUpdateFormData(crop);
  //   setShowUpdateModal(true);
  // };


  // const handleUpdate = async (event) => {
  //   event.preventDefault();
  
  //   const docRef = doc(db, "buyCropsList", updateFormData.id);
  //   await updateDoc(docRef, updateFormData).catch((err) => {
  //     console.log(err);
  //   });

  //   fetchUserData();
  //   console.log("Data updated successfully");
  //   setShowUpdateModal(false);
     
  // } 

  const handleUploadImage = async (file) => {
    const storageRef = ref(storage, `cropImages/${file.name}+${uuidv4()}`);
    console.log(storageRef);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  };
  

  const extractImageFileName = (imageUrl) => {
    const startIndex = imageUrl.indexOf("o/") + 2;
    const endIndex = imageUrl.indexOf("?alt=media");
    const path = imageUrl.substring(startIndex, endIndex);
    return path.replace(/%2F/g, "/").replace(/%2B/g, "+").replace(/%20/g, " ");
  };

  
  const handleDeleteImage = async (imageDownloadUrl) => {

    try{
    const imageUrl = extractImageFileName(imageDownloadUrl);
    console.log(imageUrl);

    const imageRef = ref(storage, imageUrl);
    
    await deleteObject(imageRef);

    console.log("image deleted successfully");
    }
    catch(err){
      console.log(err);
      console.log("Error while deleting image");
    }
  };
  
  const handleOpenUpdateModal = (crop) => {
    setUpdateFormData(crop);
    setShowUpdateModal(true);
  };
  
  const handleUpdate = async (event) => {
    event.preventDefault();
    setShowUpdateModal(false);
  
    try {
      if (cropImage && cropImage.name !== updateFormData.selectedCropImage) {
        // Delete the old image from storage if a new image is selected
        await handleDeleteImage(updateFormData.selectedCropImage);
  
        // Upload the new image
        const imageUrl = await handleUploadImage(cropImage);
  
        // Update the form data with the new image URL
        const updatedFormData = {
          ...updateFormData,
          selectedCropImage: imageUrl,
        };
  
        // Update the document in Firebase Firestore
        const docRef = doc(db, "buyCropsList", updateFormData.id);
        await updateDoc(docRef, updatedFormData);
  
        // Fetch user data and perform other actions
        fetchUserData();
        console.log("Data updated successfully");
        setShowUpdateModal(false);
        setCropImage(null);
      } else {
        // If no new image is selected, simply update the document with existing data
        const docRef = doc(db, "buyCropsList", updateFormData.id);
        await updateDoc(docRef, updateFormData);
  
        // Fetch user data and perform other actions
        fetchUserData();
        console.log("Data updated successfully");
        setShowUpdateModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };



  // ---------------------------------------Submit new form --------------------------- 
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowSellForm(false);
    setCropImage(null);
    
  
    try {
      // Upload image to Firebase Storage
      const imageUrl = await handleUploadImage(cropImage);
  
      const docRef = await addDoc(sellCropsRef, {
        ...formData,
        selectedCropImage: imageUrl,
      });
  
      
      await updateDoc(doc(sellCropsRef, docRef.id), {
        id: docRef.id,
      });

      const updatedFormData = {
        ...formData,
        selectedCropImage: imageUrl,
        id: docRef.id,
      };
  
  
      // Fetch user data and perform other actions
      fetchUserData();
      console.log(updatedFormData);
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
        selectedEmail: currentUser ? currentUser.email : "",
        selectedCropImage: "",
        totalRating: 0,
        totalReviews: 0,
      });
      alert("Form submitted");
      
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    fetchUserData();
  } , []);



  return (
    <div className="sell-page">
      <p className="form-heading">Let's step together to Organic Farming</p>

      <div className="your-crops-container">
        <div className="your-crops-header">
          <p className="your-crops-heading">Your Crops</p>
          <Button variant="success" onClick={fetchUserData}>
            Refresh Crops
          </Button>
        </div>



        {/* User selled Crops list */}
        {currentUser ? (
          userSelledCrops ? (
            <div className="crop-list-container">
              {userSelledCrops.map((crop) => (
                  <UserSelledCrop
                    key={uuidv4()}
                    crop={crop}
                    handleOpenUpdateModal={handleOpenUpdateModal}
                    deleteData={deleteData}
                  />
                
              ))}

              <Modal
                show={showUpdateModal}
                onHide={() => { setShowUpdateModal(false); setCropImage(null);}}
                dialogClassName="modal-90w"
                size="xl"
                backdrop="static"
                aria-labelledby="update-modal-title"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="update-modal-title">
                    Update Crop Data
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <SellForm
                    formData={updateFormData}
                    setFormData={setUpdateFormData}
                    currentUser={currentUser}
                    handleSubmit={handleUpdate}
                    cropImage={cropImage}
                    setCropImage={setCropImage}
                    // dialogClassName="modal-100w"
                  />
                </Modal.Body>
              </Modal>

              <Modal
                show={showConfirmationDialog}
                onHide={() => setShowConfirmationDialog(false)}
                dialogClassName="modal-90w"
                size="md"
                backdrop="static"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  Are you sure you want to delete this crop?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowConfirmationDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handleDeleteConfirmation}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          ) : (
            <p className="your-crops-card-text">No Crops</p>
          )
        ) : (
          <div className="your-crops">
            <p className="your-crops-card-text">
              Please login to see your crops
            </p>
          </div>
        )}
      </div>





      <div className="form-container">
        {currentUser ? (
          <div className="sell-crop-button-container">
            <Button variant="primary" onClick={() => setShowSellForm(true)}>
              Sell Crops
            </Button>

            <Modal
                show={showSellForm}
                onHide={() => {setShowSellForm(false); setCropImage(null);}}
                dialogClassName="modal-90w"
                size="xl"
                backdrop="static"
                aria-labelledby="update-modal-title"
            >
            <Modal.Header closeButton>
                <Modal.Title>Sell Crops</Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{ display: "flex", justifyContent: "center" }}
            >
            <SellForm
              formData={formData}
              setFormData={setFormData}
              currentUser={currentUser}
              handleSubmit={handleSubmit}
              cropImage={cropImage}
              setCropImage={setCropImage}
            />
            </Modal.Body>
            </Modal>
          </ div>
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











