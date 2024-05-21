import { useEffect } from "react";
import InputError from "@/Components/Archived/InputError";
import InputLabel from "@/Components/Archived/InputLabel";
import PrimaryButton from "@/Components/Archived/PrimaryButton";
import TextInput from "@/Components/Archived/TextInput";
import { Head, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import FormInput from "@/Components/atoms/FormInput";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
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

        post(route("password.store"));
    };

    return (
        <AuthLayout title="Reset Password">
            <Head title="Reset Password" />

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
                    autoComplete="new-password"
                    error={errors.password}
                    onChange={(e) => setData("password", e.target.value)}
                />

                <FormInput
                    label="Confirm Password"
                    value={data.password_confirmation}
                    type="password"
                    name="password_confirmation"
                    autoComplete="new-password"
                    error={errors.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                />

                <div className="flex items-center justify-end mt-4">
                    <button
                        className="btn btn-primary w-full"
                        disabled={processing}
                    >
                        Reset Password
                    </button>
                </div>
            </form>
        </AuthLayout>
    );
}
