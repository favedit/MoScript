with(MO){
   //==========================================================
   // <T>三维舞台对象。</T>
   //
   // @author maocy
   // @history 150106
   //==========================================================
   MO.FE3dStage = function FE3dStage(o){
      o = RClass.inherits(this, o, FStage, MGraphicObject);
      //..........................................................
      // @attribute
      o._statistics       = null;
      // @attribute
      o._camera           = null;
      o._directionalLight = null
      o._technique        = null;
      // @attribute
      o._region           = null;
      o._allDisplays      = null;
      //..........................................................
      // @event
      o.onProcess         = FE3dStage_onProcess;
      //..........................................................
      // @method
      o.construct         = FE3dStage_construct;
      o.createRegion      = FE3dStage_createRegion;
      o.setup             = FE3dStage_setup;
      // @method
      o.statistics        = FE3dStage_statistics;
      o.camera            = FE3dStage_camera;
      o.projection        = FE3dStage_projection;
      o.directionalLight  = FE3dStage_directionalLight;
      o.technique         = FE3dStage_technique;
      o.selectTechnique   = FE3dStage_selectTechnique;
      o.region            = FE3dStage_region;
      // @method
      o.filterDisplays    = FE3dStage_filterDisplays;
      o.allDisplays       = FE3dStage_allDisplays;
      return o;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dStage_onProcess = function FE3dStage_onProcess(){
      var o = this;
      var region = o._region;
      if(!region){
         return;
      }
      var technique = o._technique;
      if(!technique){
         return;
      }
      var context = technique._graphicContext;
      // 统计处理
      var statistics = region._statistics = o._statistics;
      statistics.resetFrame();
      statistics._frame.begin();
      //..........................................................
      statistics._frameProcess.begin();
      // 更新区域（更新光源相机等特殊处理）
      context.prepare();
      technique.updateRegion(region);
      // 清空区域
      region.prepare();
      region.change();
      // 处理所有层
      var layers = o._layers;
      var layerCount = layers.count();
      for(var i = 0; i < layerCount; i++){
         var layer = layers.at(i);
         // 过滤单个层渲染信息
         region.reset();
         layer.process(region);
         layer.filterRenderables(region);
         region.update();
      }
      // 处理所有渲染集合
      RConsole.find(FE3dStageConsole).process(region);
      statistics._frameProcess.end();
      //..........................................................
      statistics._frameDraw.begin();
      // 处理所有层
      if(region.isChanged()){
         technique.clear(region.backgroundColor());
         for(var i = 0; i < layerCount; i++){
            var layer = layers.at(i);
            // 选用技术
            var layerTechnique = layer.technique();
            if(!layerTechnique){
               layerTechnique = technique;
            }
            // 渲染单个层
            region.reset();
            region.renderables().assign(layer.visibleRenderables());
            layerTechnique.drawRegion(region);
         }
         // 绘制处理
         technique.present(region);
      }
      statistics._frameDraw.end();
      //..........................................................
      // 处理完成
      statistics._frame.end();
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dStage_construct = function FE3dStage_construct(){
      var o = this;
      o.__base.FStage.construct.call(o);
      /// 创建统计
      o._statistics = RClass.create(FE3dStageStatistics);
      RConsole.find(FStatisticsConsole).register('engine.stage', o._statistics);
      // 创建显示集合
      o._allDisplays = new TObjects();
      // 创建相机
      //var c = o._camera = RClass.create(FE3dCamera);
      //c.position().set(0, 0, -100);
      //c.lookAt(0, 0, 0);
      //c.update();
      //c._projection.update();
      // 创建方向光源
      //var l = o._directionalLight = RClass.create(FG3dDirectionalLight);
      //l.direction().set(0, -1, 0);
      // 创建区域
      var region = o._region = o.createRegion();
      region._timer = o._timer;
      //r._camera = c;
      //r._directionalLight = l;
   }

   //==========================================================
   // <T>创建区域。</T>
   //
   // @method
   // @return FE3dRegion 区域
   //==========================================================
   MO.FE3dStage_createRegion = function FE3dStage_createRegion(){
      return RClass.create(FE3dRegion);
   }

   //==========================================================
   // <T>配置处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dStage_setup = function FE3dStage_setup(){
      var o = this;
      o.__base.FStage.construct.call(o);
      // 创建背景色
      o._region.linkGraphicContext(o);
      o._region.setup();
   }

   //==========================================================
   // <T>获得统计信息。</T>
   //
   // @method
   // @return FG3dStatistics 统计信息
   //==========================================================
   MO.FE3dStage_statistics = function FE3dStage_statistics(){
      return this._statistics;
   }

   //==========================================================
   // <T>获得相机。</T>
   //
   // @method
   // @return FG3dCamera 相机
   //==========================================================
   MO.FE3dStage_camera = function FE3dStage_camera(){
      return this._region._camera;
   }

   //==========================================================
   // <T>获得投影。</T>
   //
   // @method
   // @return FG3dProjection 投影
   //==========================================================
   MO.FE3dStage_projection = function FE3dStage_projection(){
      return this._region._camera._projection;
   }

   //==========================================================
   // <T>获得方向光。</T>
   //
   // @method
   // @return FG3dDirectionalLight 方向光
   //==========================================================
   MO.FE3dStage_directionalLight = function FE3dStage_directionalLight(){
      return this._region._directionalLight;
   }

   //==========================================================
   // <T>获得渲染技术。</T>
   //
   // @method
   // @return FG3dTechnique 渲染技术
   //==========================================================
   MO.FE3dStage_technique = function FE3dStage_technique(){
      return this._technique;
   }

   //==========================================================
   // <T>选择渲染技术。</T>
   //
   // @method
   // @param context:FG3dContext 环境
   // @param clazz:Function 类对象
   //==========================================================
   MO.FE3dStage_selectTechnique = function FE3dStage_selectTechnique(context, clazz){
      var o = this;
      var techniqueConsole = RConsole.find(FG3dTechniqueConsole);
      var technique = o._technique = techniqueConsole.find(context, clazz);
      return technique;
   }

   //==========================================================
   // <T>获得渲染区域。</T>
   //
   // @method
   // @return FG3dRegion 区域
   //==========================================================
   MO.FE3dStage_region = function FE3dStage_region(){
      return this._region;
   }

   //==========================================================
   // <T>过滤显示集合。</T>
   //
   // @method
   // @param displays:TObjects 显示集合
   //==========================================================
   MO.FE3dStage_filterDisplays = function FE3dStage_filterDisplays(displays){
      var o = this;
      // 过滤显示层集合
      var layers = o._layers;
      var count = layers.count();
      for(var i = 0; i < count; i++){
         var layer = layers.at(i);
         layer.filterDisplays(displays);
      }
   }

   //==========================================================
   // <T>获得所有显示集合。</T>
   //
   // @method
   // @return TObjects 显示集合
   //==========================================================
   MO.FE3dStage_allDisplays = function FE3dStage_allDisplays(){
      var o = this;
      var displays = o._allDisplays;
      displays.clear();
      o.filterDisplays(displays);
      return displays;
   }
}
