"use client";
import React from 'react';
import dynamic from 'next/dynamic';

const AssignmentForm = dynamic(() => import('../components/AssignmentForm/AssignmentForm'), { ssr: false });

const HomePage = () => {
  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <div className="container mx-auto p-4">
            <AssignmentForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
