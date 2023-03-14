import { useReducer, useState } from "react";
import { CartType, Product } from "../utils/cartType";

type Actions =
  | { type: "SET_TITLE"; value: string | number }
  | { type: "SET_PRICE"; value: string | number }
  | { type: "SET_DISCPRICE"; value: string | number }
  | { type: "SET_QUANTITY"; value: string | number }
  | { type: "CLEAN"; value?: string | number };

const formReducer = (state: Product, action: Actions): Product => {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.value as string };
    case "SET_PRICE":
      return { ...state, price: Number(action.value) };
    case "SET_DISCPRICE":
      return { ...state, discountedPrice: Number(action.value) };
    case "SET_QUANTITY":
      return { ...state, quantity: Number(action.value) };
    case "CLEAN":
      return initialValues;
    default:
      return state;
  }
};

const initialValues: Product = {
  id: 0,
  title: "",
  price: 0,
  quantity: 0,
  total: 0,
  discountedPrice: 0,
  discountPercentage: 0,
};

const addCartHandler = (newCart: Product[]): CartType => {
  // [{}, {}]
  const total = newCart.reduce((acc, curr) => acc + curr.total, 0);
  const discountedTotal = newCart.reduce(
    (acc, curr) => acc + curr.discountedPrice,
    0
  );
  const totalQuantity = newCart.reduce((acc, curr) => acc + curr.quantity, 0);

  return {
    id: Math.floor(Math.random() * 1000),
    products: newCart,
    total,
    discountedTotal,
    userId: 15,
    totalProducts: newCart.length,
    totalQuantity,
  };
};

const createData = (state: Product) => {
  const id = Math.floor(Math.random() * 1000);
  const discountPercentage = 100 - (100 * state.discountedPrice) / state.price;
  const total = state.quantity * state.price;
  return {
    ...state,
    id,
    discountPercentage,
    total,
    discountedPrice: state.discountedPrice * state.quantity,
  };
};

const Form = (props: {
  addNewCart: (cart: CartType) => void;
  onCancel: () => void;
}) => {
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [state, dispatch] = useReducer(formReducer, initialValues);
  const [isPriceError, setIsPriceError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isPricePos, setIsPricePos] = useState(false);

  const checkData = () => {
    const createdProduct = createData(state);
    if (
      createdProduct.price === 0 ||
      createdProduct.discountedPrice === 0 ||
      createdProduct.quantity === 0
    ) {
      setIsPricePos(true);
      return;
    }
    if (
      createdProduct.title.length === 0 &&
      createdProduct.price <
        createdProduct.discountedPrice / createdProduct.quantity
    ) {
      setIsNameError(true);
      setIsPriceError(true);
      return;
    }

    if (createdProduct.title.length === 0) {
      setIsNameError(true);
      return;
    }
    if (
      createdProduct.price <
      createdProduct.discountedPrice / createdProduct.quantity
    ) {
      setIsPriceError(true);
      return;
    }
    setNewProducts([...newProducts, createdProduct]);
    dispatch({ type: "CLEAN" });
  };

  return (
    <div className="fixed border-4 w-1/4 top-1/4 left-1/3 translate-x-1/3  z-20 rounded-lg bg-white">
      <form
        className="flex flex-col  items-center text-xl"
        onSubmit={(e) => {
          e.preventDefault();
          checkData();
        }}
      >
        {/* Item title */}
        <label htmlFor="title">Item name</label>
        <input
          className="border-4 border-zinc-500 rounded-md"
          placeholder="Name"
          type="text"
          id="title"
          value={state.title}
          onFocus={() => setIsNameError(false)}
          onChange={(e) => {
            dispatch({ type: "SET_TITLE", value: e.target.value });
          }}
        />
        {isNameError && (
          <p className="text-red-600">Item name cannot be empty</p>
        )}
        {/* Price */}
        <label htmlFor="price">Price</label>
        <input
          className="border-4 border-zinc-500 rounded-md"
          onFocus={() => {
            setIsPriceError(false);
            setIsPricePos(false);
          }}
          placeholder="0"
          type="number"
          id="price"
          value={state.price}
          onChange={(e) => {
            dispatch({ type: "SET_PRICE", value: e.target.value });
          }}
        />
        {/* DiscoutnedPrice */}
        <label htmlFor="discPrice">Discounted Price</label>
        <input
          className="border-4 border-zinc-500 rounded-md"
          onFocus={() => {
            setIsPriceError(false);
            setIsPricePos(false);
          }}
          type="number"
          placeholder="0"
          id="discPrice"
          value={state.discountedPrice}
          onChange={(e) => {
            dispatch({ type: "SET_DISCPRICE", value: e.target.value });
          }}
        />
        {/* Quantity */}
        <label htmlFor="quantity">Quantity</label>
        <input
          className="border-4 border-zinc-500 rounded-md"
          type="number"
          onFocus={() => setIsPricePos(false)}
          placeholder="0"
          id="quantity"
          value={state.quantity}
          onChange={(e) => {
            dispatch({ type: "SET_QUANTITY", value: e.target.value });
          }}
        />
        {isPriceError && (
          <p className="text-red-600">
            Discounted price cannot be higher than the price
          </p>
        )}
        {isPricePos && (
          <p className="text-red-600 text-center">
            Price, discounted price and quantity must be positive values
          </p>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold border-2 border-blue-500 rounded-md m-2 p-2"
        >
          Add product
        </button>
      </form>
      {newProducts.length > 0 && <p>Your currents products</p>}
      {newProducts.map((product) => (
        <div key={product.id}>
          {product.title} --{">"} {product.price * product.quantity}$
        </div>
      ))}
      <div className="flex justify-between">
        <button
          onClick={() => props.onCancel()}
          className="bg-red-600 text-white font-bold border-2 border-red-600 rounded-md m-2 p-2"
        >
          Cancel
        </button>
        {newProducts.length > 0 && (
          <button
            disabled={newProducts.length === 0}
            className="bg-blue-500 text-white font-bold border-2 border-blue-500 rounded-md m-2 p-2"
            onClick={() => {
              const finalCart = addCartHandler(newProducts);
              props.addNewCart(finalCart);
              setNewProducts([]);
              props.onCancel();
            }}
          >
            Add new cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Form;
