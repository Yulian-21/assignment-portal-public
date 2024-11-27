"use client";
import { useRouter } from "next/navigation";

const ThankYouPage = () => {
  
  const router = useRouter();
  const redirectToMain = () => {
    router.push("/");
  }
  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-gray-100">
      <div className="max-w-sm w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto text-green-500"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <h1 className="text-xl font-bold my-4">
          Thank you for your submission!
        </h1>
        <p className="text-gray-600 mb-6">
          Your assignment has been successfully submitted. We will review it
          shortly.
        </p>
        <button
          className="inline-block px-4 py-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-md no-underline"
          onClick={redirectToMain}
        >
          Submit Another Assignment
        </button>
      </div>
    </main>
  );
};

export default ThankYouPage;
