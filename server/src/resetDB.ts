import datasource from "./db";
import Comment from "./entity/Comment";
import { Company } from "./entity/Company";
import EcoAction from "./entity/EcoAction";
import Group from "./entity/Group";
import { Team } from "./entity/Team";
import User, { hashPassword } from "./entity/User";
import { UserEcoAction } from "./entity/UserEcoAction";
import Validation from "./entity/Validation";

async function resetDB(): Promise<void> {
  // start the connection to the database
  await datasource.initialize();

  // delete all teams in the database
  await datasource.getRepository(Team).delete({});
  // delete all comments in the database
  await datasource.getRepository(Comment).delete({});
  // delete validations in the database
  await datasource.getRepository(Validation).delete({});
  // delete all eco actions in the database
  await datasource.getRepository(EcoAction).delete({});
  // delete all groups in the database
  await datasource.getRepository(Group).delete({});
  // delete userEcoActions in the database
  await datasource.getRepository(UserEcoAction).delete({});
  // delete all users in the database
  await datasource.getRepository(User).delete({});

  // create new users
  const admin = await datasource.getRepository(User).save({
    firstName: "Admin",
    lastName: "Doe",
    email: "admin@gmail.com",
    password: await hashPassword("testtest"),
    role: "admin",
    subscriptionType: "partner",
  });

  const userFree = await datasource.getRepository(User).save({
    firstName: "User",
    lastName: "Free",
    email: "user@gmail.com",
    password: await hashPassword("testtest"),
  });

  const userPartner = await datasource.getRepository(User).save({
    firstName: "User",
    lastName: "Partner",
    email: "partner@gmail.com",
    password: await hashPassword("testtest"),
    subscriptionType: "partner",
  });

  // create Company for userPartner
  await datasource.getRepository(Company).save({
    name: "Company 1",
    creator: userPartner,
    users: [userPartner, userFree],
  });

  // create new eco actions
  const ecoActions = await datasource.getRepository(EcoAction).save([
    {
      name: "EcoAction 1",
      description: "EcoAction 1 description",
      author: userPartner,
      validations: [
        {
          name: "Validation 1",
          points: 1,
        },
        {
          name: "Validation 2",
          points: 2,
        },
        {
          name: "Validation 3",
          points: 3,
        },
      ],
    },
    {
      name: "EcoAction 2",
      description: "EcoAction 2 description",
      author: userPartner,
      validations: [
        {
          name: "Validation 1",
          points: 1,
        },
        {
          name: "Validation 2",
          points: 2,
        },
        {
          name: "Validation 3",
          points: 3,
        },
      ],
    },
    {
      name: "EcoAction 3",
      description: "EcoAction 3 description",
      validations: [
        {
          name: "Validation 1",
          points: 1,
        },
        {
          name: "Validation 2",
          points: 2,
        },
        {
          name: "Validation 3",
          points: 3,
        },
      ],
    },
  ]);

  // create new groups
  const groups = await datasource.getRepository(Group).save([
    {
      name: "GreenGesture 1",
      challengeName: "Challenge 1",
      startDate: "2016-01-25T10:10:10.555555",
      endDate: "2020-01-25T10:10:10.555555",
      author: admin,
      users: [admin],
      ecoActions,
    },
    {
      name: "GreenGesture 2",
      challengeName: "Challenge 2",
      startDate: "2016-01-25T10:10:10.555555",
      endDate: "2020-01-25T10:10:10.555555",
      author: userFree,
      users: [admin, userFree],
      ecoActions,
    },
    {
      name: "GreenGesture 3",
      challengeName: "Challenge 3",
      startDate: "2016-01-25T10:10:10.555555",
      endDate: "2020-01-25T10:10:10.555555",
      author: userPartner,
      users: [admin, userFree, userPartner],
      ecoActions,
    },
  ]);

  // create Team for Green Gesture 3
  await datasource.getRepository(Team).save([
    {
      name: "Team 1",
      group: groups[2],
      users: [admin],
    },
    {
      name: "Team 2",
      group: groups[2],
      users: [userPartner, userFree],
    },
  ]);

  // create new userEcoActions
  await datasource.getRepository(UserEcoAction).save([
    {
      user: [userFree],
      ecoAction: [ecoActions[0]],
      validationId: ecoActions[0].validations[0].id,
    },
  ]);

  // create new comments
  // comments group 1
  await datasource.getRepository(Comment).save([
    {
      message: "Commentaire 1: Group 1",
      author: userFree,
      group: groups[0],
      createdAt: new Date(),
    },
    {
      message: "Commentaire 2: Group 1",
      author: userFree,
      group: groups[0],
      createdAt: new Date(),
    },
    {
      message: "Commentaire 3: Group 1",
      author: userPartner,
      group: groups[0],
      createdAt: new Date(),
    },
    {
      message: "Commentaire 4: Group 1",
      author: userFree,
      group: groups[0],
      createdAt: new Date(),
    },
  ]);
  // comments group 2
  await datasource.getRepository(Comment).save([
    {
      message: "Commentaire 1: Group 2",
      author: userFree,
      group: groups[1],
      createdAt: new Date(),
    },
    {
      message: "Commentaire 2: Group 2",
      author: userFree,
      group: groups[1],
      createdAt: new Date(),
    },
    {
      message: "Commentaire 3: Group 2",
      author: userPartner,
      group: groups[1],
      createdAt: new Date(),
    },
    {
      message: "Commentaire 4: Group 2",
      author: userFree,
      group: groups[1],
      createdAt: new Date(),
    },
  ]);

  // close the connection to the database
  await datasource.destroy();

  console.log("Database reset");
}

resetDB().catch(console.error);
