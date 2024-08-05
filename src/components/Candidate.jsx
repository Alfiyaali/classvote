import React from 'react';
import { useVotes } from '../components/VoteContext';

const Candidate = ({ name }) => {
  const { votes, castVote } = useVotes();

  return (
    <div className="p-4 m-2 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold">{name}</h2>
      <p>Votes: {votes[name] || 0}</p>
      {/* <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => castVote(name)}
      >
        Votes
      </button> */}
    </div>
  );
};

export default Candidate;
