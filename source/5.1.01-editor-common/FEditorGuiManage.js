//==========================================================
// <T>设计界面管理器。</T>
//
// @class
// @author maocy
// @version 150714
//==========================================================
MO.FEditorGuiManage = function FEditorGuiManage(o){
   o = MO.Class.inherits(this, o, MO.FGuiCanvasManage);
   //..........................................................
   // @method
   o.construct = MO.FEditorGuiManage_construct;
   // @method
   o.dispose   = MO.FEditorGuiManage_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorGuiManage_construct = function FEditorGuiManage_construct(){
   var o = this;
   o.__base.FGuiCanvasManage.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEditorGuiManage_dispose = function FEditorGuiManage_dispose(){
   var o = this;
   // 父处理
   o.__base.FGuiCanvasManage.dispose.call(o);
}
