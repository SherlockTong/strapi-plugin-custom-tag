"use strict";

module.exports = ({ strapi }) => {
  // register phase
  strapi.customFields.register({
    name: "custom-tag",
    plugin: "custom-tag",
    type: "json",
    inputSize: {
      // optional
      default: 4,
      isResizable: true,
    },
  });
};
