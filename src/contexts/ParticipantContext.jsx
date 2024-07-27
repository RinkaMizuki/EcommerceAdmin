import { createContext, useState } from "react";

const ParticipantContext = createContext();

const ParticipantProvider = ({ children }) => {
  const [participant, setParticipant] = useState(null);
  const [imgLoading, setImgLoading] = useState(false);

  return (
    <ParticipantContext.Provider
      value={{ participant, setParticipant, imgLoading, setImgLoading }}
    >
      {children}
    </ParticipantContext.Provider>
  );
};

export { ParticipantContext, ParticipantProvider };
