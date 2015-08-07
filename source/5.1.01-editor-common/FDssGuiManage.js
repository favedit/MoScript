//==========================================================
// <T>设计界面管理器。</T>
//
// @class
// @author maocy
// @version 150714
//==========================================================
MO.FDssGuiManage = function FDssGuiManage(o){
   o = MO.Class.inherits(this, o, MO.FGuiCanvasManage);
   //..........................................................
   // @method
   o.construct = MO.FDssGuiManage_construct;
   // @method
   o.dispose   = MO.FDssGuiManage_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDssGuiManage_construct = function FDssGuiManage_construct(){
   var o = this;
   o.__base.FGuiCanvasManage.construct.call(o);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FDssGuiManage_dispose = function FDssGuiManage_dispose(){
   var o = this;
   // 父处理
   o.__base.FGuiCanvasManage.dispose.call(o);
}
