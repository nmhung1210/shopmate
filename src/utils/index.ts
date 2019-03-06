export function isValidEmail (email: string): boolean {
  return !!(email && email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i));
}
