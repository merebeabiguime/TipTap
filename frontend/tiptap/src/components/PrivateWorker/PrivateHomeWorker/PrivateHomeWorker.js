import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import QRCode from "react-qr-code";
import { RWebShare } from "react-web-share";
import { useUserContext } from "../../../contexts/AuthContext";
import SaveIcon from "../../../images/save_to_gallery_icon.png";
import shareIcon from "../../../images/share_icon.png";

export default function PrivateHomeWorker() {
  const { userObject, signOutFirebase } = useUserContext();

  const qrCodeRef = useRef();
  const [canvasRendered, setCanvasRendered] = useState(false);

  const handleLogout = async () => {
    console.log("dedans");
    try {
      const result = await signOutFirebase();
      window.location.href = "/signIn";
      console.log("success", result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const currentQrCodeRef = qrCodeRef.current;

    if (currentQrCodeRef && !canvasRendered) {
      const canvas = currentQrCodeRef.querySelector("canvas");

      if (canvas) {
        canvas.addEventListener("click", saveToGallery);
        setCanvasRendered(true);
      }
    }

    return () => {
      const canvas = currentQrCodeRef?.querySelector("canvas");

      if (canvas) {
        canvas.removeEventListener("click", saveToGallery);
      }
    };
  }, [qrCodeRef, canvasRendered]);

  const saveToGallery = () => {
    html2canvas(qrCodeRef.current).then((canvas) => {
      canvas.toBlob(function (blob) {
        saveAs(blob, "pretty_image.png");
      });
    });
  };

  const qrCodeUrl = `https://tiptap.biz/privateManager/private-home-manager/worker-qrcode/userId=${userObject[0].ID}`;

  return (
    <Container>
      <Stack>
        <Stack direction="horizontal" className="mb-4">
          <div style={{ marginTop: " 65px", marginLeft: "20px" }}>
            <h1 className="customTitle1">QR Code personnel</h1>
          </div>
        </Stack>
        <div className="" style={{ marginRight: "38px", marginLeft: "38px" }}>
          <h4 className="">Votre QR Code personnel</h4>
          <p className="p-mt-15">
            Partagez ce code QR avec le responsable ou laissez-le le scanner
            depuis votre téléphone pour vous ajouter en tant qu'employé.
          </p>
        </div>
        <div className="d-flex justify-content-center" sm={12} ref={qrCodeRef}>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "50%", width: "50%" }}
            value={qrCodeUrl}
            viewBox={`0 0 256 256`}
          />
        </div>
        <div className="d-flex justify-content-center" sm={12}>
          <h1
            style={{ color: "rgba(251, 188, 4, 1) !important" }}
            className="customName"
          >
            {`${userObject[0].firstName} ${userObject[0].lastName}`}{" "}
          </h1>
        </div>
        <div
          className=""
          sm={12}
          style={{ paddingLeft: "37px", paddingRight: "37px" }}
        >
          <Button
            type="submit"
            className="customButton1"
            onClick={saveToGallery}
            style={{ marginBottom: "15px" }}
          >
            <img
              src={SaveIcon}
              style={{ marginRight: "24px" }}
              alt="save to gallery"
            />
            Enregistrer dans la gallerie
          </Button>
          <RWebShare
            data={{
              text: { qrCodeUrl },
              url: { qrCodeUrl }, // Change this to the appropriate URL
              title:
                "Scannez ce QR Code pour ajouter un employé en tant que membre du personnel",
            }}
            //Messaage d'erreur/succès dans ce cas
            /*onClick={() => console.log("shared successfully!")}*/
          >
            <Button type="submit" className="customButton2">
              <img
                src={shareIcon}
                style={{ marginRight: "24px" }}
                alt="share qr code"
              />
              Partager le QR Code
            </Button>
          </RWebShare>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <p onClick={handleLogout}>Logout</p>
        </div>
      </Stack>
    </Container>
  );
}
