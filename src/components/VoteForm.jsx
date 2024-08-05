import React, { useState } from 'react';
import { useVotes } from '../components/VoteContext';

const CandidateOptions = ['Alice', 'Bob', 'Charlie', 'David'];

const VoteForm = () => {
  const { addVote, deleteVote, students } = useVotes();
  const [studentName, setStudentName] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');

  const handleVote = () => {
    if (studentName && selectedCandidate) {
      addVote(studentName, selectedCandidate);
      setStudentName('');
      setSelectedCandidate('');
    }
  };

  const handleDelete = () => {
    if (studentName) {
      deleteVote(studentName);
      setStudentName('');
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Vote for Class Monitor</h2>
      <input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Student Name"
        className="p-2 border rounded w-full mb-2"
      />
      <select
        value={selectedCandidate}
        onChange={(e) => setSelectedCandidate(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      >
        <option value="" disabled>Select Monitor</option>
        {CandidateOptions.map((candidate) => (
          <option key={candidate} value={candidate}>
            {candidate}
          </option>
        ))}
      </select>
      <button
        onClick={handleVote}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
      >
        Vote
      </button>
    </div>
  );
};

export default VoteForm;
