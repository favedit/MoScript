//==========================================================
// <T>号令视图页面。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitNoticeView = function FEaiCockpitNoticeView(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControlView);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   // o._backgroundImage      = null;
   // o._logoImage            = null;
   // o._topBar               = null;
   // o._userInfoView         = MO.Class.register(o, new MO.AGetter('_userInfo'));
   // o._newOrderImage        = null;
   // o._orderListImage       = null;
   // o._pbarBgImage          = null;
   // o._pbarFillImage        = null;
   o._fontTop              = null;
   o._noticeDynamicInfo    = MO.Class.register(o, new MO.AGetter('_noticeDynamicInfo'));
   // @attribute
   o._listenersDataChanged = MO.Class.register(o, new MO.AListener('_listenersDataChanged', MO.EEvent.DataChanged));
   o._mainLineWidth        = MO.Class.register(o, new MO.AGetSet('_mainLineWidth'), 5);
   
   //..........................................................
   // @event
   o.textFun               = MO.FEaiCockpitNoticeView_textFun;
   o.onImageLoad           = MO.FEaiCockpitNoticeView_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitNoticeView_onPaintBegin;
   
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitNoticeView_construct;
   // @method
   o.setup                 = MO.FEaiCockpitNoticeView_setup;
   o.draw                  = MO.FEaiCockpitNoticeView_draw;
   o.processLogic          = MO.FEaiCockpitNoticeView_processLogic;
   // @method

   o.dispose               = MO.FEaiCockpitNoticeView_dispose;
   return o;
}
MO.FEaiCockpitNoticeView_textFun = function FEaiCockpitNoticeView_textFun(event) {
   var o = this;
   // var content = event.content;
   // var dynamicInfo = o._noticeDynamicInfo;
   // dynamicInfo.unserializeSignBuffer(event.sign, event.content, true);
   // var userInfoView = o._userInfoView;

   // var subordinateCount1 = dynamicInfo.userName();
   // var subordinateCount2 = dynamicInfo.naticeTotal();
   // var subordinateCount3 = dynamicInfo.userPosition();
   // var subordinateCount4 = dynamicInfo.releaseData();
   // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
   // console.log(subordinateCount1);
   // console.log(subordinateCount2);
   // console.log(subordinateCount3);
   // console.log(subordinateCount4);
   // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}
//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeView_onImageLoad = function FEaiCockpitNoticeView_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeView_onPaintBegin = function FEaiCockpitNoticeView_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControlView.onPaintBegin.call(o, event);
   // 获得变量
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var right = left + width;
   var bottom = top + height;
   //..........................................................
   // 绘制背景
   // graphic.drawRectangleImage(o._backgroundImage, rectangle);
   return;
   //图片比例
   var scale = 69 / 243 ; 
   //图片Y坐标
   var posY = top+20;
   graphic.drawImage(o._logoImage, left+120,posY,width*0.15,width*0.15*scale);
   posY = posY+width*0.15*scale+20;
   graphic.drawLine(0,posY,width,top+width*0.15*scale+40 ,'#ff0000', o._mainLineWidth);
   var scale = 56 / 758 ;
   graphic.drawImage(o._topBar, width / 16*5,top+20,width / 8*3,width / 8*3*scale);
   var fontTop = o._fontTop;
   var drawText = ['项目','号令','业绩','仪表','预警','预言'];
   for (var i = 0; i < drawText.length; i++) {
      graphic.setFont(fontTop.toString());
      graphic.drawText(drawText[i], width / 16*(5+i)+35, top+45+width / 8*3*scale, fontTop.color);
   };
   // posY = posY+width*0.45*scale+4;
   // var scale = 380 / 960;
   // graphic.drawImage(o._newOrderImage, 0,posY,width*0.45,width*0.45*scale);
   // posY = posY+width*0.45*scale+4;
   // var scale = 510 / 960;   
   // graphic.drawImage(o._orderListImage, 0,posY,width*0.45,width*0.45*scale);
   //map
   // graphic.drawImage(o._orderListImage, left+width*0.5-50,top+40+width*0.07,width*0.53,height*0.55);
   // //order dynamic
   // graphic.drawImage(o._orderListImage, left+width*0.5-50,top+50+width*0.37,width*0.26,height*0.25);
   // //reading
   // graphic.drawImage(o._orderListImage, left+width*0.77-50,top+50+width*0.37,width*0.37,height*0.25);

   // graphic.drawImage(o._pbarBgImage, 300, 300, 244, 21);

   // var clipWidth = 244 *0.1;
   // var clipHeight = 21;
   // graphic._handle.save();
   // graphic._handle.rect(300, 300, clipWidth, 21)
   // graphic._handle.clip();
   // graphic.drawImage(o._pbarFillImage, 300, 300, 244, 21);
   // graphic._handle.restore();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeView_construct = function FEaiCockpitNoticeView_construct() {
   var o = this;
   o.__base.FEaiCockpitControlView.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 9);
   //o._noticeDynamicInfo = MO.Class.create(MO.FEaiLogicInfoNoticeValue);
   o._fontTop= new MO.SUiFont();
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeView_setup = function FEaiCockpitNoticeView_setup(){
   var o = this;
   o.__base.FEaiCockpitControlView.setup.call(o);
      // 创建图片
   var imageConsole = MO.Console.find(MO.FImageConsole);
   // var image = o._backgroundImage = imageConsole.load('{eai.resource}/cockpit/notice/view.png');
   // image.addLoadListener(o, o.onImageLoad);
   //
   var image = o._logoImage = imageConsole.load('{eai,resource}/cockpit/notice/logo.png');
   image.addLoadListener(o, o.onImageLoad);
   var image = o._topBar = imageConsole.load('{eai,resource}/cockpit/notice/top_bar.png');
   image.addLoadListener(o, o.onImageLoad);
   o._fontTop.parse('#FFFFFF 25px Microsoft YaHei');

   // var image = o._userInfoImage = imageConsole.load('{eai,resource}/cockpit/notice/user_bg.png');
   // image.addLoadListener(o, o.onImageLoad);
   // //
   // var image = o._newOrderImage = imageConsole.load('{eai,resource}/cockpit/notice/new_notice_bg.png');
   // image.addLoadListener(o, o.onImageLoad);
   // //
   // var image = o._orderListImage = imageConsole.load('{eai,resource}/cockpit/notice/notice_list_bg.png');
   // image.addLoadListener(o, o.onImageLoad);

   // var pbarBgImage = o._pbarBgImage = imageConsole.load('{eai.resource}/cockpit/notice/progress_bar_bg.png');
   // pbarBgImage.addLoadListener(o, o.onImageLoad);
   // var pbarFillImage = o._pbarFillImage = imageConsole.load('{eai.resource}/cockpit/notice/progress_bar_fill.png');
   // pbarFillImage.addLoadListener(o, o.onImageLoad);
   // var grid = o._gridRank = MO.Class.create(MO.FGuiGridControl);
   // grid.setOptionClip(false);
   // // grid.setDisplayHead(false);
   // grid.setLocation(20, 510);
   // grid.setSize(800, 700);
   // grid.setAnchorCd(MO.EUiAnchor.Left | MO.EUiAnchor.Right);
   // grid.setLeft(40);
   // grid.setRight(1040);
   // grid.setHeadHeight(40);
   // // grid.setHeadBackColor('#122A46');
   // grid.headFont().font = 'Microsoft YaHei';
   // grid.headFont().size = 22;
   // grid.headFont().color = '#00B2F2';
   // grid.setRowHeight(40);
   // grid.rowFont().font = 'Microsoft YaHei';
   // grid.rowFont().size = 22;
   // grid.rowFont().color = '#59FDE9';
   // var column = MO.Class.create(MO.FGuiGridColumnText);
   // column.setName('titleData');
   // column.setLabel('标题');
   // column.setDataName('title_data');
   // column.setWidth(150);
   // column.setPadding(1, 1, 1, 1);
   // grid.pushColumn(column);
   // var column = MO.Class.create(MO.FGuiGridColumnText);
   // column.setName('issuserData');
   // column.setLabel('发布人');
   // column.setDataName('issuser_data');
   // column.setWidth(50);
   // column.setPadding(1, 1, 1, 1);
   // grid.pushColumn(column);
   // var column = MO.Class.create(MO.FGuiGridColumnDate);
   // column.setName('recordDate');
   // column.setLabel('时间');
   // column.setDataName('record_date');
   // column.setDateFormat('yyyy:mm:dd');
   // column.setWidth(75);
   // column.setPadding(1, 1, 1, 1);
   // grid.pushColumn(column);
   // var column = MO.Class.create(MO.FGuiGridColumnText);
   // column.setName('prograssData');
   // column.setLabel('查看进度');
   // column.setDataName('prograss_data');
   // column.setWidth(100);
   // column.setPadding(1, 1, 1, 1);
   // grid.pushColumn(column);
   // o.push(grid);
   // for (var i = 0; i < 10; i++) {
   //    var grid = o._gridRank;
   //    var row = grid.allocRow();
   //    var maxLength = 10;
   //    var title = '关于规范集团知识产权管理的通知';
   //    if (title.length > 10 ){
   //      title = title.substring(0,10)+'...'; 
   //    };
   //    row.set('title_data', title);
   //    row.set('issuser_data', '丁甸');
   //    row.set('record_date', '20151117171638');
   //    row.set('prograss_data', '30%');
   //    grid.pushRow(row);
   // };
   // var statistics = MO.Console.find(MO.FEaiLogicConsole).notice();
   //取数据
   // statistics.notice().doInfo(o, o.textFun);
}
//==========================================================
// <T>绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeView_draw = function FEaiCockpitNoticeView_draw(graphic, rectangle, rate) {
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeView_processLogic = function FEaiCockpitNoticeView_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeView_dispose = function FEaiCockpitNoticeView_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControlView.dispose.call(o);
}
