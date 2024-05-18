import FormInput from "@/Components/atoms/FormInput";
import FormSelect from "@/Components/atoms/FormSelect";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import React from "react";
import { FiSave } from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi2";

export default function ManagePermission() {
    const page = usePage().props;
    const { permissionGroup } = page;
    const title = permissionGroup
        ? "Edit Permission Group"
        : "Create Permission Group";

    const { data, setData, post, processing, errors, put } = useForm({
        name: permissionGroup?.name ?? "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (permissionGroup) {
            put(
                route("dashboard.permission-groups.update", permissionGroup.id)
            );
        } else {
            post(route("dashboard.permission-groups.store"));
        }
    };

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="page-title mb-2">{title}</h1>
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li>
                                <Link href={route("dashboard.index")}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={route("dashboard.permission-groups")}
                                >
                                    All Permission Groups
                                </Link>
                            </li>
                            <li>{title}</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="page-section">
                <div className="page-section__header">
                    <h3 className="page-section__title">Form {title}</h3>
                </div>
                <div className="page-section__body">
                    <form onSubmit={handleSubmit} className="custom-form">
                        <FormInput
                            label="Name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            onBlur={(e) => setData("name", e.target.value)}
                            error={errors.name}
                        />

                        <button type="submit" className="btn btn-primary">
                            <FiSave />
                            {processing ? "Saving..." : "Save"}
                        </button>
                    </form>
                </div>
            </div>
            <div className="text-right">
                <Link
                    href={route("dashboard.permissions")}
                    className="btn btn-link"
                >
                    <HiArrowRight />
                    Manage Permissions
                </Link>
            </div>
        </DashboardLayout>
    );
}
