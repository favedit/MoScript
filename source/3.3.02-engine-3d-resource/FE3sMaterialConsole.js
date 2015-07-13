//==========================================================
// <T>资源材质管理器。</T>
//
// @console
// @author maocy
// @history 150130
//==========================================================
MO.FE3sMaterialConsole = function FE3sMaterialConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._resources  = null;
   o._materials  = null;
   //..........................................................
   // @method
   o.construct   = MO.FE3sMaterialConsole_construct;
   // @method
   o.find        = MO.FE3sMaterialConsole_find;
   // @method
   o.unserialize = MO.FE3sMaterialConsole_unserialize;
   o.loadByGuid  = MO.FE3sMaterialConsole_loadByGuid;
   // @method
   o.dispose     = MO.FE3sMaterialConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3sMaterialConsole_construct = function FE3sMaterialConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._resources = new MO.TDictionary();
   o._materials = new MO.TDictionary();
}

//==========================================================
// <T>根据名称查找材质。</T>
//
// @param p:name:String 名称
// @return FE3sMaterial 材质
//==========================================================
MO.FE3sMaterialConsole_find = function FE3sMaterialConsole_find(p){
   return this._materials.get(p);
}

//==========================================================
// <T>反序列化一个材质。</T>
//
// @method
// @param input:FByteStream 输入流
// @return FE3sMaterial 材质
//==========================================================
MO.FE3sMaterialConsole_unserialize = function FE3sMaterialConsole_unserialize(input){
   var o = this;
   // 创建材质组
   var material = MO.Class.create(MO.FE3sMaterial);
   material.unserialize(input);
   // 存储材质组
   var materialGuid = material.guid();
   if(o._materials.contains(materialGuid)){
      throw new MO.TError(o, 'Material is already exists.');
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
MO.FE3sMaterialConsole_loadByGuid = function FE3sMaterialConsole_loadByGuid(guid){
   var o = this;
   var resources = o._resources;
   // 查找材质
   var resource = resources.get(guid);
   if(resource){
      return resource;
   }
   // 生成地址
   var vendor = MO.Console.find(MO.FE3sVendorConsole).find('material');
   vendor.set('guid', guid);
   var url = vendor.makeUrl();
   // 创建材质资源
   resource = MO.Class.create(MO.FE3sMaterialResource);
   resource.setGuid(guid);
   resource.setVendor(vendor);
   resource.setSourceUrl(url);
   MO.Console.find(MO.FResourceConsole).load(resource);
   // 存储材质资源
   resources.set(guid, resource);
   return resource;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FE3sMaterialConsole_dispose = function FE3sMaterialConsole_dispose(){
   var o = this;
   o._resources = MO.Lang.Object.free(o._resources);
   o._materials = MO.Lang.Object.free(o._materials);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
