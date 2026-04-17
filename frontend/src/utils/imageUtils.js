/**
 * Resizes an image to a maximum width while maintaining aspect ratio
 * and returns it as a compressed Base64 string.
 * This helps avoid LocalStorage and Database size limits.
 * Input can be a string (base64/URL) or a File object.
 */
export const resizeImage = (input, maxWidth = 1200, quality = 0.7) => {
  return new Promise((resolve) => {
    const processImage = (src) => {
      const img = new Image();
      img.src = src;
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
        // If error, return original source
        resolve(src);
      };
    };

    if (input instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => processImage(e.target.result);
      reader.onerror = () => resolve(""); // Return empty string if reading fails
      reader.readAsDataURL(input);
    } else if (typeof input === "string") {
      processImage(input);
    } else {
      resolve(""); // Invalid input
    }
  });
};
