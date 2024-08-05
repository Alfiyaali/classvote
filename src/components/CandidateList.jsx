import React from 'react';
import { useVotes } from '../components/VoteContext';

const CandidateList = ({ candidates }) => {
  const { votes, deleteVote } = useVotes();

  return (
    <div className="flex flex-wrap justify-center border-2 border-black">
      {candidates.map((candidate) => (
        <div key={candidate} className="p-4 m-2 border rounded-lg shadow-md border-2 border-red-500 w-48">
          <h2 className="text-xl font-bold">{candidate}</h2>
          <p>Votes: {votes[candidate]?.count || 0}</p>
          <ul>
            {(votes[candidate]?.voters || []).map((voter, index) => (
              <li key={index} className="flex items-center justify-between text-sm my-2">
                {voter}
                <button
                  onClick={() => deleteVote(voter)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CandidateList;
