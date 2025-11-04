import React from 'react'

const Skeleton = ({ width = "100%", height = "20px", borderRadius = "4px" }) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
        backgroundSize: "200% 100%",
        animation: "skeleton-loading 1.5s infinite",
        marginBottom: "10px",
      }}
    ></div>
  )
}

// Skeleton Animation
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}`;
document.head.appendChild(styleSheet);
export default Skeleton;