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
   o._linker   = RClass.register(o, new APtyString('_linker'));
   o._icon     = RClass.register(o, new APtyString('_icon'));
   o._service  = RClass.register(o, new APtyString('_service'));
   o._action   = RClass.register(o, new APtyString('_action'));
   o._config   = RClass.register(o, new APtyConfig('_config'));
   //..........................................................
   o.linker    = FTreeNodeType_linker;
   o.icon      = FTreeNodeType_icon;
   o.service   = FTreeNodeType_service;
   o.action    = FTreeNodeType_action;
   // @method
   o.get       = FTreeNodeType_get;
   o.set       = FTreeNodeType_set;
   // @method
   o.innerDump = FTreeNodeType_innerDump;
   return o;
}

//==========================================================
// <T>获得关联。</T>
//
// @method
// @return String 关联
//==========================================================
function FTreeNodeType_linker(){
   return this._linker;
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
function FTreeNodeType_service(){
   return this._service;
}

//==========================================================
// <T>获得命令名称</T>
//
// @method
// @return String 类型名称
//==========================================================
function FTreeNodeType_action(){
   return this._action;
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
   s.append('[linker=',  o._linker);
   s.append(', icon=',  o._icon);
   s.append(', service=', o._service);
   s.append(', action=', o._action);
   s.append(']');
}
