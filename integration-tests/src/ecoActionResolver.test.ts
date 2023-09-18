import { gql } from "@apollo/client/core";
import client from "./apolloClient";
import db from "../../server/src/db";
import User from "../../server/src/entity/User";
import Validation from "../../server/src/entity/Validation";
import { getJWTFor } from "./utils";
// import EcoAction from "../../server/src/entity/EcoAction";

const createEcoActionMutation = gql`
  mutation CreateEcoAction($data: EcoActionInputCreation!) {
    createEcoAction(data: $data) {
      id
      name
      description
      author {
        id
        firstName
        lastName
        email
        subscriptionType
        role
      }
      validations {
        id
        name
        points
      }
    }
  }
`;

// const getEcoActionByIdQuery = gql`
//   query GetEcoActionbyId($EcoActionId: Int!) {
//     getEcoActionbyId(id: $EcoActionId) {
//       name
//       description
//       validations {
//         id
//         points
//       }
//     }
//   }
// `;

// const updateEcoActionMutation = gql`
//   mutation UpdateEcoAction(
//     $data: EcoActionInputCreation!
//     $updateEcoActionId: Int!
//   ) {
//     updateEcoAction(data: $data, id: $updateEcoActionId) {
//       id
//       name
//       description
//       validations {
//         id
//         points
//       }
//     }
//   }
// `;

// const deleteEcoActionMutation = gql`
//   mutation DeleteEcoAction($ecoActionId: Int!) {
//     deleteEcoAction(id: $ecoActionId)
//   }
// `;

const getToken = async () => {
  const author = await db.getRepository(User).save({
    firstName: "User",
    lastName: "Partner",
    email: "user2@gmail.com",
    password: "testtest",
    subscriptionType: "partner",
  });

  // create a token for the user
  const token = await getJWTFor(author);
  return { token, author };
};

describe("EcoAction Resolver", () => {
  describe("createEcoAction", () => {
    it("Must not create eco-actions with invalid attributes and must return an error", async () => {
      // create a user
      const { token } = await getToken();

      expect(() =>
        client.mutate({
          mutation: createEcoActionMutation,
          variables: {
            data: {
              name: "",
              description: "",
              validationIds: [],
            },
          },
          context: {
            headers: {
              authorization: `Bearer ${token}`,
            },
            fetchPolicy: "no-cache",
          },
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        `"Argument Validation Error"`
      );
    });

    it("should create an eco-action", async () => {
      // create a user
      const { token, author } = await getToken();

      const validations = await db.getRepository(Validation).save([
        {
          name: "Validation 1",
          points: 10,
        },
        {
          name: "Validation 2",
          points: 20,
        },
        {
          name: "Validation 3",
          points: 30,
        },
        {
          name: "Validation 4",
          points: 40,
        },
      ]);

      const validationIds = validations.map((validation) => validation.id);
      const validationWithTypename = validations.map((validation) => {
        return {
          __typename: "Validation",
          ...validation,
        };
      });

      const { password, ...authorWithoutPassword } = author;
      const res = await client.mutate({
        mutation: createEcoActionMutation,
        variables: {
          data: {
            name: "EcoAction",
            description: "Description",
            validationIds: validationIds,
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
          fetchPolicy: "no-cache",
        },
      });

      expect(res.data.createEcoAction).toHaveProperty("id");
      expect(res.data.createEcoAction).toHaveProperty("name", "EcoAction");
      expect(res.data.createEcoAction).toHaveProperty(
        "description",
        "Description"
      );
      expect(res.data.createEcoAction).toHaveProperty("author", {
        __typename: "User",
        ...authorWithoutPassword,
      });
      expect(res.data.createEcoAction).toHaveProperty(
        "validations",
        validationWithTypename
      );
    });
  });
});
