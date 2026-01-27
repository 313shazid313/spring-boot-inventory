import { useGetCustomersQuery } from "../../redux/rtk/all-requests";
import { Link } from "react-router-dom";
import Loading from "../../utility/Loading.jsx";
import ErrorPage from "../../utility/ErrorPage.jsx";
import { useEffect } from "react";

//icons
import { useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";

// tooltip
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
const CustomersList = () => {
  const { data, isError, isLoading, refetch } = useGetCustomersQuery();
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const closeModal = () => setSelectedCustomer(null);

  console.log(data);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;
  return (
    <div>
      <p className="text-2xl py-4 text-center">Customers</p>
      <div className="flex justify-end items-center gap-4">
        {/* Add Button */}
        <Link
          to="customer-form"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Customer +
        </Link>
      </div>
      <br />
      <div>
        {/* table  */}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-3 py-3">
                  Sl No.
                </th>
                <th scope="col" className="px-3 py-3">
                  Name
                </th>
                <th scope="col" className="px-3 py-3">
                  Email
                </th>

                <th scope="col" className="px-3 py-3">
                  Phone Number
                </th>

                <th scope="col" className="px-3 py-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.map((item, index) => (
                <tr
                  key={item.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-3 py-3">{index + 1}</td>
                  <td className="px-3 py-3">{item?.name}</td>
                  <td className="px-3 py-3">{item?.email}</td>
                  <td className="px-3 py-3">{item?.phoneNumber}</td>

                  <td className="px-3 py-3 flex space-x-3">
                    {/* Edit */}
                    <Link
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Edit"
                      to={`customer-update/${item.id}`}
                    >
                      <FaEdit className="text-xl text-blue-500" />
                    </Link>

                    {/* View Sales */}
                    <button
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="View Sales"
                      onClick={() => setSelectedCustomer(item)}
                    >
                      <FaEye className="text-xl text-green-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Tooltip id="my-tooltip" />
        </div>
        <br />
      </div>
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold">
                Sales of {selectedCustomer.name}
              </h2>
              <button
                onClick={closeModal}
                className="text-red-500 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="mt-4 space-y-4">
              {selectedCustomer.sales.length === 0 ? (
                <p className="text-center text-gray-500">
                  No sales found for this customer.
                </p>
              ) : (
                selectedCustomer.sales.map((sale) => (
                  <div
                    key={sale.id}
                    className="border rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex justify-between mb-2">
                      <p>
                        <strong>Invoice:</strong> {sale.invoiceNumber}
                      </p>
                      <p>
                        <strong>Total:</strong> {sale.totalAmount}
                      </p>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      Sale Date: {new Date(sale.saleDate).toLocaleString()}
                    </p>

                    {/* Items Table */}
                    <table className="w-full text-sm border">
                      <thead className="bg-gray-200">
                        <tr>
                          <th className="px-2 py-1 border">Item</th>
                          <th className="px-2 py-1 border">Qty</th>
                          <th className="px-2 py-1 border">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sale.saleItems.map((si) => (
                          <tr key={si.id}>
                            <td className="px-2 py-1 border">{si.item.name}</td>
                            <td className="px-2 py-1 border text-center">
                              {si.quantity}
                            </td>
                            <td className="px-2 py-1 border text-right">
                              {si.price}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersList;
