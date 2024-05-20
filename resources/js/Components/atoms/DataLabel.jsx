import React from "react";

export default function DataLabel({ label, value, type = "flex" }) {
    return (
        <div
            className={`${
                type === "flex" ? "grid grid-cols-2" : "grid-cols-1 gap-3"
            }`}
        >
            <p className="text-sm md:text-base">{label}</p>
            <div className="text-sm md:text-base font-bold">{value}</div>
        </div>
    );
}
