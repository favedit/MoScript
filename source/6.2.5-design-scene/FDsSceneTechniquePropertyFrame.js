//==========================================================
// <T>模板属性页面。</T>
//
// @class
// @author maocy
// @history 150202
//==========================================================
function FDsSceneTechniquePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible           = false;
   // @attribute
   o._workspace         = null;
   o._scene             = null;
   o._technique         = null;
   o._techniqueResource = null;
   // @attribute
   o._controlGuid       = null;
   o._controlCode       = null;
   o._controlLabel      = null;
   // @attribute
   o._controlTriangleCount = null;
   o._controlDrawCount     = null;
   //..........................................................
   // @event
   o.onBuilded          = FDsSceneTechniquePropertyFrame_onBuilded;
   o.onDataChanged      = FDsSceneTechniquePropertyFrame_onDataChanged;
   o.onModeClick        = FDsSceneTechniquePropertyFrame_onModeClick;
   //..........................................................
   // @method
   o.construct          = FDsSceneTechniquePropertyFrame_construct;
   // @method
   o.loadObject         = FDsSceneTechniquePropertyFrame_loadObject;
   // @method
   o.dispose            = FDsSceneTechniquePropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSceneTechniquePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 关联对象
   o._controlCode.addDataChangedListener(o, o.onDataChanged);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   o._controlTechniqueCode.addDataChangedListener(o, o.onDataChanged);
   // 增加对象
   o._controlRenderModes.addClickListener(o, o.onModeClick);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneTechniquePropertyFrame_onDataChanged(p){
   var o = this;
   var r = o._technique;
   r._code = o._controlCode.get();
   r._label = o._controlLabel.get();
   r._techniqueCode = o._controlTechniqueCode.get();
}

//==========================================================
// <T>模式点击处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneTechniquePropertyFrame_onModeClick(ps, pi){
   var o = this;
   var m = pi.tag();
   o._technique._activeMode = m;
   // 释放所有关联的效果器
   var ds = o._scene.allDisplays();
   for(var di = ds.count() - 1; di >= 0; di--){
      var d = ds.getAt(di);
      var rs = d.renderables();
      for(var ri = rs.count() - 1; ri >= 0; ri--){
         var r = rs.getAt(ri);
         r.clearInfos();
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneTechniquePropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param s:scene:FE3dScene 场景
// @param t:technique:FG3dTechnique 技术
//==========================================================
function FDsSceneTechniquePropertyFrame_loadObject(s, t){
   var o = this;
   var r = t._resource;
   // 设置属性
   o._scene = s;
   o._technique = t;
   o._techniqueResource = r;
   // 设置参数
   o._controlGuid.set(r.guid());
   o._controlCode.set(r.code());
   o._controlLabel.set(r.label());
   // 设置效果器
   var cms = o._controlRenderModes;
   cms.clear();
   var ms = t.modes();
   var c = ms.count();
   for(var i = 0; i < c; i++){
      var m = ms.getAt(i);
      var cm = cms.createItem(null, m.code());
      cm.setTag(m);
      cms.push(cm);
   }
   // 设置统计数据
   var gc = s._graphicContext;
   var gs = gc.statistics();
   o._controlTriangleCount.set(gs._frameTriangleCount);
   o._controlDrawCount.set(gs._frameDrawCount);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneTechniquePropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
