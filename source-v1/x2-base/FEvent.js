//==========================================================
// <T>事件对象。</T>
//
// @manager
//==========================================================
function FEvent(o){
   o = RClass.inherits(this, o, FComponent);
   //..........................................................
   // @property
   o.code      = RClass.register(o, new TPtyStr('code'));
   //..........................................................
   // @attribute
   o.onProcess = null;
   //..........................................................
   // @method
   o.invoke    = FEvent_invoke;
   return o;
}

//==========================================================
// <T>执行事件。</T>
//
// @method
// @param c:control:FControl 控件对象
//==========================================================
function FEvent_invoke(s, c, e){
   var o = this;
   var p = o.onProcess;
   if(!p){
      p = o.onProcess = new Function('o', 'e', this.code);
   }
   //try{
   if(!e){
      e = new TEvent();
   }
   e.result = false;
   p.call(s, c, e);
   return e.result;
   //}catch(te){
      // debugger
      //return alert(te.message + '\n------------------------------------------------------------\n' + c.code)
   //}
}
