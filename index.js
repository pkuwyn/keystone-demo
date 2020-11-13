const { Keystone } = require("@keystonejs/keystone");
const { MongooseAdapter } = require("@keystonejs/adapter-mongoose");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");

// const initData = require("./init-data/init-data-to-one");
const initData = require("./init-data/init-data-to-many");

//ListSchema
const TodoSchema = require("./lists/Todo.js");
const UserSchema = require("./lists/User.js");
const PostSchema = require("./lists/Post.js");

const keystone = new Keystone({
  adapter: new MongooseAdapter({
    mongoUri: "mongodb://localhost:27017/keystone-demo?ssl=false",
  }),
  //   onConnect: initData,
});

keystone.createList("User", UserSchema);

keystone.createList("Todo", TodoSchema);
keystone.createList("Post", PostSchema);

const schemaConfig = require("./custom-schema/customSchema");
keystone.extendGraphQLSchema(schemaConfig);

module.exports = {
  //   configureExpress: (app) => {
  //     app.use("/express", (req, res, next) => {
  //       res.json({ content: "custom express" });
  //     });
  //   },
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: "KeyStone-Demo-Project",
      enableDefaultRoute: true,
    }),
  ],
};
