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

export type Comment = {
  __typename?: 'Comment';
  author: User;
  createdAt: Scalars['DateTime'];
  group: Group;
  id: Scalars['Float'];
  message: Scalars['String'];
};

export type CommentInputCreation = {
  groupId: Scalars['Float'];
  message: Scalars['String'];
};

export type Company = {
  __typename?: 'Company';
  creator: User;
  id: Scalars['Float'];
  name: Scalars['String'];
  users: Array<User>;
};

export type CreateTeamInput = {
  groupId: Scalars['Int'];
  name: Scalars['String'];
};

export type EcoAction = {
  __typename?: 'EcoAction';
  author?: Maybe<User>;
  description: Scalars['String'];
  groups?: Maybe<Array<Group>>;
  id: Scalars['Float'];
  likes: Scalars['Float'];
  name: Scalars['String'];
  relatedUsers: Array<UserEcoAction>;
  validations: Array<Validation>;
};

export type EcoActionInputCreation = {
  description: Scalars['String'];
  name: Scalars['String'];
  validations: Array<ValidationInputCreation>;
};

export type Group = {
  __typename?: 'Group';
  author: User;
  challengeName: Scalars['String'];
  ecoActions: Array<EcoAction>;
  endDate: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  startDate: Scalars['DateTime'];
  teams: Array<Team>;
  users: Array<User>;
};

export type GroupInputAddEcoActions = {
  ecoActionIds: Array<Scalars['Int']>;
  groupId: Scalars['Float'];
};

export type GroupInputAddOneUser = {
  groupId: Scalars['Float'];
  userId: Scalars['Int'];
};

export type GroupInputCreation = {
  challengeName: Scalars['String'];
  ecoActionsIds: Array<Scalars['Int']>;
  endDate: Scalars['DateTime'];
  name: Scalars['String'];
  participants: Array<Scalars['Int']>;
  startDate: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addEcoActionsToGroup: Group;
  addFriend: User;
  addProof: Scalars['String'];
  addUserToGroup: Group;
  addUsersToCompany: Company;
  addUsersToTeam: Team;
  createComment: Comment;
  createEcoAction: EcoAction;
  createGroup: Group;
  createTeam: Team;
  createUser: User;
  likeEcoAction: Scalars['String'];
  login: Scalars['String'];
  logout: Scalars['String'];
};


export type MutationAddEcoActionsToGroupArgs = {
  data: GroupInputAddEcoActions;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['Int'];
};


export type MutationAddProofArgs = {
  data: UserEcoActionInputAddProof;
};


export type MutationAddUserToGroupArgs = {
  data: GroupInputAddOneUser;
};


export type MutationAddUsersToCompanyArgs = {
  companyId: Scalars['Int'];
  users: Array<Scalars['Int']>;
};


export type MutationAddUsersToTeamArgs = {
  data: TeamInputAddUsers;
};


export type MutationCreateCommentArgs = {
  data: CommentInputCreation;
};


export type MutationCreateEcoActionArgs = {
  data: EcoActionInputCreation;
};


export type MutationCreateGroupArgs = {
  data: GroupInputCreation;
};


export type MutationCreateTeamArgs = {
  data: CreateTeamInput;
};


export type MutationCreateUserArgs = {
  data: UserInputSubscribe;
};


export type MutationLikeEcoActionArgs = {
  data: UserEcoActionInputAddLike;
};


export type MutationLoginArgs = {
  data: UserInputLogin;
};

export type Query = {
  __typename?: 'Query';
  getCommentsForGroup: Array<Comment>;
  getCurrentUser: User;
  getFreeEcoActions: Array<EcoAction>;
  getGroup: Group;
  getGroups: Array<Group>;
  getTeamByGroup: Array<Team>;
  getUserById: User;
  getUserEcoAction: Array<UserEcoAction>;
  getUserEcoActions: Array<EcoAction>;
  getUserGroups: Array<Group>;
  getUsers: Array<User>;
  getUsersByName: Array<User>;
  getUsersByTeam: Array<User>;
  users: Array<User>;
};


