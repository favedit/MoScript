//==========================================================
// <T>文件读取器。</T>
//
// @class
// @author maocy
// @version 150401
//==========================================================
MO.FFileReader = function FFileReader(o){
   o = RClass.inherits(this, o, MO.FObject, MO.MListenerLoad);
   //..........................................................
   // @attribute
   o._reader        = null;
   // @attribute
   o._fileName      = MO.Class.register(o, new MO.AGetter('_fileName'));
   o._length        = MO.Class.register(o, new MO.AGetter('_length'), 0);
   o._data          = MO.Class.register(o, new MO.AGetter('_data'));
   // @attribute
   o._statusLoading = false;
   //..........................................................
   // @event
   o.ohloadStart    = MO.FFileReader_ohLoadStart;
   o.ohLoad         = MO.FFileReader_ohLoad;
   o.ohLoadEnd      = MO.FFileReader_ohLoadEnd;
   o.ohProgress     = MO.FFileReader_ohProgress;
   //..........................................................
   // @method
   o.construct      = MO.FFileReader_construct;
   // @method
   o.loadFile       = MO.FFileReader_loadFile;
   // @method
   o.dispose        = MO.FFileReader_dispose;
   return o;
}

//==========================================================
// <T>开始加载处理。</T>
//
// @method
//==========================================================
MO.FFileReader_ohLoadStart = function FFileReader_ohLoadStart(){
   var o = this.__linker;
}

//==========================================================
// <T>加载中处理。</T>
//
// @method
//==========================================================
MO.FFileReader_ohLoad = function FFileReader_ohLoad(){
   var o = this.__linker;
}

//==========================================================
// <T>加载完成处理。</T>
//
// @method
//==========================================================
MO.FFileReader_ohLoadEnd = function FFileReader_ohLoadEnd(){
   var o = this.__linker;
   var reader = o._reader;
   o._statusFree = true;
   if(reader.error){
      MO.Logger.error(o, 'Load file failure. (error={1])', reader.error);
   }else{
      // 设置属性
      o._length = reader.result.byteLength;
      o._data = reader.result;
      // 完成处理
      var event = new MO.SEvent(o);
      o.processLoadListener(event);
      event.dispose();
   }
}

//==========================================================
// <T>加载进度响应处理。</T>
//
// @method
//==========================================================
MO.FFileReader_ohProgress = function FFileReader_ohProgress(){
   var o = this.__linker;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FFileReader_construct = function FFileReader_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   // 创建读取器
   var reader = o._reader = new FileReader(); 
   reader.__linker = o;
   reader.onloadstart = o.ohLoadStart;
   reader.onload = o.ohLoad;
   reader.onloadend = o.ohLoadEnd;
   reader.onprogress = o.ohProgress;
}

//==========================================================
// <T>加载文件数据。</T>
//
// @method
// @param file:Object 文件数据
//==========================================================
MO.FFileReader_loadFile = function FFileReader_loadFile(file){
   var o = this;
   o._fileName = file.name;
   o._length = file.size;
   var reader = o._reader;
   reader.readAsArrayBuffer(file);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FFileReader_dispose = function FFileReader_dispose(){
   var o = this;
   // 释放属性
   var reader = o._reader = new FileReader(); 
   reader.__linker = null;
   reader.onloadstart = null;
   reader.onload = null;
   reader.onloadend = null;
   reader.onprogress = null;
   o._reader = null;
   o._fileName = null;
   o._data = null;
   // 父处理
   o.__base.MListenerLoad.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
