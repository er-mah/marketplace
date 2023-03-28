import gql from "graphql-tag";

const GetTextsQuery = gql`
  query GetTextsQuery($route: String, $section: String) {
    PageTexts(route: $route, section: $section) {
      route
      section
      text
    }
  }
`;

const updateTextMutation = gql`
  mutation updateText(
    $MAHtoken: String!
    $section: String!
    $route: String!
    $text: String!
  ) {
    updateText(
      MAHtoken: $MAHtoken
      section: $section
      route: $route
      text: $text
    ) {
      route
      section
      text
    }
  }
`;
export { GetTextsQuery, updateTextMutation };
