//==========================================================
// <T>树目录节点类型组件。</T>
//
// @component
// @author maocy
// @version 150119
//==========================================================
function FTreeNodeType(o){
   o = RClass.inherits(this, o, FComponent);
   // Property
   o._type       = RClass.register(o, new APtyString('type'));
   o._typeName   = RClass.register(o, new APtyString('typeName'));
   o._icon       = RClass.register(o, new APtyString('icon'));
   o._service    = RClass.register(o, new APtyString('service'));
   o._action     = RClass.register(o, new APtyString('action'));
   o._config     = RClass.register(o, new APtyConfig('config'));
   // Event
   o.get        = FTreeNodeType_get;
   o.set        = FTreeNodeType_set;
   o.innerDump  = FTreeNodeType_innerDump;
   return o;
}

//==========================================================
// 相应点击节点操作的函数
//
// @method
// @param event:event:TEvent 构建事件
// @return EEventStatus 枚举类型
//==========================================================
function FTreeNodeType_get(n){
   var o = this;
   return o._config ? o._config.get(n) : null;
}

//==========================================================
// 相应点击节点操作的函数
//
// @method
// @param event:event:TEvent 构建事件
// @return EEventStatus 枚举类型
//==========================================================
function FTreeNodeType_set(n, v){
   var o = this;
   if(o._config){
      o._config.set(n, v)
   }
}

//==========================================================
// 相应点击节点操作的函数
//
// @method
// @param event:event:TEvent 构建事件
// @return EEventStatus 枚举类型
//==========================================================
function FTreeNodeType_innerDump(s){
   var o = this;
   s.append(RClass._typeOf(o));
   s.append('[icon=',  o._icon);
   s.append(', service=', o._service);
   s.append(', action=', o._action);
   s.append(']');
}
