//==========================================================
// <T>文件读取器。</T>
//
// @class
// @author maocy
// @version 150401
//==========================================================
function FFileReader(o){
   o = RClass.inherits(this, o, FObject, MListenerLoad);
   //..........................................................
   // @attribute
   o._reader        = null;
   // @attribute
   o._fileName      = null;
   o._length        = 0;
   o._data          = null;
   // @attribute
   o._statusLoading = false;
   //..........................................................
   // @event
   o.ohloadStart    = FFileReader_ohLoadStart;
   o.ohLoad         = FFileReader_ohLoad;
   o.ohLoadEnd      = FFileReader_ohLoadEnd;
   o.ohProgress     = FFileReader_ohProgress;
   //..........................................................
   // @method
   o.construct      = FFileReader_construct;
   // @method
   o.fileName       = FFileReader_fileName;
   o.length         = FFileReader_length;
   o.data           = FFileReader_data;
   // @method
   o.loadFile       = FFileReader_loadFile;
   // @method
   o.dispose        = FFileReader_dispose;
   return o;
}

//==========================================================
// <T>开始加载处理。</T>
//
// @method
//==========================================================
function FFileReader_ohLoadStart(){
   var o = this.__linker;
}

//==========================================================
// <T>加载中处理。</T>
//
// @method
//==========================================================
function FFileReader_ohLoad(){
   var o = this.__linker;
}

//==========================================================
// <T>加载完成处理。</T>
//
// @method
//==========================================================
function FFileReader_ohLoadEnd(){
   var o = this.__linker;
   var reader = o._reader;
   o._statusFree = true;
   if(reader.error){
      debugger
      RLogger.error(o, 'Load file failure. (error={1])', reader.error);
   }else{
      // 设置属性
      o._length = reader.result.byteLength;
      o._data = reader.result;
      // 完成处理
      var event = new SEvent(o);
      o.processLoadListener(event);
      event.dispose();
   }
}

//==========================================================
// <T>加载进度响应处理。</T>
//
// @method
//==========================================================
function FFileReader_ohProgress(){
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FFileReader_construct(){
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
// <T>获得文件名称。</T>
//
// @method
// @rturn String 文件名称
//==========================================================
function FFileReader_fileName(){
   return this._fileName;
}

//==========================================================
// <T>获得数据长度。</T>
//
// @method
// @rturn Integer 数据长度
//==========================================================
function FFileReader_length(){
   return this._length;
}

//==========================================================
// <T>获得数据。</T>
//
// @method
// @return ArrayBuffer 数据
//==========================================================
function FFileReader_data(){
   return this._data;
}

//==========================================================
// <T>加载文件数据。</T>
//
// @method
// @param file:Object 文件数据
//==========================================================
function FFileReader_loadFile(file){
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
function FFileReader_dispose(){
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
