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

export default function YelpPrice(props) {
  return (
    <Mutation mutation={UPDATE_PRICE}>
      {updatePrice => {
        const price = props.price.slice(-1)
        return (
          <Button.Group toggle size="mini" widths={4}>
            <Button
              active={price === '1'}
              onClick={() => {
                updatePrice({ variables: { price: '1' } })
              }}
            >
              $
            </Button>
            <Button
              active={price === '2'}
              onClick={() => {
                updatePrice({ variables: { price: '1, 2' } })
              }}
            >
              $$
            </Button>
            <Button
              active={props.price.slice(-1) === '3'}
              onClick={() => updatePrice({ variables: { price: '2, 3' } })}
            >
              $$$
            </Button>
            <Button
              active={props.price.slice(-1) === '4'}
              onClick={() => updatePrice({ variables: { price: '3, 4' } })}
            >
              $$$$
            </Button>
          </Button.Group>
        )
      }}
    </Mutation>
  )
}
