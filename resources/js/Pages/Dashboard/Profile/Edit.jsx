import FormInput from "@/Components/atoms/FormInput";
import FormSelect from "@/Components/atoms/FormSelect";
import MediaLibrary from "@/Components/organisms/MediaLibrary";
import DashboardLayout from "@/Layouts/DashboardLayout";
import {
    getDistricts,
    getProvinces,
    getRegencies,
    getVillages,
} from "@/services/region.services";
import { Link, useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import { HiArrowUpTray } from "react-icons/hi2";

export default function EditProfile() {
    const page = usePage().props;
    const { user } = page;
    const { data, setData, patch, processing, errors } = useForm({
        profile_picture:
            user?.detail?.profile_picture ??
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
        name: user?.name ?? "",
        email: user?.email ?? "",
        phone: user?.detail?.phone ?? "",
        address: user?.detail?.address ?? "",
        province_id: user?.detail?.province_id ?? "",
        regency_id: user?.detail?.regency_id ?? "",
        district_id: user?.detail?.district_id ?? "",
        village_id: user?.detail?.village_id ?? "",
    });
    const [provinces, setProvinces] = useState([]);
    const [regencies, setRegencies] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);

    const handleConfirmMedia = (selectedMedia) => {
        setData("profile_picture", selectedMedia);
        // Do something with the selected media
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route("dashboard.profile.update"));
    };

    useEffect(() => {
        getProvinces().then((res) => {
            setProvinces(res.data);
        });
    }, []);

    useEffect(() => {
        if (data.province_id) {
            getRegencies(data.province_id).then((res) => {
                setRegencies(res.data);
                setDistricts([]);
                setVillages([]);
            });
        }
    }, [data.province_id]);

    useEffect(() => {
        if (data.regency_id) {
            getDistricts(data.regency_id).then((res) => {
                setDistricts(res.data);
                setVillages([]);
            });
        }
    }, [data.regency_id]);

    useEffect(() => {
        if (data.district_id) {
            getVillages(data.district_id).then((res) => {
                setVillages(res.data);
            });
        }
    }, [data.district_id]);

    return (
        <DashboardLayout>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="page-title mb-2">Edit Profile</h1>
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li>
                                <Link href={route("dashboard.index")}>
                                    Dashboard
                                </Link>
                            </li>
                            <li>Edit Profile</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="page-section">
                <div className="page-section__header">
                    <h3 className="page-section__title">
                        Customize your profile
                    </h3>
                </div>
                <div className="page-section__body">
                    <form onSubmit={handleSubmit} className="form-wrapper p-4">
                        <div>
                            <img
                                className="w-32 h-32 rounded-full object-cover"
                                src={data?.profile_picture}
                                alt=""
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() =>
                                document
                                    .getElementById("media-library-modal")
                                    .showModal()
                            }
                            className="btn btn-primary btn-outline mt-4"
                        >
                            <HiArrowUpTray />
                            Upload Your Photo
                        </button>
                        <div className="space-y-1 my-3 grid grid-cols-2 gap-5">
                            <div>
                                <FormInput
                                    label="Name"
                                    value={data?.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    error={errors?.name}
                                />
                                <FormInput
                                    label="Email Address"
                                    value={data?.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    error={errors?.email}
                                />
                                <FormInput
                                    label="Phone"
                                    value={data?.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    error={errors?.phone}
                                />
                            </div>
                            <div>
                                <FormInput
                                    label="Address"
                                    value={data?.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    error={errors?.address}
                                />
                                <div>
                                    <FormSelect
                                        label="Province"
                                        options={provinces.map((province) => ({
                                            label: province.name,
                                            value: province.id,
                                        }))}
                                        value={data?.province_id}
                                        onChange={(e) =>
                                            setData(
                                                "province_id",
                                                e.target.value
                                            )
                                        }
                                        error={errors?.province_id}
                                    />
                                    <FormSelect
                                        label="Regency"
                                        options={regencies.map((regency) => ({
                                            label: regency.name,
                                            value: regency.id,
                                        }))}
                                        value={data?.regency_id}
                                        onChange={(e) =>
                                            setData(
                                                "regency_id",
                                                e.target.value
                                            )
                                        }
                                        error={errors?.regency_id}
                                    />
                                    <FormSelect
                                        label="District"
                                        options={districts.map((district) => ({
                                            label: district.name,
                                            value: district.id,
                                        }))}
                                        value={data?.district_id}
                                        onChange={(e) =>
                                            setData(
                                                "district_id",
                                                e.target.value
                                            )
                                        }
                                        error={errors?.district_id}
                                    />
                                    <FormSelect
                                        label="Village"
                                        options={villages.map((village) => ({
                                            label: village.name,
                                            value: village.id,
                                        }))}
                                        value={data?.village_id}
                                        onChange={(e) =>
                                            setData(
                                                "village_id",
                                                e.target.value
                                            )
                                        }
                                        error={errors?.village_id}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            <MediaLibrary multiple={false} onConfirm={handleConfirmMedia} />
        </DashboardLayout>
    );
}
