import { Link } from "react-router-dom"
import { FaEdit } from "react-icons/fa"
import { Tooltip } from "react-tooltip"
import { useGetPurchasesQuery } from "../../redux/rtk/all-requests"

const PurchaseList = () => {
  const { data = [], isLoading, isError } = useGetPurchasesQuery()

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>
  }

  if (isError) {
    return <p className="text-center py-10 text-red-500">Failed to load purchases</p>
  }

  return (
    <div>
      <p className="text-2xl py-4 text-center">Purchases</p>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-3 py-3">Sl No.</th>
              <th className="px-3 py-3">Item Name</th>
              <th className="px-3 py-3">Price</th>
              <th className="px-3 py-3">Purchased Qty</th>
              <th className="px-3 py-3">Category</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((purchase, index) => (
              <tr
                key={purchase.id}
                className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700 dark:odd:bg-gray-900 dark:even:bg-gray-800"
              >
                <td className="px-3 py-3">{index + 1}</td>
                <td className="px-3 py-3">{purchase.item?.name}</td>
                <td className="px-3 py-3">{purchase.item?.price}</td>
                <td className="px-3 py-3">{purchase.quantity}</td>
                <td className="px-3 py-3">{purchase.item?.category?.name}</td>

                <td className="px-3 py-3">
                  <Link
                    to={`item-update/${purchase.item?.id}`}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Edit"
                  >
                    <FaEdit className="text-xl text-blue-500" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Tooltip id="my-tooltip" />
      </div>
    </div>
  )
}

export default PurchaseList
