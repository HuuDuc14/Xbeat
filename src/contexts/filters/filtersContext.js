import { createContext, useEffect, useReducer, useContext } from 'react';
import { brandsMenu, categoryMenu } from '../../data/filterBarData';
import filtersReducer from './filtersReducer';
import { ProductContext } from '../product/productContext';

// Filters-Context
const filtersContext = createContext();

// Initial State
const initialState = {
    allProducts: [],
    sortedValue: null,
    updatedBrandsMenu: brandsMenu,
    updatedCategoryMenu: categoryMenu,
    selectedPrice: {
        price: 0,
        minPrice: 0,
        maxPrice: 0
    },
    mobFilterBar: {
        isMobSortVisible: false,
        isMobFilterVisible: false,
    },
};

// Filters-Provider Component
const FiltersProvider = ({ children }) => {
    const [state, dispatch] = useReducer(filtersReducer, initialState);

    // Lấy products từ ProductContext
    const { products } = useContext(ProductContext);

    useEffect(() => {
        if (products.length) {
            const priceArr = products.map(item => item.finalPrice);
            const minPrice = Math.min(...priceArr);
            const maxPrice = Math.max(...priceArr);

            dispatch({
                type: 'LOAD_ALL_PRODUCTS',
                payload: { products, minPrice, maxPrice }
            });
        }
    }, [products]);

    /* function for applying Filters - (sorting & filtering) */
    const applyFilters = () => {
        let updatedProducts = [...products];

        /*==== Sorting ====*/
        if (state.sortedValue) {
            switch (state.sortedValue) {
                case 'Mới nhất':
                    updatedProducts = updatedProducts.slice(0, 6);
                    break;              
                case 'Giá (Từ thấp đến cao)':
                    updatedProducts = updatedProducts.sort((a, b) => a.finalPrice - b.finalPrice);
                    break;
                case 'Giá (Từ cao đến thấp)':
                    updatedProducts = updatedProducts.sort((a, b) => b.finalPrice - a.finalPrice);
                    break;
                default:
                    throw new Error('Lựa chọn sai');
            }
        }

        /*==== Filtering ====*/

        // filter by Brands
        const checkedBrandItems = state.updatedBrandsMenu
            .filter(item => item.checked)
            .map(item => item.label.toLowerCase());

        if (checkedBrandItems.length) {
            updatedProducts = updatedProducts.filter(item =>
                checkedBrandItems.includes(item.brand.toLowerCase())
            );
        }

        // filter by Category
        const checkedCategoryItems = state.updatedCategoryMenu
            .filter(item => item.checked)
            .map(item => item.label.toLowerCase());

        if (checkedCategoryItems.length) {
            updatedProducts = updatedProducts.filter(item =>
                checkedCategoryItems.includes(item.category.toLowerCase())
            );
        }

        // filter by Price
        if (state.selectedPrice) {
            updatedProducts = updatedProducts.filter(item =>
                item.finalPrice <= state.selectedPrice.price
            );
        }

        dispatch({
            type: 'FILTERED_PRODUCTS',
            payload: { updatedProducts }
        });
    };

    useEffect(() => {
        applyFilters();
    }, [state.sortedValue, state.updatedBrandsMenu, state.updatedCategoryMenu, state.selectedPrice, products]);

    // Dispatched Actions
    const setSortedValue = (sortValue) => {
        dispatch({
            type: 'SET_SORTED_VALUE',
            payload: { sortValue }
        });
    };

    const handleBrandsMenu = (id) => {
        dispatch({
            type: 'CHECK_BRANDS_MENU',
            payload: { id }
        });
    };

    const handleCategoryMenu = (id) => {
        dispatch({
            type: 'CHECK_CATEGORY_MENU',
            payload: { id }
        });
    };

    const handlePrice = (event) => {
        const value = event.target.value;
        dispatch({
            type: 'HANDLE_PRICE',
            payload: { value }
        });
    };

    const handleMobSortVisibility = (toggle) => {
        dispatch({
            type: 'MOB_SORT_VISIBILITY',
            payload: { toggle }
        });
    };

    const handleMobFilterVisibility = (toggle) => {
        dispatch({
            type: 'MOB_FILTER_VISIBILITY',
            payload: { toggle }
        });
    };

    const handleClearFilters = () => {
        dispatch({
            type: 'CLEAR_FILTERS'
        });
    };

    // Context values
    const values = {
        ...state,
        setSortedValue,
        handleBrandsMenu,
        handleCategoryMenu,
        handlePrice,
        handleMobSortVisibility,
        handleMobFilterVisibility,
        handleClearFilters,
    };

    return (
        <filtersContext.Provider value={values}>
            {children}
        </filtersContext.Provider>
    );
};

export default filtersContext;
export { FiltersProvider };
