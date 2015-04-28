//==========================================================
// <T>资源材质管理器。</T>
//
// @console
// @author maocy
// @history 150130
//==========================================================
function FE3sMaterialConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._resources  = null;
   o._materials  = null;
   //..........................................................
   // @method
   o.construct   = FE3sMaterialConsole_construct;
   // @method
   o.find        = FE3sMaterialConsole_find;
   // @method
   o.unserialize = FE3sMaterialConsole_unserialize;
   o.loadByGuid  = FE3sMaterialConsole_loadByGuid;
   // @method
   o.dispose     = FE3sMaterialConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sMaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._resources = new TDictionary();
   o._materials = new TDictionary();
}

//==========================================================
// <T>根据名称查找材质。</T>
//
// @param p:name:String 名称
// @return FE3sMaterial 材质
//==========================================================
function FE3sMaterialConsole_find(p){
   return this._materials.get(p);
}

//==========================================================
// <T>反序列化一个材质。</T>
//
// @method
// @param input:FByteStream 输入流
// @return FE3sMaterial 材质
//==========================================================
function FE3sMaterialConsole_unserialize(input){
   var o = this;
   // 创建材质组
   var material = RClass.create(FE3sMaterial);
   material.unserialize(input);
   // 存储材质组
   var materialGuid = material.guid();
   if(o._materials.contains(materialGuid)){
      throw new TError(o, 'Material is already exists.');
   }
   o._materials.set(materialGuid, material);
   return material;
}


//==========================================================
// <T>加载指定代码的模型资源。</T>
//
// @param guid:String 唯一编号
// @return 处理结果
//==========================================================
function FE3sMaterialConsole_loadByGuid(guid){
   var o = this;
   var resources = o._resources;
   // 查找材质
   var resource = resources.get(guid);
   if(resource){
      return resource;
   }
   // 生成地址
   var vendor = RConsole.find(FE3sVendorConsole).find('material');
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   // 创建材质资源
   resource = RClass.create(FE3sMaterialResource);
   resource.setGuid(guid);
   resource.setVendor(vendor);
   resource.setSourceUrl(url);
   RConsole.find(FResourceConsole).load(resource);
   // 存储材质资源
   resources.set(guid, resource);
   return resource;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FE3sMaterialConsole_dispose(){
   var o = this;
   o._resources = RObject.free(o._resources);
   o._materials = RObject.free(o._materials);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
