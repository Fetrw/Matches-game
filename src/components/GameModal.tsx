import React from "react";
import { Modal, Button } from "react-bootstrap";

interface GameModalProps {
  modalMessage: string;
  isPlayerWin: boolean;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  startGame: () => void;
}

const GameModal: React.FC<GameModalProps> = ({
  showModal,
  setShowModal,
  modalMessage,
  isPlayerWin,
  startGame,
}) => {
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
      className="bg-dark text-light"
    >
      <Modal.Header closeButton className="bg-dark text-light">
        <Modal.Title>Game Over</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
        <p
          style={{
            color: isPlayerWin ? "green" : "red",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {modalMessage}
        </p>
        <p>Would you like to play again?</p>
      </Modal.Body>
      <Modal.Footer className="bg-dark text-light">
        <Button variant="primary" onClick={startGame}>
          Restart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GameModal;
