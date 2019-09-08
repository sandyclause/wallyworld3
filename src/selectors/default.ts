import {
  createSelector,
} from 'reselect';
import {
  Map,
  List,
  Record,
} from 'immutable';
import {
  IReducerState,
} from '../reducers/default';
import { IProduct } from '../interfaces/Product';

export const selectReducerState = () => (state: any) => {
  const reducerState = state.get('default');
  if (reducerState != null) {
    return reducerState;
  }
  return Map();
};

export const makeSelectTrendProducts = () => createSelector(
  selectReducerState(),
  (state: Record<IReducerState>) => state.get('trendProducts') || List<Record<IProduct>>(),
);

export const makeSelectSelectedProductIds = () => createSelector(
  selectReducerState(),
  (state: Record<IReducerState>) => state.get('searchProducts') || List<number>(),
);

export const makeSelectProducts = () => createSelector(
  selectReducerState(),
  (state: Record<IReducerState>) => state.get('products') || Map<number, Record<IProduct>>(),
);

export const makeSelectSearchResults = () => createSelector(
  makeSelectProducts(),
  makeSelectSelectedProductIds(),
  (products: Map<number, Record<IProduct>>, productIds: List<number>) => {

    const productsMap = productIds.map((productId: number) => {
      return products.get(productId) ? products.get(productId) : null
    })

    return productsMap;
  }
);

export const makeSelectSelectedProductId = () => createSelector(
  selectReducerState(),
  (state: Record<IReducerState>) => state.get('selectedProductId'),
);

export const makeSelectProduct = () => createSelector(
  makeSelectProducts(),
  makeSelectSelectedProductId(),
  (products: Map<number, Record<IProduct>>, productId: number) => {
    console.log(products, productId)

    return products.get(productId) || Map();
  }
);

export default {
  selectReducerState,
};
