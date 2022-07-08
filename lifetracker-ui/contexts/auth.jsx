import * as React from "react";
import ApiClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../constants";

const AuthContext = React.createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [refresh, setRefresh] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [initialized, setInitialized] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState({});

  const apiClient = new ApiClient(API_BASE_URL);

  React.useEffect(() => {
    const getUser = async () => {
      let userToken = null;
      let user = null;

      try {
        userToken = window.localStorage.getItem("lifetracker_token");
        console.log("usertoken in auth", userToken);
        if (userToken) {
          apiClient.setToken(userToken);
          setIsProcessing(true);
          user = await fetchUserFromToken();
          setUser(user);
          console.log("user upon refresh", user);
          setError(null);
        }
      } catch (err) {
        setError(err.message);
      }

      setIsProcessing(false);
      setInitialized(true);
    };

    getUser();
  }, [refresh]);

  const loginUser = async (user) => {
    return await apiClient.login(user);
  };

  const signupUser = async (user) => {
    return await apiClient.signup(user);
  };

  const fetchUserFromToken = async () => {
    return await apiClient.fetchUserFromToken();
  };

  const logoutUser = async (user) => {
    window.localStorage.removeItem("lifetracker_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        apiClient,
        refresh,
        setRefresh,
        user,
        setUser,
        initialized,
        setInitialized,
        isProcessing,
        setIsProcessing,
        error,
        setError,
        loginUser,
        signupUser,
        fetchUserFromToken,
        logoutUser,
      }}
    >
      <>{children}</>
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
