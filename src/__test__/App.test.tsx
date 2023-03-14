import { render, fireEvent, screen } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  it("Should render 20 carts", async () => {
    render(<App />);
    const cartsElement = await screen.findAllByRole("listitem");
    expect(cartsElement.length).toBe(20);
  });

  it("Should render 21 carts after adding new one", async () => {
    render(<App />);
    const addNewCartElement = (await screen.findByRole("button", {
      name: /Add new cart/i,
    })) as HTMLButtonElement;
    fireEvent.click(addNewCartElement);
    const titleInputElement = screen.getByPlaceholderText(/Name/i);
    const numberInputElements = screen.getAllByPlaceholderText("0");
    fireEvent.change(titleInputElement, { target: { value: "test" } });
    for (let i = 0; i < numberInputElements.length; i++) {
      fireEvent.change(numberInputElements[i], { target: { value: "10" } });
    }
    const addProductButton = screen.getByRole("button", {
      name: "Add product",
    });
    fireEvent.click(addProductButton);
    const addNewCartButtons = screen.getAllByRole("button", {
      name: "Add new cart",
    });
    fireEvent.click(addNewCartButtons[0]);
    const cartsElement = await screen.findAllByRole("listitem");
    expect(cartsElement.length).toBe(21);
  });

  it("Should render 19 carts after deleting one", async () => {
    render(<App />);
    const deleteCartButtons = (await screen.findAllByRole("button", {
      name: /Delete/i,
    })) as HTMLButtonElement[];
    fireEvent.click(deleteCartButtons[0]);
    const cartsElement = screen.getAllByRole("listitem");
    expect(cartsElement.length).toBe(19);
  });

  it("Should render a chart after clicking a button", async () => {
    render(<App />);
    const showChartButtons = (await screen.findAllByRole("button", {
      name: /Show data/i,
    })) as HTMLButtonElement[];
    fireEvent.click(showChartButtons[0]);
    const chartElement = screen.findByTitle("chart");
    expect(chartElement).toBeInTheDocument;
  });
});
