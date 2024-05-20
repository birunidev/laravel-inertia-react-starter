import React from "react";

export default function PageSection({ title, children, header }) {
    return (
        <div className="page-section">
            <div className="page-section__header flex items-center justify-between">
                <h3 className="page-section__title">{title}</h3>
                <div>{header}</div>
            </div>
            <div className="page-section__body">{children}</div>
        </div>
    );
}
