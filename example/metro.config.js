/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');
const packageRoot = path.resolve(__dirname, '../')

const extraNodeModules = new Proxy(
  {
    '@powerdesigninc/react-native-prompt': packageRoot,
  },
  {
    get: (target, name) => {
      if (target.hasOwnProperty(name)) {
        return target[name];
      }

      return path.join(__dirname, `node_modules/${name}`);
    }
  },
);

module.exports = {
  projectRoot: path.resolve(__dirname),
  resolver: {
    extraNodeModules,
    blacklistRE: require("metro-config/src/defaults/blacklist")([
      /android[\/\\].*/,
    ])
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      }
    }),
  },
  watchFolders: [
    packageRoot,
  ]
};