export type QueryGetCommentsForGroupArgs = {
  groupId: Scalars['Float'];
};


export type QueryGetGroupArgs = {
  groupId: Scalars['Float'];
};


export type QueryGetTeamByGroupArgs = {
  groupId: Scalars['Float'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['Int'];
};


export type QueryGetUserEcoActionArgs = {
  ecoActionId: Scalars['Float'];
  groupId: Scalars['Float'];
};


export type QueryGetUsersByNameArgs = {
  name: Scalars['String'];
};


export type QueryGetUsersByTeamArgs = {
  teamId: Scalars['Float'];
};

export type Team = {
  __typename?: 'Team';
  group: Group;
  id: Scalars['Float'];
  name: Scalars['String'];
  users?: Maybe<Array<User>>;
};

export type TeamInputAddUsers = {
  teamId: Scalars['Int'];
  userIds: Array<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  company?: Maybe<Company>;
  createdCompany?: Maybe<Company>;
  createdEcoActions: Array<EcoAction>;
  createdGroups: Array<Group>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  friends?: Maybe<Array<User>>;
  groups?: Maybe<Array<Group>>;
  id: Scalars['Float'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  relatedEcoActions: Array<UserEcoAction>;
  role: Scalars['String'];
  subscriptionType: Scalars['String'];
  teams?: Maybe<Team>;
};

export type UserEcoAction = {
  __typename?: 'UserEcoAction';
  ecoAction: Array<EcoAction>;
  hasLiked: Scalars['Boolean'];
  id: Scalars['Float'];
  proof?: Maybe<Scalars['String']>;
  user: Array<User>;
  validationId?: Maybe<Scalars['Float']>;
};

export type UserEcoActionInputAddLike = {
  ecoActionId: Scalars['Float'];
  groupId: Scalars['Float'];
  hasLiked: Scalars['Boolean'];
};

export type UserEcoActionInputAddProof = {
  ecoActionId: Scalars['Float'];
  groupId: Scalars['Float'];
  proof: Scalars['String'];
};

export type UserEcoActionInputAddValidation = {
  validationId: Scalars['Float'];
  validationPoints: Scalars['Float'];
};

export type UserInputLogin = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserInputSubscribe = {
  company?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
  subscriptionType?: InputMaybe<Scalars['String']>;
};

export type Validation = {
  __typename?: 'Validation';
  ecoAction: Array<EcoAction>;
  id: Scalars['Float'];
  name: Scalars['String'];
  points: Scalars['Float'];
};

export type ValidationInputCreation = {
  name: Scalars['String'];
  points: Scalars['Float'];
};

export type AddFriendMutationVariables = Exact<{
  friendId: Scalars['Int'];
}>;


export type AddFriendMutation = { __typename?: 'Mutation', addFriend: { __typename?: 'User', id: number } };

export type CreateGroupMutationVariables = Exact<{
  data: GroupInputCreation;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: number, name: string } };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, role: string, subscriptionType: string, groups?: Array<{ __typename?: 'Group', startDate: any, endDate: any, name: string, challengeName: string, id: number }> | null, createdEcoActions: Array<{ __typename?: 'EcoAction', id: number, name: string, description: string }>, company?: { __typename?: 'Company', id: number, name: string, users: Array<{ __typename?: 'User', id: number }> } | null, friends?: Array<{ __typename?: 'User', firstName: string, lastName: string }> | null } };

export type GetFreeEcoActionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFreeEcoActionsQuery = { __typename?: 'Query', getFreeEcoActions: Array<{ __typename?: 'EcoAction', description: string, id: number, name: string }> };

export type GetGroupQueryVariables = Exact<{
  groupId: Scalars['Float'];
}>;


