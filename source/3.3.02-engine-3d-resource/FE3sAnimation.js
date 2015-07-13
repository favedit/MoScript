//==========================================================
// <T>资源动画信息。</T>
//
// @author maocy
// @history 150109
//==========================================================
MO.FE3sAnimation = function FE3sAnimation(o){
   o = MO.Class.inherits(this, o, MO.FE3sObject);
   //..........................................................
   // @attribute
   o._model           = null;
   o._skeletonGuid    = MO.Class.register(o, new MO.AGetter('_skeletonGuid'));
   o._skeleton        = null;
   // @attribute
   o._frameCount      = MO.Class.register(o, new MO.AGetter('_frameCount'), 0);
   o._frameTick       = MO.Class.register(o, new MO.AGetter('_frameTick'), 0);
   o._frameSpan       = MO.Class.register(o, new MO.AGetter('_frameSpan'), 0);
   // @attribute
   o._frameTranslates = null;
   o._frameRotations  = null;
   o._frameScales     = null;
   o._tracks          = MO.Class.register(o, new MO.AGetter('_tracks'));
   //..........................................................
   // @method
   o.skeleton         = MO.FE3sAnimation_skeleton;
   // @method
   o.tracks           = MO.FE3sAnimation_tracks;
   o.unserialize      = MO.FE3sAnimation_unserialize;
   return o;
}

//==========================================================
// <T>获得骨骼。</T>
//
// @method
// @return FE3sSkeleton 骨骼
//==========================================================
MO.FE3sAnimation_skeleton = function FE3sAnimation_skeleton(){
   var o = this;
   var skeleton = o._skeleton;
   if(!skeleton){
      var guid = o._skeletonGuid;
      if(guid){
         skeleton = o._skeleton = MO.Console.find(MO.FE3sModelConsole).findSkeleton(guid);
      }
   }
   return skeleton;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param input:FByteStream 数据流
//==========================================================
MO.FE3sAnimation_unserialize = function FE3sAnimation_unserialize(input){
   var o = this;
   o.__base.FE3sObject.unserialize.call(o, input)
   // 读取属性
   o._skeletonGuid = input.readString();
   o._frameCount = input.readUint16();
   o._frameTick = input.readUint16();
   o._frameSpan = input.readUint32();
   // 读取帧平移集合
   var translateCount = input.readUint32();
   var translateBytes = MO.Lang.Integer.strideByte(translateCount);
   if(translateCount > 0){
      var translates = o._frameTranslates = new MO.TObjects();
      for(var i = 0; i < translateCount; i++){
         var translate = new MO.SPoint3();
         translate.unserialize(input);
         translates.push(translate);
      }
   }
   // 读取帧旋转集合
   var rotationCount = input.readUint32();
   var rotationBytes = MO.Lang.Integer.strideByte(rotationCount);
   if(rotationCount > 0){
      var rotations = o._frameRotations = new MO.TObjects();
      for(var i = 0; i < rotationCount; i++){
         var rotation = new MO.SQuaternion();
         rotation.unserialize(input);
         rotations.push(rotation);
      }
   }
   // 读取帧缩放 集合
   var scaleCount = input.readUint32();
   var scaleBytes = MO.Lang.Integer.strideByte(scaleCount);
   if(scaleCount > 0){
      var scales = o._frameScales = new MO.TObjects();
      for(var i = 0; i < scaleCount; i++){
         var scale = new MO.SVector3();
         scale.unserialize(input);
         scales.push(scale);
      }
   }
   // 读取跟踪集合
   var tracks = null;
   var trackCount = input.readUint16();
   if(trackCount > 0){
      tracks = o._tracks = new MO.TObjects();
      for(var n = 0; n < trackCount; n++){
         // 创建跟踪
         var track = MO.Class.create(MO.FE3sTrack);
         track.unserialize(input);
         tracks.push(track);
         // 读取帧信息
         var frameCount = track._frameCount;
         var frames = track._frames;
         for(var i = 0; i < frameCount; i++){
            // 创建帧
            var frame = MO.Class.create(MO.FE3sFrame);
            //..........................................................
            // 获得平移引用
            var translateIndex = 0;
            if(translateBytes == 4){
               translateIndex = input.readUint32();
            }else if(translateBytes == 2){
               translateIndex = input.readUint16();
            }else{
               translateIndex = input.readUint8();
            }
            frame._translation = translates.at(translateIndex);
            // 获得旋转引用
            var rotationIndex = 0;
            if(rotationBytes == 4){
               rotationIndex = input.readUint32();
            }else if(rotationBytes == 2){
               rotationIndex = input.readUint16();
            }else{
               rotationIndex = input.readUint8();
            }
            frame._quaternion = rotations.at(rotationIndex);
            // 获得缩放引用
            var scaleIndex = 0;
            if(scaleBytes == 4){
               scaleIndex = input.readUint32();
            }else if(scaleBytes == 2){
               scaleIndex = input.readUint16();
            }else{
               scaleIndex = input.readUint8();
            }
            frame._scale = scales.at(scaleIndex);
            //..........................................................
            // 增加帧信息
            frames.push(frame);
         }
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
