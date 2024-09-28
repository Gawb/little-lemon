import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import { BookingForm } from './index.js';

beforeEach(() => {
    jest.useFakeTimers(); // Utiliza temporizadores simulados
});

afterEach(() => {
    jest.clearAllTimers(); // Limpia cualquier temporizador después de cada test
    jest.clearAllMocks();
});

test('find location', async () => {
    await act(async () => {
        render(<BookingForm />);
    });
    const headingElement = screen.getByText(/At which location/i);
    expect(headingElement).toBeInTheDocument();
});

test('find area', async () => {
    await act(async () => {
        render(<BookingForm />);
    });

    const headingElement = screen.getByText(/Select area/i);
    expect(headingElement).toBeInTheDocument();
});

test('find initializeTimes', async () => {
    await act(async () => {
        render(<BookingForm />);
    });

    const currentDate = new Date().toISOString().split('T')[0];

    const inputElement = screen.getByTestId('input-date');

    await act(async () => {
        fireEvent.change(inputElement, { target: { value: currentDate } });
    });

    expect(inputElement.value).toBe(currentDate);
});

test('find availableTimes', async () => {
    // Mock del fetchAPI
    global.fetchAPI = jest.fn(() => ['18:00', '19:00', '20:00']); // Simulamos tiempos disponibles

    await act(async () => {
        render(<BookingForm />);
    });

    const selectTimeElement = screen.getByTestId('select-time');

    // Espera a que se actualicen los tiempos
    await waitFor(() => {
        expect(selectTimeElement).toHaveTextContent('18:00'); // Verifica que 18:00 esté disponible
    });

    // Cambia el valor del select al horario deseado
    await act(async () => {
        fireEvent.change(selectTimeElement, { target: { value: '18:00' } });
    });

    expect(selectTimeElement.value).toBe('18:00'); // Comprueba si el valor es el esperado
});

