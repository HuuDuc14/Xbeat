const commonReducer = (state, action) => {
    switch (action.type) {

        case 'TOGGLE_FORM':
            return {
                ...state,
                isFormOpen: action.payload.toggle
            };

        case 'TOGGLE_FORM_CREATE':
            return {
                ...state,
                isFormCreate: action.payload.toggle
            };


        case 'TOGGLE_SEARCH':
            return {
                ...state,
                isSearchOpen: action.payload.toggle
            };


        case 'SET_SEARCH_RESULTS':
            return {
                ...state,
                searchResults: action.payload.results
            };

        case 'TOGGLE_ORDER':
            return {
                ...state,
                isFormOrder: action.payload.toggle
            }

        case 'TOGGLE_PRODUCT_REVIEW':
            return {
                ...state,
                isProductReview: action.payload.toggle
            }

        default:
            return state;
    }
};

export default commonReducer;