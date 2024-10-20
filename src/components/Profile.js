import React from 'react';

function Profile() {
  // Mock data - replace with actual data fetching logic
  const activityLog = [
    { type: 'faxx-check', user: 'You', claim: 'Climate change is accelerating', timestamp: '2023-05-15T14:30:00Z' },
    { type: 'add-claim', user: 'You', claim: 'AI will surpass human intelligence by 2030', timestamp: '2023-05-14T09:15:00Z' },
    { type: 'faxx-check', user: 'You', claim: 'Quantum computers will break current encryption', timestamp: '2023-05-13T18:45:00Z' },
  ];

  const authoredArticles = [
    { id: 1, title: 'The Future of Blockchain Technology', timestamp: '2023-05-10T11:20:00Z' },
    { id: 2, title: 'Understanding Quantum Computing', timestamp: '2023-05-05T16:40:00Z' },
  ];

  const faxxChecksAdded = [
    { id: 1, claim: 'Renewable energy is now cheaper than fossil fuels', evidence: 'According to recent studies...', timestamp: '2023-05-12T13:10:00Z' },
    { id: 2, claim: 'Mars colonization will be possible by 2050', evidence: 'SpaceX plans indicate...', timestamp: '2023-05-08T10:30:00Z' },
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-900 rounded-xl p-8 w-full max-w-4xl text-white shadow-lg">
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6">Activity</h3>
        <ul className="space-y-4">
          {activityLog.map((activity, index) => (
            <li key={index} className="flex items-start">
              <div className="bg-gray-800 p-4 rounded-lg flex-grow shadow-md hover:shadow-lg transition-shadow duration-300">
                <p className="text-sm">
                  <span className="font-semibold">{activity.user}</span>
                  {activity.type === 'faxx-check' ? ' faxx-checked' : ' added'} the claim:
                  <span className="italic ml-1">"{activity.claim}"</span>
                </p>
                <div className="text-xs text-gray-400 mt-2">{formatDate(activity.timestamp)}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-8">
        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-6">Posted Claims</h3>
          <ul className="space-y-4">
            {authoredArticles.map((article) => (
              <li key={article.id} className="flex items-start">
                <div className="bg-gray-800 p-4 rounded-lg flex-grow shadow-md hover:shadow-lg transition-shadow duration-300">
                  <p className="text-sm font-medium">{article.title}</p>
                  <div className="text-xs text-gray-400 mt-2">{formatDate(article.timestamp)}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-semibold mb-6">Faxx-checks</h3>
          <ul className="space-y-4">
            {faxxChecksAdded.map((faxxCheck) => (
              <li key={faxxCheck.id} className="flex items-start">
                <div className="bg-gray-800 p-4 rounded-lg flex-grow shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h4 className="font-semibold mb-2 text-sm">Claim: {faxxCheck.claim}</h4>
                  <p className="text-gray-300 text-sm">Faxx: {faxxCheck.evidence}</p>
                  <div className="text-xs text-gray-400 mt-2">{formatDate(faxxCheck.timestamp)}</div>
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
