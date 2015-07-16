//==========================================================
// <T>事件处理类。</T>
//
// @tool
// @param po:owner:Object 拥有者
// @param pm:method:String 函数名称
// @param pc:class:Function 类名称
// @author maocy
// @version 141231
//==========================================================
MO.TEventProcess = function TEventProcess(po, pm, pc){
   var o = this;
   //..........................................................
   // @attribute
   o.owner    = po;
   o.invoke   = pm;
   o.clazz    = MO.Class.name(pc);
   // @attribute
   o.invokeCd = MO.EEventInvoke.Unknown;
   //..........................................................
   // @method
   o.isBefore = MO.TEventProcess_isBefore;
   o.isAfter  = MO.TEventProcess_isAfter;
   // @method
   o.dispose  = MO.TEventProcess_dispose;
   o.dump     = MO.TEventProcess_dump;
   return o;
}

//==========================================================
// <T>测试是否是事件前处理。</T>
// 
// @return Boolean 事件前处理
//==========================================================
MO.TEventProcess_isBefore = function TEventProcess_isBefore(){
   return this.invokeCd == MO.EEventInvoke.Before;
}

//==========================================================
// <T>测试是否是事件后处理。</T>
// 
// @return Boolean 事件后处理
//==========================================================
MO.TEventProcess_isAfter = function TEventProcess_isAfter(){
   return this.invokeCd == MO.EEventInvoke.After;
}

//==========================================================
// <T>释放当前实例。</T>
//
// @method
//==========================================================
MO.TEventProcess_dispose = function TEventProcess_dispose(){
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
MO.TEventProcess_dump = function TEventProcess_dump(){
   var o = this;
   return RClass.dump(o) + ':owner=' + o.owner + ',type=' + o.type + '.invoke=' + RMethod.name(o.invoke);
}
