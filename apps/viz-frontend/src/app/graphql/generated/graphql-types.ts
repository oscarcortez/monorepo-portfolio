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
  iconName: Maybe<Scalars['String']['output']>;
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
  iconName: InputMaybe<Scalars['String']['input']>;
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
  iconName: InputMaybe<Scalars['String']['input']>;
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

export type ContactPhone = {
  __typename?: 'ContactPhone';
  id: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
  phone: Maybe<Scalars['String']['output']>;
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
  iconName: InputMaybe<StringNullableFilter>;
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
  iconName: InputMaybe<StringNullableFilter>;
  link: InputMaybe<StringFilter>;
  sortOrder: InputMaybe<IntFilter>;
  title: InputMaybe<StringFilter>;
  type: InputMaybe<EnumContactTypeFilter>;
  user: InputMaybe<UserScalarRelationFilter>;
  userId: InputMaybe<IntFilter>;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type ContactsListResponse = {
  __typename?: 'ContactsListResponse';
  data: Array<ContactPhone>;
  error: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
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

export type EnumSectionFilter = {
  equals: InputMaybe<Section>;
  in: InputMaybe<Array<Section>>;
  not: InputMaybe<NestedEnumSectionFilter>;
  notIn: InputMaybe<Array<Section>>;
};

export type EnumStatusFilter = {
  equals: InputMaybe<Status>;
  in: InputMaybe<Array<Status>>;
  not: InputMaybe<NestedEnumStatusFilter>;
  notIn: InputMaybe<Array<Status>>;
};

export type EnumStatusNullableFilter = {
  equals: InputMaybe<Status>;
  in: InputMaybe<Array<Status>>;
  not: InputMaybe<NestedEnumStatusNullableFilter>;
  notIn: InputMaybe<Array<Status>>;
};

export type EnumTemplateTypeFilter = {
  equals: InputMaybe<TemplateType>;
  in: InputMaybe<Array<TemplateType>>;
  not: InputMaybe<NestedEnumTemplateTypeFilter>;
  notIn: InputMaybe<Array<TemplateType>>;
};

export type GenerateTextInput = {
  maxOutputTokens: InputMaybe<Scalars['Int']['input']>;
  model: InputMaybe<Scalars['String']['input']>;
  prompt: Scalars['String']['input'];
  temperature: InputMaybe<Scalars['Float']['input']>;
};

export type GenerateTextResponse = {
  __typename?: 'GenerateTextResponse';
  error: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  text: Maybe<Scalars['String']['output']>;
  usage: Maybe<TokenUsage>;
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

export type LanguageInfo = {
  __typename?: 'LanguageInfo';
  code: Scalars['String']['output'];
  name: Scalars['String']['output'];
  supportsFormality: Maybe<Scalars['Boolean']['output']>;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  generateText: GenerateTextResponse;
  logout: LogoutResponse;
  sendEmail: SendEmailResponseType;
  sendWhatsAppText: SendMessageResponse;
  signIn: AuthResponse;
  translateText: TranslationResult;
  translateTexts: Array<Scalars['String']['output']>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationGenerateTextArgs = {
  input: GenerateTextInput;
};


export type MutationSendEmailArgs = {
  input: SendEmailInput;
};


export type MutationSendWhatsAppTextArgs = {
  input: SendMessageInput;
};


export type MutationSignInArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationTranslateTextArgs = {
  input: TranslateTextInput;
};


export type MutationTranslateTextsArgs = {
  input: TranslateTextsInput;
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

export type NestedEnumSectionFilter = {
  equals: InputMaybe<Section>;
  in: InputMaybe<Array<Section>>;
  not: InputMaybe<NestedEnumSectionFilter>;
  notIn: InputMaybe<Array<Section>>;
};

export type NestedEnumStatusFilter = {
  equals: InputMaybe<Status>;
  in: InputMaybe<Array<Status>>;
  not: InputMaybe<NestedEnumStatusFilter>;
  notIn: InputMaybe<Array<Status>>;
};

export type NestedEnumStatusNullableFilter = {
  equals: InputMaybe<Status>;
  in: InputMaybe<Array<Status>>;
  not: InputMaybe<NestedEnumStatusNullableFilter>;
  notIn: InputMaybe<Array<Status>>;
};

export type NestedEnumTemplateTypeFilter = {
  equals: InputMaybe<TemplateType>;
  in: InputMaybe<Array<TemplateType>>;
  not: InputMaybe<NestedEnumTemplateTypeFilter>;
  notIn: InputMaybe<Array<TemplateType>>;
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
  frontendDetails: Maybe<Scalars['JSON']['output']>;
  hasQrCode: Scalars['Boolean']['output'];
  isFavorite: Scalars['Boolean']['output'];
  link: Maybe<Scalars['String']['output']>;
  paymentId: Scalars['ID']['output'];
  paymentSource: PaymentSource;
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
  frontendDetails: InputMaybe<Scalars['JSON']['input']>;
  hasQrCode: InputMaybe<Scalars['Boolean']['input']>;
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
  frontendDetails: InputMaybe<Scalars['JSON']['input']>;
  hasQrCode: InputMaybe<Scalars['Boolean']['input']>;
  isFavorite: InputMaybe<Scalars['Boolean']['input']>;
  link: InputMaybe<Scalars['String']['input']>;
  paymentSource: PaymentSourceCreateNestedOneWithoutPaymentInput;
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

export type PaymentSourceScalarRelationFilter = {
  is: InputMaybe<PaymentSourceWhereInput>;
  isNot: InputMaybe<PaymentSourceWhereInput>;
};

export enum PaymentSourceType {
  Airtm = 'AIRTM',
  Bank = 'BANK',
  Binance = 'BINANCE',
  Crypto = 'CRYPTO',
  Other = 'OTHER',
  Psp = 'PSP',
  Qr = 'QR',
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
  frontendDetails: InputMaybe<JsonNullableFilter>;
  hasQrCode: InputMaybe<BoolFilter>;
  isFavorite: InputMaybe<BoolFilter>;
  link: InputMaybe<StringNullableFilter>;
  paymentId: InputMaybe<IntFilter>;
  paymentSource: InputMaybe<PaymentSourceScalarRelationFilter>;
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
  frontendDetails: InputMaybe<JsonNullableFilter>;
  hasQrCode: InputMaybe<BoolFilter>;
  isFavorite: InputMaybe<BoolFilter>;
  link: InputMaybe<StringNullableFilter>;
  paymentId: InputMaybe<Scalars['Int']['input']>;
  paymentSource: InputMaybe<PaymentSourceScalarRelationFilter>;
  paymentSourceId: InputMaybe<IntFilter>;
  sortOrder: InputMaybe<IntFilter>;
  title: InputMaybe<StringFilter>;
  user: InputMaybe<UserScalarRelationFilter>;
  userId: InputMaybe<IntFilter>;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getDeeplUsage: UsageInfo;
  getSourceLanguages: Array<LanguageInfo>;
  getTargetLanguages: Array<LanguageInfo>;
  getUser: Maybe<Scalars['JSONObject']['output']>;
  getWhatsAppContacts: ContactsListResponse;
  hello: Scalars['String']['output'];
  isDeeplHealthy: Scalars['Boolean']['output'];
  template: Maybe<Template>;
  templates: Array<Template>;
  userHero: User;
};


export type QueryTemplateArgs = {
  uuid: Scalars['String']['input'];
};


export type QueryUserHeroArgs = {
  userUuid: Scalars['String']['input'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum Section {
  About = 'ABOUT',
  Blog = 'BLOG',
  Contacts = 'CONTACTS',
  Faq = 'FAQ',
  Footer = 'FOOTER',
  HeroGreeting = 'HERO_GREETING',
  Payments = 'PAYMENTS',
  Portfolio = 'PORTFOLIO',
  Pricing = 'PRICING',
  Services = 'SERVICES',
  Testimonials = 'TESTIMONIALS'
}

export type SendEmailInput = {
  from: Scalars['String']['input'];
  html: Scalars['String']['input'];
  replyTo: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
  text: InputMaybe<Scalars['String']['input']>;
  to: Scalars['String']['input'];
};

export type SendEmailResponseType = {
  __typename?: 'SendEmailResponseType';
  error: Maybe<Scalars['String']['output']>;
  messageId: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type SendMessageInput = {
  text: Scalars['String']['input'];
  to: Scalars['String']['input'];
};

export type SendMessageResponse = {
  __typename?: 'SendMessageResponse';
  error: Maybe<Scalars['String']['output']>;
  message: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum Status {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Inactive = 'INACTIVE',
  Preview = 'PREVIEW',
  Published = 'PUBLISHED'
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

export type Template = {
  __typename?: 'Template';
  _count: TemplateCount;
  createdAt: Scalars['DateTime']['output'];
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  description: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  previewImage: Maybe<Scalars['String']['output']>;
  status: Status;
  templateId: Scalars['ID']['output'];
  templateSections: Maybe<Array<TemplateSection>>;
  themeColor: Maybe<Scalars['String']['output']>;
  type: TemplateType;
  user: User;
  userId: Scalars['Int']['output'];
  uuid: Scalars['String']['output'];
};

export type TemplateCount = {
  __typename?: 'TemplateCount';
  templateSections: Scalars['Int']['output'];
};

export type TemplateCreateManyUserInput = {
  createdAt: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt: InputMaybe<Scalars['DateTime']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  previewImage: InputMaybe<Scalars['String']['input']>;
  status: Status;
  templateId: InputMaybe<Scalars['Int']['input']>;
  themeColor: InputMaybe<Scalars['String']['input']>;
  type: TemplateType;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type TemplateCreateManyUserInputEnvelope = {
  data: Array<TemplateCreateManyUserInput>;
  skipDuplicates: InputMaybe<Scalars['Boolean']['input']>;
};

export type TemplateCreateNestedManyWithoutUserInput = {
  connect: InputMaybe<Array<TemplateWhereUniqueInput>>;
  connectOrCreate: InputMaybe<Array<TemplateCreateOrConnectWithoutUserInput>>;
  create: InputMaybe<Array<TemplateCreateWithoutUserInput>>;
  createMany: InputMaybe<TemplateCreateManyUserInputEnvelope>;
};

export type TemplateCreateOrConnectWithoutUserInput = {
  create: TemplateCreateWithoutUserInput;
  where: TemplateWhereUniqueInput;
};

export type TemplateCreateWithoutUserInput = {
  createdAt: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt: InputMaybe<Scalars['DateTime']['input']>;
  description: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  previewImage: InputMaybe<Scalars['String']['input']>;
  status: Status;
  templateSections: InputMaybe<TemplateSectionCreateNestedManyWithoutTemplateInput>;
  themeColor: InputMaybe<Scalars['String']['input']>;
  type: TemplateType;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type TemplateListRelationFilter = {
  every: InputMaybe<TemplateWhereInput>;
  none: InputMaybe<TemplateWhereInput>;
  some: InputMaybe<TemplateWhereInput>;
};

export type TemplateScalarRelationFilter = {
  is: InputMaybe<TemplateWhereInput>;
  isNot: InputMaybe<TemplateWhereInput>;
};

export type TemplateSection = {
  __typename?: 'TemplateSection';
  createdAt: Scalars['DateTime']['output'];
  frontendConfig: Maybe<Scalars['JSON']['output']>;
  section: Section;
  sortOrder: Scalars['Int']['output'];
  status: Maybe<Status>;
  template: Template;
  templateId: Scalars['Int']['output'];
  templateSectionId: Scalars['ID']['output'];
  uuid: Scalars['String']['output'];
};

export type TemplateSectionCreateManyTemplateInput = {
  createdAt: InputMaybe<Scalars['DateTime']['input']>;
  frontendConfig: InputMaybe<Scalars['JSON']['input']>;
  section: Section;
  sortOrder: InputMaybe<Scalars['Int']['input']>;
  status: InputMaybe<Status>;
  templateSectionId: InputMaybe<Scalars['Int']['input']>;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type TemplateSectionCreateManyTemplateInputEnvelope = {
  data: Array<TemplateSectionCreateManyTemplateInput>;
  skipDuplicates: InputMaybe<Scalars['Boolean']['input']>;
};

export type TemplateSectionCreateNestedManyWithoutTemplateInput = {
  connect: InputMaybe<Array<TemplateSectionWhereUniqueInput>>;
  connectOrCreate: InputMaybe<Array<TemplateSectionCreateOrConnectWithoutTemplateInput>>;
  create: InputMaybe<Array<TemplateSectionCreateWithoutTemplateInput>>;
  createMany: InputMaybe<TemplateSectionCreateManyTemplateInputEnvelope>;
};

export type TemplateSectionCreateOrConnectWithoutTemplateInput = {
  create: TemplateSectionCreateWithoutTemplateInput;
  where: TemplateSectionWhereUniqueInput;
};

export type TemplateSectionCreateWithoutTemplateInput = {
  createdAt: InputMaybe<Scalars['DateTime']['input']>;
  frontendConfig: InputMaybe<Scalars['JSON']['input']>;
  section: Section;
  sortOrder: InputMaybe<Scalars['Int']['input']>;
  status: InputMaybe<Status>;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type TemplateSectionListRelationFilter = {
  every: InputMaybe<TemplateSectionWhereInput>;
  none: InputMaybe<TemplateSectionWhereInput>;
  some: InputMaybe<TemplateSectionWhereInput>;
};

export type TemplateSectionWhereInput = {
  AND: InputMaybe<Array<TemplateSectionWhereInput>>;
  NOT: InputMaybe<Array<TemplateSectionWhereInput>>;
  OR: InputMaybe<Array<TemplateSectionWhereInput>>;
  createdAt: InputMaybe<DateTimeFilter>;
  frontendConfig: InputMaybe<JsonNullableFilter>;
  section: InputMaybe<EnumSectionFilter>;
  sortOrder: InputMaybe<IntFilter>;
  status: InputMaybe<EnumStatusNullableFilter>;
  template: InputMaybe<TemplateScalarRelationFilter>;
  templateId: InputMaybe<IntFilter>;
  templateSectionId: InputMaybe<IntFilter>;
  uuid: InputMaybe<UuidFilter>;
};

export type TemplateSectionWhereUniqueInput = {
  AND: InputMaybe<Array<TemplateSectionWhereInput>>;
  NOT: InputMaybe<Array<TemplateSectionWhereInput>>;
  OR: InputMaybe<Array<TemplateSectionWhereInput>>;
  createdAt: InputMaybe<DateTimeFilter>;
  frontendConfig: InputMaybe<JsonNullableFilter>;
  section: InputMaybe<EnumSectionFilter>;
  sortOrder: InputMaybe<IntFilter>;
  status: InputMaybe<EnumStatusNullableFilter>;
  template: InputMaybe<TemplateScalarRelationFilter>;
  templateId: InputMaybe<IntFilter>;
  templateSectionId: InputMaybe<Scalars['Int']['input']>;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export enum TemplateType {
  Basic = 'BASIC',
  Creative = 'CREATIVE',
  Minimalist = 'MINIMALIST',
  Modern = 'MODERN',
  Professional = 'PROFESSIONAL'
}

export type TemplateWhereInput = {
  AND: InputMaybe<Array<TemplateWhereInput>>;
  NOT: InputMaybe<Array<TemplateWhereInput>>;
  OR: InputMaybe<Array<TemplateWhereInput>>;
  createdAt: InputMaybe<DateTimeFilter>;
  deletedAt: InputMaybe<DateTimeNullableFilter>;
  description: InputMaybe<StringNullableFilter>;
  name: InputMaybe<StringFilter>;
  previewImage: InputMaybe<StringNullableFilter>;
  status: InputMaybe<EnumStatusFilter>;
  templateId: InputMaybe<IntFilter>;
  templateSections: InputMaybe<TemplateSectionListRelationFilter>;
  themeColor: InputMaybe<StringNullableFilter>;
  type: InputMaybe<EnumTemplateTypeFilter>;
  user: InputMaybe<UserScalarRelationFilter>;
  userId: InputMaybe<IntFilter>;
  uuid: InputMaybe<UuidFilter>;
};

export type TemplateWhereUniqueInput = {
  AND: InputMaybe<Array<TemplateWhereInput>>;
  NOT: InputMaybe<Array<TemplateWhereInput>>;
  OR: InputMaybe<Array<TemplateWhereInput>>;
  createdAt: InputMaybe<DateTimeFilter>;
  deletedAt: InputMaybe<DateTimeNullableFilter>;
  description: InputMaybe<StringNullableFilter>;
  name: InputMaybe<StringFilter>;
  previewImage: InputMaybe<StringNullableFilter>;
  status: InputMaybe<EnumStatusFilter>;
  templateId: InputMaybe<Scalars['Int']['input']>;
  templateSections: InputMaybe<TemplateSectionListRelationFilter>;
  themeColor: InputMaybe<StringNullableFilter>;
  type: InputMaybe<EnumTemplateTypeFilter>;
  user: InputMaybe<UserScalarRelationFilter>;
  userId: InputMaybe<IntFilter>;
  uuid: InputMaybe<Scalars['String']['input']>;
};

export type TokenUsage = {
  __typename?: 'TokenUsage';
  inputTokens: Scalars['Int']['output'];
  outputTokens: Scalars['Int']['output'];
};

export type TranslateTextInput = {
  formality: InputMaybe<Scalars['String']['input']>;
  preserveFormatting: InputMaybe<Scalars['Boolean']['input']>;
  sourceLang: InputMaybe<Scalars['String']['input']>;
  targetLang: Scalars['String']['input'];
  text: Scalars['String']['input'];
};

export type TranslateTextsInput = {
  sourceLang: InputMaybe<Scalars['String']['input']>;
  targetLang: Scalars['String']['input'];
  texts: Array<Scalars['String']['input']>;
};

export type TranslationResult = {
  __typename?: 'TranslationResult';
  detectedSourceLanguage: Maybe<Scalars['String']['output']>;
  translatedText: Scalars['String']['output'];
};

export type UsageInfo = {
  __typename?: 'UsageInfo';
  characterCount: Scalars['Float']['output'];
  characterLimit: Maybe<Scalars['Float']['output']>;
  documentCount: Maybe<Scalars['Float']['output']>;
  documentLimit: Maybe<Scalars['Float']['output']>;
  teamDocumentCount: Maybe<Scalars['Float']['output']>;
  teamDocumentLimit: Maybe<Scalars['Float']['output']>;
};

export type User = {
  __typename?: 'User';
  _count: UserCount;
  contacts: Maybe<Array<Contact>>;
  createdAt: Scalars['DateTime']['output'];
  deletedAt: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  firstName: Maybe<Scalars['String']['output']>;
  heroGreetings: Maybe<Array<HeroGreeting>>;
  lastName: Maybe<Scalars['String']['output']>;
  navLinks: Maybe<Array<NavLink>>;
  passwordHash: Maybe<Scalars['String']['output']>;
  payments: Maybe<Array<Payment>>;
  picture: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  templates: Maybe<Array<Template>>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
  username: Maybe<Scalars['String']['output']>;
  uuid: Scalars['String']['output'];
};

export type UserCount = {
  __typename?: 'UserCount';
  contacts: Scalars['Int']['output'];
  heroGreetings: Scalars['Int']['output'];
  navLinks: Scalars['Int']['output'];
  payments: Scalars['Int']['output'];
  templates: Scalars['Int']['output'];
};

export type UserCreateInput = {
  contacts: InputMaybe<ContactCreateNestedManyWithoutUserInput>;
  createdAt: InputMaybe<Scalars['DateTime']['input']>;
  deletedAt: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: InputMaybe<Scalars['String']['input']>;
  heroGreetings: InputMaybe<HeroGreetingCreateNestedManyWithoutUserInput>;
  lastName: InputMaybe<Scalars['String']['input']>;
  navLinks: InputMaybe<NavLinkCreateNestedManyWithoutUserInput>;
  passwordHash: InputMaybe<Scalars['String']['input']>;
  payments: InputMaybe<PaymentCreateNestedManyWithoutUserInput>;
  picture: InputMaybe<Scalars['String']['input']>;
  provider: InputMaybe<Scalars['String']['input']>;
  templates: InputMaybe<TemplateCreateNestedManyWithoutUserInput>;
  updatedAt: InputMaybe<Scalars['DateTime']['input']>;
  username: InputMaybe<Scalars['String']['input']>;
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
  firstName: InputMaybe<StringNullableFilter>;
  heroGreetings: InputMaybe<HeroGreetingListRelationFilter>;
  lastName: InputMaybe<StringNullableFilter>;
  navLinks: InputMaybe<NavLinkListRelationFilter>;
  passwordHash: InputMaybe<StringNullableFilter>;
  payments: InputMaybe<PaymentListRelationFilter>;
  picture: InputMaybe<StringNullableFilter>;
  provider: InputMaybe<StringFilter>;
  templates: InputMaybe<TemplateListRelationFilter>;
  updatedAt: InputMaybe<DateTimeFilter>;
  userId: InputMaybe<IntFilter>;
  username: InputMaybe<StringNullableFilter>;
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

export type UserHeroQueryVariables = Exact<{
  userUuid: Scalars['String']['input'];
}>;


export type UserHeroQuery = { __typename?: 'Query', userHero: { __typename?: 'User', uuid: string, email: string, firstName: string | null, lastName: string | null, username: string | null, picture: string | null, contacts: Array<{ __typename?: 'Contact', displayText: string | null, iconName: string | null, link: string, title: string, type: ContactType, uuid: string, className: string | null }> | null, heroGreetings: Array<{ __typename?: 'HeroGreeting', content: string, device: DeviceType, footer: string, title: string, uuid: string }> | null, navLinks: Array<{ __typename?: 'NavLink', className: string | null, content: string, language: LanguageCode, url: string, uuid: string }> | null, payments: Array<{ __typename?: 'Payment', uuid: string, className: string | null, displayText: string | null, isFavorite: boolean, link: string | null, title: string, hasQrCode: boolean, frontendDetails: any | null, paymentSource: { __typename?: 'PaymentSource', uuid: string, type: PaymentSourceType, logoPath: string | null, website: string | null, name: string } }> | null } };
