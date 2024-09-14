import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { addField, removeField, updateField } from "../../actions";

const Index = () => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.form.fields);
  
  // State to track errors
  const [errors, setErrors] = useState({});

  const handleAddField = () => {
    dispatch(addField());
  };

  const handleRemoveField = (index) => {
    dispatch(removeField(index));
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[index];
      return newErrors;
    });
  };

  const handleInputChange = (index, event) => {
    dispatch(updateField(index, "value", event.target.value));
  };

  const handleTypeChange = (index, event) => {
    dispatch(updateField(index, "type", event.target.value));
  };

  const handleLabelChange = (index, event) => {
    dispatch(updateField(index, "label", event.target.value));
  };

  const validateForm = () => {
    const newErrors = {};
    fields.forEach((field, index) => {
      switch (field.type) {
        case "text":
          if (!field.value.trim()) newErrors[index] = "Text is required.";
          break;
        case "email":
          if (!field.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            newErrors[index] = "Invalid email address.";
          }
          break;
        case "number":
          if (isNaN(field.value) || field.value.trim() === "") {
            newErrors[index] = "A valid number is required.";
          }
          break;
        case "password":
          if (field.value.length < 6) {
            newErrors[index] = "Password must be at least 6 characters long.";
          }
          break;
        case "date":
          if (!field.value) {
            newErrors[index] = "Date is required.";
          }
          break;
        default:
          break;
      }
    });
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form Submitted", fields);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Dynamic Form Builder</h2>
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12">
        {/* Form Section */}
        <h3 className="mt-5">Add Form Fields</h3>
        <form  onSubmit={handleSubmit}>
          {fields.map((field, index) => (
            <div key={index} className="mb-3">
              {/* Label Input */}
              <input
                type="text"
                className="form-control mb-2"
                value={field.label}
                onChange={(event) => handleLabelChange(index, event)}
                placeholder={`Label for Field ${index + 1}`}
              />

              <div className="input-group">
                {/* Input Type Selector */}
                <select
                  className="form-select"
                  value={field.type}
                  onChange={(event) => handleTypeChange(index, event)}
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="number">Number</option>
                  <option value="password">Password</option>
                  <option value="date">Date</option>
                </select>

                {/* Input Field */}
                <input
                  type={field.type}
                  className={`form-control ${errors[index] ? "is-invalid" : ""}`}
                  value={field.value}
                  onChange={(event) => handleInputChange(index, event)}
                  placeholder={`Field ${index + 1}`}
                />

                {/* Remove Button */}
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveField(index)}
                >
                  Remove
                </button>
              </div>
              {/* Error Message */}
              {errors[index] && <div className="invalid-feedback">{errors[index]}</div>}
            </div>
          ))}

          {/* Add Field and Submit Buttons */}
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddField}
            >
              Add Field
            </button>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </div>
        </form>
        </div> 
        <div className="col-lg-6 col-md-12 col-sm-12">
          {/* Preview Section */}
          <h3 className="mt-5">Form Preview</h3>
          <div className="card p-4">
            {fields.length === 0 ? (
              <p>No fields added.</p>
            ) : (
              fields.map((field, index) => (
                <div key={index} className="mb-3">
                  <label>
                    <strong>{field.label || `Field ${index + 1}`}:</strong>
                  </label>
                  <input
                    type={field.type}
                    className="form-control mt-1"
                    value={field.value}
                    readOnly
                  />
                </div>
              ))
            )}
          </div>
        </div> 
      </div>
      

      
    </div>
  );
};

export default Index;
