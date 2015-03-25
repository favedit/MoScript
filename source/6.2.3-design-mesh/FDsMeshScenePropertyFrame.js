//==========================================================
// <T>模板属性页面。</T>
//
// @class
// @author maocy
// @history 150202
//==========================================================
function FDsMeshScenePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible        = false;
   o._frameName      = 'design3d.scene.property.SceneFrame';
   // @attribute
   o._workspace      = null;
   // @attribute
   o._activeSpace    = null;
   // @attribute
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   //..........................................................
   // @event
   o.onBuilded       = FDsMeshScenePropertyFrame_onBuilded;
   //..........................................................
   // @method
   o.construct       = FDsMeshScenePropertyFrame_construct;
   // @method
   o.loadObject      = FDsMeshScenePropertyFrame_loadObject;
   // @method
   o.dispose         = FDsMeshScenePropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsMeshScenePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 设置关联
   o._controlGuid = o.searchControl('guid');
   o._controlCode = o.searchControl('code');
   o._controlLabel = o.searchControl('label');
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsMeshScenePropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param space:FE3dSpace 空间
// @param select:FObject 选中对象
//==========================================================
function FDsMeshScenePropertyFrame_loadObject(space, select){
   var o = this;
   var resource = select.resource();
   // 设置属性
   o._activeSpace = space;
   // 设置参数
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMeshScenePropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
