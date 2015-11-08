//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author sunpeng
// @history 151101
//==========================================================
MO.FEaiCockpitModuleTitleSnapshot = function FEaiCockpitModuleTitleSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._dataTicker           = null;
   o._logoBar              = null;
   o._currentDate          = null;
   // @attribute
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCockpitModuleTitleSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitModuleTitleSnapshot_onPaintBegin;
   o.onTitleFetch          = MO.FEaiCockpitModuleTitleSnapshot_onTitleFetch;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitModuleTitleSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitModuleTitleSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitModuleTitleSnapshot_processLogic;
   o.freshData             = MO.FEaiCockpitModuleTitleSnapshot_freshData;
   // @method
   o.dispose               = MO.FEaiCockpitModuleTitleSnapshot_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTitleSnapshot_onImageLoad = function FEaiCockpitModuleTitleSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTitleSnapshot_onPaintBegin = function FEaiCockpitModuleTitleSnapshot_onPaintBegin(event) {
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
   // 绘制背景
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._backgroundPadding);
   //..........................................................
   //刷新数据
   var frame = o._logoBar;

   var date = o._currentDate;
   date.setNow();
   var dateControl = frame.findComponent('date');
   dateControl.setLabel(date.format('YYYY/MM/DD'));
   var timeControl = frame.findComponent('time');
   timeControl.setLabel(date.format('HH24:MI'));
   //..........................................................
   graphic.setFont(o._rowFontStyle);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTitleSnapshot_construct = function FEaiCockpitModuleTitleSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(3, 0, 0);
   o._cellSize.set(8, 1);   o._currentDate = new MO.TDate();
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._data = MO.Class.create(MO.FEaiCockpitLogicTitle);
   o._backgroundPadding = new MO.SPadding(0, 0, 0, 0);
   o.processLogic();
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTitleSnapshot_setup = function FEaiCockpitModuleTitleSnapshot_setup() {
   var o = this;
   //创建图片
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/cockpit/title/title_bg.png');
   image.addLoadListener(o, o.onImageLoad);

   var frame = o._logoBar = MO.Console.find(MO.FGuiFrameConsole).get(o, 'eai.chart.cockpit.LogoBar');
   o.push(frame);
}

//==========================================================
// <T>获取实时数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTitleSnapshot_onTitleFetch = function FEaiCockpitModuleTitleSnapshot_onTitleFetch(event) {
   var o = this;
   var content = event.content;
   //读取数据
   var data = o._data;
   //data.unserializeSignBuffer(event.sign, event.content, true);
   o.freshData();
}

MO.FEaiCockpitModuleTitleSnapshot_freshData = function FEaiCockpitModuleTitleSnapshot_freshData() {
   var o = this;
   var frame = o._logoBar;
   if (o._data.investmentTotal() != null) {
      var investmentTotal = frame.findComponent('investmentTotal');
      investmentTotal.setValue(o._data.investmentTotal().toString());

      var currentInvestment = frame.findComponent('currentInvestment');
      currentInvestment.setValue(o._data.currentInvestment().toString());
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleTitleSnapshot_processLogic = function FEaiCockpitModuleTitleSnapshot_processLogic() {
   var o = this;
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
MO.FEaiCockpitModuleTitleSnapshot_dispose = function FEaiCockpitModuleTitleSnapshot_dispose() {
   var o = this;
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}