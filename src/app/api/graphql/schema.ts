import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateTransactionInput = {
  amount: Scalars['Float']['input'];
  concept: Scalars['String']['input'];
  date: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type CreateTransactionResponse = {
  __typename?: 'CreateTransactionResponse';
  msg: Scalars['String']['output'];
};

export type CreateUserRequest = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  role?: InputMaybe<Roles>;
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  msg: Scalars['String']['output'];
};

export type EditTransactionInput = {
  amount: Scalars['Float']['input'];
  concept: Scalars['String']['input'];
  date: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type EditTransactionResponse = {
  __typename?: 'EditTransactionResponse';
  msg: Scalars['String']['output'];
};

export type EditUserRequest = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  role?: InputMaybe<Roles>;
};

export type EditUserResponse = {
  __typename?: 'EditUserResponse';
  msg: Scalars['String']['output'];
};

export type ListTransactionsResponse = {
  __typename?: 'ListTransactionsResponse';
  msg: Scalars['String']['output'];
  total: Scalars['Float']['output'];
  transactions: Array<Maybe<Transaction>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTransaction: CreateTransactionResponse;
  createUser: CreateUserResponse;
  editTransaction: EditTransactionResponse;
  editUser: EditUserResponse;
};


export type MutationCreateTransactionArgs = {
  input: CreateTransactionInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserRequest;
};


export type MutationEditTransactionArgs = {
  input: EditTransactionInput;
};


export type MutationEditUserArgs = {
  input: EditUserRequest;
};

export type Query = {
  __typename?: 'Query';
  listTransactions: ListTransactionsResponse;
  users: Array<Maybe<User>>;
};

export enum Roles {
  Admin = 'ADMIN',
  Guest = 'GUEST',
  User = 'USER'
}

export type Transaction = {
  __typename?: 'Transaction';
  amount: Scalars['Float']['output'];
  concept: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  roles: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateTransactionInput: CreateTransactionInput;
  CreateTransactionResponse: ResolverTypeWrapper<CreateTransactionResponse>;
  CreateUserRequest: CreateUserRequest;
  CreateUserResponse: ResolverTypeWrapper<CreateUserResponse>;
  EditTransactionInput: EditTransactionInput;
  EditTransactionResponse: ResolverTypeWrapper<EditTransactionResponse>;
  EditUserRequest: EditUserRequest;
  EditUserResponse: ResolverTypeWrapper<EditUserResponse>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  ListTransactionsResponse: ResolverTypeWrapper<ListTransactionsResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Roles: Roles;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Transaction: ResolverTypeWrapper<Transaction>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateTransactionInput: CreateTransactionInput;
  CreateTransactionResponse: CreateTransactionResponse;
  CreateUserRequest: CreateUserRequest;
  CreateUserResponse: CreateUserResponse;
  EditTransactionInput: EditTransactionInput;
  EditTransactionResponse: EditTransactionResponse;
  EditUserRequest: EditUserRequest;
  EditUserResponse: EditUserResponse;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  ListTransactionsResponse: ListTransactionsResponse;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Transaction: Transaction;
  User: User;
};

export type CreateTransactionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateTransactionResponse'] = ResolversParentTypes['CreateTransactionResponse']> = {
  msg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserResponse'] = ResolversParentTypes['CreateUserResponse']> = {
  msg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditTransactionResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditTransactionResponse'] = ResolversParentTypes['EditTransactionResponse']> = {
  msg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EditUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['EditUserResponse'] = ResolversParentTypes['EditUserResponse']> = {
  msg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ListTransactionsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ListTransactionsResponse'] = ResolversParentTypes['ListTransactionsResponse']> = {
  msg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  transactions?: Resolver<Array<Maybe<ResolversTypes['Transaction']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createTransaction?: Resolver<ResolversTypes['CreateTransactionResponse'], ParentType, ContextType, RequireFields<MutationCreateTransactionArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['CreateUserResponse'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  editTransaction?: Resolver<ResolversTypes['EditTransactionResponse'], ParentType, ContextType, RequireFields<MutationEditTransactionArgs, 'input'>>;
  editUser?: Resolver<ResolversTypes['EditUserResponse'], ParentType, ContextType, RequireFields<MutationEditUserArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  listTransactions?: Resolver<ResolversTypes['ListTransactionsResponse'], ParentType, ContextType>;
  users?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
};

export type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  concept?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CreateTransactionResponse?: CreateTransactionResponseResolvers<ContextType>;
  CreateUserResponse?: CreateUserResponseResolvers<ContextType>;
  EditTransactionResponse?: EditTransactionResponseResolvers<ContextType>;
  EditUserResponse?: EditUserResponseResolvers<ContextType>;
  ListTransactionsResponse?: ListTransactionsResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Transaction?: TransactionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

