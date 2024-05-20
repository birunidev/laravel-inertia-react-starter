import InputError from "@/Components/Archived/InputError";
import PrimaryButton from "@/Components/Archived/PrimaryButton";
import TextInput from "@/Components/Archived/TextInput";
import { Head, useForm } from "@inertiajs/react";
import AuthLayout from "@/Layouts/AuthLayout";
import FormInput from "@/Components/atoms/FormInput";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("password.email"));
    };

    return (
        <AuthLayout
            title="Forgot your password ?"
            subtitle="No problem. Just let us know your email address and we will
        email you a password reset link that will allow you to choose a
        new one."
        >
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600"></div>

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

                <div className="flex items-center justify-end mt-4">
                    <button
                        className="btn btn-primary w-full"
                        disabled={processing}
                    >
                        Email Password Reset Link
                    </button>
                </div>
            </form>
        </AuthLayout>
    );
}
