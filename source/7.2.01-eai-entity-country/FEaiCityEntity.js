with(MO){
   //==========================================================
   // <T>全国城市实体类。</T>
   //
   // @class
   // @author maocy
   // @history 150619
   //==========================================================
   MO.FEaiCityEntity = function FEaiCityEntity(o){
      o = RClass.inherits(this, o, FEaiEntity);
      //..........................................................
      // @attribute
      o._visible                = RClass.register(o, new AGetter('_visible'), false);
      o._location               = RClass.register(o, new AGetter('_location'));
      o._size                   = RClass.register(o, new AGetter('_size'));
      o._alpha                  = RClass.register(o, new AGetSet('_alpha'), 1);
      o._color                  = RClass.register(o, new AGetter('_color'));
      o._range                  = RClass.register(o, new AGetter('_range'), 1);
      o._rangeColor             = RClass.register(o, new AGetter('_rangeColor'));
      // @attribute
      o._investmentCount        = 0;
      o._investmentTotal        = RClass.register(o, new AGetSet('_investmentTotal'));
      o._investmentLevelTotal   = 20000;
      o._investmentLevel        = 0;
      o._investmentRange        = 1;
      o._investmentRate         = 100;
      o._investmentDirection    = 1;
      // @attribute
      o._stage                  = RClass.register(o, new AGetSet('_stage'));
      o._renderable             = RClass.register(o, new AGetSet('_renderable'));
      o._data                   = RClass.register(o, new AGetSet('_data'));
      // @attribute
      o._inputPoint             = null;
      o._outputPoint            = null;
      //..........................................................
      // @method
      o.construct               = FEaiCityEntity_construct;
      // @method
      o.calculateScreenPosition = FEaiCityEntity_calculateScreenPosition;
      o.build                   = FEaiCityEntity_build;
      o.addInvestmentTotal      = FEaiCityEntity_addInvestmentTotal;
      o.reset                   = FEaiCityEntity_reset;
      o.update                  = FEaiCityEntity_update;
      o.process                 = FEaiCityEntity_process;
      // @method
      o.dispose                 = FEaiCityEntity_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCityEntity_construct = function FEaiCityEntity_construct(){
      var o = this;
      o.__base.FEaiEntity.construct.call(o);
      // 设置属性
      o._location = new SPoint2();
      o._size = new SSize2();
      o._color = new SColor4(0, 0, 0, 0);
      o._rangeColor = new SColor4(0, 0, 0, 0);
      o._inputPoint = new SPoint3();
      o._outputPoint = new SPoint3();
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param position:MStream 输入流
   //==========================================================
   MO.FEaiCityEntity_calculateScreenPosition = function FEaiCityEntity_calculateScreenPosition(){
      var o = this;
      var region = o._stage.region();
      var vpMatrix = region.calculate(EG3dRegionParameter.CameraViewProjectionMatrix);
      var mMatrix = o._renderable.matrix();
      var matrix = MO.RMath.matrix;
      matrix.identity();
      matrix.append(mMatrix);
      matrix.append(vpMatrix);
      o._inputPoint.set(o._location.x, o._location.y, 0);
      matrix.transformPoint3(o._inputPoint, o._outputPoint);
      return o._outputPoint;
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiCityEntity_build = function FEaiCityEntity_build(context){
      var o = this;
      o._location.assign(o._data.location());
      o._size.set(2, 2);
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiCityEntity_addInvestmentTotal = function FEaiCityEntity_addInvestmentTotal(investmentTotal){
      var o = this;
      // 设置数据
      o._investmentCount++;
      o._investmentTotal += investmentTotal;
      //o._investmentLevel = o._investmentLevelTotal * Math.log(investmentTotal);
      o._investmentLevel = o._investmentLevelTotal;
      // 获得颜色
      var rateConsole = RConsole.find(FEaiResourceConsole).rateConsole();
      var color = rateConsole.find(EEaiRate.Line).findRate(o._investmentTotal / 200000);
      // 设置内容
      o._color.set(1, 1, 1, 1);
      o._range = RFloat.toRange(Math.log(investmentTotal) / 5, 0, 6);
      o._rangeColor.setInteger(color);
      o._rangeColor.alpha = 1;
      o._investmentRange = o._range;
      o._investmentRate = 100;
      o._visible = true;
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiCityEntity_reset = function FEaiCityEntity_reset(){
      var o = this;
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiCityEntity_update = function FEaiCityEntity_update(data){
      var o = this;
      var range = 1;
      o._visible = true;
      o._color.set(1, 1, 1, 1);
      o._rangeColor.set(1, 1, 1, 1);
      if(data){
         var historyConsole = RConsole.find(FEaiResourceConsole).historyConsole();
         var investmentCityTotal = historyConsole.investmentCityTotal();
         var rateInfo = RConsole.find(FEaiResourceConsole).rateConsole().find(EEaiRate.Map);
         var rate = Math.sqrt(data.investmentTotal() / investmentCityTotal) * 4;
         var color = rateInfo.findRate(rate);
         range = rate * 6;
         rate = RFloat.toRange(rate, 0, 1);
         o._rangeColor.set(((color >> 16) & 0xFF) / 255, ((color >> 8) & 0xFF) / 255, ((color >> 0) & 0xFF) / 255, rate * 1);
      }else{
         o._rangeColor.set(0, 0, 0, 0);
      }
      o._range = RFloat.toRange(Math.sqrt(range), 1, 6);
   }

   //==========================================================
   // <T>从输入流反序列化数据。</T>
   //
   // @method
   // @param input:MStream 输入流
   //==========================================================
   MO.FEaiCityEntity_process = function FEaiCityEntity_process(data){
      var o = this;
      if(o._investmentLevel > 0){
         var rate = o._investmentLevel / o._investmentLevelTotal;
         // 设置比率
         if(o._investmentRate < 0){
            o._investmentRate = 0;
            o._investmentDirection = 4;
         }else if(o._investmentRate > 100){
            o._investmentRate = 100;
            o._investmentDirection = -2;
         }
         //o._investmentRate += o._investmentDirection;
         //var rate = o._investmentRate / 100;
         // 设置内容
         o._color.alpha = rate;
         //o._range = o._investmentRange * rate;
         o._rangeColor.alpha = rate;
         // 设置内容
         o._investmentLevel--;
         if(o._investmentLevel == 0){
            o._visible = false;
         }
         return true;
      }
      return false;
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FEaiCityEntity_dispose = function FEaiCityEntity_dispose(){
      var o = this;
      // 释放属性
      o._location = RObject.dispose(o._location);
      o._size = RObject.dispose(o._size);
      o._color = RObject.dispose(o._color);
      o._rangeColor = RObject.dispose(o._rangeColor);
      o._inputPoint = RObject.dispose(o._inputPoint);
      o._outputPoint = RObject.dispose(o._outputPoint);
      // 父处理
      o.__base.FEaiEntity.dispose.call(o);
   }
}
