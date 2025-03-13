// Example of UserContext
const UserContext = createContext({
    user: null, // User object should include isAdmin property
    setUser: (user) => {}
});