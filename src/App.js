import "./App.css";
import { usePrivy } from "@privy-io/react-auth";
import faxxLogo from "./faxx_dark.png";
import PostArticle from './components/PostArticle';


function App() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  // Wait until the Privy client is ready before taking any actions
  if (!ready) {
    return null;
  }

  return (
    <div className="App bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 min-h-screen flex flex-col">
      <div className="text-center p-4">
        <img src={faxxLogo} alt="Faxx Logo" className="w-48 mb-2 mx-auto" />
        <p className="text-lg text-gray-300">Promoting independent journalism. Community-driven news story development.</p>
      </div>
      <div className="flex-grow backdrop-filter backdrop-blur-lg bg-black bg-opacity-30 rounded-xl p-4 shadow-2xl w-full max-w-screen-xl mx-auto overflow-hidden flex flex-col">
        {ready && authenticated ? (
          <div className="flex flex-col h-full">
              <PostArticle />
              {/* <textarea
                readOnly
                value={JSON.stringify(user, null, 2)}
                className="w-full h-full bg-gray-800 bg-opacity-50 rounded-lg p-4 text-white font-mono text-sm focus:outline-none"
              /> */}
            <div className="mt-4 flex justify-center">
              <button 
                onClick={logout} 
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-md transition duration-300 ease-in-out hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 backdrop-filter backdrop-blur-sm bg-opacity-70"
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <button 
              onClick={login} 
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold rounded-full shadow-md transition duration-300 ease-in-out hover:from-blue-700 hover:to-teal-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 backdrop-filter backdrop-blur-sm bg-opacity-70"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
