import { createContext, useReducer } from 'react';
import commonReducer from './commonReducer';
import { type } from '@testing-library/user-event/dist/type';

// Common-Context
const commonContext = createContext();

// Initial State
const initialState = {
    isFormOpen: false,
    isSearchOpen: false,
    searchResults: [],
    isFormCreate: false,
    isFormOrder: false,
    isProductReview: false
};

// Common-Provider Component
const CommonProvider = ({ children }) => {

    const [state, dispatch] = useReducer(commonReducer, initialState);

    // Form actions
    const toggleForm = (toggle) => {
        return dispatch({
            type: 'TOGGLE_FORM',
            payload: { toggle }
        });
    };

    const toggleFormCreate = (toggle) => {
        return dispatch({
            type: 'TOGGLE_FORM_CREATE',
            payload: { toggle }
        });
    };

    // Search actions
    const toggleSearch = (toggle) => {
        return dispatch({
            type: 'TOGGLE_SEARCH',
            payload: { toggle }
        });
    };

    const setSearchResults = (results) => {
        return dispatch({
            type: 'SET_SEARCH_RESULTS',
            payload: { results }
        });
    };

    const toggleFormOrder = (toggle) => {
        return dispatch({
            type: 'TOGGLE_ORDER',
            payload: { toggle }
        })
    }

    const toggleProductReview = (toggle) => {
        return dispatch({
            type: 'TOGGLE_PRODUCT_REVIEW',
            payload: { toggle }
        })
    }

    // Context values
    const values = {
        ...state,
        toggleForm,
        toggleSearch,
        setSearchResults,
        toggleFormCreate,
        toggleFormOrder,
        toggleProductReview
    };

    return (
        <commonContext.Provider value={values}>
            {children}
        </commonContext.Provider>
    );
};

export default commonContext;
export { CommonProvider };