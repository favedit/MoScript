//==========================================================
// <T>可以含有子组件的容器接口。</T>
//
// @author maocy
// @version 141231
//==========================================================
MO.MUiContainer = function MUiContainer(o){
   o = MO.Class.inherits(this, o);
   //..........................................................
   // @method
   o.createChild = MO.MUiContainer_createChild;
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
MO.MUiContainer_createChild = function MUiContainer_createChild(p){
   // 创建实例
   var c = MO.RUiControl.newInstance(p);
   c._parent = this;
   return c;
}