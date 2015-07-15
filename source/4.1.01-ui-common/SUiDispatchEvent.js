//==========================================================
// <T>事件处理类。</T>
//
// @tool
// @param owner:Object 拥有者
// @param invokeName:String 函数名称
// @param clazz:Function 类名称
// @author maocy
// @version 141231
//==========================================================
MO.SUiDispatchEvent = function SUiDispatchEvent(owner, invokeName, clazz){
   var o = this;
   MO.SEvent.call(o);
   //..........................................................
   // @attribute
   o.owner    = owner;
   o.invoke   = invokeName;
   o.clazz    = MO.Class.name(clazz);
   // @attribute
   o.invokeCd = MO.EEventInvoke.Unknown;
   //..........................................................
   // @method
   o.isBefore = MO.SUiDispatchEvent_isBefore;
   o.isAfter  = MO.SUiDispatchEvent_isAfter;
   // @method
   o.dispose  = MO.SUiDispatchEvent_dispose;
   o.dump     = MO.SUiDispatchEvent_dump;
   return o;
}

//==========================================================
// <T>测试是否是事件前处理。</T>
// 
// @return Boolean 事件前处理
//==========================================================
MO.SUiDispatchEvent_isBefore = function SUiDispatchEvent_isBefore(){
   return this.invokeCd == MO.EEventInvoke.Before;
}

//==========================================================
// <T>测试是否是事件后处理。</T>
// 
// @return Boolean 事件后处理
//==========================================================
MO.SUiDispatchEvent_isAfter = function SUiDispatchEvent_isAfter(){
   return this.invokeCd == MO.EEventInvoke.After;
}

//==========================================================
// <T>释放当前实例。</T>
//
// @method
//==========================================================
MO.SUiDispatchEvent_dispose = function SUiDispatchEvent_dispose(){
   var o = this;
   o.owner = null;
   o.invoke = null;
   o.clazz = null;
   o.invokeCd = null;
}

//==========================================================
// <T>获取事件对象的运行信息。</T>
// 
// @method
// @return String 运行信息
//==========================================================
MO.SUiDispatchEvent_dump = function SUiDispatchEvent_dump(){
   var o = this;
   return MO.Class.dump(o) + ':owner=' + o.owner + ',type=' + o.type + '.invoke=' + MO.Method.name(o.invoke);
}
