// src/components/AddWaterModal.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Modal from "react-modal";
import { FaGlassWater, FaMugHot, FaBottleWater } from "react-icons/fa6";

// Make sure to set the app element for screen readers
Modal.setAppElement("#root");

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "15px",
    padding: "25px",
    boxShadow: "0 5px 20px rgba(0, 0, 0, 0.2)",
    border: "none",
    maxWidth: "500px",
    width: "90%",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1000,
  },
};

const Title = styled.h2`
  text-align: center;
  color: #3498db;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const PresetOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 10px;
`;

const PresetOption = styled(motion.button)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.selected ? "#3498db" : "#f0f0f0")};
  color: ${(props) => (props.selected ? "white" : "#333")};
  padding: 15px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  gap: 5px;

  &:hover {
    background-color: ${(props) => (props.selected ? "#2980b9" : "#e0e0e0")};
  }
`;

const IconWrapper = styled.div`
  font-size: 24px;
  margin-bottom: 5px;
`;

const OptionLabel = styled.span`
  font-weight: bold;
`;

const OptionValue = styled.span`
  font-size: 14px;
`;

const CustomAmountGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: bold;
  color: #2c3e50;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1;
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

const Unit = styled.span`
  margin-left: 10px;
  color: #7f8c8d;
  font-weight: bold;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled(motion.button)`
  background-color: ${(props) => (props.cancel ? "#e74c3c" : "#3498db")};
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.cancel ? "#c0392b" : "#2980b9")};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Water intake presets in ml
const presets = [
  { value: 250, label: "Glass", icon: <FaGlassWater /> },
  { value: 350, label: "Mug", icon: <FaMugHot /> },
  { value: 500, label: "Bottle", icon: <FaBottleWater /> },
];

const AddWaterModal = ({ isOpen, onClose, onAdd }) => {
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  const handlePresetClick = (value) => {
    setSelectedPreset(value);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedPreset(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = selectedPreset || parseInt(customAmount, 10);
    if (amount > 0) {
      onAdd(amount);
      onClose();
      // Reset form
      setSelectedPreset(null);
      setCustomAmount("");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customModalStyles}
      contentLabel="Add Water Modal"
    >
      <Title>Add Water Intake</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Quick Add:</Label>
          <PresetOptions>
            {presets.map((preset) => (
              <PresetOption
                key={preset.label}
                type="button"
                onClick={() => handlePresetClick(preset.value)}
                selected={selectedPreset === preset.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconWrapper>{preset.icon}</IconWrapper>
                <OptionLabel>{preset.label}</OptionLabel>
                <OptionValue>{preset.value}ml</OptionValue>
              </PresetOption>
            ))}
          </PresetOptions>
        </div>

        <CustomAmountGroup>
          <Label htmlFor="customAmount">Custom Amount:</Label>
          <InputContainer>
            <Input
              type="number"
              id="customAmount"
              value={customAmount}
              onChange={handleCustomAmountChange}
              min="1"
              max="2000"
              placeholder="Enter amount"
            />
            <Unit>ml</Unit>
          </InputContainer>
        </CustomAmountGroup>

        <ButtonGroup>
          <Button
            type="button"
            onClick={onClose}
            cancel
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!selectedPreset && !customAmount}
          >
            Add
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default AddWaterModal;
