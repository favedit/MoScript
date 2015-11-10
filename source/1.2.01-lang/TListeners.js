//==========================================================
// <T>监听器集合管理的工具类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
MO.TListeners = function TListeners(){
   var o = this;
   //..........................................................
   // @attribute
   o._listeners = null;
   //..........................................................
   // @method
   o.isEmpty    = MO.TListeners_isEmpty;
   o.find       = MO.TListeners_find;
   o.register   = MO.TListeners_register;
   o.unregister = MO.TListeners_unregister;
   o.push       = MO.TListeners_push;
   o.remove     = MO.TListeners_remove;
   o.process    = MO.TListeners_process;
   o.clear      = MO.TListeners_clear;
   o.dispose    = MO.TListeners_dispose;
   //..........................................................
   // @method
   o.dump       = MO.TListeners_dump;
   return o;
}

//==========================================================
// <T>判断是否为空。</T>
//
// @method
// @return Boolean 是否为空
//==========================================================
MO.TListeners_isEmpty = function TListeners_isEmpty(){
   var listeners = this._listeners;
   return listeners ? listeners.isEmpty() : true;
}

//==========================================================
// <T>查找一个监听器。</T>
//
// @method
// @param owner:Object 处理对象
// @param callback:Function 处理函数
// @return TListener 监听器
//==========================================================
MO.TListeners_find = function TListeners_find(owner, callback){
   var listeners = this._listeners;
   if(listeners){
      var count = listeners.count();
      for(var i = 0; i < count; i++){
         var listener = listeners.at(i);
         if((listener._owner === owner) && (listener._callback === callback)){
            return listener;
         }
      }
   }
   return null;
}

//==========================================================
// <T>注册一个监听器。</T>
//
// @method
// @param owner:Object 处理对象
// @param callback:Function 处理函数
// @return TListener 监听器
//==========================================================
MO.TListeners_register = function TListeners_register(owner, callback){
   var o = this;
   // 检查是否已经注册
   var listener = o.find(owner, callback);
   if(listener){
      throw new MO.TError(o, 'Listener is already register. (owner={1}, process={2})', owner, callback);
   }
   // 注册监听器
   listener = new MO.TListener();
   listener._owner = owner;
   listener._callback = callback;
   o.push(listener);
   // 返回监听器
   return listener;
}

//==========================================================
// <T>注销一个监听器。</T>
//
// @method
// @param owner:Object 处理对象
// @param callback:Function 处理函数
//==========================================================
MO.TListeners_unregister = function TListeners_unregister(owner, callback){
   var o = this;
   // 检查是否已经注册
   var listener = o.find(owner, callback);
   if(!listener){
      throw new MO.TError(o, 'Listener is not register. (owner={1}, process={2})', owner, callback);
   }
   // 注销监听器
   o.remove(listener);
   // 返回监听器
   listener.dispose();
}

//==========================================================
// <T>添加一个监听器对象到当前管理器内。</T>
//
// @method
// @param listener:TListener 监听器对象
//==========================================================
MO.TListeners_push = function TListeners_push(listener){
   var o = this;
   // 检查参数
   if(!listener){
      throw new MO.TError(o, 'Listener is null.');
   }
   if(!listener._callback){
      throw new MO.TError(o, 'Listener process is null.');
   }
   // 增加监听器
   var listeners = o._listeners;
   if(!listeners){
      listeners = o._listeners = new MO.TObjects();
   }
   listeners.push(listener);
}

//==========================================================
// <T>移除一个监听器对象到当前管理器内。</T>
//
// @method
// @param listener:TListener 监听器对象
//==========================================================
MO.TListeners_remove = function TListeners_remove(listener){
   var o = this;
   // 检查参数
   if(!listener){
      throw new MO.TError(o, 'Listener is null.');
   }
   // 移除监听器
   o._listeners.remove(listener);
}

//==========================================================
// <T>向所有监视器发出调用处理。</T>
//
// @method
// @param ps:sender:Object 发出对象
// @param p1:parameter1:Object 参数1
// @param p2:parameter2:Object 参数2
// @param p3:parameter3:Object 参数3
// @param p4:parameter4:Object 参数4
// @param p5:parameter5:Object 参数5
//==========================================================
MO.TListeners_process = function TListeners_process(ps, p1, p2, p3, p4, p5){
   var listeners = this._listeners;
   if(listeners){
      var count = listeners.count();
      for(var i = 0; i < count; i++){
         listeners.at(i).process(ps, p1, p2, p3, p4, p5);
      }
   }
}

//==========================================================
// <T>清空处理。</T>
//==========================================================
MO.TListeners_clear = function TListeners_clear(){
   var listeners = this._listeners;
   if(listeners){
      listeners.clear();
   }
}

//============================================================
// <T>释放处理。</T>
//
// @method
//============================================================
MO.TListeners_dispose = function TListeners_dispose(){
   var o = this;
   var listeners = o._listeners;
   if(listeners){
      for(var i = listeners.count() - 1; i >= 0; i--){
         listeners.at(i).dispose();
      }
      o._listeners = MO.Lang.Object.dispose(listeners);
   }
   MO.Lang.Object.free(o);
}

//==========================================================
// <T>获得运行信息。</T>
//
// @method
// @return String 运行信息
//==========================================================
MO.TListeners_dump = function TListeners_dump(){
   var o = this;
   var result = new MO.TString();
   result.append(MO.Class.name(o));
   var listeners = o._listeners;
   var count = listeners.count();
   for(var i = 0; i < count; i++){
      result.append('\n   ' + listeners.at(i));
   }
   return result.flush();
}
