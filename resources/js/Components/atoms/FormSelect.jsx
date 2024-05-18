import React from "react";

export default function FormSelect({
    label,
    value,
    onChange,
    onBlur,
    error,
    placeholder,
    options,
}) {
    return (
        <div>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text font-bold">{label}</span>
                </div>
                <select
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    className="select select-bordered"
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </label>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
