import React from "react";
import CarForm from "./CarForm";

const EditCar = ({ onUpdateCar }) => {
  const handleSave = (carData) => {
    onUpdateCar(carData);
  };

  return <CarForm onSave={handleSave} />;
};

export default EditCar;
