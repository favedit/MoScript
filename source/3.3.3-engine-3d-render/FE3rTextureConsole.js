//==========================================================
// <T>纹理控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
function FE3rTextureConsole(o){
   o = RClass.inherits(this, o, FConsole);
   //..........................................................
   // @attribute
   o._scopeCd      = EScope.Local;
   // @attribute
   o._loadTextures = null;
   o._bitmaps      = null;
   o._textures     = null;
   // @attribute
   o._thread       = null;
   o._interval     = 200;
   //..........................................................
   // @event
   o.onProcess     = FE3rTextureConsole_onProcess;
   //..........................................................
   // @method
   o.construct     = FE3rTextureConsole_construct;
   // @method
   o.bitmaps       = FE3rTextureConsole_bitmaps;
   o.textures      = FE3rTextureConsole_textures;
   // @method
   o.load          = FE3rTextureConsole_load;
   o.loadBitmap    = FE3rTextureConsole_loadBitmap;
   return o;
}

//==========================================================
// <T>逻辑处理。</T>
//
// @method
//==========================================================
function FE3rTextureConsole_onProcess(){
   var o = this;
   var s = o._loadTextures;
   s.record();
   while(s.next()){
      var m = s.current();
      if(m.processLoad()){
         s.removeCurrent();
      }
   }
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FE3rTextureConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   // 设置属性
   o._loadTextures = new TLooper();
   o._bitmaps = new TDictionary();
   o._textures = new TDictionary();
   // 创建线程
   var t = o._thread = RClass.create(FThread);
   t.setInterval(o._interval);
   t.addProcessListener(o, o.onProcess);
   RConsole.find(FThreadConsole).start(t);
}

//==========================================================
// <T>获得渲染纹理集合。</T>
//
// @method
// @return TDictionary 渲染纹理集合
//==========================================================
function FE3rTextureConsole_bitmaps(){
   return this._bitmaps;
}

//==========================================================
// <T>获得渲染纹理集合。</T>
//
// @method
// @return TDictionary 渲染纹理集合
//==========================================================
function FE3rTextureConsole_textures(){
   return this._textures;
}

//==========================================================
// <T>加载一个模型。</T>
//
// @method
// @param pc:content:FRenderContent 名称
// @param pt:textureCode:String 纹理代码
// @return FE3rTexture 渲染模型
//==========================================================
function FE3rTextureConsole_load(pc, pt){
   var o = this;
   // 查找纹理
   var s = o._textures;
   var t = s.get(pt);
   if(t){
      return t;
   }
   // 加载资源
   var rc = RConsole.find(FE3sTextureConsole);
   var r = rc.load(pt);
   // 创建纹理
   t = RClass.create(FE3rTexture);
   t.linkGraphicContext(pc);
   t.setResource(r);
   s.set(pt, t);
   // 放入处理队列
   o._loadTextures.push(t);
   return t;
}

//==========================================================
// <T>加载一个模型。</T>
//
// @method
// @param pc:content:FRenderContent 名称
// @param pt:textureGuid:String 纹理编号
// @param pb:bitmapGuid:String 位图编号
// @return FE3rTexture 渲染模型
//==========================================================
function FE3rTextureConsole_loadBitmap(pc, pt, pb){
   var o = this;
   // 查找位图
   var b = o._bitmaps.get(pb);
   if(b){
      return b;
   }
   // 查找纹理
   var t = o.load(pc, pt);
   return t.loadBitmap(pb);
}
