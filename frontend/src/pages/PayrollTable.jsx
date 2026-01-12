import {
  useCreatePayrollMutation,
  useGetPayrollQuery,
  usePaidSalaryMutation,
  useDeletePayrollMutation,
} from "../redux/rtk/all-requests";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loading from "../utility/Loading";
import ErrorPage from "../utility/ErrorPage";
import { MdOutlineDelete } from "react-icons/md";

const PayrollTable = () => {
  const [createPayroll, { isLoading: creating }] = useCreatePayrollMutation();
  const [deletePayroll] = useDeletePayrollMutation();
  const [paidSalary] = usePaidSalaryMutation();
  const {
    data: payrollData,
    isLoading: isPayrollLoading,
    error: payrollError,
    refetch,
  } = useGetPayrollQuery();

  console.log(payrollData);

  const [formData, setFormData] = useState({
    month: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaid = async (id) => {
    try {
      const userConfirmed = confirm(
        "Sure You Want Pay?"
      );

      if (userConfirmed) {
        await paidSalary(id);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const userConfirmed = confirm(
        "Sure You Want To Delete?"
      );

      if (userConfirmed) {
        await deletePayroll(id);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPayroll(formData).unwrap();
      toast.success("New Payroll Created Successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Please fill the fields correctly");
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isPayrollLoading) return <Loading />;
  if (payrollError) return <ErrorPage />;

  return (
    <div>
      <div className="">
        <form onSubmit={handleSubmit} className="max-w-lg  rounded-lg ">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Select Month you want to create Payroll*
            </label>
            <select
              name="month"
              value={formData.month}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm"
            >
              <option value="">--- Select Month ---</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end gap-x-4">
            <button
              disabled={creating}
              type="submit"
              className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
                creating ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {creating ? "Creating..." : "Ok"}
            </button>
          </div>
        </form>
      </div>
      <br />
      {/* Payroll Table */}

      <div className="bg-white  border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Payroll Records</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage and view employee payroll information
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Employee ID
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Gross Salary
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Total Deductions
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Net Salary
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Month
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Created At
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
<tbody className="divide-y divide-gray-100">
  {payrollData?.map((item) => (
    <tr
      key={item.id}
      className="hover:bg-blue-50 transition-colors duration-150 ease-in-out"
    >
      <td className="py-4 px-4 text-sm font-medium text-gray-900">
        #{item.id}
      </td>
      <td className="py-4 px-4 text-sm text-gray-700">
        {item.employeeId}
      </td>
      <td className="py-4 px-4 text-sm text-gray-700">
        ${item.grossSalary?.toLocaleString()}
      </td>
      <td className="py-4 px-4 text-sm text-gray-700">
        ${item.totalDeductions?.toLocaleString()}
      </td>
      <td className="py-4 px-4 text-sm font-semibold text-green-600">
        ${item.netSalary?.toLocaleString()}
      </td>
      <td className="py-4 px-4 text-sm capitalize">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {item.month}
        </span>
      </td>
      <td className="py-4 px-4">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            item.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : item.status === "Paid"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.status}
        </span>
      </td>
      <td className="py-4 px-4 text-sm text-gray-500">
        {new Date(item.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </td>
      <td className="px-6 py-4 flex items-center gap-2">
        {/* Only show Pay button if status is not Paid */}
        {item.status !== "paid" && (
          <button
            className="text-white bg-green-600 hover:bg-green-700 rounded-lg text-xs px-3 py-1 transition-colors"
            onClick={() => handlePaid(item.id)}
            aria-label={`Pay salary for ${item.employeeId}`}
          >
            Pay
          </button>
        )}

        <button
          className="flex justify-center"
          onClick={() => handleDelete(item.id)}
          aria-label={`Delete record ${item.id}`}
        >
          <MdOutlineDelete className="text-xl text-red-500 hover:text-red-600 transition-colors" />
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>

        {(!payrollData || payrollData.length === 0) && (
          <div className="text-center py-8">
            <div className="text-gray-400 text-lg mb-2">No records found</div>
            <p className="text-gray-500 text-sm">
              There are no payroll records to display
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayrollTable;
