with(MO){
   //==========================================================
   // <T>场景框架。</T>
   //
   // @class
   // @author maocy
   // @history 150121
   //==========================================================
   MO.FDsSceneFrameSet = function FDsSceneFrameSet(o){
      o = MO.Class.inherits(this, o, FDsFrameSet);
      //..........................................................
      // @attribute
      o._frameCatalog         = null;
      o._frameCatalogToolBar  = null;
      o._frameCatalogContent  = null;
      o._frameCanvas          = null;
      o._frameCanvasToolBar   = null;
      o._frameCanvasContent   = null;
      o._frameProperty        = null;
      o._framePropertyToolBar = null;
      o._framePropertyContent = null;
      //..........................................................
      // @process
      o.onBuilded             = FDsSceneFrameSet_onBuilded;
      o.onDataLoaded          = FDsSceneFrameSet_onDataLoaded;
      o.onCatalogSelected     = FDsSceneFrameSet_onCatalogSelected;
      //..........................................................
      // @method
      o.construct             = FDsSceneFrameSet_construct;
      // @method
      o.loadByGuid            = FDsSceneFrameSet_loadByGuid;
      o.loadByCode            = FDsSceneFrameSet_loadByCode;
      // @method
      o.dispose               = FDsSceneFrameSet_dispose;
      return o;
   }

   //==========================================================
   // <T>构建完成处理。</T>
   //
   // @method
   // @param event:TEventProcess 事件处理
   //==========================================================
   MO.FDsSceneFrameSet_onBuilded = function FDsSceneFrameSet_onBuilded(event){
      var o = this;
      o.__base.FDsFrameSet.onBuilded.call(o, event);
      //..........................................................
      // 设置样式
      o._frameCatalogToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._frameCatalogContent._hPanel.className = o.styleName('Catalog_Content');
      o._frameCanvasToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._frameCanvasContent._hPanel.className = o.styleName('Canvas_Content');
      o._framePropertyToolBar._hPanel.className = o.styleName('ToolBar_Ground');
      o._framePropertyContent._hPanel.className = o.styleName('Property_Content');
      //..........................................................
      // 设置分割
      var spliter = o._spliterCatalog;
      spliter.setAlignCd(EUiAlign.Left);
      spliter.setSizeHtml(o._frameCatalog._hPanel);
      var spliter = o._spliterProperty;
      spliter.setAlignCd(EUiAlign.Right);
      spliter.setSizeHtml(o._frameProperty._hPanel);
      //..........................................................
      // 设置实例工厂
      var sceneConsole = MO.Console.find(FE3dInstanceConsole);
      sceneConsole.register(EE3dInstance.TemplateRenderable, FDsSceneRenderable);
      sceneConsole.register(EE3dInstance.SceneLayer, FDsSceneLayer);
      sceneConsole.register(EE3dInstance.SceneDisplay, FDsSceneDisplay);
      sceneConsole.register(EE3dInstance.SceneRenderable, FDsSceneRenderable);
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   // @param canvas:FSceneCanvas 画板
   //==========================================================
   MO.FDsSceneFrameSet_onDataLoaded = function FDsSceneFrameSet_onDataLoaded(canvas){
      var o = this;
      // 加载完成
      var space = o._activeSpace = canvas._activeSpace;
      o._catalogContent.buildSpace(space);
   }

   //==========================================================
   // <T>目录对象选择处理。</T>
   //
   // @method
   // @param select:FObject 选择对象
   // @param flag:Boolean 选择标志
   //==========================================================
   MO.FDsSceneFrameSet_onCatalogSelected = function FDsSceneFrameSet_onCatalogSelected(select, flag){
      var o = this;
      // 检查空间
      var space = o._activeSpace;
      if(!space){
         return;
      }
      var canvas = o._canvasContent;
      // 隐藏所有属性面板
      o.hidePropertyFrames();
      // 显示选中属性面板
      if(MO.Class.isClass(select, FE3dScene)){
         // 选中场景
         var frame = o.findPropertyFrame(EDsFrame.CommonSpacePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FG3dTechnique)){
         // 选中技术
         var frame = o.findPropertyFrame(EDsFrame.CommonTechniquePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dRegion)){
         // 选中区域
         var frame = o.findPropertyFrame(EDsFrame.CommonRegionPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dCamera)){
         // 选中相机
         var frame = o.findPropertyFrame(EDsFrame.CommonCameraPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FG3dDirectionalLight)){
         // 选中光源
         var frame = o.findPropertyFrame(EDsFrame.CommonLightPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(select == 'layers'){
         // 选中显示层集合
         if(flag){
            canvas.selectLayers(select);
         }
      }else if(MO.Class.isClass(select, FE3dSceneLayer)){
         // 选中显示层
         if(flag){
            canvas.selectLayer(select);
         }
         var frame = o.findPropertyFrame(EDsFrame.CommonLayerPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dSceneDisplay)){
         // 选中显示对象
         if(flag){
            canvas.selectDisplay(select);
         }
         var frame = o.findPropertyFrame(EDsFrame.CommonDisplayPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dSceneMaterial)){
         // 选中材质
         if(flag){
            canvas.selectMaterial(select);
         }
         var frame = o.findPropertyFrame(EDsFrame.CommonMaterialPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dAnimation)){
         // 选中动画
         var frame = o.findPropertyFrame(EDsFrame.CommonAnimationPropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dMovie)){
         // 选中动画
         var frame = o.findPropertyFrame(EDsFrame.CommonMoviePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else if(MO.Class.isClass(select, FE3dRenderable)){
         // 选中渲染对象
         if(flag){
            canvas.selectRenderable(select);
         }
         var frame = o.findPropertyFrame(EDsFrame.CommonRenderablePropertyFrame);
         frame.show();
         frame.loadObject(space, select);
      }else{
         throw new TError('Unknown select type. (select={1})', select);
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSceneFrameSet_construct = function FDsSceneFrameSet_construct(){
      var o = this;
      // 父处理
      o.__base.FDsFrameSet.construct.call(o);
   }

   //==========================================================
   // <T>根据唯一编码加载场景。</T>
   //
   // @method
   // @param guid:String 唯一编码
   //==========================================================
   MO.FDsSceneFrameSet_loadByGuid = function FDsSceneFrameSet_loadByGuid(guid){
      var o = this;
      o._activeGuid = guid;
      o._canvasContent.loadByGuid(guid);
   }

   //==========================================================
   // <T>根据代码加载场景。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.FDsSceneFrameSet_loadByCode = function FDsSceneFrameSet_loadByCode(code){
      var o = this;
      o._avtiveCode = code;
      o._canvasContent.loadByCode(code);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSceneFrameSet_dispose = function FDsSceneFrameSet_dispose(){
      var o = this;
      // 父处理
      o.__base.FDsFrameSet.dispose.call(o);
   }
}
