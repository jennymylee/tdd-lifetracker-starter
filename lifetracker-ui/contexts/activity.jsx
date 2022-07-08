import * as React from "react";
import ApiClient from "../services/apiClient";
import { useAuthContext } from "./auth";
import { useNutritionContext } from "./nutrition";

const API_BASE_URL = "http://localhost:3001";

const ActivityContext = React.createContext(null);

export const ActivityContextProvider = ({ children }) => {
  const [activity, setActivity] = React.useState({});
  const [initialized, setInitialized] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState({});

  const { user, apiClient } = useAuthContext();
  const { nutritions } = useNutritionContext();

  React.useEffect(() => {
    const getActivity = async () => {
      try {
        if (user) {
          setIsLoading(true);
          console.log("act context user.user.id", user.user.id);
          const thisActivity = await apiClient.getActivityFromUser(
            user.user.id
          );
          console.log("thisActivity in act context:", thisActivity);
          setActivity(thisActivity);
          console.log(activity);
          setError({});
        }
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
      setInitialized(true);
    };
    getActivity();
  }, [nutritions, user]);

  const val = {
    activity,
    setActivity,
    error,
    setError,
    isLoading,
    setIsLoading,
    initialized,
    setInitialized,
  };
  return (
    <ActivityContext.Provider value={val}>
      <>{children}</>
    </ActivityContext.Provider>
  );
};
export const useActivityContext = () => React.useContext(ActivityContext);