export type GetGroupQuery = { __typename?: 'Query', getGroup: { __typename?: 'Group', challengeName: string, endDate: any, id: number, name: string, startDate: any, author: { __typename?: 'User', id: number, firstName: string, lastName: string }, ecoActions: Array<{ __typename?: 'EcoAction', id: number, name: string, description: string, author?: { __typename?: 'User', id: number, firstName: string, lastName: string } | null }>, users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }> } };

export type GetUserByIdQueryVariables = Exact<{
  getUserById: Scalars['Int'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', getUserById: { __typename?: 'User', id: number, firstName: string, lastName: string, email: string, password: string, role: string, subscriptionType: string } };

export type GetUserEcoActionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserEcoActionsQuery = { __typename?: 'Query', getUserEcoActions: Array<{ __typename?: 'EcoAction', id: number, name: string, description: string, author?: { __typename?: 'User', firstName: string, lastName: string, email: string } | null }> };

export type GetUserGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserGroupsQuery = { __typename?: 'Query', getUserGroups: Array<{ __typename?: 'Group', id: number, challengeName: string, startDate: any, name: string, endDate: any, users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }>, author: { __typename?: 'User', id: number, firstName: string, lastName: string }, ecoActions: Array<{ __typename?: 'EcoAction', id: number, name: string }> }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string, email: string, password: string, role: string, subscriptionType: string }> };

export type GetUsersByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetUsersByNameQuery = { __typename?: 'Query', getUsersByName: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }> };

