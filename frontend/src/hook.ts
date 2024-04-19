import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

/**
 * Custom hook for accessing Redux store dispatch function.
 *
 * This hook provides access to the dispatch function of the Redux store.
 * It is used to dispatch actions to update the Redux store state.
 *
 * @returns {AppDispatch} - Dispatch function for the Redux store.
 */
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
