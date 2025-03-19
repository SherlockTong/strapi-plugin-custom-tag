module.exports = [
  {
    method: "GET",
    path: "/list",
    handler: "customTagController.findList",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/info",
    handler: "customTagController.findOne",
    config: {
      policies: [],
      auth: false,
    },
  },
];
