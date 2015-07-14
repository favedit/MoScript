//==========================================================
// <T>渲染模型网格。</T>
//
// @author maocy
// @history 150106
//==========================================================
MO.FE3rModelMesh = function FE3rModelMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3rGeometry);
   //..........................................................
   // @attribute
   o._ready            = false;
   o._resourceMaterial = null;
   o._skins            = MO.Class.register(o, new AGetter('_skins'));
   o._boneIds          = MO.Class.register(o, new AGetter('_boneIds'));
   //..........................................................
   // @method
   o.construct         = MO.FE3rModelMesh_construct;
   // @method
   o.testReady         = MO.FE3rModelMesh_testReady;
   // @method
   o.guid              = MO.FE3rModelMesh_guid;
   o.pushSkin          = MO.FE3rModelMesh_pushSkin;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3rModelMesh_construct = function FE3rModelMesh_construct(){
   var o = this;
   o.__base.FE3rGeometry.construct.call(o);
}

//==========================================================
// <T>测试是否加载完成。</T>
//
// @method
// @return 是否完成
//==========================================================
MO.FE3rModelMesh_testReady = function FE3rModelMesh_testReady(){
   var o = this;
   if(!o._ready){
      // 测试所有位图加载好
      var textures = o._textures;
      if(textures){
         var count = textures.count();
         for(var i = 0; i < count; i++){
            var texture = textures.at(i);
            if(!texture.testReady()){
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
MO.FE3rModelMesh_guid = function FE3rModelMesh_guid(){
   return this._resource.guid();
}

//==========================================================
// <T>增加一个蒙皮。</T>
//
// @method
// @param skin:FE3rSkin 蒙皮
//==========================================================
MO.FE3rModelMesh_pushSkin = function FE3rModelMesh_pushSkin(skin){
   var o = this;
   var skins = o._skins;
   if(!skins){
      skins = o._skins = new MO.TObjects();
   }
   skins.push(skin);
}
