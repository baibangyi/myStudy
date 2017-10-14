# Webpack
[toc]
## 安装
npm install webpack --save-dev

## 起步 配置文件

    const path = require('path');
    
    module.exports = {
     //入口
      entry: './src/index.js',
      //出口
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
      }
    };
    
## NPM 脚本
在 package.json 添加一个 npm 脚本(npm script)

    {
      ...
      "scripts": {
        "build": "webpack"
      },
      ...
      //现在可以使用npm run build 代替 较长命令
    }

## 资源管理
### 加载css 
1.安装依赖 

> npm install --save-dev style-loader css-loader

2.在 module 配置中 安装并添加 style-loader 和 css-loader

    const path = require('path');
    
      module.exports = {
        entry: './src/index.js',
        output: {
          filename: 'bundle.js',
          path: path.resolve(__dirname, 'dist')
        },
    +   module: {
    +     rules: [
    +       {
    +         test: /\.css$/,
    +         use: [
    +           'style-loader',
    +           'css-loader'
    +         ]
    +       }
    +     ]
    +   }
      };
      
### 加载图片
1.安装依赖

> npm install --save-dev file-loader

2.在 module 配置中 安装并添加file-loader

    module: {
          rules: [
            {
              test: /\.css$/,
              use: [
                'style-loader',
                'css-loader'
              ]
            },
    +       {
    +         test: /\.(png|svg|jpg|gif)$/,
    +         use: [
    +           'file-loader'
    +         ]
    +       }
          ]
        }

### 其他资源管理依赖详见[这里][1]


  [1]: https://doc.webpack-china.org/guides/asset-management/
  
 ## 安装插件
 1.安装依赖

> npm install --save-dev html-webpack-plugin

2.调整 webpack.config.js 文件

    const path = require('path');
    + const HtmlWebpackPlugin = require('html-webpack-plugin');
    
      module.exports = {
        entry: {
          app: './src/index.js',
          print: './src/print.js'
        },
    +   plugins: [
    +     new HtmlWebpackPlugin({
    +       title: 'Output Management'
    +     })
    +   ],
        output: {
          filename: '[name].bundle.js',
          path: path.resolve(__dirname, 'dist')
        }
      };
      
3.执行 npm run build

## 清理/dist 文件
1.安装清理插件

> npm install clean-webpack-plugin --save-dev

2.配置

    const path = require('path');
      const HtmlWebpackPlugin = require('html-webpack-plugin');
    + const CleanWebpackPlugin = require('clean-webpack-plugin');
    
      module.exports = {
        entry: {
          app: './src/index.js',
          print: './src/print.js'
        },
        plugins: [
    +     new CleanWebpackPlugin(['dist']),
          new HtmlWebpackPlugin({
            title: 'Output Management'
          })
        ],
        output: {
          filename: '[name].bundle.js',
          path: path.resolve(__dirname, 'dist')
        }
      };
      
## 开发
### 使用 source map追踪错误和警告

    const path = require('path');
      const HtmlWebpackPlugin = require('html-webpack-plugin');
      const CleanWebpackPlugin = require('clean-webpack-plugin');
    
      module.exports = {
        entry: {
          app: './src/index.js',
          print: './src/print.js'
        },
    +   devtool: 'inline-source-map',
        plugins: [
          new CleanWebpackPlugin(['dist']),
          new HtmlWebpackPlugin({
            title: 'Development'
          })
        ],
        output: {
          filename: '[name].bundle.js',
          path: path.resolve(__dirname, 'dist')
        }
      };
      //使用npm run build运行后，追踪错误
      
### 使用观察模式
在package.json文件中修改
 

     {
        "name": "development",
        "version": "1.0.0",
        "description": "",
        "main": "webpack.config.js",
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1",
    +     "watch": "webpack --watch",
          "build": "webpack"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "devDependencies": {
          "clean-webpack-plugin": "^0.1.16",
          "css-loader": "^0.28.4",
          "csv-loader": "^2.1.1",
          "file-loader": "^0.11.2",
          "html-webpack-plugin": "^2.29.0",
          "style-loader": "^0.18.2",
          "webpack": "^3.0.0",
          "xml-loader": "^1.2.1"
        }
      }
      //在命令行中运行 npm run watch 运行后不会退出命令行，因为 script 脚本还在观察文件
      
