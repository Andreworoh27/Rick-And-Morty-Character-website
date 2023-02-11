import { gql } from "@apollo/client";

export const GetAllCharacter = gql`
  query ($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
        image
        location {
          name
        }
      }
    }
  }
`;

export const SearchCharacterByName = gql`
  query ($name: FilterCharacter!, $page: Int!) {
    characters(filter: $name, page: $page) {
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
        image
        location {
          name
        }
      }
    }
  }
`;

export const SearchCharacterByID = gql`
  query ($id: [ID!]!) {
    charactersByIds(ids: $id) {
      id
      name
      status
      species
      gender
      origin {
        name
      }
      image
      location {
        name
      }
    }
  }
`;
