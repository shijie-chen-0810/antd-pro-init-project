import { useState } from 'react';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Button, Modal } from 'antd';

const PDFOnlineViewer = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = (pdf: any) => {
    setNumPages(pdf.numPages);
  };

  return (
    <>
      <Button onClick={() => setVisible(true)}>打开</Button>
      <Modal footer={null} width="800px" open={visible} onCancel={() => setVisible(false)}>
        <Document
          file="https://invoiceprod.oss-cn-shanghai.aliyuncs.com/invoice/invoice-test/202205/2wbamfpcnzjr.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          options={{
            cMapUrl: `//cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/cmaps/`,
            cMapPacked: true,
            disableWorker: true,
          }}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </Modal>
    </>
  );
};
export default PDFOnlineViewer;
