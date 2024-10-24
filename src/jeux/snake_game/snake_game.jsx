import React, { useState, useEffect } from "react";
import styled from "styled-components";
import meal1 from '../../assets/img-1.jpg';
import meal2 from '../../assets/img-2.jpg';
import meal3 from '../../assets/img-3.jpg';
import meal4 from '../../assets/img-4.jpg';
import meal5 from '../../assets/img-5.jpg';
import meal6 from '../../assets/img-6.jpg';
// Styled components for the game
const GameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0e68c;
`;

const Board = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  background-color: #333;
  border: 2px solid #8b4513;
  overflow: hidden;
`;

const SnakeSegment = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  background: linear-gradient(145deg, #32cd32, #228b22);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(50, 205, 50, 0.7);
  animation: glow 0.5s alternate infinite;

  @keyframes glow {
    0% {
      box-shadow: 0 0 5px rgba(50, 205, 50, 0.3);
    }
    100% {
      box-shadow: 0 0 15px rgba(50, 205, 50, 0.8);
    }
  }
`;

const MealImage = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  animation: spin 3s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [meal, setMeal] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [mealImage, setMealImage] = useState('');

  // Array of meal images
  const mealImages = [meal1, meal2, meal3, meal4, meal5, meal6];

  // Handle snake movement
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Move the snake and detect meal consumption
  useEffect(() => {
    const moveSnake = () => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = newSnake[0];
        const newHead = { x: head.x + direction.x, y: head.y + direction.y };
        newSnake.unshift(newHead);

        // If the snake eats the meal
        if (newHead.x === meal.x && newHead.y === meal.y) {
          // Place a new meal and randomly select a meal image
          setMeal({
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
          });
          const randomMeal = mealImages[Math.floor(Math.random() * mealImages.length)];
          setMealImage(randomMeal);
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [direction, meal]);

  return (
    <GameContainer>
      <Board>
        {snake.map((segment, index) => (
          <SnakeSegment
            key={index}
            style={{ left: `${segment.x * 20}px`, top: `${segment.y * 20}px` }}
          />
        ))}
        <MealImage
          src={mealImage || mealImages[0]} // Default to first image if not set
          alt="Meal"
          style={{ left: `${meal.x * 20}px`, top: `${meal.y * 20}px` }}
        />
      </Board>
    </GameContainer>
  );
};

export default SnakeGame;
