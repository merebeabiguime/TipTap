import { useEffect } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import vector3 from "../images/Vector 3.png";
import vector4 from "../images/Vector 4.png";
import homepageIcon from "../images/homepage_icon.png";
import logo from "../images/logo.PNG";
import "../style.css";

function HomePage() {
  useEffect(() => {
    console.log("creeraa");
    return () => console.log("détruitaa");
  }, []);
  return (
    <Container className="gx-0 fluid ">
      <Stack>
        <div className="vector-container">
          <img src={vector3} alt="Vector 3" className="vector" />
          <img src={vector4} alt="Vector 4" className="vector" />
        </div>
        <div className=" mx-auto">
          <img className="logo" src={logo} alt="logo" />
        </div>
        <div className="mx-auto">
          <img src={homepageIcon} className="image_selectRole" alt="icon" />
        </div>
        <div
          className="text-center"
          style={{ marginRight: "65px", marginLeft: "65px" }}
        >
          <h1 className="h1-mt-15">How would you like to register? </h1>
        </div>
        <div className="" style={{ marginRight: "33px", marginLeft: "33px" }}>
          <p className="p-mt-28">
            Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nconubia
            nostra, per inceptos himenaeos. Nconubia nostra, per{" "}
          </p>
        </div>
        <Link to="/signIn" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="d-flex justify-content-center col-button button-mt-40">
            <Button
              style={{ marginLeft: "35px", marginRight: "35px" }}
              className="customButton1"
            >
              Log In
            </Button>
          </div>
        </Link>
        <Link
          to="/selectRole"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="d-flex justify-content-center col-m-25 col-button ">
            <Button
              style={{ marginLeft: "35px", marginRight: "35px" }}
              className="customButton2"
            >
              Sign Up
            </Button>
          </div>
        </Link>
      </Stack>
    </Container>
  );
}

export default HomePage;
