// // export type UserHeroResult = {
// //   uuid: string;
// //   name: string;
// //   email: string;
// //   navLinks: Array<{ navLinkId: number; content: string }>;
// //   heroGreetings: Array<{
// //     heroGreetingId: number;
// //     title: string;
// //     content: string;
// //     footer: string;
// //   }>;
// //   contacts: Array<{
// //     contactId: number;
// //     title: string;
// //     link: string;
// //     type: string;
// //   }>;
// // };

// import { ObjectType, Field, Int } from '@nestjs/graphql';

// @ObjectType()
// export class NavLinkEntity {
//   @Field(() => Int)
//   navLinkId: number;

//   @Field()
//   content: string;
// }

// @ObjectType()
// export class HeroGreetingEntity {
//   @Field(() => Int)
//   heroGreetingId: number;

//   @Field()
//   title: string;

//   @Field()
//   content: string;

//   @Field()
//   footer: string;
// }

// @ObjectType()
// export class ContactEntity {
//   @Field(() => Int)
//   contactId: number;

//   @Field()
//   title: string;

//   @Field()
//   link: string;

//   @Field()
//   type: string;
// }

// @ObjectType()
// export class UserHeroResult {
//   @Field()
//   uuid: string;

//   @Field()
//   name: string;

//   @Field()
//   email: string;

//   @Field(() => [NavLinkEntity])
//   navLinks: NavLinkEntity[];

//   @Field(() => [HeroGreetingEntity])
//   heroGreetings: HeroGreetingEntity[];

//   @Field(() => [ContactEntity])
//   contacts: ContactEntity[];
// }
