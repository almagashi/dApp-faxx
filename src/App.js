import "./App.css";
import { usePrivy } from "@privy-io/react-auth";

function App() {
  const { ready, authenticated, user, login, logout } = usePrivy();

  // Wait until the Privy client is ready before taking any actions
  if (!ready) {
    return null;
  }

  return (
    <div className="App bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
      <div className="backdrop-filter backdrop-blur-lg bg-white bg-opacity-10 rounded-xl p-8 shadow-2xl">
        {ready && authenticated ? (
          <div className="flex flex-col items-center">
            <textarea
              readOnly
              value={JSON.stringify(user, null, 2)}
              className="w-96 h-64 bg-white bg-opacity-20 rounded-lg p-4 text-white font-mono text-sm mb-6 focus:outline-none"
            />
            <button 
              onClick={logout} 
              className="px-8 py-3 bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-semibold rounded-full shadow-md transition duration-300 ease-in-out hover:from-blue-500 hover:to-indigo-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log Out
            </button>
          </div>
        ) : (
          <button 
            onClick={login} 
            className="px-8 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full shadow-md transition duration-300 ease-in-out hover:from-green-500 hover:to-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
