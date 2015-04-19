//==========================================================
// <T>设计区域属性页面。</T>
//
// @class
// @author maocy
// @history 150415
//==========================================================
function FDsCommonRegionPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible                   = false;
   // @attribute
   o._workspace                 = null;
   o._activeSpace               = null;
   o._activeRegion              = null;
   // @attribute
   o._controlMoveSpeed          = null;
   o._controlRotationKeySpeed   = null;
   o._controlRotationMouseSpeed = null;
   o._controlOptionBackground   = null;
   o._controlBackgroundColor    = null;
   //..........................................................
   // @event
   o.onBuilded                  = FDsCommonRegionPropertyFrame_onBuilded;
   o.onDataChanged              = FDsCommonRegionPropertyFrame_onDataChanged;
   //..........................................................
   // @method
   o.construct                  = FDsCommonRegionPropertyFrame_construct;
   // @method
   o.loadObject                 = FDsCommonRegionPropertyFrame_loadObject;
   // @method
   o.dispose                    = FDsCommonRegionPropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsCommonRegionPropertyFrame_onBuilded(p){
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
function FDsCommonRegionPropertyFrame_onDataChanged(p){
   var o = this;
   var region = o._activeRegion;
   var resource = region.resource();
   // 获得内容
   resource.setOptionBackground(o._controlOptionBackground.get());
   resource.backgroundColor().assign(o._controlBackgroundColor.get());
   resource.setMoveSpeed(o._controlMoveSpeed.get());
   resource.setRotationKeySpeed(o._controlRotationKeySpeed.get());
   resource.setRotationMouseSpeed(o._controlRotationMouseSpeed.get());
   // 重新加载资源
   region.reloadResource();
   o._frameSet._canvas.reloadRegion(region);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsCommonRegionPropertyFrame_construct(){
   var o = this;
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param space:FE3dSpace 空间
// @param region:FE3dRegion 区域
//==========================================================
function FDsCommonRegionPropertyFrame_loadObject(space, region){
   var o = this;
   var resource = region.resource();
   // 设置属性
   o._activeSpace = space;
   o._activeRegion = region;
   // 设置速度
   o._controlMoveSpeed.set(resource.moveSpeed());
   o._controlRotationKeySpeed.set(resource.rotationKeySpeed());
   o._controlRotationMouseSpeed.set(resource.rotationMouseSpeed());
   // 设置背景
   o._controlOptionBackground.set(resource.optionBackground());
   o._controlBackgroundColor.set(resource.backgroundColor());
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsCommonRegionPropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
