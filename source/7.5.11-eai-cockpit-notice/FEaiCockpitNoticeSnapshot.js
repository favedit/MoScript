//==========================================================
// <T>号令表格。</T>
//
// @class
// @author sunpeng
// @history 151104
//==========================================================
MO.FEaiCockpitNoticeSnapshot = function FEaiCockpitNoticeSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._noticeData           = null;
   o._dataTicker           = null;
   o._noticeListBox        = null;
   o._bgImage              = null;
   //..........................................................
   // @event
   o.onPaintBegin          = MO.FEaiCockpitNoticeSnapshot_onPaintBegin;
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitNoticeSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitNoticeSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitNoticeSnapshot_processLogic;
   o.onNoticeFetch         = MO.FEaiCockpitNoticeSnapshot_onNoticeFetch;
   // @method
   o.dispose               = MO.FEaiCockpitNoticeSnapshot_dispose;
   return o;
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeSnapshot_onPaintBegin = function FEaiCockpitNoticeSnapshot_onPaintBegin(event) {
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
   graphic.drawImage(o._bgImage, left, top, width, height);
   //..........................................................
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeSnapshot_construct = function FEaiCockpitNoticeSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(3, 5, 0);
   o._cellSize.set(8, 2);
   o._noticeData = MO.Class.create(MO.FEaiCockpitDataNotice);
   o._dataTicker = new MO.TTicker(1000 * 60);
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeSnapshot_setup = function FEaiCockpitNoticeSnapshot_setup(){
   var o = this;
   // 加载背景图
   o._bgImage = o.loadResourceImage('{eai.resource}/cockpit/notice/ground.png');
   // 创建控件
   var listBox = o._noticeListBox = MO.Class.create(MO.FGuiListBox);
   listBox.setDisplayCount(4);
   listBox.setGap(5);
   listBox.setPadding(12, 12, 12, 12);
   listBox.setLocation(50, 0);
   listBox.setSize(900, 120 * 4);
   o.push(listBox);
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeSnapshot_processLogic = function FEaiCockpitNoticeSnapshot_processLogic() {
   var o = this;
   if (o._dataTicker.process()) {
      var notice = MO.Console.find(MO.FEaiLogicConsole).cockpit().notice();
      notice.doFetch(o, o.onNoticeFetch);
   }
   if (o._noticeListBox.animationPlaying()) {
      o.dirty();
   }
}

//==========================================================
// <T>获取业绩数据。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeSnapshot_onNoticeFetch = function FEaiCockpitNoticeSnapshot_onNoticeFetch(event) {
   var o = this;
   var content = event.content;
   // 读取数据
   var listBox = o._noticeListBox;
   var data = o._noticeData;
   if(data.unserializeSignBuffer(event.sign, event.content, true)){
      var notices = o._noticeData.notices();
      var count = notices.count();
      listBox.clear();
      for (var i = 0; i < count; i++) {
         var noticeItem = MO.Class.create(MO.FEaiCockpitNoticeListBoxItem);
         noticeItem.setup(notices.at(i));
         noticeItem.setSize(880, 80);
         listBox.push(noticeItem);
      }
      listBox.setStartTick(MO.Timer.current());
      listBox.setAnimationPlaying(true);
      o.dirty();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeSnapshot_dispose = function FEaiCockpitNoticeSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
