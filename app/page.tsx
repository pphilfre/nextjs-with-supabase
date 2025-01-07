"use client";

import { useState } from 'react';
import Hero from "@/components/hero";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";

export default function Home() {
  const [isAnnual, setIsAnnual] = useState(false);

  const togglePricing = () => {
    setIsAnnual(!isAnnual);
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <a
            href="#"
            className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            role="alert"
          >
            <span className="text-xs bg-green-800 hover:bg-green-600 rounded-full text-white px-4 py-1.5 mr-3">Dev</span>
            <span className="text-sm font-medium">School Manager is in dev, see updates!</span>
            <svg
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            School Manager 📚
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            A comprehensive tool for managing student records, attendance, grades, and communication between teachers, students, and parents.
          </p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Get Started
            </a>
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-100 dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">About Us</h2>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-8">
            We are a dedicated team committed to providing the best tools for managing educational institutions. Our mission is to simplify administrative tasks and enhance communication between teachers, students, and parents.
          </p>
          <div className="flex justify-center space-x-4">
            <img src="/images/team1.jpg" alt="Team Member 1" className="w-24 h-24 rounded-full" />
            <img src="/images/team2.jpg" alt="Team Member 2" className="w-24 h-24 rounded-full" />
            <img src="/images/team3.jpg" alt="Team Member 3" className="w-24 h-24 rounded-full" />
          </div>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto py-16 px-4">
          <div className="flex justify-center mb-8">
            <div className="relative inline-flex items-center bg-gray-200 dark:bg-gray-700 rounded-full p-1">
              <button
                className={`px-4 py-2 rounded-full focus:outline-none ${!isAnnual ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'}`}
                onClick={togglePricing}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-full focus:outline-none ${isAnnual ? 'bg-blue-500 text-white' : 'text-gray-700 dark:text-gray-300'}`}
                onClick={togglePricing}
              >
                Annually
              </button>
            </div>
          </div>
          <div className="flex flex-wrap -m-4">
            {/* Beginner Plan */}
            <div className="p-4 md:w-1/3">
              <div className="h-full bg-white dark:bg-gray-900 p-8 rounded shadow-lg flex flex-col">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Beginner</h2>
                <p className="leading-relaxed text-base text-gray-600 dark:text-gray-400 mb-4">
                  ✅ Feature 1 <br></br>
                  ✅ Feature 2 <br></br>
                  ✅ Feature 3 <br></br>
                </p>
                <div className="mt-auto">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isAnnual ? '£99.99/year' : '£9.99/month'}
                  </p>
                  <button className="flex items-center justify-center text-white bg-primary-700 border-0 py-2 px-4 w-full focus:outline-none hover:bg-primary-800 rounded">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
            {/* Pro Plan */}
            <div className="p-4 md:w-1/3">
              <div className="relative h-full bg-white dark:bg-gray-900 p-8 rounded shadow-lg flex flex-col border-4 border-primary-500">
                <div className="absolute top-0 right-0 mt-2 mr-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">Most Bought</div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Pro</h2>
                <p className="leading-relaxed text-base text-gray-600 dark:text-gray-400 mb-4">
                  ✅ Feature 1 <br></br>
                  ✅ Feature 2 <br></br>
                  ✅ Feature 3 <br></br>
                  ✅ Feature 4 <br></br>
                </p>
                <div className="mt-auto">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isAnnual ? '£199.99/year' : '£19.99/month'}
                  </p>
                  <button className="flex items-center justify-center text-white bg-primary-700 border-0 py-2 px-4 w-full focus:outline-none hover:bg-primary-800 rounded">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
            {/* Enterprise Plan */}
            <div className="p-4 md:w-1/3">
              <div className="h-full bg-white dark:bg-gray-900 p-8 rounded shadow-lg flex flex-col">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Enterprise</h2>
                <p className="leading-relaxed text-base text-gray-600 dark:text-gray-400 mb-4">
                  ✅ Feature 1 <br></br>
                  ✅ Feature 2 <br></br>
                  ✅ Feature 3 <br></br>
                  ✅ Feature 4 <br></br>
                  ✅ Feature 5 <br></br>
                </p>
                <div className="mt-auto">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {isAnnual ? '£299.99/year' : '£29.99/month'}
                  </p>
                  <button className="flex items-center justify-center text-white bg-primary-700 border-0 py-2 px-4 w-full focus:outline-none hover:bg-primary-800 rounded">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}