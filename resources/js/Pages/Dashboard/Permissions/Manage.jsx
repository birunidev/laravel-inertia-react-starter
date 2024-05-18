import FormInput from "@/Components/atoms/FormInput";
import FormSelect from "@/Components/atoms/FormSelect";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import React from "react";
import { FiSave } from "react-icons/fi";

export default function ManagePermission() {
    const page = usePage().props;
    const { permission, permissionGroup } = page;
    const title = permission ? "Edit Permission" : "Create Permission";

    const { data, setData, post, processing, errors, put } = useForm({
        name: permission?.name ?? "",
        display_name: permission?.display_name ?? "",
        group_name: permission?.group_name ?? permissionGroup[0].name ?? "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (permission) {
            put(route("dashboard.permissions.update", permission.id));
        } else {
            post(route("dashboard.permissions.store"));
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
                                <Link href={route("dashboard.permissions")}>
                                    All Permissions
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
                            label="Nama"
                            value={data.display_name}
                            onChange={(e) =>
                                setData("display_name", e.target.value)
                            }
                            onBlur={(e) =>
                                setData("display_name", e.target.value)
                            }
                            error={errors.display_name}
                        />
                        <FormInput
                            label="Key"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            onBlur={(e) => setData("name", e.target.value)}
                            error={errors.name}
                        />
                        <FormSelect
                            label="Permision Group"
                            value={data.group_name}
                            onChange={(e) =>
                                setData("group_name", e.target.value)
                            }
                            onBlur={(e) =>
                                setData("group_name", e.target.value)
                            }
                            error={errors.group_name}
                            options={permissionGroup.map((group) => ({
                                value: group.name,
                                label: group.name,
                            }))}
                        />

                        <button type="submit" className="btn btn-primary">
                            <FiSave />
                            {processing ? "Saving..." : "Save"}
                        </button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
