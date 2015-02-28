//==========================================================
// <T>资源帧信息。</T>
//
// @author maocy
// @history 150109
//==========================================================
function FRs3Skeleton(o){
   o = RClass.inherits(this, o, FRs3Object);
   //..........................................................
   // @attribute
   o._bones        = null
   o._roots        = null
   o._skins        = null
   o._animations   = null
   //..........................................................
   // @method
   o.findBone      = FRs3Skeleton_findBone;
   o.bones         = FRs3Skeleton_bones;
   o.roots         = FRs3Skeleton_roots;
   o.skins         = FRs3Skeleton_skins;
   o.animations    = FRs3Skeleton_animations;
   o.pushAnimation = FRs3Skeleton_pushAnimation;
   // @method
   o.innerFilter   = FRs3Skeleton_innerFilter;
   o.unserialize   = FRs3Skeleton_unserialize;
   return o;
}

//==========================================================
// <T>根据编号获得骨。</T>
//
// @method
// @return FRsBone 骨头
//==========================================================
function FRs3Skeleton_findBone(p){
   return this._bones.get(p);
}

//==========================================================
// <T>获得骨头字典。</T>
//
// @method
// @return TDictionary 骨头字典
//==========================================================
function FRs3Skeleton_bones(){
   return this._bones;
}

//==========================================================
// <T>获得根骨头集合。</T>
//
// @method
// @return TObjects 骨头集合
//==========================================================
function FRs3Skeleton_roots(){
   return this._roots;
}

//==========================================================
// <T>获得皮肤集合。</T>
//
// @method
// @return TObjects 皮肤集合
//==========================================================
function FRs3Skeleton_skins(){
   return this._skins;
}

//==========================================================
// <T>获得动画集合。</T>
//
// @method
// @return TObjects 动画集合
//==========================================================
function FRs3Skeleton_animations(){
   return this._animations;
}

//==========================================================
// <T>增加一个动画。</T>
//
// @method
// @param p:animation:FRs3Animation 动画
//==========================================================
function FRs3Skeleton_pushAnimation(p){
   var o = this;
   var r = o._animations;
   if(!r){
      r = o._animations = new TObjects();
   }
   r.push(p);
}

//==========================================================
// <T>内部过滤处理。</T>
//
// @method
// @param p:bone:FRsBone 骨头
//==========================================================
function FRs3Skeleton_innerFilter(p){
   var o = this;
   // 设置字典
   o._bones.set(p.index(), p);
   // 处理所有子节点
   var bs = p.bones();
   if(bs){
      var c = bs.count();
      for(var i = 0; i < c; i++){
         var b = bs.get(i);
         o.innerFilter(b)
      }
   }
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function FRs3Skeleton_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p);
   // 读取所有子骨头
   var c = p.readUint8();
   if(c > 0){
      o._bones = new TDictionary();
      var s = o._roots = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FRs3Bone);
         b.unserialize(p);
         o.innerFilter(b);
         s.push(b);
      }
   }
   // 读取蒙皮集合
   var c = p.readUint8();
   if(c > 0){
      var s = o._skins = new TObjects();
      for(var i = 0; i < c; i++){
         var k = RClass.create(FRs3SkeletonSkin);
         k.unserialize(p);
         s.push(k);
      }
   }
}
