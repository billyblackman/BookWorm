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
          Hello! Welcome To Tabloid!
        </h1>
      </div>
      <center>
        <img
          style={{
            width: "auto",
            height: "auto",
            borderRadius: "40%",
          }}
          src="https://www.towson.edu/cla/images/cla-bulletin-board2-m.jpg"
          alt="bulletin board"
        />
      </center>
    </>
  );
}
