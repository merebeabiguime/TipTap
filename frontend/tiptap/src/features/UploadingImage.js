import React from "react";
import Col from "react-bootstrap/Col";
import UploadImage from "../images/upload_image_signup.png";
import "../style.css";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/AuthContext";
import { storage } from "../firebase";

export default function UploadingImage() {
  const [file, setFile] = useState("");
  const { data, setData, setPercentage } = useUserContext();

  const uploadFile = () => {
    const name = new Date().getTime() + file.name;
    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setPercentage(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setData((prev) => ({ ...prev, img: downloadURL }));
        });
      }
    );
  };

  useEffect(() => {
    file && uploadFile();
  }, [file]);
  return (
    <Col className=" d-flex justify-content-center  col-m-50" sm={12}>
      <input
        type="file"
        className="form-control"
        id="file"
        style={{ display: "none" }}
        onChange={(e) => setFile(e.target.files[0])}
      />
      {data.img ? ( // Vérifiez si une image a été téléchargée
        <img src={data.img} alt="Profile" className="circular-image" />
      ) : (
        <label htmlFor="file" className="btn ">
          <img src={UploadImage} alt="Upload" className="mr-2" />
        </label>
      )}
    </Col>
  );
}