## 使用 webpack-dev-server 自动刷新浏览器
1.安装依赖

> npm install --save-dev webpack-dev-server

2.修改配置
 

    const path = require('path');
      const HtmlWebpackPlugin = require('html-webpack-plugin');
      const CleanWebpackPlugin = require('clean-webpack-plugin');
    
      module.exports = {
        entry: {
          app: './src/index.js',
          print: './src/print.js'
        },
        devtool: 'inline-source-map',
    +   devServer: {
    +     contentBase: './dist'
    +   },
        plugins: [
          new CleanWebpackPlugin(['dist']),
          new HtmlWebpackPlugin({
            title: 'Development'
          })
        ],
        output: {
          filename: '[name].bundle.js',
          path: path.resolve(__dirname, 'dist')
        }
      };
      //以上配置告知 webpack-dev-server，在 localhost:8080 下建立服务，将 dist 目录下的文件，作为可访问文件
      
3.修改script脚本，可以直接运行开发服务器(dev server)

    "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1",
          "watch": "webpack --progress --watch",
    +     "start": "webpack-dev-server --open",
          "build": "webpack"
        },
        //在命令行中运行 npm start，就会看到浏览器自动加载页面。如果现在修改和保存任意源文件，web 服务器就会自动重新加载编译后的代码
        
## 热更新HMR
### 什么是热更新

> 模块热替换功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面

### 启用HMR
更新 webpack-dev-server 的配置，和使用 webpack 内置的 HMR 插件
 

     const path = require('path');
      const HtmlWebpackPlugin = require('html-webpack-plugin');
    + const webpack = require('webpack');
    
      module.exports = {
        entry: {
    -      app: './src/index.js',
    -      print: './src/print.js'
    +      app: './src/index.js'
        },
        devtool: 'inline-source-map',
        devServer: {
          contentBase: './dist',
    +     hot: true
        },
        plugins: [
          new HtmlWebpackPlugin({
            title: 'Hot Module Replacement'
          }),
    +     new webpack.HotModuleReplacementPlugin()
        ],
        output: {
          filename: '[name].bundle.js',
          path: path.resolve(__dirname, 'dist')
        }
      };
      //也可以通过命令来修改 webpack-dev-server 的配置：webpack-dev-server --hotOnly  最后命令行中运行 npm start 查看运行结果
      
### HMR 修改样式表
1当更新 CSS 依赖模块时，此 loader 在后台使用 module.hot.accept 来修补(patch) <style> 标签  命令安装两个 loader 

> npm install --save-dev style-loader css-loader

2.更新 webpack 的配置，让这两个 loader 生效

    const path = require('path');
      const HtmlWebpackPlugin = require('html-webpack-plugin');
      const webpack = require('webpack');
    
      module.exports = {
        entry: {
          app: './src/index.js'
        },
        devtool: 'inline-source-map',
        devServer: {
          contentBase: './dist',
          hot: true
        },
    +   module: {
    +     rules: [
    +       {
    +         test: /\.css$/,
    +         use: ['style-loader', 'css-loader']
    +       }
    +     ]
    +   },
        ....
    };

## Tree Shaking
### 什么是 Tree Shaking

> tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)，它依赖于 ES2015 模块系统中的静态结构特性，例如 import 和 export

### 添加一个通用模块
在项目中添加一个新的通用模块文件 src/math.js，此文件导出两个函数：

    export function square(x) {
      return x * x;
    }
    
    export function cube(x) {
      return x * x * x;
    }
    
接着，更新入口脚本，使用其中一个新方法，并且为了简单，将 lodash 删除：

    - import _ from 'lodash';
    + import { cube } from './math.js';
    //并未从 src/math.js 模块中 import 导入 square 方法。这个功能是所谓的“未引用代码(dead code)”
    
      function component() {
    -   var element = document.createElement('div');
    +   var element = document.createElement('pre');
    
    -   // lodash 是由当前 script 脚本 import 导入进来的
    -   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    +   element.innerHTML = [
    +     'Hello webpack!',
    +     '5 cubed is equal to ' + cube(5)
    +   ].join('\n\n');
    
        return element;
      }
    
      document.body.appendChild(component());
      //运行我们的npm 脚本 npm run build，并检查输出的 bundle

