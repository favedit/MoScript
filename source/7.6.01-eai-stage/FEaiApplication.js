with(MO){
   //==========================================================
   // <T>应用。</T>
   //
   // @class
   // @author maocy
   // @history 150606
   //==========================================================
   MO.FEaiApplication = function FEaiApplication(o){
      o = RClass.inherits(this, o, FApplication);
      //..........................................................
      // @attribute
      o._thread   = null;
      o._interval = 10;
      //..........................................................
      // @method
      o.construct = FEaiApplication_construct;
      // @method
      o.dispose   = FEaiApplication_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiApplication_construct = function FEaiApplication_construct(){
      var o = this;
      o.__base.FApplication.construct.call(o);
      // 创建线程
      var thread = o._thread = RClass.create(FThread);
      thread.setInterval(o._interval);
      thread.addProcessListener(o, o.process);
      RConsole.find(FThreadConsole).start(thread);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiApplication_dispose = function FEaiApplication_dispose(){
      var o = this;
      // 父处理
      o.__base.FApplication.dispose.call(o);
   }
}
