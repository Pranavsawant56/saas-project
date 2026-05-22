/**
 * Simple client-side IndexedDB wrapper for storing template preview data.
 * This helps bypass browser LocalStorage quota limits (typically 5MB)
 * by using the much larger IndexedDB storage quota.
 */

const DB_NAME = "TekunikPreviewDB";
const STORE_NAME = "previews";

/**
 * Initializes the IndexedDB database.
 */
export function initDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("IndexedDB is only available in the browser"));
      return;
    }
    const request = indexedDB.open(DB_NAME, 1);
    
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    
    request.onsuccess = (e) => {
      resolve(e.target.result);
    };
    
    request.onerror = (e) => {
      reject(e.target.error);
    };
  });
}

/**
 * Stores template data directly as a JavaScript object.
 * @param {string} key Unique identifier for the preview template (e.g. 'tekunik_preview_business-1')
 * @param {Object} data The complete template form data state
 */
export async function setPreviewData(key, data) {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(data, key);
      
      request.onsuccess = () => resolve();
      request.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    console.error("Failed to store preview in IndexedDB", err);
    throw err;
  }
}

/**
 * Retrieves template data from IndexedDB.
 * @param {string} key Unique identifier for the preview template
 * @returns {Promise<Object|null>} The stored template object, or null if not found
 */
export async function getPreviewData(key) {
  try {
    const db = await initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    console.error("Failed to retrieve preview from IndexedDB", err);
    return null;
  }
}
