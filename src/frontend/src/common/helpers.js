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

export const prepareSauces = (sauces) => {
  const getSauceValue = ({ name }) => {
    switch (name) {
      case "Томатный":
        return "tomato";
      case "Сливочный":
        return "creamy";
      default:
        return "tomato";
    }
  };

  return sauces.map((el) => {
    return {
      ...el,
      value: getSauceValue(el),
    };
  });
};

export const prepareSizes = (sizes) => {
  const getSizesValue = ({ name }) => {
    switch (name) {
      case "23 см":
        return "small";
      case "32 см":
        return "normal";
      case "45 см":
        return "big";
      default:
        return "big";
    }
  };

  return sizes.map((el) => {
    return {
      ...el,
      value: getSizesValue(el),
    };
  });
};

export const prepareDoughs = (doughs) => {
  const getDoughValue = ({ name }) => {
    switch (name) {
      case "Тонкое":
        return "small";
      case "Толстое":
        return "big";
      default:
        return "big";
    }
  };

  return doughs.map((el) => {
    return {
      ...el,
      value: getDoughValue(el),
    };
  });
};
