import { prefixPluginTranslations } from "@strapi/helper-plugin";
import pluginPkg from "../../package.json";
import pluginId from "./pluginId";
import PluginIcon from "./components/PluginIcon";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.customFields.register({
      name: "custom-tag",
      pluginId: pluginId, // the custom field is created by a color-picker plugin
      type: "json", // the color will be stored as a string
      intlLabel: {
        id: `${pluginId}.${name}.label`,
        defaultMessage: "Custom Tag",
      },
      intlDescription: {
        id: `${pluginId}.${name}.description`,
        defaultMessage: "Add multiple custom tags makes content more flexible",
      },
      // icon: ColorPickerIcon, // don't forget to create/import your icon component
      components: {
        Input: async () => import(`./components/TagSelector`),
      },
      options: {
        // declare options here
      },
    });
  },
};
