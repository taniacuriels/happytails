const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = {
  watchFolders: [
    path.resolve(workspaceRoot, 'packages/auth'),
    path.resolve(workspaceRoot, 'packages/messaging'),
    path.resolve(workspaceRoot, 'packages/domain'),
    path.resolve(workspaceRoot, 'packages/design-tokens'),
    path.resolve(workspaceRoot, 'packages/scheduling'),
    path.resolve(workspaceRoot, 'packages/notifications'),
  ],
  resolver: {
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
