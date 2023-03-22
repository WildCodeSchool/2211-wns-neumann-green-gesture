import { MaxLength, MinLength } from "class-validator";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import EcoAction from "./EcoAction";

import User from "./User";

@Entity()
@ObjectType()
class Group {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 150 })
  name: string;

  @Field()
  @Column({ type: "timestamptz" })
  startDate: Date;

  @Field()
  @Column({ type: "timestamptz" })
  endDate: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.createdGroups, {
    onDelete: "CASCADE",
  })
  author: User;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.groups, {
    cascade: true,
  })
  @JoinTable()
  users: User[];

  @Field(() => [EcoAction])
  @ManyToMany(() => EcoAction, (ecoAction) => ecoAction.groups)
  @JoinTable()
  ecoActions: EcoAction[];
}

@InputType()
export class GroupInputCreation {
  @Field()
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @Field()
  startDate: Date;

  @Field()
  endDate: Date;
}

// @InputType() for adding ecoActions to a group
@InputType()
export class GroupInputAddEcoActions {
  @Field()
  groupId: number;

  @Field(() => [Int])
  ecoActionIds: number[];
}

export default Group;
