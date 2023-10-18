import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import pdf from "../../Assets/images/pdf_icon.png";

const ExportToPDF = () => {
  const generatePdf = (table, fileName) => {
    const pdf = new jsPDF("p", "pt", "letter");
    pdf.autoTable({
      html: table,
      filename: fileName,
      margin: { top: 40, bottom: 30, right: 30, left: 30 },
      styles: {
        font: "Arial",
        fontSize: 10,
      },
      headerStyles: {
        fillColor: [51, 122, 183],
        textColor: 255,
        fontSize: 12,
      },
      bodyStyles: {
        textColor: 0,
      },
    });
    pdf.save(fileName + ".pdf");
  };

  const processTable = (table, fileName) => {
    
    const tableCopy = table.cloneNode(true);
    const nestedTables = tableCopy.querySelectorAll(".nested-table");
    nestedTables.forEach((nestedTable) => {
      nestedTable.remove();
    });

    generatePdf(tableCopy, fileName);

    nestedTables.forEach((nestedTable, index) => {
      const nestedFileName = `${fileName}-Nested${index + 1}`;
      processTable(nestedTable, nestedFileName);
    });
  };

  const pdfExport = () => {
    const AUM = document.getElementById("AUM");
    const REGION = document.getElementById("REGION");
    const UFC = document.getElementById("UFC");
    const NFO = document.getElementById("nfoTable");

  
    if (AUM && AUM.className.includes("active")) {
      generatePdf(AUM, "AUMReport");
    } else if (REGION && REGION.className.includes("active")) {
      generatePdf(REGION, "RegionReport");
    }else if (UFC && UFC.className.includes("active")) {
      generatePdf(UFC, "UfcReport");
    }else if (NFO && NFO.className.includes("active")) {
      generatePdf(NFO, "NFOReport");
    }
    const SalesTable = document.getElementById("table1");
   
    processTable(SalesTable, "AumReport");
    
  };

  return (
    <button onClick={pdfExport} className="border-0">
      <img src={pdf} alt="pdficon" />
    </button>
  );
};

export default ExportToPDF;
