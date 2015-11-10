//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitModuleWarningSnapshot = function FEaiCockpitModuleWarningSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   o._gridControl          = null;
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
   o.onImageLoad           = MO.FEaiCockpitModuleWarningSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitModuleWarningSnapshot_onPaintBegin;
   o.onWarningFetch        = MO.FEaiCockpitModuleWarningSnapshot_onWarningFetch;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitModuleWarningSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitModuleWarningSnapshot_setup;
   o.setData               = MO.FEaiCockpitModuleWarningSnapshot_setData;
   o.processLogic          = MO.FEaiCockpitModuleWarningSnapshot_processLogic;
   o.nextPosition          = MO.FEaiCockpitModuleWarningSnapshot_nextPosition;
   // @method
   o.dispose               = MO.FEaiCockpitModuleWarningSnapshot_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleWarningSnapshot_onImageLoad = function FEaiCockpitModuleWarningSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>获取阀值预警数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleWarningSnapshot_onWarningFetch = function FEaiCockpitModuleWarningSnapshot_onWarningFetch(event) {
   var o = this;
   var content = event.content;
   //读取数据
   var data = o._data;
   data.unserializeSignBuffer(event.sign, event.content, true);
   if(o._gridControl.rows().count() == 0) o.setData(data);
}

//==========================================================
// <T>添加数据实体。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleWarningSnapshot_setData = function FEaiCockpitModuleWarningSnapshot_setData(data) {
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
MO.FEaiCockpitModuleWarningSnapshot_onPaintBegin = function FEaiCockpitModuleWarningSnapshot_onPaintBegin(event) {
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

   //绘制圆点
   if(o._data.warningItems() != null) {
      var count = o._data.warningItems().count();
      count = count > 5 ? 5 : count;
      var topPosition = 40;
      var leftPosition = 116;
      for (var i = 0; i < count; ++i){
         graphic.drawCircle(leftPosition, topPosition, 5, 1, "#ffffff", "#ffffff");
         topPosition += 40;
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleWarningSnapshot_construct = function FEaiCockpitModuleWarningSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(11, 0, 0);
   o._cellSize.set(5, 2);
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._scrollTicker = new MO.TTicker(1000 * 30);
   o._currentDate = new MO.TDate();
   o._data = MO.Class.create(MO.FEaiCockpitMessageWarning);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleWarningSnapshot_setup = function FEaiCockpitModuleWarningSnapshot_setup(){
   var o = this;
   // 创建图片
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/cockpit/warning/ground.png');
   image.addLoadListener(o, o.onImageLoad);

   var grid = o._gridControl = MO.Class.create(MO.FGuiTable);
   grid.setOptionClip(true);
   grid.setLocation(138, 16);
   grid.setSize(500, 194);
   grid.setDisplayHead(false);
   grid.setRowHeight(40);
   grid.setRowLimitCount(5);
   grid.rowFont().size = 20;
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().color = '#ffffff';

   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setTextAlign(MO.EUiAlign.Left);
   column.setName('item');
   column.setDataName('item');
   column.setWidth(400);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);

   o.push(grid);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleWarningSnapshot_processLogic = function FEaiCockpitModuleWarningSnapshot_processLogic(){
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
MO.FEaiCockpitModuleWarningSnapshot_nextPosition = function FEaiCockpitModuleWarningSnapshot_nextPosition() {
   var o = this;
   var count = o._data.warningItems().count();
   o._scrollPosition = o._scrollPosition + 1 >= count ? 0 : o._scrollPosition + 1;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleWarningSnapshot_dispose = function FEaiCockpitModuleWarningSnapshot_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
