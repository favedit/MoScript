//==========================================================
// <T>测试对象加载器。</T>
//
// @class
// @author maocy
// @history 150701
//==========================================================
MO.FReadyLoader = function FReadyLoader(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MListener);
   //..........................................................
   // @attribute
   o._items           = MO.Class.register(o, new MO.AGetter('_items'));
   o._listenersChange = MO.Class.register(o, new MO.AListener('_listenersChange', MO.EEvent.Change));
   // @attribute
   o._statusEvent     = null;
   o._statusReady     = false;
   //..........................................................
   // @method
   o.construct        = MO.FReadyLoader_construct;
   // @method
   o.testReady        = MO.FReadyLoader_testReady;
   // @method
   o.push             = MO.FReadyLoader_push;
   o.clear            = MO.FReadyLoader_clear;
   // @method
   o.dispose          = MO.FReadyLoader_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FReadyLoader_construct = function FReadyLoader_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._items = new MO.TObjects();
   o._statusEvent = new MO.SEvent();
}

//==========================================================
// <T>测试准备好。</T>
//
// @method
// @return Boolean 是否准备好
//==========================================================
MO.FReadyLoader_testReady = function FReadyLoader_testReady(){
   var o = this;
   var ready = o._statusReady;
   if(!ready){
      // 检查状态
      var items = o._items;
      var count = items.count();
      for(var i = 0; i < count; i++){
         var item = items.at(i);
         if(!item.testReady()){
            return false;
         }
      }
      // 事件处理
      var event = o._statusEvent;
      event.ready = true;
      o.processChangeListener(event);
      // 设置状态
      ready = o._statusReady = true;
   }
   return ready;
}

//==========================================================
// <T>增加一个测试项目。</T>
//
// @method
// @param item:MReady 测试项目
//==========================================================
MO.FReadyLoader_push = function FReadyLoader_push(item){
   var o = this;
   o._items.push(item);
   o._statusReady = false;
}

//==========================================================
// <T>清空测试项目。</T>
//
// @method
//==========================================================
MO.FReadyLoader_clear = function FReadyLoader_clear(){
   var o = this;
   o._items.clear();
   o._statusReady = true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FReadyLoader_dispose = function FReadyLoader_dispose(){
   var o = this;
   // 释放属性
   o._items = MO.Lang.Object.dispose(o._items);
   o._statusEvent = MO.Lang.Object.dispose(o._statusEvent);
   // 父处理
   o.__base.MListener.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
