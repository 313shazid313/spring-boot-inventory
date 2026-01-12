import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateLeaveMutation } from "../redux/rtk/all-requests";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const LeaveForm = () => {
  const navigate = useNavigate()
  const [date, setDate] = useState(new Date());
  const [createLeave, { isLoading }] = useCreateLeaveMutation();

  const raw = localStorage.getItem("user");

  if (!raw) {
    throw new Error("User data not found in local storage.");
  }

  const data = JSON.parse(raw);
  console.log(data.id);

  const [element, setElement] = useState({
    date: "",
    reason: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setElement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitData = {
        ...element,
        date: date?.toLocaleDateString("en-CA"),
        employeeId: data.id,
      };
      console.log(submitData);
      await createLeave(submitData).unwrap();
      toast.success("Leave Request Added Successfully");
      navigate("/dashboard/view-leave-requests-employee")
    } catch (error) {
      toast.error(error?.data?.message || "Please fill the fields correctly");
    }
  };

  return (
    <div>
      <div>
        <p className="text-2xl font-bold mb-6 text-center">
          Add New Leave Request
        </p>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="md:col-span-2">
              <label className="block text-sm/6 font-medium text-gray-900">
                Date *
              </label>
              <div className="mt-2">
                <DatePicker
                  required
                  dateFormat="dd/MM/yyyy"
                  wrapperClassName="datePicker"
                  className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  placeholderText="dd/mm/yyyy"
                />
              </div>
            </div>

            {/* Gender */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-900">
                Gender *
              </label>
              <div className="mt-2">
                <select
                  name="gender"
                  value={element.gender}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"
                >
                  <option value="">--- Select Gender ---</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div> */}

            {/*  */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-900">
                Reason
              </label>
              <div className="mt-2">
                <textarea
                  name="reason"
                  value={element.reason}
                  onChange={handleInputChange}
                  rows="3"
                  className="block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              disabled={isLoading}
              type="submit"
              className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;
