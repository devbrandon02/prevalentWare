import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalCreateMovements from './ModalCreateMovements';

describe('ModalCreateMovements component', () => {
  it('renders without crashing', () => {
    const mockModalRef = React.createRef<HTMLDialogElement>();
    const mockRefetch = jest.fn();

    render(
      <ModalCreateMovements modalRef={mockModalRef} refetch={mockRefetch} />
    );

    const headerElement = screen.getByText('Nuevo Movimiento de Dinero!');
    expect(headerElement).toBeInTheDocument();

    const createButton = screen.getByText('Crear');
    fireEvent.click(createButton);

    expect(mockRefetch).toHaveBeenCalled();
  });
});
