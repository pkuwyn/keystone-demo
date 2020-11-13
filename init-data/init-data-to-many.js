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
    const posts = await createItems({
      keystone,
      listKey: "Post",
      items: [
        { data: { title: "Hello Everyone" } },
        { data: { title: "Talking about React" } },
        { data: { title: "React is the Best" } },
        { data: { title: "Keystone Rocks" } },
      ],
      returnFields: "id, title",
    });

    const users = await createItems({
      keystone,
      listKey: "User",
      items: [
        {
          data: {
            name: "John Duck",
            email: "john@duck.com",
            password: "dolphins",
            posts: {
              connect: posts
                .filter((post) => post.title.indexOf("React") !== -1)
                .map((post) => ({ id: post.id })),
            },
          },
        },
        {
          data: {
            name: "Barry",
            email: "bartduisters@bartduisters.com",
            password: "dolphins",
            posts: {
              create: [{ title: "p1" }, { title: "p2" }, { title: "p3" }],
            },
          },
        },
      ],
      returnFields: "id, name",
    });
  }
};
