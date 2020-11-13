const { createItems } = require("@keystonejs/server-side-graphql-client");

module.exports = async (keystone) => {
  // Count existing users
  const {
    data: {
      _allUsersMeta: { count = 0 },
    },
  } = await keystone.executeGraphQL({
    context: keystone.createContext({ skipAccessControl: true }),
    query: `query {
        _allUsersMeta {
          count
        }
      }`,
  });

  if (count === 0) {
    const users = await createItems({
      keystone,
      listKey: "User",
      items: [
        {
          data: {
            name: "John Duck",
            email: "john@duck.com",
            password: "dolphins",
          },
        },
        {
          data: {
            name: "Barry",
            email: "bartduisters@bartduisters.com",
            password: "dolphins",
          },
        },
      ],
      returnFields: "id, name",
    });

    const posts = await createItems({
      keystone,
      listKey: "Post",
      items: [
        {
          data: {
            title: "Post 1",
            author: {
              // Extracting the id of the User list item
              connect: {
                id: users.find((user) => {
                  console.log(user, user.id, user.name);
                  return user.name === "John Duck";
                }).id,
              },
            },
          },
        },

        {
          data: {
            title: "Post 2",
            author: {
              create: {
                name: "Harry",
                email: "harry@bartduisters.com",
                password: "dolphins",
              },
            },
          },
        },
      ],
    });
  }
};
