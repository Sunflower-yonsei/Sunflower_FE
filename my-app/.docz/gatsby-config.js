const { mergeWith } = require('docz-utils')
const fs = require('fs-extra')

let custom = {}
const hasGatsbyConfig = fs.existsSync('./gatsby-config.custom.js')

if (hasGatsbyConfig) {
  try {
    custom = require('./gatsby-config.custom')
  } catch (err) {
    console.error(
      `Failed to load your gatsby-config.js file : `,
      JSON.stringify(err),
    )
  }
}

const config = {
  pathPrefix: '/',

  siteMetadata: {
    title: 'My App',
    description: 'My awesome app using docz',
  },
  plugins: [
    {
      resolve: 'gatsby-theme-docz',
      options: {
        themeConfig: {},
        src: './',
        gatsbyRoot: null,
        themesDir: 'src',
        mdxExtensions: ['.md', '.mdx'],
        docgenConfig: {},
        menu: [],
        mdPlugins: [],
        hastPlugins: [],
        ignore: [],
        typescript: false,
        ts: false,
        propsParser: true,
        'props-parser': true,
        debug: false,
        native: false,
        openBrowser: null,
        o: null,
        open: null,
        'open-browser': null,
        root: '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app/.docz',
        base: '/',
        source: './',
        'gatsby-root': null,
        files: '**/*.{md,markdown,mdx}',
        public: '/public',
        dest: '.docz/dist',
        d: '.docz/dist',
        editBranch: 'master',
        eb: 'master',
        'edit-branch': 'master',
        config: '',
        title: 'My App',
        description: 'My awesome app using docz',
        host: 'localhost',
        port: 3000,
        p: 3000,
        separator: '-',
        paths: {
          root: '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app',
          templates:
            '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app/node_modules/docz-core/dist/templates',
          docz:
            '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app/.docz',
          cache:
            '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app/.docz/.cache',
          app:
            '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app/.docz/app',
          appPackageJson:
            '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app/package.json',
          appTsConfig:
            '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app/tsconfig.json',
          gatsbyConfig:
            '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app/gatsby-config.js',
          gatsbyBrowser:
            '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app/gatsby-browser.js',
          gatsbyNode:
            '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app/gatsby-node.js',
          gatsbySSR:
            '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app/gatsby-ssr.js',
          importsJs:
            '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app/.docz/app/imports.js',
          rootJs:
            '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app/.docz/app/root.jsx',
          indexJs:
            '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app/.docz/app/index.jsx',
          indexHtml:
            '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app/.docz/app/index.html',
          db:
            '/Users/junhyeongpark/Documents/GitHub/Sunflower_FE/my-app/.docz/app/db.json',
        },
      },
    },
  ],
}

const merge = mergeWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
})

module.exports = merge(config, custom)
