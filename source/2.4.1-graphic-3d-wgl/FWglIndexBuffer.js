//==========================================================
// <T>WebGL渲染索引流。</T>
//
// @class FObject
// @author maocy
// @history 141230
//==========================================================
function FWglIndexBuffer(o){
   o = RClass.inherits(this, o, FG3dIndexBuffer);
   //..........................................................
   // @method
   o.setup  = FWglIndexBuffer_setup;
   // @method
   o.upload = FWglIndexBuffer_upload;
   return o;
}

//==========================================================
// <T>配置处理。</T>
//
// @method
//==========================================================
function FWglIndexBuffer_setup(){
   var o = this;
   o.__base.FG3dIndexBuffer.setup.call(o);
   o._native = o._graphicContext._native.createBuffer();
}

//==========================================================
// <T>上传数据</T>
//
// @method
// @param pd:data:Uin16Array 数据
// @param pc:count:Integer 总数
//==========================================================
function FWglIndexBuffer_upload(pd, pc){
   var o = this;
   var c = o._graphicContext;
   var g = c._native;
   // 设置数据
   o._count = pc;
   // 获得数据
   var d = null;
   if((pd.constructor == Array) || (pd.constructor == ArrayBuffer)){
      d = new Uint16Array(pd);
   }else if(pd.constructor == Uint16Array){
      d = pd;
   }else{
      RLogger.fatal(o, null, 'Upload index data type is invalid. (value={1})', pd);
   }
   // 上传数据
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, o._native);
   c.checkError('bindBuffer', 'Bind buffer failure.');
   g.bufferData(g.ELEMENT_ARRAY_BUFFER, d, g.STATIC_DRAW);
   c.checkError('bufferData', 'Upload buffer data. (count={1})', pc);
}
