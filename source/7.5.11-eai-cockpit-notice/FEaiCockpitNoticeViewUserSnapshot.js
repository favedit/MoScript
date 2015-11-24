//==========================================================
// <T>号令用户。</T>
//
// @class
// @author maocy
// @history 151108
//==========================================================
MO.FEaiCockpitNoticeViewUserSnapshot = function FEaiCockpitNoticeViewUserSnapshot(o) {
   o = MO.Class.inherits(this, o, MO.FEaiCockpitControl);
   //..........................................................
   // @attribute
   o._data                 = null;
   o._dataTicker           = null;
   // @attribute
   o._userInfoImage        = null;
   o._fontTop              = null;
   // @attribute  
   //..........................................................
   // @event
   o.onImageLoad           = MO.FEaiCockpitNoticeViewUserSnapshot_onImageLoad;
   o.onPaintBegin          = MO.FEaiCockpitNoticeViewUserSnapshot_onPaintBegin;
   
   //..........................................................
   // @method
   o.construct             = MO.FEaiCockpitNoticeViewUserSnapshot_construct;
   // @method
   o.setup                 = MO.FEaiCockpitNoticeViewUserSnapshot_setup;
   o.processLogic          = MO.FEaiCockpitNoticeViewUserSnapshot_processLogic;
   // @method

   o.dispose               = MO.FEaiCockpitNoticeViewUserSnapshot_dispose;
   return o;
}
//==========================================================
// <T>图片加载完成处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeViewUserSnapshot_onImageLoad = function FEaiCockpitNoticeViewUserSnapshot_onImageLoad() {
   this.dirty();
}

//==========================================================
// <T>前绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeViewUserSnapshot_onPaintBegin = function FEaiCockpitNoticeViewUserSnapshot_onPaintBegin(event) {
   var o = this;
   var graphic = event.graphic;
   var rectangle = event.rectangle;
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;
   var posY = 200;
   graphic.drawImage(o._userInfoImage, left-20,posY,width*0.45,width*0.45*scale);
   var fontTop = o._fontTop;
   graphic.setFont(fontTop.toString());
   graphic.drawText("姓名:", left+80, posY+40, fontTop.color);
   graphic.drawText("职位:", left+80, posY+80, fontTop.color);
   graphic.drawText("下属人数:", left+80, posY+120, fontTop.color);
   graphic.drawText("发布号令:", left+80+width*0.2, posY+40, fontTop.color);
   graphic.drawText("最新发布:", left+80+width*0.2, posY+80, fontTop.color);
   graphic.drawText("阅读进度:", left+80+width*0.2, posY+120, fontTop.color);
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeViewUserSnapshot_construct = function FEaiCockpitNoticeViewUserSnapshot_construct() {
   var o = this;
   o.__base.FEaiCockpitControl.construct.call(o);
   // 创建属性
   o._cellLocation.set(0, 0, 0);
   o._cellSize.set(16, 9);
   o._fontTop= new MO.SUiFont();
}

//==========================================================
// <T>初始化处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeViewUserSnapshot_setup = function FEaiCockpitNoticeViewUserSnapshot_setup(){
   var o = this;
   var imageConsole = MO.Console.find(MO.FImageConsole);
   var image = o._userInfoImage = imageConsole.load('{eai,resource}/cockpit/notice/user_bg.png');
   image.addLoadListener(o, o.onImageLoad);
   o._fontTop.parse('#FFFFFF 25px Microsoft YaHei');
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeViewUserSnapshot_processLogic = function FEaiCockpitNoticeViewUserSnapshot_processLogic(){
   var o = this;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitNoticeViewUserSnapshot_dispose = function FEaiCockpitNoticeViewUserSnapshot_dispose() {
   var o = this;
   // 父处理
   o.__base.FEaiCockpitControl.dispose.call(o);
}
