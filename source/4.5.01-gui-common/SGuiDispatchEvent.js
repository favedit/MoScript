with(MO){
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
   MO.SGuiDispatchEvent = function SGuiDispatchEvent(owner, invokeName, clazz){
      var o = this;
      //..........................................................
      // @attribute
      o.owner    = owner;
      o.invoke   = invokeName;
      o.clazz    = RClass.name(clazz);
      // @attribute
      o.invokeCd = EEventInvoke.Unknown;
      //..........................................................
      // @method
      o.isBefore = SGuiDispatchEvent_isBefore;
      o.isAfter  = SGuiDispatchEvent_isAfter;
      // @method
      o.dispose  = SGuiDispatchEvent_dispose;
      o.dump     = SGuiDispatchEvent_dump;
      return o;
   }

   //==========================================================
   // <T>测试是否是事件前处理。</T>
   // 
   // @return Boolean 事件前处理
   //==========================================================
   MO.SGuiDispatchEvent_isBefore = function SGuiDispatchEvent_isBefore(){
      return this.invokeCd == EEventInvoke.Before;
   }

   //==========================================================
   // <T>测试是否是事件后处理。</T>
   // 
   // @return Boolean 事件后处理
   //==========================================================
   MO.SGuiDispatchEvent_isAfter = function SGuiDispatchEvent_isAfter(){
      return this.invokeCd == EEventInvoke.After;
   }

   //==========================================================
   // <T>释放当前实例。</T>
   //
   // @method
   //==========================================================
   MO.SGuiDispatchEvent_dispose = function SGuiDispatchEvent_dispose(){
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
   MO.SGuiDispatchEvent_dump = function SGuiDispatchEvent_dump(){
      var o = this;
      return RClass.dump(o) + ':owner=' + o.owner + ',type=' + o.type + '.invoke=' + RMethod.name(o.invoke);
   }
}
