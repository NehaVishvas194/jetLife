import React from "react";

const Loader = () => {
  return (
    <div style={styles.overlay}>
      <div style={styles.spinner}></div>
    </div>
  );
};
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255,255,255,0.7)", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  spinner: {
    width: "100px",
    height: "100px",
    border: "6px solid #f3f3f3",
    borderTop: "6px solid #4CAF50", 
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// Spinner animation
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(styleSheet);
export default Loader;