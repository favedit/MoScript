//==========================================================
// <T>全国省份实体类。</T>
//
// @class
// @author maocy
// @history 150619
//==========================================================
MO.FEaiProvince3dEntity = function FEaiProvince3dEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   //..........................................................
   // @attribute
   o._data             = MO.Class.register(o, new MO.AGetSet('_data'));
   o._outline2         = MO.Class.register(o, new MO.AGetter('_outline2'));
   o._resource         = MO.Class.register(o, new MO.AGetSet('_resource'));
   o._boundaryShape    = MO.Class.register(o, new MO.AGetter('_boundaryShape'));
   o._normalScale      = MO.Class.register(o, new MO.AGetSet('_normalScale'), 1);
   o._normalScaleMax   = MO.Class.register(o, new MO.AGetSet('_normalScaleMax'), 1.02);
   // @attribute
   o._layerDepth       = 3;
   // @attribute
   o._focusTick        = 0;
   o._focusInterval    = 10;
   o._focusCurrent     = 0;
   o._focusColor       = null;
   o._focusCount       = 200;
   //..........................................................
   // @method
   o.construct         = MO.FEaiProvince3dEntity_construct;
   // @method
   o.setup             = MO.FEaiProvince3dEntity_setup;
   // @method
   o.build             = MO.FEaiProvince3dEntity_build;
   // @method
   o.doInvestment      = MO.FEaiProvince3dEntity_doInvestment;
   o.updateColor       = MO.FEaiProvince3dEntity_updateColor;
   o.update            = MO.FEaiProvince3dEntity_update;
   o.process           = MO.FEaiProvince3dEntity_process;
   o.reset             = MO.FEaiProvince3dEntity_reset;
   // @method
   o.dispose           = MO.FEaiProvince3dEntity_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiProvince3dEntity_construct = function FEaiProvince3dEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   // 设置属性
   o._outline2 = new MO.SOutline2d();
   var colors = o._focusColors = new Array();
   colors[0] = [0x28, 0x42, 0xB4];
   colors[1] = [0x28, 0x42, 0xB4];
   colors[2] = [0x1B, 0xA2, 0xBC];
   colors[3] = [0xFF, 0xDF, 0x6F];
   colors[4] = [0xFF, 0x6B, 0x49];
   colors[5] = [0xFF, 0x6B, 0x49];
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiProvince3dEntity_setup = function FEaiProvince3dEntity_setup() {
   var o = this;
   // 创建边框
   var shape = o._boundaryShape = MO.Class.create(MO.FE3dBoundaryShape3d);
   shape._name = 'province';
   shape._entity = o;
   shape.setScaleTop(1.01);
   shape.setScaleBottom(0.8);
   shape.linkGraphicContext(o);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiProvince3dEntity_build = function FEaiProvince3dEntity_build(context){
   var o = this;
   var data = o._data;
   var boundaries = data.boundaries();
   var outline = o._outline2;
   outline.setMin();
   // 建立边界数据
   var shape = o._boundaryShape;
   var count = boundaries.count()
   for(var i = 0; i < count; i++){
      // 增加轮廓
      var boundary = boundaries.at(i);
      shape.pushPolygon(boundary);
      // 计算轮廓
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var pi = 0; pi < positionCount; pi++){
         var x = 180 - positions[positionIndex++];
         var y = positions[positionIndex++];
         outline.mergeMax2(x, y);
      }
   }
   outline.update();
   // 建立对象
   shape.build(o._graphicContext);
   var faceRenderable = shape.faceRenderable();
   faceRenderable.material().info().effectCode = 'eai.map.face';
   faceRenderable.color().setHex('#021244');
   shape.borderRenderable().color().setHex('#FFFFFF');
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param level:Integer 投资级别
// @param investment:Number 投资额
//==========================================================
MO.FEaiProvince3dEntity_doInvestment = function FEaiProvince3dEntity_doInvestment(level, investment){
   var o = this;
   o._focusTick = 0;
   o._focusCurrent = o._focusCount;
   o._focusColor = o._focusColors[level];
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiProvince3dEntity_update = function FEaiProvince3dEntity_update(data){
   var o = this;
   //var investmentTotal = data.investmentTotal();
   //var rate = Math.sqrt(investmentTotal) / 100;
   //if(rate > 255){
      //rate = 255;
   //}
   //var colorIndex = 0;
   //var colors = o.colorsData;
   //for(var i = 0; i < o._vertexTotal; i++){
   //   colors[colorIndex++] = rate;
   //   colors[colorIndex++] = 0;
   //   colors[colorIndex++] = 0;
   //   colors[colorIndex++] = 255;
   //}
   //var renderable = o._faceRenderable;
   //renderable.vertexColorBuffer().upload(colors, 1 * 4, o._vertexTotal);
   //var material = renderable.material();
   //material.info().ambientColor.set(rate, rate, rate, 1);
   //material.update();
   //var renderable = o._borderRenderable;
   //var material = renderable.material();
   //material.info().ambientColor.set(rate, rate, rate, 1);
   //material.update();
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiProvince3dEntity_updateColor = function FEaiProvince3dEntity_updateColor(rate){
   var o = this;
   var color = o._focusColor;
   var rate = o._focusCurrent / o._focusCount;
   // 计算颜色
   var red = 0x08 + ((color[0] - 0x08) * rate);
   var green = 0x0D + ((color[1] - 0x0D) * rate);
   var blue = 0x19 + ((color[2] - 0x19) * rate);
   var alpha = 0xFF;
   var shape = o._boundaryShape;
   var faceRenderable = shape.faceRenderable();
   faceRenderable.color().set(red / 255, green / 255, blue / 255, 1);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiProvince3dEntity_process = function FEaiProvince3dEntity_process(){
   var o = this;
   if(o._focusCurrent > 0){
      var tick = MO.Timer.current();
      if(tick - o._focusTick > o._focusInterval){
         var rate = o._focusCurrent / o._focusCount;
         // 更新缩放
         o._normalScale = 1 + rate * (o._normalScaleMax - 1);
         // 更新颜色
         o.updateColor(o._focusCurrent);
         // 更新数据
         o._focusCurrent--;
         o._focusTick = tick;
      }
   }
}

//==========================================================
// <T>重置处理。</T>
//
// @method
//==========================================================
MO.FEaiProvince3dEntity_reset = function FEaiProvince3dEntity_reset(){
   var o = this;
   o._normalScale = 0;
   o._focusTick = 0;
   o._focusCurrent = 0;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiProvince3dEntity_dispose = function FEaiProvince3dEntity_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiEntity.dispose.call(o);
}
