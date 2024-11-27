"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import { FormData, FormErrors } from '@/types/types';
import { fetchCandidateLevels } from "../../api/fetchCandidates";
import { submitAssignment } from "../../api/submitAssignment";
import { validateForm } from '../../utils/validation';
import { filterCandidateLevels } from '../../utils/filterCandidateLevels';

const AssignmentForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    assignment_description: "",
    github_repo_url: "",
    candidate_level: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [levels, setLevels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchLevels();
  }, []);

  async function fetchLevels() {
    try {
      const levelsData = await fetchCandidateLevels();
      setLevels(filterCandidateLevels(levelsData)?.levels || []);
    } catch (error) {
      console.error("Failed to fetch candidate levels:", error);
    }
  }

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);
    try {
      const response = await submitAssignment(formData);
      if (!response.ok) {
        throw new Error("Submission failed");
      }
        router.push("/thank-you");
    } catch (error) {
      console.error("Failed to submit the form:", error);
      alert("Failed to submit the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          Assignment Submission Portal
        </h1>
        <p className="mb-6 text-gray-600">
          Submit your assignment details using the form below.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="assignment_description" className="block mb-2">
              Assignment Description
            </label>
            <textarea
              id="assignment_description"
              name="assignment_description"
              value={formData.assignment_description}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded min-h-[100px]"
            />
            {errors.assignment_description && (
              <p className="text-red-500 text-sm">
                {errors.assignment_description}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="github_repo_url" className="block mb-2">
              GitHub Repository URL
            </label>
            <input
              type="url"
              id="github_repo_url"
              name="github_repo_url"
              value={formData.github_repo_url}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.github_repo_url && (
              <p className="text-red-500 text-sm">{errors.github_repo_url}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="candidate_level" className="block mb-2">
              Candidate Level
            </label>
            <select
              id="candidate_level"
              name="candidate_level"
              value={formData.candidate_level}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select your level</option>
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.candidate_level && (
              <p className="text-red-500 text-sm">{errors.candidate_level}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 bg-blue-500 text-white rounded ${
              isLoading ? "opacity-70" : ""
            }`}
          >
            {isLoading ? "Submitting..." : "Submit Assignment"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AssignmentForm;
