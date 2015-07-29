//==========================================================
// <T>音乐资源控制台。</T>
//
// @console
// @author maocy
// @version 150707
//==========================================================
MO.FAudioConsole = function FAudioConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd  = MO.EScope.Global;
   // @attribute
   o._audios   = null;
   //..........................................................
   // @method
   o.construct = MO.FAudioConsole_construct;
   // @method
   o.create    = MO.FAudioConsole_create;
   o.load      = MO.FAudioConsole_load;
   o.select    = MO.FAudioConsole_select;
   // @method
   o.dispose   = MO.FAudioConsole_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FAudioConsole_construct = function FAudioConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置变量
   o._audios = new MO.TDictionary();
}

//==========================================================
// <T>创建声音资源。</T>
//
// @method
// @param uri:String 网络地址
// @return FAudio 资源对象
//==========================================================
MO.FAudioConsole_create = function FAudioConsole_create(uri){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var audio = MO.Class.create(MO.FAudioResource);
   audio.loadUrl(url);
   return audio;
}

//==========================================================
// <T>加载声音资源。</T>
//
// @method
// @param uri:String 网络地址
// @return FAudio 资源对象
//==========================================================
MO.FAudioConsole_load = function FAudioConsole_load(uri){
   var o = this;
   var audios = o._audios;
   var audio = audios.get(uri);
   if(!audio){
      audio = o.create(uri);
      audios.set(uri, audio);
   }
   return audio;
}

//==========================================================
// <T>选择处理。</T>
//
// @method
//==========================================================
MO.FAudioConsole_select = function FAudioConsole_select(){
   var o = this;
   var audios = o._audios;
   var count = audios.count();
   for(var i = 0; i < count; i++){
      var audio = audios.at(i);
      audio.select();
   }
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
MO.FAudioConsole_dispose = function FAudioConsole_dispose(){
   var o = this;
   // 清空变量
   o._audios = MO.Lang.Object.dispose(o._audios);
   // 父处理
   o.__base.FConsole.dispose.call(o);
}
