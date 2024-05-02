"use client";
import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface SliderButtonProps {
    direction: "prev" | "next";
    onClick: () => void;
}

const SliderButton: React.FC<SliderButtonProps> = ({ direction, onClick }) => {
    return (
        <div
            className={`absolute top-1/2 ${direction === "prev" ? "left-0" : "right-0"
                } transform -translate-y-1/2 flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full cursor-pointer`}
            onClick={onClick}
        >
            {direction === "prev" ? (
                <IoIosArrowBack className="h-6 w-6 text-white" />
            ) : (
                <IoIosArrowForward className="h-6 w-6 text-white" />
            )}
        </div>
    );
};

export default SliderButton;