import React from "react";
import UploadImage from "../images/upload_image_signup.png";
import "../style.css";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useUserContext } from "../contexts/AuthContext";
import { storage } from "../firebase";

export default function UploadingImage() {
  const [file, setFile] = useState("");
  const { data, setData, setPercentage } = useUserContext();
  const [loading, setLoading] = useState(false);

  const uploadFile = () => {
    setLoading(true);
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
        setPercentage(progress);
        /* switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
            break;
        }*/
      },
      (error) => {
        //Message d'erreur
        setLoading(false);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setData((prev) => ({ ...prev, img: downloadURL }));
        });
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    file && uploadFile();
  }, [file]);
  return (
    <div className=" d-flex justify-content-center mt-4">
      <input
        type="file"
        className="form-control"
        id="file"
        style={{ display: "none" }}
        onChange={(e) => setFile(e.target.files[0])}
      />
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : data.img ? (
        <img src={data.img} alt="Profile" className="circular-image" />
      ) : (
        <label htmlFor="file" className="btn">
          <img src={UploadImage} alt="Upload" className="mr-2" />
        </label>
      )}
    </div>
  );
}
