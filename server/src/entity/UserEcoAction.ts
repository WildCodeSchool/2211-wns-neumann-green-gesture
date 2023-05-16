import { Field, InputType, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./User";
import EcoAction from "./EcoAction";

import { MinLength } from "class-validator";

@Entity()
@ObjectType()
export class UserEcoAction {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.relatedEcoActions, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  user: User[];

  @Field(() => [EcoAction])
  @ManyToMany(() => EcoAction, (ecoAction) => ecoAction.relatedUsers, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  ecoAction: EcoAction[];

  @Field({ nullable: true, defaultValue: null })
  @Column({ nullable: true })
  proof?: string;

  @Field()
  @Column({ default: false })
  hasLiked?: boolean;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  validationId?: number;
}

@InputType()
export class UserEcoActionInputAddProof {
  @Field()
  @MinLength(3)
  proof: string;

  @Field()
  ecoActionId: number;

  @Field()
  groupId: number;
}

@InputType()
export class UserEcoActionInputAddLike {
  @Field()
  hasLiked: boolean;

  @Field()
  ecoActionId: number;

  @Field()
  groupId: number;
}

@InputType()
export class UserEcoActionInputAddValidation {
  @Field()
  validationId: number;

  @Field()
  validationPoints: number;
}
