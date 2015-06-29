with(MO){
   //==========================================================
   // <T>统计投资形状。</T>
   //
   // @class
   // @author maocy
   // @history 150629
   //==========================================================
   MO.FEaiStatisticsInvestmentShape = function FEaiStatisticsInvestmentShape(o){
      o = RClass.inherits(this, o, FE3dShape);
      //..........................................................
      // @attribute
      o._ready       = false;
      o._image       = null;
      o._statusPaint = false;
      // @attribute
      o._cityEntity  = RClass.register(o, new AGetSet('_cityEntity'));
      o._entity      = RClass.register(o, new AGetSet('_entity'));
      //..........................................................
      // @event
      o.onImageLoad  = FEaiStatisticsInvestmentShape_onImageLoad;
      //..........................................................
      // @method
      o.construct    = FEaiStatisticsInvestmentShape_construct;
      // @method
      o.setup        = FEaiStatisticsInvestmentShape_setup;
      o.paint        = FEaiStatisticsInvestmentShape_paint;
      o.process      = FEaiStatisticsInvestmentShape_process;
      // @method
      o.dispose      = FEaiStatisticsInvestmentShape_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiStatisticsInvestmentShape_onImageLoad = function FEaiStatisticsInvestmentShape_onImageLoad(event){
      var o = this;
      // 设置属性
      o._ready = true;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiStatisticsInvestmentShape_construct = function FEaiStatisticsInvestmentShape_construct(){
      var o = this;
      o.__base.FE3dShape.construct.call(o);
   }

   //==========================================================
   // <T>测试是否加载完成。</T>
   //
   // @method
   // @return 是否完成
   //==========================================================
   MO.FEaiStatisticsInvestmentShape_setup = function FEaiStatisticsInvestmentShape_setup(){
      var o = this;
      o.__base.FE3dShape.setup.call(o);
      //..........................................................
      // 创建渲染数据
      var renderable = o._renderable = RClass.create(FE3dShapeData);
      renderable.linkGraphicContext(o);
      renderable.size().set(256, 256);
      renderable.setup();
      //..........................................................
      // 加载图片
      var image = o._image = RClass.create(FImage);
      image.addLoadListener(o, o.onImageLoad);
      image.loadUrl('/script/ars/eai/investment.png');
      // 设置属性
      o._ready = false;
   }

   //==========================================================
   // <T>绘制处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiStatisticsInvestmentShape_paint = function FEaiStatisticsInvestmentShape_paint(){
      var o = this;
      var cityEntity = o._cityEntity;
      var location = cityEntity.location();
      var renderable = o._renderable;
      var investment = o._entity.investment();
      // 设置矩阵
      var matrix = o._matrix;
      matrix.tx = location.x;
      matrix.ty = location.y;
      matrix.tz = 0;
      matrix.setScaleAll(1);
      matrix.update();
      // 绘制内容
      var graphic = renderable.beginDraw();
      graphic.fillRectangle(0, 0, 256, 256, '#FF00FF');
      graphic.drawImage(o._image, 0, 0, 256, 256);
      graphic.drawText(10, 10, investment);
      renderable.endDraw();
      o._statusPaint = true;
   }

   //==========================================================
   // <T>加载处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiStatisticsInvestmentShape_process = function FEaiStatisticsInvestmentShape_process(region){
      var o = this;
      o.__base.FE3dShape.process.call(o, region);
      // 检查脏处理
      if(o._statusDirty){
         if(o.testReady()){
            // 绘制处理
            if(!o._statusPaint){
               o.paint();
               o._statusPaint = true;
            }
            o._statusDirty = false;
         }
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiStatisticsInvestmentShape_dispose = function FEaiStatisticsInvestmentShape_dispose(){
      var o = this;
      // 父处理
      o.__base.FE3dShape.dispose.call(o);
   }
}
