
若是clone code 之后运行不成功，可能会缺少文件
根目录下新建文件

.babelrc
内容如下:
{
    "presets": [
        ["env", {
        "modules": false,
        "targets": {
            "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        }
        }],
        "stage-2"
    ],
    "plugins": ["transform-runtime"],
    "env": {
        "test": {
        "presets": ["env", "stage-2"],
        "plugins": ["istanbul"]
        }
    }
}

.editorconfig
内容如下:
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true

.eslintignore
内容如下:
build/*.js
config/*.js

.eslintrc.js
内容如下:
// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
      sourceType: 'module'
    },
    env: {
      browser: false,
      node: true,
      es6: true
    },
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
      'html'
    ],
    // add your custom rules here
    'rules': {
      // allow paren-less arrow functions
      'arrow-parens': 0,
      // allow async-await
      'generator-star-spacing': 0,
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    },
    globals: {
      App: true,
      Page: true,
      wx: true,
      getApp: true,
      getPage: true
    }
  }

.gitignore
内容如下:
.DS_Store
node_modules/
dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.idea
*.suo
*.ntvs*
*.njsproj
*.sln

.postcssrc.js
内容如下:
// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    "plugins": {
      // to edit target browsers: use "browserslist" field in package.json
      "autoprefixer": {},
      "postcss-mpvue-wxss": {}
    }
  }
  

  