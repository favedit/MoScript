//==========================================================
// <T>号令用户。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitNoticeTableSnapshot = function FEaiCockpitNoticeTableSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri = '{eai.resource}/cockpit/notice/table/notice_list_bg.png';
   // @attribute
   o._data          = null;
   o._dataTicker    = null;
   o._gridRank      = null;
   //..........................................................
   // @event
   o.onFetchData    = MO.FEaiCockpitNoticeTableSnapshot_onFetchData;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitNoticeTableSnapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitNoticeTableSnapshot_setup;
   o.setData        = MO.FEaiCockpitNoticeTableSnapshot_setData;
   o.processLogic   = MO.FEaiCockpitNoticeTableSnapshot_processLogic;
   // @method
   o.dispose        = MO.FEaiCockpitNoticeTableSnapshot_dispose;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableSnapshot_onFetchData = function FEaiCockpitNoticeTableSnapshot_onFetchData(event){
   var o = this;
   var content = event.content;
   var data = o._data;
   if(data.unserializeSignBuffer(event.sign, event.content, true)){
      o.setData(data);
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableSnapshot_construct = function FEaiCockpitNoticeTableSnapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 5, 0);
   o._cellSize.set(7, 4);
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._data  = MO.Class.create(MO.FEaiCockpitNoticeTableData);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableSnapshot_setup = function FEaiCockpitNoticeTableSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   // 创建排行网格
   var grid = o._gridRank = MO.Class.create(MO.FGuiGridControl);
   grid.setOptionClip(false);
   grid.setLocation(20, 20);
   grid.setSize(800, 700);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(20);
   grid.setRight(20);
   grid.setHeadHeight(40);
   grid.setHeadBackColor('rgba(0,0,0,0)');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 22;
   grid.headFont().color = '#00B2F2';
   grid.setRowHeight(40);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 22;
   grid.rowFont().color = '#59FDE9';
   var column = MO.Class.create(MO.FGuiGridColumnPicture);
   column.setName('typeImages');
   column.setLabel();
   column.setDataName('type_images');
   column.setWidth(20);
   column.setPadding(1, 1, 1, 1);
   column.setAlign(MO.EUiAlign.Center);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('titleData');
   column.setLabel('标题');
   column.setDataName('title_data');
   column.setWidth(150);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnDate);
   column.setName('recordDate');
   column.setLabel('发布时间');
   column.setDataName('record_date');
   column.setDateFormat('YYYY-MM-DD');
   column.setWidth(50);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnProgressBar);
   column.setName('prograssData');
   column.setLabel('查看进度');
   column.setDataName('prograss_data');
   column.setAlign(MO.EUiAlign.Center);
   column.setMaxValue(100);
   column.setDrawScale(1);
   column.setup('{eai.resource}/cockpit/notice/table/progress_bar_bg.png', '{eai.resource}/cockpit/notice/table/progress_bar_fill.png');
   grid.pushColumn(column);
   var column = MO.Class.create(MO.FGuiGridColumnPicture);
   column.setName('degreeImages');
   column.setLabel('紧急程度');
   column.setDataName('degree_images');
   column.setWidth(40);
   column.setPadding(1, 1, 1, 1);
   column.setAlign(MO.EUiAlign.Center);
   grid.pushColumn(column);
   o.push(grid);
}

//==========================================================
// <T>设置数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableSnapshot_setData = function FEaiCockpitNoticeTableSnapshot_setData(data){
   var o = this;
   var grid = o._gridRank;
   grid.clearRows();
   var subordinateCount = data.subordinate()
   var noticeUnits = data.noticeList();
   var count = noticeUnits.count();
   for(var i = 0; i < count; i++){
      var unit = noticeUnits.at(i);
      var row = grid.allocRow();
      var progress = parseInt(unit.readCount() / subordinateCount * 100);
      // 排行榜数据填充
      row.set('type_images', '{eai.resource}/cockpit/notice/table/notice_type_' + unit.noticeType() + '.png');
      row.set('title_data', unit.title());
      row.set('record_date', unit.date());
      row.set('prograss_data', progress);
      row.set('degree_images','{eai.resource}/cockpit/notice/table/notice_im_' + unit.important() + '.png');
      grid.pushRow(row);
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableSnapshot_processLogic = function FEaiCockpitNoticeTableSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
   // 加载数据
   var statistics = MO.Console.find(MO.FEaiLogicConsole).cockpit().notice();
   if(o._dataTicker.process()){
      statistics.doFetchList(o, o.onFetchData);
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeTableSnapshot_dispose = function FEaiCockpitNoticeTableSnapshot_dispose() {
   var o = this;
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
