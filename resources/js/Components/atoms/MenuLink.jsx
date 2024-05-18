import { Link } from "@inertiajs/react";
import React from "react";

export default function MenuLink({ title, link, icon, items = [] }) {
    return (
        <li className="text-white">
            {items.length > 0 ? (
                <details open>
                    <summary>
                        {icon}
                        {title}
                    </summary>
                    <ul>
                        {items.map((item, index) => {
                            return (
                                <li key={`menu-item-${index}`}>
                                    <Link href={item.link}>{item.title}</Link>
                                </li>
                            );
                        })}
                    </ul>
                </details>
            ) : (
                <Link href={link}>
                    {icon}
                    {title}
                </Link>
            )}
        </li>
    );
}
