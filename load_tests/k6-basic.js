import http from 'k6/http'
import { sleep } from 'k6'
import { Counter, Rate } from 'k6/metrics'

export const options = {
  scenarios: {
    example_scenario: {
      // name of the executor to use
      executor: 'constant-vus',

      vus: 1000,
      duration: '30s',
    },
  },
}

export default function () {
  recordRates(http.get('http://localhost:3000/'))
  //const resp = http.post(
  //  'http://localhost:3000/graphql',
  //  '{"operationName":"GetPotential","variables":{},"query":"query GetPotential {\n  getPotentialMatches {\n    user {\n      id\n      __typename\n    }\n    dogName\n    dogAge\n    dogBreed\n    location\n    bio\n    contact\n    facebook\n    linkedin\n    imageURL\n    __typename\n  }\n}\n"}',
  //  {
  //    headers: {
  //      'Content-Type': 'application/json',
  //    },
  //  }
  //)
  // )
  sleep(Math.random() * 3)
}

const count200 = new Counter('status_code_2xx')
const count300 = new Counter('status_code_3xx')
const count400 = new Counter('status_code_4xx')
const count500 = new Counter('status_code_5xx')

const rate200 = new Rate('rate_status_code_2xx')
const rate300 = new Rate('rate_status_code_3xx')
const rate400 = new Rate('rate_status_code_4xx')
const rate500 = new Rate('rate_status_code_5xx')

function recordRates(res) {
  if (res.status >= 200 && res.status < 300) {
    count200.add(1)
    rate200.add(1)
  } else if (res.status >= 300 && res.status < 400) {
    console.log(res.body)
    count300.add(1)
    rate300.add(1)
  } else if (res.status >= 400 && res.status < 500) {
    count400.add(1)
    rate400.add(1)
  } else if (res.status >= 500 && res.status < 600) {
    count500.add(1)
    rate500.add(1)
  }
}