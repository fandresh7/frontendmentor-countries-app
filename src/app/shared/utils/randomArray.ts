export const generateRandomOptions = <T>(data: T[], itemsToTake: number): T[] => {
  return data
    .map(value => ({ value, sort: Math.random() })) // Assign a random sort key to each item
    .sort((a, b) => a.sort - b.sort) // Sort the array by the random sort key
    .map(({ value }) => value) // Extract the original values
    .slice(0, itemsToTake) // Take the first 'itemsToTake' elements
}
