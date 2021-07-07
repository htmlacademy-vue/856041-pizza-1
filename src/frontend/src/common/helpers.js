export const getNameFromPath = (path) => {
  if (!path) return "";

  const regexp = /^(.*)\/(.*)(\..*)$/;

  return regexp.exec(path)[2] || false;
};

export const prepareIngredients = (ingredients) => {
  return ingredients.map((el) => {
    return {
      ...el,
      value: getNameFromPath(el.image),
      count: 0,
    };
  });
};
