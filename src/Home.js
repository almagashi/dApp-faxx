import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import PostArticle from './PostArticle'; // Assuming this component exists

function Home() {
    const { logout } = usePrivy();

    return (
        <div className="flex flex-col h-full">
            {/*<PostArticle /> */}
            <div className="mt-4 flex justify-center">
                <button 
                    onClick={logout} 
                    className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-md transition duration-300 ease-in-out hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 backdrop-filter backdrop-blur-sm bg-opacity-70"
                >
                    Log Out
                </button>
            </div>
        </div>
    );
}

export default Home;