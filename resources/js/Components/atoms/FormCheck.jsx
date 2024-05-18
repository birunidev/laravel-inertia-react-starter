import React from "react";

export default function FormCheck({
    label,
    value,
    onChange,
    onBlur,
    error,
    placeholder,
    options,
    layout = "vertical",
}) {
    return (
        <div>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text font-bold">{label}</span>
                </div>
            </label>
            <div
                className={`flex ${
                    layout === "vertical" ? "flex-col" : "flex-row"
                }`}
            >
                {options.map((option) => (
                    <div key={option.value} className="form-control">
                        <label className="label cursor-pointer justify-start gap-2">
                            <input
                                onChange={onChange}
                                onBlur={onBlur}
                                type="checkbox"
                                value={option.value}
                                checked={value.includes(option.value)}
                                className="checkbox checkbox-primary checkbox-sm"
                            />
                            <span className="label-text">{option.label}</span>
                        </label>
                    </div>
                ))}
            </div>

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
