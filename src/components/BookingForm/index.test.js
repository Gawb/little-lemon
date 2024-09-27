import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BookingForm } from './index';
import { act } from 'react';

// Simulamos la función fetchAPI
const fetchAPI = jest.fn();
global.fetchAPI = fetchAPI;

// Mocks para funciones de API
const loadAPIScript = jest.fn().mockResolvedValue(); // Mock para evitar la carga del script real

beforeEach(() => {
  jest.clearAllMocks(); // Limpiar mocks antes de cada prueba
  // Asignamos el mock de loadAPIScript en el componente
  jest.spyOn(React, 'useEffect').mockImplementation((f) => f()); // Forzar el efecto a ejecutarse
});

test('initializeTimes calls fetchAPI and updates available times', async () => {
  fetchAPI.mockResolvedValue(['18:00', '19:00', '20:00']); // Simulamos la respuesta de la API

  render(<BookingForm />);

  // Verificamos que fetchAPI fue llamado
  await waitFor(() => expect(fetchAPI).toHaveBeenCalled());

  // Verificamos que los horarios disponibles se muestran en el select
  expect(await screen.findByText(/Available times:/i)).toBeInTheDocument();
  expect(screen.getByRole('option', { name: /18:00/i })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: /19:00/i })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: /20:00/i })).toBeInTheDocument();
});
