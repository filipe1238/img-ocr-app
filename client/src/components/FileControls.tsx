import React from 'react'

function FileControls({ imgSrc, scale, setScale, rotate, setRotate }: any) {
  return (
    <>
      <div className="mb-3 row">
        <label className="col-sm-2 col-form-label">Scale</label>
        <div className="col-sm-10">
          <input
            id="scale-input"
            className="form-control"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        </div>
        <label className="col-sm-2 col-form-label">Rotate</label>
        <div className="col-sm-10">
          <input
            id="rotate-input"
            className="form-control"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div>
      </div>
    </>
  )
}

export default FileControls
