//==========================================================
// <T>设计锚点。</T>
//
// @class
// @author maocy
// @version 150714
//==========================================================
MO.FGuiDesignRule = function FGuiDesignRule(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   // @method
   o.construct = MO.FGuiDesignRule_construct;
   // @method
   o.dispose   = MO.FGuiDesignRule_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FGuiDesignRule_construct = function FGuiDesignRule_construct(){
   var o = this;
   o.__base.FGuiControl.construct.call(o);
}

//==========================================================
// <T>析构处理。</T>
//
// @method
//==========================================================
MO.FGuiDesignRule_dispose = function FGuiDesignRule_dispose(){
   var o = this;
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
