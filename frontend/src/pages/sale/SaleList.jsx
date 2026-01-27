import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useGetSalesQuery } from "../../redux/rtk/all-requests";

const SaleList = () => {
  const { data, isLoading, isError } = useGetSalesQuery();
  console.log(data)

  if (isLoading) return <p className="text-center py-6">Loading sales...</p>;
  if (isError)
    return (
      <p className="text-center py-6 text-red-500">Failed to load sales</p>
    );

  return (
    <div>
      <p className="text-2xl py-4 text-center font-semibold">Sales List</p>

      <br />

      {/* Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-3 py-3">Sl</th>
              <th className="px-3 py-3">Invoice Number</th>
              <th className="px-3 py-3">Customer</th>
              <th className="px-3 py-3">Items</th>
              <th className="px-3 py-3">Quantities</th>
              <th className="px-3 py-3">Total Amount</th>
              <th className="px-3 py-3">Sale Date</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((sale, index) => (
              <tr
                key={sale.id}
                className="odd:bg-white even:bg-gray-50 border-b"
              >
                {/* Sl */}
                <td className="px-3 py-3">{index + 1}</td>
                {/* Invoice Number */}
                <td className="px-3 py-3 font-medium">{sale.invoiceNumber}</td>

                {/* Customer */}
                <td className="px-3 py-3 font-medium">
                  {sale?.customer?.name}
                </td>

                {/* Items */}
                <td className="px-3 py-3">
                  {sale?.saleItems?.map((si) => (
                    <div key={si.id}>{si?.item?.name}</div>
                  ))}
                </td>

                {/* Quantities */}
                <td className="px-3 py-3">
                  {sale?.saleItems?.map((si) => (
                    <div key={si.id}>{si.quantity}</div>
                  ))}
                </td>

                {/* Total */}
                <td className="px-3 py-3 font-semibold">{sale?.totalAmount}</td>

                {/* Date */}
                <td className="px-3 py-3">
                  {new Date(sale?.saleDate).toLocaleString()}
                </td>

                {/* Actions */}
                <td className="px-3 py-3">
                  <div className="flex gap-3">
                    <Link
                      to={`sale/${sale.id}`}
                      className="text-blue-500 text-lg"
                      title="View Sale"
                    >
                      <FaEye />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SaleList;
