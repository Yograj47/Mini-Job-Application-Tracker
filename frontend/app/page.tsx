import Link from "next/link";

export default function LandingPage() {
    return (
        <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-white px-4">
            <div className="max-w-md text-center px-4">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight sm:text-4xl">
                    Track Your Tech Applications
                </h1>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                    A centralized full-stack platform built to manage your interview loops, organize job search statuses, and streamline your entire recruitment pipeline from application to offer.
                </p>
                <div className="mt-8">
                    <Link
                        href="/applications"
                        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto"
                    >
                        Go to Applications →
                    </Link>
                </div>
            </div>
        </div>
    );
}