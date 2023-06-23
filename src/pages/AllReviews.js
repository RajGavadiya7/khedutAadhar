import { useParams } from "react-router-dom";
import app from "../Firebase";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { Table } from "@mantine/core";
import "./css/CropPage.css";

import { Rating } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
// import { useAuth } from "../contexts/AuthContext";

export default function AllReviews() {
  // const { currentUser } = useAuth();
  const { cropId } = useParams();

  const db = getFirestore(app);
  const sellCropsRef = collection(db, "buyCropsList");
  const [cropDetails, setCropDetails] = useState({});
  const [allreviews, setAllReviews] = useState([]);

  const fetCropDetails = async () => {
    const q1 = query(sellCropsRef, where("id", "==", cropId));
    const querySnapshot = await getDocs(q1);
    console.log(querySnapshot.docs[0].data());
    setCropDetails(querySnapshot.docs[0].data());
  };

  const fetAllReviews = async () => {
    const q2 = query(
      collection(db, "cropReviews"),
      where("cropId", "==", cropId)
    );
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

                <hr style={{ margin: "0rem", padding: "0rem" }} />
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
          </div>
        </div>
      </div>
    </div>
  );
}
