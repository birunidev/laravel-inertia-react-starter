import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <DashboardLayout>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="page-title mb-2">Dashboard</h1>
                </div>
            </div>
            <div className="page-section">
                <div className="page-section__header">
                    <h3 className="page-section__title">Hello!</h3>
                </div>
                <div className="page-section__body">
                    Welcome to your dashboard, {auth.user.name}!
                </div>
            </div>
        </DashboardLayout>
    );
}
