export const transformDate = (str: string) => {
  return str.split(',').map(n => +n);
};
