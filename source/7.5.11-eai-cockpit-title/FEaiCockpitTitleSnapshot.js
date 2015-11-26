//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author sunpeng
// @history 151101
//==========================================================
MO.FEaiCockpitTitleSnapshot = function FEaiCockpitTitleSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._name                 = 'cockpit.forecast.snapshot';
   o._backgroundUri        = '{eai.resource}/cockpit/title/ground.png';
   // @attribute
   o._dataTicker           = null;
   o._logoBar              = null;
   o._currentDate          = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onTitleFetch          = MO.FEaiCockpitTitleSnapshot_onTitleFetch;
   o.onPaintBegin          = MO.FEaiCockpitTitleSnapshot_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitTitleSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitTitleSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitTitleSnapshot_processLogic;
   o.freshData             = MO.FEaiCockpitTitleSnapshot_freshData;
   o.drawText              = MO.FEaiCockpitTitleSnapshot_drawText;
   // @method
   o.dispose               = MO.FEaiCockpitTitleSnapshot_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTitleSnapshot_onPaintBegin = function FEaiCockpitTitleSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = left + width;
   var bottom = top + height;
   var heightRate = height / o._size.height;
   var drawLeft = left + 12;
   var drawRight = right - 12;
   var drawWidth = right - left;

   var topPosition = top + 70;
   var leftPosition = left + 100;
   //..........................................................
   //刷新数据
   var frame = o._logoBar;

   var date = o._currentDate;
   date.setNow();
   var dateControl = frame.findComponent('date');
   dateControl.setLabel(date.format('YYYY/MM/DD'));
   var timeControl = frame.findComponent('time');
   timeControl.setLabel(date.format('HH24:MI'));

   if(o._data != null && o._data.employeeCount() != null)
   {
      graphic.setFont('18px Microsoft YaHei');
      //o.drawText(graphic, rectangle, ['#ffffff', '集团现有', 
      //                              '#ffe721', o._data.employeeCount().toString(), 
      //                              '#ffffff', '名员工，', 
      //                              '#ffe721', o._data.marketerCount().toString(), 
      //                              '#ffffff', '名理财师，', 
      //                              '#ffe721', o._data.subsidiaryCount().toString(), 
      //                              '#ffffff', '个财富端子公司，', 
      //                              '#ffe721', o._data.wealthCount().toString(), 
      //                              '#ffffff', '个财富端分公司，分布在', 
      //                              '#ffe721', o._data.workplaceCount().toString(), 
      //                              '#ffffff', '个职场']);
      o.drawText(graphic, rectangle, ['#ffffff', '集团现有', 
                                      '#ffe721', o._data.employeeCount().toString(), 
                                      '#ffffff', '名员工，', 
                                      '#ffe721', o._data.marketerCount().toString(), 
                                      '#ffffff', '名理财师，', 
                                      '#ffe721', o._data.subsidiaryCount().toString(), 
                                      '#ffffff', '个财富端子公司，', 
                                      '#ffe721', o._data.wealthCount().toString(), 
                                      '#ffffff', '个财富端分公司']);
   }
   
   //..........................................................
   graphic.setFont(o._rowFontStyle);
}

MO.FEaiCockpitTitleSnapshot_drawText = function FEaiCockpitTitleSnapshot_drawText(graphic, rect, data) {
   var left = rect.left;
   var top = rect.left;
   var width = rect.width;
   var height = rect.height;
   var leftPosition = left + 20;
   var topPositon = top + 68;

   var i;
   var len = data.length;
   for(i=0; i < len; i+=2) {
      var color = data[i];
      var text = data[i+1];
      var textWidth = graphic.textWidth(text);
      graphic.drawText(text, leftPosition, topPositon, color);
      leftPosition += textWidth;
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTitleSnapshot_construct = function FEaiCockpitTitleSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(3, 0, 0);
   o._cellSize.set(8, 1); 
   o._currentDate = new MO.TDate();
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._data = MO.Class.create(MO.FEaiCockpitTitleMessage);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTitleSnapshot_setup = function FEaiCockpitTitleSnapshot_setup() {
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   // 创建图片
   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.cockpit.LogoBar');
   o.push(frame);
}

//==========================================================
// <T>获取实时数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTitleSnapshot_onTitleFetch = function FEaiCockpitTitleSnapshot_onTitleFetch(event) {
   var o = this;
   var content = event.content;
   //读取数据
   var data = o._data;
   if(data.unserializeSignBuffer(event.sign, event.content, true)){
      o.freshData();
   }
}

MO.FEaiCockpitTitleSnapshot_freshData = function FEaiCockpitTitleSnapshot_freshData() {
   var o = this;
   var frame = o._logoBar;
   if (o._data.investmentTotal() != null) {
      var investmentTotal = frame.findComponent('investmentTotal');
      investmentTotal.setValue(o._data.investmentTotal().toFixed(0).toString());

      var currentInvestment = frame.findComponent('currentInvestment');
      currentInvestment.setValue(o._data.currentInvestment().toFixed(0).toString());

      var thingCount = frame.findComponent('thing');
      thingCount.setLabel("(" + o._data.thingCount().toString() + ")");

      var unreadCount = frame.findComponent('unread');
      unreadCount.setLabel("(" + o._data.unreadCount().toString() + ")");
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTitleSnapshot_processLogic = function FEaiCockpitTitleSnapshot_processLogic() {
   var o = this;
    o.__base.FEaiCockpitControl.processLogic.call(o);
  if (o._dataTicker.process()) {
      var title = MO.Console.find(MO.FEaiLogicConsole).cockpit().title();
      title.doFetch(o, o.onTitleFetch);
   }
   o.dirty();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitTitleSnapshot_dispose = function FEaiCockpitTitleSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}