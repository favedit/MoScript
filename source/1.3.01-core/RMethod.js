//==========================================================
// <T>对象类的函数处理的工具类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
MO.RListener = function RListener(){
   var o = this;
   //..........................................................
   // @attribute
   o._listeners = new Object();
   return o;
}

//==========================================================
// <T>创建一个添加监听函数。</T>
//
// @method
// @param methodName:String 函数名称
// @param code:String 代码
// @return Function 函数
//==========================================================
MO.RListener.prototype.makeAddListener = function RListener_makeAddListener(methodName, code){
   var o = this;
   var method = null;
   if(o._listeners[methodName]){
      method = o._listeners[methodName];
   }else{
      // 创建虚函数对象
      var source = 'return this.addListener(\''+ code +'\',owner,callback);';
      method = new Function('owner', 'callback', source);
      o._listeners[methodName] = method;
   }
   return method;
}

//==========================================================
// <T>创建一个设置监听函数。</T>
//
// @method
// @param methodName:String 函数名称
// @param code:String 代码
// @return Function 函数
//==========================================================
MO.RListener.prototype.makeSetListener = function RListener_makeSetListener(methodName, code){
   var o = this;
   var method = null;
   if(o._listeners[methodName]){
      method = o._listeners[methodName];
   }else{
      // 创建虚函数对象
      var source = 'return this.setListener(\''+ code +'\',owner,callback);';
      method = new Function('owner', 'callback', source);
      o._listeners[methodName] = method;
   }
   return method;
}

//==========================================================
// <T>创建一个注销监听函数。</T>
//
// @method
// @param methodName:String 函数名称
// @param code:String 代码
// @return Function 函数
//==========================================================
MO.RListener.prototype.makeRemoveListener = function RListener_makeRemoveListener(methodName, code){
   var o = this;
   var method = null;
   if(o._listeners[methodName]){
      method = o._listeners[methodName];
   }else{
      // 创建虚函数对象
      var source = 'return this.removeListener(\''+ code +'\',owner,callback);';
      method = new Function('owner', 'callback', source);
      o._listeners[methodName] = method;
   }
   return method;
}

//==========================================================
// <T>创建一个清空监听集合函数。</T>
//
// @method
// @param methodName:String 函数名称
// @param code:String 代码
// @return Function 函数
//==========================================================
MO.RListener.prototype.makeClearListener = function RListener_makeClearListener(methodName, code){
   var o = this;
   var method = null;
   if(o._listeners[methodName]){
      method = o._listeners[methodName];
   }else{
      // 创建虚函数对象
      var source = 'return this.clearListeners(\''+ code +'\');';
      method = new Function(source);
      o._listeners[methodName] = method;
   }
   return method;
}

//==========================================================
// <T>创建一个处理监听函数。</T>
//
// @method
// @param methodName:String 函数名称
// @param code:String 代码
// @return Function 函数
//==========================================================
MO.RListener.prototype.makeProcessListener = function RListener_makeProcessListener(methodName, code){
   var o = this;
   var method = null;
   if(o._listeners[methodName]){
      method = o._listeners[methodName];
   }else{
      // 创建虚函数对象
      var source = 'return this.processListener(\''+ code +'\', p1, p2, p3, p4, p5, p6);';
      method = new Function('p1', 'p2', 'p3', 'p4', 'p5', 'p6', source);
      o._listeners[methodName] = method;
   }
   return method;
}

//..........................................................
// 实例化内容
MO.RListener = new MO.RListener();
