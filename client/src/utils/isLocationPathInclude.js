export default (location, target) => {
  return location.pathname.split('/').includes(target);
};
