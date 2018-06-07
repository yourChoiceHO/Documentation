const path = require('path');
const fs = require('fs');

const lessToJs = require('less-vars-to-js');
const { injectBabelPlugin } = require('react-app-rewired');
const { withLoaderOptions } = require('react-app-rewire-less-modules');
const rewireVendorSplitting = require('react-app-rewire-vendor-splitting');
const { compose, assocPath } = require('ramda');

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/themes/default.less'), 'utf-8'));

const rewireAntd = config =>
  injectBabelPlugin(
    ['import', { libraryName: 'antd', style: true, libraryDirectory: 'es' }],
    config
  );

const rewireLessModules = ({ modifyVars }) =>
  withLoaderOptions('', {
    modifyVars,
  });

const rewireResolveAlias = assocPath(['resolve', 'alias', '@app'], path.resolve(__dirname, 'src'));

module.exports = (config, env) => {
  const rewires = compose(
    rewireResolveAlias,
    rewireVendorSplitting,
    rewireLessModules({ modifyVars: themeVariables }),
    rewireAntd
  );

  return rewires(config, env);
};
