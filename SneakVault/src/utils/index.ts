// context/userContext.tsx
const UserContext = createContext({
    user: null,
    isAdmin: false, // Add this line
    // other context values
});