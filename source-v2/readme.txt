FComponent 组件
FControl 控件
   CreateChild -> Countruct
   PropertyLoad
   Build
   Push -> AppendChild
FContainer 容器
FLayout 布局
FForm 表单
FTable 表格

Base Control: 基础控件功能 (Check/Radio/Number/Edit...)
Data Control: 数据控件功能 (DataCheck/DataRadio/DataNumber/DataEdit...)

内容        内容管道             资源
FContent -> FContentPipeline - > FResource
            FPipeline

FContentConsole： 内容管理
FPipelineConsole：管道管理
FResourceConsole：资源管理

资源为加工后的内容

Resource：资源管理空间
   - 一个资源一个管理
   - BitmapResource
   - TextureResource
   - ModelResource
   - ThemeResource
   - MaterialResource
   - TemplateResource
   - SceneResource

Renderable：渲染对象管理空间
   - 1个渲染对象一个存储

Display：显示空间
   - 屏幕显示内容


舞台
Stage
   - Technique [选择渲染技术]
   - Camera 相机
   - Light 光源
   - DisplayLayer
      - FDisplayContainer
         - FDisplay
            - FRenderable
             . effectName 选择效果器
RStage.stages

获得渲染对象集合
filterRenderables()

渲染流程
送入 RenderTechnique 进行渲染
   分成多次 RenderPass
      数据进行材质等分组
      交给 RenderPipeline
         交给 RenderEffect 最终渲染

数据都进入
FRenderPipeline

FRenderEffect
