//==========================================================
// <T>模型资源。</T>
//
// @author maocy
// @history 150105
//==========================================================
function FRs3Scene(o){
   o = RClass.inherits(this, o, FRs3Resource);
   //..........................................................
   // @attribute
   o._themeCode  = null;
   o._technique  = null;
   o._region     = null;
   o._sky        = null;
   o._map        = null;
   o._space      = null;
   //..........................................................
   // @method
   o.construct   = FRs3Scene_construct;
   o.technique   = FRs3Scene_technique;
   o.region      = FRs3Scene_region;
   o.sky         = FRs3Scene_sky;
   o.map         = FRs3Scene_map;
   o.space       = FRs3Scene_space;
   o.unserialize = FRs3Scene_unserialize;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRs3Scene_construct(){
   var o = this;
   o.__base.FRs3Resource.construct.call(o);
   o._technique = RClass.create(FRs3SceneTechnique);
   o._region = RClass.create(FRs3SceneRegion);
   o._sky = RClass.create(FRs3SceneSky);
   o._map = RClass.create(FRs3SceneMap);
   o._space = RClass.create(FRs3SceneSpace);
}

//==========================================================
// <T>获得技术。</T>
//
// @method
// @return 技术
//==========================================================
function FRs3Scene_technique(){
   return this._technique;
}

//==========================================================
// <T>获得区域。</T>
//
// @method
// @return 区域
//==========================================================
function FRs3Scene_region(){
   return this._region;
}

//==========================================================
// <T>获得天空。</T>
//
// @method
// @return 天空
//==========================================================
function FRs3Scene_sky(){
   return this._sky;
}

//==========================================================
// <T>获得地图。</T>
//
// @method
// @return 地图
//==========================================================
function FRs3Scene_map(){
   return this._map;
}

//==========================================================
// <T>获得空间。</T>
//
// @method
// @return 空间
//==========================================================
function FRs3Scene_space(){
   return this._space;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
//==========================================================
function FRs3Scene_unserialize(p){
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   // 读取属性
   o._themeCode = p.readString();
   // 读取技术
   o._technique.unserialize(p);
   // 读取区域
   o._region.unserialize(p);
   // 读取天空
   o._sky.unserialize(p);
   // 读取地区
   o._map.unserialize(p);
   // 读取空间
   o._space.unserialize(p);
}
