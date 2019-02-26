const stencil = require(`@stencil/core/server`);
const { renderToString } = require(`react-dom/server`);

let renderer;

exports.replaceRenderer = async function replaceRenderer({
  bodyComponent,
  replaceBodyHTMLString,
}) {
  // re-using the renderer here, you may not need to if this is cheap, or you don't want to re-use
  if (!renderer) {
    // no idea where this config should come from?
    // also needed to create nested www/ structure to get this to not fail out
    renderer = new stencil.Renderer(
      stencil.loadConfig({
        rootDir: process.cwd(),
      })
    );
  }

  // you may not even need document?
  // I'm not really sure how this works to be honest!
  // if you do, you can just renderToString, and then use domino (or whatever!) because we're invoking Node APIs at build time
  const { html } = await renderer.hydrateToString({
    html: renderToString(bodyComponent),
  });

  replaceBodyHTMLString(html);
};
