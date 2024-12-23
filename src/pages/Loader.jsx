import React from "react";
import "../../src/loader.css"
const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-[80%] ">
      <div className="flex justify-center items-center border-2 border-white w-48 h-48 relative shadow-lg rounded-lg">
        <div class="loading">
          <div class="loading1"></div>
        </div>
      </div>
    </div>
  );
};
export default Loader;
