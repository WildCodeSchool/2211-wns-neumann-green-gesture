import datasource from "./db";
import Group from "./entity/Group";
import User, { hashPassword } from "./entity/User";

async function resetDB(): Promise<void> {
  // start the connection to the database
  await datasource.initialize();

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

  // delete all groups in the database
  await datasource.getRepository(Group).delete({});

  // create new groups
  await datasource.getRepository(Group).save([
    {
      name: "GreenGesture 1",
      startDate: "2016-01-25T10:10:10.555555",
      endDate: "2020-01-25T10:10:10.555555",
      author: admin,
      users: [admin],
    },
    {
      name: "GreenGesture 2",
      startDate: "2016-01-25T10:10:10.555555",
      endDate: "2020-01-25T10:10:10.555555",
      author: userFree,
      users: [admin, userFree],
    },
    {
      name: "GreenGesture 3",
      startDate: "2016-01-25T10:10:10.555555",
      endDate: "2020-01-25T10:10:10.555555",
      author: userPartner,
      users: [admin, userFree, userPartner],
    },
  ]);

  // close the connection to the database
  await datasource.destroy();

  console.log("Database reset");
}

resetDB().catch(console.error);
