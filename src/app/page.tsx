// src/app/page.tsx
"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Tailwind is Working 🎉</h1>
      <p className="mt-4 text-lg text-gray-700">If you see this styled text, you’re all set.</p>
      <div className="mt-6 flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Nice Button
        </button>
        <Button>ShadCN Button</Button>
      </div>
    </main>
  );
}
