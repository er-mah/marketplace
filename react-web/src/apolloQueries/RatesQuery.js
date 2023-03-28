import gql from 'graphql-tag';

const RatesQuery = gql`query Rates{
  AllRates{
    id
    period
    rate
    term
  }
}`;

const RatesMutation = gql`
mutation updateRates($MAHtoken: String!, $period: String!, $rate: Float!, $term: Int!){
  updateRates(MAHtoken:$MAHtoken, period:$period, rate:$rate, term:$term){
    id
		period
    rate
    term
  }
}`;

export { RatesQuery, RatesMutation };

