import React, { useEffect, useState } from "react";
import { RiArrowUpSLine } from "react-icons/ri";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`go-top ${visible ? "active" : ""}`}
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 1000,
        background: "#d7e04e",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: "35px",
        height: "35px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 5px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <RiArrowUpSLine size={24} />
    </button>
  );
};

export default BackToTopButton;
