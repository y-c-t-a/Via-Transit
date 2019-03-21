import React from 'react'
import { Mutation } from 'react-apollo'
import { Select } from 'semantic-ui-react'
import gql from 'graphql-tag'

export const UPDATE_TERM = gql`
  mutation updateTerm($term: String!) {
    updateTerm(term: $term) @client {
      term
    }
  }
`

const attractions = [
  'Restaurants',
  'Breakfast & Brunch',
  'Coffee & Tea',
  'Movies'
]

export default class YelpCategorySearch extends React.Component {
  render() {
    return (
      <div>
        <Mutation mutation={UPDATE_TERM}>
          {updateTerm => (
            <Select
              placeholder="Choose an attraction"
              options={attractions.map(attraction => ({
                key: attraction,
                text: attraction,
                value: attraction
              }))}
              onChange={(event, data) => {
                updateTerm({ variables: { term: data.value } })
              }}
            />
          )}
        </Mutation>
      </div>
    )
  }
}
