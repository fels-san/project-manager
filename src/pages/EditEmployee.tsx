import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { employeesActions } from "../store/employeesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

import InputField from "../components/ui/InputField";

export default function EditEmployee() {
  const dispatch = useAppDispatch();

  const employees = useAppSelector((state) => state.employees.employees);

  const navigate = useNavigate();
  const params = useParams();
  const employee = employees.find((e) => e.name === params.employeeName)!;

  const [formData, setFormData] = useState({
    name: employee.name,
    position: employee.position,
    birthDate: employee.birthDate,
    companyStartYear: employee.companyStartYear,
    phone: employee.phone,
    email: employee.email,
  });

  function handleChange(field: string, value: string) {
    const updatedValue =
      (field === "birthDate" || field === "companyStartYear") && value
        ? new Date(value)
        : value;

    setFormData((prev) => ({ ...prev, [field]: updatedValue }));
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formData.name) {
      // eslint-disable-next-line no-alert
      alert("Name are required");
      return;
    }
    dispatch(employeesActions.updateEmployee(formData));
    navigate(`/employee/${employee.name}`);
  }

  return (
    <form
      onSubmit={handleSave}
      className="box-border w-full h-full flex flex-col pt-9 pb-10 pl-10 pr-44 bg-stone-50 overflow-y-scroll"
    >
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
        defaultValue={formData.birthDate?.toString()}
        onChange={(e) => handleChange("birthDate", e.target.value)}
      />
      <InputField
        label="Joined the company"
        type="date"
        defaultValue={formData.companyStartYear?.toString()}
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
        <Link to={`/employee/${employee.name}`}>Cancel</Link>
        <button
          type="submit"
          className="bg-stone-700 text-stone-50 rounded-md px-6 py-2"
        >
          Save
        </button>
      </div>
    </form>
  );
}
