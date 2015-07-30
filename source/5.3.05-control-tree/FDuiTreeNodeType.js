with(MO){
   //==========================================================
   // <T>树目录节点类型组件。</T>
   //
   // @component
   // @author maocy
   // @version 150119
   //==========================================================
   MO.FDuiTreeNodeType = function FDuiTreeNodeType(o){
      o = RClass.inherits(this, o, FDuiComponent);
      //..........................................................
      // @oroperty
      o._code       = RClass.register(o, [new APtyString('_code'), new AGetSet('_code')]);
      o._storage    = RClass.register(o, [new APtyString('_storage'), new AGetSet('_storage')]);
      o._icon       = RClass.register(o, [new APtyString('_icon'), new AGetSet('_icon')]);
      o._service    = RClass.register(o, [new APtyString('_service'), new AGetSet('_service')]);
      o._action     = RClass.register(o, [new APtyString('_action'), new AGetSet('_action')]);
      o._attributes = RClass.register(o, [new APtyAttributes('_attributes'), AGetter('_attributes')]);
      //..........................................................
      // @method
      o.construct   = FDuiTreeNodeType_construct;
      // @method
      o.get         = FDuiTreeNodeType_get;
      o.set         = FDuiTreeNodeType_set;
      // @method
      o.innerDump   = FDuiTreeNodeType_innerDump;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FDuiTreeNodeType_construct = function FDuiTreeNodeType_construct(){
      var o = this;
      o.__base.FDuiComponent.construct.call(o);
   }

   //==========================================================
   // 相应点击节点操作的函数
   //
   // @method
   // @param name:String 名称
   // @return String 内容
   //==========================================================
   MO.FDuiTreeNodeType_get = function FDuiTreeNodeType_get(name){
      var attributes = this._attributes;
      return attributes ? attributes.get(name) : null;
   }

   //==========================================================
   // 相应点击节点操作的函数
   //
   // @method
   // @param name:String 名称
   // @param value:String 内容
   //==========================================================
   MO.FDuiTreeNodeType_set = function FDuiTreeNodeType_set(name, value){
      var attributes = this._attributes;
      if(attributes){
         attributes.set(name, value)
      }
   }

   //==========================================================
   // 相应点击节点操作的函数
   //
   // @method
   // @param event:event:TEvent 构建事件
   // @return EEventStatus 枚举类型
   //==========================================================
   MO.FDuiTreeNodeType_innerDump = function FDuiTreeNodeType_innerDump(s){
      var o = this;
      s.append(RClass.dump(o));
      s.append('[code=',  o._code);
      s.append(', icon=',  o._icon);
      s.append(', service=', o._service);
      s.append(', action=', o._action);
      s.append(']');
   }
}
