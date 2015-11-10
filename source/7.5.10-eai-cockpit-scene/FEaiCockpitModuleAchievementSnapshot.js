//==========================================================
// <T>业绩视图缩略图。</T>
//
// @class
// @author sunpeng
// @history 151108
//==========================================================
MO.FEaiCockpitModuleAchievementSnapshot = function FEaiCockpitModuleAchievementSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   o._backgroundImage      = null;
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
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   //..........................................................
   // 绘制背景
   graphic.drawRectangleImage(o._backgroundImage, rectangle);
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
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(11, 4, 0);
   o._cellSize.set(5, 5);
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._currentDate = new MO.TDate();
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
   grid.setLocation(10, 58);
   grid.setSize(578, 500);
   grid.setHeadHeight(35);
   grid.setHeadBackColor('#4f597d');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 22;
   grid.headFont().color = '#2adae9';
   grid.setRowHeight(22);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   grid.rowFont().color = '#ffffff';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('label');
   column.setLabel('公司名称');
   column.setTextAlign(MO.EUiAlign.LeftPadding);
   column.setWidth(120);
   column.setDataName('label');
   column.setWidth(160);
   column.setPadding(0, 0, 0, 0);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnCurrency);
   column.setName('investmentAmount');
   column.setLabel('投资额');
   column.setDataName('investment_amount');
   column.cellPadding().right = 10;
   column.setNormalColor('#ffffff');
   column.setHighColor('#edfc2d');
   column.setLowerColor('#edfc2d');
   column.setNegativeColor('#edfc2d');
   column.setWidth(140);
   column.setPadding(0, 0, 0, 0);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('level');
   column.setLabel('排名');
   column.setDataName('level');
   column.setWidth(60);
   column.setPadding(0, 0, 0, 0);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('trend');
   column.setLabel('趋势');
   column.setDataName('trend');
   column.setWidth(60);
   column.setPadding(0, 0, 0, 0);
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
      var label = department.label();
      // 排行榜数据填充
      if(label == "上海仁立网络科技有限公司"){
         label = "上海仁立有限公司";
      }else if(label == "安信普华财富投资管理（北京）有限公司"){
         label = "安信普华（北京）";
      }else if(label == "金易融(上海)网络科技有限公司"){
         label = "金易融(上海)";
      }else if(label == "深圳前海智赢商务信息咨询有限公司"){
         label = "深圳前海智赢";
      }
      row.set('label', label);
      row.set('investment_amount', department.investmentAmount().toFixed(0));
      row.set('level', i+1);
      switch(i%3){
      case 0:
      row.set('trend', '↑');
      break;
      case 1:
      row.set('trend', '↓');
      break;
      case 2:
      row.set('trend', '→');
      break;
      }
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
   o.__base.FEaiCockpitControl.dispose.call(o);
}
