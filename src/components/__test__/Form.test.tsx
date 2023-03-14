import { render, fireEvent, screen } from "@testing-library/react";
import Form from "../Form";

const mockedOnClicks = jest.fn();

describe("Form component", () => {
  it("Should render 4 input elements", async () => {
    render(<Form onCancel={mockedOnClicks} addNewCart={mockedOnClicks} />);
    const titleInputElement = screen.getByPlaceholderText(/Name/i);
    expect(titleInputElement).toBeInTheDocument;
    const numberInputElements = screen.getAllByPlaceholderText("0");
    expect(numberInputElements.length).toBe(3);
  });

  it("Should render 4 label elements", async () => {
    render(<Form onCancel={mockedOnClicks} addNewCart={mockedOnClicks} />);
    const titleLabelElement = screen.getByLabelText(/Item name/i);
    expect(titleLabelElement).toBeInTheDocument;
    const priceLabelElement = screen.getByLabelText("Price");
    expect(priceLabelElement).toBeInTheDocument;
    const discPriceLabelElement = screen.getByLabelText(/Discounted Price/i);
    expect(discPriceLabelElement).toBeInTheDocument;
    const quantityLabelElement = screen.getByLabelText(/Quantity/i);
    expect(quantityLabelElement).toBeInTheDocument;
  });

  it("Should be able to type in input", async () => {
    render(<Form onCancel={mockedOnClicks} addNewCart={mockedOnClicks} />);
    const titleInputElement = screen.getByPlaceholderText(
      /Name/i
    ) as HTMLInputElement;
    fireEvent.change(titleInputElement, { target: { value: "TEST" } });
    expect(titleInputElement.value).toBe("TEST");
  });

  it("Should be able to print error message about positive values", async () => {
    render(<Form onCancel={mockedOnClicks} addNewCart={mockedOnClicks} />);
    const addProductElement = screen.getByRole("button", {
      name: "Add product",
    }) as HTMLButtonElement;
    fireEvent.click(addProductElement);
    const paragraphElement = screen.getByText(
      "Price, discounted price and quantity must be positive values"
    );
    expect(paragraphElement).toBeInTheDocument;
  });

  it("Should be able to print error message about empty title input", async () => {
    render(<Form onCancel={mockedOnClicks} addNewCart={mockedOnClicks} />);

    const addProductElement = screen.getByRole("button", {
      name: "Add product",
    }) as HTMLButtonElement;

    const numberInputElements = screen.getAllByPlaceholderText(
      "0"
    ) as HTMLInputElement[];
    expect(numberInputElements.length).toBe(3);
    for (let i = 0; i < numberInputElements.length; i++) {
      fireEvent.change(numberInputElements[i], { target: { value: "10" } });
    }
    fireEvent.click(addProductElement);
    const paragraphElement = screen.getByText("Item name cannot be empty");
    expect(paragraphElement).toBeInTheDocument;
  });
});
