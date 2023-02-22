import React from 'react';
import useFiltersPanel from './hook/useFiltersPanel';
import FilterByName from './components/FilterByName/FilterByName';
import FilterByRating from './components/FilterByRating/FilterByRating';
import FilterByCategory from './components/FilterByCategory/FilterByCategory';
import FilterByPrice from './components/FilterByPriceRange/FilterByPrice';
import FilterOrder from './components/FilterOrder/FilterOrder';
import { productFetch } from '../Redux/slice/product/ProductController';
import { resetFilters, getProduct } from '../Redux/slice/product/product.slice';
import { useAppDispatch } from '../Redux/hook';

import filterName from '../assets/images/icons/filter/filterName.png';
import filterRating from '../assets/images/icons/filter/filterRating.png';
import filterPrice from '../assets/images/icons/filter/filterPrice.png';
import filterCategory from '../assets/images/icons/filter/filterCategory.png';
import filterSpace from '../assets/images/icons/filter/filterSpace.png';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import RefreshIcon from '@mui/icons-material/Refresh';

const FiltersPanel: React.FC<{}> = () => {
  const { handleFilter } = useFiltersPanel();

  const dispatch = useAppDispatch();

  const resetFiltersHandler = () => {
    dispatch(resetFilters());
    productFetch().then((res) => {
      dispatch(getProduct(res));
    });
  };

  return (
    <div className='new-contain-FilterPanel' id='idFilterPanel'>
      <div className='section-filter'>
        <img className='img' src={filterSpace} alt='' />
        <div className='block-filter'>
          <h1 className='title-filter'>Filters Home:</h1>
          <hr />
        </div>
      </div>

      <div className='section-filter'>
        <div className='hovr-selector'></div>
        <img className='img' src={filterName} alt='' />
        <div className='block-filter'>
          <h2 className='title-filter'>Filter by Name:</h2>
          <FilterByName />
        </div>
      </div>

      <div className='section-filter'>
        <div className='hovr-selector'></div>
        <img className='img' src={filterRating} alt='' />
        <div className='block-filter'>
          <h2 className='title-filter'>Filter by Rating</h2>
          <FilterByRating />
        </div>
      </div>

      <div className='section-filter'>
        <div className='hovr-selector'></div>
        <img className='img' src={filterPrice} alt='' />
        <div className='block-filter'>
          <h2 className='title-filter'>Filter by Price</h2>
          <FilterByPrice />
        </div>
      </div>

      <div className='section-filter'>
        <div className='hovr-selector'></div>
        <img className='img' src={filterCategory} alt='' />
        <div className='block-filter'>
          <h2 className='title-filter'>Filter by Category</h2>
          <FilterByCategory />
        </div>
      </div>

      <div className='section-filter'>
        <div className='hovr-selector'></div>
        <img className='img' src={filterCategory} alt='' />
        <div className='block-filter'>
          <h2 className='title-filter'>Order</h2>
          <FilterOrder />
        </div>
      </div>

      <div className='section-filter'>
        <img className='img' src={filterSpace} alt='' />
        <div className='block-filter'>
          <button className='btn-selector-filter' onClick={handleFilter}>
            Filtrar
          </button>
          <button className='btn-selector-filter' onClick={resetFiltersHandler}>
            <RefreshIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;
