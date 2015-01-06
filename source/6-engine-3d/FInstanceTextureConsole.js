//==========================================================
// <T>纹理控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FInstanceTextureConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd  = EScope.Local;
   o._images   = null;
   o._textures = null;
   o._path     = '/assets/texture/';
   //..........................................................
   // @method
   o.construct = FInstanceTextureConsole_construct;
   o.textures  = FInstanceTextureConsole_textures;
   o.load      = FInstanceTextureConsole_load;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FInstanceTextureConsole_construct(){
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
function FInstanceTextureConsole_textures(){
   return this._textures;
}

//==========================================================
// <T>加载一个模型。</T>
//
// @method
// @param pc:content:FRenderContent 名称
// @param pn:name:String 名称
// @return FRenderModel 渲染模型
//==========================================================
function FInstanceTextureConsole_load(pc, pn){
   var o = this;
   // 查找模型
   var t = o._textures.get(pn);
   if(t != null){
      return t;
   }
   // 获得路径
   var u = RBrowser.contentPath() + o._path + pn;
   // 加载模型
   t = RClass.create(FInstanceTexture);
   t.linkContext(pc);
   t._name = pn;
   t.load(u);
   o._textures.set(pn, t);
   return t;
}
