with(MO){
   //==========================================================
   // <T>事件控制台。</T>
   //
   // @console
   // @author maocy
   // @version 150125
   //==========================================================
   MO.FEventConsole = function FEventConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._scopeCd       = EScope.Local;
      // @attribute
      o._thread        = null;
      o._interval      = 100;
      // @attribute
      o._processEvents = null;
      o._events        = null;
      //..........................................................
      // @event
      o.onProcess      = FEventConsole_onProcess;
      //..........................................................
      // @method
      o.construct      = FEventConsole_construct;
      // method
      o.register       = FEventConsole_register;
      o.push           = FEventConsole_push;
      o.clear          = FEventConsole_clear;
      return o;
   }

   //==========================================================
   // <T>事件后台处理。</T>
   //
   // @method
   //==========================================================
   MO.FEventConsole_onProcess = function FEventConsole_onProcess(){
      var o = this;
      // 检查数据
      var es = o._events;
      if(es.isEmpty()){
         return;
      }
      // 接收事件
      var ps = o._processEvents;
      ps.assign(es);
      es.clear();
      // 事件处理
      var c = ps.count();
      if(c > 0){
         // 执行事件
         for(var i = 0; i < c; i++){
            ps.get(i).process();
         }
         // 清除运行队列
         ps.clear();
      }
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEventConsole_construct = function FEventConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      // 创建属性
      o._processEvents = new TObjects();
      o._events = new TObjects();
      // 创建线程
      var t = o._thread = RClass.create(FThread);
      t.setInterval(o._interval);
      t.lsnsProcess.register(o, o.onProcess);
      RConsole.find(FThreadConsole).start(t);
      MO.Logger.debug(o, 'Add event thread. (thread={1})', RClass.dump(t));
   }

   //==========================================================
   // <T>注册一个事件。</T>
   //
   // @method
   // @param po:owner:Object 对象
   // @param pc:process:Function 处理
   //==========================================================
   MO.FEventConsole_register = function FEventConsole_register(po, pc){
      var o = this;
      var e = RClass.create(FEvent);
      e.owner = po;
      e.callback = pc;
      o._events.push(e);
   }

   //==========================================================
   // <T>增加一个事件。</T>
   //
   // @method
   // @param p:event:FEvent 事件
   //==========================================================
   MO.FEventConsole_push = function FEventConsole_push(p){
      var o = this;
      var es = o._events;
      if(!es.contains(p)){
         es.push(p);
      }
   }

   //==========================================================
   // <T>清空处理。</T>
   //
   // @method
   //==========================================================
   MO.FEventConsole_clear = function FEventConsole_clear(){
      this._events.clear();
   }
}
