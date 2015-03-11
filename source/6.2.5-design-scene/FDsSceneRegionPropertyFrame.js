//==========================================================
// <T>场景区域属性页面。</T>
//
// @class
// @author maocy
// @history 150509
//==========================================================
function FDsSceneRegionPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible                 = false;
   // @attribute
   o._workspace               = null;
   o._scene                   = null;
   o._region                  = null;
   o._regionResource          = null;
   // @attribute
   o._controlOptionBackground = null;
   o._controlBackgroundColor  = null;
   //..........................................................
   // @event
   o.onBuilded                = FDsSceneRegionPropertyFrame_onBuilded;
   o.onDataChanged            = FDsSceneRegionPropertyFrame_onDataChanged;
   //..........................................................
   // @method
   o.construct                = FDsSceneRegionPropertyFrame_construct;
   // @method
   o.loadObject               = FDsSceneRegionPropertyFrame_loadObject;
   // @method
   o.dispose                  = FDsSceneRegionPropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsSceneRegionPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 关联对象
   o._controlMoveSpeed.addDataChangedListener(o, o.onDataChanged);
   o._controlRotationKeySpeed.addDataChangedListener(o, o.onDataChanged);
   o._controlRotationMouseSpeed.addDataChangedListener(o, o.onDataChanged);
   // 关联对象
   o._controlOptionBackground.addDataChangedListener(o, o.onDataChanged);
   o._controlBackgroundColor.addDataChangedListener(o, o.onDataChanged);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsSceneRegionPropertyFrame_onDataChanged(p){
   var o = this;
   // 获得内容
   var r = o._regionResource;
   r.setOptionBackground(o._controlOptionBackground.get());
   r.backgroundColor().assign(o._controlBackgroundColor.get());
   r.setMoveSpeed(o._controlMoveSpeed.get());
   r.setRotationKeySpeed(o._controlRotationKeySpeed.get());
   r.setRotationMouseSpeed(o._controlRotationMouseSpeed.get());
   // 重新加载资源
   o._region.reloadResource();
   o._workspace._canvas.reloadRegion();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsSceneRegionPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param s:scene:FE3dScene 场景
// @param t:technique:FG3dTechnique 技术
//==========================================================
function FDsSceneRegionPropertyFrame_loadObject(s, t){
   var o = this;
   // 设置属性
   o._scene = s;
   o._region = t;
   var r = o._regionResource = t._resource;
   // 设置速度
   o._controlMoveSpeed.set(r.moveSpeed());
   o._controlRotationKeySpeed.set(r.rotationKeySpeed());
   o._controlRotationMouseSpeed.set(r.rotationMouseSpeed());
   // 设置背景
   o._controlOptionBackground.set(r.optionBackground());
   o._controlBackgroundColor.set(r.backgroundColor());
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsSceneRegionPropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
