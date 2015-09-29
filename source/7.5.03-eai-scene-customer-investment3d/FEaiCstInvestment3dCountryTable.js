//==========================================================
// <T>全国各省分公司数、理财师数表。</T>
//
// @class
// @author sunpeng
// @history 150911
//==========================================================
MO.FEaiCstInvestment3dCountryTable = function FEaiCstInvestment3dCountryTable(o) {
   o = MO.Class.inherits(this, o, MO.FGuiControl);
   //..........................................................
   // @attribute
   o._backgroundImage = null;
   o._backgroundPadding = null;
   // @attibute
   o._tableCount = 0;
   o._units = null;
   o._lineScroll = 0;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onImageLoad = MO.FEaiCstInvestment3dCountryTable_onImageLoad;
   o.onPaintBegin = MO.FEaiCstInvestment3dCountryTable_onPaintBegin;
   //..........................................................
   // @method
   o.construct = MO.FEaiCstInvestment3dCountryTable_construct;
   // @method
   o.setup = MO.FEaiCstInvestment3dCountryTable_setup;
   o.setUnits = MO.FEaiCstInvestment3dCountryTable_setUnits;
   // @method
   o.dispose = MO.FEaiCstInvestment3dCountryTable_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCstInvestment3dCountryTable_onImageLoad = function FEaiCstInvestment3dCountryTable_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCstInvestment3dCountryTable_onPaintBegin = function FEaiCstInvestment3dCountryTable_onPaintBegin(event) {
   var o = this;
   o.__base.FGuiControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = left + width;
   var bottom = top + height;
   var drawPosition = top;
   var heightRate = height / o._size.height;
   var drawLeft = left + 12;
   var drawRight = right - 12;
   var drawWidth = right - left;
   //..........................................................
   // 绘制背景
   graphic.drawGridImage(o._backgroundImage, left, top, width, height, o._backgroundPadding);
   //..........................................................
   // 绘制标题
   var titleText = '全球理财师数据展示中心';
   graphic.setFont(o._headFontStyle);
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (width - titleWidth) * 0.5;
   graphic.drawText(titleText, textLeft, top + 76, '#59FDE9');
   //..........................................................
   graphic.setFont(o._rowFontStyle);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCstInvestment3dCountryTable_construct = function FEaiCstInvestment3dCountryTable_construct() {
   var o = this;
   o.__base.FGuiControl.construct.call(o);
   // 创建属性
   o._units = new MO.TObjects();
   o._rankLinePadding = new MO.SPadding(40, 0, 40, 0);
   o._backgroundPadding = new MO.SPadding(20, 20, 90, 20);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCstInvestment3dCountryTable_setup = function FEaiCstInvestment3dCountryTable_setup() {
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   // 创建图片
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/live/grid2.png');
   image.addLoadListener(o, o.onImageLoad);
   //..........................................................
   var grid = o._gridControl = MO.Class.create(MO.FGuiGridControl);
   grid.setOptionClip(true);
   grid.setLocation(50, 120);
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right | MO.EUiAnchor.Bottom);
   grid.setLeft(9);
   grid.setRight(19);
   grid.setBottom(20);
   grid.setHeadHeight(35);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 22;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(32);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 21;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('companyName');
   column.setLabel('公司名称');
   column.setDataName('companyName');
   column.setWidth(170);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('marketerCount');
   column.setLabel('理财师数');
   column.setDataName('marketerCount');
   column.setTextAlign(MO.EUiAlign.Right);
   column.setWidth(100);
   column.cellPadding().right = 10;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnBigNumber);
   column.setName('investment');
   column.setLabel('投资总额(万)');
   column.setDataName('investment');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FF7200');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.setWidth(140);
   column.cellPadding().right = 15;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnBigNumber);
   column.setName('redemption');
   column.setLabel('赎回总额(万)');
   column.setDataName('redemption');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FF7200');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.setWidth(130);
   column.cellPadding().right = 15;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnBigNumber);
   column.setName('netinvestment');
   column.setLabel('净投总额(万)');
   column.setDataName('netinvestment');
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FF7200');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.setWidth(130);
   column.cellPadding().right = 15;
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
   //..........................................................
   // 设置数据
   o._headFontStyle = 'bold 32px Microsoft YaHei';
   var isVertical = MO.Window.Browser.isOrientationVertical()
   if (isVertical) {
      o._tableCount = 11;
      o._headStart = 352;
      o._headTextTop = 37;
      o._headHeight = 54;
      o._rowStart = 418;
      o._rowTextTop = 0;
      o._rowFontStyle = '36px Microsoft YaHei';
   } else {
      o._tableCount = 19;
      o._headStart = 336;
      o._headTextTop = 27;
      o._headHeight = 40;
      o._rowFontStyle = '22px Microsoft YaHei';
      o._rowStart = 384;
   }
}

//==========================================================
// <T>增加一个数据实体。</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiCstInvestment3dCountryTable_setUnits = function FEaiCstInvestment3dCountryTable_setUnits(units) {
   var o = this;
   // 检查参数
   if (!units) {
      return null;
   }
   var departmentModule = MO.Console.find(MO.FEaiResourceConsole).departmentModule();
   var grid = o._gridControl;
   grid.clearRows();
   var count = units.count();
   for (var i = 0; i < count; i++) {
      var unit = units.at(i);
      var row = grid.allocRow();
      // 获得公司名称
      var departmentLabel = unit.label();
      var department = departmentModule.findByFullLabel(departmentLabel);
      if(department){
         departmentLabel = department.label();
      }
      // 设置数据内容
      row.set('companyName', departmentLabel);
      row.set('marketerCount', unit.marketerCount());
      row.set('investment', unit.investment());
      row.set('redemption', unit.redemption());
      row.set('netinvestment', unit.netinvestment());

      grid.pushRow(row);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCstInvestment3dCountryTable_dispose = function FEaiCstInvestment3dCountryTable_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}