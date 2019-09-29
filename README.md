## sourcePack
### `模仿webpack 基本编译原理  试写一个模块打包工具 `

## 整体思路：
* 初始化参数：从配置文件 和 Shell 语句中读取与合并参数，得出最终的参数； 
* 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
* 确定入口：根据配置中的 entry 找出所有的入口文件；
* 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归此步骤直到所有入口依赖的文件都经过了处理；
* 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
* 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
* 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

## webpack 中的 hooks
* entryOption 读取配置文件
* afterPlugins 加载所有的插件
* run 开始执行编译流程
* compile 开始编译
* afterCompile 编译完成
* emit 写入文件
* done 完成整体流程

##具体实现步骤：
* 1  新建两个目录 `sourcepack`(自实现打包工具目录) 和 `usewebpack`(模拟项目目录);

`usewebpack 的目录结构如下`

```
├── src                      # 源码目录
│   ├── a                    # 模块代码
│   ├── loaders              # 存放自己实现的loadder文件
│   ├── plugins              # 存放自己实现的plugin文件
│   ├── index.js             # 入口文件
│   ├── index.less           # less文件
├── webpack.config.json      # webpack 配置文件
├── package.json             # 项目描述
```

`sourcepack 的目录结构如下`

```
├── bin                      # 主文件目录
│   ├── sourcepack.js        # 主文件
├── lib                      # 工具类目录
│   ├── compiler.js          # compiler 类
│   ├── main.ejs             # ejs 模版
├── package.json             # 项目描述
```

1, 分别进入sourcepack和usepack文件夹npm install

2, 执行 `npm link ` 建立软连接,是sourcepack命令全局化
npm ls --global sourcepack  可以查看sourcepack命令是否存在
sudo npm rm --global sourcepack 可以删除sourcepack命令

3, 在usewebpack 目录执行sourcepack 命令从而打出bundle包

* 可以在dist目录新建index.html引用此包验证下是否成功
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<h1>sourcePack</h1>
	<script src="./bundle.js"></script>
</body>
</html>

```
