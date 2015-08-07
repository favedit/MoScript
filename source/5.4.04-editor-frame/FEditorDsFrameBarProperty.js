//==========================================================
// <T>场景渲染页面。</T>
//
// @author maocy
// @history 150216
//==========================================================
MO.FEditorDsFrameBarProperty = function FEditorDsFrameBarProperty(o){
   o = MO.Class.inherits(this, o, MO.FDsSystemFrameControlProperty);
   //..........................................................
   // @attribute
   o._activeSpace      = null;
   o._activeRenderable = null;
   //..........................................................
   // @event
   o.onBuilded         = MO.FEditorDsFrameBarProperty_onBuilded;
   o.onDataChanged     = MO.FEditorDsFrameBarProperty_onDataChanged;
   //..........................................................
   // @method
   o.construct         = MO.FEditorDsFrameBarProperty_construct;
   // @method
   o.loadObject        = MO.FEditorDsFrameBarProperty_loadObject;
   // @method
   o.dispose           = MO.FEditorDsFrameBarProperty_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
MO.FEditorDsFrameBarProperty_onBuilded = function FEditorDsFrameBarProperty_onBuilded(p){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.onBuilded.call(o, p);
   // 关联对象
   //o._controlTranslate.addDataChangedListener(o, o.onDataChanged);
   //o._controlRotation.addDataChangedListener(o, o.onDataChanged);
   //o._controlScale.addDataChangedListener(o, o.onDataChanged);
   // 增加对象
   //o._controlMaterials.addClickListener(o, o.onMaterialClick);
   //o._controlEffects.addClickListener(o, o.onEffectClick);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
MO.FEditorDsFrameBarProperty_onDataChanged = function FEditorDsFrameBarProperty_onDataChanged(p){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.onDataChanged.call(o, p);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsFrameBarProperty_construct = function FEditorDsFrameBarProperty_construct(){
   var o = this;
   // 父处理
   o.__base.FDsSystemFrameControlProperty.construct.call(o);
}

//==========================================================
// <T>加载页面控件信息。</T>
//
// @method
// @param frame:FGuiFrame 界面
// @param control:FGuiControl 控件
//==========================================================
MO.FEditorDsFrameBarProperty_loadObject = function FEditorDsFrameBarProperty_loadObject(frame, control){
   var o = this;
   o.__base.FDsSystemFrameControlProperty.loadObject.call(o, frame, control);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsFrameBarProperty_dispose = function FEditorDsFrameBarProperty_dispose(){
   var o = this;
   // 父处理
   o.__base.FDsSystemFrameControlProperty.dispose.call(o);
}
