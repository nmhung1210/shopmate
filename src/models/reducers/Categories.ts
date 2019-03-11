import { ActionTypes } from '..';
import { IAction, ICategoriesList, ICategory, IProductCategoryInfo } from '../schemas';

export interface ICategoriesState {
  categories: ICategoriesList;
  limit: number;
  page: number;
  categoriesDict: {
    [index: number]: ICategory;
  };
  productCategories: ICategory[];
  fetchingCount: number;
}

export default function Categories (
  state = {
    categories: { count: 0, rows: [] },
    page: 1,
    limit: 20,
    categoriesDict: {},
    productCategories: [],
    fetchingCount: 0
  } as ICategoriesState,
  action: IAction
): ICategoriesState {
  const { type, params } = action;
  switch (type) {
    case ActionTypes.GET_CATEGORIES:
      if (params.isFetching) {
        return {
          ...state,
          fetchingCount: state.fetchingCount + 1
        };
      }
      const newState = {
        ...state,
        fetchingCount: state.fetchingCount - 1
      };
      if (params.success) {
        const { limit, page, data } = params;
        newState.limit = limit;
        newState.page = page;
        newState.categories = data;
        // Update categories dictionary.
        newState.categories.rows.forEach((category) => {
          newState.categoriesDict[category.category_id] = category;
        });
      }
      return newState;
    case ActionTypes.GET_PRODUCT_CATEGORIES:
      if (params.success) {
        return {
          ...state,
          productCategories: params.data.map(
            (cat: IProductCategoryInfo) => state.categoriesDict[cat.category_id]
          )
        };
      }
      break;
  }
  return state;
}
