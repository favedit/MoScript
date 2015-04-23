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
   o._materials  = null;
   //..........................................................
   // @method
   o.construct   = FE3sMaterialConsole_construct;
   // @method
   o.find        = FE3sMaterialConsole_find;
   // @method
   o.unserialize = FE3sMaterialConsole_unserialize;
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
