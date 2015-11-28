//==========================================================
// <T>最新号令。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitNoticeNewestSnapshot = function FEaiCockpitNoticeNewestSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._backgroundUri        = '{eai.resource}/cockpit/notice/newest/new_notice_bg.png';
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   o._fontTitle            = null;
   o._fontMiddle           = null;
   o._title                = "";
   o._publisher            = null;
   o._noticeData           = null;
   o._readprogress         = null;
   o._noticeContent        = null;
   o._pbarBgImage          = null;
   o._pbarFillImage        = null;
   o._publishDate          = MO.Class.register(o, new MO.AGetter('_publishDate'));
   o._newestNotice         = MO.Class.register(o, new MO.AGetter('_newestNotice'));
   // @attribute  
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCockpitNoticeNewestSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitNoticeNewestSnapshot_onPaintBegin;
   
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitNoticeNewestSnapshot_construct;
   // @method
   o.renovateView          = MO.FEaiCockpitNoticeNewestSnapshot_renovateView;
   o.setup                 = MO.FEaiCockpitNoticeNewestSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitNoticeNewestSnapshot_processLogic;
   // @method
   o.dispose               = MO.FEaiCockpitNoticeNewestSnapshot_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeNewestSnapshot_onPaintBegin = function FEaiCockpitNoticeNewestSnapshot_onPaintBegin(event) {
   var o = this;
   o.__base.FEaiCockpitControl.onPaintBegin.call(o,event);
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   graphic.drawImage(o._publisherImage, left + 55,top + 20,180,40);
   var fontTitle = o._fontTitle;
   graphic.setFont(fontTitle.toString());
   var title = o._title;
   if (typeof (title) == "string" && title.length > 0){
      if (title.length > 13){
         title = title.substring(0,10) + '...';
      }
      var fontMiddle = o._fontMiddle;
      graphic.setFont(fontMiddle.toString());
      graphic.drawText(title, left + 300, top + 47, fontTitle.color);
      graphic.drawImage(o._newNoticeImage, left + 700,top + 20,48,50);
      graphic.drawText("发布人:" + o._publisher, left+55, top+100, fontMiddle.color);
      graphic.drawText("发布时间:" + o._publishDate.format('YYYY-MM-DD'), left + 250, top + 100, fontMiddle.color);
      graphic.drawText("阅读进度:", left + 500, top + 100, fontMiddle.color);
      graphic.drawImage(o._pbarBgImage, left + 600, top + 85, 199, 13);
      var clipWidth = 199 *o._readprogress;
      var clipHeight = 13;
      graphic._handle.save();
      graphic._handle.rect(left+600, top+85, clipWidth, 13)
      graphic._handle.clip();
      graphic.drawImage(o._pbarFillImage, left + 600, top + 85, 199, 13);
      graphic._handle.restore();
      graphic.setFont(fontTitle.toString());
      graphic.drawTextRectangle(o._noticeContent, left + 55, top + 160, 750, 200,27,fontTitle.color);
   } 
}

//==========================================================
// <T>刷新处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeNewestSnapshot_renovateView = function FEaiCockpitNoticeNewestSnapshot_renovateView(event) {
   var o = this;
   var content = event.content;
   var newestNotice = o._newestNotice;
   newestNotice.unserializeSignBuffer(event.sign, event.content, true);
   o._title = newestNotice.title();
   o._publisher = newestNotice.publisher();
   o._noticeData = newestNotice.noticeData();
   o._publishDate.parse(o._noticeData);
   o._readprogress = newestNotice.readprogress();
   o._noticeContent = newestNotice.noticeContent();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeNewestSnapshot_construct = function FEaiCockpitNoticeNewestSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._publishDate = new MO.TDate();
   o._fontTitle = new MO.SUiFont();
   o._fontMiddle = new MO.SUiFont();
   o._dataTicker = new MO.TTicker(1000 * 60 );
   o._newestNotice = MO.Class.create(MO.FEaiCockpitNoticeNewestData);
   o._cellLocation.set(0, 2, 0);
   o._cellSize.set(7, 3);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeNewestSnapshot_setup = function FEaiCockpitNoticeNewestSnapshot_setup(){
   var o = this;
   o.__base.FEaiCockpitControl.setup.call(o);
   o._publisherImage = o.loadResourceImage('{eai.resource}/cockpit/notice/newest/release_notice.png');
   o._newNoticeImage = o.loadResourceImage('{eai.resource}/cockpit/notice/newest/new.png');
   o._fontTitle.parse('#FFFFFF 25px Microsoft YaHei');
   o._fontMiddle.parse('#FFFFFF 20px Microsoft YaHei');
   var pbarBgImage = o._pbarBgImage = o.loadResourceImage('{eai.resource}/cockpit/notice/table/progress_bar_bg.png');
   var pbarFillImage = o._pbarFillImage = o.loadResourceImage('{eai.resource}/cockpit/notice/table/progress_bar_fill.png');
   var statistics = MO.Console.find(MO.FEaiLogicConsole).cockpit().notice();
   //取数据
   if(o._dataTicker.process()){
      statistics.doFetchNewest(o, o.renovateView);
   }
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeNewestSnapshot_processLogic = function FEaiCockpitNoticeNewestSnapshot_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeNewestSnapshot_dispose = function FEaiCockpitNoticeNewestSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
   o._dataTicker = MO.Lang.Object.dispose(o._dataTicker);
}
