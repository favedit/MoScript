//==========================================================
// <T>监听器接口。</T>
//
// @console
// @author maocy
// @version 150130
//==========================================================
MO.MListener = function MListener(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @attribute
   o._listenerss       = null;
   //..........................................................
   // @method
   o.addListener       = MO.MListener_addListener;
   o.setListener       = MO.MListener_setListener;
   o.removeListener    = MO.MListener_removeListener;
   o.clearListeners    = MO.MListener_clearListeners;
   o.clearAllListeners = MO.MListener_clearAllListeners;
   // @method
   o.processListener   = MO.MListener_processListener;
   // @method
   o.dispose           = MO.MListener_dispose;
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
MO.MListener_addListener = function MListener_addListener(name, owner, method){
   var o = this;
   // 获得监听器集合对象
   var listenerss = o._listenerss;
   if(!listenerss){
      listenerss = o._listenerss = new MO.TDictionary();
   }
   // 获得监听器集合
   var listeners = listenerss.get(name);
   if(!listeners){
      listeners = new MO.TListeners();
      listenerss.set(name, listeners);
   }
   // 检查重复
   var listener = listeners.find(owner, method);
   if(!listener){
      listener = listeners.register(owner, method);
   }
   return listener;
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
MO.MListener_setListener = function MListener_setListener(name, owner, method){
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
MO.MListener_removeListener = function MListener_removeListener(name, owner, method){
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
MO.MListener_clearListeners = function MListener_clearListeners(name){
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
MO.MListener_clearAllListeners = function MListener_clearAllListeners(){
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
MO.MListener_processListener = function MListener_processListener(name, p1, p2, p3, p4, p5){
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
MO.MListener_dispose = function MListener_dispose(){
   var o = this;
   var listenerss = o._listenerss;
   if(listenerss){
      for(var i = listenerss.count() - 1; i >= 0; i--){
         var listeners = listenerss.at(i);
         listeners.dispose();
      }
      o._listenerss = MO.Lang.Object.dispose(listenerss);
   }
}
