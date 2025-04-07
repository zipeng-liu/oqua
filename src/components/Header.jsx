// src/components/Header.jsx
import React from "react";
import styled from "styled-components";
import { FaWater } from "react-icons/fa";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const Title = styled.h1`
  color: #3498db;
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WaterIcon = styled.span`
  color: #3498db;
  font-size: 24px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Oqua Water Tracker</Title>
    </HeaderContainer>
  );
};

export default Header;
