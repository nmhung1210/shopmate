export function isValidEmail (email: string): boolean {
  return !!(email && email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i));
}

export function arrayChunks (array: any[], chunkLength: number): any[] {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkLength) {
    chunks.push(array.slice(i, i + chunkLength));
  }
  return chunks;
}
