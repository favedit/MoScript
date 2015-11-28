//==========================================================
// <T>号令动态。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitNoticeDynamicSnapshot = function FEaiCockpitNoticeDynamicSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri        = '{eai.resource}/cockpit/notice/notice_dynamic_bg.png';
   o._data                 = null;
   o._dataTicker           = null;
   o._fontTop              = null;
   o._fontContent          = null;
   o._dynamics             = null;
   o._readDynamics         = null;
   o._dynamicData          = MO.Class.register(o, new MO.AGetter('_dynamicData'));
   // @attribute
   o._dynamicSerialization = MO.Class.register(o, new MO.AGetter('_dynamicSerialization'));
   o._readSerialization    = MO.Class.register(o, new MO.AGetter('_readSerialization'));
   // @attribute  
   //..........................................................
   // @event
   o.onPaintBegin          = MO.FEaiCockpitNoticeDynamicSnapshot_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitNoticeDynamicSnapshot_construct;
   o.setup                 = MO.FEaiCockpitNoticeDynamicSnapshot_setup;
   o.refreshDynamic        = MO.FEaiCockpitNoticeDynamicSnapshot_refreshDynamic;
   o.refreshRead           = MO.FEaiCockpitNoticeDynamicSnapshot_refreshRead;
   // @method
   o.processLogic          = MO.FEaiCockpitNoticeDynamicSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitNoticeDynamicSnapshot_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeDynamicSnapshot_onPaintBegin = function FEaiCockpitNoticeDynamicSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o,event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var fontTop = o._fontTop;
   graphic.setFont(fontTop.toString());
   graphic.drawText("号令动态", left + 55, top + 50, fontTop.color);
   graphic.drawText("最新号令阅读情况", left + 600, top + 50, fontTop.color);
   var fontContent = o._fontContent;
   graphic.setFont(fontContent.toString());
   var dynamicCount = o._dynamics.count();
   var dynamicData = o._dynamicData;
   if (dynamicCount > 0){
   for (var i = 0; i < dynamicCount; i++) {
         var dynamic = o._dynamics.at(i)
         dynamicData.parse(dynamic.readDate());
         console.log();
         graphic.drawText(dynamic.department() + dynamic.readName() + "查看了号令" + "    " + dynamicData.format('hh24:mi'), left + 55, top + 80 + 35*i, fontContent.color);
      }
   }
   
   var readCount = o._readDynamics.count();
   if (readCount >0){
      for (var i = 0; i < readCount; i++) {
            var readDynamic = o._readDynamics.at(i);
            var progress = readDynamic.readprogress();
            graphic.drawText(readDynamic.department() + "阅读量" + progress*100 + "%", left + 600, top + 80 + 35*i, fontContent.color);
            graphic.drawText("短信提醒", left+1100, top+75+35*i, '#1366A3');
         }
   }
   
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeDynamicSnapshot_refreshDynamic = function FEaiCockpitNoticeDynamicSnapshot_refreshDynamic(event) {
   var o = this;
   var content = event.content;
   var noticeDynamic = o._dynamicSerialization;
   noticeDynamic.unserializeSignBuffer(event.sign, event.content, true);
   o._dynamics = noticeDynamic.noticeDynamic();
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeDynamicSnapshot_refreshRead = function FEaiCockpitNoticeDynamicSnapshot_refreshRead(event) {
   var o = this;
   var content = event.content;
   var readDynamic = o._readSerialization;
   readDynamic.unserializeSignBuffer(event.sign, event.content, true);
   o._readDynamics = readDynamic.noticePrograss();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeDynamicSnapshot_construct = function FEaiCockpitNoticeDynamicSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(7, 7, 0);
   o._cellSize.set(9, 2);
   o._dynamicSerialization = MO.Class.create(MO.FEaiCockpitNoticeDynamicData);
   o._readSerialization    = MO.Class.create(MO.FEaiCockpitNoticeDynamicNewestData);
   o._dynamicData          = new MO.TDate();
   o._fontTop              = new MO.SUiFont();
   o._dynamics             = new MO.TObjects();
   o._readDynamics         = new MO.TObjects();
   o._fontContent          = new MO.SUiFont();
   o._dataTicker           = new MO.TTicker(1000 * 60 );
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeDynamicSnapshot_setup = function FEaiCockpitNoticeDynamicSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);   
   // o._dynamicImage = o.loadResourceImage('{eai.resource}/cockpit/notice/notice_dynamic_bg.png');
   o._fontTop.parse('#FFCC00 25px Microsoft YaHei');
   o._fontContent.parse('#FFFFFF 21px Microsoft YaHei');
   var statistics = MO.Console.find(MO.FEaiLogicConsole).notice();
   if (o._dataTicker.process()){
      // 取动态数据
      statistics.doFetchDynamic(o, o.refreshDynamic);
      // 取阅读情况数据
      statistics.doFetchRead(o, o.refreshRead);
   }
   

}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeDynamicSnapshot_processLogic = function FEaiCockpitNoticeDynamicSnapshot_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeDynamicSnapshot_dispose = function FEaiCockpitNoticeDynamicSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
}
