//==========================================================
// <T>渲染技术。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FG3dTechnique(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._code        = null;
   o._passes      = null;
   //..........................................................
   // @method
   o.construct    = FG3dTechnique_construct;
   // @method
   o.code         = FG3dTechnique_code;
   o.passes       = FG3dTechnique_passes;
   // @method
   o.updateRegion = RMethod.empty;
   o.clear        = FG3dTechnique_clear;
   o.drawRegion   = FG3dTechnique_drawRegion;
   o.present      = FG3dTechnique_present;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FG3dTechnique_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._passes = new TObjects();
}

//==========================================================
// <T>获得名称。</T>
//
// @method
// @return String 名称
//==========================================================
function FG3dTechnique_code(){
   return this._code;
}

//==========================================================
// <T>获得过程集合。</T>
//
// @method
// @return TObjects 过程集合
//==========================================================
function FG3dTechnique_passes(){
   return this._passes;
}

//==========================================================
// <T>清除绘制区。</T>
//
// @method
// @param p:color:SColor4 颜色
//==========================================================
function FG3dTechnique_clear(p){
   var o = this;
   var c = o._context;
   // 设置渲染目标
   c.setRenderTarget(null);
   c.clear(p.red, p.green, p.blue, p.alpha, 1);
}

//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param p:region:FG3dRetion 区域
//==========================================================
function FG3dTechnique_drawRegion(p){
   var o = this;
   // 设置区域属性
   p.setTechnique(o);
   // 绘制所有过程
   var s = o._passes;
   var c = s.count();
   for(var n = 0; n < c; n++){
      var v = s.get(n);
      p.setTechniquePass(v, (n == c - 1));
      v.drawRegion(p);
   }
}

//==========================================================
// <T>绘制完成处理。</T>
//
// @method
// @param p:region:FG3dRetion 区域
//==========================================================
function FG3dTechnique_present(p){
   this._context.present();
}
