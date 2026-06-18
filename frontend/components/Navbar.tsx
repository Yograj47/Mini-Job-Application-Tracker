"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
                <Link href="/" className="font-bold text-gray-900 tracking-tight text-base hover:opacity-80 transition-opacity">
                    JobTracker
                </Link>

                <Link 
                    href="/applications" 
                    className={`text-sm bg-gray-200 px-3.5 py-1.5 rounded-2xl font-medium hover:text-gray-900 transition-colors ${
                        pathname.startsWith("/applications") ? "text-blue-500" : "text-gray-600 "
                    }`}
                >
                    Applications
                </Link>
            </div>
        </nav>
    );
}