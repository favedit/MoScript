//==========================================================
// <T>资源显示。</T>
//
// @author maocy
// @history 150129
//==========================================================
function FE3sSprite(o){
   o = RClass.inherits(this, o, FE3sDisplayContainer);
   //..........................................................
   // @attribute
   o._materials  = null;
   //..........................................................
   // @method
   o.construct   = FE3sSprite_construct;
   // @method
   o.materials   = FE3sSprite_materials;
   // @method
   o.unserialize = FE3sSprite_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3sSprite_construct(){
   var o = this;
   o.__base.FE3sDisplayContainer.construct.call(o);
}

//==========================================================
// <T>获得材质集合。</T>
//
// @method
// @return TObjects 材质集合
//==========================================================
function FE3sSprite_materials(){
   return this._materials;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FE3sSprite_unserialize(input){
   // 读取父信息
   var o = this;
   o.__base.FE3sDisplayContainer.unserialize.call(o, input);
   // 读取主题集合
   var materialCount = input.readUint16();
   if(materialCount > 0){
      var materialConsole = RConsole.find(FE3sMaterialConsole);
      var materials = o._materials = new TDictionary();
      for(var i = 0; i < materialCount; i++){
         var material = materialConsole.unserialize(input)
         materials.set(material.guid(), material);
      }
   }
}
