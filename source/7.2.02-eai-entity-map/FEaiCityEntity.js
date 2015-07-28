//==========================================================
// <T>全国城市实体类。</T>
//
// @class
// @author maocy
// @history 150619
//==========================================================
MO.FEaiCityEntity = function FEaiCityEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   //..........................................................
   // @attribute
   o._provinceEntity         = MO.Class.register(o, new MO.AGetSet('_provinceEntity'));
   o._visible                = MO.Class.register(o, new MO.AGetter('_visible'), false);
   o._location               = MO.Class.register(o, new MO.AGetter('_location'));
   o._size                   = MO.Class.register(o, new MO.AGetter('_size'));
   o._color                  = MO.Class.register(o, new MO.AGetter('_color'));
   o._range                  = MO.Class.register(o, new MO.AGetter('_range'), 1);
   o._rangeColor             = MO.Class.register(o, new MO.AGetter('_rangeColor'));
   // @attribute
   o._cityTotal              = 0;
   o._investmentCount        = 0;
   o._investmentTotal        = MO.Class.register(o, new MO.AGetSet('_investmentTotal'), 0);
   o._investmentLevel        = 0;
   o._investmentLast         = 0;
   o._investmentRateTotal    = 0;
   o._investmentRate         = 0;
   o._investmentAlpha        = 0;
   o._investmentRange        = 0;
   o._investmentDirection    = 1;
   // @attribute
   o._stage                  = MO.Class.register(o, new MO.AGetSet('_stage'));
   o._renderable             = MO.Class.register(o, new MO.AGetSet('_renderable'));
   o._data                   = MO.Class.register(o, new MO.AGetSet('_data'));
   // @attribute
   o._inputPoint             = null;
   o._outputPoint            = null;
   //..........................................................
   // @method
   o.construct               = MO.FEaiCityEntity_construct;
   // @method
   o.calculateScreenPosition = MO.FEaiCityEntity_calculateScreenPosition;
   o.build                   = MO.FEaiCityEntity_build;
   o.addInvestmentTotal      = MO.FEaiCityEntity_addInvestmentTotal;
   o.reset                   = MO.FEaiCityEntity_reset;
   o.update                  = MO.FEaiCityEntity_update;
   o.process                 = MO.FEaiCityEntity_process;
   // @method
   o.dispose                 = MO.FEaiCityEntity_dispose;
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
   o._location = new MO.SPoint2();
   o._size = new MO.SSize2();
   o._color = new MO.SColor4(0, 0, 0, 0);
   o._rangeColor = new MO.SColor4(0, 0, 0, 0);
   o._inputPoint = new MO.SPoint3();
   o._outputPoint = new MO.SPoint3();
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
   var vpMatrix = region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix);
   var mMatrix = o._renderable.matrix();
   var matrix = MO.Lang.Math.matrix;
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
// @param level:Integer 投资级别
// @param investment:Number 投资额
//==========================================================
MO.FEaiCityEntity_addInvestmentTotal = function FEaiCityEntity_addInvestmentTotal(level, investment){
   var o = this;
   // 设置数据
   o._investmentCount++;
   o._investmentTotal += investment;
   // 检查现在数据是否比上一次大
   if(investment < o._investmentLast){
      return;
   }
   // 获得颜色
   var range = 200000;
   var rateConsole = MO.Console.find(MO.FEaiResourceConsole).rateConsole();
   var rateResource = rateConsole.find(MO.EEaiRate.InvestmentRange);
   var color = rateResource.findRate(investment / range);
   // 设置内容
   o._color.set(1, 1, 1, 1);
   o._rangeColor.setInteger(color);
   o._rangeColor.alpha = 1;
   // 设置比率内容
   o._investmentLast = investment;
   o._investmentRateTotal = (level + 1) * 100000;
   o._investmentRate = o._investmentRateTotal;
   o._investmentRange = Math.log(investment * investment) / 10;
   o._investmentAlpha = 8;
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
   o._visible = false;
   o._cityTotal = 0;
   o._color.set(0, 0, 0, 0);
   o._rangeColor.set(0, 0, 0, 0);
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
   o._color.set(1, 1, 1, 1);
   o._rangeColor.set(1, 1, 1, 1);
   if(data){
      o._cityTotal = data.investmentTotal();
   }
   var total = o._cityTotal;
   if(total > 0){
      o._visible = true;
   }
   // 计算数值
   var historyConsole = MO.Console.find(MO.FEaiResourceConsole).historyConsole();
   var investmentCityTotal = historyConsole.investmentCityTotal();
   var rateInfo = MO.Console.find(MO.FEaiResourceConsole).rateConsole().find(MO.EEaiRate.Map);
   var rate = Math.sqrt(total / investmentCityTotal) * 4;
   var color = rateInfo.findRate(rate);
   range = rate * 6;
   rate = MO.Lang.Float.toRange(rate, 0, 1);
   o._rangeColor.setIntAlpha(color, rate * 0.6);
   o._range = MO.Lang.Float.toRange(Math.sqrt(range), 1, 6);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCityEntity_process = function FEaiCityEntity_process(data){
   var o = this;
   if(o._investmentRate > 0){
      var rate = o._investmentRate / o._investmentRateTotal;
      // 设置范围
      o._range = o._investmentRange * rate;
      // 设置透明
      var alpha = Math.min(o._investmentAlpha * rate, 1);
      o._color.alpha = alpha;
      o._rangeColor.alpha = alpha;
      // 设置内容
      o._investmentRate--;
      return true;
   }else{
      o._investmentLast = 0;
      o._investmentRate = 0;
      o._investmentRange = 0;
      o._investmentAlpha = 0;
      o._visible = false;
      return false;
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCityEntity_dispose = function FEaiCityEntity_dispose(){
   var o = this;
   // 释放属性
   o._location = MO.Lang.Object.dispose(o._location);
   o._size = MO.Lang.Object.dispose(o._size);
   o._color = MO.Lang.Object.dispose(o._color);
   o._rangeColor = MO.Lang.Object.dispose(o._rangeColor);
   o._inputPoint = MO.Lang.Object.dispose(o._inputPoint);
   o._outputPoint = MO.Lang.Object.dispose(o._outputPoint);
   // 父处理
   o.__base.FEaiEntity.dispose.call(o);
}
