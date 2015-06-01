with(MO){
   //==========================================================
   // <T>资源骨头引用。</T>
   //
   // @author maocy
   // @history 150205
   //==========================================================
   MO.FE3sBoneRefer = function FE3sBoneRefer(o){
      o = RClass.inherits(this, o, FObject);
      //..........................................................
      // @attribute
      o._index      = null;
      o._bone       = null;
      o._track      = null;
      //..........................................................
      // @method
      o.index       = FE3sBoneRefer_index;
      o.bone        = FE3sBoneRefer_bone;
      o.setBone     = FE3sBoneRefer_setBone;
      o.track       = FE3sBoneRefer_track;
      o.setTrack    = FE3sBoneRefer_setTrack;
      // @method
      o.unserialize = FE3sBoneRefer_unserialize;
      return o;
   }

   //==========================================================
   // <T>获得索引。</T>
   //
   // @method
   // @return Integer 索引
   //==========================================================
   MO.FE3sBoneRefer_index = function FE3sBoneRefer_index(){
      return this._index;
   }

   //==========================================================
   // <T>获得骨头。</T>
   //
   // @method
   // @return FE3sBone 骨头
   //==========================================================
   MO.FE3sBoneRefer_bone = function FE3sBoneRefer_bone(){
      return this._bone;
   }

   //==========================================================
   // <T>设置骨头。</T>
   //
   // @method
   // @param p:bone:FE3sBone 骨头
   //==========================================================
   MO.FE3sBoneRefer_setBone = function FE3sBoneRefer_setBone(p){
      this._bone = p;
   }

   //==========================================================
   // <T>获得跟踪信息。</T>
   //
   // @method
   // @return FRsTrack 跟踪信息
   //==========================================================
   MO.FE3sBoneRefer_track = function FE3sBoneRefer_track(){
      return this._track;
   }

   //==========================================================
   // <T>设置跟踪信息。</T>
   //
   // @method
   // @return p:FRsTrack 跟踪信息
   //==========================================================
   MO.FE3sBoneRefer_setTrack = function FE3sBoneRefer_setTrack(p){
      this._track = p;
   }

   //==========================================================
   // <T>从输入流里反序列化信息内容</T>
   //
   // @method
   // @param p:input:FByteStream 数据流
   //==========================================================
   MO.FE3sBoneRefer_unserialize = function FE3sBoneRefer_unserialize(p){
      var o = this;
      // 读取属性
      o._index = p.readUint8();
   }
}
