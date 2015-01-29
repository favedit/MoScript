//==========================================================
// <T>纹理控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FNetRd3BitmapConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd  = EScope.Local;
   o._bitmaps  = null;
   o._dataUrl  = '/cloud.content.texture.bitmap.wv'
   //..........................................................
   // @method
   o.construct = FNetRd3BitmapConsole_construct;
   o.bitmaps   = FNetRd3BitmapConsole_bitmaps;
   o.load      = FNetRd3BitmapConsole_load;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FNetRd3BitmapConsole_construct(){
   var o = this;
   o._bitmaps = new TDictionary();
}

//==========================================================
// <T>获得渲染纹理集合。</T>
//
// @method
// @return TDictionary 渲染纹理集合
//==========================================================
function FNetRd3BitmapConsole_bitmaps(){
   return this._bitmaps;
}

//==========================================================
// <T>加载一个模型。</T>
//
// @method
// @param pc:content:FRenderContent 名称
// @param pt:textureCode:String 纹理代码
// @param pb:bitmapCode:String 位图代码
// @return FRd3Texture 渲染模型
//==========================================================
function FNetRd3BitmapConsole_load(pc, pg, pt){
   var o = this;
   // 查找模型
   var t = o._bitmaps.get(pg);
   if(t){
      return t;
   }
   // 生成地址
   var u = RBrowser.hostPath(o._dataUrl + '?code=' + pg);
   RLogger.info(o, 'Load texture from bitmap. (url={1})', u);
   // 加载模型
   if(RString.toLower(pt) == 'environment'){
      t = RClass.create(FRd3TextureCube);
      t.linkContext(pc);
      t._name = c;
      t.load(RBrowser.contentPath(o._path + c));
   }else{
      t = RClass.create(FRd3Texture);
      t.linkContext(pc);
      t._name = pg;
      t.load(u);
   }
   o._bitmaps.set(pg, t);
   return t;
}
