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
   // @attribute
   o._frameCount   = 0;
   o._frameTick    = 0;
   o._frameSpan    = 0;
   // @attribute
   o._tracks       = null;
   //..........................................................
   // @method
   o.skeletonGuid  = FE3sAnimation_skeletonGuid;
   o.skeleton      = FE3sAnimation_skeleton;
   // @method
   o.frameCount    = FE3sAnimation_frameCount;
   o.frameTick     = FE3sAnimation_frameTick;
   o.frameSpan     = FE3sAnimation_frameSpan;
   // @method
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
// <T>获得帧总数。</T>
//
// @method
// @return Integer 帧总数
//==========================================================
function FE3sAnimation_frameCount(){
   return this._frameCount;
}

//==========================================================
// <T>获得帧间隔。</T>
//
// @method
// @return Integer 帧间隔
//==========================================================
function FE3sAnimation_frameTick(){
   return this._frameTick;
}

//==========================================================
// <T>获得帧总长。</T>
//
// @method
// @return Integer 帧总长
//==========================================================
function FE3sAnimation_frameSpan(){
   return this._frameSpan;
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
// @param input:FByteStream 数据流
//==========================================================
function FE3sAnimation_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input)
   // 读取属性
   o._skeletonGuid = input.readString();
   o._frameCount = input.readUint16();
   o._frameTick = input.readUint16();
   o._frameSpan = input.readUint32();
   // 读取跟踪集合
   var tracks = null;
   var trackCount = input.readUint16();
   if(trackCount > 0){
      tracks = o._tracks = new TObjects();
      for(var i = 0; i < trackCount; i++){
         // 创建跟踪
         var track = RClass.create(FE3sTrack);
         track.unserialize(input);
         tracks.push(track);
         // 关联模型
         //if(t._meshCode){
         //   var m = o._model.findMeshByCode(t._meshCode);
         //   m._track = t;
         //}
         // 关联骨头
         //if(track){
         //   var boneIndex = track.boneIndex();
         //   var bone = k.findBone(boneIndex);
         //   bone.setTrack(track);
         //}
      }
   }
   // 关联跟踪信息
   if(tracks && o._skeletonGuid){
      var skeleton = o.skeleton();
      for(var i = 0; i < trackCount; i++){
         var track = tracks.at(i);
         var boneIndex = track.boneIndex();
         var bone = skeleton.findBone(boneIndex);
         bone.setTrack(track);
      }
      skeleton.pushAnimation(o);
   }
}
