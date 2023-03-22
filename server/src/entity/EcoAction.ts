import { MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Group from "./Group";
// import Group from "./Group";
import User from "./User";

@Entity()
@ObjectType()
class EcoAction {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 255 })
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.createdEcoActions, {
    onDelete: "CASCADE",
  })
  author?: User;

  @Field(() => [Group], { nullable: true })
  @ManyToMany(() => Group, (group) => group.ecoActions, {
    onDelete: "CASCADE",
  })
  groups?: Group[];
}

@InputType()
export class EcoActionInputCreation {
  @Field()
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @Field()
  description: string;
}

export default EcoAction;
