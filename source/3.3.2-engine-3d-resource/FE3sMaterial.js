//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FE3sMaterial(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute
   o._info        = null;
   // @attribute 高度
   //o._heightDepth        = null;
   // @attribute 表面
   //o._surfaceRate        = null;
   //o._surfaceReflect     = null;
   //o._surfaceBright      = null;
   //o._surfaceBrightLevel = null;
   //o._surfaceCoarse      = null;
   //o._surfaceCoarseLevel = null;
   //o._surfaceMerge       = null;
   //o._surfacePower       = null;
   // @attribute
   o._bitmaps     = null;
   o._bitmapPacks = null;
   //..........................................................
   // @method
   o.construct    = FE3sMaterial_construct;
   // @method
   o.effectCode   = FE3sMaterial_effectCode;
   o.info         = FE3sMaterial_info;
   o.bitmaps      = FE3sMaterial_bitmaps;
   o.bitmapPacks  = FE3sMaterial_bitmapPacks;
   // @method
   o.unserialize  = FE3sMaterial_unserialize;
   o.saveConfig   = FE3sMaterial_saveConfig;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sMaterial_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._info = new SE3sMaterialInfo();
}

//==========================================================
// <T>获得效果名称。</T>
//
// @method
// @return String 效果名称
//==========================================================
function FE3sMaterial_effectCode(){
   return this._info.effectCode;
}

//==========================================================
// <T>获得材质信息。</T>
//
// @method
// @return SG3dMaterialInfo 材质信息
//==========================================================
function FE3sMaterial_info(){
   return this._info;
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TObjects 纹理集合
//==========================================================
function FE3sMaterial_bitmaps(){
   return this._bitmaps;
}

//==========================================================
// <T>获得纹理打包集合。</T>
//
// @method
// @return TObjects 纹理打包集合
//==========================================================
function FE3sMaterial_bitmapPacks(){
   return this._bitmapPacks;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
function FE3sMaterial_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   // 读取信息
   o._info.unserialize(input);
   // 读取纹理打包集合
   var packCount = input.readInt16();
   if(packCount > 0){
      var bitmapPacks = o._bitmapPacks = new TDictionary();
      for(var i = 0; i < packCount; i++){
         var bitmapPack = RClass.create(FE3sMaterialBitmapPack);
         bitmapPack.unserialize(input);
         bitmapPacks.set(bitmapPack.guid(), bitmapPack);
      }
   }
   // 读取纹理集合
   var bitmapCount = input.readInt16();
   if(bitmapCount > 0){
      var bitmaps = o._bitmaps = new TObjects();
      for(var i = 0; i < bitmapCount; i++){
         var bitmap = RClass.create(FE3sMaterialBitmap);
         bitmap.unserialize(input);
         bitmaps.push(bitmap);
         // 设置纹理打包
         var pack = bitmapPacks.get(bitmap.bitmapPackGuid());
         bitmap.setBitmapPack(pack);
      }
   }
}

//==========================================================
// <T>保存数据信息到配置节点。</T>
//
// @method
// @param p:config:TXmlNode 配置节点
//==========================================================
function FE3sMaterial_saveConfig(p){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, p);
   // 存储材质
   o._info.saveConfig(p);
}
