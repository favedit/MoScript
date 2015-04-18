//==========================================================
// <T>资源动画信息。</T>
//
// @author maocy
// @history 150109
//==========================================================
function FE3sAnimation(o){
   o = RClass.inherits(this, o, FE3sObject);
   //..........................................................
   // @attribute
   o._model        = null;
   o._skeletonGuid = null;
   o._skeleton     = null;
   o._frameCount   = 0;
   o._frameTick    = 0;
   o._frameSpan    = 0;
   // @attribute
   o._tracks       = null;
   //..........................................................
   // @method
   o.skeletonGuid  = FE3sAnimation_skeletonGuid;
   o.skeleton      = FE3sAnimation_skeleton;
   o.tracks        = FE3sAnimation_tracks;
   o.unserialize   = FE3sAnimation_unserialize;
   return o;
}

//==========================================================
// <T>获得骨骼唯一编号。</T>
//
// @method
// @return String 骨骼唯一编号
//==========================================================
function FE3sAnimation_skeletonGuid(){
   return this._skeletonGuid;
}

//==========================================================
// <T>获得骨骼。</T>
//
// @method
// @return FE3sSkeleton 骨骼
//==========================================================
function FE3sAnimation_skeleton(){
   var o = this;
   var skeleton = o._skeleton;
   if(!skeleton){
      var guid = o._skeletonGuid;
      if(guid){
         skeleton = o._skeleton = RConsole.find(FE3sModelConsole).findSkeleton(guid);
      }
   }
   return skeleton;
}

//==========================================================
// <T>获得跟踪集合。</T>
//
// @method
// @return TObjects 跟踪集合
//==========================================================
function FE3sAnimation_tracks(){
   return this._tracks;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function FE3sAnimation_unserialize(p){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, p)
   // 读取属性
   o._skeletonGuid = p.readString();
   o._frameCount = p.readUint16();
   o._frameTick = p.readUint16();
   o._frameSpan = p.readUint32();
   // 读取跟踪集合
   var ts = null;
   var c = p.readUint16();
   if(c > 0){
      ts = o._tracks = new TObjects();
      for(var i = 0; i < c; i++){
         // 创建跟踪
         var t = RClass.create(FE3sTrack);
         t.unserialize(p);
         ts.push(t);
         // 关联模型
         //if(t._meshCode){
         //   var m = o._model.findMeshByCode(t._meshCode);
         //   m._track = t;
         //}
         // 关联骨头
         if(k){
            var bi = t.boneIndex();
            var b = k.findBone(bi);
            b.setTrack(t);
         }
      }
   }
   // 关联跟踪信息
   if(ts && o._skeletonGuid){
      var k = o.skeleton();
      for(var i = 0; i < c; i++){
         var t = ts.get(i);
         var b = k.findBone(t.boneIndex());
         b.setTrack(t);
      }
      k.pushAnimation(o);
   }
}
