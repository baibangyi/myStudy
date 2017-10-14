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


