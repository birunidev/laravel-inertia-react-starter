import { getQueryParam } from "@/utils";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";

export default function DataTable({
    dataSource,
    columns,
    pagination,
    handleSorterColumns,
    title,
    searchable = false,
    handleSearch,
}) {
    const [search, setSearch] = useState(getQueryParam("search"));
    const [activeSorterColumn, setActiveSorterColumn] = useState(null);

    const handleAllSorterColumnClick = (column) => {
        let sortDirection = getQueryParam("sortDirection") || "asc";
        setActiveSorterColumn(column);
        handleSorterColumns(column, sortDirection === "asc" ? "desc" : "asc");
    };

    return (
        <div className="shadow p-4 rounded-lg space-y-3 bg-white">
            <div className="flex md:flex-row flex-col gap-3 md:items-center">
                <p className="font-semibold lg:w-2/3">{title}</p>
                {searchable && (
                    <div className="ml-auto flex items-center justify-end gap-2 w-full lg:w-1/3">
                        <input
                            type="text"
                            value={search}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSearch(search);
                                }
                            }}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder=""
                            className="input input-bordered input-sm lg:max-w-[200px] w-full"
                        />
                        <button
                            onClick={() => handleSearch(search)}
                            className="btn btn-primary btn-sm"
                        >
                            Search
                        </button>
                        <button
                            onClick={() => handleSearch("")}
                            className="btn btn-primary btn-sm btn-outline"
                        >
                            Reset
                        </button>
                    </div>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            {columns.map((column) => {
                                return (
                                    <th
                                        key={column.dataIndex}
                                        className="relative align-middle"
                                    >
                                        {column.title}
                                        <button
                                            onClick={() =>
                                                handleAllSorterColumnClick(
                                                    column.dataIndex
                                                )
                                            }
                                            className={`btn btn-ghost btn-sm relative top-[3px] ${
                                                activeSorterColumn ==
                                                column.dataIndex
                                                    ? "bg-blue-50"
                                                    : ""
                                            } ${
                                                !column.sorter
                                                    ? "opacity-0 pointer-events-none"
                                                    : ""
                                            }`}
                                        >
                                            <BiSortAlt2 size={15} />
                                        </button>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {dataSource.length === 0 && (
                            <tr>
                                <td
                                    className="text-center py-6"
                                    colSpan={columns.length}
                                >
                                    No data available...
                                </td>
                            </tr>
                        )}
                        {dataSource.map((data, index) => {
                            return (
                                <tr key={`data-table-row-${index}`}>
                                    {columns.map((column) => {
                                        if (column.render)
                                            return (
                                                <td key={column.dataIndex}>
                                                    {column.render(
                                                        data[column.dataIndex],
                                                        index,
                                                        data
                                                    )}
                                                </td>
                                            );
                                        return (
                                            <td key={column.dataIndex}>
                                                {typeof data[
                                                    column.dataIndex
                                                ] === "object" ||
                                                Array.isArray(
                                                    data[column.dataIndex]
                                                )
                                                    ? JSON.stringify(
                                                          data[column.dataIndex]
                                                      )
                                                    : data[column.dataIndex]}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end">
                <div className="join join-primary">
                    {pagination.links.map((link, index) => {
                        return (
                            <Link
                                href={link.url}
                                key={`pagination-link-${index}`}
                                className={`join-item btn btn-sm ${
                                    link.active ? "btn-active" : ""
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            ></Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
