import * as React from "react";
import "./NutritionForm.css";
import { useAuthContext } from "../../../contexts/auth";
import { useNutritionContext } from "../../../contexts/nutrition";
import { useNavigate } from "react-router-dom";

export default function NutritionForm() {
  // const [errors, setErrors] = React.useState({});
  const [goToNutrition, setGoToNutrition] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    calories: 1,
    imageUrl: "",
    category: "",
    quantity: 1,
  });

  const { user } = useAuthContext();
  const { error, setError, postNutrition, refresh, setRefresh } =
    useNutritionContext();
  const navigate = useNavigate();
  // React.useEffect(() => {
  //   navigate("/nutrition/");
  // }, [goToNutrition]);

  const handleOnInputChange = (event) => {
    if (event.target.value === "") {
      setError((e) => ({
        ...e,
        [event.target.name]: `Please enter a valid ${event.target.name}.`,
      }));
    } else {
      setError((e) => ({ ...e, [event.target.name]: null }));
    }
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    if (form.name == "") {
      setError((e) => ({ ...e, name: "Please enter a valid name." }));
    } else if (form.category == "") {
      setError((e) => ({ ...e, category: "Please enter a valid category." }));
    } else if (form.imageUrl == "") {
      setError((e) => ({ ...e, imageUrl: "Please enter a valid category." }));
    } else {
      setError((e) => ({ ...e, name: null }));
      setError((e) => ({ ...e, category: null }));
      setError((e) => ({ ...e, imageUrl: null }));
    }

    try {
      console.log("before postNutrition----------");
      const nutrition = await postNutrition(form);
      console.log("nutrition returned from postNutrition:", nutrition);
      setRefresh(!refresh);
      // setGoToNutrition(!goToNutrition);
      navigate("/nutrition");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="nutrition-form">
      <div className="nf-card">
        <h2 className="nf-title">Record Nutrition</h2>
        <div className="n-form">
          <div className="input-field">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input
              className="form-input"
              type="text"
              name="name"
              onChange={handleOnInputChange}
              placeholder="Nutrition name"
              value={form.name}
            />
            {error && error.name && <span className="error">{error.name}</span>}
          </div>
          <div className="input-field">
            <label className="form-label" htmlFor="category">
              Nutrition category
            </label>
            <input
              className="form-input long"
              type="text"
              name="category"
              onChange={handleOnInputChange}
              placeholder="Category"
              value={form.category}
            />
            {error.category && <span className="error">{error.category}</span>}
          </div>
          <div className="split-inputs">
            <div className="input-field">
              <label className="form-label" htmlFor="quantity">
                Quantity
              </label>
              <input
                className="form-input"
                type="number"
                name="quantity"
                placeholder="1"
                value={form.quantity}
                onChange={handleOnInputChange}
              />
              {error.quantity && (
                <span className="error">{error.quantity}</span>
              )}
            </div>
            <div className="input-field">
              <label className="form-label" htmlFor="calories">
                Calories
              </label>
              <input
                className="form-input"
                type="number"
                name="calories"
                placeholder="1"
                value={form.calories}
                onChange={handleOnInputChange}
              />
              {error.calories && (
                <span className="error">{error.calories}</span>
              )}
            </div>
          </div>
          <div className="input-field">
            <label className="form-label" htmlFor="imageUrl">
              Image URL
            </label>
            <input
              className="form-input"
              type="text"
              name="imageUrl"
              placeholder="http://www.food-image.com/1"
              value={form.imageUrl}
              onChange={handleOnInputChange}
            />
            {error.imageUrl && <span className="error">{error.imageUrl}</span>}
          </div>
          <button className="submit-nutrition" onClick={handleOnSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
