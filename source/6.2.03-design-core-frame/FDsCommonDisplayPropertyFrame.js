//==========================================================
// <T>模板显示属性页面。</T>
//
// @class
// @author maocy
// @history 150202
//==========================================================
function FDsCommonDisplayPropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible        = false;
   // @attribute
   o._workspace      = null;
   // @attribute
   o._activeDisplay  = null;
   o._activeResource = null;
   // @attribute
   o._controlGuid    = null;
   o._controlCode    = null;
   o._controlLabel   = null;
   o._displayFrame   = null;
   o._materialFrame  = null;
   //..........................................................
   // @event
   o.onBuilded       = FDsCommonDisplayPropertyFrame_onBuilded;
   o.onDataChanged   = FDsCommonDisplayPropertyFrame_onDataChanged;
   //..........................................................
   // @method
   o.construct       = FDsCommonDisplayPropertyFrame_construct;
   // @method
   o.loadObject      = FDsCommonDisplayPropertyFrame_loadObject;
   // @method
   o.dispose         = FDsCommonDisplayPropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsCommonDisplayPropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 增加对象
   o._controlCode.addDataChangedListener(o, o.onDataChanged);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsCommonDisplayPropertyFrame_onDataChanged(p){
   var o = this;
   var r = o._activeResource;
   // 设置属性
   r._code = o._controlCode.get();
   r._label = o._controlLabel.get();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsCommonDisplayPropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载显示信息。</T>
//
// @method
// @param space:FE3dSpace 空间
// @param display:FE3dDisplay 显示
//==========================================================
function FDsCommonDisplayPropertyFrame_loadObject(space, display){
   var o = this;
   var resource = display._resource;
   // 设置属性
   o._activeSpace = space;
   o._activeDisplay = display;
   // 设置参数
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   // 设置参数
   o._frameDisplay.loadObject(space, display);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsCommonDisplayPropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
