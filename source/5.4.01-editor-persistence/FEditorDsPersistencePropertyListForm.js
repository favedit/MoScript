//==========================================================
// <T>场景渲染页面。</T>
//
// @author maocy
// @history 150216
//==========================================================
MO.FEditorDsPersistencePropertyListForm = function FEditorDsPersistencePropertyListForm(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsPropertyForm);
   //..........................................................
   // @attribute
   o._activeFrame     = null;
   o._activeComponent = null;
   //..........................................................
   // @event
   o.onBuilded        = MO.FEditorDsFrameComponentProperty_onBuilded;
   o.onDataChanged    = MO.FEditorDsFrameComponentProperty_onDataChanged;
   //..........................................................
   // @method
   o.construct        = MO.FEditorDsFrameComponentProperty_construct;
   // @method
   o.loadObject       = MO.FEditorDsFrameComponentProperty_loadObject;
   // @method
   o.dispose          = MO.FEditorDsFrameComponentProperty_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsFrameComponentProperty_onBuilded = function FEditorDsFrameComponentProperty_onBuilded(p){
   var o = this;
   o.__base.FEditorDsPropertyForm.onBuilded.call(o, p);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsFrameComponentProperty_onDataChanged = function FEditorDsFrameComponentProperty_onDataChanged(event){
   var o  = this;
   var frame = o._activeFrame;
   var control = o._activeControl;
   // 设置组件属性
   var size = o._controlSize.get();
   control.size().set(size.x, size.y);
   frame.build();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsFrameComponentProperty_construct = function FEditorDsFrameComponentProperty_construct(){
   var o = this;
   // 父处理
   o.__base.FEditorDsPropertyForm.construct.call(o);
}

//==========================================================
// <T>加载页面控件信息。</T>
//
// @method
// @param frame:FGuiFrame 界面
// @param component:FGuiComponent 组件
//==========================================================
MO.FEditorDsFrameComponentProperty_loadObject = function FEditorDsFrameComponentProperty_loadObject(frame, component){
   var o = this;
   o._activeFrame = frame;
   o._activeComponent = component;
   // 设置组件属性
   //o._controlValid.set(component.isValid());
   o._controlType.set(RClass.name(component));
   o._controlName.set(component.name());
   o._controlLabel.set(component.label());
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsFrameComponentProperty_dispose = function FEditorDsFrameComponentProperty_dispose(){
   var o = this;
   // 父处理
   o.__base.FEditorDsPropertyForm.dispose.call(o);
}
