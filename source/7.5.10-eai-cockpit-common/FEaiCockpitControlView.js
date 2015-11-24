//==========================================================
// <T>预测视图页面。</T>
//
// @class
// @author maocy
// @history 151122
//==========================================================
MO.FEaiCockpitControlView = function FEaiCockpitControlView(o){
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @method
   o.construct = MO.FEaiCockpitControlView_construct;
   // @method
   o.setup     = MO.FEaiCockpitControlView_setup;
   // @method
   o.dispose   = MO.FEaiCockpitControlView_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControlView_construct = function FEaiCockpitControlView_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 9);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControlView_setup = function FEaiCockpitControlView_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   // 设置场景
   o._scene = o._parentModule.parentModuleManager().scene();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitControlView_dispose = function FEaiCockpitControlView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
