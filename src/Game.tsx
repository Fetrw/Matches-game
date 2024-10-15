import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeOptimalMove, findWinningMove } from "./utils/gameLogic";
import GameModal from "./components/GameModal";
import GameBoard from "./components/GameBoard";
import "./App.css";
import GameSettings from "./components/GameSettings";

interface Settings {
  totalMatches: number;
  maxTake: number;
  playerFirst: boolean;
}

const App: React.FC = () => {
  const [gameSettings, setGameSettings] = useState<Settings>({
    totalMatches: 25,
    maxTake: 3,
    playerFirst: true,
  });
  const [remainingMatches, setRemainingMatches] = useState<number>(25);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [playerTurn, setPlayerTurn] = useState<boolean>(true);
  const [playerMatches, setPlayerMatches] = useState<number>(0);
  const [computerMatches, setComputerMatches] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [isPlayerWin, setIsPlayerWin] = useState<boolean>(false);

  const startGame = () => {
    setRemainingMatches(gameSettings.totalMatches);
    setPlayerTurn(gameSettings.playerFirst);
    setPlayerMatches(0);
    setComputerMatches(0);
    setGameStarted(true);
    setMessage("");
    setShowModal(false);
  };

  const takeMatches = (count: number) => {
    const newRemaining = Math.max(remainingMatches - count, 0);
    setRemainingMatches(newRemaining);
    setPlayerMatches((prev) => prev + count);
    setPlayerTurn(false);
  };

  const computerTurn = useCallback(() => {
    const optimalMove =
      findWinningMove(
        gameSettings.maxTake,
        remainingMatches,
        computerMatches
      ) || makeOptimalMove(remainingMatches, gameSettings.maxTake);

    if (optimalMove) {
      setMessage(
        `🤖 Computer takes ${optimalMove} match${optimalMove > 1 ? "es" : ""}.`
      );
      setRemainingMatches((prev) => Math.max(prev - optimalMove, 0));
      setComputerMatches((prev) => prev + optimalMove);
      setPlayerTurn(true);
    }
  }, [remainingMatches, gameSettings.maxTake, computerMatches]);

  const resetGame = () => {
    setGameStarted(false);
    setGameSettings({ totalMatches: 25, maxTake: 3, playerFirst: true });
    setShowModal(false);
  };

  useEffect(() => {
    if (gameStarted && !playerTurn && remainingMatches > 0) {
      const timeoutId = setTimeout(computerTurn, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [playerTurn, remainingMatches, gameStarted, computerTurn]);

  useEffect(() => {
    if (remainingMatches === 0 && gameStarted) {
      const playerWon = playerMatches % 2 === 0;
      setIsPlayerWin(playerWon);
      setModalMessage(playerWon ? "🎉 Player wins!" : "🤖 Computer wins!");
      setShowModal(true);
    }
  }, [remainingMatches, gameStarted, playerMatches]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container mt-5 text-light" style={{ maxWidth: "600px" }}>
        {!gameStarted ? (
          <GameSettings
            gameSettings={gameSettings}
            setGameSettings={setGameSettings}
            startGame={startGame}
          />
        ) : (
          <GameBoard
            gameSettings={gameSettings}
            resetGame={resetGame}
            remainingMatches={remainingMatches}
            playerTurn={playerTurn}
            playerMatches={playerMatches}
            computerMatches={computerMatches}
            message={message}
            takeMatches={takeMatches}
          />
        )}

        <GameModal
          showModal={showModal}
          setShowModal={setShowModal}
          modalMessage={modalMessage}
          isPlayerWin={isPlayerWin}
          startGame={startGame}
        />
      </div>
    </div>
  );
};

export default App;
