import React from "react";
import DataTable from "@/Components/molecules/DataTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { getAllQueryParams } from "@/utils";
import { Link, router, usePage } from "@inertiajs/react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";

export default function IndexPermissionGroup() {
    const page = usePage().props;

    const queryParams = getAllQueryParams();

    const { data, ...pagination } = page.permissionGroups;

    const handleSearch = (search) => {
        router.get(route("dashboard.permission-groups"), {
            ...queryParams,
            search: search,
        });
    };

    const handleDelete = (id) => {
        const confirmed = confirm("Are you sure you want to delete this data?");
        if (!confirmed) return;

        router.delete(route("dashboard.permission-groups.destroy", id));
    };

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="page-title mb-2">All Permission Group</h1>
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li>
                                <Link href={route("dashboard.index")}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>All Permission Group</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <Link
                        href={route("dashboard.permission-groups.create")}
                        className="btn btn-primary btn-outline btn-sm"
                    >
                        Add New Permission Group
                    </Link>
                </div>
            </div>

            <DataTable
                title="Browse Permission Group"
                searchable
                handleSearch={handleSearch}
                columns={[
                    {
                        title: "No",
                        dataIndex: "no",
                        render: (_, index) => index + 1,
                    },
                    {
                        title: "Permission Group Name",
                        dataIndex: "name",
                        sorter: true,
                    },
                    {
                        title: "Action",
                        dataIndex: "action",
                        render: (_, __, record) => {
                            console.log(record);
                            return (
                                <div className="flex space-x-2">
                                    <Link
                                        href={route(
                                            "dashboard.permission-groups.edit",
                                            record.id
                                        )}
                                        className="btn btn-sm btn-primary"
                                    >
                                        <HiOutlinePencilSquare />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(record.id)}
                                        className="btn btn-sm btn-error"
                                    >
                                        <HiOutlineTrash />
                                    </button>
                                </div>
                            );
                        },
                    },
                ]}
                dataSource={data}
                pagination={pagination}
                handleSorterColumns={(column, direction) => {
                    router.get(route("dashboard.permission-groups"), {
                        ...queryParams,
                        sortField: column,
                        sortDirection: direction ? direction : "asc",
                    });
                }}
            />
        </DashboardLayout>
    );
}
