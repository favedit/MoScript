/**************************************************************
 * 树目录里定义一列的控件类
 *
 * @control
 * @author maochunyang
 * @version 1.0.1
 **************************************************************/
function FTreeNodeType(o){
   o = RClass.inherits(this, o, FComponent);
   // Property
   o.type       = RClass.register(o, new TPtyStr('type'));
   o.typeName   = RClass.register(o, new TPtyStr('typeName'));
   o.icon       = RClass.register(o, new TPtyStr('icon'));
   o.service    = RClass.register(o, new TPtyStr('service'));
   o.action     = RClass.register(o, new TPtyStr('action'));
   o.config     = RClass.register(o, new TPtyCfg('config'));
   // Event
   o.get        = FTreeNodeType_get;
   o.set        = FTreeNodeType_set;
   o.innerDump  = FTreeNodeType_innerDump;
   return o;
}

/**************************************************************
 * 相应点击节点操作的函数
 *
 * @method
 * @param event:event:TEvent 构建事件
 * @return EEventStatus 枚举类型
 **************************************************************/
function FTreeNodeType_get(n){
   var o = this;
   return o.config ? o.config.get(n) : null;
}

/**************************************************************
 * 相应点击节点操作的函数
 *
 * @method
 * @param event:event:TEvent 构建事件
 * @return EEventStatus 枚举类型
 **************************************************************/
// name, value
function FTreeNodeType_set(n, v){
   var o = this;
   if(o.config){
      o.config.set(n, v)
   }
}

/**************************************************************
 * 相应点击节点操作的函数
 *
 * @method
 * @param event:event:TEvent 构建事件
 * @return EEventStatus 枚举类型
 **************************************************************/
function FTreeNodeType_innerDump(dump){
   var o = this;
   dump.append(RClass.typeOf(o));
   dump.append('[icon=',  o.icon);
   dump.append(', service=', o.service);
   dump.append(', action=', o.action);
   dump.append(']');
}

/**************************************************************
 * 相应点击节点操作的函数
 *
 * @method
 * @param event:event:TEvent 构建事件
 * @return EEventStatus 枚举类型
 **************************************************************/
