//==========================================================
// <T>项目管理模块。</T>
//
// @class
// @author zhaoyihan
// @history 151201
//==========================================================
MO.FEaiCockpitProjectContentSnapshot = function FEaiCockpitProjectContentSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   o._backgroundUri = '{eai.resource}/cockpit/project/content_bg.png';
   o._escImage      = null;
   o._linetImage    = null;
   o._process       = null;
   o._processbg     = null;
   o._processtime   = null;
   o._level         = null;
   o._level2        = null;
   o._data          = null;
   o._ok            = null;
   o._nook          = null;
   o._gridRank      = null;
   //..........................................................
   // @event
   o.onPaintBegin   = MO.FEaiCockpitProjectContentSnapshot_onPaintBegin;
   o.onPaintEnd     = MO.FEaiCockpitProjectContentSnapshot_onPaintEnd;
   //..........................................................
   // @method
   o.construct      = MO.FEaiCockpitProjectContentSnapshot_construct;
   // @method
   o.setup          = MO.FEaiCockpitProjectContentSnapshot_setup;
   o.processLogic   = MO.FEaiCockpitProjectContentSnapshot_processLogic;
   o.setDatas       = MO.FEaiCockpitProjectContentSnapshot_setDatas;
   // @method
   o.dispose        = MO.FEaiCockpitProjectContentSnapshot_dispose;
   //..........................................................
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectContentSnapshot_onPaintBegin = function FEaiCockpitProjectContentSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o, event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   graphic.drawImage(o._escImage, left + 421, top + 24);
   graphic.drawImage(o._lineImage, left + 26, top + 269);
   if (o._data != null) {
      graphic.setFont('bold 26px Microsoft YaHei');
      graphic.drawText(o._data.name(), left + 22, top + 50, "rgb(255,231,34)");
      graphic.setFont('24px Microsoft YaHei');
      graphic.drawText("责任人：" + o._data.uname(), left + 22, top + 100, "rgb(255,255,255)");
      graphic.setFont('20px Microsoft YaHei');
      graphic.drawText("优先级", left + 255, top + 100, "rgb(255,255,255)");
      //优先级图片
      graphic.drawImage(o._data.priority() > 0 ? o._level : o._level2, left + 325, top + 86);
      graphic.drawImage(o._data.priority() > 1 ? o._level : o._level2, left + 352, top + 86);
      graphic.drawImage(o._data.priority() > 2 ? o._level : o._level2, left + 379, top + 86);
      graphic.drawImage(o._data.priority() > 3 ? o._level : o._level2, left + 406, top + 86);
      graphic.drawImage(o._data.priority() > 4 ? o._level : o._level2, left + 433, top + 86);
      graphic.setFont('24px Microsoft YaHei');
      graphic.drawText("时间进度", left + 22, top + 160, "rgb(255,255,255)");
      graphic.drawText("项目进度", left + 22, top + 234, "rgb(255,255,255)");
      graphic.drawImage(o._processbg, left + 123, top + 143);
      graphic.drawImage(o._processbg, left + 123, top + 218);
      graphic.drawImage(o._processtime, left + 123, top + 143, 320 * o._data.timeProgress(), 20);
      graphic.drawImage(o._process, left + 123, top + 218, 320 * o._data.proProgress(), 20);
      graphic.setFont('18px Microsoft YaHei');
      graphic.drawText(o._data.start(), left + 129, top + 160, "rgb(255,255,255)");
      graphic.drawText(o._data.end(), left + 333, top + 160, "rgb(255,255,255)");
      graphic.drawText(Math.floor(o._data.proProgress() * 100) + "％", left + 267, top + 234, "rgb(255,255,255)");
      graphic.setFont('14px Microsoft YaHei');
   }
}

//==========================================================
// <T>后绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectContentSnapshot_onPaintEnd = function FEaiCockpitProjectContentSnapshot_onPaintEnd(event){
   var o = this;
   o.__base.FEaiCockpitControl.onPaintEnd.call(o, event);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectContentSnapshot_construct = function FEaiCockpitProjectContentSnapshot_construct(){
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 设置属性
   o._cellLocation.set(0, 1, 0);
   o._cellSize.set(4, 3);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectContentSnapshot_setup = function FEaiCockpitProjectContentSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   o._escImage    = o.loadResourceImage('{eai.resource}/cockpit/project/esc.png');
   o._lineImage   = o.loadResourceImage('{eai.resource}/cockpit/project/line.png');
   o._process     = o.loadResourceImage('{eai.resource}/cockpit/project/process.png');
   o._processbg   = o.loadResourceImage('{eai.resource}/cockpit/project/processbg.png');
   o._processtime = o.loadResourceImage('{eai.resource}/cockpit/project/processtime.png');
   o._level       = o.loadResourceImage('{eai.resource}/cockpit/project/level.png');
   o._level2      = o.loadResourceImage('{eai.resource}/cockpit/project/level2.png');
   o._ok          = o.loadResourceImage('{eai.resource}/cockpit/project/ok.png');
   o._nook        = o.loadResourceImage('{eai.resource}/cockpit/project/nook.png');
   o._gridRank = MO.Class.create(MO.FGuiTable);
   var grid = o._gridRank;
   grid.setOptionClip(true);
   grid.setLocation(0, 223);
   grid.setSize(466, 120);
   grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   grid.setLeft(2);
   grid.setRight(2);
   grid.setHeadHeight(50);
   grid.setHeadBackColor('rgba(0,0,0,0)');
   grid.headFont().font = 'Microsoft YaHei';
   grid.headFont().size = 14;
   grid.headFont().color = '#FFFFFF';
   grid.setRowHeight(37);
   grid.rowFont().font = 'Microsoft YaHei';
   grid.rowFont().size = 14;
   grid.rowFont().color = '#FFFFFF';
   var column = MO.Class.create(MO.FGuiGridColumnText);
   column.setName('stringData');
   column.setLabel(""); 
   column.setDataName('string_data');
   column.setWidth(50);
   column.setPadding(1, 1, 1, 1);
   grid.pushColumn(column);
   o.push(grid);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectContentSnapshot_processLogic = function FEaiCockpitProjectContentSnapshot_processLogic(){
   var o = this;
   o.__base.FEaiCockpitControl.processLogic.call(o);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectContentSnapshot_setDatas = function FEaiCockpitProjectContentSnapshot_setDatas(data) {
   var o = this;
   o._data = data;
   for (var i = 0; i < o._data.marquees().count() ; i++) {
      var grid = o._gridRank;
      var row = grid.allocRow();
      row.set('string_data', o._data.marquees().at(i).marquee());
      grid.insertRow(row);
   }
   o.dirty();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitProjectContentSnapshot_dispose = function FEaiCockpitProjectContentSnapshot_dispose(){
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
