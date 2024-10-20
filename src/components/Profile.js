import React from 'react';

function Profile() {
  // Mock data - replace with actual data fetching logic
  const activityLog = [
    { type: 'faxx-check', user: 'You', claim: 'Climate change is accelerating' },
    { type: 'add-claim', user: 'You', claim: 'AI will surpass human intelligence by 2030' },
    { type: 'faxx-check', user: 'You', claim: 'Quantum computers will break current encryption' },
  ];

  const authoredArticles = [
    { id: 1, title: 'The Future of Blockchain Technology is the Future of the World' },
    { id: 2, title: 'Understanding Quantum Computing IS NOT THAT HARD' },
  ];

  const faxxChecksAdded = [
    { id: 1, claim: 'Renewable energy is now cheaper than fossil fuels', evidence: 'According to recent studies...' },
    { id: 2, claim: 'Mars colonization will be possible by 2050', evidence: 'SpaceX plans indicate...' },
  ];

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-white mb-8">Profile</h2>

      <div className="mb-12 bg-gray-900 bg-opacity-50 rounded-xl p-6 border border-gray-800">
        <h3 className="text-2xl font-semibold mb-6 text-white">Activity</h3>
        <ul className="space-y-4">
          {activityLog.map((activity, index) => (
            <li key={index} className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-md">
              <p className="text-sm text-gray-300">
                <span className="font-semibold">{activity.user}</span>
                {activity.type === 'faxx-check' ? ' faxx-checked' : ' added'} the claim:
                <span className="italic ml-1">"{activity.claim}"</span>
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
        <div className="flex-1 bg-gray-900 bg-opacity-50 rounded-xl p-6 border border-gray-800">
          <h3 className="text-2xl font-semibold mb-6 text-white">Posted Claims</h3>
          <ul className="space-y-4">
            {authoredArticles.map((article) => (
              <li key={article.id} className="bg-gray-800 bg-opacity-50 p-4 rounded-lg shadow-md">
                <p className="text-sm font-medium text-gray-300">{article.title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 bg-gray-900 bg-opacity-50 rounded-xl p-6 border border-gray-800">
          <h3 className="text-2xl font-semibold mb-6 text-white">Faxx-checks</h3>
          <ul className="space-y-6">
            {faxxChecksAdded.map((faxxCheck) => (
              <li key={faxxCheck.id} className="space-y-2">
                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-t-lg shadow-md">
                  <h4 className="font-semibold text-sm text-gray-300">Claim: {faxxCheck.claim}</h4>
                </div>
                <div className="bg-gray-700 bg-opacity-50 p-4 rounded-b-lg shadow-md border-t border-gray-600">
                  <p className="text-gray-300 text-sm">
                    <span className="font-semibold text-blue-400">Your faxx:</span> {faxxCheck.evidence}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Profile;
