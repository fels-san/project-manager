import { React, useState } from "react";
import { useDispatch } from "react-redux";

import { uiActions } from "../../store/uiSlice";
import { employeesActions } from "../../store/employeesSlice";

import InputField from "./projectForm/InputField";

export default function EditEmployee({ employee }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    id: employee.id,
    name: employee.name,
    position: employee.position,
    birthDate: employee.birthDate,
    companyStartYear: employee.companyStartYear,
    phone: employee.phone,
    email: employee.email,
  });

  const handleChange = (field, value) => {
    const updatedValue =
      (field === "birthDate" || field === "companyStartYear") && value
        ? new Date(value)
        : value;

    setFormData((prev) => ({ ...prev, [field]: updatedValue }));
  };

  const handleSave = () => {
    if (!formData.name) {
      // eslint-disable-next-line no-alert
      alert("Name are required");
      return;
    }
    dispatch(employeesActions.updateEmployee(formData));
    dispatch(uiActions.setActionType("viewingProfile"));
  };

  return (
    <div className="box-border w-full h-full flex flex-col pt-9 pb-10 pl-10 pr-44 bg-stone-50 overflow-y-scroll">
      <InputField
        label="Name"
        defaultValue={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <InputField
        label="Role"
        defaultValue={formData.position}
        onChange={(e) => handleChange("position", e.target.value)}
      />
      <InputField
        label="Birthdate"
        type="date"
        defaultValue={formData.birthDate}
        onChange={(e) => handleChange("birthDate", e.target.value)}
      />
      <InputField
        label="Joined the company"
        type="date"
        defaultValue={formData.companyStartYear}
        onChange={(e) => handleChange("companyStartYear", e.target.value)}
      />
      <InputField
        label="Phone"
        type="tel"
        defaultValue={formData.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
      />
      <InputField
        label="Email"
        type="email"
        defaultValue={formData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <div className="flex flex-row justify-end gap-3 mt-4">
        <button type="button">Cancel</button>
        <button
          type="button"
          onClick={handleSave}
          className="bg-stone-700 text-stone-50 rounded-md px-6 py-2"
        >
          Save
        </button>
      </div>
    </div>
  );
}
