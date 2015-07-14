//==========================================================
// <T>纹理控制台。</T>
//
// @console
// @author maocy
// @version 150106
//==========================================================
MO.FE3dShapeConsole = function FE3dShapeConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   //..........................................................
   // @attribute
   o._scopeCd  = MO.EScope.Local;
   o._bitmaps  = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   //..........................................................
   // @method
   o.construct = MO.FE3dShapeConsole_construct;
   // @method
   o.load      = MO.FE3dShapeConsole_load;
   o.loadUrl   = MO.FE3dShapeConsole_loadUrl;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
MO.FE3dShapeConsole_construct = function FE3dShapeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._bitmaps = new MO.TDictionary();
}

//==========================================================
// <T>加载一个渲染位图。</T>
//
// @method
// @param context:FGraphicContext 渲染环境
// @param guid:String 材质唯一编号
// @param code:String 位图代码
// @return FE3rBitmap 渲染位图
//==========================================================
MO.FE3dShapeConsole_load = function FE3dShapeConsole_load(context, guid, code){
   var o = this;
   // 查找模型
   var flag = guid + '|' + code;
   var bitmap = o._bitmaps.get(flag);
   if(bitmap){
      return bitmap;
   }
   // 生成地址
   var url = MO.Window.Browser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
   MO.Logger.info(o, 'Load bitmap. (url={1})', url);
   // 加载模型
   if(code == 'environment'){
      bitmap = MO.Class.create(MO.FE3rBitmapCubePack);
   }else{
      bitmap = MO.Class.create(MO.FE3rBitmapFlatPack);
   }
   bitmap.linkGraphicContext(context);
   bitmap.loadUrl(url);
   o._bitmaps.set(flag, bitmap);
   return bitmap;
}

//==========================================================
// <T>加载一个模型。</T>
//
// @method
// @param context:FRenderContext 渲染上下文
// @param url:String 网络地址
// @return FE3rBitmap 渲染位图
//==========================================================
MO.FE3dShapeConsole_loadUrl = function FE3dShapeConsole_loadUrl(context, url){
   var o = this;
   // 查找图片
   var bitmap = o._bitmaps.get(url);
   if(bitmap){
      return bitmap;
   }
   // 生成地址
   var loadUrl = MO.Window.Browser.contentPath(url);
   MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
   // 创建渲染位图
   var bitmap = MO.Class.create(MO.FE3dBitmapData);
   bitmap.linkGraphicContext(context);
   bitmap.setup();
   bitmap.loadUrl(url);
   o._bitmaps.set(url, bitmap);
   return bitmap;
}
