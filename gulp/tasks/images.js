import webp from "gulp-webp";
import pngquant from "imagemin-pngquant";
import imagemin, { mozjpeg, svgo } from "gulp-imagemin";

export const imagesWebp = () => {
  return (
    app.gulp
      .src(app.path.src.imagesWebp)
      // .pipe(app.plugins.newer(app.path.build.images))
      .pipe(
        webp({
          quality: 85,
          alphaQuality: 80,
          sharpness: 0,
        })
      )
      .pipe(app.gulp.dest(app.path.build.images))
  );
};

export const images = () => {
  return (
    app.gulp
      .src(app.path.src.images)
      // .pipe(app.plugins.debug({ title: "Image after:" }))
      .pipe(app.plugins.newer(app.path.build.images))
      .pipe(
        imagemin(
          [
            mozjpeg({
              //revert: true,
              quality: 75,
              smooth: 0,
              quantTable: 7,
              trellis: true,
              trellisDC: true,
            }),
            svgo({
              plugins: [
                { name: "removeViewBox", active: false },
                { name: "cleanupIDs", active: false },
                { name: "removeDoctype", active: true },
                { name: "removeXMLProcInst", active: true },
                { name: "removeComments", active: true },
                { name: "removeMetadata", active: true },
                { name: "removeXMLNS", active: false },
                { name: "removeEditorsNSData", active: true },
                { name: "cleanupAttrs", active: true },
                { name: "mergeStyles", active: true },
                { name: "inlineStyles", active: true },
                { name: "minifyStyles", active: true },
                { name: "convertStyleToAttrs", active: true },
                { name: "cleanupIDs", active: true },
                { name: "removeRasterImages", active: true },
                { name: "removeUselessDefs", active: true },
                { name: "cleanupNumericValues", active: true },
                { name: "cleanupListOfValues", active: false },
                { name: "convertColors", active: true },
                { name: "removeUnknownsAndDefaults", active: true },
                { name: "removeNonInheritableGroupAttrs", active: true },
                { name: "removeUselessStrokeAndFill", active: true },
                { name: "removeViewBox", active: false },
                { name: "cleanupEnableBackground", active: true },
                { name: "removeHiddenElems", active: true },
                { name: "removeEmptyText", active: true },
                { name: "convertShapeToPath", active: true },
                { name: "moveElemsAttrsToGroup", active: true },
                { name: "moveGroupAttrsToElems", active: true },
                { name: "collapseGroups", active: false },
                { name: "convertPathData", active: true },
                { name: "convertEllipseToCircle", active: true },
                { name: "convertTransform", active: true },
                { name: "removeEmptyAttrs", active: true },
                { name: "removeEmptyContainers", active: true },
                { name: "mergePaths", active: true },
                { name: "removeUnusedNS", active: true },
                { name: "reusePaths", active: true },
                { name: "sortAttrs", active: true },
                { name: "sortDefsChildren", active: true },
                { name: "removeTitle", active: true },
                { name: "removeDesc", active: true },
                { name: "removeDimensions", active: false },
                { name: "removeStyleElement", active: false },
                { name: "removeScriptElement", active: true },
              ],
              multipass: false,
              floatPrecision: 3,
            }),
            pngquant({
              speed: 4,
              strip: true,
              quality: [0.3, 0.5],
              dithering: 1,
              verbose: true,
            }),
          ],
          {
            verbose: false, // extra details
          }
        )
      )
      .pipe(app.gulp.dest(app.path.build.images))
      .pipe(app.plugins.if(app.isDev, app.plugins.browsersync.stream()))
  );
};
