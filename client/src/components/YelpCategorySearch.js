import React from 'react'
import { Mutation } from 'react-apollo'
import { Select, Dropdown } from 'semantic-ui-react'
import gql from 'graphql-tag'

export const UPDATE_TERM = gql`
  mutation updateTerm($term: String!) {
    updateTerm(term: $term) @client {
      term
    }
  }
`

const attractions = [
  'Breakfast & Brunch',
  'Coffee & Tea',
  'Restaurants',
  'Vegetarian',
  'Pizza',
  'Hot Dogs',
  'Bars',
  'Movies & Plays',
  'Live Music'
]

export default class YelpCategorySearch extends React.Component {
  handleAddition = (event, { value }) => {
    attractions.push(value)
  }

  render() {
    return (
      <div>
        <Mutation mutation={UPDATE_TERM}>
          {updateTerm => (
            <Dropdown
              placeholder="Choose an attraction"
              selection
              search
              allowAdditions
              fluid
              additionLabel="Add custom term: "
              options={attractions.map(attraction => ({
                key: attraction,
                text: attraction,
                value: attraction
              }))}
              onAddItem={this.handleAddition}
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
