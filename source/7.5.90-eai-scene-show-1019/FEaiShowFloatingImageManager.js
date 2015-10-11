//==========================================================
// <T>预设聚焦参数管理器。</T>
//
// @class
// @author sunpeng
// @version 150929
//==========================================================
MO.FEaiShowFloatingImageManager = function FEaiShowFloatingImageManager(o) {
   o = MO.Class.inherits(this, o, MO.FObject);
   //..........................................................
   // @attribute
   o._floatingImages = MO.Class.register(o, new MO.AGetSet('_floatingImages'));
   //..........................................................
   // @method
   o.process = MO.FEaiShowFloatingImageManager_process;
   //..........................................................
   // @method
   o.construct = MO.FEaiShowFloatingImageManager_construct;
   o.setup = MO.FEaiShowFloatingImageManager_setup;
   o.dispose = MO.FEaiShowFloatingImageManager_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FEaiShowFloatingImageManager_construct = function FEaiShowFloatingImageManager_construct() {
   var o = this;
   o.__base.FObject.construct.call(o);
   // 设置属性
   o._floatingImages = new MO.TObjects();
}

//==========================================================
// <T>初始化。</T>
//
// @method
//==========================================================
MO.FEaiShowFloatingImageManager_setup = function FEaiShowFloatingImageManager_setup() {
   var o = this;

   var floatingImages = o._floatingImages;
   // 蚌埠
   var fiData = new MO.SShowFloatingImageData();
   fiData.name = 'beijing';
   fiData.displayImageUrl = '{eai.resource}/show1019/img1.png';
   fiData.longitude = 32.54;
   fiData.latitude = 117.23;
   fiData.startX = 0;
   fiData.startY = 100;
   fiData.endX = 1980;
   fiData.endY = 100;

   var frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(423);
   frame.setHeight(352);
   frame.setup(fiData);
   frame.build();
   frame.setVisible(false);
   floatingImages.push(frame);
   // 北京
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'beijing';
   fiData.displayImageUrl = '{eai.resource}/show1019/img1.png';
   fiData.longitude = 39.54;
   fiData.latitude = 116.24;
   fiData.startX = 0;
   fiData.startY = 200;
   fiData.endX = 1980;
   fiData.endY = 200;

   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(423);
   frame.setHeight(352);
   frame.setup(fiData);
   frame.build();
   frame.setVisible(false);
   floatingImages.push(frame);
   // 东南亚
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'beijing';
   fiData.displayImageUrl = '{eai.resource}/show1019/img1.png';
   fiData.longitude = 21.31;
   fiData.latitude = 96.6;
   fiData.startX = 0;
   fiData.startY = 300;
   fiData.endX = 1980;
   fiData.endY = 300;

   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(423);
   frame.setHeight(352);
   frame.setup(fiData);
   frame.build();
   frame.setVisible(false);
   floatingImages.push(frame);
   // 合肥
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'beijing';
   fiData.displayImageUrl = '{eai.resource}/show1019/img1.png';
   fiData.longitude = 31.49;
   fiData.latitude = 117.13;
   fiData.startX = 0;
   fiData.startY = 400;
   fiData.endX = 1980;
   fiData.endY = 400;

   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(423);
   frame.setHeight(352);
   frame.setup(fiData);
   frame.build();
   frame.setVisible(false);
   floatingImages.push(frame);
   // 兰州
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'beijing';
   fiData.displayImageUrl = '{eai.resource}/show1019/img1.png';
   fiData.longitude = 36.3;
   fiData.latitude = 103.50;
   fiData.startX = 0;
   fiData.startY = 500;
   fiData.endX = 1980;
   fiData.endY = 500;

   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(423);
   frame.setHeight(352);
   frame.setup(fiData);
   frame.build();
   frame.setVisible(false);
   floatingImages.push(frame);
   // 纽约
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'beijing';
   fiData.displayImageUrl = '{eai.resource}/show1019/img1.png';
   fiData.longitude = 40.42;
   fiData.latitude = -74.0;
   fiData.startX = 0;
   fiData.startY = 600;
   fiData.endX = 1980;
   fiData.endY = 600;

   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(423);
   frame.setHeight(352);
   frame.setup(fiData);
   frame.build();
   frame.setVisible(false);
   floatingImages.push(frame);
   // 上海
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'beijing';
   fiData.displayImageUrl = '{eai.resource}/show1019/img1.png';
   fiData.longitude = 31.13;
   fiData.latitude = 121.28;
   fiData.startX = 0;
   fiData.startY = 700;
   fiData.endX = 1980;
   fiData.endY = 700;

   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(423);
   frame.setHeight(352);
   frame.setup(fiData);
   frame.build();
   frame.setVisible(false);
   floatingImages.push(frame);
   // 香港
   fiData = new MO.SShowFloatingImageData();
   fiData.name = 'beijing';
   fiData.displayImageUrl = '{eai.resource}/show1019/img1.png';
   fiData.longitude = 22.23;
   fiData.latitude = 114.6;
   fiData.startX = 0;
   fiData.startY = 800;
   fiData.endX = 1980;
   fiData.endY = 800;

   frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(423);
   frame.setHeight(352);
   frame.setup(fiData);
   frame.build();
   frame.setVisible(false);
   floatingImages.push(frame);

}

//==========================================================
// <T>每帧处理。</T>
//
// @method
//==========================================================
MO.FEaiShowFloatingImageManager_process = function FEaiShowFloatingImageManager_process(radianY) {
   var o = this;
   var floatingImages = o._floatingImages;
   var count = floatingImages.count();
   for (var i = 0; i < count; i++) {
      var fi = floatingImages.at(i);
      fi.floatingAnime(radianY);
   }
}

//============================================================
// <T>释放处理。</T>
//
// @method
//============================================================
MO.FEaiShowFloatingImageManager_dispose = function FEaiShowFloatingImageManager_dispose() {
   var o = this;
   o._floatingImages = MO.Lang.Object.dispose(o._floatingImages);
}
