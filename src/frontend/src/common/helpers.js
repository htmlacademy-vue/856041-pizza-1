import resources from "@/common/enums/resources";
import {
  AuthApiService,
  DoughApiService,
  IngredientApiService,
  MiscApiService,
  SauceApiService,
  SizeApiService,
  CrudApiService,
} from "@/services/api.service";

export const createResources = () => {
  return {
    [resources.AUTH]: new AuthApiService(),
    [resources.ADDRESSES]: new CrudApiService(resources.ADDRESSES),
    [resources.DOUGH]: new DoughApiService(),
    [resources.INGREDIENT]: new IngredientApiService(),
    [resources.MISC]: new MiscApiService(),
    [resources.ORDER]: new CrudApiService(resources.ORDER),
    [resources.SAUCE]: new SauceApiService(),
    [resources.SIZE]: new SizeApiService(),
  };
};

/**
 *
 * @param {string} url - ссылка на img
 * @return {string} - возвращает ссылку с .webp
 */
export const getWebpImage = (url) => {
  return url.replace(".jpg", ".webp");
};

/**
 *
 * @param {string} url - ссылка на img
 * @return {string} - возвращает ссылку с двукратным префиксом и .webp
 */
export const getDoubleWebpImage = (url) => {
  return url.replace(".jpg", "@2x.webp");
};

/**
 *
 * @param {string} url - ссылка на img
 * @return {string} - возвращает ссылку с двукратным префиксом
 */
export const getDoubleImage = (url) => {
  return url.replace(".jpg", "@2x.jpg");
};

/**
 *
 * @param {string} url - ссылка на img
 * @return {string} - возвращает ссылку с четырехкратным префиксом
 */
export const getQuadrupleImage = (url) => {
  return url.replace(".jpg", "@4x.jpg");
};

/**
 *
 * @param {string} url - ссылка на img
 * @return {string} - возвращает ссылку с четырехкратным префиксом и .webp
 */
export const getQuadrupleWebp = (url) => {
  return url.replace(".jpg", "@4x.webp");
};
