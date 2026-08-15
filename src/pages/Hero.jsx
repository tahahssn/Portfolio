import React from "react";

import Paragraph from "../components/home/Paragraph";
import Title from "../components/home/Title";
import Backdrop from "../components/home/Backdrop";

const Home = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">

      {/* WebGL hero */}
      <Backdrop />

      {/* Content */}
      <div className="relative z-10 h-full w-full">
        <Paragraph />
        <Title />
      </div>

    </div>
  );
};

export default Home;