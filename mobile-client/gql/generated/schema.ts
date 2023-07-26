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
  name: Scalars['String'];
};

export type EcoActionInputCreation = {
  description: Scalars['String'];
  name: Scalars['String'];
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
  addUserToGroup: Group;
  addUsersToCompany: Company;
  addUsersToTeam: Team;
  createComment: Comment;
  createEcoAction: EcoAction;
  createGroup: Group;
  createTeam: Team;
  createUser: User;
  login: Scalars['String'];
  logout: Scalars['String'];
};


export type MutationAddEcoActionsToGroupArgs = {
  data: GroupInputAddEcoActions;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['Int'];
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
  getUserEcoActions: Array<EcoAction>;
  getUserGroups: Array<Group>;
  getUsers: Array<User>;
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
  role: Scalars['String'];
  subscriptionType: Scalars['String'];
  teams?: Maybe<Team>;
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

export type GetUserGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserGroupsQuery = { __typename?: 'Query', getUserGroups: Array<{ __typename?: 'Group', id: number, challengeName: string, startDate: any, name: string, endDate: any, users: Array<{ __typename?: 'User', id: number, firstName: string, lastName: string }>, author: { __typename?: 'User', id: number, firstName: string, lastName: string }, ecoActions: Array<{ __typename?: 'EcoAction', id: number, name: string }> }> };

export type LoginMutationVariables = Exact<{
  loginData: UserInputLogin;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };


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
    mutation logout {
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