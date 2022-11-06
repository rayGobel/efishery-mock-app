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

  const sortByPriceActive = sortByPrice !== '' ? `border-slate-600 bg-green-200` : ``;
  const sortByPriceClass = `${sortByPriceActive} border-2 w-full p-2 flex flex-row justify-between`;

  const sortByNameActive = sortByName !== '' ? `border-slate-600 bg-green-200`: ``;
  const sortByNameClass = `${sortByNameActive} border-2 w-full p-2 flex flex-row justify-between`;

  const visibility = isVisible ? '' : 'hidden';

  return (
    <>
      <div className={`toolbar absolute z-50 bg-white ${visibility} px-6 py-3 flex flex-col gap-y-4 justify-items-stretch border-b-2 w-full`}>

        <div className="filter-section flex flex-col gap-y-2">
          <p className="text-lg font-semibold">Filter</p>

          <div className="w-full flex flex-col">
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

          <div className="w-full flex flex-col">
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

        <div className="sort-section flex flex-col gap-y-1">
          <p className="text-lg font-semibold">Sort</p>

          <div className="flex flex-row gap-x-4 ">
            <button
              onClick={handleSortByName}
              className={sortByNameClass}
              data-testid="toolbar-sortby-name"
            >
              <p>Name</p>
              <p className="text-md">{sortByName ? `(${sortByName})` : ''}</p>
            </button>
            <button
              onClick={handleSortByPrice}
              className={sortByPriceClass}
              data-testid="toolbar-sortby-price"
            >
              <p>Price</p>
              <p className="text-md">{sortByPrice ? `(${sortByPrice})` : ''}</p>
            </button>
          </div>
        </div>

        <button onClick={() => setToolbarVisibility(false)} className="w-fit border px-4 py-2 place-self-end">Close</button>
      </div>
      <div className="hidden-toolbar flex flex-row place-self-end items-center gap-x-2 px-4">
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
