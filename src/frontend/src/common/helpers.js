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
