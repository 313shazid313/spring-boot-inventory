import { useState } from "react";
import {
  useMakeSaleMutation,
  useGetCustomersQuery,
  useGetItemsQuery,
} from "../../redux/rtk/all-requests";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MakeSell = () => {
  const navigate = useNavigate();
  const { data: customers = [] } = useGetCustomersQuery();
  const { data: items = [] } = useGetItemsQuery();
  const [makeSale, { isLoading }] = useMakeSaleMutation();

  const [customerId, setCustomerId] = useState("");
  const [saleItems, setSaleItems] = useState([{ itemId: "", quantity: 1 }]);

  /* ---------------- handlers ---------------- */

  const handleItemChange = (index, field, value) => {
    const updated = [...saleItems];
    updated[index][field] = value;
    setSaleItems(updated);
  };

  const addItemRow = () => {
    setSaleItems([...saleItems, { itemId: "", quantity: 1 }]);
  };

  const removeItemRow = (index) => {
    setSaleItems(saleItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      customerId: Number(customerId),
      items: saleItems.map((i) => ({
        itemId: Number(i.itemId),
        quantity: Number(i.quantity),
      })),
    };

    try {
      console.log(payload);
      await makeSale(payload).unwrap();
      toast.success("Sale created successfully");
      navigate("/dashboard/get-sales");
      setCustomerId("");
      setSaleItems([{ itemId: "", quantity: 1 }]);
    } catch (err) {
      console.error(err);
      alert("Failed to create sale");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-2xl font-bold mb-6 text-center">Make Sale</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer */}
        <div>
          <label className="block text-sm font-medium">Customer</label>
          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
            className="mt-2 w-full rounded-md border px-2 py-1.5"
          >
            <option value="">Select customer</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.phoneNumber})
              </option>
            ))}
          </select>
        </div>

        {/* Items */}
        <div>
          <label className="block text-sm font-medium mb-2">Items</label>

          {saleItems.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-3 mb-3 items-center"
            >
              <div className="col-span-7">
                <select
                  value={row.itemId}
                  onChange={(e) =>
                    handleItemChange(index, "itemId", e.target.value)
                  }
                  required
                  className="w-full rounded-md border px-2 py-1.5"
                >
                  <option value="">Select item</option>
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} (Stock: {item.quantity})
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-3">
                <input
                  type="number"
                  min="1"
                  value={row.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                  className="w-full rounded-md border px-2 py-1.5"
                />
              </div>

              <div className="col-span-2">
                {saleItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItemRow(index)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addItemRow}
            className="text-blue-600 text-sm font-semibold"
          >
            + Add another item
          </button>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className={`px-4 py-2 rounded-md text-white ${
              isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Saving..." : "Make Sale"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakeSell;
