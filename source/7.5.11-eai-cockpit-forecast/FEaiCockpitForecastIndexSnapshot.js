//==========================================================
// <T>预测指数预览页面。</T>
//
// @class
// @author maocy
// @history 151126
//==========================================================
MO.FEaiCockpitForecastIndexSnapshot = function FEaiCockpitForecastIndexSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   o._comingSoon    = true;
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/forecast/index.png';
   o._data          = null;
   o._dataTicker    = null;
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitForecastIndexSnapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitForecastIndexSnapshot_onPaintEnd;
   o.onIndexFetch   = MO.FEaiCockpitForecastIndexSnapshot_onIndexFetch;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitForecastIndexSnapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitForecastIndexSnapshot_setup;
   o.processLogic   = MO.FEaiCockpitForecastIndexSnapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitForecastIndexSnapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexSnapshot_onPaintBegin = function FEaiCockpitForecastIndexSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   graphic.setFont('16px Microsoft YaHei');
   if (o._data != null && o._data.registercount() != null)
   {
      graphic.drawText("今日新增注册用户:", left + 20, top + 99, "#ffffff");
      graphic.drawText(o._data.registercount(), left + 161, top + 99, "#ffe721");
      graphic.drawText("本周总投资:", left + 20, top + 139, "#ffffff");
      graphic.drawText(o._data.investmenttotal() + "亿", left + 107, top + 139, "#ffe721");
      graphic.drawText("未来一周赎回:", left + 20, top + 179, "#ffffff");
      graphic.drawText(o._data.weekinvestment() + "亿", left + 125, top + 179, "#ffe721");
      graphic.drawText("本月入职人数:", left + 20, top + 219, "#ffffff");
      graphic.drawText(o._data.entrycount() , left + 125, top + 219, "#ffe721");
      graphic.drawText("本月新增职场:", left + 20, top + 259, "#ffffff");
      graphic.drawText(o._data.workplacecount() + "个", left + 125, top + 259, "#ffe721");
      graphic.drawText("本日新增投资用户:", left + 20, top + 299, "#ffffff");
      graphic.drawText(o._data.investmentcount() + "人", left + 161, top + 299, "#ffe721");
      graphic.drawText("本周人均投资额:", left + 20, top + 339, "#ffffff");
      graphic.drawText(o._data.averageinvestment() + "元", left + 143, top + 339, "#ffe721");
      graphic.drawText("未来一周赎回:", left + 20, top + 379, "#ffffff");
      graphic.drawText(o._data.weekredemption() + "亿", left + 125, top + 379, "#ffe721");
      graphic.drawText("本月离职人数:", left + 20, top + 419, "#ffffff");
      graphic.drawText(o._data.leavecount() + "人", left + 125, top + 419, "#ffe721");
      graphic.drawText("本月新增财富端公司:", left + 20, top + 459, "#ffffff");
      graphic.drawText(o._data.wealthcompany() + "个", left + 179, top + 459, "#ffe721");
   }
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexSnapshot_onPaintEnd = function FEaiCockpitForecastIndexSnapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexSnapshot_construct = function FEaiCockpitForecastIndexSnapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(14, 1, 0);
   o._cellSize.set(2, 5);
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._data = MO.Class.create(MO.FEaiCockpitForecastIndexData);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexSnapshot_setup = function FEaiCockpitForecastIndexSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
}

//==========================================================
// <T>获取实时数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexSnapshot_onIndexFetch = function FEaiCockpitForecastIndexSnapshot_onIndexFetch(event) {
   var o = this;
   //读取数据
   var data = o._data;
   data.unserializeSignBuffer(event.sign, event.content, true);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexSnapshot_processLogic = function FEaiCockpitForecastIndexSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
   if (o._dataTicker.process()) {
      var index = MO.Console.find(MO.FEaiLogicConsole).cockpit().forecast();
      index.doFetchExponentForecast(o, o.onIndexFetch);
   }
   o.dirty();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastIndexSnapshot_dispose = function FEaiCockpitForecastIndexSnapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
