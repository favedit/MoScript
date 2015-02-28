//==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FRd3Skin(o){
   o = RClass.inherits(this, o, FRd3Object);
   //..........................................................
   // @attribute
   o._resource    = null;
   // @attribute
   o._streams     = null;
   //..........................................................
   // @method
   o.resource     = FRd3Skin_resource;
   o.streams      = FRd3Skin_streams;
   // @method
   o.loadResource = FRd3Skin_loadResource;
   return o;
}

//==========================================================
// <T>获得资源信息。</T>
//
// @return FE3sSkeletonSkin 资源信息
//==========================================================
function FRd3Skin_resource(){
   return this._resource;
}

//==========================================================
// <T>获得渲染数据流集合。</T>
//
// @return TObjects 渲染数据流集合
//==========================================================
function FRd3Skin_streams(){
   return this._streams;
}

//==========================================================
// <T>加载资源信息。</T>
//
// @method
// @param p:resource:FRsModel 资源信息
//==========================================================
function FRd3Skin_loadResource(p){
   var o = this;
   // 设置属性
   o._resource = p;
   // 读取数据流集合
   var rs = p.streams();
   if(rs){
      var ss = o._streams = new TObjects();
      var c = rs.count();
      for(var i = 0; i < c; i++){
         var s = RClass.create(FRd3Stream);
         s.linkGraphicContext(o);
         s.loadResource(rs.get(i));
         ss.push(s);
      }
   }
}
