import { useEffect, useState } from "react";
import { CartType, CartJSONType } from "./utils/cartType";
import Cart from "./components/Cart";
import Backdrop from "./components/Backdrop";
import Form from "./components/Form";

function App() {
  const [carts, setCarts] = useState<CartType[]>([]);
  const [isForm, setIsForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const getCarts = async () => {
      const { carts: cartsData }: CartJSONType = await (
        await fetch("https://dummyjson.com/carts")
      ).json();
      setCarts(cartsData);
      setIsLoaded(true);
    };
    getCarts();
  }, []);

  const addCartHandler = (newCart: CartType) => {
    const updatedCarts = [...carts, newCart];
    setCarts(updatedCarts);
  };

  const onCancelHandler = () => {
    setIsForm((prev) => !prev);
  };

  const deleteCartHandler = (id: number) => {
    const filteredCarts = carts.filter((cart) => cart.id !== id);
    setCarts(filteredCarts);
  };

  if (isLoaded === false) return <div>Loading...</div>;
  return (
    <main>
      {isLoaded === true && carts.length === 0 && (
        <div className="h-screen flex justify-center items-center flex-col">
          <div className="text-lg font-bold">Start adding new carts...</div>
          <button
            onClick={() => setIsForm((prev) => !prev)}
            className="border-blue-500 bg-blue-500 text-white font-bold rounded-md text-xl h-14 self-center p-2 hover:bg-blue-300
            hover:border-blue-300"
          >
            Add new cart
          </button>
        </div>
      )}
      {isForm && (
        <>
          <Backdrop />
          <Form addNewCart={addCartHandler} onCancel={onCancelHandler} />
        </>
      )}
      <div className={`relative`}>
        {carts.length !== 0 && (
          <button
            onClick={() => setIsForm((prev) => !prev)}
            className="fixed bottom-20 right-10 border-4 border-blue-500 bg-blue-500 text-white font-bold rounded-md text-xl h-14 hover:bg-blue-300
            hover:border-blue-300"
          >
            Add new cart
          </button>
        )}

        <ul className="grid grid-cols-3">
          {Object.keys(carts).map((key, index) => {
            return (
              <Cart
                key={index}
                deleteCart={deleteCartHandler}
                cart={carts[index]}
                index={index}
              />
            );
          })}
        </ul>
      </div>
    </main>
  );
}

export default App;
