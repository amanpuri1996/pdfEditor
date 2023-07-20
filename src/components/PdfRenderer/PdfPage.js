import React, { useEffect, useState } from 'react';

function loadPage(doc, pageNum)
{
  return doc.getPage(pageNum);
}

function PdfPage({ document, pageNum, children })
{
  const [pageObj, setPageObj] = useState(null);

  useEffect(() =>
  {
    const fetchPage = async () =>
    {
      const page = await loadPage(document, pageNum);
      setPageObj(page);
    };

    fetchPage();
  }, [document, pageNum]);

  console.log(pageNum)
  return pageObj !== null ? children(pageObj) : null;
}

export default PdfPage;
