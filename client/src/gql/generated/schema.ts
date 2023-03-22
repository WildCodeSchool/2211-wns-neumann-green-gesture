import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type EcoAction = {
  __typename?: 'EcoAction';
  author?: Maybe<User>;
  description: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type EcoActionInputCreation = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type Group = {
  __typename?: 'Group';
  author: User;
  endDate: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  startDate: Scalars['DateTime'];
  users: Array<User>;
};

export type GroupInputCreation = {
  endDate: Scalars['DateTime'];
  name: Scalars['String'];
  startDate: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createEcoAction: EcoAction;
  createGroup: Group;
  createUser: User;
  login: Scalars['String'];
};


export type MutationCreateEcoActionArgs = {
  data: EcoActionInputCreation;
};


export type MutationCreateGroupArgs = {
  data: GroupInputCreation;
};


export type MutationCreateUserArgs = {
  data: UserInputSubscribe;
};


export type MutationLoginArgs = {
  data: UserInputLogin;
};

export type Query = {
  __typename?: 'Query';
  getGroups: Array<Group>;
  getUserById: User;
  getUserEcoActions: Array<EcoAction>;
  users: Array<User>;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdEcoActions: Array<EcoAction>;
  createdGroups: Array<Group>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  groups: Array<Group>;
  id: Scalars['Float'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  subscriptionType: Scalars['String'];
};

export type UserInputLogin = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserInputSubscribe = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
  subscriptionType?: InputMaybe<Scalars['String']>;
};

export type GetUserByIdQueryVariables = Exact<{
  getUserById: Scalars['Int'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, password: string, role: string, subscriptionType: string } };

export type GetUserEcoActionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserEcoActionsQuery = { __typename?: 'Query', getUserEcoActions: Array<{ __typename?: 'EcoAction', id: number, name: string, description: string, author?: { __typename?: 'User', firstName: string, lastName: string, email: string } | null }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, password: string, role: string, subscriptionType: string }> };

export type LoginMutationVariables = Exact<{
  loginData: UserInputLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type CreateUserMutationVariables = Exact<{
  data: UserInputSubscribe;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', email: string, firstName: string, lastName: string, password: string } };


export const GetUserByIdDocument = gql`
    query GetUserById($getUserById: Int!) {
  getUserById(id: $getUserById) {
    id
    firstName
    lastName
    email
    password
    role
    subscriptionType
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      getUserById: // value for 'getUserById'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetUserEcoActionsDocument = gql`
    query GetUserEcoActions {
  getUserEcoActions {
    id
    name
    description
    author {
      firstName
      lastName
      email
    }
  }
}
    `;

/**
 * __useGetUserEcoActionsQuery__
 *
 * To run a query within a React component, call `useGetUserEcoActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserEcoActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserEcoActionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserEcoActionsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserEcoActionsQuery, GetUserEcoActionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserEcoActionsQuery, GetUserEcoActionsQueryVariables>(GetUserEcoActionsDocument, options);
      }
export function useGetUserEcoActionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserEcoActionsQuery, GetUserEcoActionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserEcoActionsQuery, GetUserEcoActionsQueryVariables>(GetUserEcoActionsDocument, options);
        }
export type GetUserEcoActionsQueryHookResult = ReturnType<typeof useGetUserEcoActionsQuery>;
export type GetUserEcoActionsLazyQueryHookResult = ReturnType<typeof useGetUserEcoActionsLazyQuery>;
export type GetUserEcoActionsQueryResult = Apollo.QueryResult<GetUserEcoActionsQuery, GetUserEcoActionsQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    firstName
    lastName
    email
    password
    role
    subscriptionType
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const LoginDocument = gql`
    mutation Login($loginData: UserInputLogin!) {
  login(data: $loginData)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginData: // value for 'loginData'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: UserInputSubscribe!) {
  createUser(data: $data) {
    email
    firstName
    lastName
    password
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;