import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateJobMutation,
  useReadDepartmentQuery,
  useGetEmployeesQuery,
  useAssignedJobMutation,
} from "../redux/rtk/all-requests";
import toast from "react-hot-toast";

const JobForm = () => {
  const [createJob, { isLoading }] = useCreateJobMutation();
  const [assignedJob] = useAssignedJobMutation();
  const navigate = useNavigate();

  const { data: departmentData } = useReadDepartmentQuery();
  const { data: employeeData , refetch} = useGetEmployeesQuery();

  const [items, setItems] = useState({
    employeeId: "",
    deptId: "",
    job_name: "",
    salary: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItems((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJobSubmit = async (event) => {
    event.preventDefault();

    const requiredFields = ["employeeId", "deptId", "job_name", "salary"];
    const missingFields = requiredFields.filter((field) => !items[field]);

    if (missingFields.length > 0) {
      toast.error(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    try {
      await createJob(items).unwrap();
      await assignedJob(items.employeeId).unwrap();
      toast.success("New Job Created Successfully");

      navigate(-1);
    } catch (error) {
      console.error(error);
      toast.error(error?.data?.Message || "Job Creation Failed");
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <form onSubmit={handleJobSubmit} className="max-w-4xl mx-auto">
      <p className="text-2xl font-semibold mb-6 text-center">Create New Job</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Name */}
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Job Name *
          </label>
          <div className="mt-2">
            <input
              required
              id="job_name"
              name="job_name"
              placeholder="Enter Job Title"
              value={items.job_name}
              onChange={handleInputChange}
              type="text"
              className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Salary *
          </label>
          <div className="mt-2">
            <input
              required
              id="salary"
              name="salary"
              placeholder="Enter Salary"
              value={items.salary}
              onChange={handleInputChange}
              type="number"
              className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Employee */}
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Select Employee *
          </label>
          <div className="mt-2">
            <select
              name="employeeId"
              value={items.employeeId}
              onChange={handleInputChange}
              required
              className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">--- Select Employee ---</option>
              {employeeData
                ?.filter(
                  (emp) => emp.isAdmin !== true && emp.assigned !== true
                )
                ?.map((emp) => (
                  <option key={emp.id} value={emp.id}>
                    {emp.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-900">
            Select Department *
          </label>
          <div className="mt-2">
            <select
              name="deptId"
              value={items.deptId}
              onChange={handleInputChange}
              required
              className="block w-full rounded-md border py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">--- Select Department ---</option>
              {departmentData?.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex items-center justify-end gap-x-4">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="text-sm font-semibold text-gray-900"
        >
          Cancel
        </button>
        <button
          disabled={isLoading}
          type="submit"
          className="rounded-md bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus:outline-none"
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default JobForm;
