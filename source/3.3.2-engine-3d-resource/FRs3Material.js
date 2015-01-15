//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FRs3Material(o){
   o = RClass.inherits(this, o, FRs3Resource);
   //..........................................................
   // @attribute
   o._code       = null;
   // @attribute
   o._info       = null;
   // @attribute
   o._textures   = null;
   //..........................................................
   // @method
   o.construct   = FRs3Material_construct;
   o.code        = FRs3Material_code;
   o.effectName  = FRs3Material_effectName;
   o.info        = FRs3Material_info;
   o.textures    = FRs3Material_textures;
   o.unserialize = FRs3Material_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3Material_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._info = new SRs3MaterialInfo();
}

//==========================================================
// <T>获得代码。</T>
//
// @method
// @return String 代码
//==========================================================
function FRs3Material_code(){
   return this._code;
}

//==========================================================
// <T>获得效果名称。</T>
//
// @method
// @return String 效果名称
//==========================================================
function FRs3Material_effectName(){
   return this._info.effectName;
}

//==========================================================
// <T>获得材质信息。</T>
//
// @method
// @return SG3dMaterialInfo 材质信息
//==========================================================
function FRs3Material_info(){
   return this._info;
}

//==========================================================
// <T>获得纹理集合。</T>
//
// @method
// @return TObjects 纹理集合
//==========================================================
function FRs3Material_textures(){
   return this._textures;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Material_unserialize(p){
   var o = this;
   // 读取属性
   o._code = p.readString();
   // 读取信息
   o._info.unserialize(p);
   // 读取纹理集合
   var c = p.readInt8();
   if(c > 0){
      var ts = o._textures = new TObjects();
      for(var i = 0; i< c; i++){
         var t = RClass.create(FRs3MaterialTexture);
         t.unserialize(p);
         ts.push(t);
      }
   }
}
