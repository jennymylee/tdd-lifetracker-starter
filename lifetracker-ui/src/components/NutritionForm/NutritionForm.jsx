import * as React from "react";
import "./NutritionForm.css";

export default function NutritionForm() {
  const [errors, setErrors] = React.useState({});
  const [form, setForm] = React.useState({
    name: "",
    calories: 1,
    imageUrl: "",
    category: "",
    quantity: 1,
  });

  const handleOnSubmit = () => {};

  const handleOnInputChange = (event) => {
    if (event.target.value === "") {
      setErrors((e) => ({
        ...e,
        [event.target.name]: `Please enter a valid ${event.target.name}.`,
      }));
    } else {
      setErrors((e) => ({ ...e, [event.target.name]: null }));
    }
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
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
            {errors.name && <span className="error">{errors.name}</span>}
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
            {errors.category && (
              <span className="error">{errors.category}</span>
            )}
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
              {errors.quantity && (
                <span className="error">{errors.quantity}</span>
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
              {errors.calories && (
                <span className="error">{errors.calories}</span>
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
            {errors.imageUrl && (
              <span className="error">{errors.imageUrl}</span>
            )}
          </div>
          <button className="submit-nutrition" onClick={handleOnSubmit()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
