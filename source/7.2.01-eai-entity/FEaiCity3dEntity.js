//==========================================================
// <T>全国城市实体类。</T>
//
// @class
// @author maocy
// @history 150619
//==========================================================
MO.FEaiCity3dEntity = function FEaiCity3dEntity(o){
   o = MO.Class.inherits(this, o, MO.FEaiEntity);
   //..........................................................
   // @attribute
   o._provinceEntity         = MO.Class.register(o, new MO.AGetSet('_provinceEntity'));
   o._visible                = MO.Class.register(o, new MO.AGetter('_visible'), true);
   o._location               = MO.Class.register(o, new MO.AGetter('_location'));
   o._size                   = MO.Class.register(o, new MO.AGetter('_size'));
   o._color                  = MO.Class.register(o, new MO.AGetter('_color'));
   o._range                  = MO.Class.register(o, new MO.AGetter('_range'), 1);
   o._rangeColor             = MO.Class.register(o, new MO.AGetter('_rangeColor'));
   o._normalScale            = MO.Class.register(o, new MO.AGetSet('_normalScale'), 1);
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
   o.construct               = MO.FEaiCity3dEntity_construct;
   // @method
   o.calculateScreenPosition = MO.FEaiCity3dEntity_calculateScreenPosition;
   o.build                   = MO.FEaiCity3dEntity_build;
   o.addInvestmentTotal      = MO.FEaiCity3dEntity_addInvestmentTotal;
   o.reset                   = MO.FEaiCity3dEntity_reset;
   o.update                  = MO.FEaiCity3dEntity_update;
   o.process                 = MO.FEaiCity3dEntity_process;
   // @method
   o.dispose                 = MO.FEaiCity3dEntity_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCity3dEntity_construct = function FEaiCity3dEntity_construct(){
   var o = this;
   o.__base.FEaiEntity.construct.call(o);
   // 设置属性
   o._location = new MO.SPoint2();
   o._size = new MO.SSize2();
   o._color = new MO.SColor4(1, 1, 1, 1);
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
MO.FEaiCity3dEntity_calculateScreenPosition = function FEaiCity3dEntity_calculateScreenPosition(){
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
MO.FEaiCity3dEntity_build = function FEaiCity3dEntity_build(context){
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
MO.FEaiCity3dEntity_addInvestmentTotal = function FEaiCity3dEntity_addInvestmentTotal(level, investment){
   var o = this;
   // 设置数据
   o._investmentCount++;
   o._investmentTotal += investment;
   // 检查现在数据是否比上一次大
   if(investment < o._investmentLast){
      return;
   }
   // 获得颜色
   var rateResource = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(MO.EEaiRate.InvestmentRange);
   var range = 200000;
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
MO.FEaiCity3dEntity_reset = function FEaiCity3dEntity_reset(){
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
MO.FEaiCity3dEntity_update = function FEaiCity3dEntity_update(data){
   var o = this;
   o._color.set(1, 1, 1, 1);
   var marketerCount = data.marketerCount();
   var range = 1;
   o._rangeColor.set(1, 1, 1, 1);
   if(data){
      o._cityTotal = marketerCount;
   }
   var total = o._cityTotal;
   if(total > 0){
      o._visible = true;
   }
   // 计算数值
   var historyModule = MO.Console.find(MO.FEaiResourceConsole).historyModule();
   var rateInfo = MO.Console.find(MO.FEaiResourceConsole).rateModule().find(MO.EEaiRate.Map);
   var rate = Math.sqrt(total / 1000) * 2;
   var color = rateInfo.findRate(rate);
   range = rate * 2;
   rate = MO.Lang.Float.toRange(rate, 0, 1);
   o._rangeColor.setIntAlpha(color, rate * 2);
   o._range = MO.Lang.Float.toRange(Math.sqrt(range / 100), 1, 2);
}

//==========================================================
// <T>从输入流反序列化数据。</T>
//
// @method
// @param input:MStream 输入流
//==========================================================
MO.FEaiCity3dEntity_process = function FEaiCity3dEntity_process(data){
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
MO.FEaiCity3dEntity_dispose = function FEaiCity3dEntity_dispose(){
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
