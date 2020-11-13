const {
  Text,
  Checkbox,
  Password,
  Relationship,
} = require("@keystonejs/fields");

module.exports = {
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
    todoList: { type: Relationship, ref: "Todo", many: true },
  },
};
