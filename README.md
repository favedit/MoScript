MoScript
=======

JavaScript 3D Engine

http://www.microbject.com

### 关于引擎

是一个完全纯HTML5的，带有完善的可视化编辑器的在线三维开发工具。

### 已经实现功能

- 渲染技术
   - WEBGL - 1.0

- 渲染管道：
   - 简单绘制：
      - VertexColor
      - AmbientColor
      - DiffuseColor / ViewDiffuseColor
      - SpecularColor / ViewSpecularColor
      - ReflectColor(Cube3d)
   - 阴影绘制：
      - ShadowMapColor (Processing...)
   - 后期处理：
      - Blur (Processing...)

- 渲染技术：
   - LZMA压缩数据，异步线程，分片加载。
   - 支持VBA技术 (VertexBufferArray)
   - 异步空间排序剔除
   - 异步动画播放（顶点动画/骨骼动画）
   - 实例绘制(支持移动设备)
   - 场景内根据材质动态空间网格(支持移动设备)

### 路线图

- 2014年12月，完成基础代码构架。
- 2015年03月，完成引擎渲染框架。
- 2015年06月，提供初步的可视化工具。
- 2015年09月，完善可视化工具，提供可用的场景编辑器，界面编辑器。
- 2015年12月，完善引擎，开始追求更高效率和效果。
- 2016年12月，支持WEBGL2.0相关技术。

### 结构说明

- config：配置内容。
- document：文档内容。
- library：工具库。
- source：代码文件

### 文档

正在准备中 ...
[GitHub Wiki](https://github.com/favedit/MoScript/wiki).

### 文件下载

暂无发布版本。

- 移动运行效果
![MoCross](/resource/device-pad-01.jpg)
![MoCross](/resource/device-android-01.jpg)
- 资源管理器
![MoCross](/resource/design-001.jpg)
- 场景编辑器
![MoCross](/resource/design-002.jpg)

### 更新

- 2015年05月07日 - 增加当前说明文档。

### 进行中

- 编辑器功能完善

### 计划功能

- 错误捕捉器，服务器自动收集。

### 关于

- favedit => Favorite Edit
- 网页 Stage3D CoolLight - 炫光引擎 的制作者。

### 加入
- 想做3D引擎的人可以联系加入。
