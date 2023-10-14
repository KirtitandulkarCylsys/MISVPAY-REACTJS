import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import pdf from "../Assets/images/pdf_icon.png";

const AccPdfDownload = () => {
  const pdfExport = () => {
    const table = document.getElementById("table1");
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "letter");
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      const imgWidth = pageWidth - 20;
      const imgHeight = (imgWidth / canvas.width) * canvas.height;
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("SalesTransactionReport.pdf");
    });
  };

  return (
    <button onClick={pdfExport} className="border-0">
      <img src={pdf} alt="pdficon" />
    </button>
  );
};

export default AccPdfDownload;
