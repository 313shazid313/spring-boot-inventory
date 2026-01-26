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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Sale Details</h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Customer Info</h3>
        <p>
          <strong>Name:</strong> {data.customer.name}
        </p>
        <p>
          <strong>Email:</strong> {data.customer.email}
        </p>
        <p>
          <strong>Phone:</strong> {data.customer.phoneNumber}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Sale Info</h3>
        <p>
          <strong>Total Amount:</strong> ${data.totalAmount}
        </p>
        <p>
          <strong>Date:</strong> {new Date(data.saleDate).toLocaleString()}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Items Sold</h3>
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2 py-1">Item Name</th>
              <th className="border px-2 py-1">Category</th>
              <th className="border px-2 py-1">Price</th>
              <th className="border px-2 py-1">Quantity</th>
              <th className="border px-2 py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.saleItems.map((saleItem) => (
              <tr key={saleItem.id}>
                <td className="border px-2 py-1">{saleItem.item.name}</td>
                <td className="border px-2 py-1">
                  {saleItem.item.category.name}
                </td>
                <td className="border px-2 py-1">${saleItem.price}</td>
                <td className="border px-2 py-1">{saleItem.quantity}</td>
                <td className="border px-2 py-1">
                  ${saleItem.price * saleItem.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <PDFDownloadLink
          document={<InvoiceDocument sale={data} />}
          fileName={`invoice_${data.id}.pdf`}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {({ loading }) => (loading ? "Preparing PDF..." : "Download Invoice")}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default ViewSell;
