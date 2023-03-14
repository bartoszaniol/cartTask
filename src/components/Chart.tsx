import { CartType } from "../utils/cartType";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scales: {
    y: {
      ticks: {
        // Include a dollar sign in the ticks
        callback: function (value: any, index: any, ticks: any) {
          return value + "$";
        },
      },
      title: {
        display: true,
        text: "Price",
      },
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Cart products data",
    },
  },
};

const Chart = (props: { cartData: CartType; onClose: () => void }) => {
  let labels = [];
  let prices = [];
  let discountedPrices = [];
  for (const [key, value] of Object.entries(props.cartData.products)) {
    labels.push(value.title);
    prices.push(value.price);
    discountedPrices.push(
      Math.round((value.discountedPrice / value.quantity) * 100) / 100
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Normal price",
        data: prices,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Discounted Price",
        data: discountedPrices,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className="fixed z-30 bg-white top-1/3 left-1/3 w-1/3" title="chart">
      <Line options={options} data={data} />
      <button
        onClick={props.onClose}
        className="bg-red-600 text-white font-bold border-2 border-red-600 rounded-md m-2 p-2"
      >
        Close chart
      </button>
    </div>
  );
};

export default Chart;
