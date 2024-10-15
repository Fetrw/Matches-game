import React from "react";
import { FaUser, FaRobot } from "react-icons/fa";

interface GameBoardProps {
  remainingMatches: number;
  playerTurn: boolean;
  playerMatches: number;
  computerMatches: number;
  message: string;
  gameSettings: { maxTake: number };
  takeMatches: (count: number) => void;
  resetGame: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  remainingMatches,
  playerTurn,
  playerMatches,
  computerMatches,
  message,
  gameSettings,
  takeMatches,
  resetGame,
}) => {
  return (
    <div className="bg-dark text-light p-4">
      <h3>Remaining Matches: {remainingMatches}</h3>
      {message && <p>{message}</p>}
      <div className="d-flex justify-content-around my-4">
        <div className="text-center">
          <FaUser size={40} className="mb-2" />
          <p>Player Matches: {playerMatches}</p>
        </div>
        <div className="text-center">
          <FaRobot size={40} className="mb-2" />
          <p>Computer Matches: {computerMatches}</p>
        </div>
      </div>
      <div className="d-flex justify-content-center flex-wrap mt-4">
        {Array.from({ length: remainingMatches }, (_, index) => (
          <div key={index} className="m-1" style={{ position: "relative" }}>
            <div
              style={{
                width: "10px",
                height: "50px",
                backgroundColor: "#D19A6A",
                borderRadius: "5px",
              }}
            ></div>
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "#8B4513",
                borderRadius: "50%",
                position: "absolute",
                top: "-5px",
                left: "-2.5px",
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <h5>Take Matches:</h5>
        <div className="d-flex justify-content-center flex-wrap">
          {Array.from(
            { length: Math.min(gameSettings.maxTake, remainingMatches) },
            (_, i) => (
              <button
                key={i + 1}
                className="btn me-2"
                style={{
                  borderColor: "black",
                  color:
                    playerTurn && remainingMatches >= i + 1 ? "black" : "gray",
                  backgroundColor:
                    playerTurn && remainingMatches >= i + 1 ? "white" : "#444",
                  transition: "background-color 0.3s, color 0.3s",
                  cursor:
                    playerTurn && remainingMatches >= i + 1
                      ? "pointer"
                      : "not-allowed",
                }}
                onClick={() =>
                  playerTurn && remainingMatches >= i + 1 && takeMatches(i + 1)
                }
                disabled={!playerTurn || remainingMatches < i + 1}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
      <button className="btn btn-danger mt-4" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default GameBoard;
