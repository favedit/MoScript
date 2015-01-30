//==========================================================
// <T>资源场景空间。</T>
//
// @author maocy
// @history 150115
//==========================================================
function FRs3SceneSpace(o){
   o = RClass.inherits(this, o, FObject);
   //..........................................................
   // @attribute 属性
   o._name       = null;
   o._type       = null;
   // @attribute 显示集合
   o._displays   = null;
   //..........................................................
   // @method
   o.displays    = FRs3SceneSpace_displays;
   o.unserialize = FRs3SceneSpace_unserialize;
   return o;
}

//==========================================================
// <T>获得显示集合。</T>
//
// @method
// @return TObjects 显示集合
//==========================================================
function FRs3SceneSpace_displays(){
   return this._displays;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3SceneSpace_unserialize(p){
   var o = this;
   // 读取属性
   o._name = p.readString();
   o._type = p.readString();
   // 读取显示集合
   var c = p.readUint16();
   if(c > 0){
      var ds = o._displays = new TObjects();
      for(var i = 0; i < c; i++){
         var d = RClass.create(FRs3SceneDisplay);
         d.unserialize(p);
         ds.push(d);
      }
   }
}
