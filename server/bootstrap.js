"use strict";

module.exports = async ({ strapi }) => {
    try {
        // 获取所有content types
        const contentTypes = Object.keys(strapi.contentTypes).filter((uid) =>
            uid.startsWith("api::")
        );

        // 创建枚举值数组
        const enumValues = [];

        // 修改枚举值
        contentTypes.forEach((uid) => {
            const contentType = strapi.contentTypes[uid];
            enumValues.push(contentType.modelName);
        });
        // 获取标签内容类型的schema
        const tagContentType = strapi.contentTypes["plugin::custom-tag.custom-tag"];

        // 如果标签内容类型存在且有contentType字段
        if (tagContentType && tagContentType.attributes.contentType) {
            // 如果contentType字段是枚举类型
            if (tagContentType.attributes.contentType.type === "enumeration") {
                // 更新枚举值
                tagContentType.attributes.contentType.enum = enumValues;

                strapi.log.info("已更新标签内容类型的content type枚举值");
            }
        }
    } catch (error) {
        strapi.log.error("更新content type枚举值时出错:", error);
    }
};
