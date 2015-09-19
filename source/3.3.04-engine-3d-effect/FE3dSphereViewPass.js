//==========================================================
// <T>阴影深度渲染过程。</T>
//
// @author maocy
// @history 141230
//==========================================================
MO.FE3dSphereViewPass = function FE3dSphereViewPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   //..........................................................
   // @attribute
   o._code          = 'view';
   o._radianSize    = null;
   // @attribute
   o._textureColor  = MO.Class.register(o, new MO.AGetSet('_textureColor'));
   o._effect        = null;
   o._textureRadian = null;
   o._rectangle     = null;
   //..........................................................
   // @method
   o.construct      = MO.FE3dSphereViewPass_construct;
   o.setup          = MO.FE3dSphereViewPass_setup;
   // @method
   o.drawBegin      = MO.FE3dSphereViewPass_drawBegin
   o.drawRegion     = MO.FE3dSphereViewPass_drawRegion;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dSphereViewPass_construct = function FE3dSphereViewPass_construct(){
   var o = this;
   o.__base.FG3dTechniquePass.construct.call(o);
   // 设置属性
   o._radianSize = new MO.SSize2(1024, 1024);
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
MO.FE3dSphereViewPass_setup = function FE3dSphereViewPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var context = o._graphicContext;
   var pi2a = 0.5 / Math.PI;
   // 创建浮点纹理（位置计算用）
   var width = o._radianSize.width;
   var height = o._radianSize.height;
   var centerX = width / 2;
   var centerY = height / 2;
   var data = new Float32Array(width * height);
   var position = 0;
   var direction = new MO.SVector2();
   for(var y = 0; y < height; y++){
      var ay = (y - centerY) / (height / 2);
      for(var x = 0; x < width; x++){
         var ax = (x - centerX) / (width / 2);
         var length = Math.sqrt(ax * ax + ay * ay);
         var angle = 0.5;
         if(length != 0){
            var nx = ax / length;
            var ny = ay / length;
            direction.x = ax;
            direction.y = ay;
            direction.normalize();
            var rx = Math.acos(direction.x);
            var ry = Math.asin(direction.y);
            var ra = (rx + ry) / 2
            if(y > centerY){
               //angle = 0.5 - ra * pi2a;
               angle = 0.5 - Math.acos(nx) * pi2a;
            }else if(y < centerY){
               //angle = 0.5 + ra * pi2a;
               angle = 0.5 + Math.acos(nx) * pi2a;
            }
         }
         data[position++] = angle;
      }
   }
   var texture = o._textureRadian = context.createFlatTexture();
   //texture.setFilterCd(MO.EG3dSamplerFilter.Repeat, MO.EG3dSamplerFilter.Repeat);
   texture.setWrapCd(MO.EG3dSamplerFilter.ClampToBorder, MO.EG3dSamplerFilter.ClampToBorder);
   texture.uploadData(data, width, height);
   // 创建渲染目标
   var rectangle = o._rectangle = MO.Class.create(MO.FE3dRectangleArea);
   rectangle.linkGraphicContext(o);
   rectangle.setup();
}

//==========================================================
// <T>开始绘制处理。</T>
//
// @method
// @param region:FG3dRetion 区域
//==========================================================
MO.FE3dSphereViewPass_drawBegin = function FE3dSphereViewPass_drawBegin(region){
   var o = this;
   var context = o._graphicContext;
   var rectangle = o._rectangle;
   // 清空屏幕
   var backgroundColor = region.backgroundColor();
   context.setRenderTarget(null);
   context.clear(0, 0, 0, 0, 1);
   // 设置矩形
   var textures = rectangle.textures();
   if(textures.isEmpty()){
      textures.set('diffuse', o._textureColor);
      textures.set('radian', o._textureRadian);
   }
}

//==========================================================
// <T>绘制区域处理。</T>
//
// @method
// @param region:FG3dRetion 区域
//==========================================================
MO.FE3dSphereViewPass_drawRegion = function FE3dSphereViewPass_drawRegion(region){
   var o = this;
   var context = o._graphicContext;
   var rectangle = o._rectangle;
   // 创建效果器
   var effect = o._effect;
   if(!effect){
      effect = o._effect = MO.Console.find(MO.FG3dEffectConsole).find(o, region, rectangle);
   }
   // 绘制处理
   context.setProgram(effect.program());
   effect.drawRenderable(region, o._rectangle);
}
