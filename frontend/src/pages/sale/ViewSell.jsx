import { useGetSingleSaleQuery } from "../../redux/rtk/all-requests";
import { useParams } from "react-router-dom";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";

// Create a PDF document component
// Create a visually enhanced PDF document component
const InvoiceDocument = ({ sale }) => (
  <Document>
    <Page style={styles.page}>
      {/* Invoice Header */}
      <Text style={styles.header}>Invoice</Text>

      {/* Customer Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Information</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Name:</Text> {sale.customer.name}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Email:</Text> {sale.customer.email}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Phone:</Text> {sale.customer.phoneNumber}
        </Text>
      </View>

      {/* Sale Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sale Details</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Total Amount:</Text> $
          {sale.totalAmount.toFixed(2)}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Date:</Text>{" "}
          {new Date(sale.saleDate).toLocaleString()}
        </Text>
      </View>

      {/* Items Sold */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Items Sold</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCol}>Item</Text>
            <Text style={styles.tableCol}>Category</Text>
            <Text style={styles.tableCol}>Price</Text>
            <Text style={styles.tableCol}>Quantity</Text>
            <Text style={styles.tableCol}>Total</Text>
          </View>

          {/* Table Rows */}
          {sale.saleItems.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <Text style={styles.tableCol}>{item.item.name}</Text>
              <Text style={styles.tableCol}>{item.item.category.name}</Text>
              <Text style={styles.tableCol}>${item.price.toFixed(2)}</Text>
              <Text style={styles.tableCol}>{item.quantity}</Text>
              <Text style={styles.tableCol}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Footer / Thank you */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Thank you for your purchase!</Text>
      </View>
    </Page>
  </Document>
);

// Example styles (can be customized)
const styles = {
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#333",
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#555",
  },
  text: {
    marginBottom: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  table: {
    display: "table",
    width: "auto",
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "solid",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
  },
  tableCol: {
    flex: 1,
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#888",
  },
};

const ViewSell = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetSingleSaleQuery(id);

  if (isLoading) return <div>Loading sale details...</div>;
  if (isError) return <div>Failed to load sale details.</div>;
  if (!data) return <div>No sale found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6  ">
      {/* Actions */}
      <div className="flex justify-end mb-6">
        <PDFDownloadLink
          document={<InvoiceDocument sale={data} />}
          fileName={`invoice NO : ${data?.invoiceNumber}.pdf`}
          className="inline-flex items-center bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-blue-700 transition"
        >
          {({ loading }) => (loading ? "Generating PDF…" : "Download Invoice")}
        </PDFDownloadLink>
      </div>

      {/* Header */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">
        Sale Details
      </h2>

      {/* Customer Info */}
      <section className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Customer Information
        </h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-800">Name:</span>{" "}
            {data.customer.name}
          </p>
          <p>
            <span className="font-medium text-gray-800">Email:</span>{" "}
            {data.customer.email}
          </p>
          <p>
            <span className="font-medium text-gray-800">Phone:</span>{" "}
            {data.customer.phoneNumber}
          </p>
        </div>
      </section>

      {/* Sale Info */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Sale Information
        </h3>
        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-800">Total Amount:</span> $
            {data.totalAmount.toFixed(2)}
          </p>
          <p>
            <span className="font-medium text-gray-800">Date:</span>{" "}
            {new Date(data.saleDate).toLocaleString()}
          </p>
        </div>
      </section>

      {/* Items Table */}
      <section>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Items Sold</h3>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-3 py-2 text-left">Item</th>
                <th className="border px-3 py-2 text-left">Category</th>
                <th className="border px-3 py-2 text-right">Price</th>
                <th className="border px-3 py-2 text-right">Qty</th>
                <th className="border px-3 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.saleItems.map((saleItem) => {
                const total = saleItem.price * saleItem.quantity;
                return (
                  <tr key={saleItem.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{saleItem.item.name}</td>
                    <td className="border px-3 py-2">
                      {saleItem.item.category.name}
                    </td>
                    <td className="border px-3 py-2 text-right">
                      ${saleItem.price.toFixed(2)}
                    </td>
                    <td className="border px-3 py-2 text-right">
                      {saleItem.quantity}
                    </td>
                    <td className="border px-3 py-2 text-right font-medium">
                      ${total.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ViewSell;
