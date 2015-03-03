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
   o._backgroundColor  = null;
   o._camera           = null;
   o._directionalLight = null
   o._technique        = null;
   // @attribute
   o._region           = null;
   o._allDisplays      = null;
   //..........................................................
   // @method
   o.construct         = FE3dStage_construct;
   o.setup             = FE3dStage_setup;
   // @method
   o.backgroundColor   = FE3dStage_backgroundColor;
   o.camera            = FE3dStage_camera;
   o.projection        = FE3dStage_projection;
   o.directionalLight  = FE3dStage_directionalLight;
   o.technique         = FE3dStage_technique;
   o.selectTechnique   = FE3dStage_selectTechnique;
   o.region            = FE3dStage_region;
   // @method
   o.filterDisplays    = FE3dStage_filterDisplays;
   o.allDisplays       = FE3dStage_allDisplays;
   // @method
   o.process           = FE3dStage_process;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3dStage_construct(){
   var o = this;
   o.__base.FStage.construct.call(o);
   // 创建背景色
   o._backgroundColor = new SColor4();
   o._backgroundColor.set(0, 0, 0, 1);
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
   var r = o._region = RClass.create(FE3dRegion);
   r._camera = c;
   r._directionalLight = l;
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
// <T>获得背景色。</T>
//
// @method
// @return SColor4 背景色
//==========================================================
function FE3dStage_backgroundColor(){
   return this._backgroundColor;
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
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.value(i).filterDisplays(p);
      }
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

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3dStage_process(){
   var o = this;
   var r = o._region;
   var t = o._technique;
   o.__base.FStage.process.call(o);
   // 更新区域（更新光源相机等特殊处理）
   t.updateRegion(r);
   // 清空区域
   r.prepare();
   r.change();
   // 处理所有层
   var ls = o._layers;
   if(ls){
      var c = ls.count();
      for(var i = 0; i < c; i++){
         var l = ls.value(i);
         // 渲染单个层
         r.reset();
         l.filterRenderables(r);
         r.update();
      }
   }
   // 处理所有层
   if(r.isChanged()){
      t.clear(o._backgroundColor);
      if(ls){
         var c = ls.count();
         for(var i = 0; i < c; i++){
            var l = ls.value(i);
            // 获得技术
            var lt = l.technique();
            if(!lt){
               lt = t;
            }
            // 渲染单个层
            r.reset();
            r.renderables().assign(l.visibleRenderables());
            lt.drawRegion(r);
         }
      }
      // 绘制处理
      t.present(r);
   }
}
