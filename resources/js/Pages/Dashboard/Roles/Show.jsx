import React, { useState } from "react";
import DataTable from "@/Components/molecules/DataTable";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { getAllQueryParams } from "@/utils";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import PageSection from "@/Components/atoms/PageSection";
import DataLabel from "@/Components/atoms/DataLabel";
import { BiSave } from "react-icons/bi";
import { toast } from "sonner";

export default function IndexRoles() {
    const page = usePage().props;

    const { role, permissionGroups, rolePermissions } = page;

    const queryParams = getAllQueryParams();

    const {
        data: { permissions: selectedPermissions },
        setData,
        processing,
        put,
    } = useForm({
        permissions: rolePermissions,
        from_show_page: 1,
    });

    const handlePermissionChange = (permissionId) => {
        console.log("Permission Changed");

        if (selectedPermissions.includes(permissionId)) {
            const index = selectedPermissions.indexOf(permissionId);
            selectedPermissions.splice(index, 1);
        } else {
            selectedPermissions.push(permissionId);
        }

        setData("selectedPermissions", selectedPermissions);
    };

    const handleSave = () => {
        put(route("dashboard.roles.update", role.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Permission updated successfully");
            },
        });
    };

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="page-title mb-2">
                        Role: {role.display_name}
                    </h1>
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li>
                                <Link href={route("dashboard.index")}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href={route("dashboard.roles")}>
                                    Roles
                                </Link>
                            </li>
                            <li>Role : {role.display_name}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <PageSection title="Basic Information">
                <div className="max-w-sm space-y-4">
                    <DataLabel label="Name" value={role.display_name} />
                    <DataLabel label="Key" value={role.name} />
                    <DataLabel label="Total Users" value={role.user_count} />
                </div>
            </PageSection>
            <PageSection
                title="Manage Role Permissions"
                header={
                    <>
                        <button
                            onClick={handleSave}
                            className="btn btn-success btn-sm"
                        >
                            <BiSave />
                            Save
                        </button>
                    </>
                }
            >
                <div className="grid grid-cols-2 gap-10">
                    {permissionGroups.map((permissionGroup, index) => (
                        <div
                            key={`permission-group-${index}`}
                            className={
                                permissionGroup.permissions.length > 0
                                    ? "block"
                                    : "hidden"
                            }
                        >
                            <p className="font-bold pb-2 border-b border-base-200">
                                {permissionGroup.name}
                            </p>
                            <ul className="pt-3 grid grid-cols-2 gap-4">
                                {permissionGroup.permissions.map(
                                    (permission, index2) => (
                                        <li
                                            key={`permission-${index2}`}
                                            className="flex items-center gap-2"
                                        >
                                            <input
                                                onChange={() =>
                                                    handlePermissionChange(
                                                        permission.name
                                                    )
                                                }
                                                value={permission.name}
                                                checked={selectedPermissions.includes(
                                                    permission.name
                                                )}
                                                type="checkbox"
                                                name={permission.name}
                                                id={permission.name}
                                                className="checkbox checkbox-primary"
                                            />
                                            <label
                                                className="cursor-pointer"
                                                htmlFor={permission.name}
                                            >
                                                {permission.display_name}
                                            </label>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            </PageSection>
        </DashboardLayout>
    );
}
