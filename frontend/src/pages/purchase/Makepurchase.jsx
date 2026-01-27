import { useState, useMemo } from "react";
import {
  useMakePurchaseMutation,
  useGetSuppliersQuery,
  useGetItemsQuery,
} from "../../redux/rtk/all-requests";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Makepurchase = () => {
  const navigate = useNavigate();
  const [makePurchase, { isLoading }] = useMakePurchaseMutation();
  const { data: suppliers = [] } = useGetSuppliersQuery();
  const { data: items = [] } = useGetItemsQuery();

  const [form, setForm] = useState({
    quantity: "",
    supplierId: "",
    itemId: "",
  });

  const selectedItem = useMemo(
    () => items.find((i) => i.id === Number(form.itemId)),
    [items, form.itemId],
  );

  const totalPrice = useMemo(() => {
    if (!selectedItem || !form.quantity) return 0;
    return selectedItem.price * Number(form.quantity);
  }, [selectedItem, form.quantity]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedItem) return;

    const payload = {
      quantity: Number(form.quantity),
      totalPrice,
      supplier: { id: Number(form.supplierId) },
      item: { id: selectedItem.id },
    };

    try {
      await makePurchase(payload).unwrap();
      toast.success("Purchase created successfully");
      setForm({ quantity: "", supplierId: "", itemId: "" });
      navigate("/dashboard/get-purchases");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create purchase");
    }
  };

  return (
    <div>
      <p className="text-2xl font-bold mb-6 text-center">Make Purchase</p>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Supplier */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Supplier *
            </label>
            <select
              name="supplierId"
              value={form.supplierId}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-md border px-2 py-1.5"
            >
              <option value="">Select supplier</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Item */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Item *
            </label>
            <select
              name="itemId"
              value={form.itemId}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-md border px-2 py-1.5"
            >
              <option value="">Select item</option>
              {items.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>

            {selectedItem && (
              <p className="mt-1 text-sm text-gray-600">
                Unit price: <strong>{selectedItem.price}</strong>
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Quantity *
            </label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-md border px-2 py-1.5"
            />
          </div>
        </div>

        {/* Total */}
        <p className="mt-4 text-sm text-gray-800">
          Total Price: <span className="font-semibold">{totalPrice}</span>
        </p>

        {/* Submit */}
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`rounded-md px-4 py-2 text-sm font-semibold text-white ${
              isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Saving..." : "Save Purchase"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Makepurchase;
