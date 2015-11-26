//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitWarningSnapshot = function FEaiCockpitWarningSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   o._gridControl          = null;
   // o._renderableScale      = 2;
   // @attribute
   o._scrollTicker         = null;
   o._scrollTimes          = 0;
   o._scrollPosition       = 0;
   // @attribute
   o._backgroundImage      = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onPaintBegin          = MO.FEaiCockpitWarningSnapshot_onPaintBegin;
   o.onPaintEnd            = MO.FEaiCockpitWarningSnapshot_onPaintEnd;
   o.onWarningFetch        = MO.FEaiCockpitWarningSnapshot_onWarningFetch;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitWarningSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitWarningSnapshot_setup;
   o.setData               = MO.FEaiCockpitWarningSnapshot_setData;
   o.processLogic          = MO.FEaiCockpitWarningSnapshot_processLogic;
   o.nextPosition          = MO.FEaiCockpitWarningSnapshot_nextPosition;
   // @method
   o.dispose               = MO.FEaiCockpitWarningSnapshot_dispose;
   //..........................................................
   o._comingSoonImage = null;
   //..........................................................
   return o;
}

//==========================================================
// <T>获取阀值预警数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningSnapshot_onWarningFetch = function FEaiCockpitWarningSnapshot_onWarningFetch(event) {
   var o = this;
   var content = event.content;
   //读取数据
   var data = o._data;
   if(data.unserializeSignBuffer(event.sign, event.content, true)){
      o.setData(data);
   }
}

//==========================================================
// <T>添加数据实体。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningSnapshot_setData = function FEaiCockpitWarningSnapshot_setData(data) {
   var o = this;
   var items = data.warningItems();
   var grid = o._gridControl;
   grid.clearRows();
   var count = items.count();
   count = count > 5 ? 5 : count;
   for (var i = 0; i < count; ++i) {
      var item = items.at(i);
      var row = grid.allocRow();
      //预警数据
      row.set('circle', "{eai.resource}/cockpit/warning/point.png");
      row.set('item', item.message());
      grid.pushRow(row);
      o.nextPosition();
   }
   o.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningSnapshot_onPaintBegin = function FEaiCockpitWarningSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   //..........................................................
   // 绘制背景
   graphic.drawImage(o._backgroundImage, left, top, width, height);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningSnapshot_onPaintEnd = function FEaiCockpitWarningSnapshot_onPaintEnd(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   //..........................................................
   //graphic.drawImage(o._comingSoonImage, 5 * 120 - 247 + 36, 2 * 120 - 217 + 56, 247, 217);
   //..........................................................
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningSnapshot_construct = function FEaiCockpitWarningSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(11, 0, 0);
   o._cellSize.set(5, 2);
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._scrollTicker = new MO.TTicker(1000 * 25);
   o._currentDate = new MO.TDate();
   o._data = MO.Class.create(MO.FEaiCockpitWarningMessage);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningSnapshot_setup = function FEaiCockpitWarningSnapshot_setup(){
   var o = this;
   // 创建图片
   o._backgroundImage = o.loadResourceImage('{eai.resource}/cockpit/warning/ground.png');
   var grid = o._gridControl = MO.Class.create(MO.FGuiTable);
   grid.setOptionClip(true);
   grid.setLocation(70, 16);
   grid.setSize(500, 194);
   grid.setDisplayHead(false);
   grid.setRowHeight(40);
   grid.setRowLimitCount(5);
   grid.rowFont().size = 20;
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().color = '#ffffff';

   var column = MO.Class.create(MO.FGuiGridColumnPicture);
   column.setName('circle');
   column.setLabel();
   column.setDataName('circle');
   column.setWidth(20);
   column.setPadding(1,1,1,1);
   column.setAlign(MO.EUiAlign.Center);
   grid.pushColumn(column);

   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setTextAlign(MO.EUiAlign.Left);
   column.setName('item');
   column.setDataName('item');
   column.setWidth(400);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);

   o.push(grid);

   //..........................................................
   o._comingSoonImage = o.loadResourceImage('{eai.resource}/cockpit/coming_soon.png');
   //..........................................................
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningSnapshot_processLogic = function FEaiCockpitWarningSnapshot_processLogic(){
   var o = this;
   if(o._dataTicker.process()) {
      var warning = MO.Console.find(MO.FEaiLogicConsole).cockpit().warning();
      warning.doFetch(o, o.onWarningFetch);
   }
   if(o._data.warningItems() != null) {
      if(o._scrollTicker.process()) {
         var len = o._data.warningItems().count();
         o._scrollTimes = len > 5 ? 5 : 0;
      }
      if(o._scrollTimes > 0) {
         var items = o._data.warningItems();
         var count = items.count();
         var grid = o._gridControl;
         var item = items.at(o._scrollPosition);
         var row = grid.allocRow();
         row.set('circle', "{eai.resource}/cockpit/warning/point.png");
         row.set('item', item.message());
         grid.insertRow(row);
         o.nextPosition();
         o._scrollTimes --;
      }
   }
   o._gridControl.psUpdate();
}

//==========================================================
// <T>Position累加。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningSnapshot_nextPosition = function FEaiCockpitWarningSnapshot_nextPosition() {
   var o = this;
   var count = o._data.warningItems().count();
   o._scrollPosition = o._scrollPosition + 1 >= count ? 0 : o._scrollPosition + 1;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitWarningSnapshot_dispose = function FEaiCockpitWarningSnapshot_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