export type LoginMutationVariables = Exact<{
  loginData: UserInputLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type CreateUserMutationVariables = Exact<{
  data: UserInputSubscribe;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', email: string, firstName: string, lastName: string, password: string } };


export const AddFriendDocument = gql`
    mutation addFriend($friendId: Int!) {
  addFriend(friendId: $friendId) {
    id
  }
}
    `;
export type AddFriendMutationFn = Apollo.MutationFunction<AddFriendMutation, AddFriendMutationVariables>;

/**
 * __useAddFriendMutation__
 *
 * To run a mutation, you first call `useAddFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFriendMutation, { data, loading, error }] = useAddFriendMutation({
 *   variables: {
 *      friendId: // value for 'friendId'
 *   },
 * });
 */
export function useAddFriendMutation(baseOptions?: Apollo.MutationHookOptions<AddFriendMutation, AddFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFriendMutation, AddFriendMutationVariables>(AddFriendDocument, options);
      }
export type AddFriendMutationHookResult = ReturnType<typeof useAddFriendMutation>;
export type AddFriendMutationResult = Apollo.MutationResult<AddFriendMutation>;
export type AddFriendMutationOptions = Apollo.BaseMutationOptions<AddFriendMutation, AddFriendMutationVariables>;
export const CreateGroupDocument = gql`
    mutation CreateGroup($data: GroupInputCreation!) {
  createGroup(data: $data) {
    id
    name
  }
}
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
export const GetCurrentUserDocument = gql`
    query GetCurrentUser {
  getCurrentUser {
    id
    firstName
    lastName
    email
    role
    subscriptionType
    groups {
      startDate
      endDate
      name
      challengeName
      id
    }
    createdEcoActions {
      id
      name
      description
    }
    company {
      id
      name
      users {
        id
      }
    }
    friends {
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetFreeEcoActionsDocument = gql`
    query GetFreeEcoActions {
  getFreeEcoActions {
    description
    id
    name
  }
}
    `;

/**
 * __useGetFreeEcoActionsQuery__
 *
 * To run a query within a React component, call `useGetFreeEcoActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFreeEcoActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFreeEcoActionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFreeEcoActionsQuery(baseOptions?: Apollo.QueryHookOptions<GetFreeEcoActionsQuery, GetFreeEcoActionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFreeEcoActionsQuery, GetFreeEcoActionsQueryVariables>(GetFreeEcoActionsDocument, options);
      }
export function useGetFreeEcoActionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFreeEcoActionsQuery, GetFreeEcoActionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFreeEcoActionsQuery, GetFreeEcoActionsQueryVariables>(GetFreeEcoActionsDocument, options);
        }
export type GetFreeEcoActionsQueryHookResult = ReturnType<typeof useGetFreeEcoActionsQuery>;
export type GetFreeEcoActionsLazyQueryHookResult = ReturnType<typeof useGetFreeEcoActionsLazyQuery>;
export type GetFreeEcoActionsQueryResult = Apollo.QueryResult<GetFreeEcoActionsQuery, GetFreeEcoActionsQueryVariables>;
export const GetGroupDocument = gql`
    query GetGroup($groupId: Float!) {
  getGroup(groupId: $groupId) {
    author {
      id
      firstName
      lastName
    }
    challengeName
    ecoActions {
      id
      name
      description
      author {
        id
        firstName
        lastName
      }
    }
    endDate
    id
    name
    startDate
    users {
      id
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useGetGroupQuery__
 *
 * To run a query within a React component, call `useGetGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGetGroupQuery(baseOptions: Apollo.QueryHookOptions<GetGroupQuery, GetGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupQuery, GetGroupQueryVariables>(GetGroupDocument, options);
      }
export function useGetGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupQuery, GetGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupQuery, GetGroupQueryVariables>(GetGroupDocument, options);
        }
export type GetGroupQueryHookResult = ReturnType<typeof useGetGroupQuery>;
export type GetGroupLazyQueryHookResult = ReturnType<typeof useGetGroupLazyQuery>;
export type GetGroupQueryResult = Apollo.QueryResult<GetGroupQuery, GetGroupQueryVariables>;
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
export const GetUserGroupsDocument = gql`
    query GetUserGroups {
  getUserGroups {
    id
    users {
      id
      firstName
      lastName
    }
    challengeName
    startDate
    name
    endDate
    author {
      id
      firstName
      lastName
    }
    ecoActions {
      id
      name
    }
  }
}
    `;

/**
 * __useGetUserGroupsQuery__
 *
 * To run a query within a React component, call `useGetUserGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserGroupsQuery, GetUserGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserGroupsQuery, GetUserGroupsQueryVariables>(GetUserGroupsDocument, options);
      }
export function useGetUserGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserGroupsQuery, GetUserGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserGroupsQuery, GetUserGroupsQueryVariables>(GetUserGroupsDocument, options);
        }
export type GetUserGroupsQueryHookResult = ReturnType<typeof useGetUserGroupsQuery>;
export type GetUserGroupsLazyQueryHookResult = ReturnType<typeof useGetUserGroupsLazyQuery>;
export type GetUserGroupsQueryResult = Apollo.QueryResult<GetUserGroupsQuery, GetUserGroupsQueryVariables>;
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
export const GetUsersByNameDocument = gql`
    query GetUsersByName($name: String!) {
  getUsersByName(name: $name) {
    id
    firstName
    lastName
  }
}
    `;

/**
 * __useGetUsersByNameQuery__
 *
 * To run a query within a React component, call `useGetUsersByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetUsersByNameQuery(baseOptions: Apollo.QueryHookOptions<GetUsersByNameQuery, GetUsersByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersByNameQuery, GetUsersByNameQueryVariables>(GetUsersByNameDocument, options);
      }
export function useGetUsersByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersByNameQuery, GetUsersByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersByNameQuery, GetUsersByNameQueryVariables>(GetUsersByNameDocument, options);
        }
export type GetUsersByNameQueryHookResult = ReturnType<typeof useGetUsersByNameQuery>;
export type GetUsersByNameLazyQueryHookResult = ReturnType<typeof useGetUsersByNameLazyQuery>;
export type GetUsersByNameQueryResult = Apollo.QueryResult<GetUsersByNameQuery, GetUsersByNameQueryVariables>;
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
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
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