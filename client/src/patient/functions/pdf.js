import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const downloadPdfDocument = (pdfRef) => {
  console.log("Download function triggered"); // Debug line

  if (pdfRef.current) {
    console.log("Card ref is found"); // Debug line

    console.log(pdfRef.current);

    toPng(pdfRef.current, { quality: 1 })
      .then((dataUrl) => {
        console.log("Image captured"); // Debug line

        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 210; // A4 width in mm
          const imgHeight = (img.height * imgWidth) / img.width;
          pdf.addImage(img.src, "PNG", 0, 0, imgWidth, imgHeight);
          pdf.save("prescription-card.pdf");
          console.log("PDF saved"); // Debug line
        };
      })
      .catch((error) => {
        console.error("Something went wrong", error);
      });
  } else {
    console.log("Card ref is null"); // Debug line
  }
};

export default downloadPdfDocument;