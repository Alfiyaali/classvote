import React, { createContext, useState, useEffect, useContext } from 'react';

const VoteContext = createContext();

export const useVotes = () => {
  return useContext(VoteContext);
};

const loadVotes = () => {
  const savedVotes = localStorage.getItem('votes');
  return savedVotes ? JSON.parse(savedVotes) : {};
};

const loadStudents = () => {
  const savedStudents = localStorage.getItem('students');
  return savedStudents ? JSON.parse(savedStudents) : [];
};

export const VoteProvider = ({ children }) => {
  const [votes, setVotes] = useState(loadVotes());
  const [students, setStudents] = useState(loadStudents());

  useEffect(() => {
    localStorage.setItem('votes', JSON.stringify(votes));
  }, [votes]);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const addVote = (studentName, candidate) => {
    setVotes((prevVotes) => {
      const updatedVotes = {
        ...prevVotes,
        [candidate]: {
          count: (prevVotes[candidate]?.count || 0) + 1,
          voters: [...(prevVotes[candidate]?.voters || []), studentName],
        },
      };
      return updatedVotes;
    });
    setStudents((prevStudents) => [
      ...prevStudents,
      { name: studentName, candidate },
    ]);
  };

  const deleteVote = (studentName) => {
    setStudents((prevStudents) => {
      const updatedStudents = prevStudents.filter(
        (student) => student.name !== studentName
      );
      const updatedVotes = updatedStudents.reduce((acc, student) => {
        acc[student.candidate] = {
          count: (acc[student.candidate]?.count || 0) + 1,
          voters: (acc[student.candidate]?.voters || []).filter(
            (voter) => voter !== studentName
          ),
        };
        return acc;
      }, {});
      return updatedStudents;
    });
    
    // Also update votes state to reflect the changes
    setVotes((prevVotes) => {
      const updatedVotes = Object.entries(prevVotes).reduce((acc, [candidate, data]) => {
        const filteredVoters = data.voters.filter(voter => voter !== studentName);
        if (filteredVoters.length > 0) {
          acc[candidate] = {
            count: filteredVoters.length,
            voters: filteredVoters,
          };
        }
        return acc;
      }, {});
      return updatedVotes;
    });
  };

  return (
    <VoteContext.Provider value={{ votes, addVote, deleteVote, students }}>
      {children}
    </VoteContext.Provider>
  );
};
