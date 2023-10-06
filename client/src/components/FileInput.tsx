import React from 'react'

function FileInput({ setFile, setCrop, setImgSrc }: any) {
  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  return (
    <div className="mb-3">
      <label className="form-label">File Input or Paste from ClipBoard</label>
      <input
        className="form-control"
        type="file"
        id="formFile"
        onChange={onSelectFile}
      />
    </div>
  )
}

export default FileInput
