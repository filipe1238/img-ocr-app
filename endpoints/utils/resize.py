import cv2
import numpy as np


"""
amount is simply the amount of sharpening. 
For example, an amount of 2.0 gives a sharper image compared to the default value of 1.0.
threshold is the threshold for the low-contrast mask.
In other words, the pixels for which the difference between the input 
and blurred images is less than threshold will remain unchanged.
"""
def unsharp_mask(image, kernel_size=(5, 5), sigma=1.0, amount=1.0, threshold=0):
    """Return a sharpened version of the image, using an unsharp mask."""
    blurred = cv2.GaussianBlur(image, kernel_size, sigma)
    sharpened = float(amount + 1) * image - float(amount) * blurred
    sharpened = np.maximum(sharpened, np.zeros(sharpened.shape))
    sharpened = np.minimum(sharpened, 255 * np.ones(sharpened.shape))
    sharpened = sharpened.round().astype(np.uint8)
    if threshold > 0:
        low_contrast_mask = np.absolute(image - blurred) < threshold
        np.copyto(sharpened, image, where=low_contrast_mask)
    return sharpened

def resizeImg(img, scale_percent) :
     
    print('Original Dimensions : ',img.shape)
     
    width = int(img.shape[1] * scale_percent / 100)
    height = int(img.shape[0] * scale_percent / 100)
    dim = (width, height)
      
    # resize image
    resized = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)
     
    print('Resized Dimensions : ',resized.shape)
     
    # cv2.imshow("Resized image", resized)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    return resized
    
# image = cv2.imread('../uploads/test.jpg')
# sharpened_image = unsharp_mask(image)
# cv2.imwrite('../uploads/test_sharpened.jpg', sharpened_image)