//==========================================================
// <T>音频环境。</T>
//
// @author sunpeng
// @history 150714
//==========================================================
MO.FAudioContextConsole = function FAudioContextConsole(o) {
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd  = MO.EScope.Global;
   // @attribute
   o._contexts = null;
   //..........................................................
   // @method
   o.construct = MO.FAudioContextConsole_construct;
   // @method
   o.create    = MO.FAudioContextConsole_create;
   // @method
   o.dispose   = MO.FAudioContextConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FAudioContextConsole_construct = function FAudioContextConsole_construct() {
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._contexts = new MO.TObjects();
}

//==========================================================
// <T>创建声音资源。</T>
//
// @method
// @param uri:String 网络地址
// @return AudioBufferSourceNode 音频缓冲
//==========================================================
MO.FAudioContextConsole_create = function FAudioContextConsole_create(uri) {
   var o = this;
   var context = MO.Class.create(MO.FAudioContext);
   context.setup();
   o._contexts.push(context);
   return context;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FAudioContextConsole_dispose = function FAudioContextConsole_dispose(){
   var o = this;
   // 释放属性
   o._contexts = MO.Lang.Object.dispose(o._contexts);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
