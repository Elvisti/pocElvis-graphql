const { gql } = require("apollo-server");

/////////////////////////////////////////////////////////////////
/////////////////           Schemas            //////////////////
/////////////////////////////////////////////////////////////////

const schemas = gql`

input UserInput {
    id: ID
    name: String
    age: Int
    telephones: [TelephoneInput]
    emails: [EmailInput]
    addresses: [AddressInput]
}

  input TelephoneInput {
    id: ID
    number: String! 
}

input EmailInput {
    id: ID
    email: String!
}

input AddressInput {
    id: ID
    type: String!
    address: String!
    addressName: String
    city: String!
    state: String
    countryId: ID!
    postcode: String
    preferred: Boolean
    country: CountryInput
}

input CountryInput {
    id: ID
    name: String
}

type User {
    id: ID
    name: String
    age: Int
    telephones: [Telephone]
    emails: [Email]
    addresses: [Address]
}

type Telephone {
    id: ID
    number: String
    user: User
}

type Email {
    id: ID
    email: String
    user: User
}

type Address {
    id: ID
    type: String
    address: String
    addressName: String
    city: String
    state: String
    postcode: String
    user: User
}

type Query {
    getUsers: [User]
}

type Mutation {
  createUser(user: UserInput!): User
}
  `;

module.exports = schemas;