//==========================================================
// <T>树目录节点类型组件。</T>
//
// @component
// @author maocy
// @version 150119
//==========================================================
function FTreeNodeType(o){
   o = RClass.inherits(this, o, FComponent);
   //..........................................................
   // @oroperty
   o._typeName    = RClass.register(o, new APtyString('_typeName', 'type'));
   o._icon        = RClass.register(o, new APtyString('_icon'));
   o._serviceName = RClass.register(o, new APtyString('_serviceName', 'service'));
   o._actionName  = RClass.register(o, new APtyString('_actionName', 'action'));
   o._config      = RClass.register(o, new APtyConfig('_config'));
   //..........................................................
   o.typeName     = FTreeNodeType_typeName;
   o.icon         = FTreeNodeType_icon;
   o.serviceName  = FTreeNodeType_serviceName;
   o.actionName   = FTreeNodeType_actionName;
   // @method
   o.get          = FTreeNodeType_get;
   o.set          = FTreeNodeType_set;
   // @method
   o.innerDump    = FTreeNodeType_innerDump;
   return o;
}

//==========================================================
// <T>获得类型名称。</T>
//
// @method
// @return String 类型名称
//==========================================================
function FTreeNodeType_typeName(){
   return this._typeName;
}

//==========================================================
// <T>获得图标。</T>
//
// @method
// @return String 图标
//==========================================================
function FTreeNodeType_icon(){
   return this._icon;
}

//==========================================================
// <T>获得服务名称。</T>
//
// @method
// @return String 类型名称
//==========================================================
function FTreeNodeType_serviceName(){
   return this._serviceName;
}

//==========================================================
// <T>获得命令名称</T>
//
// @method
// @return String 类型名称
//==========================================================
function FTreeNodeType_actionName(){
   return this._actionName;
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
   s.append(RClass.dump(o));
   s.append('[type=',  o._typeName);
   s.append(', icon=',  o._icon);
   s.append(', service=', o._serviceName);
   s.append(', action=', o._actionName);
   s.append(']');
}
