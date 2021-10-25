const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  basePath: '/LSDE_2021_W4',
  assetPrefix: isProd ? '/LSDE_2021_W4' : '',
  reactStrictMode: true,
}
