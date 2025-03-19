"use strict";

const plugin = "plugin::custom-tag.custom-tag";
const fields = ["id", "name", "textColor", "bgColor"];
module.exports = ({ strapi }) => ({
  async findList(request) {
    const { name } = request.query;

    // 构建查询参数
    const filters = {
      publishedAt: { $notNull: true },
      ...(name && { name: { $contains: name } }), // 如果 name 存在，添加 name 的过滤条件
    };

    return await strapi.entityService.findMany(plugin, {
      fields: fields,
      filters,
      sort: { publishedAt: "desc" },
    });
  },

  async findOne(request) {
    const { id } = request.query;
    return await strapi.entityService.findOne(plugin, id, {
      fields: fields,
      filters: {
        publishedAt: {
          $notNull: true, // 仅查询已发布的条目
        },
      },
    });
  },
});
