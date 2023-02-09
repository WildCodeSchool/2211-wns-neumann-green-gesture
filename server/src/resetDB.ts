import datasource from "./db";
import User, { hashPassword } from "./entity/User";

async function resetDB(): Promise<void> {
  // start the connection to the database
  await datasource.initialize();

  // delete all users in the database
  await datasource.getRepository(User).delete({});

  // create a new user
  await datasource.getRepository(User).save([
    {
      firstName: "Admin",
      lastName: "Doe",
      email: "admin@gmail.com",
      password: await hashPassword("testtest"),
      role: "admin",
      subscriptionType: "partner",
    },
    {
      firstName: "User",
      lastName: "Free",
      email: "user@gmail.com",
      password: await hashPassword("testtest"),
    },
    {
      firstName: "User",
      lastName: "Partner",
      email: "partner@gmail.com",
      password: await hashPassword("testtest"),
      subscriptionType: "partner",
    },
  ]);

  // close the connection to the database
  await datasource.destroy();

  console.log("Database reset");
}

resetDB().catch(console.error);
