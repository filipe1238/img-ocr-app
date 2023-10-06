import React from 'react'

function PrevieCrop({ completedCrop, previewCanvasRef, hiddenAnchorRef, blobUrlRef }: any) {
    function onDownloadCropClick() {
        if (!previewCanvasRef.current) {
          throw new Error('Crop canvas does not exist')
        }
    
        previewCanvasRef.current.toBlob((blob: Blob | MediaSource) => {
          if (!blob) {
            throw new Error('Failed to create blob')
          }
          if (blobUrlRef.current) {
            URL.revokeObjectURL(blobUrlRef.current)
          }
          blobUrlRef.current = URL.createObjectURL(blob)
          hiddenAnchorRef.current!.href = blobUrlRef.current
          hiddenAnchorRef.current!.click()
        })
      }

  return (
    
    <>
    <div>
      <canvas
        ref={previewCanvasRef}
        style={{
          border: '1px solid black',
          objectFit: 'contain',
          width: completedCrop.width,
          height: completedCrop.height,
        }}
      />
    </div>
    <div>
      <button onClick={onDownloadCropClick}>Download Crop</button>
      <a
        href="#hidden"
        ref={hiddenAnchorRef}
        download
        style={{
          position: 'absolute',
          top: '-200vh',
          visibility: 'hidden',
        }}
      >
        Hidden download
      </a>
    </div>
  </>
  )
}

export default PrevieCrop