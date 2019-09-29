// compiler钩子参考链接   https://www.webpackjs.com/api/compiler-hooks/
class entryOptionPlugin {
	constructor(options){

	}
	apply(compiler){
		compiler.hooks.entryOption.tap('entryOptionPlugin',function(options){
			console.log("参数解析完毕...")
    });
    // 可以打印出所有的钩子,注意这里是我自己实现的钩子只有简单几个，官网上给出了所有钩子
    // for (var hook of Object.keys(compiler.hooks)) {
    //   console.log(hook);
    // }
	}
}

module.exports = entryOptionPlugin;


/* 
  1.从表现上看，Compiler暴露了和webpack整个生命周期相关的钩子，通过如下的方式访问:
  //基本写法
  compiler.hooks.someHook.tap(...)
  //如果希望在entry配置完毕后执行某个功能
  compiler.hooks.entryOption.tap(...)
  //如果希望在生成的资源输出到output指定目录之前执行某个功能
  compiler.hooks.emit.tap(...)

  2.根据webpack官方文档的说明，一个自定义的plugin需要包含：
    一个javascript命名函数
    插件函数的prototype上要有一个apply方法
    指定一个绑定到webpack自身的事件钩子
    注册一个回调函数来处理webpack实例中的指定数据
    处理完成后调用webpack提供的回调
  官网给出了一个基本的结构示例：
    //console-log-on-build-webpack-plugin.js
    const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
    class ConsoleLogOnBuildWebpackPlugin {
      apply(compiler){
          compiler.hooks.run.tap(pluginName, compilation=>{
              console.log('webpack构建过程开始');
          });
      }
    }

  3.比较重要的两个钩子Compilation 实例继承于 compiler例如，compiler.compilation 是对
  所有 require 图(graph)中对象的字面上的编译。这个对象可以访问所有的模块和它们的依赖（大部
  分是循环依赖）。在编译阶段，模块被加载，封闭，优化，分块，哈希和重建等等。这将是任何编译操作
  中，重要的生命周期
    compiler 对象代表的是不变的webpack环境，是针对webpack的
    compilation 对象针对的是随时可变的项目文件，只要文件有改动，compilation就会被重新创建
*/