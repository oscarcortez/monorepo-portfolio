import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UsageInfo {
  @Field()
  characterCount!: number;

  @Field({ nullable: true })
  characterLimit?: number;

  @Field({ nullable: true })
  documentCount?: number;

  @Field({ nullable: true })
  documentLimit?: number;

  @Field({ nullable: true })
  teamDocumentCount?: number;

  @Field({ nullable: true })
  teamDocumentLimit?: number;
}
