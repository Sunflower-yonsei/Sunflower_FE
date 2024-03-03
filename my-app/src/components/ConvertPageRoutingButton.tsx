import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import ConvertPage from "../pages/ConvertPage";
import { useHighContrast } from "./HighContrastMode";

const ConvertPageRoutingButton = () => {
  const { isHighContrast } = useHighContrast();

  return (
    <div
      className={`w-[300px] h-[52px] mx-auto align-middle rounded ${
        isHighContrast
          ? "bg-yellow-300 hover:bg-yellow-600"
          : "bg-stone-800 hover:bg-stone-600"
      } transition duration-300 ease-in-out`}
    >
      <Link to="/convert">
        <button className="flex mx-auto justify-center items-center">
          <div
            className={`${
              isHighContrast ? "text-stone-800" : " text-white"
            } font-eng text-center text-2xl font-semibold leading-[57px] tracking-wide`}
          >
            CONVERT TO BRF
          </div>
        </button>
      </Link>

      <Routes>
        <Route path="/convert" element={<ConvertPage />} />
      </Routes>
    </div>
  );
};

export default ConvertPageRoutingButton;
