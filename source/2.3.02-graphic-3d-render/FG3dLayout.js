with(MO){
   //==========================================================
   // <T>渲染布局。</T>
   //
   // @class
   // @author maocy
   // @history 150212
   //==========================================================
   MO.FG3dLayout = function FG3dLayout(o){
      o = RClass.inherits(this, o, FG3dObject);
      //..........................................................
      // @attribute
      o._buffers       = MO.Class.register(o, new MO.AGetter('_buffers'));
      o._samplers      = MO.Class.register(o, new MO.AGetter('_samplers'));
      //..........................................................
      // @method
      o.linkBuffers    = FG3dLayout_linkBuffers;
      o.bindBuffers    = FG3dLayout_bindBuffers;
      // @method
      o.linkSamplers   = FG3dLayout_linkSamplers;
      o.bindSamplers   = FG3dLayout_bindSamplers;
      o.unbindSamplers = FG3dLayout_unbindSamplers;
      // @method
      o.dispose        = FG3dLayout_dispose;
      return o;
   }

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   // @return TObjects 元素集合
   //==========================================================
   MO.FG3dLayout_construct = function FG3dLayout_construct(){
      var o = this;
      o.__base.FG3dObject.construct.call(o);
   }

   //==========================================================
   // <T>关联取样集合。</T>
   //
   // @method
   // @param buffers:TObjects 取样集合
   //==========================================================
   MO.FG3dLayout_linkBuffers = function FG3dLayout_linkBuffers(buffers){
      var o = this;
      if(!buffers.isEmpty()){
         var items = o._buffers;
         if(!items){
            items = o._buffers = new TObjects();
         }
         items.assign(buffers);
      }
   }

   //==========================================================
   // <T>绑定所有集合。</T>
   //
   // @method
   //==========================================================
   MO.FG3dLayout_bindBuffers = function FG3dLayout_bindBuffers(){
      var o = this;
      var context = o._graphicContext;
      var buffers = o._buffers;
      if(buffers){
         var count = buffers.count();
         for(var i = 0; i < count; i++){
            var buffer = buffers.at(i);
            context.bindVertexBuffer(buffer.slot, buffer.buffer, buffer.index, buffer.formatCd);
         }
      }
   }

   //==========================================================
   // <T>关联取样集合。</T>
   //
   // @method
   // @param samplers:TObjects 取样集合
   //==========================================================
   MO.FG3dLayout_linkSamplers = function FG3dLayout_linkSamplers(samplers){
      var o = this;
      if(!samplers.isEmpty()){
         var items = o._samplers;
         if(!items){
            items = o._samplers = new TObjects();
         }
         items.assign(samplers);
      }
   }

   //==========================================================
   // <T>绑定所有集合。</T>
   //
   // @method
   //==========================================================
   MO.FG3dLayout_bindSamplers = function FG3dLayout_bindSamplers(){
      var o = this;
      var context = o._graphicContext;
      var samplers = o._samplers;
      if(samplers){
         var count = samplers.count();
         for(var i = 0; i < count; i++){
            var sampler = samplers.at(i);
            context.bindTexture(sampler.slot, sampler.index, sampler.texture);
         }
      }
   }

   //==========================================================
   // <T>绑定所有集合。</T>
   //
   // @method
   //==========================================================
   MO.FG3dLayout_unbindSamplers = function FG3dLayout_unbindSamplers(){
      var o = this;
      var context = o._graphicContext;
      var samplers = o._samplers;
      if(samplers){
         var count = samplers.count();
         for(var i = 0; i < count; i++){
            var sampler = samplers.at(i);
            context.bindTexture(sampler.slot, sampler.index, null);
         }
      }
   }

   //==========================================================
   // <T>释放处理。</T>
   //
   // @method
   //==========================================================
   MO.FG3dLayout_dispose = function FG3dLayout_dispose(){
      var o = this;
      // 释放对象
      o._buffers = RObject.dispose(o._buffers);
      o._samplers = RObject.dispose(o._samplers);
      // 父处理
      o.__base.FG3dObject.dispose.call(o);
   }
}
