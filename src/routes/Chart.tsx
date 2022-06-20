import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["weekChart", coinId],
    () => fetchCoinHistory(coinId)
  );

  const priceOhlcData = data?.map((ohlc) => ({
    x: ohlc.time_open,
    y: [ohlc.open, ohlc.high, ohlc.low, ohlc.close],
  }));

  return (
    <div>
      {isLoading ? (
        "Loading.."
      ) : (
        <ApexChart
          type="candlestick"
          series={[{ data: priceOhlcData }] as unknown as number[]}
          options={{
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#0ECB81",
                  downward: "#F6465D",
                },
              },
            },
            grid: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) => price.time_close * 1000) ?? [],
            },

            theme: {
              mode: `dark`,
            },
            chart: {
              toolbar: {
                show: false,
              },
              background: "transparent",
              height: 500,
              width: 500,
            },

            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        ></ApexChart>
      )}
    </div>
  );
}

export default Chart;
