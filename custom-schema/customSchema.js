const customSchema = async (_, { name, n }) => {
  return {
    name: name,
    number: n,
    other: "hello world",
  };
};

const schemaConfig = {
  types: [
    {
      type: "type CustomType { name: String!, number:Int!, other:String! }",
    },
  ],

  mutations: [
    {
      schema: "CustomMutation(name:String!,n:Int!) : CustomType!",
      resolver: customSchema,
    },
  ],
};

module.exports = schemaConfig;
