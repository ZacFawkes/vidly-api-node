import jsPDF from "jspdf";

class YourComponent extends React.Component {
  // ... your existing code

  handleExportPDF = (information) => {
    const doc = new jsPDF();
    const rows = [];
    information.forEach((item, index) => {
      rows.push([index + 1, item.datetime, item.RPM, item.statusofMachine]);
    });

    doc.autoTable({
      head: [["#", "Datetime", "RPM", "Status of Machine"]],
      body: rows,
    });

    doc.save("machine-data.pdf");
  };

  render() {
    // ... your existing code

    return (
      <div>
        {/* ... your existing code */}
        <button onClick={this.handleExportPDF}>Export to PDF</button>
      </div>
    );
  }
}
