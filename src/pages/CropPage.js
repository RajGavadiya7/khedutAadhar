import { useParams } from "react-router-dom";
import app from "../Firebase";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  addDoc,
  limit,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Table } from "@mantine/core";
import "./css/CropPage.css";
import { Button, Rating, InputBase, Textarea } from "@mantine/core";
import {v4 as uuidv4} from "uuid";
import { useNavigate ,Link} from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";

const CropPage = () => {


    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const { cropId } = useParams();

  const db = getFirestore(app);
  const sellCropsRef = collection(db, "buyCropsList");

  const [cropDetails, setCropDetails] = useState({});
  const [desSize, setDesSize] = useState(0);
  const [review, setReview] = useState({
    reviewTitle: "",
    reviewDescription: "",
    userName: cropDetails.selectedSellerName,
    userEmail: cropDetails.email,
    cropId: cropId,
  });
  const [rating, setRating] = useState(0);

  const [allreviews, setAllReviews] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "reviewDescription") {
      setDesSize(value.length);
    }

    setReview((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReviewSubmit = async (event) => {
    event.preventDefault();


  // get all reviews rating calculate average
    


    // check if user already given review
    const q3 = query( collection(db, "cropReviews"), where("cropId", "==", cropId) , where("userEmail", "==", currentUser.email) );
    try {
      const querySnapshot = await getDocs(q3);
      if(querySnapshot.docs.length > 0){
        alert("You have already given review !!");
        // clear form
        setReview({
          reviewTitle: "",
          reviewDescription: "",
          userName: "",
          userEmail: "",
          cropId: "",
        });
        setRating(0);
        return;
      }
    } catch (error) {
      console.log("Error getting documents: ", error);
      return;
    }


    // check if user already given review



    if (rating === 0) {
      alert("Please give a rating !!");
      return;
    }

    const reviewdata = {
      reviewTitle: review.reviewTitle,
      reviewDescription: review.reviewDescription,

      userName: currentUser.displayName,
      userEmail: currentUser.email,

      cropId: review.cropId,
      rating: rating,
    };

    // console.log(reviewdata);

    const reviewRef = collection(db, "cropReviews");

    try {
      await addDoc(reviewRef, reviewdata);
    } catch (error) {
      console.log("Error adding document: ", error);
    }

    // Now add rating into cropDetail database and update average rating
    const q4 = query( collection(db, "buyCropsList"), where("id", "==", cropId)  );
    try {
      const querySnapshot = await getDocs(q4);
      if(querySnapshot.docs.length > 0){
        // console.log(querySnapshot.docs[0].data());
        const cropDetail = querySnapshot.docs[0].data();
        const totalRating = cropDetail.totalRating + rating;
        const totalReviews = cropDetail.totalReviews + 1;
        const averageRating = totalRating / totalReviews;
        console.log(totalRating);
        console.log(totalReviews);
        console.log(averageRating);

        const cropRef = collection(db, "buyCropsList");
        const cropDocRef = doc(db, "buyCropsList", cropId);
        await updateDoc(cropDocRef, {
          totalRating: totalRating,
          totalReviews: totalReviews,
        });
      }
    } catch (error) {
      console.log("Error getting documents: ", error);
    }

    alert("Review added successfully !!");
  
    // clear the form
    setReview({
      reviewTitle: "",
      reviewDescription: "",
      userName: "",
      userEmail: "",
      cropId: "",
    });
    setRating(0);
    setDesSize(0);
  };



  const fetCropDetails = async () => {
    const q1 = query(sellCropsRef, where("id", "==", cropId));
    const querySnapshot = await getDocs(q1);
    // console.log(querySnapshot.docs[0].data());
    setCropDetails(querySnapshot.docs[0].data());
  };

  const fetAllReviews = async () => {
    const q2 = query( collection(db, "cropReviews"), where("cropId", "==", cropId) , limit(5) );
    try {
      const querySnapshot = await getDocs(q2);
      querySnapshot.docs.map((doc) => {
        setAllReviews((prevData) => [...prevData, doc.data()]);
        console.log(doc.data());
      });

      console.log("fetched all reviews");
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
    };

  useEffect(() => {
    fetAllReviews();
    fetCropDetails();
  }, []);

  return (
    <div className="croppage-container">
      <div className="cropdetails-container">
        <img
          className="cropdetails-image"
          src={cropDetails.selectedCropImage}
          alt={cropDetails.selectedCrop}
        />
        <div className="cropdetails-info-container">
          <div className="cropdetails-table-container">
            <Table verticalSpacing="sm" fontSize="md">
              <tbody>
                <tr>
                  <th scope="row">Crop</th> <td>{cropDetails.selectedCrop}</td>{" "}
                </tr>
                <tr>
                  <th scope="row">Variety</th>{" "}
                  <td>{cropDetails.selectedVariety}</td>
                </tr>
                <tr>
                  <th scope="row">Quantity</th>{" "}
                  <td>{cropDetails.selectedQuantity} Kg</td>
                </tr>
                <tr>
                  <th scope="row">Season</th>{" "}
                  <td>{cropDetails.selectedSeason}</td>{" "}
                </tr>
                <tr>
                  <th scope="row">Certification</th>{" "}
                  <td>{cropDetails.selectedCertification}</td>{" "}
                </tr>
                {/* seller detail */}
                <tr>
                  <th scope="row">Seller Name</th>{" "}
                  <td>{cropDetails.selectedSellerName}</td>{" "}
                </tr>
                <tr>
                  <th scope="row">Seller Contact</th>{" "}
                  <td>{cropDetails.selectedMobileNumber}</td>{" "}
                </tr>
                <tr>
                  <th scope="row">Seller Email</th> <td>{cropDetails.email}</td>{" "}
                </tr>
                <tr>
                  <th scope="row">State</th>{" "}
                  <td>{cropDetails.selectedState}</td>{" "}
                </tr>
                <tr>
                  <th scope="row">District</th>{" "}
                  <td>{cropDetails.selectedDistrict}</td>{" "}
                </tr>
                <tr>
                  <th scope="row">Rating</th> 
                  <td>{
                    cropDetails.totalReviews > 0 ?
                    cropDetails.totalRating / cropDetails.totalReviews :  "No Reviews Yet" 
                    }  {"(" + cropDetails.totalReviews } {cropDetails.totalReviews > 1 ? "reviews )" : "review )" }</td>
                </tr>
              </tbody>
            </Table>
            <div className="cropdetails-price">
              ₹ {cropDetails.selectedPrice} /Kg
            </div>
          </div>
        </div>
      </div>

      {/* crop review of Seller Products*/}
      <div className="sellerreview-container">
        <div className="sellerreview-heading">
          <span className="sellerreview-heading-text">Seller Review</span>
        </div>

        {/* all reviews */}
        <div className="allreviews-container">
          <div className="allreviews-heading">
            <span className="allreviews-heading-text">All Reviews</span>
          </div>

          {/* review card */}
          <div className="reviewcard-container-wrapper">
          {allreviews.map((review) => (
            <div key={uuidv4()} className="reviewcard-container">
              <div className="reviewcard-user">
                <span className="reviewcard-user-text">
                    {review.userName}
                </span>
              </div>

              <hr style={{margin:'0rem' , padding:"0rem"}} />
              <div className="reviewcard-heading">
                <span className="reviewcard-heading-text">
                  {review.reviewTitle}
                </span>
                <Rating value={review.rating} color="orange" />
              </div>

              <div className="reviewcard-description">
                <span className="reviewcard-description-text">
                  {review.reviewDescription}
                </span>
              </div>
            </div>
          ))}
          <Link
            to={`/reviews/${cropId}`}
            className="seeallreviews-text">See all reviews</Link>
            
          </div>

            
                
          
        </div>

        <div className="sellerreview-description">
          <span className="sellerreview-description-inner">
            Help us improve by{" "}
            <span className="sellerreview-description-highlight">
              providing
            </span>{" "}
            your valuable feedback and{" "}
            <span className="sellerreview-description-highlight">
              rating of seller.
            </span>
          </span>
        </div>

        {/* Review form and rating  */}
        <div className="sellerreview-form-container">
          {/* If not logged in disable this form */}
          {!currentUser ? (
            <form className="sellerreview-form">
              <span
                style={{ marginTop: "2rem", color: "red", fontWeight: 600 }}
              >
                Please login to give review
              </span>

              <InputBase
                maxLength={0}
                className="sellerreview-input"
                label="Review title"
                name="reviewTitle"
                disabled={true}
              />
              <Textarea
                maxLength={0}
                maxRows={4}
                minRows={4}
                description={`Login to give review`}
                className="sellerreview-input"
                label="Review description"
                name="reviewDescription"
                disabled={true}
              />
              <div className="sellerreview-rating-input">
                <Rating size="xl" disabled={true} />
              </div>
              <Button
                className="sellerreview-submit"
                variant="light"
                color="grape"
                radius="md"
                size="md"
                disabled={true}
              >
                Submit
              </Button>
            </form>
          ) : (
            <form onSubmit={handleReviewSubmit} className="sellerreview-form">
              <InputBase
                maxLength={100}
                className="sellerreview-input"
                label="Review title"
                name="reviewTitle"
                value={review.reviewTitle}
                onChange={handleInputChange}
                required
              />

              <Textarea
                maxLength={500}
                maxRows={4}
                minRows={4}
                description={`you are having ${
                  500 - desSize
                }/500 characters left`}
                className="sellerreview-input"
                label="Review description"
                name="reviewDescription"
                value={review.reviewDescription}
                onChange={handleInputChange}
                required
              />
              <div className="sellerreview-rating-input">
                <Rating
                  value={rating}
                  onChange={setRating}
                  size="xl"
                  required
                />
              </div>
              <Button
                type="submit"
                className="sellerreview-submit"
                variant="light"
                color="grape"
                radius="md"
                size="md"
              >
                Submit
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropPage;
