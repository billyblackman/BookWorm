import React from "react";

export default function Home() {
  return (
    <>
      <div>
        <h1
          style={{
            left: 0,
            right: 0,
            fontsize: "100rem",
            marginTop: "-0.5rem",
            textAlign: "center",
          }}
        >
          Welcome To Bookworm!
        </h1>
      </div>
      <center>
        <img
          style={{
            width: "auto",
            height: "auto",
            borderRadius: "40%",
          }}
          src="https://cdn.pixabay.com/photo/2019/08/13/10/31/read-4403055_960_720.png"
          alt="bulletin board"
        />
      </center>
    </>
  );
}
