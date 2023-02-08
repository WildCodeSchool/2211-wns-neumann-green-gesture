import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  @Column({ length: 155 })
  role: string;

  @Field()
  @Column({ length: 155 })
  subscriptionType: string;
}

export default User;
