//==========================================================
// <T>渲染目标。</T>
//
// @author maocy
// @history 150116
//==========================================================
MO.FG3dRenderTarget = function FG3dRenderTarget(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   //..........................................................
   // @attribute
   o._size     = MO.Class.register(o, new MO.AGetter('_size'));
   o._color    = MO.Class.register(o, new MO.AGetter('_color'));
   o._textures = null;
   //..........................................................
   // @method
   o.construct = MO.FG3dRenderTarget_construct;
   // @method
   o.setQualityCd = MO.FG3dRenderTarget_setQualityCd;
   o.textures  = MO.FG3dRenderTarget_textures;
   // @method
   o.dispose   = MO.FG3dRenderTarget_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FG3dRenderTarget_construct = function FG3dRenderTarget_construct(){
   var o = this;
   o.__base.FG3dObject.construct();
   o._size = new MO.SSize2();
   o._color = new MO.SColor4();
   o._color.set(0.0, 0.0, 0.0, 1.0);
}

//==========================================================
// <T>设置质量类型。</T>
//
// @method
// @return qualityCd 质量类型
//==========================================================
MO.FG3dRenderTarget_setQualityCd = function FG3dRenderTarget_setQualityCd(qualityCd){
   var o = this;
   var size = o._size;
   switch(qualityCd){
      case MO.EGraphicQuality.Highest:
         size.set(4096, 4096);
         break;
      case MO.EGraphicQuality.High:
         size.set(2048, 2048);
         break;
      case MO.EGraphicQuality.Middle:
         size.set(1024, 1024);
         break;
      case MO.EGraphicQuality.Low:
         size.set(512, 512);
         break;
      case MO.EGraphicQuality.Lowest:
         size.set(256, 256);
         break;
      default:
         size.set(64, 64);
   }
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TObejcts 纹理集合
//==========================================================
MO.FG3dRenderTarget_textures = function FG3dRenderTarget_textures(){
   var o = this;
   var textures = o._textures;
   if(!textures){
      textures = o._textures = new MO.TObjects();
   }
   return textures;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FG3dRenderTarget_dispose = function FG3dRenderTarget_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
   o._color = MO.Lang.Object.dispose(o._color);
   o._textures = MO.Lang.Object.dispose(o._textures);
   // 父处理
   o.__base.FG3dObject.dispose.call(o);
}
