import React from "react";

const AgeGate = ({ onConfirm, onDeny }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Are you 18 or older?</h2>
        <p>You must be 18+ to enter this website.</p>
        <div style={styles.buttonContainer}>
          <button style={{ ...styles.button, backgroundColor: "#c6102e" }} onClick={onConfirm}>
            Yes, I am 18+
          </button>
          <button style={{ ...styles.button, backgroundColor: "#ccc", color: "#000" }} onClick={onDeny}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },
  modal: {
    backgroundColor: "#000", // black theme
    color: "#fff",
    padding: "40px 30px",
    borderRadius: "10px",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%"
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-around",
    gap: "10px"
  },
  button: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default AgeGate;
