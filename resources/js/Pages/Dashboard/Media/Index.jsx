import DataTable from "@/Components/molecules/DataTable";
import MediaLibrary from "@/Components/organisms/MediaLibrary";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { getMediaUrl } from "@/utils";
import { Link, router, usePage } from "@inertiajs/react";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi2";

export default function Index() {
    const page = usePage().props;

    const { data, ...pagination } = page.medias;

    const handleDelete = (id) => {
        const confirmed = confirm("Are you sure you want to delete this data?");
        if (!confirmed) return;

        router.delete(route("dashboard.permission-groups.destroy", id));
    };

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="page-title mb-2">All Media</h1>
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li>
                                <Link href={route("dashboard.index")}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>All Media</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() =>
                            document
                                .getElementById("media-library-modal")
                                .showModal()
                        }
                        className="btn btn-primary btn-outline btn-sm"
                    >
                        Add New Media
                    </button>
                </div>
            </div>
            <DataTable
                title="Browse Media"
                dataSource={data}
                pagination={pagination}
                columns={[
                    {
                        title: "No",
                        dataIndex: "no",
                        render: (_, index) => (
                            <div className="text-center">
                                {pagination.from + index}
                            </div>
                        ),
                    },
                    {
                        title: "Image",
                        dataIndex: "filepath",
                        render: (value) => (
                            <div className="w-[200px] overflow-hidden h-[200px] flex items-center justify-center">
                                <img
                                    src={getMediaUrl(value)}
                                    className="w-[200px]"
                                    alt=""
                                />
                            </div>
                        ),
                    },
                    {
                        title: "Uploaded At",
                        dataIndex: "created_at",
                        render: (value) => new Date(value).toLocaleString(),
                    },
                    {
                        title: "Action",
                        dataIndex: "id",
                        render: (value) => (
                            <div className="flex items-center justify-center">
                                <button
                                    onClick={() => handleDelete(value)}
                                    className="btn btn-error btn-sm"
                                >
                                    <HiOutlineTrash />
                                </button>
                            </div>
                        ),
                    },
                ]}
            />
            <MediaLibrary multiple={true} isInMediaPage={true} />
        </DashboardLayout>
    );
}