### 精简输出
通过 import and export 语法，标识出了那些“未引用代码(dead code)”，但仍然需要从 bundle 中删除它们。要做到这一点，我们将添加一个能够删除未引用代码(dead code)的压缩工具(minifier) - UglifyJSPlugin - 在配置对象中添加……

1.安装依赖

> npm i --save-dev uglifyjs-webpack-plugin

2.修改配置文件

    const path = require('path');
    + const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
    
    module.exports = {
      entry: './src/index.js',
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    - }
    + },
    + plugins: [
    +   new UglifyJSPlugin()
    + ]
    };
3.运行另一个命令 npm run build

## 生产环境构建
### 开发环境

> 在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或热模块替换(hot module replacement)能力的 source map 和 localhost server

### 生产环境

> 在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置

我们还是会遵循不重复原则(Don't repeat yourself - DRY)，保留一个“通用”配置。为了将这些配置合并在一起，我们将使用一个名为 webpack-merge 的工具。通过“通用”配置，我们不必在环境特定(environment-specific)的配置中重复代码

1.安装依赖

> npm install --save-dev webpack-merge

2.添加/删除文件
  

    webpack-demo
      |- package.json
    - |- webpack.config.js
    + |- webpack.common.js
    + |- webpack.dev.js
    + |- webpack.prod.js
      |- /dist
      |- /src
        |- index.js
        |- math.js
      |- /node_modules
      
webpack.common.js

    + const path = require('path');
    + const CleanWebpackPlugin = require('clean-webpack-plugin');
    + const HtmlWebpackPlugin = require('html-webpack-plugin');
    + //公共配置，定义入/出口，安装插件
    + module.exports = {
    +   entry: {
    +     app: './src/index.js'
    +   },
    +   plugins: [
    +     new CleanWebpackPlugin(['dist']),
    +     new HtmlWebpackPlugin({
    +       title: 'Production'
    +     })
    +   ],
    +   output: {
    +     filename: '[name].bundle.js',
    +     path: path.resolve(__dirname, 'dist')
    +   }
    + };

webpack.dev.js

    + const merge = require('webpack-merge');
    + const common = require('./webpack.common.js');
    + //使用merge合并配置，此处添加了跟踪错误的配置
    + module.exports = merge(common, {
    +   devtool: 'inline-source-map',
    +   devServer: {
    +     contentBase: './dist'
    +   }
    + });
    
webpack.prod.js

    + const merge = require('webpack-merge');
    + const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
    + const common = require('./webpack.common.js');
    + //此处添加了压缩代码的配置
    + module.exports = merge(common, {
    +   plugins: [
    +     new UglifyJSPlugin()
    +   ]
    + });

3.把 scripts 重新指向到新配置。我们将 npm start 定义为开发环境脚本，并在其中使用 

    webpack-dev-server，将 npm run build 定义为生产环境脚本
    "scripts": {
    -     "start": "webpack-dev-server --open",
    +     "start": "webpack-dev-server --open --config webpack.dev.js",
    -     "build": "webpack"
    +     "build": "webpack --config webpack.prod.js"
        },
        
### source map
在生产环境中启用 source map，因为它们对调试源码(debug)和运行基准测试(benchmark tests)很有帮助

     const merge = require('webpack-merge');
      const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
      const common = require('./webpack.common.js');
    
      module.exports = merge(common, {
    +   devtool: 'source-map',
        plugins: [
    -     new UglifyJSPlugin()
    +     new UglifyJSPlugin({
    +       sourceMap: true
    +     })
        ]
      })
    
### CLI 替代选项
以上描述也可以通过命令行实现。例如，--optimize-minize 标记将在后台引用 UglifyJSPlugin

## 代码分离

> 此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间

### 入口起点
最简单、最直观的分离代码的方式。不过，这种方式手动配置较多，并有一些陷阱，我们将会解决这些问题，先看看如何从 main bundle 中分离另一个模块

项目结构

    webpack-demo
    |- package.json
    |- webpack.config.js
    |- /dist
    |- /src
      |- index.js
    + |- another-module.js
    |- /node_modules
    
another-module.js

    import _ from 'lodash';
    
    console.log(
      _.join(['Another', 'module', 'loaded!'], ' ')
    );
    
webpack.config.js

    const path = require('path');
    const HTMLWebpackPlugin = require('html-webpack-plugin');
    
    module.exports = {
      entry: {
        index: './src/index.js',
        another: './src/another-module.js'
      },
      plugins: [
        new HTMLWebpackPlugin({
          title: 'Code Splitting'
        })
      ],
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
      }
    };


