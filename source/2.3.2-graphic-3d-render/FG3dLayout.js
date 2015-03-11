//==========================================================
// <T>渲染布局。</T>
//
// @class
// @author maocy
// @history 150212
//==========================================================
function FG3dLayout(o){
   o = RClass.inherits(this, o, FG3dObject);
   //..........................................................
   // @attribute
   o._buffers     = null;
   o._samplers    = null;
   //..........................................................
   // @method
   o.buffers      = FG3dLayout_buffers;
   o.linkBuffers  = FG3dLayout_linkBuffers;
   o.bindBuffers  = FG3dLayout_bindBuffers;
   // @method
   o.samplers     = FG3dLayout_samplers;
   o.linkSamplers = FG3dLayout_linkSamplers;
   o.bindSamplers = FG3dLayout_bindSamplers;
   o.unbindSamplers = FG3dLayout_unbindSamplers;
   // @method
   o.dispose      = FG3dLayout_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
// @return TObjects 元素集合
//==========================================================
function FG3dLayout_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
}

//==========================================================
// <T>获得元素集合。</T>
//
// @method
// @return TObjects 元素集合
//==========================================================
function FG3dLayout_buffers(){
   return this._buffers;
}

//==========================================================
// <T>关联取样集合。</T>
//
// @method
// @param p:samplers:TObjects 取样集合
//==========================================================
function FG3dLayout_linkBuffers(p){
   var o = this;
   if(!p.isEmpty()){
      var s = o._buffers = new TObjects();
      s.assign(p);
   }
}

//==========================================================
// <T>绑定所有集合。</T>
//
// @method
//==========================================================
function FG3dLayout_bindBuffers(){
   var o = this;
   var g = o._graphicContext;
   var s = o._buffers;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var v = s.getAt(i);
         g.bindVertexBuffer(v.slot, v.buffer, v.index, v.formatCd);
      }
   }
}

//==========================================================
// <T>获得取样集合。</T>
//
// @method
// @return TObjects 取样集合
//==========================================================
function FG3dLayout_samplers(){
   return this._samplers;
}

//==========================================================
// <T>关联取样集合。</T>
//
// @method
// @param p:samplers:TObjects 取样集合
//==========================================================
function FG3dLayout_linkSamplers(p){
   var o = this;
   if(!p.isEmpty()){
      var s = o._samplers = new TObjects();
      s.assign(p);
   }
}

//==========================================================
// <T>绑定所有集合。</T>
//
// @method
//==========================================================
function FG3dLayout_bindSamplers(){
   var o = this;
   var g = o._graphicContext;
   var s = o._samplers;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var v = s.getAt(i);
         g.bindTexture(v.slot, v.index, v.texture);
      }
   }
}

//==========================================================
// <T>绑定所有集合。</T>
//
// @method
//==========================================================
function FG3dLayout_unbindSamplers(){
   var o = this;
   var g = o._graphicContext;
   var s = o._samplers;
   if(s){
      var c = s.count();
      for(var i = 0; i < c; i++){
         var v = s.getAt(i);
         g.bindTexture(v.slot, v.index, null);
      }
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FG3dLayout_dispose(){
   var o = this;
   // 释放对象
   o._buffers = RObject.dispose(o._buffers);
   o._samplers = RObject.dispose(o._samplers);
   // 父处理
   o.__base.FG3dLayout.dispose.call(o);
}
