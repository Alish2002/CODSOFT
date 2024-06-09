import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const {isAuthenticated} = useSelector((state)=>state.auth);
  return (
    <div className="font-sans text-gray-900">
      <header className="text-center py-12 bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
        <h1 className="text-5xl font-bold mb-4 transition duration-500 transform hover:scale-105">Welcome to Project Management Tool</h1>
        <p className="text-xl mb-6 transition duration-500 transform hover:scale-105">Organize your projects, collaborate with your team, and stay on track!</p>
      </header>
      <main className="p-8">
        <section className="mb-12">
          <h2 className="text-4xl font-semibold mb-8 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg transition duration-500 transform hover:scale-105">
              <h3 className="text-2xl font-bold mb-2">Effortless Project Management</h3>
              <p className="text-lg">Create and manage projects with ease using our intuitive interface.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg transition duration-500 transform hover:scale-105">
              <h3 className="text-2xl font-bold mb-2">Real-Time Collaboration</h3>
              <p className="text-lg">Work together with your team in real-time, no matter where you are.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg transition duration-500 transform hover:scale-105">
              <h3 className="text-2xl font-bold mb-2">Progress Tracking</h3>
              <p className="text-lg">Keep track of your project's progress and milestones effortlessly.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg transition duration-500 transform hover:scale-105">
              <h3 className="text-2xl font-bold mb-2">Detailed Analytics</h3>
              <p className="text-lg">Get detailed analytics and reports to make informed decisions.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg transition duration-500 transform hover:scale-105">
              <h3 className="text-2xl font-bold mb-2">Tool Integrations</h3>
              <p className="text-lg">Integrate with your favorite tools for a seamless workflow.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg transition duration-500 transform hover:scale-105">
              <h3 className="text-2xl font-bold mb-2">Secure and Reliable</h3>
              <p className="text-lg">Your data is secure with our industry-leading security measures.</p>
            </div>
          </div>
        </section>
        {!isAuthenticated && (
          <section className="mb-12 text-center">
            <h2 className="text-4xl font-semibold mb-4">Get Started</h2>
            <p className="text-lg mb-6">Sign up now and take control of your projects.</p>
            <Link to="/signup" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300 transform hover:scale-105">
              Sign Up
            </Link>
            <Link to="/login" className="ml-4 inline-block bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition duration-300 transform hover:scale-105">
              Log In
            </Link>
          </section>
        )}
      </main>
    </div>
  );
};

export default Home;
