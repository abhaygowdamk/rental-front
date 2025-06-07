import React from "react";
import CarForm from "./CarForm";

const AddCar = ({ onAddCar }) => {
  const handleSave = (carData) => {
    // Generate a unique ID for the new car
    const newCar = {
      ...carData,
      id: Date.now(), // Using timestamp as a simple unique ID
    };
    onAddCar(newCar);
  };

  return <CarForm onSave={handleSave} />;
};

export default AddCar;
