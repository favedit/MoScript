with(MO){
   //==========================================================
   // <T>线程。</T>
   //
   // @class
   // @author maocy
   // @version 150105
   //==========================================================
   MO.FThread = function FThread(o){
      o = RClass.inherits(this, o, FObject, MListenerProcess);
      //..........................................................
      // @attribute
      o._name       = MO.Class.register(o, new MO.AGetter('_name'));
      o._statusCd   = MO.Class.register(o, new MO.AGetter('_statusCd'), EThreadStatus.Sleep);
      o._interval   = MO.Class.register(o, new MO.AGetSet('_interval'), 100);
      o._delay      = 0;
      //..........................................................
      // @method
      o.construct   = FThread_construct;
      // @method
      o.start       = FThread_start;
      o.stop        = FThread_stop;
      o.process     = FThread_process;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FThread_construct = function FThread_construct(){
      var o = this;
      o.__base.FObject.construct.call(o);
   }

   //==========================================================
   // <T>启动处理。</T>
   //
   // @method
   //==========================================================
   MO.FThread_start = function FThread_start(){
      this._statusCd = EThreadStatus.Active;
   }

   //==========================================================
   // <T>停止处理。</T>
   //
   // @method
   //==========================================================
   MO.FThread_stop = function FThread_stop(){
      this._statusCd = EThreadStatus.Finish;
   }

   //==========================================================
   // <T>调用处理。</T>
   //
   // @method
   // @param interval:integer 调用间隔
   // @return 名称
   //==========================================================
   MO.FThread_process = function FThread_process(interval){
      var o = this;
      if(o._delay <= 0){
         o.processProcessListener(o);
         o._delay = o._interval;
      }else{
         o._delay -= interval;
      }
   }
}
