import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import FormInput from "@/Components/atoms/FormInput";
import AuthLayout from "@/Layouts/AuthLayout";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <AuthLayout
            title="Welcome Back!"
            subtitle="Continue login with your email and password"
        >
            <Head title="Log in" />

            {status && (
                <div className="mb-4 font-medium text-sm text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <FormInput
                    label="Email"
                    value={data.email}
                    type="email"
                    name="email"
                    autoComplete="email"
                    error={errors.email}
                    onChange={(e) => setData("email", e.target.value)}
                />
                <FormInput
                    label="Password"
                    value={data.password}
                    type="password"
                    name="password"
                    autoComplete="password"
                    error={errors.password}
                    onChange={(e) => setData("password", e.target.value)}
                />

                <div className="block mt-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="checkbox checkbox-primary"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="flex flex-col gap-4 justify-end mt-4">
                    <button
                        className="btn btn-primary w-full"
                        disabled={processing}
                    >
                        Log in
                    </button>
                    {canResetPassword && (
                        <div className="text-center">
                            <Link
                                href={route("password.request")}
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    )}
                </div>
            </form>
        </AuthLayout>
    );
}
