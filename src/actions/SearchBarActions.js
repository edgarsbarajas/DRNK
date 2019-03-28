import { SET_SEARCH_BAR_VALUE, TOGGLE_SEARCH_BAR } from './types';

export const onSearchBarValueChange = ({prop, value}) => ({
  type: SET_SEARCH_BAR_VALUE, payload: { prop, value }
})

export const toggleSearchBar = () => ({
  type: TOGGLE_SEARCH_BAR
})
