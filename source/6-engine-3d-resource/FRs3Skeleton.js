//==========================================================
// <T>资源帧信息。</T>
//
// @author maocy
// @history 150109
//==========================================================
function FRs3Skeleton(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute
   o._bones      = null
   o._roots      = null
   //..........................................................
   // @method
   o.find        = FRs3Skeleton_find;
   o.bones       = FRs3Skeleton_bones;
   o.roots       = FRs3Skeleton_roots;
   // @method
   o.innerFilter = FRs3Skeleton_innerFilter;
   o.unserialize = FRs3Skeleton_unserialize;
   return o;
}

//==========================================================
// <T>根据编号获得骨。</T>
//
// @method
// @return FRsBone 骨头
//==========================================================
function FRs3Skeleton_find(p){
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
// <T>内部过滤处理。</T>
//
// @method
// @param p:bone:FRsBone 骨头
//==========================================================
function FRs3Skeleton_innerFilter(p){
   var o = this;
   // 设置字典
   o._bones.set(p.id(), p);
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
   // 读取所有子骨头
   var c = p.readUint8();
   if(c > 0){
      o._bones = new TDictionary();
      var bs = o._roots = new TObjects();
      for(var i = 0; i < c; i++){
         var b = RClass.create(FRs3Bone);
         b.unserialize(p);
         o.innerFilter(b);
         bs.push(b);
      }
   }
}
