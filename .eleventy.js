module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("img");
  return {
    templateFormats: ["ejs"],
    dir: {
      input: "src",
      output: "build",
    },
    passthroughFileCopy: true,
  };
};
