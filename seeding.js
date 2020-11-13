const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { Text, Checkbox, Password } = require("@keystonejs/fields");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { MongooseAdapter } = require("@keystonejs/adapter-mongoose");

const { createItems } = require("@keystonejs/server-side-graphql-client");

const keystone = new Keystone({
  adapter: new MongooseAdapter({
    mongoUri: "mongodb://localhost:27017/keystone-seed?ssl=false",
  }),
});

keystone.createList("User", {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: { type: Checkbox },
    password: {
      type: Password,
    },
  },
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
});

createItems({
  keystone,
  listKey: "User",
  items: [
    { data: { name: "John Duck", email: "john@duck.com", password: "123456" } },
    {
      data: {
        name: "Barry",
        email: "bartduisters@bartduisters.com",
        password: "123456",
      },
    },
  ],
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: "example-project",
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
