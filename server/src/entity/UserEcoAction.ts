import { Field, InputType, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
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
  user: User;

  @Field(() => [EcoAction])
  @OneToMany(() => EcoAction, (ecoAction) => ecoAction.relatedUsers, {
    onDelete: "CASCADE",
  })
  ecoAction: EcoAction;

  @Field({ nullable: true, defaultValue: null })
  @Column()
  proof?: string;

  @Field({ nullable: true, defaultValue: false })
  @Column()
  hasLiked?: boolean;

  @Field(() => Number, { nullable: true })
  @Column()
  validationId: number;
}

@InputType()
export class UserEcoActionInputAddProof {
  @Field()
  @MinLength(3)
  proof: string;
}

@InputType()
export class UserEcoActionInputAddLike {
  @Field()
  hasLiked: boolean;
}

@InputType()
export class UserEcoActionInputAddValidation {
  @Field()
  validationId: number;

  @Field()
  validationPoints: number;
}
