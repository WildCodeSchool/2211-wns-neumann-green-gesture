import { MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EcoAction from "./EcoAction";

@Entity()
@ObjectType()
class Validation {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 255 })
  name: string;

  @Field()
  @Column()
  points: number;

  @Field(() => EcoAction)
  @ManyToOne(() => EcoAction, (ecoAction) => ecoAction.validations, {
    onDelete: "CASCADE",
  })
  ecoAction: EcoAction;
}

@InputType()
export class ValidationInputCreation {
  @Field()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @Field()
  points: number;
}

export default Validation;
