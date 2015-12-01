//==========================================================
// <T>容器对象。</T>
//
// @class
// @author maocy
// @version 150610
//==========================================================
MO.FGuiContainer = function FGuiContainer(o){
   o = MO.Class.inherits(this, o, MO.FGuiControl, MO.MUiContainer);
   //..........................................................
   // @method
   o.createChild = MO.FGuiContainer_createChild;
   return o;
}

//==========================================================
// <T>创建子节点。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
// @return FGuiControl 控件
//==========================================================
MO.FGuiContainer_createChild = function FGuiContainer_createChild(xconfig){
   var o = this;
   // 创建实例
   var child = MO.Gui.Control.newInstance(xconfig);
   child._parent = o;
   return child;
}
