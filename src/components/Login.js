import React from 'react';

function Login({ onLogin }) {
  return (
    <div className="App min-h-screen flex flex-col items-center justify-center">
      <button 
        onClick={onLogin} 
        className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-900 text-white font-semibold rounded-full shadow-md transition duration-300 ease-in-out hover:from-gray-800 hover:to-gray-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 backdrop-filter backdrop-blur-sm bg-opacity-70"
      >
        Log In
      </button>
    </div>
  );
}

export default Login;