### 防止重复(prevent duplication)
在 ./src/index.js  和 ./src/another-module.js 引入过 lodash，这样就在两个 bundle 中造成重复引用。可通过使用 CommonsChunkPlugin 来移除重复的模块，CommonsChunkPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk

webpack.config.js

    const path = require('path');
    + const webpack = require('webpack');
      const HTMLWebpackPlugin = require('html-webpack-plugin');
    
      module.exports = {
        entry: {
          index: './src/index.js',
          another: './src/another-module.js'
        },
        plugins: [
          new HTMLWebpackPlugin({
            title: 'Code Splitting'
    -     })
    +     }),
    +     new webpack.optimize.CommonsChunkPlugin({
    +       name: 'common' // 指定公共 bundle 的名称。
    +     })
        ],
        output: {
          filename: '[name].bundle.js',
          path: path.resolve(__dirname, 'dist')
        }
      };

执行 npm run build 查看效果

    Hash: 70a59f8d46ff12575481
    Version: webpack 2.6.1
    Time: 510ms
                Asset       Size  Chunks                    Chunk Names
      index.bundle.js  665 bytes       0  [emitted]         index
    another.bundle.js  537 bytes       1  [emitted]         another
     common.bundle.js     547 kB       2  [emitted]  [big]  common
       [0] ./~/lodash/lodash.js 540 kB {2} [built]
       [1] (webpack)/buildin/global.js 509 bytes {2} [built]
       [2] (webpack)/buildin/module.js 517 bytes {2} [built]
       [3] ./src/another-module.js 87 bytes {1} [built]
       [4] ./src/index.js 216 bytes {0} [built]
       
### 动态导入(dynamic imports)

> 当涉及到动态代码拆分时，webpack 提供了两个类似的技术。对于动态导入，第一种，也是优先选择的方式是，使用符合 ECMAScript 提案 的 import() 语法。第二种，则是使用 webpack 特定的 require.ensure

webpack.config.js

     //从配置中移除掉多余的 entry 和 CommonsChunkPlugin，因为接下来的演示中并不需要它们
     const path = require('path');
    - const webpack = require('webpack');
      const HTMLWebpackPlugin = require('html-webpack-plugin');
    
      module.exports = {
        entry: {
    +     index: './src/index.js'
    -     index: './src/index.js',
    -     another: './src/another-module.js'
        },
        plugins: [
          new HTMLWebpackPlugin({
            title: 'Code Splitting'
    -     }),
    +     })
    -     new webpack.optimize.CommonsChunkPlugin({
    -       name: 'common' // 指定公共 bundle 的名称。
    -     })
        ],
        output: {
          filename: '[name].bundle.js',
    +     chunkFilename: '[name].bundle.js',//决定非入口 chunk 的名称
          path: path.resolve(__dirname, 'dist')
        }
      };
      //还需再删除another-module.js文件
      
不再使用静态导入 lodash，而是通过使用动态导入来分离一个 chunk

src/index.js

    - import _ from 'lodash';
    -
    - function component() {
    + function getComponent() {
    -   var element = document.createElement('div');
    -
    -   // Lodash, now imported by this script
    -   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    +   return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
    +     var element = document.createElement('div');
    +
    +     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    +
    +     return element;
    +
    +   }).catch(error => 'An error occurred while loading the component');
      }
    
    - document.body.appendChild(component());
    + getComponent().then(component => {
    +   document.body.appendChild(component);
    + })
    //注意，在注释中使用了 webpackChunkName。这样做会导致我们的 bundle 被命名为 lodash.bundle.js ，而不是 [id].bundle.js
    
## bundle 分析(bundle analysis)

> 如果我们以分离代码作为开始，那么就以检查模块作为结束，分析输出结果是很有用处的。官方分析工具
> 是一个好的初始选择。下面是一些社区支持(community-supported)的可选工具：
> 
> webpack-chart: webpack 数据交互饼图。 webpack-visualizer: 可视化并分析你的
> bundle，检查哪些模块占用空间，哪些可能是重复使用的。 webpack-bundle-analyzer: 一款分析 bundle
> 内容的插件及 CLI 工具，以便捷的、交互式、可缩放的树状图形式展现给用户

## 懒加载

> 懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载



      


