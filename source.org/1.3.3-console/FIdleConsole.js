/***********************************************************
 * <T>单个页面中的表单管理类。主要负责从表单的XML节点构建表单对象。</T>
 *
 * @console
 * @author MAOCY
 * @version 1.0.1
 **********************************************************/
function FIdleConsole(o){
   o = RClass.inherits(this, o, FConsole);
   // Attribute
   o.scope            = EScope.Page;
   o.register         = FIdleConsole_register;
   return o;
}

//==========================================================

/***********************************************************
 * <T>注册函数。</T>
 *
 * @method
 * @param c:control:FObject 回调对象
 * @param cFun:function:function 回调函数
 **********************************************************/
function FIdleConsole_register(c, cFun){
   var o = this;
   o.active = new TActive(c, cFun);
   o.active.interval = 100;
   RConsole.find(FActiveConsole).push(o.active);
}

/***********************************************************
 * <T>构造函数。</T>
 *
 * @method
 **********************************************************/
function FIdleConsole_construct(){
   var o = this;
}
