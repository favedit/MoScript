//==========================================================
// <T>渲染地球立方体。</T>
//
// @class
// @author maocy
// @history 150207
//==========================================================
MO.FEaiEarthFlat = function FEaiEarthFlat(o){
   o = MO.Class.inherits(this, o, MO.FE3dDisplay);
   //..........................................................
   // @attribute
   o._ready        = false;
   // @attribute
   o._imageLand    = MO.Class.register(o, new MO.AGetter('_imageLand'));
   o._imageOcean   = MO.Class.register(o, new MO.AGetter('_imageOcean'));
   //..........................................................
   // @method
   o.onLandLoaded  = MO.FEaiEarthFlat_onLandLoaded;
   o.onOceanLoaded = MO.FEaiEarthFlat_onOceanLoaded;
   o.onWaterLoaded = MO.FEaiEarthFlat_onWaterLoaded;
   //..........................................................
   // @method
   o.construct     = MO.FEaiEarthFlat_construct;
   // @method
   o.setup         = MO.FEaiEarthFlat_setup;
   o.process       = MO.FEaiEarthFlat_process;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_onLandLoaded = function FEaiEarthFlat_onLandLoaded(event){
   var o = this;
   var image = o._imageLand;
   var context = o._graphicContext;
   var texture = o._textureLand = context.createFlatTexture();
   texture.setCode('land');
   texture.upload(image);
   image.dispose();
   o._imageLand = null;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_onOceanLoaded = function FEaiEarthFlat_onOceanLoaded(event){
   var o = this;
   var image = o._imageOcean;
   var context = o._graphicContext;
   var texture = o._textureOcean = context.createFlatTexture();
   texture.setCode('ocean');
   texture.upload(image);
   image.dispose();
   o._imageOcean = null;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_onWaterLoaded = function FEaiEarthFlat_onWaterLoaded(event){
   var o = this;
   var image = o._imageWater;
   var context = o._graphicContext;
   var texture = o._textureWater = context.createFlatTexture();
   texture.setCode('water');
   texture.upload(image);
   image.dispose();
   o._imageWater = null;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_construct = function FEaiEarthFlat_construct(){
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   // 设置属性
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_setup = function FEaiEarthFlat_setup(){
   var o = this;
   // 加载陆地
   var image = o._imageLand = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onLandLoaded);
   image.loadUrl('{eai.resource}/world/land2048.png');
   // 加载海洋
   var image = o._imageOcean = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onOceanLoaded);
   image.loadUrl('{eai.resource}/world/ocean2048.jpg');
   // 加载水波纹
   var image = o._imageWater = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onWaterLoaded);
   image.loadUrl('{eai.resource}/world/water.jpg');
   // 创建矩形
   var rectangle = o._rectangle = MO.Class.create(MO.FE3dRectangleArea);
   //rectangle.setCoordFlip(true);
   rectangle.linkGraphicContext(o);
   rectangle.setup();
   rectangle.material().info().effectCode = 'eai.earth.flat';
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiEarthFlat_process = function FEaiEarthFlat_process(){
   var o = this;
   o.__base.FE3dDisplay.process.call(o);
   if(!o._ready){
      if(o._textureLand && o._textureOcean && o._textureWater){
         var rectangle = o._rectangle;
         rectangle.pushTexture(o._textureLand);
         rectangle.pushTexture(o._textureOcean);
         rectangle.pushTexture(o._textureWater);
         o.pushRenderable(rectangle);
         o._ready = true;
      }
   }
}
