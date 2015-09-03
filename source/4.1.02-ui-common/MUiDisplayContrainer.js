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
   o.psDesign   = MO.MUiDisplayContrainer_psDesign;
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
   o._eventMode = new MO.SUiDispatchEvent(o, 'oeMode', MO.MUiDisplay);
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
// <T>分发改变控件设计状态的事件。</T>
//
// @method
// @param m:mode:EDesign 设计模式
// @param f:flag:Boolean 开始还是结束
//==========================================================
MO.MUiDisplayContrainer_psDesign = function MUiDisplayContrainer_psDesign(m, f){
   var o = this;
   MO.Console.find(FDesignConsole).setFlag(m, f, o);
   // 创建事件
   var event = new MO.SUiDispatchEvent(o, 'oeDesign', MO.MUiDesign)
   event.mode = m;
   event.flag = f;
   // 处理消息
   o.process(event);
   event.dispose();
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
