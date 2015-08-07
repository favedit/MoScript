//==========================================================
// <T>可以含有子组件的容器接口。</T>
//
// @author maocy
// @version 141231
//==========================================================
MO.MDuiContainer = function MDuiContainer(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @method
   o.createChild = MO.MDuiContainer_createChild;
   /// @method
   o.appendChild = MO.Method.empty;
   o.removeChild = MO.Method.empty;
   return o;
}

//==========================================================
// <T>创建子节点。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
// @return FDuiControl 控件
//==========================================================
MO.MDuiContainer_createChild = function MDuiContainer_createChild(p){
   // 创建实例
   var c = MO.RDuiControl.newInstance(p);
   c._parent = this;
   return c;
}
