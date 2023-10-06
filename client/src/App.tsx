import React, { useState, useRef } from 'react'
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop'
import { canvasPreview } from './canvasPreview'
import { useDebounceEffect } from './useDebounceEffect'
import 'react-image-crop/dist/ReactCrop.css'
import FileInput from './components/FileInput'
import FileControls from './components/FileControls'
import OcrButton from './components/OcrButton'
import PrevieCrop from './components/PrevieCrop'
import Loading from './components/Loading'

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [file, setFile] = useState<File>()
  const [currentText, setCurrentText] = useState<string>('')
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null)
  const blobUrlRef = useRef('')
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(undefined)

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined)
    } else {
      setAspect(16 / 9)

      if (imgRef.current) {
        const { width, height } = imgRef.current
        const newCrop = centerAspectCrop(width, height, 16 / 9)
        setCrop(newCrop)
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height))
      }
    }
  }

  // Paste image from clipboard
  const pasteImg = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read()
      const blobOutput = await clipboardItems[0].getType('image/png')
      const data = URL.createObjectURL(blobOutput)
      setImgSrc(data)
    } catch (e) {
      console.log('Failed to read clipboard contents: ', e)
    }
  }

  // set ctrl v to paste image from clipboard
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'v') {
      pasteImg()
    }
  })

  return (
    <div className="container App">
      <div className="Crop-Controls">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
              >
                Configurations
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <FileControls
                  scale={scale}
                  setScale={setScale}
                  rotate={rotate}
                  setRotate={setRotate}
                  imgSrc={imgSrc}
                />
                <div>
                  <button
                    className="btn btn-secondary"
                    onClick={handleToggleAspectClick}
                  >
                    Toggle aspect {aspect ? 'off' : 'on'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-4">
              <FileInput
                setFile={setFile}
                setCrop={setCrop}
                setImgSrc={setImgSrc}
              />
            </div>
            {/* <div className="col-2">
              <h5>Or Paste image from clipboard</h5>
              <div className="card">
                <button
                  className="btn"
                  onClick={(e) => {
                    pasteImg()
                  }}
                >
                  Paste
                </button>
              </div>
            </div> */}
            <div className="col-8">
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <h5>OCR Result</h5>
                  <div className="card">
                    <div className="card-body">
                      <p>{currentText}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <OcrButton
          file={file}
          setCurrentText={setCurrentText}
          previewCanvasRef={previewCanvasRef}
          setIsLoading={setIsLoading}
          imgSrc={imgSrc}
        />
      </div>
      <div className="row">
        <div className="col-12">
          <h4>Image</h4>
          {!!imgSrc && (
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              // minWidth={400}
              minHeight={5}
            >
              <img
                ref={imgRef}
                className="img-fluid"
                alt="Crop me"
                src={imgSrc}
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
        </div>
        <div className="col-6">
          <h5>Cropped</h5>
          {!!completedCrop && (
            <>
              <PrevieCrop
                completedCrop={completedCrop}
                previewCanvasRef={previewCanvasRef}
                hiddenAnchorRef={hiddenAnchorRef}
                blobUrlRef={blobUrlRef}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
