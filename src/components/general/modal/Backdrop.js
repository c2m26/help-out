import React from 'react'


const Backdrop = () => {

  const Style = {
    height: "100vh",
    width: "100%",
    backgroundColor: "rgb(128,128,128, 0.65)",
    zIndex: "0",
    position: "fixed",
    top: "0",
    left: "0"
  }

  return (
    <div style={Style}></div>
  )

}

export default Backdrop