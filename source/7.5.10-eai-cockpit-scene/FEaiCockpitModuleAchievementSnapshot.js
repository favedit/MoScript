//==========================================================
// <T>实时投资表。</T>
//
// @class
// @author sunpeng
// @history 151101
//==========================================================
MO.FEaiCockpitModuleAchievementSnapshot = function FEaiCockpitModuleAchievementSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitCubeControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   o._backgroundImage      = null;
   o._backgroundPadding    = null;
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCockpitModuleAchievementSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitModuleAchievementSnapshot_onPaintBegin;
   o.onAchievementFetch    = MO.FEaiCockpitModuleAchievementSnapshot_onAchievementFetch;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitModuleAchievementSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitModuleAchievementSnapshot_setup;
   o.setData               = MO.FEaiCockpitModuleAchievementSnapshot_setData;
   o.processLogic          = MO.FEaiCockpitModuleAchievementSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitModuleAchievementSnapshot_dispose;
   return o;
}

//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleAchievementSnapshot_onImageLoad = function FEaiCockpitModuleAchievementSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleAchievementSnapshot_onPaintBegin = function FEaiCockpitModuleAchievementSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitCubeControl.onPaintBegin.call(o, event);
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
   var titleText = 'e租宝财富端本月业绩';
   graphic.setFont('bold 32px Microsoft YaHei');
   var titleWidth = graphic.textWidth(titleText);
   var textLeft = left + (width - titleWidth) * 0.5;
   graphic.drawText(titleText, textLeft, top + 60, '#333333');
   drawPosition += 60
      //..........................................................
   graphic.setFont(o._rowFontStyle);
}

//==========================================================
// <T>获取业绩数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleAchievementSnapshot_onAchievementFetch = function FEaiCockpitModuleAchievementSnapshot_onAchievementFetch(event){
   var o = this;
   var content = event.content;
   // 读取数据
   var data = o._data;
   data.unserializeSignBuffer(event.sign, event.content, true);
   o.setData(data);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleAchievementSnapshot_construct = function FEaiCockpitModuleAchievementSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitCubeControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(11, 4, 0);
   o._cellSize.set(5, 5);
   o._size.set(600, 840);
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._currentDate = new MO.TDate();
   o._backgroundPadding = new MO.SPadding(20, 0, 20, 0);
   o._data = MO.Class.create(MO.FEaiCockpitMessageAchievement);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleAchievementSnapshot_setup = function FEaiCockpitModuleAchievementSnapshot_setup(){
   var o = this;
   // 创建图片
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._backgroundImage = imageConsole.load('{eai.resource}/cockpit/achievement/ground.png');
   image.addLoadListener(o, o.onImageLoad);
   //..........................................................
   var grid = o._gridControl = MO.Class.create(MO.FGuiTable);
   grid.setOptionClip(true);
   grid.setLocation(6, 80);
   grid.setSize(578, 760);
   grid.setHeadHeight(35);
   grid.setHeadBackColor('#122A46');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 22;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(28);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('label');
   column.setLabel('公司名称');
   column.setDataName('label');
   column.setWidth(160);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investmentAmount');
   column.setLabel('投资额');
   column.setDataName('investment_amount');
   column.cellPadding().right = 10;
   column.setNormalColor('#59FDE9');
   column.setHighColor('#FDEF01');
   column.setLowerColor('#EB6C03');
   column.setNegativeColor('#FF0000');
   column.setWidth(140);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('level');
   column.setLabel('排名');
   column.setDataName('level');
   column.setWidth(60);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('trend');
   column.setLabel('趋势');
   column.setDataName('trend');
   column.setWidth(60);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
}

//==========================================================
// <T>增加一个数据实体。</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiCockpitModuleAchievementSnapshot_setData = function FEaiCockpitModuleAchievementSnapshot_setData(data) {
   var o = this;
   var departments = data.departments();
   var grid = o._gridControl;
   grid.clearRows();
   var count = departments.count();
   for (var i = 0; i < count; i++) {
      var department = departments.at(i);
      var row = grid.allocRow();
      // 排行榜数据填充
      row.set('label', department.label());
      row.set('investment_amount', department.investmentAmount());
      row.set('level', 0);
      row.set('trend', 0);
      grid.pushRow(row);
   }
   o.dirty();
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleAchievementSnapshot_processLogic = function FEaiCockpitModuleAchievementSnapshot_processLogic(){
   var o = this;
   if(o._dataTicker.process()){
      var achievement = MO.Console.find(MO.FEaiLogicConsole).cockpit().achievement();
      achievement.doFetch(o, o.onAchievementFetch);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitModuleAchievementSnapshot_dispose = function FEaiCockpitModuleAchievementSnapshot_dispose() {
   var o = this;
   o._units = MO.Lang.Object.dispose(o._units);
   o._backgroundPadding = MO.Lang.Object.dispose(o._backgroundPadding);
   // 父处理
   o.__base.FEaiCockpitCubeControl.dispose.call(o);
}
