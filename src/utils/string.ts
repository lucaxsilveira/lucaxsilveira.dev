export const estimateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const numberOfWords = text.split(/\s/g).length;
  const readingTime = Math.ceil(numberOfWords / wordsPerMinute);
  return readingTime || 1;
};
