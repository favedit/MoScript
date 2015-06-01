with(MO){
   //==========================================================
   // <T>拖拽对象控制台。</T>
   //
   // @console
   // @author maocy
   // @version 150121
   //==========================================================
   MO.FDragConsole = function FDragConsole(o){
      o = RClass.inherits(this, o, FConsole);
      //..........................................................
      // @attribute
      o._scopeCd        = EScope.Local;
      // @attribute
      o._activeDragable = null;
      o._dragables      = null;
      //..........................................................
      // @event
      o.onMouseDown     = FDragConsole_onMouseDown;
      o.onMouseMove     = FDragConsole_onMouseMove;
      o.onMouseUp       = FDragConsole_onMouseUp;
      //..........................................................
      // @method
      o.construct       = FDragConsole_construct;
      // method
      o.register        = FDragConsole_register;
      o.unregister      = FDragConsole_unregister;
      o.clear           = FDragConsole_clear;
      // method
      return o;
   }

   //==========================================================
   // <T>鼠标按下处理。</T>
   //
   // @method
   // @param p:event:htmlEvent 事件
   //==========================================================
   MO.FDragConsole_onMouseDown = function FDragConsole_onMouseDown(p){
      var o = this;
      // 检查来源
      var es = p.source;
      if(!es){
         return;
      }
      // 检查类型
      if(!RClass.isClass(es, MUiDragable)){
         return;
      }
      // 拖拽处理
      RWindow.setOptionSelect(false);
      o._activeDragable = es;
      es.onDragStart(p);
   }

   //==========================================================
   // <T>鼠标移动处理。</T>
   //
   // @method
   // @param p:event:htmlEvent 事件
   //==========================================================
   MO.FDragConsole_onMouseMove = function FDragConsole_onMouseMove(p){
      var o = this;
      // 检查拖拽处理
      if(!o._activeDragable){
         return;
      }
      // 拖拽处理
      o._activeDragable.onDragMove(p);
   }

   //==========================================================
   // <T>鼠标抬起处理。</T>
   //
   // @method
   // @param p:event:htmlEvent 事件
   //==========================================================
   MO.FDragConsole_onMouseUp = function FDragConsole_onMouseUp(p){
      var o = this;
      // 检查拖拽处理
      if(!o._activeDragable){
         return;
      }
      // 拖拽处理
      RWindow.setOptionSelect(true);
      o._activeDragable.onDragStop(p);
      o._activeDragable = null;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDragConsole_construct = function FDragConsole_construct(){
      var o = this;
      o.__base.FConsole.construct.call(o);
      // 创建属性
      o._dragables = new TObjects();
      // 注册事件
      RWindow.lsnsMouseDown.register(o, o.onMouseDown);
      RWindow.lsnsMouseMove.register(o, o.onMouseMove);
      RWindow.lsnsMouseUp.register(o, o.onMouseUp);
   }

   //==========================================================
   // <T>注册一个可拖拽对象。</T>
   //
   // @method
   // @param p:dragable:MUiDragable 拖拽对象
   //==========================================================
   MO.FDragConsole_register = function FDragConsole_register(p){
      this._dragables.push(p);
   }

   //==========================================================
   // <T>注销一个可拖拽对象。</T>
   //
   // @method
   // @param p:dragable:MUiDragable 拖拽对象
   //==========================================================
   MO.FDragConsole_unregister = function FDragConsole_unregister(po, pc){
      this._dragables.remove(p);
   }

   //==========================================================
   // <T>清空处理。</T>
   //
   // @method
   //==========================================================
   MO.FDragConsole_clear = function FDragConsole_clear(){
      this._dragables.clear();
   }
}
