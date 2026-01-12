import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import {
  useChartDataQuery,
  useCountDepartmentQuery,
  useCountEmployeesQuery,
} from "../redux/rtk/all-requests";
import Loading from "../utility/Loading";
import ErrorPage from "../utility/ErrorPage";
import { useEffect } from "react";

const Charts = () => {
  const { data: chartData, isLoading, isError, refetch } = useChartDataQuery();
  const { data: employeeData } = useCountEmployeesQuery();
  const { data: departmentData } = useCountDepartmentQuery();

  // --- Data processing ---
  const processedData = chartData
    ? chartData.map((item) => ({
        ...item,
        total_leaves: Number(item.total_leaves) || 0,
      }))
    : [];

  useEffect(() => {
    refetch();
  }, [refetch]);

  // --- Loading & Error Handling ---
  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage message="Failed to load chart data." />;

  // if (!processedData.length)
  //   return (
  //     <div className="text-center py-10 text-gray-500">
  //       No chart data available.
  //     </div>
  //   );

  // --- Component Layout ---

  return (
    <div className="p-6 flex flex-col gap-10">
      {/* Overview Cards */}
      <div className="flex flex-wrap gap-8 justify-center">
        <div className="bg-white  p-8 rounded-xl w-64 text-center border border-gray-100">
          <p className="text-lg font-medium text-gray-600 mb-3">
            Total Employees 👥
          </p>
          <p className="text-4xl font-bold text-gray-900">
            {employeeData || "—"}
          </p>
        </div>

        <div className="bg-white  p-8 rounded-xl w-64 text-center border border-gray-100">
          <p className="text-lg font-medium text-gray-600 mb-3">
            Total Departments 🏢
          </p>
          <p className="text-4xl font-bold text-gray-900">
            {departmentData || "—"}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className=" rounded-2xl p-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
          Monthly Total Leaves 🌿
        </h3>

        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={processedData}>
            <XAxis dataKey="month_name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend verticalAlign="top" />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="total_leaves"
              name="Total Leaves"
              fill="#8884d8"
              barSize={35}
              radius={[6, 6, 0, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
