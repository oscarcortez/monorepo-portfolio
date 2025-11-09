export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
};

export type BoolFilter = {
  equals: InputMaybe<Scalars['Boolean']['input']>;
  not: InputMaybe<NestedBoolFilter>;
};

export type Contact = {
  __typename?: 'Contact';
  className: Maybe<Scalars['String']['output']>;
  contactId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  displayText: Maybe<Scalars['String']['output']>;
  iconPath: Maybe<Scalars['String']['output']>;
  link: Scalars['String']['output'];
  sortOrder: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  type: ContactType;
  user: User;
  userId: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type ContactCreateManyUserInput = {
  className: InputMaybe<Scalars['String']['input']>;
  contactId: InputMaybe<Scalars['Int']['input']>;
  createdAt: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt: InputMaybe<Scalars['DateTime']['input']>;
  displayText: InputMaybe<Scalars['String']['input']>;
  iconPath: InputMaybe<Scalars['String']['input']>;
  link: Scalars['String']['input'];
  sortOrder: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  type: ContactType;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type ContactCreateManyUserInputEnvelope = {
  data: Array<ContactCreateManyUserInput>;
  skipDuplicates: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContactCreateNestedManyWithoutUserInput = {
  connect: InputMaybe<Array<ContactWhereUniqueInput>>;
  connectOrCreate: InputMaybe<Array<ContactCreateOrConnectWithoutUserInput>>;
  create: InputMaybe<Array<ContactCreateWithoutUserInput>>;
  createMany: InputMaybe<ContactCreateManyUserInputEnvelope>;
};

export type ContactCreateOrConnectWithoutUserInput = {
  create: ContactCreateWithoutUserInput;
  where: ContactWhereUniqueInput;
};

export type ContactCreateWithoutUserInput = {
  className: InputMaybe<Scalars['String']['input']>;
  createdAt: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt: InputMaybe<Scalars['DateTime']['input']>;
  displayText: InputMaybe<Scalars['String']['input']>;
  iconPath: InputMaybe<Scalars['String']['input']>;
  link: Scalars['String']['input'];
  sortOrder: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  type: ContactType;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type ContactListRelationFilter = {
  every: InputMaybe<ContactWhereInput>;
  none: InputMaybe<ContactWhereInput>;
  some: InputMaybe<ContactWhereInput>;
};

export enum ContactType {
  Discord = 'DISCORD',
  Email = 'EMAIL',
  Facebook = 'FACEBOOK',
  Github = 'GITHUB',
  Instagram = 'INSTAGRAM',
  Linkedin = 'LINKEDIN',
  Phone = 'PHONE',
  Resume = 'RESUME',
  Tiktok = 'TIKTOK',
  Twitter = 'TWITTER',
  Website = 'WEBSITE',
  Youtube = 'YOUTUBE'
}

export type ContactWhereInput = {
  AND: InputMaybe<Array<ContactWhereInput>>;
  NOT: InputMaybe<Array<ContactWhereInput>>;
  OR: InputMaybe<Array<ContactWhereInput>>;
  className: InputMaybe<StringNullableFilter>;
  contactId: InputMaybe<IntFilter>;
  createdAt: InputMaybe<DateTimeFilter>;
  deletedAt: InputMaybe<DateTimeNullableFilter>;
  displayText: InputMaybe<StringNullableFilter>;
  iconPath: InputMaybe<StringNullableFilter>;
  link: InputMaybe<StringFilter>;
  sortOrder: InputMaybe<IntFilter>;
  title: InputMaybe<StringFilter>;
  type: InputMaybe<EnumContactTypeFilter>;
  user: InputMaybe<UserScalarRelationFilter>;
  userId: InputMaybe<IntFilter>;
  uuid: InputMaybe<UuidFilter>;
};

export type ContactWhereUniqueInput = {
  AND: InputMaybe<Array<ContactWhereInput>>;
  NOT: InputMaybe<Array<ContactWhereInput>>;
  OR: InputMaybe<Array<ContactWhereInput>>;
  className: InputMaybe<StringNullableFilter>;
  contactId: InputMaybe<Scalars['Int']['input']>;
  createdAt: InputMaybe<DateTimeFilter>;
  deletedAt: InputMaybe<DateTimeNullableFilter>;
  displayText: InputMaybe<StringNullableFilter>;
  iconPath: InputMaybe<StringNullableFilter>;
  link: InputMaybe<StringFilter>;
  sortOrder: InputMaybe<IntFilter>;
  title: InputMaybe<StringFilter>;
  type: InputMaybe<EnumContactTypeFilter>;
  user: InputMaybe<UserScalarRelationFilter>;
  userId: InputMaybe<IntFilter>;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type DateTimeFilter = {
  equals: InputMaybe<Scalars['DateTime']['input']>;
  gt: InputMaybe<Scalars['DateTime']['input']>;
  gte: InputMaybe<Scalars['DateTime']['input']>;
  in: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt: InputMaybe<Scalars['DateTime']['input']>;
  lte: InputMaybe<Scalars['DateTime']['input']>;
  not: InputMaybe<NestedDateTimeFilter>;
  notIn: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DateTimeNullableFilter = {
  equals: InputMaybe<Scalars['DateTime']['input']>;
  gt: InputMaybe<Scalars['DateTime']['input']>;
  gte: InputMaybe<Scalars['DateTime']['input']>;
  in: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt: InputMaybe<Scalars['DateTime']['input']>;
  lte: InputMaybe<Scalars['DateTime']['input']>;
  not: InputMaybe<NestedDateTimeNullableFilter>;
  notIn: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export enum DeviceType {
  Desktop = 'DESKTOP',
  Mobile = 'MOBILE',
  Other = 'OTHER',
  Tablet = 'TABLET',
  Tv = 'TV'
}

export type EnumContactTypeFilter = {
  equals: InputMaybe<ContactType>;
  in: InputMaybe<Array<ContactType>>;
  not: InputMaybe<NestedEnumContactTypeFilter>;
  notIn: InputMaybe<Array<ContactType>>;
};

export type EnumDeviceTypeFilter = {
  equals: InputMaybe<DeviceType>;
  in: InputMaybe<Array<DeviceType>>;
  not: InputMaybe<NestedEnumDeviceTypeFilter>;
  notIn: InputMaybe<Array<DeviceType>>;
};

export type EnumLanguageCodeFilter = {
  equals: InputMaybe<LanguageCode>;
  in: InputMaybe<Array<LanguageCode>>;
  not: InputMaybe<NestedEnumLanguageCodeFilter>;
  notIn: InputMaybe<Array<LanguageCode>>;
};

export type EnumPaymentSourceTypeFilter = {
  equals: InputMaybe<PaymentSourceType>;
  in: InputMaybe<Array<PaymentSourceType>>;
  not: InputMaybe<NestedEnumPaymentSourceTypeFilter>;
  notIn: InputMaybe<Array<PaymentSourceType>>;
};

export type HeroGreeting = {
  __typename?: 'HeroGreeting';
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  device: DeviceType;
  footer: Scalars['String']['output'];
  heroGreetingId: Scalars['ID']['output'];
  language: LanguageCode;
  title: Scalars['String']['output'];
  user: User;
  userId: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type HeroGreetingCreateManyUserInput = {
  content: Scalars['String']['input'];
  createdAt: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt: InputMaybe<Scalars['DateTime']['input']>;
  device: DeviceType;
  footer: Scalars['String']['input'];
  heroGreetingId: InputMaybe<Scalars['Int']['input']>;
  language: LanguageCode;
  title: Scalars['String']['input'];
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type HeroGreetingCreateManyUserInputEnvelope = {
  data: Array<HeroGreetingCreateManyUserInput>;
  skipDuplicates: InputMaybe<Scalars['Boolean']['input']>;
};

export type HeroGreetingCreateNestedManyWithoutUserInput = {
  connect: InputMaybe<Array<HeroGreetingWhereUniqueInput>>;
  connectOrCreate: InputMaybe<Array<HeroGreetingCreateOrConnectWithoutUserInput>>;
  create: InputMaybe<Array<HeroGreetingCreateWithoutUserInput>>;
  createMany: InputMaybe<HeroGreetingCreateManyUserInputEnvelope>;
};

export type HeroGreetingCreateOrConnectWithoutUserInput = {
  create: HeroGreetingCreateWithoutUserInput;
  where: HeroGreetingWhereUniqueInput;
};

export type HeroGreetingCreateWithoutUserInput = {
  content: Scalars['String']['input'];
  createdAt: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt: InputMaybe<Scalars['DateTime']['input']>;
  device: DeviceType;
  footer: Scalars['String']['input'];
  language: LanguageCode;
  title: Scalars['String']['input'];
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type HeroGreetingListRelationFilter = {
  every: InputMaybe<HeroGreetingWhereInput>;
  none: InputMaybe<HeroGreetingWhereInput>;
  some: InputMaybe<HeroGreetingWhereInput>;
};

export type HeroGreetingWhereInput = {
  AND: InputMaybe<Array<HeroGreetingWhereInput>>;
  NOT: InputMaybe<Array<HeroGreetingWhereInput>>;
  OR: InputMaybe<Array<HeroGreetingWhereInput>>;
  content: InputMaybe<StringFilter>;
  createdAt: InputMaybe<DateTimeFilter>;
  deletedAt: InputMaybe<DateTimeNullableFilter>;
  device: InputMaybe<EnumDeviceTypeFilter>;
  footer: InputMaybe<StringFilter>;
  heroGreetingId: InputMaybe<IntFilter>;
  language: InputMaybe<EnumLanguageCodeFilter>;
  title: InputMaybe<StringFilter>;
  user: InputMaybe<UserScalarRelationFilter>;
  userId: InputMaybe<IntFilter>;
  uuid: InputMaybe<UuidFilter>;
};

export type HeroGreetingWhereUniqueInput = {
  AND: InputMaybe<Array<HeroGreetingWhereInput>>;
  NOT: InputMaybe<Array<HeroGreetingWhereInput>>;
  OR: InputMaybe<Array<HeroGreetingWhereInput>>;
  content: InputMaybe<StringFilter>;
  createdAt: InputMaybe<DateTimeFilter>;
  deletedAt: InputMaybe<DateTimeNullableFilter>;
  device: InputMaybe<EnumDeviceTypeFilter>;
  footer: InputMaybe<StringFilter>;
  heroGreetingId: InputMaybe<Scalars['Int']['input']>;
  language: InputMaybe<EnumLanguageCodeFilter>;
  title: InputMaybe<StringFilter>;
  user: InputMaybe<UserScalarRelationFilter>;
  userId: InputMaybe<IntFilter>;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type IntFilter = {
  equals: InputMaybe<Scalars['Int']['input']>;
  gt: InputMaybe<Scalars['Int']['input']>;
  gte: InputMaybe<Scalars['Int']['input']>;
  in: InputMaybe<Array<Scalars['Int']['input']>>;
  lt: InputMaybe<Scalars['Int']['input']>;
  lte: InputMaybe<Scalars['Int']['input']>;
  not: InputMaybe<NestedIntFilter>;
  notIn: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type JsonNullableFilter = {
  array_contains: InputMaybe<Scalars['JSON']['input']>;
  array_ends_with: InputMaybe<Scalars['JSON']['input']>;
  array_starts_with: InputMaybe<Scalars['JSON']['input']>;
  equals: InputMaybe<Scalars['JSON']['input']>;
  gt: InputMaybe<Scalars['JSON']['input']>;
  gte: InputMaybe<Scalars['JSON']['input']>;
  lt: InputMaybe<Scalars['JSON']['input']>;
  lte: InputMaybe<Scalars['JSON']['input']>;
  mode: InputMaybe<QueryMode>;
  not: InputMaybe<Scalars['JSON']['input']>;
  path: InputMaybe<Array<Scalars['String']['input']>>;
  string_contains: InputMaybe<Scalars['String']['input']>;
  string_ends_with: InputMaybe<Scalars['String']['input']>;
  string_starts_with: InputMaybe<Scalars['String']['input']>;
};

export enum LanguageCode {
  En = 'EN',
  Es = 'ES',
  Fr = 'FR',
  Pt = 'PT'
}

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  signIn: AuthResponse;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type NavLink = {
  __typename?: 'NavLink';
  className: Maybe<Scalars['String']['output']>;
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  language: LanguageCode;
  navLinkId: Scalars['ID']['output'];
  sortOrder: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
  user: User;
  userId: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type NavLinkCreateManyUserInput = {
  className: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  createdAt: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt: InputMaybe<Scalars['DateTime']['input']>;
  language: LanguageCode;
  navLinkId: InputMaybe<Scalars['Int']['input']>;
  sortOrder: InputMaybe<Scalars['Int']['input']>;
  updatedAt: InputMaybe<Scalars['DateTime']['input']>;
  url: InputMaybe<Scalars['String']['input']>;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type NavLinkCreateManyUserInputEnvelope = {
  data: Array<NavLinkCreateManyUserInput>;
  skipDuplicates: InputMaybe<Scalars['Boolean']['input']>;
};

export type NavLinkCreateNestedManyWithoutUserInput = {
  connect: InputMaybe<Array<NavLinkWhereUniqueInput>>;
  connectOrCreate: InputMaybe<Array<NavLinkCreateOrConnectWithoutUserInput>>;
  create: InputMaybe<Array<NavLinkCreateWithoutUserInput>>;
  createMany: InputMaybe<NavLinkCreateManyUserInputEnvelope>;
};

export type NavLinkCreateOrConnectWithoutUserInput = {
  create: NavLinkCreateWithoutUserInput;
  where: NavLinkWhereUniqueInput;
};

export type NavLinkCreateWithoutUserInput = {
  className: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  createdAt: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt: InputMaybe<Scalars['DateTime']['input']>;
  language: LanguageCode;
  sortOrder: InputMaybe<Scalars['Int']['input']>;
  updatedAt: InputMaybe<Scalars['DateTime']['input']>;
  url: InputMaybe<Scalars['String']['input']>;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type NavLinkListRelationFilter = {
  every: InputMaybe<NavLinkWhereInput>;
  none: InputMaybe<NavLinkWhereInput>;
  some: InputMaybe<NavLinkWhereInput>;
};

export type NavLinkWhereInput = {
  AND: InputMaybe<Array<NavLinkWhereInput>>;
  NOT: InputMaybe<Array<NavLinkWhereInput>>;
  OR: InputMaybe<Array<NavLinkWhereInput>>;
  className: InputMaybe<StringNullableFilter>;
  content: InputMaybe<StringFilter>;
  createdAt: InputMaybe<DateTimeFilter>;
  deletedAt: InputMaybe<DateTimeNullableFilter>;
  language: InputMaybe<EnumLanguageCodeFilter>;
  navLinkId: InputMaybe<IntFilter>;
  sortOrder: InputMaybe<IntFilter>;
  updatedAt: InputMaybe<DateTimeFilter>;
  url: InputMaybe<StringFilter>;
  user: InputMaybe<UserScalarRelationFilter>;
  userId: InputMaybe<IntFilter>;
  uuid: InputMaybe<UuidFilter>;
};

export type NavLinkWhereUniqueInput = {
  AND: InputMaybe<Array<NavLinkWhereInput>>;
  NOT: InputMaybe<Array<NavLinkWhereInput>>;
  OR: InputMaybe<Array<NavLinkWhereInput>>;
  className: InputMaybe<StringNullableFilter>;
  content: InputMaybe<StringFilter>;
  createdAt: InputMaybe<DateTimeFilter>;
  deletedAt: InputMaybe<DateTimeNullableFilter>;
  language: InputMaybe<EnumLanguageCodeFilter>;
  navLinkId: InputMaybe<Scalars['Int']['input']>;
  sortOrder: InputMaybe<IntFilter>;
  updatedAt: InputMaybe<DateTimeFilter>;
  url: InputMaybe<StringFilter>;
  user: InputMaybe<UserScalarRelationFilter>;
  userId: InputMaybe<IntFilter>;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type NestedBoolFilter = {
  equals: InputMaybe<Scalars['Boolean']['input']>;
  not: InputMaybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals: InputMaybe<Scalars['DateTime']['input']>;
  gt: InputMaybe<Scalars['DateTime']['input']>;
  gte: InputMaybe<Scalars['DateTime']['input']>;
  in: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt: InputMaybe<Scalars['DateTime']['input']>;
  lte: InputMaybe<Scalars['DateTime']['input']>;
  not: InputMaybe<NestedDateTimeFilter>;
  notIn: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedDateTimeNullableFilter = {
  equals: InputMaybe<Scalars['DateTime']['input']>;
  gt: InputMaybe<Scalars['DateTime']['input']>;
  gte: InputMaybe<Scalars['DateTime']['input']>;
  in: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt: InputMaybe<Scalars['DateTime']['input']>;
  lte: InputMaybe<Scalars['DateTime']['input']>;
  not: InputMaybe<NestedDateTimeNullableFilter>;
  notIn: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type NestedEnumContactTypeFilter = {
  equals: InputMaybe<ContactType>;
  in: InputMaybe<Array<ContactType>>;
  not: InputMaybe<NestedEnumContactTypeFilter>;
  notIn: InputMaybe<Array<ContactType>>;
};

export type NestedEnumDeviceTypeFilter = {
  equals: InputMaybe<DeviceType>;
  in: InputMaybe<Array<DeviceType>>;
  not: InputMaybe<NestedEnumDeviceTypeFilter>;
  notIn: InputMaybe<Array<DeviceType>>;
};

export type NestedEnumLanguageCodeFilter = {
  equals: InputMaybe<LanguageCode>;
  in: InputMaybe<Array<LanguageCode>>;
  not: InputMaybe<NestedEnumLanguageCodeFilter>;
  notIn: InputMaybe<Array<LanguageCode>>;
};

export type NestedEnumPaymentSourceTypeFilter = {
  equals: InputMaybe<PaymentSourceType>;
  in: InputMaybe<Array<PaymentSourceType>>;
  not: InputMaybe<NestedEnumPaymentSourceTypeFilter>;
  notIn: InputMaybe<Array<PaymentSourceType>>;
};

export type NestedIntFilter = {
  equals: InputMaybe<Scalars['Int']['input']>;
  gt: InputMaybe<Scalars['Int']['input']>;
  gte: InputMaybe<Scalars['Int']['input']>;
  in: InputMaybe<Array<Scalars['Int']['input']>>;
  lt: InputMaybe<Scalars['Int']['input']>;
  lte: InputMaybe<Scalars['Int']['input']>;
  not: InputMaybe<NestedIntFilter>;
  notIn: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type NestedStringFilter = {
  contains: InputMaybe<Scalars['String']['input']>;
  endsWith: InputMaybe<Scalars['String']['input']>;
  equals: InputMaybe<Scalars['String']['input']>;
  gt: InputMaybe<Scalars['String']['input']>;
  gte: InputMaybe<Scalars['String']['input']>;
  in: InputMaybe<Array<Scalars['String']['input']>>;
  lt: InputMaybe<Scalars['String']['input']>;
  lte: InputMaybe<Scalars['String']['input']>;
  not: InputMaybe<NestedStringFilter>;
  notIn: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith: InputMaybe<Scalars['String']['input']>;
};

export type NestedStringNullableFilter = {
  contains: InputMaybe<Scalars['String']['input']>;
  endsWith: InputMaybe<Scalars['String']['input']>;
  equals: InputMaybe<Scalars['String']['input']>;
  gt: InputMaybe<Scalars['String']['input']>;
  gte: InputMaybe<Scalars['String']['input']>;
  in: InputMaybe<Array<Scalars['String']['input']>>;
  lt: InputMaybe<Scalars['String']['input']>;
  lte: InputMaybe<Scalars['String']['input']>;
  not: InputMaybe<NestedStringNullableFilter>;
  notIn: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith: InputMaybe<Scalars['String']['input']>;
};

export type NestedUuidFilter = {
  equals: InputMaybe<Scalars['String']['input']>;
  gt: InputMaybe<Scalars['String']['input']>;
  gte: InputMaybe<Scalars['String']['input']>;
  in: InputMaybe<Array<Scalars['String']['input']>>;
  lt: InputMaybe<Scalars['String']['input']>;
  lte: InputMaybe<Scalars['String']['input']>;
  not: InputMaybe<NestedUuidFilter>;
  notIn: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Payment = {
  __typename?: 'Payment';
  className: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  displayText: Maybe<Scalars['String']['output']>;
  isFavorite: Scalars['Boolean']['output'];
  link: Maybe<Scalars['String']['output']>;
  paymentId: Scalars['ID']['output'];
  paymentSource: Maybe<PaymentSource>;
  paymentSourceId: Scalars['Int']['output'];
  sortOrder: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  user: User;
  userId: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type PaymentCreateManyUserInput = {
  className: InputMaybe<Scalars['String']['input']>;
  createdAt: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt: InputMaybe<Scalars['DateTime']['input']>;
  displayText: InputMaybe<Scalars['String']['input']>;
  isFavorite: InputMaybe<Scalars['Boolean']['input']>;
  link: InputMaybe<Scalars['String']['input']>;
  paymentId: InputMaybe<Scalars['Int']['input']>;
  paymentSourceId: Scalars['Int']['input'];
  sortOrder: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type PaymentCreateManyUserInputEnvelope = {
  data: Array<PaymentCreateManyUserInput>;
  skipDuplicates: InputMaybe<Scalars['Boolean']['input']>;
};

export type PaymentCreateNestedManyWithoutUserInput = {
  connect: InputMaybe<Array<PaymentWhereUniqueInput>>;
  connectOrCreate: InputMaybe<Array<PaymentCreateOrConnectWithoutUserInput>>;
  create: InputMaybe<Array<PaymentCreateWithoutUserInput>>;
  createMany: InputMaybe<PaymentCreateManyUserInputEnvelope>;
};

export type PaymentCreateOrConnectWithoutUserInput = {
  create: PaymentCreateWithoutUserInput;
  where: PaymentWhereUniqueInput;
};

export type PaymentCreateWithoutUserInput = {
  className: InputMaybe<Scalars['String']['input']>;
  createdAt: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt: InputMaybe<Scalars['DateTime']['input']>;
  displayText: InputMaybe<Scalars['String']['input']>;
  isFavorite: InputMaybe<Scalars['Boolean']['input']>;
  link: InputMaybe<Scalars['String']['input']>;
  paymentSource: InputMaybe<PaymentSourceCreateNestedOneWithoutPaymentInput>;
  sortOrder: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type PaymentListRelationFilter = {
  every: InputMaybe<PaymentWhereInput>;
  none: InputMaybe<PaymentWhereInput>;
  some: InputMaybe<PaymentWhereInput>;
};

export type PaymentSource = {
  __typename?: 'PaymentSource';
  Payment: Maybe<Array<Payment>>;
  _count: PaymentSourceCount;
  code: Maybe<Scalars['String']['output']>;
  countryCode: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  logoPath: Maybe<Scalars['String']['output']>;
  metadata: Maybe<Scalars['JSON']['output']>;
  name: Scalars['String']['output'];
  paymentSourceId: Scalars['ID']['output'];
  type: PaymentSourceType;
  updatedAt: Maybe<Scalars['DateTime']['output']>;
  uuid: Scalars['String']['output'];
  website: Maybe<Scalars['String']['output']>;
};

export type PaymentSourceCount = {
  __typename?: 'PaymentSourceCount';
  Payment: Scalars['Int']['output'];
};

export type PaymentSourceCreateNestedOneWithoutPaymentInput = {
  connect: InputMaybe<PaymentSourceWhereUniqueInput>;
  connectOrCreate: InputMaybe<PaymentSourceCreateOrConnectWithoutPaymentInput>;
  create: InputMaybe<PaymentSourceCreateWithoutPaymentInput>;
};

export type PaymentSourceCreateOrConnectWithoutPaymentInput = {
  create: PaymentSourceCreateWithoutPaymentInput;
  where: PaymentSourceWhereUniqueInput;
};

export type PaymentSourceCreateWithoutPaymentInput = {
  code: InputMaybe<Scalars['String']['input']>;
  countryCode: InputMaybe<Scalars['String']['input']>;
  createdAt: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt: InputMaybe<Scalars['DateTime']['input']>;
  logoPath: InputMaybe<Scalars['String']['input']>;
  metadata: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
  type: InputMaybe<PaymentSourceType>;
  updatedAt: InputMaybe<Scalars['DateTime']['input']>;
  uuid: InputMaybe<Scalars['String']['input']>;
  website: InputMaybe<Scalars['String']['input']>;
};

export type PaymentSourceNullableScalarRelationFilter = {
  is: InputMaybe<PaymentSourceWhereInput>;
  isNot: InputMaybe<PaymentSourceWhereInput>;
};

export enum PaymentSourceType {
  Bank = 'BANK',
  Crypto = 'CRYPTO',
  Other = 'OTHER',
  Psp = 'PSP',
  Wallet = 'WALLET'
}

export type PaymentSourceWhereInput = {
  AND: InputMaybe<Array<PaymentSourceWhereInput>>;
  NOT: InputMaybe<Array<PaymentSourceWhereInput>>;
  OR: InputMaybe<Array<PaymentSourceWhereInput>>;
  Payment: InputMaybe<PaymentListRelationFilter>;
  code: InputMaybe<StringNullableFilter>;
  countryCode: InputMaybe<StringNullableFilter>;
  createdAt: InputMaybe<DateTimeFilter>;
  deletedAt: InputMaybe<DateTimeNullableFilter>;
  logoPath: InputMaybe<StringNullableFilter>;
  metadata: InputMaybe<JsonNullableFilter>;
  name: InputMaybe<StringFilter>;
  paymentSourceId: InputMaybe<IntFilter>;
  type: InputMaybe<EnumPaymentSourceTypeFilter>;
  updatedAt: InputMaybe<DateTimeNullableFilter>;
  uuid: InputMaybe<UuidFilter>;
  website: InputMaybe<StringNullableFilter>;
};

export type PaymentSourceWhereUniqueInput = {
  AND: InputMaybe<Array<PaymentSourceWhereInput>>;
  NOT: InputMaybe<Array<PaymentSourceWhereInput>>;
  OR: InputMaybe<Array<PaymentSourceWhereInput>>;
  Payment: InputMaybe<PaymentListRelationFilter>;
  code: InputMaybe<StringNullableFilter>;
  countryCode: InputMaybe<StringNullableFilter>;
  createdAt: InputMaybe<DateTimeFilter>;
  deletedAt: InputMaybe<DateTimeNullableFilter>;
  logoPath: InputMaybe<StringNullableFilter>;
  metadata: InputMaybe<JsonNullableFilter>;
  name: InputMaybe<StringFilter>;
  paymentSourceId: InputMaybe<Scalars['Int']['input']>;
  type: InputMaybe<EnumPaymentSourceTypeFilter>;
  updatedAt: InputMaybe<DateTimeNullableFilter>;
  uuid: InputMaybe<Scalars['String']['input']>;
  website: InputMaybe<StringNullableFilter>;
};

export type PaymentWhereInput = {
  AND: InputMaybe<Array<PaymentWhereInput>>;
  NOT: InputMaybe<Array<PaymentWhereInput>>;
  OR: InputMaybe<Array<PaymentWhereInput>>;
  className: InputMaybe<StringNullableFilter>;
  createdAt: InputMaybe<DateTimeFilter>;
  deletedAt: InputMaybe<DateTimeNullableFilter>;
  displayText: InputMaybe<StringNullableFilter>;
  isFavorite: InputMaybe<BoolFilter>;
  link: InputMaybe<StringNullableFilter>;
  paymentId: InputMaybe<IntFilter>;
  paymentSource: InputMaybe<PaymentSourceNullableScalarRelationFilter>;
  paymentSourceId: InputMaybe<IntFilter>;
  sortOrder: InputMaybe<IntFilter>;
  title: InputMaybe<StringFilter>;
  user: InputMaybe<UserScalarRelationFilter>;
  userId: InputMaybe<IntFilter>;
  uuid: InputMaybe<UuidFilter>;
};

export type PaymentWhereUniqueInput = {
  AND: InputMaybe<Array<PaymentWhereInput>>;
  NOT: InputMaybe<Array<PaymentWhereInput>>;
  OR: InputMaybe<Array<PaymentWhereInput>>;
  className: InputMaybe<StringNullableFilter>;
  createdAt: InputMaybe<DateTimeFilter>;
  deletedAt: InputMaybe<DateTimeNullableFilter>;
  displayText: InputMaybe<StringNullableFilter>;
  isFavorite: InputMaybe<BoolFilter>;
  link: InputMaybe<StringNullableFilter>;
  paymentId: InputMaybe<Scalars['Int']['input']>;
  paymentSource: InputMaybe<PaymentSourceNullableScalarRelationFilter>;
  paymentSourceId: InputMaybe<IntFilter>;
  sortOrder: InputMaybe<IntFilter>;
  title: InputMaybe<StringFilter>;
  user: InputMaybe<UserScalarRelationFilter>;
  userId: InputMaybe<IntFilter>;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getUser: Maybe<Scalars['JSONObject']['output']>;
  hello: Scalars['String']['output'];
  userHero: User;
};


export type QueryUserHeroArgs = {
  userUuid: Scalars['String']['input'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type StringFilter = {
  contains: InputMaybe<Scalars['String']['input']>;
  endsWith: InputMaybe<Scalars['String']['input']>;
  equals: InputMaybe<Scalars['String']['input']>;
  gt: InputMaybe<Scalars['String']['input']>;
  gte: InputMaybe<Scalars['String']['input']>;
  in: InputMaybe<Array<Scalars['String']['input']>>;
  lt: InputMaybe<Scalars['String']['input']>;
  lte: InputMaybe<Scalars['String']['input']>;
  mode: InputMaybe<QueryMode>;
  not: InputMaybe<NestedStringFilter>;
  notIn: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith: InputMaybe<Scalars['String']['input']>;
};

export type StringNullableFilter = {
  contains: InputMaybe<Scalars['String']['input']>;
  endsWith: InputMaybe<Scalars['String']['input']>;
  equals: InputMaybe<Scalars['String']['input']>;
  gt: InputMaybe<Scalars['String']['input']>;
  gte: InputMaybe<Scalars['String']['input']>;
  in: InputMaybe<Array<Scalars['String']['input']>>;
  lt: InputMaybe<Scalars['String']['input']>;
  lte: InputMaybe<Scalars['String']['input']>;
  mode: InputMaybe<QueryMode>;
  not: InputMaybe<NestedStringNullableFilter>;
  notIn: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _count: UserCount;
  contacts: Maybe<Array<Contact>>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  heroGreetings: Maybe<Array<HeroGreeting>>;
  name: Scalars['String']['output'];
  navLinks: Maybe<Array<NavLink>>;
  passwordHash: Scalars['String']['output'];
  payments: Maybe<Array<Payment>>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
  uuid: Scalars['String']['output'];
};

export type UserCount = {
  __typename?: 'UserCount';
  contacts: Scalars['Int']['output'];
  heroGreetings: Scalars['Int']['output'];
  navLinks: Scalars['Int']['output'];
  payments: Scalars['Int']['output'];
};

export type UserCreateInput = {
  contacts: InputMaybe<ContactCreateNestedManyWithoutUserInput>;
  createdAt: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  heroGreetings: InputMaybe<HeroGreetingCreateNestedManyWithoutUserInput>;
  name: Scalars['String']['input'];
  navLinks: InputMaybe<NavLinkCreateNestedManyWithoutUserInput>;
  passwordHash: Scalars['String']['input'];
  payments: InputMaybe<PaymentCreateNestedManyWithoutUserInput>;
  updatedAt: InputMaybe<Scalars['DateTime']['input']>;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type UserScalarRelationFilter = {
  is: InputMaybe<UserWhereInput>;
  isNot: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND: InputMaybe<Array<UserWhereInput>>;
  NOT: InputMaybe<Array<UserWhereInput>>;
  OR: InputMaybe<Array<UserWhereInput>>;
  contacts: InputMaybe<ContactListRelationFilter>;
  createdAt: InputMaybe<DateTimeFilter>;
  deletedAt: InputMaybe<DateTimeNullableFilter>;
  email: InputMaybe<StringFilter>;
  heroGreetings: InputMaybe<HeroGreetingListRelationFilter>;
  name: InputMaybe<StringFilter>;
  navLinks: InputMaybe<NavLinkListRelationFilter>;
  passwordHash: InputMaybe<StringFilter>;
  payments: InputMaybe<PaymentListRelationFilter>;
  updatedAt: InputMaybe<DateTimeFilter>;
  userId: InputMaybe<IntFilter>;
  uuid: InputMaybe<UuidFilter>;
};

export type UuidFilter = {
  equals: InputMaybe<Scalars['String']['input']>;
  gt: InputMaybe<Scalars['String']['input']>;
  gte: InputMaybe<Scalars['String']['input']>;
  in: InputMaybe<Array<Scalars['String']['input']>>;
  lt: InputMaybe<Scalars['String']['input']>;
  lte: InputMaybe<Scalars['String']['input']>;
  mode: InputMaybe<QueryMode>;
  not: InputMaybe<NestedUuidFilter>;
  notIn: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SignInMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthResponse', access_token: string } };
