// _utils/slug.js
import slugify from 'slugify';

export function generateSlug(title) {
    // if (!title) return ''; // Return an empty string if title is undefined or null

    const slug =()=> slugify(title, {
        lower: true, // Convert to lowercase
        strict: true // Remove special characters
      });

    return slug();
  };
  