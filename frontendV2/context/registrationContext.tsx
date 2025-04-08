import React, { createContext, useContext, useState, ReactNode } from "react";

type RegistrationData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organizationName: string;
  role: string;
  userId: number;
  selectedRole: string; 
  college: string;
  bio: string;
};

const defaultValues: RegistrationData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  organizationName: "",
  role: "",
  selectedRole: "", 
  college: "",
  bio: "",
  userId: 0,
};

const RegistrationContext = createContext<{
    registrationData: RegistrationData;
    setRegistrationData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  }>({
    registrationData: defaultValues,
    setRegistrationData: () => {}, // placeholder, gets overridden by provider
  });

export const useRegistration = () => useContext(RegistrationContext);

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>(defaultValues);

  return (
    <RegistrationContext.Provider value={{ registrationData, setRegistrationData }}>
      {children}
    </RegistrationContext.Provider>
  );
};