const {
  CalendarDay,
  Checkbox,
  Relationship,
  Text,
} = require("@keystonejs/fields");

module.exports = {
  fields: {
    description: {
      type: Text,
      isRequired: true,
    },
    isComplete: {
      type: Checkbox,
      defaultValue: false,
    },

    // added fields
    deadline: {
      type: CalendarDay,
      dateFrom: "2019-01-01",
      dateTo: "2029-01-01",
      isRequired: false,
      defaultValue: new Date().toISOString("YYYY-MM-DD").substring(0, 10), // Today's date
    },
    // createdBy: { type: Relationship, ref: "User.todoList" },
  },
};
