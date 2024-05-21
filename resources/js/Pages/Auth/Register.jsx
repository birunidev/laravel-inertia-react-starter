import { useEffect } from "react";
import InputError from "@/Components/Archived/InputError";
import InputLabel from "@/Components/Archived/InputLabel";
import PrimaryButton from "@/Components/Archived/PrimaryButton";
import TextInput from "@/Components/Archived/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import FormInput from "@/Components/atoms/FormInput";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <AuthLayout
            title="Welcome!"
            subtitle="Sign Up with your email and password"
        >
            <Head title="Register" />

            <form onSubmit={submit}>
                <FormInput
                    label="Name"
                    value={data.name}
                    type="text"
                    name="name"
                    autoComplete="name"
                    error={errors.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
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

                <FormInput
                    label="Confirm Password"
                    value={data.password_confirmation}
                    type="password"
                    name="password_confirmation"
                    autoComplete="password"
                    error={errors.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                />

                <div className="flex flex-col gap-4 items-center justify-end mt-4">
                    <button
                        className="btn btn-primary w-full"
                        disabled={processing}
                    >
                        Register
                    </button>
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>
                </div>
            </form>
        </AuthLayout>
    );
}
