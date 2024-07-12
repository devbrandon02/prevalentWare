import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import OptionsMenu from './Options';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('OptionsMenu component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it('renders menu options and handles click events', () => {
    render(<OptionsMenu />);

    const menuOptions = screen.getAllByRole('button');
    expect(menuOptions).toHaveLength(3); // Verifica que hay 3 opciones de menú

    fireEvent.click(menuOptions[0]);

    expect(useRouter().push).toHaveBeenCalledWith('/dashboard/transactions');
  });

  it('does not redirect on click if path is not provided', () => {
    render(<OptionsMenu />);

    fireEvent.click(screen.getAllByRole('button')[1]);

    expect(useRouter().push).not.toHaveBeenCalled();
  });
});