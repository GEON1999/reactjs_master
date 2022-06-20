import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins, fetchCoinTikers } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const Title = styled.h1`
  font-weight: 800;
  font-size: 35px;
  color: ${(props) => props.theme.accentColor};
`;

const Coin = styled.li`
  font-weight: 500;
  background-color: #1a2541;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin: 5px 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  a {
    display: flex;
    align-items: center;
    padding: 10px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
`;

interface Icoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
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

function Coins() {
  const { isLoading, data } = useQuery<Icoin[]>("allCoins", fetchCoins);

  //useQuery requires two argument, 1st is unique id & second is fetcher fun
  // whlie fetcher function bring fetch data, isLOading will show us loading, then when it is done, it will give us data which is fetchd(json)
  return (
    <Container>
      <Helmet>
        <title>BINANCE</title>
      </Helmet>
      <Header>
        <Img src="data:image/png;base64,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" />
        <Title>BINANCE</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin.name}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </Container>
  );
}
export default Coins;