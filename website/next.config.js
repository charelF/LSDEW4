const isProd = process.env.NODE_ENV === 'production'

module.exports = process.env.EXPORT_MODE === 'submission' ? {
  env: {
    NEXT_PUBLIC_EXPORT_MODE: "submission",
  },
  reactStrictMode: true,
} : {
  env: {
    NEXT_PUBLIC_EXPORT_MODE: "github",
  },
  basePath: '/LSDE_2021_W4',
  assetPrefix: isProd ? '/LSDE_2021_W4' : '',
  reactStrictMode: true,
}
