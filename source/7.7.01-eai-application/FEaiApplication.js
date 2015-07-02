//==========================================================
// <T>应用处理。</T>
//
// @class
// @author maocy
// @history 150606
//==========================================================
MO.FEaiApplication = function FEaiApplication(o){
   o = MO.Class.inherits(this, o, MO.FApplication);
   //..........................................................
   // @attribute
   o._thread           = null;
   o._interval         = 10;
   //..........................................................
   // @event
   o.onOperationResize = MO.FEaiApplication_onOperationResize;
   //..........................................................
   // @method
   o.construct         = MO.FEaiApplication_construct;
   // @method
   o.createCanvas      = MO.FEaiApplication_createCanvas;
   o.setup             = MO.FEaiApplication_setup;
   // @method
   o.dispose           = MO.FEaiApplication_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiApplication_onOperationResize = function FEaiApplication_onOperationResize(event){
   var o = this;
   // 获得大小
   var width = window.innerWidth;
   var height = window.innerHeight;
   // 桌面处理
   var activeDesktop = MO.Desktop.activeDesktop();
   activeDesktop.resize(width, height);
   MO.Logger.debug(o, 'Resize screen. (width={1}, height={2})', width, height);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiApplication_construct = function FEaiApplication_construct(){
   var o = this;
   o.__base.FApplication.construct.call(o);
   // 创建线程
   var thread = o._thread = MO.Class.create(MO.FThread);
   thread.setInterval(o._interval);
   thread.addProcessListener(o, o.process);
   MO.Console.find(MO.FThreadConsole).start(thread);
}

//==========================================================
// <T>创建画板。</T>
//
// @method
// @return FEaiCanvas 画板
//==========================================================
MO.FEaiApplication_createCanvas = function FEaiApplication_createCanvas(){
   return MO.Class.create(FEaiCanvas);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiApplication_setup = function FEaiApplication_setup(hPanel){
   var o = this;
   var effectConsole = MO.Console.find(MO.FG3dEffectConsole);
   // 选取效果器
   effectConsole.register('general.color.eai.citys', MO.FEaiCityEffect);
   effectConsole.register('general.color.eai.citys.range', MO.FEaiCityRangeEffect);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiApplication_dispose = function FEaiApplication_dispose(){
   var o = this;
   // 父处理
   o.__base.FApplication.dispose.call(o);
}
