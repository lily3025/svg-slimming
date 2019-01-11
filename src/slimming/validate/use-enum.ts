export const useEnum = (e: Object, val: string): boolean => isNaN(parseInt(val, 10)) && val.trim() in e;
