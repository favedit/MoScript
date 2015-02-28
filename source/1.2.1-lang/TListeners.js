//==========================================================
// <T>监听器集合管理的工具类。</T>
//
// @tool
// @author maocy
// @version 141229
//==========================================================
function TListeners(){
   var o = this;
   //..........................................................
   // @attribute
   o._listeners = null;
   //..........................................................
   // @method
   o.isEmpty    = TListeners_isEmpty;
   o.find       = TListeners_find;
   o.register   = TListeners_register;
   o.unregister = TListeners_unregister;
   o.push       = TListeners_push;
   o.remove     = TListeners_remove;
   o.process    = TListeners_process;
   o.clear      = TListeners_clear;
   //..........................................................
   // @method
   o.dump       = TListeners_dump;
   return o;
}

//==========================================================
// <T>判断是否为空。</T>
//
// @method
// @return Boolean 是否为空
//==========================================================
function TListeners_isEmpty(){
   var s = this._listeners;
   return s ? s.isEmpty() : true;
}

//==========================================================
// <T>查找一个监听器。</T>
//
// @method
// @param w:owner:Object 处理对象
// @param p:process:Function 处理函数
// @return TListener 监听器
//==========================================================
function TListeners_find(w, p){
   var s = this._listeners;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var l = s.getAt(i);
         if(l._owner == w){
            if(l._callback == p){
               return l;
            }
         }
      }
   }
   return null;
}

//==========================================================
// <T>注册一个监听器。</T>
//
// @method
// @param w:owner:Object 处理对象
// @param p:process:Function 处理函数
// @return TListener 监听器
//==========================================================
function TListeners_register(w, p){
   var o = this;
   // 检查是否已经注册
   var l = o.find(w, p);
   if(l){
      throw new TError(o, 'Listener is already register. (owner={1}, process={2})', w, p);
   }
   // 注册监听器
   l = new TListener();
   l._owner = w;
   l._callback = p;
   o.push(l);
   // 返回监听器
   return l;
}

//==========================================================
// <T>注销一个监听器。</T>
//
// @method
// @param w:owner:Object 处理对象
// @param p:process:Function 处理函数
//==========================================================
function TListeners_unregister(w, p){
   var o = this;
   // 检查是否已经注册
   var l = o.find(w, p);
   if(!l){
      throw new TError(o, 'Listener is not register. (owner={1}, process={2})', w, p);
   }
   // 注销监听器
   o.remove(l);
   // 返回监听器
   l.dispose();
}

//==========================================================
// <T>添加一个监听器对象到当前管理器内。</T>
//
// @method
// @param l:listener:TListener 监听器对象
//==========================================================
function TListeners_push(l){
   var o = this;
   // 检查参数
   if(!l){
      throw new TError(o, 'Listener is null.');
   }
   if(!l._callback){
      throw new TError(o, 'Listener process is null.');
   }
   // 增加监听器
   var s = o._listeners;
   if(!s){
      s = o._listeners = new TObjects();
   }
   s.push(l);
}

//==========================================================
// <T>移除一个监听器对象到当前管理器内。</T>
//
// @method
// @param l:listener:TListener 监听器对象
//==========================================================
function TListeners_remove(l){
   var o = this;
   // 检查参数
   if(!l){
      throw new TError(o, 'Listener is null.');
   }
   // 移除监听器
   o._listeners.remove(l);
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
function TListeners_process(ps, p1, p2, p3, p4, p5){
   var s = this._listeners;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         s.getAt(i).process(ps, p1, p2, p3, p4, p5);
      }
   }
}

//==========================================================
// <T>清空处理。</T>
//==========================================================
function TListeners_clear(){
   var s = this._listeners;
   if(s){
      s.clear();
   }
}

//==========================================================
// <T>获得运行信息。</T>
//
// @method
// @return String 运行信息
//==========================================================
function TListeners_dump(){
   var o = this;
   var r = new TString();
   r.append(RClass.name(o));
   var s = o._listeners;
   var c = s.count();
   for(var i = 0; i < c; i++){
      r.append('\n   ' + s.getAt(i));
   }
   return r.flush();
}
