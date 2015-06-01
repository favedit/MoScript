with(MO){
   //==========================================================
   // <T>场景控制台。</T>
   //
   // @console
   // @author maocy
   // @version 150106
   //==========================================================
   MO.FE3dStageConsole = function FE3dStageConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._scopeCd  = EScope.Local;
      // @attribute
      o._looper   = null;
      // @attribute
      o._thread   = null;
      o._interval = 25;
      o._limit    = 8;
      //..........................................................
      // @event
      o.onProcess = FE3dStageConsole_onProcess;
      //..........................................................
      // @method
      o.construct = FE3dStageConsole_construct;
      o.process   = FE3dStageConsole_process;
      return o;
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dStageConsole_onProcess = function FE3dStageConsole_onProcess(){
      var o = this;
      var s = o._looper;
      s.record();
      for(var i = o._limit - 1; i >= 0; i--){
         var r = s.next();
         if(r){
            r.processDelay(r._linkRegion);
         }else{
            break;
         }
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FE3dStageConsole_construct = function FE3dStageConsole_construct(){
      var o = this;
      // 设置属性
      o._looper = new TLooper();
      o._renderables = new TDictionary();
      // 创建线程
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.addProcessListener(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   // @param p:region:FG3dRegion 区域
   //==========================================================
   MO.FE3dStageConsole_process = function FE3dStageConsole_process(p){
      var o = this;
      // 放入处理队列中
      var s = p.allRenderables();
      for(var i = s.count() - 1; i >= 0; i--){
         var r = s.getAt(i);
         if(!r._linkStageLooper){
            o._looper.push(r);
            r._linkRegion = p;
            r._linkStageLooper = o._looper;
         }
      }
   }
}
