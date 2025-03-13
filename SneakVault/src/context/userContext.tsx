// UserContext.tsx
const UserContext = React.createContext({
    user: null,
    isAdmin: false, // Add this line
    // other context values
});