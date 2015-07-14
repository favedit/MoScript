//==========================================================
// <T>界面图像信息。</T>
//
// @struct
// @author maocy
// @version 150623
//==========================================================
MO.SGuiImage = function SGuiImage(){
   var o = this;
   //..........................................................
   // @method
   o.ready       = false;
   o.bitmap      = null;
   o.resource    = null;
   //..........................................................
   // @event
   o.onImageLoad = MO.SGuiImage_onImageLoad;
   //..........................................................
   // @method
   o.testReady   = MO.SGuiImage_testReady;
   o.load        = MO.SGuiImage_load;
   o.dispose     = MO.SGuiImage_dispose;
   return o;
}

//==========================================================
// <T>表单图片控件。</T>
//
// @class
// @author maocy
// @version 150610
//==========================================================
MO.SGuiImage_onImageLoad = function SGuiImage_onImageLoad(event){
   this.ready = true;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.SGuiImage_testReady = function SGuiImage_testReady(){
   return this.ready;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.SGuiImage_load = function SGuiImage_load(){
   var o = this;
   o.ready = false;
   var url = null;
   if(MO.Lang.String.startsWith(o.resource, 'url:')){
      var uri = o.resource.substring(4);
      url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   }else{
      throw new MO.TError('Invalid url.');
   }
   // 创建位图
   var bitmap = o.bitmap = MO.Class.create(MO.FImage);
   bitmap.addLoadListener(o, o.onImageLoad);
   bitmap.loadUrl(url);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.SGuiImage_dispose = function SGuiImage_dispose(){
   var o = this;
   o.bitmap = MO.RObject.dispose(o.bitmap);
   return o;
}
