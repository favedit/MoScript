//==========================================================
// <T>资源帧信息。</T>
//
// @author maocy
// @history 150109
//==========================================================
MO.FE3sSkeleton = function FE3sSkeleton(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @attribute
   o._bones        = MO.Class.register(o, new MO.AGetter('_bones'));
   o._roots        = MO.Class.register(o, new MO.AGetter('_roots'));
   o._skins        = MO.Class.register(o, new MO.AGetter('_skins'));
   o._animations   = MO.Class.register(o, new MO.AGetter('_animations'));
   //..........................................................
   // @method
   o.findBone      = MO.FE3sSkeleton_findBone;
   o.pushAnimation = MO.FE3sSkeleton_pushAnimation;
   // @method
   o.innerFilter   = MO.FE3sSkeleton_innerFilter;
   o.unserialize   = MO.FE3sSkeleton_unserialize;
   return o;
}

//==========================================================
// <T>根据编号获得骨。</T>
//
// @method
// @return FRsBone 骨头
//==========================================================
MO.FE3sSkeleton_findBone = function FE3sSkeleton_findBone(p){
   return this._bones.get(p);
}

//==========================================================
// <T>增加一个动画。</T>
//
// @method
// @param p:animation:FE3sAnimation 动画
//==========================================================
MO.FE3sSkeleton_pushAnimation = function FE3sSkeleton_pushAnimation(p){
   var o = this;
   var r = o._animations;
   if(!r){
      r = o._animations = new MO.TObjects();
   }
   r.push(p);
}

//==========================================================
// <T>内部过滤处理。</T>
//
// @method
// @param p:bone:FRsBone 骨头
//==========================================================
MO.FE3sSkeleton_innerFilter = function FE3sSkeleton_innerFilter(p){
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
MO.FE3sSkeleton_unserialize = function FE3sSkeleton_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p);
   // 读取所有子骨头
   var c = p.readUint8();
   if(c > 0){
      o._bones = new MO.TDictionary();
      var s = o._roots = new MO.TObjects();
      for(var i = 0; i < c; i++){
         var b = MO.Class.create(MO.FE3sBone);
         b.unserialize(p);
         o.innerFilter(b);
         s.push(b);
      }
   }
   // 读取蒙皮集合
   var c = p.readUint8();
   if(c > 0){
      var s = o._skins = new MO.TObjects();
      for(var i = 0; i < c; i++){
         var k = MO.Class.create(MO.FE3sSkeletonSkin);
         k.unserialize(p);
         s.push(k);
      }
   }
}
