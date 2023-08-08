import datasource from "./db";
import User, { hashPassword } from "./entity/User";
import EcoAction from "./entity/EcoAction";
import Validation from "./entity/Validation";

async function resetDB(): Promise<void> {
  // start the connection to the database
  await datasource.initialize();

  // delete validations in the database
  await datasource.getRepository(Validation).delete({});
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

  // create validation for eco action
  let i = 0;
  const validations = [];
  for (i = 0; i < 11; i++) {
    validations.push({
      name: `Validation ${i}`,
      points: i,
    });
  }
  await datasource.getRepository(Validation).save(validations);

  // create new eco actions
  await datasource.getRepository(EcoAction).save([
    {
      name: "EcoAction 1",
      description: "EcoAction 1 description",
      validations: [
        validations[0],
        validations[1],
        validations[2],
        validations[3],
      ],
    },
    {
      name: "EcoAction 2",
      description: "EcoAction 2 description",
      validations: [
        validations[0],
        validations[2],
        validations[4],
        validations[6],
      ],
    },
    {
      name: "EcoAction 3",
      description: "EcoAction 3 description",
      validations: [
        validations[0],
        validations[3],
        validations[6],
        validations[9],
      ],
    },
  ]);

  // close the connection to the database
  await datasource.destroy();

  console.log("Database reset");
}

resetDB().catch(console.error);
