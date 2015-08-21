//==========================================================
// <T>界面应用对象。</T>
//
// @class
// @author maocy
// @history 150821
//==========================================================
MO.FCanvas3dApplication = function FCanvas3dApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   //..........................................................
   // @attribute
   o._canvas   = MO.Class.register(o, new MO.AGetter('_canvas'));
   //..........................................................
   // @method
   o.construct = MO.FCanvas3dApplication_construct;
   o.setup     = MO.FCanvas3dApplication_setup;
   // @method
   o.process   = MO.FCanvas3dApplication_process;
   // @method
   o.dispose   = MO.FCanvas3dApplication_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FCanvas3dApplication_construct = function FCanvas3dApplication_construct(){
   var o = this;
   o.__base.FApplication.construct.call(o);
}

//==========================================================
// <T>注册一个舞台。</T>
//
// @method
// @param chapter:FChapter 舞台
//==========================================================
MO.FCanvas3dApplication_setup = function FCanvas3dApplication_setup(hPanel){
   var o = this;
   // 配置处理
   MO.RE3dEngine.setup();
   // 创建桌面
   var canvas = o._canvas = MO.Class.create(MO.FE3dSimpleCanvas);
   canvas.build(hPanel);
   canvas.setPanel(hPanel);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FCanvas3dApplication_process = function FCanvas3dApplication_process(){
   var o = this;
   o.__base.FApplication.process.call(o);
   // 画面处理
   o._canvas.process();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FCanvas3dApplication_dispose = function FCanvas3dApplication_dispose(){
   var o = this;
   // 父处理
   o.__base.FApplication.dispose.call(o);
}
