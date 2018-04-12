import uuidv1 from 'uuid/v1';
import filter from 'lodash/fp/filter';
import findIndex from 'lodash/fp/findIndex';

const CREATE_TOAST = 'CREATE_TOAST';
const CLEAR_TOAST = 'CLEAR_TOAST';

const initialState = {
  toasts: [],
};

const makeToast = ({ message, type = 'success' }) => ({
  message,
  type,
  id: uuidv1(),
});

export const createToast = (payload) => ({
  type: CREATE_TOAST,
  payload,
});

export const clearToast = (payload) => ({
  type: CLEAR_TOAST,
  payload,
});

export default (state = initialState, action) => {
  switch(action.type){
    case CREATE_TOAST:
      const messageExists = findIndex(({message, type}) =>
        type === action.payload.type && message === action.payload.message
      )(state.toasts) !== -1;

      if(messageExists){
        return {...state};
      }else{
        const toast = makeToast(action.payload);

        return {
          ...state,
          toasts: [...state.toasts, toast],
        };
      }
    case CLEAR_TOAST:
      return {
        ...state,
        toasts: filter((toast) => toast.id !== action.payload)(state.toasts),
      };
    default:
      return state;
  }
}
