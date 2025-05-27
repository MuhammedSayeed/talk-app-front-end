const toastStyle = {
  style: {
    background: "rgba(20, 20, 20, 0.6)", // dark grayish background with opacity
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.1)", // subtle light border
    borderRadius: "0.375rem", // Tailwind's rounded-md
    color: "#fff",
    fontSize: "14px",
  },
  success: {
    style: {
      background: "rgba(20, 20, 20, 0.6)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
  },
  error: {
    style: {
      background: "rgba(20, 20, 20, 0.6)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    },
  },
};


  export {
    toastStyle
  }