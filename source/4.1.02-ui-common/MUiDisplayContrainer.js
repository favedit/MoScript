//==========================================================
// <T>显示集合接口。</T>
//
// @face
// @author maocy
// @version 150831
//==========================================================
MO.MUiDisplayContrainer = function MUiDisplayContrainer(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._modeCd    = MO.Class.register(o, new MO.AGetter('_modeCd'), MO.EUiMode.View);
   // @attribute
   o._eventMode = null;
   //..........................................................
   // @method
   o.construct  = MO.MUiDisplayContrainer_construct;
   // @method
   o.psMode     = MO.MUiDisplayContrainer_psMode;
   // @method
   o.dispose    = MO.MUiDisplayContrainer_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.MUiDisplayContrainer_construct = function MUiDisplayContrainer_construct(){
   var o = this;
   o._eventMode = new MO.SUiDispatchEvent(o, 'oeMode', MO.MUiDisplayField);
}

//==========================================================
// <T>模式变更处理。</T>
//
// @method
// @param modeCd:EUiMode 模式
//==========================================================
MO.MUiDisplayContrainer_psMode = function MUiDisplayContrainer_psMode(modeCd){
   var o = this;
   // 设置命令
   o._modeCd = modeCd;
   // 数据处理
   var event = o._eventMode;
   event.modeCd = modeCd;
   o.process(event);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.MUiDisplayContrainer_dispose = function MUiDisplayContrainer_dispose(){
   var o = this;
   o._eventMode = MO.Lang.Object.Dispose(o._eventMode);
}
