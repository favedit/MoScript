//==========================================================
// <T>可以含有子组件的容器接口。</T>
//
// @author maocy
// @version 141231
//==========================================================
function MUiContainer(o){
   o = RClass.inherits(this, o);
   //..........................................................
   // @method
   o.createChild = MUiContainer_createChild;
   /// @method
   o.appendChild = RMethod.empty;
   o.removeChild = RMethod.empty;
   return o;
}

//==========================================================
// <T>创建子节点。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
// @return FUiControl 控件
//==========================================================
function MUiContainer_createChild(p){
   // 创建实例
   var c = RControl.newInstance(p);
   c._parent = this;
   return c;
}
