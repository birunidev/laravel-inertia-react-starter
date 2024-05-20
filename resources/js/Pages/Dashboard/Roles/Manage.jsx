import FormInput from "@/Components/atoms/FormInput";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { FiSave } from "react-icons/fi";
import slugify from "slugify";

export default function ManageRole() {
    const page = usePage().props;
    const { role } = page;
    const title = role ? "Edit Role" : "Create Role";

    const { data, setData, post, processing, errors, put } = useForm({
        name: role?.name ?? "",
        display_name: role?.display_name ?? "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (role) {
            put(route("dashboard.roles.update", role.id));
        } else {
            post(route("dashboard.roles.store"));
        }
    };

    useEffect(() => {
        if (data.display_name) {
            setData("name", slugify(data.display_name, { lower: true }));
        }
    }, [data.display_name]);

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
                                <Link href={route("dashboard.roles")}>
                                    All Roles
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
