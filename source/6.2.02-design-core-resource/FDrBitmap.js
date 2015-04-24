//==========================================================
// <T>设计位图资源。</T>
//
// @class
// @author maocy
// @version 150424
//==========================================================
function FDrBitmap(o){
   o = RClass.inherits(this, o, FDrResource);
   //..........................................................
   // @attribute
   o._classCode    = 'Bitmap';
   // @attribute
   o._sizeWidth    = 0;
   o._sizeHeight   = 0;
   //..........................................................
   // @method
   o.sizeWidth     = FDrBitmap_sizeWidth;
   o.setSizeWidth  = FDrBitmap_setSizeWidth;
   o.sizeHeight    = FDrBitmap_sizeHeight;
   o.setSizeHeight = FDrBitmap_setSizeHeight;
   // @method
   o.loadConfig    = FDrBitmap_loadConfig;
   o.saveConfig    = FDrBitmap_saveConfig;
   return o;
}

//==========================================================
// <T>获得尺寸宽度。</T>
//
// @return Integer 尺寸宽度
//==========================================================
function FDrBitmap_sizeWidth(){
   return this._sizeWidth;
}

//==========================================================
// <T>设置尺寸宽度。</T>
//
// @param width:Integer 尺寸宽度
//==========================================================
function FDrBitmap_setSizeWidth(width){
   this._sizeWidth = width;
}

//==========================================================
// <T>获得尺寸高度。</T>
//
// @return Integer 尺寸高度
//==========================================================
function FDrBitmap_sizeHeight(){
   return this._sizeHeight;
}

//==========================================================
// <T>设置尺寸高度。</T>
//
// @param height:Integer 尺寸高度
//==========================================================
function FDrBitmap_setSizeHeight(height){
   this._sizeHeight = height;
}

//==========================================================
// <T>加载配置信息。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
function FDrBitmap_loadConfig(xconfig){
   var o = this;
   o.__base.FDrResource.loadConfig.call(o, xconfig);
   // 加载属性
   o._sizeWidth = xconfig.getInteger('size_width');
   o._sizeHeight = xconfig.getInteger('size_height');
}

//==========================================================
// <T>存储配置信息。</T>
//
// @method
// @param xconfig:TXmlNode 配置节点
//==========================================================
function FDrBitmap_saveConfig(xconfig){
   var o = this;
   o.__base.FDrResource.saveConfig.call(o, xconfig);
   // 存储属性
   xconfig.set('size_width', o._sizeWidth);
   xconfig.set('size_height', o._sizeHeight);
}
