//==========================================================
// <T>容器接口。</T>
//
// @class
// @author maocy
// @version 150610
//==========================================================
MO.MGuiContainer = function MGuiContainer(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @method
   o.createChild = MO.MGuiContainer_createChild;
   /// @method
   o.appendChild = MO.Method.empty;
   o.removeChild = MO.Method.empty;
   return o;
}

//==========================================================
// <T>创建子节点。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
// @return FGuiControl 控件
//==========================================================
MO.MGuiContainer_createChild = function MGuiContainer_createChild(xconfig){
   var o = this;
   // 创建实例
   var child = MO.RGuiControl.newInstance(xconfig);
   child._parent = o;
   return child;
}
