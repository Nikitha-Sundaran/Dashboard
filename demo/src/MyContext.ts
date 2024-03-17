import React, { createContext, Dispatch, SetStateAction } from 'react';

// Define the type for the context value
interface UserContextType {
  text: any;
  setText: Dispatch<SetStateAction<string>>;
}

// Create the context with an initial value of an empty string
const MyContext = createContext<UserContextType>({
  text: '',
  setText: () => {},
});

export default MyContext;
