//==========================================================
// <T>WebGL立方渲染纹理。</T>
//
// @author maocy
// @history 141230
//==========================================================
function FWglCubeTexture(o){
   o = RClass.inherits(this, o, FRenderCubeTexture);
   //..........................................................
   // @attribute
   o._native = null;
   //..........................................................
   // @method
   o.setup  = FWglCubeTexture_setup;
   // @method
   o.link     = FWglCubeTexture_link;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FWglCubeTexture_setup(){
   var o = this;
   var g = o._context._native;
   o.__base.FRenderFlatTexture.setup.call(o);
   o._native = g.createTexture();
}

//==========================================================
// <T>关联内容处理。</T>
//
// @method
// @param v:value:Object 渲染程序
//==========================================================
function FWglCubeTexture_link(v){
   this._Texture = v;
}
