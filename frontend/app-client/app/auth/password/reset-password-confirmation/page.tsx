"use client";

import { Suspense } from "react";

import ResetPasswordConfirmation from "@/app/components/ResetPasswordConfirmation";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<h2> Loading </h2>}>
        <ResetPasswordConfirmation />
      </Suspense>
    </main>
  );
}