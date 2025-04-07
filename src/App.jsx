// src/App.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import WaterDroplet from "./components/WaterDroplet";
import AddWaterModal from "./components/AddWaterModal";

const AppContainer = styled.div`
  max-width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f7fa 0%, #e4ecfb 100%);
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const AddButton = styled(motion.button)`
  background-color: #3498db;
  color: white;
  padding: 15px 40px;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: #2980b9;
  }
`;

const UserInfo = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  text-align: center;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.danger ? "#e74c3c" : "#3498db")};
  cursor: pointer;
  margin-top: 5px;
  text-decoration: underline;
  font-size: 14px;
  padding: 5px 10px;

  &:hover {
    opacity: 0.8;
  }
`;

const App = () => {
  // Check if user data exists in localStorage
  const [userMetrics, setUserMetrics] = useState(() => {
    const savedMetrics = localStorage.getItem("userMetrics");
    return savedMetrics ? JSON.parse(savedMetrics) : null;
  });

  const [currentIntake, setCurrentIntake] = useState(() => {
    const savedIntake = localStorage.getItem("currentIntake");
    return savedIntake ? parseInt(savedIntake, 10) : 0;
  });

  const [isQuizOpen, setIsQuizOpen] = useState(!userMetrics);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (userMetrics) {
      localStorage.setItem("userMetrics", JSON.stringify(userMetrics));
    }
  }, [userMetrics]);

  useEffect(() => {
    localStorage.setItem("currentIntake", currentIntake.toString());
  }, [currentIntake]);

  const handleQuizComplete = (data) => {
    setUserMetrics(data);
    setIsQuizOpen(false);
  };

  const handleAddWater = (amount) => {
    setCurrentIntake((prev) => prev + amount);
  };

  const resetDailyProgress = () => {
    setCurrentIntake(0);
  };

  // If we have no user metrics, show only the quiz
  if (!userMetrics && !isQuizOpen) {
    setIsQuizOpen(true);
    return null;
  }

  return (
    <AppContainer>
      <Header />

      <MainContent>
        {isQuizOpen && <Quiz onComplete={handleQuizComplete} />}

        {userMetrics && (
          <>
            <WaterDroplet
              currentIntake={currentIntake}
              dailyTarget={userMetrics.dailyTarget}
            />

            <AddButton
              onClick={() => setIsAddModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus />
              Add Water
            </AddButton>

            <UserInfo>
              <div>Daily Target: {userMetrics.dailyTarget} ml</div>
              <div>
                <ActionButton onClick={() => setIsQuizOpen(true)}>
                  Recalculate
                </ActionButton>
                <ActionButton danger onClick={resetDailyProgress}>
                  Reset Today's Progress
                </ActionButton>
              </div>
            </UserInfo>
          </>
        )}

        <AddWaterModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddWater}
        />
      </MainContent>
    </AppContainer>
  );
};

export default App;
