with(MO){
   //==========================================================
   // <T>树目录节点类型组件。</T>
   //
   // @component
   // @author maocy
   // @version 150119
   //==========================================================
   MO.FUiTreeNodeType = function FUiTreeNodeType(o){
      o = RClass.inherits(this, o, FUiComponent);
      //..........................................................
      // @oroperty
      o._code       = RClass.register(o, new APtyString('_code'));
      o._storage    = RClass.register(o, new APtyString('_storage'));
      o._icon       = RClass.register(o, new APtyString('_icon'));
      o._service    = RClass.register(o, new APtyString('_service'));
      o._action     = RClass.register(o, new APtyString('_action'));
      o._attributes = RClass.register(o, new APtyAttributes('_attributes'));
      //..........................................................
      // @method
      o.construct   = FUiTreeNodeType_construct;
      // @method
      o.code        = FUiTreeNodeType_code;
      o.storage     = FUiTreeNodeType_storage;
      o.icon        = FUiTreeNodeType_icon;
      o.service     = FUiTreeNodeType_service;
      o.action      = FUiTreeNodeType_action;
      // @method
      o.get         = FUiTreeNodeType_get;
      o.set         = FUiTreeNodeType_set;
      // @method
      o.innerDump   = FUiTreeNodeType_innerDump;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FUiTreeNodeType_construct = function FUiTreeNodeType_construct(){
      var o = this;
      o.__base.FUiComponent.construct.call(o);
   }

   //==========================================================
   // <T>获得代码。</T>
   //
   // @method
   // @return String 代码
   //==========================================================
   MO.FUiTreeNodeType_code = function FUiTreeNodeType_code(){
      return this._code;
   }

   //==========================================================
   // <T>获得存储类型。</T>
   //
   // @method
   // @return String 存储类型
   //==========================================================
   MO.FUiTreeNodeType_storage = function FUiTreeNodeType_storage(){
      return this._storage;
   }

   //==========================================================
   // <T>获得图标。</T>
   //
   // @method
   // @return String 图标
   //==========================================================
   MO.FUiTreeNodeType_icon = function FUiTreeNodeType_icon(){
      return this._icon;
   }

   //==========================================================
   // <T>获得服务名称。</T>
   //
   // @method
   // @return String 类型名称
   //==========================================================
   MO.FUiTreeNodeType_service = function FUiTreeNodeType_service(){
      return this._service;
   }

   //==========================================================
   // <T>获得命令名称</T>
   //
   // @method
   // @return String 类型名称
   //==========================================================
   MO.FUiTreeNodeType_action = function FUiTreeNodeType_action(){
      return this._action;
   }

   //==========================================================
   // 相应点击节点操作的函数
   //
   // @method
   // @param event:event:TEvent 构建事件
   // @return EEventStatus 枚举类型
   //==========================================================
   MO.FUiTreeNodeType_get = function FUiTreeNodeType_get(n){
      var s = this._attributes;
      return s ? s.get(n) : null;
   }

   //==========================================================
   // 相应点击节点操作的函数
   //
   // @method
   // @param event:event:TEvent 构建事件
   // @return EEventStatus 枚举类型
   //==========================================================
   MO.FUiTreeNodeType_set = function FUiTreeNodeType_set(n, v){
      var s = this._attributes;
      if(s){
         s.set(n, v)
      }
   }

   //==========================================================
   // 相应点击节点操作的函数
   //
   // @method
   // @param event:event:TEvent 构建事件
   // @return EEventStatus 枚举类型
   //==========================================================
   MO.FUiTreeNodeType_innerDump = function FUiTreeNodeType_innerDump(s){
      var o = this;
      s.append(RClass.dump(o));
      s.append('[code=',  o._code);
      s.append(', icon=',  o._icon);
      s.append(', service=', o._service);
      s.append(', action=', o._action);
      s.append(']');
   }
}
