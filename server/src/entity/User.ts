import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import argon2, { Options, argon2id } from "argon2";

@Entity()
@ObjectType()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 150 })
  firstName: string;

  @Field()
  @Column({ length: 150 })
  lastName: string;

  @Field()
  @Column({ length: 200, unique: true })
  email: string;

  @Field()
  @Column({ length: 255 })
  password: string;

  @Field()
  @Column({ default: "user", length: 155 })
  role: string;

  @Field()
  @Column({ default: "free", length: 155 })
  subscriptionType: string;
}

@InputType()
export class UserInputSubscribe {
  @Field()
  @MaxLength(150)
  firstName: string;

  @Field()
  @MaxLength(150)
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;

  @Field({ nullable: true })
  role?: string;

  @Field({ nullable: true })
  subscriptionType?: string;
}

@InputType()
export class UserInputLogin {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}

const hashOptions: Options & { raw?: false } = {
  type: argon2id,
  memoryCost: 2 ** 16,
};

export const hashPassword = async (plain: string): Promise<string> => {
  const hashedPassword = await argon2.hash(plain, hashOptions);

  return hashedPassword;
};

export const verifyPassword = async (
  hashPassword: string,
  plain: string
): Promise<boolean> => {
  return await argon2.verify(hashPassword, plain);
};

export default User;
