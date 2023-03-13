const path = require("path");

function injectEnv(definitions) {
  const env = "process.env";

  if (!definitions[env]) {
    return {
      ...definitions,
      [env]: JSON.stringify(
        Object.fromEntries(
          Object.entries(definitions)
            .filter(([key]) => key.startsWith(env))
            .map(([key, value]) => [
              key.substring(env.length + 1),
              JSON.parse(value),
            ]),
        ),
      ),
    };
  }
  return definitions;
}

module.exports = {
  stories: [
    "../src/storybook/**/*.stories.mdx",
    "../src/storybook/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-essentials",
    },
  ],
  typescript: {
    check: false,
  },
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    const definePlugin = config.plugins.find(
      ({ constructor }) => constructor && constructor.name === "DefinePlugin",
    );
    if (definePlugin) {
      definePlugin.definitions = injectEnv(definePlugin.definitions);
    }

    // Make whatever fine-grained changes you need
    config.module.rules.push(
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          // "sass-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: `
              @import "src/assets/scss/variables.scss";
            `,
            },
          },
        ],
        include: path.resolve(__dirname, "../"),
      },
      {
        test: /\.sass$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                indentedSyntax: true,
              },
            },
          },
        ],
        include: path.resolve(__dirname, "../"),
      },
    );

    // console.log(
    //   config.module.rules,
    //   // config.module.rules.find((conf) => conf.test.include("ts")),
    //   "----------------------------------------------------------"
    // );

    const adminPath = path.resolve(__dirname, "../src");

    config.resolve.alias["@"] = adminPath;
    console.log(adminPath, "++++");
    return config;
  },
};
