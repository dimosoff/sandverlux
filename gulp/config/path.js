import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./build`;
const srcFolder = `./src`;

export const path = {
  build: {
    html: `${buildFolder}/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
    styles: `${buildFolder}/styles/`,
    images: `${buildFolder}/images/`,
    favicon: `${buildFolder}/images/favicon/`,
    scripts: `${buildFolder}/scripts/`,
  },
  src: {
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/scss/styles.scss`,
    fonts: `${srcFolder}/fonts/**/*.ttf`,
    files: `${srcFolder}/files/**/*.*`,
    images: [
      `${srcFolder}/images/**/*.{jpg,jpeg,png,svg}`,
      `!${srcFolder}/images/favicon/**`,
    ],
    imagesWebp: `${srcFolder}/images/**/*.{jpg,jpeg}`,
    favicon: `${srcFolder}/images/favicon/**/*.*`,
    scripts: `${srcFolder}/scripts/main.js`,
    svgs: `${srcFolder}/svg/*.svg`,
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/scss/*.scss`,
    files: `${srcFolder}/files/**/*.*`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,webp,ico,svg}`,
    scripts: `${srcFolder}/scripts/*.js`,
  },
  clean: [
    `${buildFolder}/**`,
    `!${buildFolder}/fonts/**`,
    `!${buildFolder}/images/**`,
    `${buildFolder}/images/**.*`,
    `!${buildFolder}/images/stack/`,
    `!${buildFolder}/images/icons.svg`,
  ],
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
};
