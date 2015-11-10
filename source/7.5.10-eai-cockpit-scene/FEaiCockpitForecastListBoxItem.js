//==========================================================
// <T>里程碑实体类。</T>
//
// @class
// @author sunpeng
// @history 151626
//==========================================================
MO.FEaiCockpitForecastListBoxItem = function FEaiCockpitForecastListBoxItem(o) {
   o = MO.Class.inherits(this, o, MO.FGuiListBoxItem);
   //..........................................................
   // @attribute
   o._data        = null;
   // @attribute
   o._isSelected  = MO.Class.register(o, new MO.AGetSet('_isSelected'), false);
   // @attribute
   o._font1stRowW = null;
   o._font1stRowY = null;
   o._font2ndRowW = null;
   o._font2ndRowY = null;
   //..........................................................
   // @method
   o.construct    = MO.FEaiCockpitForecastListBoxItem_construct;
   // @method
   o.setup        = MO.FEaiCockpitForecastListBoxItem_setup;
   o.draw         = MO.FEaiCockpitForecastListBoxItem_draw;
   // @method
   o.dispose      = MO.FEaiCockpitForecastListBoxItem_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastListBoxItem_construct = function FEaiCockpitForecastListBoxItem_construct() {
   var o = this;
   o.__base.FGuiListBoxItem.construct.call(o);
   // 设置变量
   o._font1stRowW = new MO.SUiFont();
   o._font1stRowY = new MO.SUiFont();
   o._font2ndRowW = new MO.SUiFont();
   o._font2ndRowY = new MO.SUiFont();
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastListBoxItem_setup = function FEaiCockpitForecastListBoxItem_setup(data){
   var o = this;
   o._data = data;
   o._font1stRowW.parse('bold #FFFFFF 20px Microsoft YaHei');
   o._font1stRowY.parse('bold #FFEC3B 20px Microsoft YaHei');
   o._font2ndRowW.parse('bold #FFFFFF 18px Microsoft YaHei');
   o._font2ndRowY.parse('bold #FFEC3B 18px Microsoft YaHei');
   //var imageConsole = MO.Console.find(MO.FImageConsole);
   //var bgImageNormal = o._bgImageNormal = imageConsole.load('{eai.resource}/cockpit/notice/item_bg_normal.png');
   //bgImageNormal.addLoadListener(o, o.onImageLoad);
}

//==========================================================
// <T>绘制处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastListBoxItem_draw = function FEaiCockpitForecastListBoxItem_draw(graphic, rectangle){
   var o = this;
   var data = o._data;
   var dataLabel = data.label();
   var left = rectangle.left;
   var top = rectangle.top;
   var width = rectangle.width;
   var height = rectangle.height;

   // graphic.drawRectangle(left, top, width, height, 'red', 1);
   var drawX = left + 26;
   var drawY = top + 34;
   // 绘制背景
   //if (o._isSelected) {
      //graphic.drawImage(o._bgImageSelected, left, top, 889, 88);
   //}else{
      //graphic.drawImage(o._bgImageNormal, left, top, 889, 88);
   //}
   var font1stRowW = o._font1stRowW;
   var font1stRowY = o._font1stRowY;
   //var font2ndRowW = o._font2ndRowW;
   //var font2ndRowY = o._font2ndRowY;
   //var noticeUnit = o._data;
   // 绘制第一行
   var drawText = '● ';
   var textWidth = 0;
   graphic.setFont(font1stRowW.toString());
   graphic.drawText(drawText, drawX, drawY, font1stRowW.color);
   textWidth = graphic.textWidth(drawText);
   drawX += textWidth;
   graphic.setFont(font1stRowY.toString());
   graphic.drawText(dataLabel, drawX, drawY, font1stRowY.color);
   drawX = 580;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FEaiCockpitForecastListBoxItem_dispose = function FEaiCockpitForecastListBoxItem_dispose(){
   var o = this;
   o._bgImageNormal = MO.Lang.Object.dispose(o._bgImageNormal);
   o._bgImageSelected = MO.Lang.Object.dispose(o._bgImageSelected);
   o._pbarBgImage = MO.Lang.Object.dispose(o._pbarBgImage);
   // 父处理
   o.__base.FGuiControl.dispose.call(o);
}
