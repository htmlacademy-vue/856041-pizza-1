export const getNameFromPath = (path) => {
  if (!path) return "";

  const regexp = /^(.*)\/(.*)(\..*)$/;

  return regexp.exec(path)[2] || false;
};
