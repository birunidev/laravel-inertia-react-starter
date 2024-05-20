import MenuLink from "@/Components/atoms/MenuLink";
import { Link, usePage } from "@inertiajs/react";
import React, { useEffect } from "react";
import { HiOutlineHome, HiOutlineUser, HiOutlineUsers } from "react-icons/hi2";
import { toast } from "sonner";
import { IoSettingsOutline } from "react-icons/io5";
import { BsCardImage } from "react-icons/bs";

export default function DashboardLayout({ children }) {
    const { flash, auth } = usePage().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <div className="w-full overflow-x-hidden">
            <header className="navbar bg-base-100 fixed top-0 left-0 w-full shadow z-50">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle"
                        >
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span className="badge badge-sm indicator-item">
                                    8
                                </span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                        >
                            <div className="card-body">
                                <span className="font-bold text-lg">
                                    8 Items
                                </span>
                                <span className="text-info">
                                    Subtotal: $999
                                </span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block">
                                        View cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={auth.user.detail.profile_picture}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <Link
                                    href={route("dashboard.profile.edit")}
                                    className="justify-between"
                                >
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <aside className="bg-primary w-56 fixed top-0 left-0 w-[250px] h-full z-[60]">
                <div className="p-6">
                    <a className="navbar-brand font-bold text-white">DaisyUI</a>
                </div>
                <ul className="menu w-full">
                    <MenuLink
                        icon={<HiOutlineHome />}
                        link="/dashboard"
                        title="Dashboard"
                    />
                    <MenuLink
                        icon={<BsCardImage />}
                        link="/dashboard/media"
                        title="Media"
                    />
                    <MenuLink
                        icon={<HiOutlineUser />}
                        link="/dashboard/profile"
                        title="Profile"
                    />
                    <MenuLink
                        icon={<HiOutlineUsers />}
                        link="/dashboard/users"
                        title="Authentication"
                        items={[
                            {
                                link: route("dashboard.users"),
                                title: "All Users",
                            },
                            {
                                link: "/dashboard/roles",
                                title: "Roles",
                            },
                            {
                                link: "/dashboard/permissions",
                                title: "Permissions",
                            },
                        ]}
                    />
                </ul>
            </aside>
            <div className="main-content w-full pl-[250px] pt-[90px] bg-base-200">
                <div className="custom-container space-y-4 min-h-[100vh] ">
                    {children}
                </div>
            </div>
        </div>
    );
}
