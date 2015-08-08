//==========================================================
// <T>场景渲染页面。</T>
//
// @author maocy
// @history 150216
//==========================================================
MO.FEditorDsListItemProperty = function FEditorDsListItemProperty(o){
   o = MO.Class.inherits(this, o, MO.FDuiForm);
   //..........................................................
   // @attribute
   o._activeFrame     = null;
   o._activeComponent = null;
   //..........................................................
   // @event
   o.onBuilded        = MO.FEditorDsListItemProperty_onBuilded;
   o.onDataChanged    = MO.FEditorDsListItemProperty_onDataChanged;
   //..........................................................
   // @method
   o.construct        = MO.FEditorDsListItemProperty_construct;
   // @method
   o.loadObject       = MO.FEditorDsListItemProperty_loadObject;
   // @method
   o.dispose          = MO.FEditorDsListItemProperty_dispose;
   return o;
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsListItemProperty_onBuilded = function FEditorDsListItemProperty_onBuilded(p){
   var o = this;
   o.__base.FDuiForm.onBuilded.call(o, p);
}

//==========================================================
// <T>数据改变处理。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEditorDsListItemProperty_onDataChanged = function FEditorDsListItemProperty_onDataChanged(event){
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
MO.FEditorDsListItemProperty_construct = function FEditorDsListItemProperty_construct(){
   var o = this;
   // 父处理
   o.__base.FDuiForm.construct.call(o);
}

//==========================================================
// <T>加载页面控件信息。</T>
//
// @method
// @param frame:FGuiFrame 界面
// @param component:FGuiComponent 组件
//==========================================================
MO.FEditorDsListItemProperty_loadObject = function FEditorDsListItemProperty_loadObject(frame, component){
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
MO.FEditorDsListItemProperty_dispose = function FEditorDsListItemProperty_dispose(){
   var o = this;
   // 父处理
   o.__base.FDuiForm.dispose.call(o);
}
