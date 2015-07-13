//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
MO.FE3sMaterial = function FE3sMaterial(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @attribute
   o._parentGuid  = MO.Class.register(o, new MO.AGetter('_parentGuid'));
   o._info        = MO.Class.register(o, new MO.AGetter('_info'));
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
   o._bitmaps     = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   o._bitmapPacks = MO.Class.register(o, new MO.AGetter('_bitmapPacks'));
   //..........................................................
   // @method
   o.construct    = MO.FE3sMaterial_construct;
   // @method
   o.effectCode   = MO.FE3sMaterial_effectCode;
   // @method
   o.unserialize  = MO.FE3sMaterial_unserialize;
   o.saveConfig   = MO.FE3sMaterial_saveConfig;
   o.clone        = MO.FE3sMaterial_clone;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sMaterial_construct = function FE3sMaterial_construct(){
   var o = this;
   o.__base.FE3sObject.construct.call(o);
   o._info = new MO.SE3sMaterialInfo();
}

//==========================================================
// <T>获得效果名称。</T>
//
// @method
// @return String 效果名称
//==========================================================
MO.FE3sMaterial_effectCode = function FE3sMaterial_effectCode(){
   return this._info.effectCode;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.FE3sMaterial_unserialize = function FE3sMaterial_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input);
   // 读取信息
   o._parentGuid = input.readString();
   o._info.unserialize(input);
   // 读取纹理打包集合
   var packCount = input.readInt16();
   if(packCount > 0){
      var bitmapPacks = o._bitmapPacks = new MO.TDictionary();
      for(var i = 0; i < packCount; i++){
         var bitmapPack = MO.Class.create(MO.FE3sMaterialBitmapPack);
         bitmapPack.unserialize(input);
         bitmapPacks.set(bitmapPack.guid(), bitmapPack);
      }
   }
   // 读取纹理集合
   var bitmapCount = input.readInt16();
   if(bitmapCount > 0){
      var bitmaps = o._bitmaps = new MO.TObjects();
      for(var i = 0; i < bitmapCount; i++){
         var bitmap = MO.Class.create(MO.FE3sMaterialBitmap);
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
// @param xconfig:TXmlNode 配置节点
//==========================================================
MO.FE3sMaterial_saveConfig = function FE3sMaterial_saveConfig(xconfig){
   var o = this;
   o.__base.FE3sObject.saveConfig.call(o, xconfig);
   // 存储材质
   xconfig.set('parent_guid', o._parentGuid);
   o._info.saveConfig(xconfig);
}

//==========================================================
// <T>克隆资源对象。</T>
//
// @method
// @param instance:FE3sObject 实例对象
// @return FE3sObject 资源对象
//==========================================================
MO.FE3sMaterial_clone = function FE3sMaterial_clone(instance){
   var o = this;
   var result = o.__base.FE3sObject.clone.call(o, instance);
   // 设置属性，不能克隆唯一编号
   // result._guid = null;
   result._parentGuid = o._parentGuid;
   result._info.assign(o._info);
   return result;
}
