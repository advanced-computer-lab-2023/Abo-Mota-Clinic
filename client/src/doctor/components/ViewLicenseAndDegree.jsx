import { Divider, Tabs, Typography } from "antd";
import PdfViewer from "./PdfViewer";

const ViewLicenseAndDegree = ({ data }) => {
  const { medicalLicense, medicalDegree } = data;
  console.log(medicalLicense);

  const bytesDegree = new Uint8Array(medicalDegree.data.data);
  const blobDegree = new Blob([bytesDegree], { type: medicalDegree.contentType });
  const urlDegree = URL.createObjectURL(blobDegree);
  const degree = {
    key: 1,
    label: "Degree",
    children: medicalDegree.contentType.includes("image") ? (
      <img src={urlDegree} alt="Degree" />
    ) : (
      <PdfViewer pdfUrl={urlDegree} />
    ),
  };
  const bytesLicense = new Uint8Array(medicalLicense.data.data);
  const blobLicense = new Blob([bytesLicense], { type: medicalLicense.contentType });
  const urlLicense = URL.createObjectURL(blobLicense);
  const license = {
    key: 2,
    label: "License",
    children: medicalLicense.contentType.includes("image") ? (
      <img src={urlLicense} alt="License" />
    ) : (
      <PdfViewer pdfUrl={urlLicense} />
    ),
  };

  const urls = [urlLicense, urlDegree];
  console.log(urls);

  const recordItems = [degree, license];
  return (
    <div>
      {/* <Typography level="h4" fontWeight="lg">
        View License
      </Typography>
      <img src={urlLicense} alt="License" />
      <Typography level="h4" fontWeight="lg">
        View Degree
      </Typography>
      <PdfViewer pdfUrl={urlDegree} /> */}
      <Tabs defaultActiveKey="1" items={recordItems} size="large" />
    </div>
  );
};

export default ViewLicenseAndDegree;
