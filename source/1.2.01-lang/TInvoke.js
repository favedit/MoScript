with(MO){
   //==========================================================
   // <T>函数回调的定义类。</T>
   //
   // @tool
   // @param o:object:Object 当前对象
   // @param w:owner:Object 调用对象
   // @param p:process: Function 处理函数
   // @author maocy
   // @version 141230
   //==========================================================
   MO.TInvoke = function TInvoke(){
      var o = this;
      //..........................................................
      // @attribute
      o.owner    = null;
      o.callback = null;
      // @method
      o.invoke   = TInvoke_invoke;
      return o;
   }

   //==========================================================
   // <T>进行函数的调用。</T>
   // <P>如果存在调用对象，则函数调用后，当前对象指向调用对象。</P>
   // <P>如果不存在调用对象，当前对象就指向回调类的对象。</P>
   //
   // @method
   // @param p1:param1:Object 参数1
   // @param p2:param2:Object 参数2
   // @param p3:param3:Object 参数3
   // @param p4:param4:Object 参数4
   // @param p5:param5:Object 参数5
   // @param p6:param6:Object 参数6
   //==========================================================
   MO.TInvoke_invoke = function TInvoke_invoke(p1, p2, p3, p4, p5, p6){
      var o = this;
      if(o.callback){
         var c = o.owner ? o.owner : o;
         try{
            o.callback.call(c, p1, p2, p3, p4, p5, p6);
         }catch(e){
            RLogger.fatal(o, e, 'Call method failure. (owner={1}, callback={2})', c, o.callback);
         }
      }
   }
}
