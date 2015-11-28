//==========================================================
// <T>标志预览。</T>
//
// @class
// @author maocy
// @history 151107
//==========================================================
MO.FEaiCockpitAchievementTitleRankSnapshot = function FEaiCockpitAchievementTitleRankSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri        = '{eai.resource}/cockpit/achievement/rankright.png';
   // @attribute
   o._data                 = null;
   o._chartData            = null;
   o._chartDataSet         = null;
   o._dataTicker           = null;
   // @attribute
   o._backgroundImage      = null;
   o._gridImage            = null;
   o._listBox              = null;
   o._index                = 0;
   o._page                 = 0;
   o._pageItemsTotal       = 0;
   o._pageMax              = 0;
   o._pageItemsMax         = 8;
   o._rollDuration         = 5000;
   o._rollTicker           = null;
   o._lineChart            = null;
   o._gridControl          = null; //表格控件
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   //..........................................................
   // @event
   o.onDataFetch           = MO.FEaiCockpitAchievementTitleRankSnapshot_onDataFetch;
   o.onPaintBegin          = MO.FEaiCockpitAchievementTitleRankSnapshot_onPaintBegin;
   o.onPaintEnd            = MO.FEaiCockpitAchievementTitleRankSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitAchievementTitleRankSnapshot_construct;
   o.setData               = MO.FEaiCockpitAchievementTitleRankSnapshot_setData;
   // @method
   o.setup                 = MO.FEaiCockpitAchievementTitleRankSnapshot_setup;
   o.roll                  = MO.FEaiCockpitAchievementTitleRankSnapshot_roll;
   o.processLogic          = MO.FEaiCockpitAchievementTitleRankSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitAchievementTitleRankSnapshot_dispose;
   //..........................................................
   o._comingSoonImage      = null;
   //..........................................................
   return o;
}

//==========================================================
// <T>获取数据信息。</T>
//
// @method
// @param event:SEvent 事件信息
//==========================================================
MO.FEaiCockpitAchievementTitleRankSnapshot_onDataFetch = function FEaiCockpitAchievementTitleRankSnapshot_onDataFetch(event){
   var o = this;
   var content = event.content;
   // 读取数据
   var data = o._data;
   if (data.unserializeSignBuffer(event.sign, event.content, true)) {
      o.setData(data);
   }
}

//==========================================================
// <T>设置数据重新显示</T>
//
// @method
// @param unit:
//==========================================================
MO.FEaiCockpitAchievementTitleRankSnapshot_setData = function FEaiCockpitAchievementTitleRankSnapshot_setData(data) {
   var o = this;
   var achievementRank = data.achievementRank();
   var humanRank = data.humanRank();
   var averageRank = data.averageRank();
   if (achievementRank.count() < 3 || humanRank.count() < 3 || averageRank.count() < 3){
      return;
   }
   var grid = o._gridControl;
   grid.clearRows();
   // 第一行
   row = grid.allocRow();
   row.set('corporateName', "第一名");
   row.set('firstName', achievementRank.at(0).rank());
   row.set('secondName', humanRank.at(0).rank());
   row.set('thirdName', averageRank.at(0).rank());
   grid.pushRow(row);
   // 第二行
   row = grid.allocRow();
   row.set('corporateName', "第二名");
   row.set('firstName', achievementRank.at(1).rank());
   row.set('secondName', humanRank.at(1).rank());
   row.set('thirdName', averageRank.at(1).rank());
   grid.pushRow(row);
   // 第三行
   row = grid.allocRow();
   row.set('corporateName', "第三名");
   row.set('firstName', achievementRank.at(2).rank());
   row.set('secondName', humanRank.at(2).rank());
   row.set('thirdName', averageRank.at(2).rank());
   grid.pushRow(row);
   // 重新绘制
   o.dirty();
}
//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleRankSnapshot_onPaintBegin = function FEaiCockpitAchievementTitleRankSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleRankSnapshot_onPaintEnd = function FEaiCockpitAchievementTitleRankSnapshot_onPaintEnd(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleRankSnapshot_construct = function FEaiCockpitAchievementTitleRankSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(7, 1, 0);
   o._cellSize.set(9, 1);
   // 设置属性
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._rollTicker = new MO.TTicker(o._rollDuration);
   o._data = MO.Class.create(MO.FEaiCockpitMessageAchievementNextRanks);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleRankSnapshot_setup = function FEaiCockpitAchievementTitleRankSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   // 创建网格
   var grid = o._gridControl = MO.Class.create(MO.FGuiTable);
   grid.setOptionClip(true);
   grid.setLocation(60, 14);
   grid.setSize(900, 120);
   grid.setHeadHeight(18);
   grid.setHeadBackColor('rgba(255,0,0,0)');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 18;
   grid.headFont().color = '#ffffff';
   grid.setRowHeight(23);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 18;
   grid.rowFont().color = '#ffffff';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('corporateName');
   column.setLabel('');
   column.setTextAlign(MO.EUiAlign.Center);
   column.setDataName('corporateName');
   column.setWidth(200);
   column.setPadding(0, 0, 0, 0);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('firstName');
   column.setLabel('业绩');
   column.setTextAlign(MO.EUiAlign.Center);
   column.setWidth(230);
   column.setDataName('firstName');
   column.setPadding(0, 0, 0, 0);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('secondName');
   column.setLabel('人力');
   column.setDataName('secondName');
   column.setTextAlign(MO.EUiAlign.Center);
   column.setWidth(230);
   column.setPadding(0, 0, 0, 0);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('thirdName');
   column.setLabel('人均');
   column.setDataName('thirdName');
   column.setTextAlign(MO.EUiAlign.Center);
   column.setWidth(230);
   column.setPadding(0, 0, 0, 0);
   grid.pushColumn(column);

   grid.clearRows();
   row = grid.allocRow();
   row.set('corporateName', "业绩:");
   grid.pushRow(row);

   row = grid.allocRow();
   row.set('corporateName', "人力:");
   grid.pushRow(row);

   row = grid.allocRow();
   row.set('corporateName', "人均:");
   grid.pushRow(row);
   //..........................................................
   o.push(grid);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleRankSnapshot_processLogic = function FEaiCockpitAchievementTitleRankSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
   if(o._dataTicker.process()){
      var achievement = MO.Console.find(MO.FEaiLogicConsole).cockpit().achievement();
      achievement.doFetchRank(o, o.onDataFetch);
   }

}

//==========================================================
// @method
//==========================================================
MO.FEaiCockpitAchievementTitleRankSnapshot_dispose = function FEaiCockpitAchievementTitleRankSnapshot_dispose() {
   var o = this;
   // 释放属性
   o._data = MO.Lang.Object.dispose(o._data);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
