import React, { useEffect, useRef } from 'react';

function renderPdfToCanvas(canvasEl, page, scale)
{
  const viewport = page.getViewport({ scale });

  canvasEl.width = viewport.width; // canvas width and height must be according to viewport scale!
  canvasEl.height = viewport.height;

  // console.warn('[PdfCanvas] page.render')
  page.render({
    canvasContext: canvasEl.getContext('2d'),
    viewport
  });
}

function PdfCanvas({ page, scale, onClick })
{
  const canvasRef = useRef();


  useEffect(() =>
  {
    renderPdfToCanvas(canvasRef.current, page, scale);
  }, [page, scale]);


  /*   useEffect(() =>
    {
      const renderPdfPagesToCanvas = async () =>
      {
        if (!page) return;
  
        for (let i = 1; i <= page.numPages; i++)
        {
          const pages = await page.getPage(i);
          const canvas = document.createElement('canvas');
          canvasRef.current.appendChild(canvas);
          renderPdfToCanvas(canvas, pages, scale);
        }
      };
      renderPdfPagesToCanvas();
    }, [page, scale]); */

  const getMousePos = (x, y) =>
  {
    // get mouse position relative to canvas
    const { left, top } = canvasRef.current.getBoundingClientRect();
    return {
      x: x - left,
      y: y - top
    };
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={(event) =>
        onClick(event, getMousePos(event.clientX, event.clientY))
      }
      style={{ cursor: 'crosshair' }}
    />
  );
}

export default PdfCanvas;
