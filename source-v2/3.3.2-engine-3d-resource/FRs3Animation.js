//==========================================================
// <T>资源动画信息。</T>
//
// @author maocy
// @history 150109
//==========================================================
function FRs3Animation(o){
   o = RClass.inherits(this, o, FRs3Object);
   //..........................................................
   // @attribute
   o._frameCount = 0;
   o._frameTick  = 0;
   o._frameSpan  = 0;
   // @attribute
   o._tracks     = null;
   //..........................................................
   // @method
   o.tracks      = FRs3Animation_tracks;
   o.unserialize = FRs3Animation_unserialize;
   return o;
}

//==========================================================
// <T>获得跟踪集合。</T>
//
// @method
// @return TObjects 跟踪集合
//==========================================================
function FRs3Animation_tracks(){
   return this._tracks;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @method
// @param p:input:FByteStream 数据流
//==========================================================
function FRs3Animation_unserialize(p){
   var o = this;
   o.__base.FRs3Object.unserialize.call(o, p)
   // 读取属性
   var kg = o._skeletonGuid = p.readString();
   o._frameCount = p.readUint16();
   o._frameTick = p.readUint16();
   o._frameSpan = p.readUint32();
   // 查找骨骼
   var k = null;
   if(!RString.isEmpty(kg)){
      k = RConsole.find(FRs3ModelConsole).findSkeleton(kg);
   }
   // 读取跟踪集合
   var c = p.readUint16();
   if(c > 0){
      var ts = o._tracks = new TObjects();
      for(var i = 0; i < c; i++){
         // 创建跟踪
         var t = RClass.create(FRs3Track);
         t.unserialize(p);
         ts.push(t);
         // 关联骨头
         if(k){
            var bi = t.boneIndex();
            var b = k.findBone(bi);
            b.setTrack(t);
         }
      }
   }
}
