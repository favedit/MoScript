//==========================================================
// <T>渲染技术。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dTechnique(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._context  = null;
   o._passes   = null;
   //..........................................................
   // @method
   o.construct = FG3dTechnique_construct;
   o.setup     = FG3dTechnique_setup;
   o.draw      = FG3dTechnique_draw;
   return o;
}

//==========================================================
// <T>设置参数。</T>
//
// @method
// @param pn:name:String 名称
// @param pv:value:Object 数据
// @param pc:count:Integer 个数
//==========================================================
function FG3dTechnique_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._passes = new TObjects();
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FG3dTechnique_setup(){
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
//==========================================================
function FG3dTechnique_draw(pn, pt){
}
