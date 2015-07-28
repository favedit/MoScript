//==========================================================
// <T>图片资源控制台。</T>
//
// @console
// @author maocy
// @version 150707
//==========================================================
MO.FImageConsole = function FImageConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd  = MO.EScope.Global;
   // @attribute
   o._images   = null;
   //..........................................................
   // @method
   o.construct = MO.FImageConsole_construct;
   // @method
   o.create    = MO.FImageConsole_create;
   o.load      = MO.FImageConsole_load;
   // @method
   o.dispose   = MO.FImageConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FImageConsole_construct = function FImageConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置变量
   o._images = new MO.TDictionary();
}

//==========================================================
// <T>创建图片资源。</T>
//
// @method
// @param uri:String 网络地址
// @return FAudio 资源对象
//==========================================================
MO.FImageConsole_create = function FImageConsole_create(uri){
   var o = this;
   // 获得地址
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   // 加载地址
   var image = MO.Class.create(MO.FImageResource);
   image.loadUrl(url);
   return image;
}

//==========================================================
// <T>加载声音资源。</T>
//
// @method
// @param uri:String 网络地址
// @return FAudio 资源对象
//==========================================================
MO.FImageConsole_load = function FImageConsole_load(uri){
   var o = this;
   var images = o._images;
   var image = images.get(uri);
   if(!image){
      image = o.create(uri);
      images.set(uri, image);
   }
   return image;
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FImageConsole_dispose = function FImageConsole_dispose(){
   var o = this;
   // 清空变量
   o._images = MO.Lang.Object.dispose(o._images);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
