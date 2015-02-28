//==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FRd3Skeleton(o){
   o = RClass.inherits(this, o, FRd3Object);
   //..........................................................
   // @attribute
   o._resource    = null;
   // @attribute
   o._bones       = null;
   o._skins       = null;
   //..........................................................
   // @method
   o.resource     = FRd3Skeleton_resource;
   o.bones        = FRd3Skeleton_bones;
   o.skins        = FRd3Skeleton_skins;
   // @method
   o.loadResource = FRd3Skeleton_loadResource;
   return o;
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FRs3Model 资源
//==========================================================
function FRd3Skeleton_resource(){
   return this._resource;
}

//==========================================================
// <T>获得骨头集合。</T>
//
// @method
// @return TObjects 骨头集合
//==========================================================
function FRd3Skeleton_bones(){
   return this._bones;
}

//==========================================================
// <T>获得蒙皮集合。</T>
//
// @method
// @return TObjects 蒙皮集合
//==========================================================
function FRd3Skeleton_skins(){
   return this._skins;
}

//==========================================================
// <T>加载资源信息。</T>
//
// @method
// @param p:resource:FRsModel 资源信息
//==========================================================
function FRd3Skeleton_loadResource(p){
   var o = this;
   // 设置属性
   o._resource = p;
   // 设置骨头集合
   var rs = p._bones;
   var c = rs.count();
   if(c > 0){
      var bs = o._bones = new TObjects();
      for(var i = 0; i < c; i++){
         var r = rs.value(i);
         var b = RClass.create(FRd3Bone);
         b.loadResource(r);
         bs.push(b);
      }
   }
}
