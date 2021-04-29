const { db, User, Task, List, Collaborator } = require("./server/db");

const seed = async () => {
  const users = [
    {
      name: "Matt Ellison",
      email: "matt@gmail.com",
      password: "123",
    },
    {
      name: "Josh Sohn",
      email: "josh@gmail.com",
      password: "123",
    },
  ];

  const lists = [
    {
      title: "Test List 1",
      creatorId: 1,
    },
    {
      title: "Test List 2",
      creatorId: 2,
    },
  ];

  const tasks = [
    {
      title: "Dishes",
      deadline: new Date(2021, 3, 02),
      priority: 5,
      description: "Clean while you cook, girl!",
      listId: 1,
    },
    {
      title: "Trash",
      deadline: new Date(2021, 3, 02),
      priority: 8,
      description: "Girl, that trash stinks - take it out!",
      listId: 2,
    },
  ];
  try {
    await db.sync({ force: true });
    const userPromise = await Promise.all(
      users.map((user) => User.create(user))
    );
    const listPromise = await Promise.all(
      lists.map((list) => List.create(list))
    );
    const taskPromise = await Promise.all(
      tasks.map((task) => Task.create(task))
    );
    await Collaborator.create({ userId: 1, listId: 2 });
  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
    .then(() => {
      console.log("Seeding success!");
      db.close();
    })
    .catch((err) => {
      console.error("Oh noes! Something went wrong!");
      console.error(err);
      db.close();
    });
}
