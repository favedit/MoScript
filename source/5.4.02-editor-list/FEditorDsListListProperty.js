//==========================================================
// <T>设计列表列表属性页面。</T>
//
// @author maocy
// @history 150812
//==========================================================
MO.FEditorDsListListProperty = function FEditorDsListListProperty(o){
   o = MO.Class.inherits(this, o, MO.FEditorDsPropertyForm);
   //..........................................................
   // @attribute
   o._logicService = 'editor.design.list';
   o._logicGroup   = 'container';
   //..........................................................
   // @method
   o.construct     = MO.FEditorDsListListProperty_construct;
   // @method
   o.dispose       = MO.FEditorDsListListProperty_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListListProperty_construct = function FEditorDsListListProperty_construct(){
   var o = this;
   // 父处理
   o.__base.FEditorDsPropertyForm.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEditorDsListListProperty_dispose = function FEditorDsListListProperty_dispose(){
   var o = this;
   // 父处理
   o.__base.FEditorDsPropertyForm.dispose.call(o);
}
