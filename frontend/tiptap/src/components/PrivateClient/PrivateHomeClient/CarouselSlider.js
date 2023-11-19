import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "../../../style.css";

const CarouselSlider = ({ images }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="carousel-container">
      <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
        {images.map((image, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100"
              src={image}
              alt={`Slide ${idx + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselSlider;
