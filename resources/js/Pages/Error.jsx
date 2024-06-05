export default function ErrorPage({ status }) {
    console.log(status);
    const title = {
        503: "503: Service Unavailable",
        500: "500: Server Error",
        404: "404: Page Not Found",
        403: "403: Forbidden",
    }[status];

    const description = {
        503: "Sorry, we are doing some maintenance. Please check back soon.",
        500: "Whoops, something went wrong on our servers.",
        404: "Sorry, the page you are looking for could not be found.",
        403: "Sorry, you are forbidden from accessing this page.",
    }[status];

    return (
        <div>
            <div class="flex items-center justify-center h-screen">
                <div class="text-center">
                    <h1 class="text-9xl font-bold text-gray-800">{status}</h1>
                    <h2 class="text-2xl font-semibold text-gray-600">
                        {title}
                    </h2>
                    <p class="text-lg text-gray-500">{description}</p>
                    <div>
                        <button className="px-4 py-2.5 bg-blue-500 rounded-xl">
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
