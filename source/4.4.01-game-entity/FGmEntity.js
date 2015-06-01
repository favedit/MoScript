with(MO){
    //==========================================================
   // <T>游戏实例对象。</T>
   //
   // @class
   // @author maocy
   // @history 150419
   //==========================================================
   MO.FGmEntity = function FGmEntity(o){
      o = RClass.inherits(this, o, FComponent);
      //..........................................................
      // @method
      o._location      = null;
      o._rotation      = null;
      o._scale         = null;
      // @method
      o._controllers   = null;
      o._displays      = null;
      //..........................................................
      // @method
      o.construct      = FGmEntity_construct;
      // @method
      o.location       = FGmEntity_location;
      o.rotation       = FGmEntity_rotation;
      o.scale          = FGmEntity_scale;
      // @method
      o.findController = FGmEntity_findController;
      // @method
      o.hasDisplay     = FGmEntity_hasDisplay;
      o.findDisplay    = FGmEntity_findDisplay;
      o.displays       = FGmEntity_displays;
      o.pushDisplay    = FGmEntity_pushDisplay;
      o.removeDisplay  = FGmEntity_removeDisplay;
      // @method
      o.selectClip     = FGmEntity_selectClip;
      // @method
      o.update         = FGmEntity_update;
      o.process        = FGmEntity_process;
      // @method
      o.dispose        = FGmEntity_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FGmEntity_construct = function FGmEntity_construct(){
      var o = this;
      o.__base.FComponent.construct.call(o);
      // 设置属性
      o._location = new SPoint3(0, 0, 0);
      o._rotation = new SVector3(0, 0, 0);
      o._scale = new SVector3(1, 1, 1);
      // 设置属性
      o._controllers = new TDictionary();
   }

   //==========================================================
   // <T>获得坐标。</T>
   //
   // @method
   // @return SPoint3 坐标
   //==========================================================
   MO.FGmEntity_location = function FGmEntity_location(){
      return this._location;
   }

   //==========================================================
   // <T>获得旋转。</T>
   //
   // @method
   // @return SVector3 旋转
   //==========================================================
   MO.FGmEntity_rotation = function FGmEntity_rotation(){
      return this._rotation;
   }

   //==========================================================
   // <T>获得缩放。</T>
   //
   // @method
   // @return SVector3 缩放
   //==========================================================
   MO.FGmEntity_scale = function FGmEntity_scale(){
      return this._scale;
   }

   //==========================================================
   // <T>根据类对象查找一个控制器。</T>
   //
   // @method
   // @param clazz:Function 类对象
   // @return FGmEntityController 控制器
   //==========================================================
   MO.FGmEntity_findController = function FGmEntity_findController(clazz){
      var o = this;
      var className = RClass.name(clazz);
      var controller = o._controllers.get(className);
      if(!controller){
         controller = RClass.create(clazz);
         controller.linkEntity(o);
         o._controllers.set(className, controller);
      }
      return controller;
   }

   //==========================================================
   // <T>判断是否含有子节点。</T>
   //
   // @method
   // @return Boolean 是否含有
   //==========================================================
   MO.FGmEntity_hasDisplay = function FGmEntity_hasDisplay(){
      var displays = this._displays;
      if(displays){
         return !displays.isEmpty();
      }
      return false;
   }

   //==========================================================
   // <T>根据代码查找显示对象。</T>
   //
   // @method
   // @param code:String 代码
   // @return FDisplay 显示对象
   //==========================================================
   MO.FGmEntity_findDisplay = function FGmEntity_findDisplay(code){
      var o = this;
      var displays = o._displays;
      if(displays){
         var count = displays.count();
         for(var i = 0; i < count; i++){
            var display = displays.at(i);
            if(display.code() == code){
               return display;
            }
         }
      }
      return null
   }

   //==========================================================
   // <T>获得显示集合。</T>
   //
   // @method
   // @return TObjects 显示集合
   //==========================================================
   MO.FGmEntity_displays = function FGmEntity_displays(){
      return this._displays;
   }

   //==========================================================
   // <T>增加一个显示对象。</T>
   //
   // @method
   // @param display:FDisplay 显示对象
   //==========================================================
   MO.FGmEntity_pushDisplay = function FGmEntity_pushDisplay(display){
      var o = this;
      var displays = o._displays;
      if(!displays){
         displays = o._displays = new TObjects();
      }
      displays.push(display);
   }

   //==========================================================
   // <T>移除一个显示对象。</T>
   //
   // @method
   // @param display:FDisplay 显示对象
   //==========================================================
   MO.FGmEntity_removeDisplay = function FGmEntity_removeDisplay(display){
      this._displays.remove(display);
   }

   //==========================================================
   // <T>选中一个剪辑对象。</T>
   //
   // @method
   // @param code:String 代码
   //==========================================================
   MO.FGmEntity_selectClip = function FGmEntity_selectClip(code){
      var o = this;
      var displays = o._displays;
      if(displays){
         var count = displays.count();
         for(var i = 0; i < count; i++){
            var display = displays.at(i);
            display.selectClip(code);
         }
      }
   }

   //==========================================================
   // <T>更新处理。</T>
   //
   // @method
   //==========================================================
   MO.FGmEntity_update = function FGmEntity_update(){
      var o = this;
      // 获得属性
      var location = o._location;
      var rotation = o._rotation;
      var scale = o._scale;
      // 设置显示集合
      var displays = o._displays;
      if(displays){
         var count = displays.count();
         for(var i = 0; i < count; i++){
            var display = displays.at(i);
            var matrix = display.matrix();
            //matrix.setTranslate(location.x, location.z, location.y);
            matrix.setAll(location.x, location.z, location.y, rotation.x, rotation.z, rotation.y, scale.x, scale.z, scale.y);
            matrix.update();
         }
      }
   }

   //==========================================================
   // <T>逻辑处理。</T>
   //
   // @method
   //==========================================================
   MO.FGmEntity_process = function FGmEntity_process(){
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FGmEntity_dispose = function FGmEntity_dispose(){
      var o = this;
      // 释放对象
      o._location = RObject.dispose(o._location);
      o._rotation = RObject.dispose(o._rotation);
      o._scale = RObject.dispose(o._scale);
      // 父处理
      o.__base.FComponent.dispose.call(o);
   }
}
