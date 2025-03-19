"use strict";

module.exports = ({ strapi }) => ({
  async findList(ctx) {
    const list = await strapi
        .plugin("custom-tag")
        .service("customTagService")
        .findList(ctx.request);
    ctx.body = list; // 设置响应体
  },

  async findOne(ctx) {
    const info = await strapi
        .plugin("custom-tag")
        .service("customTagService")
        .findOne(ctx.request);
    ctx.body = info; // 设置响应体
  },
});
