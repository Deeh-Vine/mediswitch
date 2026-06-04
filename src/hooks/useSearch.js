import Fuse from 'fuse.js';
import { drugs } from '../data/data.js';

export default function useSearch() {
  // Initialize a new Fuse instance using the drugs array
  const fuse = new Fuse(drugs, {
    // Specifying the exact keys/fields to search within the drug objects
    keys: ['brandedName', 'activeIngredient', 'category', 'genericAlternatives.name'],
    // Set the fuzziness threshold (0 is exact match, 1 matches anything).
    // 0.35 is optimized to handle common typos in Nigerian drug names without unrelated matches.
    threshold: 0.35
  });

  /**
   * Performs fuzzy search on the drugs array.
   * @param {string} query - The search term
   * @returns {Array} Array of matching drug objects
   */
  const searchDrugs = (query) => {
    // Return empty array if the query is blank, null, or only whitespace
    if (!query || !query.trim()) {
      return [];
    }

    // Perform search using Fuse.js
    const results = fuse.search(query);

    // Fuse.js returns wrapped results, map them to extract the raw item objects
    return results.map(res => res.item);
  };

  return { searchDrugs };
}
