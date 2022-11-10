import browserSync from "browser-sync";
import newer from "gulp-newer";
import debug from "gulp-debug";
import gulpIf from "gulp-if";

export const plugins = {
  browsersync: browserSync,
  newer: newer,
  debug: debug,
  if: gulpIf,
};
