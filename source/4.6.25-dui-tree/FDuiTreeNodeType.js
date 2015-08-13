//==========================================================
// <T>树目录节点类型组件。</T>
//
// @component
// @author maocy
// @version 150119
//==========================================================
MO.FDuiTreeNodeType = function FDuiTreeNodeType(o){
   o = MO.Class.inherits(this, o, MO.FDuiComponent);
   //..........................................................
   // @oroperty
   o._code       = MO.Class.register(o, [new MO.APtyString('_code'), new MO.AGetSet('_code')]);
   o._storage    = MO.Class.register(o, [new MO.APtyString('_storage'), new MO.AGetSet('_storage')]);
   o._icon       = MO.Class.register(o, [new MO.APtyString('_icon'), new MO.AGetSet('_icon')]);
   o._service    = MO.Class.register(o, [new MO.APtyString('_service'), new MO.AGetSet('_service')]);
   o._action     = MO.Class.register(o, [new MO.APtyString('_action'), new MO.AGetSet('_action')]);
   //..........................................................
   // @method
   o.construct   = MO.FDuiTreeNodeType_construct;
   // @method
   o.get         = MO.FDuiTreeNodeType_get;
   o.set         = MO.FDuiTreeNodeType_set;
   // @method
   o.innerDump   = MO.FDuiTreeNodeType_innerDump;
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
// <T>获得运行信息。</T>
//
// @method
// @param info:String 信息
//==========================================================
MO.FDuiTreeNodeType_innerDump = function FDuiTreeNodeType_innerDump(info){
   var o = this;
   info.append(MO.Class.dump(o));
   info.append('[code=',  o._code);
   info.append(', icon=',  o._icon);
   info.append(', service=', o._service);
   info.append(', action=', o._action);
   info.append(']');
}
