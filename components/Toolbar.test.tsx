import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Toolbar from './Toolbar';

describe('<Toolbar /> Renders', () => {
  it('should have sort by price and sort by name button', () => {
    render(
      <Toolbar />
    )
    const sortByPriceElement = screen.getByTestId('toolbar-sortby-price');
    const sortByNameElement = screen.getByTestId('toolbar-sortby-name');
    expect(sortByPriceElement).toBeVisible();
    expect(sortByNameElement).toBeVisible();
  });

  it('should have filter by size select option', () => {
    render(
      <Toolbar />
    )
    const filterBySizeElement = screen.getByTestId('toolbar-filterby-size');
    expect(filterBySizeElement).toBeVisible();
  });

  it('should have filter by location select option', () => {
    render(
      <Toolbar />
    )
    const filterByLocationElement = screen.getByTestId('toolbar-filterby-location');
    expect(filterByLocationElement).toBeVisible();
  });
});

describe('<Toolbar /> behaviour', () => {
  it('should update the sort button when sortByPrice is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Toolbar />
    )
    const sortByPriceElement = screen.getByTestId('toolbar-sortby-price');

    await user.click(sortByPriceElement);
    expect(within(sortByPriceElement).getByText('(Highest)')).toBeVisible();

    await user.click(sortByPriceElement);
    expect(within(sortByPriceElement).getByText('(Lowest)')).toBeVisible();
  });

  it('should update the sort button when sortByName is clicked', async () => {
    const user = userEvent.setup();

    render(
      <Toolbar />
    )
    const sortByNameEl = screen.getByTestId('toolbar-sortby-name');
    expect(sortByNameEl).toBeVisible();

    await user.click(sortByNameEl);
    expect(within(sortByNameEl).getByText('(A-Z)')).toBeVisible();

    await user.click(sortByNameEl);
    expect(within(sortByNameEl).getByText('(Z-A)')).toBeVisible();
  });

  it('should only update either price or name, not both', async () => {
    const user = userEvent.setup();

    render(
      <Toolbar />
    )
    const sortByPriceEl = screen.getByTestId('toolbar-sortby-price');
    const sortByNameEl = screen.getByTestId('toolbar-sortby-name');

    await user.click(sortByPriceEl);
    expect(within(sortByPriceEl).getByText('(Highest)')).toBeVisible();

    await user.click(sortByNameEl);
    expect(within(sortByNameEl).getByText('(A-Z)')).toBeVisible();
    expect(within(sortByPriceEl).queryByText('(Highest)')).toBeNull();
  });
});
