import { createContext, useState } from "react";

const ParticipantContext = createContext();

const ParticipantProvider = ({ children }) => {
  const [participant, setParticipant] = useState(null);

  return (
    <ParticipantContext.Provider value={{ participant, setParticipant }}>
      {children}
    </ParticipantContext.Provider>
  );
};

export { ParticipantContext, ParticipantProvider };
