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
