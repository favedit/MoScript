//==========================================================
// <T>号令用户。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitNoticeUserSnapshot = function FEaiCockpitNoticeUserSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   o._userInfoImage        = null;
   o._fontTop              = null;
   o._userInfoDate         = null;
   // @attribute  
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCockpitNoticeUserSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitNoticeUserSnapshot_onPaintBegin;
   o.onUserFetch           = MO.FEaiCockpitNoticeUserSnapshot_onUserFetch;
   
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitNoticeUserSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitNoticeUserSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitNoticeUserSnapshot_processLogic;
   // @method

   o.dispose               = MO.FEaiCockpitNoticeUserSnapshot_dispose;
   return o;
}
//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeUserSnapshot_onImageLoad = function FEaiCockpitNoticeUserSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeUserSnapshot_onPaintBegin = function FEaiCockpitNoticeUserSnapshot_onPaintBegin(event) {
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var scale = 120 / 840;
   graphic.drawImage(o._userInfoImage, left, 0, width, height);
   if (o._data != null && o._data.publishDate() != null) {
      o._userInfoDate.parse(o._data.publishDate());
      graphic.setFont('21px Microsoft YaHei');
      graphic.drawText("姓名：", left + 89, top + 33, "#ffffff");
      graphic.drawText(o._data.label(), left + 153, top + 33, "#ffe721");
      graphic.drawText("发布号令：" + o._data.total() + "条", left + 498, top + 33, "#ffffff");
      graphic.drawText("职位：" + o._data.positionLabel(), left + 89, top + 66, "#ffffff");
      graphic.drawText("最新发布：" + o._userInfoDate.format("YYYY-MM-DD"), left + 498, top + 66, "#ffffff");
      graphic.drawText("下属人数：" + o._data.userCount() + "人", left + 89, top + 99, "#ffffff");
      graphic.drawText("阅读进度：" + o._data.readprocess() + "%", left + 498, top + 99, "#ffffff");
   }
   
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeUserSnapshot_construct = function FEaiCockpitNoticeUserSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 1, 0);
   o._cellSize.set(7, 1);
   o._dataTicker = new MO.TTicker(1000 * 60);
   o._data = MO.Class.create(MO.FEaiCockpitNoticeUserData);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeUserSnapshot_setup = function FEaiCockpitNoticeUserSnapshot_setup(){
   var o = this;
   o._userInfoImage = o.loadResourceImage('{eai.resource}/cockpit/notice/user_bg.png');
   o._userInfoDate = new MO.TDate();
}

//==========================================================
// <T>获取实时数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeUserSnapshot_onUserFetch = function FEaiCockpitNoticeUserSnapshot_onUserFetch(event) {
   var o = this;
   var content = event.content;
   //读取数据
   var data = o._data;
   data.unserializeSignBuffer(event.sign, event.content, true);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeUserSnapshot_processLogic = function FEaiCockpitNoticeUserSnapshot_processLogic(){
   var o = this;
   if (o._dataTicker.process()) {
      var title = MO.Console.find(MO.FEaiLogicConsole).cockpit().notice();
      title.doFetchUserInfo(o, o.onUserFetch);
   }
   o.dirty();
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeUserSnapshot_dispose = function FEaiCockpitNoticeUserSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
