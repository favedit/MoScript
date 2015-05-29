with(MO){
    //==========================================================
   // <T>游戏实例剪辑控制器。</T>
   //
   // @class
   // @author maocy
   // @history 150419
   //==========================================================
   MO.FGmEntityClipController = function FGmEntityClipController(o){
      o = RClass.inherits(this, o, FGmEntityController);
      //..........................................................
      // @attribute
      o._queue     = null;
      //..........................................................
      // @method
      o.construct  = FGmEntityClipController_construct;
      // @method
      o.play       = FGmEntityClipController_play;
      o.process    = FGmEntityClipController_process;
      // @method
      o.dispose    = FGmEntityClipController_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGmEntityClipController_construct = function FGmEntityClipController_construct(){
      var o = this;
      o.__base.FGmEntityController.construct.call(o);
      // 设置属性
      o._queue = new TObjects();
   }

   //==========================================================
   // <T>播放剪辑命令。</T>
   //
   // @method
   // @param action:SGmEntityClipAction 命令
   //==========================================================
   MO.FGmEntityClipController_play = function FGmEntityClipController_play(action){
      var o = this;
      o._queue.push(action);
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FGmEntityClipController_process = function FGmEntityClipController_process(){
      var o = this;
      o.__base.FGmEntityController.process.call(o);
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FGmEntityClipController_dispose = function FGmEntityClipController_dispose(){
      var o = this;
      // 父处理
      o.__base.FGmEntityController.dispose.call(o);
   }
}
