module.exports = {
  staticFileGlobs: ["src/**/*", "manifest.json", "res/**/*"],
  runtimeCaching: [
    {
      urlPattern: /\/@webcomponents\/webcomponentsjs\//,
      handler: "fastest"
    }
  ]
};
