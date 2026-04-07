/**
 * Resizes an image to a maximum width while maintaining aspect ratio
 * and returns it as a compressed Base64 string.
 * This helps avoid LocalStorage and Database size limits.
 */
export const resizeImage = (base64Str, maxWidth = 1200, quality = 0.7) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      // Calculate new dimensions
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      // Create canvas and draw resized image
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Export as compressed JPEG
      const result = canvas.toDataURL("image/jpeg", quality);
      resolve(result);
    };
    img.onerror = () => {
      // If error, return original
      resolve(base64Str);
    };
  });
};
