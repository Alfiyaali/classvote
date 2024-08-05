import React, { useState } from 'react';
import { VoteProvider } from './components/VoteContext';
import VoteForm from './components/VoteForm';
import CandidateList from './components/CandidateList';

const candidates = ['Alice', 'Bob', 'Charlie', 'David'];

const App = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <VoteProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Class Monitor Vote System</h1>
        <button
          onClick={toggleForm}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 mb-4"
        >
          {isFormVisible ? 'Hide Form' : 'Show Form'}
        </button>
        {isFormVisible && <VoteForm />}
        <CandidateList candidates={candidates} />
      </div>
    </VoteProvider>
  );
};

export default App;
