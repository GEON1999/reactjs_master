import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTikers } from "../api";

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.tapColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTikers(coinId),
    {
      refetchInterval: 5000,
    }
  );
  console.log(data);
  return (
    <Container>
      {isLoading ? (
        "Loading.."
      ) : (
        <Overview>
          <OverviewItem>
            <span>24h Volume</span>
            <span>
              {" "}
              {data?.quotes.USD.volume_24h
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                .slice(0, 9)}
              M
            </span>
          </OverviewItem>
          <OverviewItem>
            <span>24h Change</span>
            <span>{data?.quotes.USD.percent_change_24h}%</span>
          </OverviewItem>
          <OverviewItem>
            <span>Market Cap</span>
            <span>
              {" "}
              {data?.quotes.USD.market_cap
                .toFixed(0)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                .slice(0, 10)}
              M
            </span>
          </OverviewItem>
        </Overview>
      )}
    </Container>
  );
}

export default Price;
