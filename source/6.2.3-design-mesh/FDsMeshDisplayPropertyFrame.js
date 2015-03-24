//==========================================================
// <T>模板显示属性页面。</T>
//
// @class
// @author maocy
// @history 150202
//==========================================================
function FDsMeshDisplayPropertyFrame(o){
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
   o.onBuilded       = FDsMeshDisplayPropertyFrame_onBuilded;
   o.onDataChanged   = FDsMeshDisplayPropertyFrame_onDataChanged;
   //..........................................................
   // @method
   o.construct       = FDsMeshDisplayPropertyFrame_construct;
   // @method
   o.loadObject      = FDsMeshDisplayPropertyFrame_loadObject;
   // @method
   o.dispose         = FDsMeshDisplayPropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsMeshDisplayPropertyFrame_onBuilded(p){
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
function FDsMeshDisplayPropertyFrame_onDataChanged(p){
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
function FDsMeshDisplayPropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>加载显示信息。</T>
//
// @method
// @param s:scene:FE3dScene 场景
// @param d:display:FE3sDisplay 显示
//==========================================================
function FDsMeshDisplayPropertyFrame_loadObject(s, d){
   var o = this;
   // 设置属性
   o._activeDisplay = d;
   //var sr = s.resource();
   //var dr = o._activeResource = d.resourceScene();
   // 设置参数
   //o._controlGuid.set(dr.guid());
   //o._controlCode.set(dr.code());
   //o._controlLabel.set(dr.label());
   // 设置参数
   //o._frameDisplay.loadObject(s, d);
   //o._materialFrame.loadObject(s, dr);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMeshDisplayPropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
