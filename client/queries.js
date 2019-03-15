// Yelp query:

/*

query {
  searchBusinessTerm(latitude: 41.895546, longitude: -87.638756, term: “coffee”) {
    businesses {
      price
      name
      rating
      coordinates {
        latitude
        longitude
      }
    }
  }
 }

 */

//Google Query:

/*

query {
 getDirections(originLatitude: 41.895541, originLongitude: -87.639220, destinationLatitude: 41.8902842, destinationLongitude: -87.6440364) {
   routes {
        summary
   legs {
     steps {
                travel_mode
       start_location {
         latitude
         longitude
       }
       end_location {
         latitude
         longitude
       }
       # polyline {points}
       duration {
       value
       text
     }
       html_instructions
       distance {
       value
       text
     }
       transit_details {
         arrival_stop {
           name
           location {
             latitude
             longitude
           }
         }
         departure_stop {
           name
           location {
             latitude
             longitude
           }
         }
         headway
         num_stops
         line {
           name
           short_name
           color
           icon
           vehicle {
             name
             type
                       icon
             local_icon
           }
         }
       }
     }
     duration {
       value
       text
     }
     distance {
       value
       text
     }
   }
   # overview_polyline
   fare {
     currency
     value
     text
   }
   bounds {
     southwest {
       longitude
       latitude
     }
     northeast {
       longitude
       latitude
     }
   }
   }
 }
}# Write your query or mutation here

*/
