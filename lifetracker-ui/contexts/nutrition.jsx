import * as React from "react";
import ApiClient from "../services/apiClient";
import { useAuthContext } from "./auth";

const NutritionContext = React.createContext(null);

export const NutritionContextProvider = ({ children }) => {
  const [nutritions, setNutritions] = React.useState([]);
  const [initialized, setInitialized] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState({});
  const [refresh, setRefresh] = React.useState(false);
  const { user, apiClient } = useAuthContext();
  //   const apiClient = new ApiClient(API_BASE_URL);
  React.useEffect(() => {
    const getNutritions = async () => {
      let nutritionsArray = [];
      try {
        // userToken = window.localStorage.getItem("lifetracker_token");
        // console.log("usertoken in nutrition context", userToken);
        console.log("user in nutrition context", user);
        if (user) {
          setIsLoading(true);
          console.log("user.id in nutrition context", user.user.id);
          nutritionsArray = await apiClient.getNutritionsFromUser(user.user.id);
          console.log("Nutritions array:", nutritionsArray.nutritions);
          setNutritions(nutritionsArray.nutritions);
          setError({});
        }
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
      setInitialized(true);
    };
    getNutritions();
  }, [user, refresh]);

  const getNutritionById = async (nutritionId) => {
    return await apiClient.getNutritionById(nutritionId);
  };

  const postNutrition = async (item) => {
    if (user.user.hasOwnProperty("id")) {
      return await apiClient.postNutrition(item, user.user.id);
    }
  };
  const val = {
    error,
    setError,
    isLoading,
    setIsLoading,
    nutritions,
    setNutritions,
    initialized,
    setInitialized,
    getNutritionById,
    postNutrition,
    refresh,
    setRefresh,
  };
  return (
    <NutritionContext.Provider value={val}>
      <>{children}</>
    </NutritionContext.Provider>
  );
};

export const useNutritionContext = () => React.useContext(NutritionContext);
