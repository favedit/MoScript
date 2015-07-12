//============================================================
// <T>监听代码描述类。</T>
//
// @property
// @param name:String 名称
// @param linker:String 关联
// @author maocy
// @version 150611
//============================================================
MO.AListener = function AListener(name, linker){
   var o = this;
   MO.ASource.call(o, name, MO.ESource.Listener, linker);
   //..........................................................
   // @method
   o.build = MO.AListener_build;
   return o;
}

//============================================================
// <T>构建处理。</T>
//
// @method
// @param clazz:TClass 类对象
// @param instance:Object 实例
//============================================================
MO.AListener_build = function AListener_build(clazz, instance){
   var o = this;
   // 增加一个监听器
   var addListener = 'add' + o._linker + 'Listener';
   instance[addListener] = MO.RListener.makeAddListener(addListener, o._linker);
   // 设置一个监听器
   var setListener = 'set' + o._linker + 'Listener';
   instance[setListener] = MO.RListener.makeSetListener(setListener, o._linker);
   // 注销一个监听器
   var removeListener = 'remove' + o._linker + 'Listener';
   instance[removeListener] = MO.RListener.makeRemoveListener(removeListener, o._linker);
   // 清空全部监听器
   var clearListeners = 'clear' + o._linker + 'Listeners';
   instance[clearListeners] = MO.RListener.makeClearListener(clearListeners, o._linker);
   // 处理监听器
   var processListener = 'process' + o._linker + 'Listener';
   instance[processListener] = MO.RListener.makeProcessListener(processListener, o._linker);
}
