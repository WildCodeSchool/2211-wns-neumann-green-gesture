import { MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Group from "./Group";
import User from "./User";
import Validation, { ValidationInputCreation } from "./Validation";

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

  @Field(() => [Validation])
  @OneToMany(() => Validation, (validation) => validation.ecoAction, {
    cascade: true,
  })
  validations: Validation[];
}

@InputType()
export class EcoActionInputCreation {
  @Field()
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @Field()
  description: string;

  @Field(() => [ValidationInputCreation])
  validations: ValidationInputCreation[];
}

export default EcoAction;
