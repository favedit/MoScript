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

   var fiData = new MO.SShowFloatingImageData();
   fiData.name = 'beijing';
   fiData.displayImageUrl = '{eai.resource}/show1019/img1.png';
   fiData.longitude = 39.9;
   fiData.latitude = 116.3;
   fiData.startRotateY = 1.33;
   fiData.startX = 1980;
   fiData.startY = 0;
   fiData.endX = 0;
   fiData.endY = 0;

   var frame = MO.Class.create(MO.FGuiFloatingFrame);
   frame.setWidth(423);
   frame.setHeight(352);
   frame.setup(fiData);
   frame.build();
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
