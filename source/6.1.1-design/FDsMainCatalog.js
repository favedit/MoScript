//==========================================================
// <T>主菜单。</T>
//
// @author maocy
// @history 141231
//==========================================================
function FDsMainCatalog(o){
   o = RClass.inherits(this, o, FDataTreeView);
   //..........................................................
   // @method
   o.construct = FDsMainCatalog_construct;
   // @method
   o.dispose   = FDsMainCatalog_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsMainCatalog_construct(){
   var o = this;
   o.__base.FDataTreeView.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsMainCatalog_dispose(){
   var o = this;
   // 父处理
   o.__base.FDataTreeView.dispose.call(o);
}
