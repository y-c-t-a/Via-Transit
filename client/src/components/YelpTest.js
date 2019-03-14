import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const TEST_YELP = gql`
{
  search(term: "burrito",
          location: "san francisco",
          limit: 5) {
      total
      business {
          name
          url
      }
  }
}`


export default function Test () {
 return (
   <div>
     <Query query={TEST_YELP}>
       {({ data, loading, error }) => {
         if (loading) return <p>Loading...</p>
         if (error) return <p>oh noes</p>
         return (
           <div>
             <h1>{data}</h1>
           </div>
         )
       }}
     </Query>
   </div>
 )
}
