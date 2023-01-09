export const server = () => {
  app.plugins.browsersync.init({
    open: false,
    server: {
      baseDir: `${app.path.build.html}`,
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
    port: 3000,
  });
};
