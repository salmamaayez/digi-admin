import PropTypes from 'prop-types';
import React, { useMemo ,useState,createContext} from 'react';

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState(['All', 'Drinks', 'Pizzas', 'Sandwichs', 'Pâtes', 'Cocktails', 'Boissons', 'Burgers', 'Toasts', 'Accompagnements']);

  const addCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const value = useMemo(() => ({ categories, addCategory }), [categories]);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

CategoriesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
