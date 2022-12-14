import { FC, Fragment, MouseEvent, useState, useReducer, ChangeEvent } from 'react';
import { Location } from '../domain/Product';

export type SortDirection = 'Highest' | 'Lowest' | '';

export type ToolbarProps = {
  onSortByPrice?: (sort: SortDirection) => void;
};

export const Toolbar: FC<ToolbarProps> = (props) => {
  const { onSortByPrice } = props;
  const [isVisible, setToolbarVisibility] = useState(false);

  const [sortByPrice, setSortByPrice] = useState<SortDirection>('');
  const [sortByName, setSortByName] = useState<'A-Z' | 'Z-A' | ''>('');

  const handleLocationFilter = (ev: ChangeEvent) => {
    ev.preventDefault();
  };

  const handleSortByName = (ev: MouseEvent) => {
    ev.preventDefault();
    setSortByPrice('');

    if (sortByName === 'A-Z') {
      setSortByName('Z-A');
      return;
    }

    if (sortByName === 'Z-A') {
      setSortByName('');
      return;
    }

    if (sortByName === '') {
      setSortByName('A-Z');
      return;
    }

  };

  const handleSortByPrice = (ev: MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    setSortByName('');

    if (sortByPrice === 'Highest') {
      if (onSortByPrice) {
        onSortByPrice('Lowest');
      }

      setSortByPrice('Lowest');
      return;
    }

    if (sortByPrice === 'Lowest') {
      if (onSortByPrice) {
        onSortByPrice('');
      }
      setSortByPrice('');
      return;
    }

    if (sortByPrice === '') {
      if (onSortByPrice) {
        onSortByPrice('Highest');
      }
      setSortByPrice('Highest');
      return;
    }
  };

  const defaultBtnClass = `border-2 border-slate-300 w-full p-2 flex flex-row justify-between md:w-36`;
  const hoverBtnClass = `hover:bg-green-100 hover:text-slate-900`; // only useful on md screen / larger
  const btnActiveClass = `border-slate-700 bg-green-300`;

  const sortByPriceActive = sortByPrice !== '' ? btnActiveClass : ``;
  const sortByPriceClass = `${sortByPriceActive} ${hoverBtnClass} ${defaultBtnClass}`;

  const sortByNameActive = sortByName !== '' ? btnActiveClass : ``;
  const sortByNameClass = `${sortByNameActive} ${hoverBtnClass} ${defaultBtnClass}`;

  const visibility = isVisible ? '' : 'hidden';

  const mdScreenClass = `md:block md:relative md:flex md:flex-row md:content-center md:border-2 md:py-6 md:px-12 md:w-fit md:justify-evenly md:place-self-center md:gap-x-6`;

  return (
    <>
      <div className={`toolbar absolute z-50 bg-white ${visibility} px-6 py-3 flex flex-col gap-y-4 justify-items-stretch border-b-2 w-full ${mdScreenClass}`}>

        <div className="filter-section flex flex-col gap-y-2 md:w-fit md:flex md:flex-row md:gap-x-4 md:flex-wrap">
          <p className="text-lg font-semibold md:w-full md:shrink-0">Filter</p>

          <div className="w-full flex flex-col md:w-fit">
            <label htmlFor="product-location">Location</label>
            <select
              id="product-location"
              className="px-2 py-3"
              onChange={handleLocationFilter}
              data-testid="toolbar-filterby-location"
            >
              <option value="">select location...</option>
              <option value="SITUBONDO, JAWA TIMUR">SITUBONDO, JAWA TIMUR</option>
              <option value="BANDUNG, JAWA BARAT">BANDUNG, JAWA BARAT</option>
            </select>
          </div>

          <div className="w-full flex flex-col md:w-fit">
            <label htmlFor="product-size">Size</label>
            <select
              id="product-size"
              className="px-2 py-3"
              data-testid="toolbar-filterby-size"
            >
              <option value="20">20</option>
              <option value="200">200</option>
            </select>
          </div>

        </div>

        <div className="sort-section flex flex-col gap-y-1 md:w-12/12 md:items-start md:justify-between md:max-w-2xl">
          <p className="text-lg font-semibold">Sort</p>

          <div className="flex flex-row gap-x-4 ">
            <button
              onClick={handleSortByName}
              className={sortByNameClass}
              data-testid="toolbar-sortby-name"
            >
              <p>Name</p>
              <p className="text-md md:shrink">{sortByName ? `(${sortByName})` : ''}</p>
            </button>
            <button
              onClick={handleSortByPrice}
              className={sortByPriceClass}
              data-testid="toolbar-sortby-price"
            >
              <p>Price</p>
              <p className="text-md md:shrink">{sortByPrice ? `(${sortByPrice})` : ''}</p>
            </button>
          </div>
        </div>

        <button onClick={() => setToolbarVisibility(false)} className="w-fit border px-4 py-2 place-self-end md:hidden">Close</button>
      </div>
      <div className="hidden-toolbar flex flex-row place-self-end items-center gap-x-2 px-4 md:hidden">
        {
          sortByPriceActive
            ? (
              <div>
                <p>({sortByPrice})</p>
              </div>
            )
            : ''
        }
        {
          sortByNameActive
            ? (
              <div>
                <p>({sortByName})</p>
              </div>
            )
            : ''
        }
        <button
          onClick={() => setToolbarVisibility(true)}
          className={`${visibility ? '': 'hidden' } p-2 border w-fit `}>
          Show Toolbar
        </button>
    </div>
    </>
  );

};

export default Toolbar;
