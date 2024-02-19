export default (pathname, target) => {
  return pathname.split('/').includes(target);
};
