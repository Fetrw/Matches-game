import React from "react";

interface GameSettingsProps {
  gameSettings: {
    totalMatches: number;
    maxTake: number;
    playerFirst: boolean;
  };
  setGameSettings: React.Dispatch<
    React.SetStateAction<{
      totalMatches: number;
      maxTake: number;
      playerFirst: boolean;
    }>
  >;
  startGame: () => void;
}

const GameSettings: React.FC<GameSettingsProps> = ({
  gameSettings,
  setGameSettings,
  startGame,
}) => {
  return (
    <div className="card p-4 bg-dark text-light">
      <h3 className="mb-4">Match Game Settings</h3>
      <div className="mb-3">
        <label htmlFor="totalMatches" className="form-label">
          Total Matches: {gameSettings.totalMatches}
        </label>
        <input
          type="range"
          id="totalMatches"
          className="form-range"
          value={gameSettings.totalMatches}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            if (value % 2 !== 0 && value >= 3) {
              setGameSettings((prev) => ({
                ...prev,
                totalMatches: value,
              }));
            }
          }}
          min={3}
          max={50}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="maxTake" className="form-label">
          Max Matches to Take per Turn: {gameSettings.maxTake}
        </label>
        <input
          type="range"
          id="maxTake"
          className="form-range"
          value={gameSettings.maxTake}
          onChange={(e) =>
            setGameSettings((prev) => ({
              ...prev,
              maxTake: parseInt(e.target.value, 10),
            }))
          }
          min={1}
          max={10}
        />
      </div>
      <div className="form-check mb-4">
        <input
          type="checkbox"
          className="form-check-input"
          id="playerFirst"
          checked={gameSettings.playerFirst}
          onChange={() =>
            setGameSettings((prev) => ({
              ...prev,
              playerFirst: !prev.playerFirst,
            }))
          }
        />
        <label htmlFor="playerFirst" className="form-check-label">
          Should Player Go First?
        </label>
      </div>
      <button className="btn btn-primary" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
};

export default GameSettings;
