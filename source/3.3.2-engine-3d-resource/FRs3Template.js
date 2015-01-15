//==========================================================
// <T>资源模板。</T>
//
// @author maocy
// @history 150108
//==========================================================
function FRs3Template(o){
   o = RClass.inherits(this, o, FRs3Resource);
   //..........................................................
   // @attribute
   o._renderables = null;
   //..........................................................
   // @method
   o.renderables  = FRs3Template_renderables;
   o.unserialize  = FRs3Template_unserialize;
   return o;
}

//==========================================================
// <T>获得渲染集合。</T>
//
// @method
// @return 
//==========================================================
function FRs3Template_renderables(){
   return this._renderables;
}

//==========================================================
// <T>从输入流里反序列化信息内容</T>
//
// @param p:input:FByteStream 数据流
// @return 处理结果
//==========================================================
function FRs3Template_unserialize(p){
   // 读取父信息
   var o = this;
   o.__base.FRs3Resource.unserialize.call(o, p);
   // 读取几何体集合
   var c = p.readUint16();
   if(c > 0){
      var rs = o._renderables = new TObjects();
      for(var n = 0; n < c; n++){
         var r = RClass.create(FRs3TemplateRenderable);
         r.unserialize(p);
         rs.push(r);
      }
   }
}
