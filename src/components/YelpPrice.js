import React from 'react'
import { Mutation } from 'react-apollo'
import { Button } from 'semantic-ui-react'
import gql from 'graphql-tag'

export const UPDATE_PRICE = gql`
  mutation updatePrice($price: String!) {
    updatePrice(price: $price) @client {
      price
    }
  }
`

export default function YelpPrice() {
  return (
    <Mutation mutation={UPDATE_PRICE}>
      {updatePrice => (
        <Button.Group size="mini" widths={4}>
          <Button onClick={() => updatePrice({ variables: { price: '1' } })}>
            $
          </Button>
          <Button onClick={() => updatePrice({ variables: { price: '1, 2' } })}>
            $$
          </Button>
          <Button onClick={() => updatePrice({ variables: { price: '2, 3' } })}>
            $$$
          </Button>
          <Button onClick={() => updatePrice({ variables: { price: '3, 4' } })}>
            $$$$
          </Button>
        </Button.Group>
      )}
    </Mutation>
  )
}
