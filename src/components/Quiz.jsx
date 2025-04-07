// src/components/Quiz.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { calculateWaterIntake } from "../utils/calculations";

const QuizOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const QuizContainer = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  width: 90%;
  max-width: 500px;
`;

const Title = styled.h2`
  text-align: center;
  color: #3498db;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  color: #2c3e50;
`;

const Input = styled.input`
  padding: 10px 15px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 10px 15px;
  border-radius: 8px;
  border: 2px solid #e0e0e0;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const Button = styled(motion.button)`
  background-color: #3498db;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const Quiz = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "male",
    weight: "",
    height: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert string values to numbers
    const userMetrics = {
      age: parseInt(formData.age, 10),
      sex: formData.sex,
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
    };

    const dailyTarget = calculateWaterIntake(userMetrics);

    // Pass the calculated daily target and user metrics to the parent component
    onComplete({ dailyTarget, ...userMetrics });
  };

  return (
    <QuizOverlay>
      <QuizContainer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Let's Personalize Your Water Intake</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="age">Age</Label>
            <Input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="1"
              max="120"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="sex">Sex</Label>
            <Select
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="1"
              max="300"
              step="0.1"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="height">Height (cm)</Label>
            <Input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              min="1"
              max="300"
              required
            />
          </FormGroup>

          <Button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Calculate My Water Needs
          </Button>
        </Form>
      </QuizContainer>
    </QuizOverlay>
  );
};

export default Quiz;
