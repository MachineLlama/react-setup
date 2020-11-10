module.exports = function(name) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${name}</title>
  </head>

  <body>
    <noscript>You need to enable JavaScript to run this app</noscript>
    <div id="app"></div>
  </body>
</html>
`;
}
