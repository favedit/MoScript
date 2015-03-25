//==========================================================
// <T>三维舞台对象。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3dStage(o){
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
function FE3dStage_onProcess(){
   var o = this;
   var r = o._region;
   if(!r){
      return;
   }
   var t = o._technique;
   if(!t){
      return;
   }
   var g = t._graphicContext;
   // 统计处理
   var ss = r._statistics = o._statistics;
   ss.resetFrame();
   ss._frame.begin();
   //..........................................................
   ss._frameProcess.begin();
   // 更新区域（更新光源相机等特殊处理）
   g.prepare();
   t.updateRegion(r);
   // 清空区域
   r.prepare();
   r.change();
   // 处理所有层
   var ls = o._layers;
   var lc = ls.count();
   for(var i = 0; i < lc; i++){
      var l = ls.valueAt(i);
      // 过滤单个层渲染信息
      r.reset();
      l.process(r);
      l.filterRenderables(r);
      r.update();
   }
   // 处理所有渲染集合
   RConsole.find(FE3dStageConsole).process(r);
   ss._frameProcess.end();
   //..........................................................
   ss._frameDraw.begin();
   // 处理所有层
   if(r.isChanged()){
      t.clear(r.backgroundColor());
      for(var i = 0; i < lc; i++){
         var l = ls.valueAt(i);
         // 选用技术
         var lt = l.technique();
         if(!lt){
            lt = t;
         }
         // 渲染单个层
         r.reset();
         r.renderables().assign(l.visibleRenderables());
         lt.drawRegion(r);
      }
      // 绘制处理
      t.present(r);
   }
   ss._frameDraw.end();
   //..........................................................
   // 处理完成
   ss._frame.end();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dStage_construct(){
   var o = this;
   o.__base.FStage.construct.call(o);
   /// 创建统计
   o._statistics = RClass.create(FE3dStageStatistics);
   RConsole.find(FStatisticsConsole).register('engine.stage', o._statistics);
   // 创建显示集合
   o._allDisplays = new TObjects();
   // 创建相机
   var c = o._camera = RClass.create(FE3dCamera);
   c.position().set(0, 0, -100);
   c.lookAt(0, 0, 0);
   c.update();
   c._projection.update();
   // 创建方向光源
   var l = o._directionalLight = RClass.create(FG3dDirectionalLight);
   l.direction().set(0, -1, 0);
   // 创建区域
   var r = o._region = o.createRegion();
   r._timer = o._timer;
   r._camera = c;
   r._directionalLight = l;
}

//==========================================================
// <T>创建区域。</T>
//
// @method
// @return FE3dRegion 区域
//==========================================================
function FE3dStage_createRegion(){
   return RClass.create(FE3dRegion);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FE3dStage_setup(){
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
function FE3dStage_statistics(){
   return this._statistics;
}

//==========================================================
// <T>获得相机。</T>
//
// @method
// @return FG3dCamera 相机
//==========================================================
function FE3dStage_camera(){
   return this._camera;
}

//==========================================================
// <T>获得投影。</T>
//
// @method
// @return FG3dProjection 投影
//==========================================================
function FE3dStage_projection(){
   return this._projection;
}

//==========================================================
// <T>获得方向光。</T>
//
// @method
// @return FG3dDirectionalLight 方向光
//==========================================================
function FE3dStage_directionalLight(){
   return this._directionalLight;
}

//==========================================================
// <T>获得渲染技术。</T>
//
// @method
// @return FG3dTechnique 渲染技术
//==========================================================
function FE3dStage_technique(){
   return this._technique;
}

//==========================================================
// <T>选择渲染技术。</T>
//
// @method
// @param c:context:FG3dContext 环境
// @param p:technique:FG3dTechnique 渲染技术
//==========================================================
function FE3dStage_selectTechnique(c, p){
   var o = this;
   var tc = RConsole.find(FG3dTechniqueConsole);
   o._technique = tc.find(c, p);
}

//==========================================================
// <T>获得渲染区域。</T>
//
// @method
// @return FG3dRegion 区域
//==========================================================
function FE3dStage_region(){
   return this._region;
}

//==========================================================
// <T>过滤显示集合。</T>
//
// @method
// @param p:displays:TObjects 显示集合
//==========================================================
function FE3dStage_filterDisplays(p){
   var o = this;
   // 过滤显示层集合
   var s = o._layers;
   var c = s.count();
   for(var i = 0; i < c; i++){
      s.value(i).filterDisplays(p);
   }
}

//==========================================================
// <T>获得所有显示集合。</T>
//
// @method
// @return TObjects 显示集合
//==========================================================
function FE3dStage_allDisplays(){
   var o = this;
   var s = o._allDisplays;
   s.clear();
   o.filterDisplays(s);
   return s;
}
