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
   o._listenerss       = null;
   //..........................................................
   // @method
   o.addListener       = MListener_addListener;
   o.setListener       = MListener_setListener;
   o.removeListener    = MListener_removeListener;
   o.clearListeners    = MListener_clearListeners;
   o.clearAllListeners = MListener_clearAllListeners;
   // @method
   o.processListener   = MListener_processListener;
   // @method
   o.dispose           = MListener_dispose;
   return o;
}

//==========================================================
// <T>注册一个监听器。</T>
//
// @method
// @param name:String 名称
// @param owner:String 拥有者
// @param method:Function 函数
// @return TListener 监听器
//==========================================================
function MListener_addListener(name, owner, method){
   var o = this;
   // 获得监听器集合对象
   var listenerss = o._listenerss;
   if(!listenerss){
      listenerss = o._listenerss = new TDictionary();
   }
   // 获得监听器集合
   var listeners = listenerss.get(name);
   if(!listeners){
      listeners = new TListeners();
      listenerss.set(name, listeners);
   }
   return listeners.register(owner, method);
}

//==========================================================
// <T>设置一个监听器。</T>
//
// @method
// @param name:String 名称
// @param owner:String 拥有者
// @param method:Function 函数
// @return TListener 监听器
//==========================================================
function MListener_setListener(name, owner, method){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      var listeners = listenerss.get(name);
      if(listeners){
         listeners.clear();
      }
   }
   return o.addListener(name, owner, method)
}

//==========================================================
// <T>注销一个监听器。</T>
//
// @method
// @param name:String 名称
// @param owner:String 拥有者
// @param method:Function 函数
//==========================================================
function MListener_removeListener(name, owner, method){
   var o = this;
   var listenerss = o._listenerss;
   var listeners = listenerss.get(name);
   return listeners.unregister(owner, method);
}

//==========================================================
// <T>清空一类监听器。</T>
//
// @method
// @param n:name:String 名称
//==========================================================
function MListener_clearListeners(name){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      var listeners = listenerss.get(name);
      if(listeners){
         listeners.clear();
      }
   }
}

//==========================================================
// <T>清空全部监听器。</T>
//
// @method
//==========================================================
function MListener_clearAllListeners(){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      var count = listenerss.count();
      for(var i = 0; i < count; i++){
         var listeners = listenerss.at(i);
         if(listeners){
            listeners.clear();
         }
      }
   }
}

//==========================================================
// <T>监听处理。</T>
//
// @method
// @param name:String 名称
// @param p1:parameter1:Object 参数1
// @param p2:parameter2:Object 参数1
// @param p3:parameter3:Object 参数1
// @param p4:parameter4:Object 参数1
// @param p5:parameter5:Object 参数1
//==========================================================
function MListener_processListener(name, p1, p2, p3, p4, p5){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      var listeners = listenerss.get(name);
      if(listeners){
         listeners.process(p1, p2, p3, p4, p5);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function MListener_dispose(){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      for(var i = listenerss.count() - 1; i >= 0; i--){
         var listeners = listenerss.at(i);
         listeners.dispose();
      }
      o._listenerss = RObject.dispose(listenerss);
   }
}
