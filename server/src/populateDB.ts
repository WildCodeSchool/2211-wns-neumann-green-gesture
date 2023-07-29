import datasource from "./db";
import User, { hashPassword } from "./entity/User";
import EcoAction from "./entity/EcoAction";

async function resetDB(): Promise<void> {
  // start the connection to the database
  await datasource.initialize();

  // delete all eco actions in the database
  await datasource.getRepository(EcoAction).delete({});
  // delete all users in the database
  await datasource.getRepository(User).delete({});

  // create admin user
  await datasource.getRepository(User).save({
    firstName: "Admin",
    lastName: "Doe",
    email: "admin@gmail.com",
    password: await hashPassword("testtest"),
    role: "admin",
    subscriptionType: "partner",
  });

  // create new eco actions
  await datasource.getRepository(EcoAction).save([
    {
      name: "EcoAction 1",
      description: "EcoAction 1 description",
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

  // close the connection to the database
  await datasource.destroy();

  console.log("Database reset");
}

resetDB().catch(console.error);
