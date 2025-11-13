"use client";

import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<{ insertedId?: string; error?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const testMongoDBConnection = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : "Failed to fetch" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black gap-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
            MongoDB Connection Test
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Click the button below to test the MongoDB connection
          </p>
        </div>

        <button
          onClick={testMongoDBConnection}
          disabled={loading}
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-black px-8 text-white transition-colors hover:bg-zinc-800 disabled:bg-zinc-400 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {loading ? "Testing..." : "Test MongoDB Connection"}
        </button>

        {result && (
          <div className="w-full max-w-md rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
              Result:
            </h2>
            {result.insertedId ? (
              <div className="space-y-2">
                <p className="text-green-600 dark:text-green-400 font-medium">
                  ✓ Success!
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Inserted ID: <code className="bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">{result.insertedId}</code>
                </p>
              </div>
            ) : result.error ? (
              <div className="space-y-2">
                <p className="text-red-600 dark:text-red-400 font-medium">
                  ✗ Error
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 break-words">
                  {result.error}
                </p>
              </div>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}