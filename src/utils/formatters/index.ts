export const capitalizeFirstLetter: (arg0: string) => string = string => {
  let newString = string[0].toUpperCase() + string.slice(1);
  return newString;
};
