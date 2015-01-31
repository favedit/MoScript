//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FRs3Material(o){
   o = RClass.inherits(this, o, FRs3Object);
   //..........................................................
   // @attribute
   o._guid       = null;
   o._groupGuid  = null;
   // @attribute
   o._info       = null;
   // @attribute
   o._textures   = null;
   //..........................................................
   // @method
   o.construct   = FRs3Material_construct;
   // @method
   o.guid        = FRs3Material_guid;
   o.groupGuid   = FRs3Material_groupGuid;
   o.group       = FRs3Material_group;
   // @method
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
   o.__base.FRs3Object.construct.call(o);
   o._info = new SRs3MaterialInfo();
}

//==========================================================
// <T>获得唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FRs3Material_guid(){
   return this._guid;
}

//==========================================================
// <T>获得分组唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FRs3Material_groupGuid(){
   return this._groupGuid;
}

//==========================================================
// <T>获得材质分组。</T>
//
// @method
// @return FRs3MaterialGroup 材质分组
//==========================================================
function FRs3Material_group(){
   return RConsole.find(FRs3MaterialGroupConsole).find(this._groupGuid);
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
   o._guid = p.readString();
   o._groupGuid = p.readString();
   // 读取信息
   o._info.unserialize(p);
   // 读取纹理集合
   var c = p.readInt16();
   if(c > 0){
      var ts = o._textures = new TObjects();
      for(var i = 0; i< c; i++){
         var t = RClass.create(FRs3MaterialTexture);
         t.unserialize(p);
         ts.push(t);
      }
   }
}
