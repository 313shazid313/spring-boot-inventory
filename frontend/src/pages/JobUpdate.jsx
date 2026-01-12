import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateJobMutation,
  useSingleJobQuery,
  useReadDepartmentQuery,
} from "../redux/rtk/all-requests";
import toast from "react-hot-toast";
import Loading from "../utility/Loading";
import ErrorPage from "../utility/ErrorPage";

const JobUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Get single job data
  const { data: jobData, isLoading: isJobLoading, error } = useSingleJobQuery(id);

  // Update job mutation
  const [updateJob, { isLoading }] = useUpdateJobMutation();

  // Fetch departments (for dropdown)
  const { data: departmentData } = useReadDepartmentQuery();

  // Local form state
  const [items, setItems] = useState({
    job_name: "",
    salary: "",
    deptId: "",
  });

  // Prefill form when job data is fetched
  useEffect(() => {
    if (jobData) {
      setItems({
        job_name: jobData?.job_name || "",
        salary: jobData?.salary || "",
        deptId: jobData?.deptId || "",
      });
    }
  }, [jobData]);

  // Input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItems((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateJob({ id, ...items }).unwrap();
      toast.success("Job updated successfully!");
      navigate("/dashboard/jobs");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update job");
    }
  };

  if (isJobLoading) return <Loading />;
  if (error) return <ErrorPage />;

  return (
    <form onSubmit={handleJobSubmit} className="max-w-4xl mx-auto">
      <p className="text-2xl font-semibold mb-6 text-center">Update Job</p>

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

export default JobUpdate;
