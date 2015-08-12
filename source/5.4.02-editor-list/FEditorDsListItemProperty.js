//==========================================================
// <T>设计列表项目属性页面。</T>
//
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsListItemProperty = function FEditorDsListItemProperty(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsPropertyForm);
   //..........................................................
   // @attribute
   o._logicService = 'editor.design.list';
   o._logicGroup   = 'item';
   //..........................................................
   // @method
   o.construct     = MO.FEditorDsListItemProperty_construct;
   // @method
   o.dispose       = MO.FEditorDsListItemProperty_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListItemProperty_construct = function FEditorDsListItemProperty_construct(){
   var o = this;
   // 父处理
   o.__base.FEditorDsPropertyForm.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListItemProperty_dispose = function FEditorDsListItemProperty_dispose(){
   var o = this;
   // 父处理
   o.__base.FEditorDsPropertyForm.dispose.call(o);
}
