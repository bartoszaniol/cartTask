import { useState } from "react";
import { CartType } from "../utils/cartType";
import Chart from "./Chart";
import Backdrop from "./Backdrop";

const Cart = (props: {
  cart: CartType;
  deleteCart: (id: number) => void;
  index: number;
}) => {
  const [isChart, setIsChart] = useState(false);

  const setChartHandler = () => {
    setIsChart((prev) => !prev);
  };
  return (
    <li className="border-4 m-4 p-2 rounded-md flex flex-col ">
      {isChart && <Backdrop onClose={setChartHandler} />}
      {isChart && <Chart cartData={props.cart} onClose={setChartHandler} />}
      <section>
        <h3 className="text-red-600">Products in cart #{props.index + 1} </h3>
        {props.cart.products.map((product) => (
          <div key={product.id}>
            <h4>
              {product.quantity}x {product.title} --{">"} {product.total}$
            </h4>
          </div>
        ))}
        <p>Total: {props.cart.total}$</p>
      </section>
      <div className="flex justify-between  mt-auto">
        <button
          className="border-4 rounded-md m-2 p-1 bg-blue-500 text-white border-blue-500 font-bold hover:bg-blue-300
          hover:border-blue-300"
          onClick={() => {
            setChartHandler();
          }}
        >
          Show data
        </button>
        <button
          className="border-4 rounded-md m-2 p-1 bg-red-600 text-white border-red-600 font-bold hover:bg-red-400 hover:border-red-400"
          onClick={() => {
            setIsChart(false);
            props.deleteCart(props.cart.id);
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Cart;
