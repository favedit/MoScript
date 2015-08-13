with(MO){
   //==========================================================
   // <T>场景画板内容。</T>
   //
   // @class
   // @author maocy
   // @history 150428
   //==========================================================
   MO.FDsSceneCanvasContent = function FDsSceneCanvasContent(o){
      o = MO.Class.inherits(this, o, FDsSpaceDesignCanvas);
      //..........................................................
      // @attribute
      o._resourceTypeCd = EE3sResource.Scene;
      //..........................................................
      // @event
      //o.onDataLoaded    = FDsSceneCanvasContent_onDataLoaded;
      //..........................................................
      // @method
      o.loadByGuid      = FDsSceneCanvasContent_loadByGuid;
      // @method
      o.dispose         = FDsSceneCanvasContent_dispose;
      return o;
   }

   //==========================================================
   // <T>加载模板处理。</T>
   //
   // @method
   // @param p:template:FTemplate3d 模板
   //==========================================================
   MO.FDsSceneCanvasContent_onDataLoaded = function FDsSceneCanvasContent_onDataLoaded(p){
      var o = this;
      //var context = o._graphicContext;
      //var space = o._activeSpace;
      //space._layer.pushRenderable(o._dimensional);
      // 创建界面层
      //var l = MO.Class.create(FDisplayUiLayer);
      //l.selectTechnique(c, FG3dControlTechnique);
      //l.pushDisplay(o._templateTranslation);
      //l.pushDisplay(o._templateRotation);
      //l.pushDisplay(o._templateScale);
      //s.registerLayer('ui', l);
      o.reloadRegion()
      // 加载完成
      o.processLoadListener(o);
      // 隐藏处理
      MO.Console.find(FDuiDesktopConsole).hide();
   }

   //==========================================================
   // <T>根据唯一编号加载场景。</T>
   //
   // @method
   // @param guid:String 唯一编号
   //==========================================================
   MO.FDsSceneCanvasContent_loadByGuid = function FDsSceneCanvasContent_loadByGuid(guid){
      var o = this;
      // 释放场景
      var space = o._activeSpace;
      var sceneConsole = MO.Console.find(FE3dSceneConsole);
      if(space){
         RStage.unregister(space);
         sceneConsole.free(space);
      }
      // 收集一个显示模板
      space = o._activeSpace = sceneConsole.allocByGuid(o, guid);
      if(!space._linked){
         // 显示加载进度
         MO.Console.find(FDuiDesktopConsole).showLoading();
         // 设置事件
         space.addLoadListener(o, o.onDataLoaded);
         space._linked = true;
      }
      // 启动舞台
      RStage.register('space', space);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FDsSceneCanvasContent_dispose = function FDsSceneCanvasContent_dispose(){
      var o = this;
      o.__base.FDsSpaceDesignCanvas.dispose.call(o);
   }
}
