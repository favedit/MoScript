//==========================================================
// <T>渲染模型网格。</T>
//
// @author maocy
// @history 150106
//==========================================================
function FE3rModelMesh(o){
   o = RClass.inherits(this, o, FE3rGeometry);
   //..........................................................
   // @attribute
   o._ready            = false;
   o._resourceMaterial = null;
   o._skins            = null;
   o._boneIds          = null;
   //..........................................................
   // @method
   o.construct         = FE3rModelMesh_construct;
   // @method
   o.testReady         = FE3rModelMesh_testReady;
   // @method
   o.guid              = FE3rModelMesh_guid;
   o.skins             = FE3rModelMesh_skins;
   o.pushSkin          = FE3rModelMesh_pushSkin;
   o.boneIds           = FE3rModelMesh_boneIds;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rModelMesh_construct(){
   var o = this;
   o.__base.FE3rGeometry.construct.call(o);
}

//==========================================================
// <T>测试是否加载完成。</T>
//
// @method
// @return 是否完成
//==========================================================
function FE3rModelMesh_testReady(){
   var o = this;
   if(!o._ready){
      // 测试所有位图加载好
      var ts = o._textures;
      if(ts != null){
         var c = ts.count();
         for(var i = 0; i < c; i++){
            var t = ts.value(i);
            if(!t.testReady()){
               return false;
            }
         }
      }
      // 加载完成
      o._ready = true;
   }
   return o._ready;
}

//==========================================================
// <T>获得唯一编号。</T>
//
// @method
// @return String 唯一编号
//==========================================================
function FE3rModelMesh_guid(){
   return this._resource.guid();
}

//==========================================================
// <T>获得渲染蒙皮集合。</T>
//
// @method
// @return TObjects<FE3rSkin> 渲染蒙皮集合
//==========================================================
function FE3rModelMesh_skins(){
   return this._skins;
}

//==========================================================
// <T>增加一个蒙皮。</T>
//
// @method
// @return FE3rSkin 蒙皮
//==========================================================
function FE3rModelMesh_pushSkin(p){
   var o = this;
   var r = o._skins;
   if(!r){
      r = o._skins = new TObjects();
   }
   r.push(p);
}

//==========================================================
// <T>获得骨头集合。</T>
//
// @method
// @return TArray 骨头集合
//==========================================================
function FE3rModelMesh_boneIds(p){
   return this._boneIds;
}
