export default function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
            <h1 className="font-bold text-3xl">{title}</h1>
            <p className="text-gray-500 my-4 max-w-md text-center">
                {subtitle}
            </p>
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
