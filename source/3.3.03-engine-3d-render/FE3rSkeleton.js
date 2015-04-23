//==========================================================
// <T>渲染模型。</T>
//
// @author maocy
// @history 150130
//==========================================================
function FE3rSkeleton(o){
   o = RClass.inherits(this, o, FE3rObject);
   //..........................................................
   // @attribute
   o._resource    = null;
   // @attribute
   o._bones       = null;
   o._skins       = null;
   //..........................................................
   // @method
   o.resource     = FE3rSkeleton_resource;
   o.bones        = FE3rSkeleton_bones;
   o.skins        = FE3rSkeleton_skins;
   // @method
   o.loadResource = FE3rSkeleton_loadResource;
   return o;
}

//==========================================================
// <T>获得资源。</T>
//
// @method
// @return FE3sModel 资源
//==========================================================
function FE3rSkeleton_resource(){
   return this._resource;
}

//==========================================================
// <T>获得骨头集合。</T>
//
// @method
// @return TObjects 骨头集合
//==========================================================
function FE3rSkeleton_bones(){
   return this._bones;
}

//==========================================================
// <T>获得蒙皮集合。</T>
//
// @method
// @return TObjects 蒙皮集合
//==========================================================
function FE3rSkeleton_skins(){
   return this._skins;
}

//==========================================================
// <T>加载资源信息。</T>
//
// @method
// @param p:resource:FRsModel 资源信息
//==========================================================
function FE3rSkeleton_loadResource(p){
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
         var b = RClass.create(FE3rBone);
         b.loadResource(r);
         bs.push(b);
      }
   }
}
