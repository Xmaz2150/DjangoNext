"use client";

import useSWR from "swr";
import Link from "next/link";
import { publicFetcher } from "@/lib/fetcher";

interface HelloResponse {
  message: string;
}

const HelloWorld = () => {
  const { data, isLoading } = useSWR("/api/hello", publicFetcher<HelloResponse>);

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <div className="flex flex-col items-center gap-8">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50">
                        Hello World from Next.js App Router!
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        API Response: {isLoading ? "Loading..." : data?.message}
                    </p>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">Demo Pages</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <Link
                            href="/demo"
                            className="text-blue-600 hover:text-blue-500"
                        >
                            Demo Home
                        </Link>
                        <span className="text-zinc-300 dark:text-zinc-700">•</span>
                        <Link
                            href="/demo/api-test"
                            className="text-blue-600 hover:text-blue-500"
                        >
                            API Test
                        </Link>
                        <span className="text-zinc-300 dark:text-zinc-700">•</span>
                        <Link
                            href="/demo/cookies"
                            className="text-blue-600 hover:text-blue-500"
                        >
                            Cookies
                        </Link>
                        <span className="text-zinc-300 dark:text-zinc-700">•</span>
                        <Link
                            href="/demo/protected"
                            className="text-blue-600 hover:text-blue-500"
                        >
                            Protected
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HelloWorld;