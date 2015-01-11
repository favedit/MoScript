//==========================================================
// <T>纹理控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FRd3TextureConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd  = EScope.Local;
   o._images   = null;
   o._textures = null;
   o._path     = '/assets/texture/';
   //..........................................................
   // @method
   o.construct = FRd3TextureConsole_construct;
   o.textures  = FRd3TextureConsole_textures;
   o.load      = FRd3TextureConsole_load;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FRd3TextureConsole_construct(){
   var o = this;
   o._images = new TDictionary();
   o._textures = new TDictionary();
}

//==========================================================
// <T>获得渲染纹理集合。</T>
//
// @method
// @return TDictionary 渲染纹理集合
//==========================================================
function FRd3TextureConsole_textures(){
   return this._textures;
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
function FRd3TextureConsole_load(pc, pt, pb){
   var o = this;
   var c = RString.toLower(pt + '/' + pb);
   // 查找模型
   var t = o._textures.get(c);
   if(t != null){
      return t;
   }
   // 获得路径
   var u = RBrowser.contentPath(o._path + c + '.jpg');
   RLogger.info(o, 'Load texture from bitmap. (url={1})', u);
   // 加载模型
   if(RString.toLower(pb) == 'environment'){
      t = RClass.create(FRd3TextureCube);
      t.linkContext(pc);
      t._name = c;
      t.load(RBrowser.contentPath(o._path + c));
   }else{
      t = RClass.create(FRd3Texture);
      t.linkContext(pc);
      t._name = c;
      t.load(u);
   }
   o._textures.set(c, t);
   return t;
}
