const config = require('../../config');

module.exports = function() {
  return `{
  "name": "${config.manifest.name}",
  "short_name": "${config.manifest.shortName}",
  "description": "${config.manifest.description}",
  "start_url": "${config.manifest.startURL}",
  "icons": "${config.manifest.icons}",
  "theme_color": "${config.manifest.themeColor}",
  "background_color": "${config.manifest.backgroundColor}",
  "display": "${config.manifest.display}",
  "orientation": "${config.manifest.orientation}"
}
`;
}
