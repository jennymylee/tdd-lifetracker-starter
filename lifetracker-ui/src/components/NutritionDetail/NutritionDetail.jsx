import NutritionCard from "components/NutritionCard/NutritionCard";
import * as React from "react";
import "./NutritionDetail.css";
import { useParams } from "react-router-dom";
import NotFound from "components/NotFound/NotFound";
import { useNutritionContext } from "../../../contexts/nutrition";

export default function NutritionDetail() {
  const { nutritionId } = useParams();
  const { nutritions } = useNutritionContext();
  // const nutritions = [
  //   {
  //     user_id: 1,
  //     id: 1,
  //     name: "apple",
  //     category: "fruit",
  //     calories: 500,
  //     image_url:
  //       "https://media.istockphoto.com/photos/red-apple-with-leaf-picture-id683494078?k=20&m=683494078&s=612x612&w=0&h=MtHUc7vTTZGAAP4-o87T6v57g1KaJP5Vd_oh7LwQca8=",
  //     quantity: 2,
  //     created_at: "2000-01-12",
  //   },
  //   {
  //     user_id: 2,
  //     id: 2,
  //     name: "milk",
  //     category: "dairy",
  //     calories: 100,
  //     image_url:
  //       "https://i5.walmartimages.com/asr/4f0b6f78-f3f2-4837-9a56-1e3840b47fb6_1.a94850152a4e465e1ed20147e54273b7.jpeg",
  //     quantity: 3,
  //     created_at: "2055-12-12",
  //   },
  //   {
  //     user_id: 3,
  //     id: 3,
  //     name: "carrot",
  //     category: "vegetables",
  //     calories: 220,
  //     image_url:
  //       "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F37%2F2020%2F04%2F30%2Fcarrots-106dce5c.jpg&q=60",
  //     quantity: 1,
  //     created_at: "2023-01-17",
  //   },
  //   {
  //     user_id: 4,
  //     id: 4,
  //     name: "bread",
  //     category: "carbs",
  //     calories: 660,
  //     image_url:
  //       "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipe%20Ramp%20Up%2F2021-11-Potato-Bread%2Fpotato_bread_01",
  //     quantity: 1,
  //     created_at: "2023-01-17",
  //   },
  // ];

  const displayNutritionCard = () => {
    for (let i = 0; i < nutritions.length; i++) {
      console.log(
        "nutritions[i].id , nutritionId:",
        nutritions[i].id,
        nutritionId
      );
      if (nutritions[i].id == nutritionId) {
        return <NutritionCard nutrition={nutritions[i]} />;
      }
    }
    return <NotFound />;
  };
  return <div className="nutrition-detail">{displayNutritionCard()}</div>;
}
