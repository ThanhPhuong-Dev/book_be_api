export const ValidateEmail = (str: string) => {
  str.toLowerCase();
  const ref =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  // const ref = /^[^\s@]+@gmail\.com$/;
  return ref.test(str);
};
