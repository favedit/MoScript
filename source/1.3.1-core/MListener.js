//==========================================================
// <T>监听器接口。</T>
//
// @console
// @author maocy
// @version 150130
//==========================================================
function MListener(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @attribute
   o._listeners      = null;
   //..........................................................
   // @method
   o.addListener     = MListener_addListener;
   o.removeListener  = MListener_removeListener;
   // @method
   o.processListener = MListener_processListener;
   return o;
}

//==========================================================
// <T>注册一个监听器。</T>
//
// @method
// @param n:name:String 名称
// @param w:owner:String 拥有者
// @param m:method:Function 函数
//==========================================================
function MListener_addListener(n, w, m){
   var o = this;
   // 获得监听器集合对象
   var lss = o._listeners;
   if(!lss){
      lss = o._listeners = new Object();
   }
   // 获得监听器集合
   var ls = lss[n];
   if(!ls){
      ls = lss[n] = new TListeners();
   }
   return ls.register(w, m);
}

//==========================================================
// <T>注销一个监听器。</T>
//
// @method
// @param n:name:String 名称
// @param w:owner:String 拥有者
// @param m:method:Function 函数
//==========================================================
function MListener_removeListener(n, w, m){
   var o = this;
   var lss = o._listeners;
   var ls = lss[n];
   return ls.unregister(w, m);
}

//==========================================================
// <T>监听处理。</T>
//
// @method
// @param n:name:String 名称
// @param p1:parameter1:Object 参数1
// @param p2:parameter2:Object 参数1
// @param p3:parameter3:Object 参数1
// @param p4:parameter4:Object 参数1
// @param p5:parameter5:Object 参数1
//==========================================================
function MListener_processListener(n, p1, p2, p3, p4, p5){
   var o = this;
   var lss = o._listeners;
   if(lss){
      var ls = lss[n];
      if(ls){
         ls.process(p1, p2, p3, p4, p5);
      }
   }
}
