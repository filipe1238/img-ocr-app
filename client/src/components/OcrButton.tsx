import React from 'react'
import axios from 'axios'

function OcrButton({
  file,
  setCurrentText,
  previewCanvasRef,
  setIsLoading,
  imgSrc,
}: any) {
  const uploadApi = async (blob: Blob) => {
    if (!blob) {
      throw new Error('Failed to create blob')
    }
    const formData = new FormData()
    formData.append('file', blob, file?.name)
    try {
      setIsLoading(true)
      const response = await axios.post(
        'https://img-ocr-app-l3mp.onrender.com/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      // print the response text
      if (response.status === 200) {
        setCurrentText(response.data)
        setIsLoading(false)
      } else {
        console.error('File upload failed')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }
  const handleCanvas = async () => {
    previewCanvasRef.current.toBlob(async (blob: Blob) => {
      await uploadApi(blob);
    })
  }

  const handleFullImage = async () => {
    const blob = await fetch(imgSrc).then((r) => r.blob());
    await uploadApi(blob);
  }

  const handleUpload = async () => {
    // if image is not cropped, use original image
    if (previewCanvasRef?.current) {
      handleCanvas()
    } else {
      handleFullImage()
    }

  }
  return (
    <div>
      <button className="btn btn-secondary" onClick={handleUpload}>
        Scan
      </button>
    </div>
  )
}

export default OcrButton
