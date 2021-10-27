const { override, fixBabelImports, addWebpackAlias } = require('customize-cra')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
/* 路径别名配置 */
module.exports = override(
  addWebpackAlias({
    '@': resolve('src'),
    components: resolve('./src/components'),
    assets: resolve('./src/assets'),
    pages: resolve('./src/pages'),
    utils: resolve('./src/utils'),
  }),
  /* antd组件按需加载 */
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
);