//==========================================================
// <T>所有组件的基类</T>
// <P>非可视对象，支持以下功能：
//    1. 由多个子组件构成，支持添加、查找、删除功能。
//    2. 属性的管理，支持注册、加载、保存功能。
//    3. 事件向所有子组件中纷发功能，支持初始化，释放功能。
//    4. 自身对象的复制。
// </P>
//
// @class
// @author maocy
// @version 141231
//==========================================================
MO.FDuiComponent = function FDuiComponent(o){
   o = MO.Class.inherits(this, o, MO.FComponent, MO.MUiComponent, MO.MProperty, MO.MClone);
   //..........................................................
   // @method
   o.dispose = MO.FDuiComponent_dispose;
   return o;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FDuiComponent_dispose = function FDuiComponent_dispose(){
   var o = this;
   // 父处理
   o.__base.MUiComponent.dispose.call(o);
   o.__base.FComponent.dispose.call(o);
}
