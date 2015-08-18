MO.EGraphicError = new function EGraphicError(){
   var o = this;
   o.Unsupport2d    = 'unsupport.2d';
   o.UnsupportWebGL = 'unsupport.webgL';
   return o;
}
MO.MCanvasObject = function MCanvasObject(o){
   o = MO.Class.inherits(this, o);
   o.htmlCanvas = MO.Method.virtual(o, 'htmlCanvas');
   return o;
}
MO.MGraphicObject = function MGraphicObject(o){
   o = MO.Class.inherits(this, o);
   o._graphicContext    = MO.Class.register(o, new MO.AGetter('_graphicContext'));
   o.linkGraphicContext = MO.MGraphicObject_linkGraphicContext;
   o.dispose            = MO.MGraphicObject_dispose;
   return o;
}
MO.MGraphicObject_linkGraphicContext = function MGraphicObject_linkGraphicContext(context){
   var o = this;
   if(MO.Class.isClass(context, MO.FGraphicContext)){
      o._graphicContext = context;
   }else if(MO.Class.isClass(context, MO.MGraphicObject)){
      o._graphicContext = context.graphicContext();
   }else{
      throw new MO.TError(o, 'Link graphic context failure. (context={1})', context);
   }
   MO.Assert.debugNotNull(o._graphicContext);
}
MO.MGraphicObject_dispose = function MGraphicObject_dispose(){
   var o = this;
   o._graphicContext = null;
}
MO.MGraphicRenderable = function MGraphicRenderable(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o.process = MO.Method.empty;
   return o;
}
MO.Graphic = new function MoGraphicSpace(){
   return this;
}
MO.FFloatStream = function FFloatStream(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._length     = MO.Class.register(o, new MO.AGetter('_length'), 0);
   o._memory     = MO.Class.register(o, new MO.AGetter('_memory'), null);
   o._position   = 0;
   o.construct   = MO.FFloatStream_construct;
   o.setLength   = MO.FFloatStream_setLength;
   o.writeFloat4 = MO.FFloatStream_writeFloat4;
   o.writeColor4 = MO.FFloatStream_writeColor4;
   o.reset       = MO.FFloatStream_reset;
   o.clear       = MO.FFloatStream_clear;
   o.dispose     = MO.FFloatStream_dispose;
   return o;
}
MO.FFloatStream_construct = function FFloatStream_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FFloatStream_setLength = function FFloatStream_setLength(length){
   var o = this;
   o._length = length;
   o._memory = new Float32Array(length);
}
MO.FFloatStream_writeFloat4 = function FFloatStream_writeFloat4(value1, value2, value3, value4){
   var o = this;
   o._memory[o._position++] = value1;
   o._memory[o._position++] = value2;
   o._memory[o._position++] = value3;
   o._memory[o._position++] = value4;
}
MO.FFloatStream_writeColor4 = function FFloatStream_writeColor4(value){
   this.writeFloat4(value.red, value.green, value.blue, value.alpha);
}
MO.FFloatStream_reset = function FFloatStream_reset(){
   this._position = 0;
}
MO.FFloatStream_clear = function FFloatStream_clear(){
   this._position = 0;
}
MO.FFloatStream_dispose = function FFloatStream_dispose(){
   var o = this;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
MO.FGraphicContext = function FGraphicContext(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._size      = MO.Class.register(o, new MO.AGetter('_size'));
   o._hCanvas   = MO.Class.register(o, new MO.AGetter('_hCanvas', 'htmlCanvas'));
   o.construct  = MO.FGraphicContext_construct;
   o.linkCanvas = MO.Method.virtual(o, 'linkCanvas');
   o.dispose    = MO.FGraphicContext_dispose;
   return o;
}
MO.FGraphicContext_construct = function FGraphicContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new MO.SSize2(1280, 720);
}
MO.FGraphicContext_dispose = function FGraphicContext_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
   o._hCanvas = null;
   o.__base.FObject.dispose.call(o);
}
MO.SBorder = function SBorder(){
   var o = this;
   o.valid    = false;
   o.left     = new MO.SBorderLine();
   o.top      = new MO.SBorderLine();
   o.right    = new MO.SBorderLine();
   o.bottom   = new MO.SBorderLine();
   o.parse    = MO.SBorder_parse;
   o.toString = MO.SBorder_toString;
   o.dispose  = MO.SBorder_dispose;
   return o;
}
MO.SBorder_parse = function SBorder_parse(source){
   var o = this;
   var items = source.split(',')
   if(items.length == 4){
      o.left.parse(items[0]);
      o.top.parse(items[1]);
      o.right.parse(items[2]);
      o.bottom.parse(items[3]);
   }else{
      throw new MO.TError(o, "Parse value failure. (source={1})", source);
   }
}
MO.SBorder_toString = function SBorder_toString(){
   var o = this;
   return o.left + ',' + o.top + ',' + o.right + ',' + o.bottom;
}
MO.SBorder_dispose = function SBorder_dispose(){
   var o = this;
   o.left = MO.RObject.dispose(o.left)
   o.top = MO.RObject.dispose(o.top)
   o.right = MO.RObject.dispose(o.right)
   o.bottom = MO.RObject.dispose(o.bottom)
}
MO.SBorderLine = function SBorderLine(width, style, color){
   var o = this;
   o.width    = MO.Runtime.nvl(width, 1);
   o.style    = MO.Runtime.nvl(style, 'solid');
   o.color    = MO.Runtime.nvl(color, '#FFFFFF');
   o.parse    = MO.SBorderLine_parse;
   o.toString = MO.SBorderLine_toString;
   o.dispose  = MO.SBorderLine_dispose;
   return o;
}
MO.SBorderLine_parse = function SBorderLine_parse(source){
   var o = this;
   var items = source.split(' ')
   if(items.length == 3){
      o.width = parseInt(items[0]);
      o.style = items[1];
      o.color = items[2];
   }else{
      throw new TError(o, "Parse value failure. (source={1})", source);
   }
}
MO.SBorderLine_toString = function SBorderLine_toString(){
   var o = this;
   return o.width + ' ' + o.style + ' ' + o.color;
}
MO.SBorderLine_dispose = function SBorderLine_dispose(){
   var o = this;
   o.width = null;
   o.style = null;
   o.color = null;
}
MO.FG2dObject = function FG2dObject(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o.setup   = MO.FG2dObject_setup;
   o.dispose = MO.FG2dObject_dispose;
   return o;
}
MO.FG2dObject_setup = function FG2dObject_setup(){
}
MO.FG2dObject_dispose = function FG2dObject_dispose(){
   var o = this;
   o.__base.MGraphicObject.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FG2dContext = function FG2dContext(o){
   o = MO.Class.inherits(this, o, MO.FGraphicContext);
   o._globalScale = MO.Class.register(o, new MO.AGetter('_globalScale'));
   o._scale       = MO.Class.register(o, new MO.AGetter('_scale'));
   o.construct    = MO.FG2dContext_construct;
   o.linkCanvas   = MO.FG2dContext_linkCanvas;
   o.dispose      = MO.FG2dContext_dispose;
   return o;
}
MO.FG2dContext_construct = function FG2dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
   o._globalScale = new MO.SSize2(1, 1);
   o._scale = new MO.SSize2(1, 1);
}
MO.FG2dContext_linkCanvas = function FG2dContext_linkCanvas(hCanvas){
   var o = this;
   o._size.set(hCanvas.width, hCanvas.height);
}
MO.FG2dContext_dispose = function FG2dContext_dispose(){
   var o = this;
   o._globalScale = MO.Lang.Object.dispose(o._globalScale);
   o._scale = MO.Lang.Object.dispose(o._scale);
   o.__base.FGraphicContext.dispose.call(o);
}
MO.FG2dCanvasContext = function FG2dCanvasContext(o) {
   o = MO.Class.inherits(this, o, MO.FG2dContext);
   o._handle              = null;
   o._gridSourceX         = null;
   o._gridSourceY         = null;
   o._gridSourceWidth     = null;
   o._gridSourceHeight    = null;
   o._gridDrawX           = null;
   o._gridDrawY           = null;
   o._gridDrawWidth       = null;
   o._gridDrawHeight      = null;
   o.construct            = MO.FG2dCanvasContext_construct;
   o.linkCanvas           = MO.FG2dCanvasContext_linkCanvas;
   o.setGlobalScale       = MO.FG2dCanvasContext_setGlobalScale;
   o.setScale             = MO.FG2dCanvasContext_setScale;
   o.setAlpha             = MO.FG2dCanvasContext_setAlpha;
   o.setFont              = MO.FG2dCanvasContext_setFont;
   o.store                = MO.FG2dCanvasContext_store;
   o.restore              = MO.FG2dCanvasContext_restore;
   o.prepare              = MO.FG2dCanvasContext_prepare;
   o.clear                = MO.FG2dCanvasContext_clear;
   o.clearRectangle       = MO.FG2dCanvasContext_clearRectangle;
   o.clip                 = MO.FG2dCanvasContext_clip;
   o.textWidth            = MO.FG2dCanvasContext_textWidth;
   o.createLinearGradient = MO.FG2dCanvasContext_createLinearGradient;
   o.drawLine             = MO.FG2dCanvasContext_drawLine;
   o.drawRectangle        = MO.FG2dCanvasContext_drawRectangle;
   o.drawTriangle         = MO.FG2dCanvasContext_drawTriangle;
   o.drawCircle           = MO.FG2dCanvasContext_drawCircle;
   o.drawText             = MO.FG2dCanvasContext_drawText;
   o.drawImage            = MO.FG2dCanvasContext_drawImage;
   o.drawGridImage        = MO.FG2dCanvasContext_drawGridImage;
   o.drawQuadrilateral    = MO.FG2dCanvasContext_drawQuadrilateral;
   o.drawBorderLine       = MO.FG2dCanvasContext_drawBorderLine;
   o.drawBorder           = MO.FG2dCanvasContext_drawBorder;
   o.fillRectangle        = MO.FG2dCanvasContext_fillRectangle;
   o.toBytes              = MO.FG2dCanvasContext_toBytes;
   return o;
}
MO.FG2dCanvasContext_construct = function FG2dCanvasContext_construct() {
   var o = this;
   o.__base.FG2dContext.construct.call(o);
   o._gridSourceX = new Array(3);
   o._gridSourceY = new Array(3);
   o._gridSourceWidth = new Array(3);
   o._gridSourceHeight = new Array(3);
   o._gridDrawX = new Array(3);
   o._gridDrawY = new Array(3);
   o._gridDrawWidth = new Array(3);
   o._gridDrawHeight = new Array(3);
}
MO.FG2dCanvasContext_linkCanvas = function FG2dCanvasContext_linkCanvas(hCanvas) {
   var o = this;
   o.__base.FG2dContext.linkCanvas.call(o, hCanvas);
   if (hCanvas.getContext) {
      var handle = hCanvas.getContext('2d');
      if (!handle) {
         throw new MO.TError(o, "Current browser can't support Context2D technique.");
      }
      o._handle = handle;
   }
   o._hCanvas = hCanvas;
}
MO.FG2dCanvasContext_setGlobalScale = function FG2dCanvasContext_setGlobalScale(width, height){
   var o = this;
   o._globalScale.set(width, height);
   o._handle.scale(width, height);
}
MO.FG2dCanvasContext_setScale = function FG2dCanvasContext_setScale(width, height){
   var o = this;
   if(!o._scale.equalsData(width, height)){
      o._handle.scale(width, height);
      o._scale.set(width, height);
   }
}
MO.FG2dCanvasContext_setAlpha = function FG2dCanvasContext_setAlpha(alpha){
   var o = this;
   this._handle.globalAlpha = alpha;
}
MO.FG2dCanvasContext_setFont = function FG2dCanvasContext_setFont(font) {
   this._handle.font = font;
}
MO.FG2dCanvasContext_store = function FG2dCanvasContext_store(){
   this._handle.save();
}
MO.FG2dCanvasContext_restore = function FG2dCanvasContext_restore(){
   this._handle.restore();
}
MO.FG2dCanvasContext_prepare = function FG2dCanvasContext_prepare(){
   var o = this;
   var scale = o._globalScale;
   o._handle.setTransform(scale.width, 0, 0, scale.height, 0, 0);
}
MO.FG2dCanvasContext_clear = function FG2dCanvasContext_clear(){
   var o = this;
   var size = o._size;
   var handle = o._handle;
   var hCanvas = handle.canvas;
   handle.save();
   handle.setTransform(1, 0, 0, 1, 0, 0);
   o._handle.clearRect(0, 0, size.width, size.height);
   handle.restore();
}
MO.FG2dCanvasContext_clearRectangle = function FG2dCanvasContext_clearRectangle(rectangle){
   this._handle.clearRect(rectangle.left, rectangle.top, rectangle.width, rectangle.height);
}
MO.FG2dCanvasContext_clip = function FG2dCanvasContext_clip(left, top, width, height){
   var o = this;
   var handle = o._handle;
   handle.beginPath();
   handle.rect(left, top, width, height);
   handle.clip();
}
MO.FG2dCanvasContext_textWidth = function FG2dCanvasContext_textWidth(text){
   var info = this._handle.measureText(text);
   return info.width;
}
MO.FG2dCanvasContext_createLinearGradient = function FG2dCanvasContext_createLinearGradient(x1, y1, x2, y2) {
   var o = this;
   var handle = o._handle;
   return handle.createLinearGradient(x1, y1, x2, y2);
}
MO.FG2dCanvasContext_drawLine = function FG2dCanvasContext_drawLine(x1, y1, x2, y2, color, lineWidth) {
   var o = this;
   var handle = o._handle;
   handle.strokeStyle = color;
   handle.lineWidth = lineWidth;
   handle.beginPath();
   handle.moveTo(x1, y1);
   handle.lineTo(x2, y2);
   handle.closePath();
   handle.stroke();
}
MO.FG2dCanvasContext_drawRectangle = function FG2dCanvasContext_drawRectangle(x, y, width, height, color, lineWidth) {
   var o = this;
   var handle = o._handle;
   handle.strokeStyle = color;
   handle.lineWidth = lineWidth;
   handle.strokeRect(x, y, width, height);
}
MO.FG2dCanvasContext_drawText = function FG2dCanvasContext_drawText(text, x, y, color) {
   var o = this;
   var handle = o._handle;
   handle.fillStyle = color;
   handle.fillText(text, x, y);
}
MO.FG2dCanvasContext_drawImage = function FG2dCanvasContext_drawImage(content, x, y, width, height){
   var o = this;
   var handle = o._handle;
   var size = o._size;
   var data = null
   if(content.tagName == 'IMG'){
      data = content;
   }else if(MO.Class.isClass(content, MO.FImage)){
      if(!content.testReady()){
         return;
      }
      data = content.image();
      if(width == null){
         width = data.size().width;
      }
      if(height == null){
         height = data.size().height;
      }
   }else{
      throw new MO.TError(o, 'Unknown content type');
   }
   handle.drawImage(data, x, y, width, height);
}
MO.FG2dCanvasContext_drawGridImage = function FG2dCanvasContext_drawGridImage(content, x, y, width, height, padding) {
   var o = this;
   var handle = o._handle;
   var data = null
   if (MO.Class.isClass(content, MO.FImage)) {
      if(!content.testReady()){
         return;
      }
      data = content.image();
   } else {
      throw new TError(o, 'Unknown content type');
   }
   var ssize = content.size();
   var sx = o._gridSourceX;
   sx[0] = 0;
   sx[1] = padding.left;
   sx[2] = ssize.width - padding.right;
   var sy = o._gridSourceY;
   sy[0] = 0;
   sy[1] = padding.top;
   sy[2] = ssize.height - padding.bottom;
   var dx = o._gridDrawX;
   dx[0] = x;
   dx[1] = x + padding.left;
   dx[2] = x + width - padding.right;
   var dy = o._gridDrawY;
   dy[0] = y;
   dy[1] = y + padding.top;
   dy[2] = y + height - padding.bottom;
   var sw = o._gridSourceWidth;
   sw[0] = padding.left;
   sw[1] = ssize.width - padding.left - padding.right;
   sw[2] = padding.right;
   var sh = o._gridSourceHeight;
   sh[0] = padding.top;
   sh[1] = ssize.height - padding.top - padding.bottom;
   sh[2] = padding.bottom;
   var dw = o._gridDrawWidth;
   dw[0] = padding.left;
   dw[1] = width - padding.left - padding.right;
   dw[2] = padding.right;
   var dh = o._gridDrawHeight;
   dh[0] = padding.top;
   dh[1] = height - padding.top - padding.bottom;
   dh[2] = padding.bottom;
   for (var i = 0; i < 9; i++) {
      var row = parseInt(i / 3);
      var column = i % 3;
      if (dh[row] > 0 && dw[column] > 0) {
         handle.drawImage(data, sx[column], sy[row], sw[column], sh[row], dx[column], dy[row], dw[column], dh[row]);
      }
   }
}
MO.FG2dCanvasContext_drawImageRectangle = function FG2dCanvasContext_drawImageRectangle(content, rectangle){
   return this.drawImage(content, rectangle.left, rectangle.top, rectangle.width, rectangle.height);
}
MO.FG2dCanvasContext_drawBorderLine = function FG2dCanvasContext_drawBorderLine(x1, y1, x2, y2, borderLine){
   var o = this;
   var handle = o._handle;
   handle.strokeStyle = borderLine.color;
   handle.lineWidth = borderLine.width;
   handle.beginPath();
   handle.moveTo(x1 + 0.5, y1 + 0.5);
   handle.lineTo(x2 + 0.5, y2 + 0.5);
   handle.closePath();
   handle.stroke();
}
MO.FG2dCanvasContext_drawBorder = function FG2dCanvasContext_drawBorder(rectangle, border) {
   var o = this;
   var left = rectangle.left;
   var top = rectangle.top;
   var right = rectangle.left + rectangle.width - 1;
   var bottom = rectangle.top + rectangle.height - 1;
   o.drawBorderLine(left, bottom, left, top, border.left);
   o.drawBorderLine(left - 0.5, top, right + 0.5, top, border.top);
   o.drawBorderLine(right, top, right, bottom, border.right);
   o.drawBorderLine(left - 0.5, bottom, right + 0.5, bottom, border.bottom);
}
MO.FG2dCanvasContext_fillRectangle = function FG2dCanvasContext_fillRectangle(x, y, width, height, color) {
   var o = this;
   var handle = o._handle;
   handle.fillStyle = color;
   handle.beginPath();
   handle.fillRect(x, y, width, height);
   handle.closePath();
}
MO.FG2dCanvasContext_drawQuadrilateral = function FG2dCanvasContext_drawQuadrilateral(x1, y1, x2, y2, x3, y3, x4, y4, lineWidth, strokeColor, fillColor) {
   var o = this;
   var handle = o._handle;
   handle.beginPath();
   handle.lineWidth = lineWidth;
   handle.strokeStyle = strokeColor;
   handle.fillStyle = fillColor;
   handle.moveTo(x1 + 0.5, y1 + 0.5);
   handle.lineTo(x2 + 0.5, y2 + 0.5);
   handle.lineTo(x3 + 0.5, y3 + 0.5);
   handle.lineTo(x4 + 0.5, y4 + 0.5);
   handle.lineTo(x1 + 0.5, y1 + 0.5);
   handle.closePath();
   if(lineWidth != null && strokeColor != null){
      handle.stroke();
   }
   if (fillColor != null) {
      handle.fill();
   }
}
MO.FG2dCanvasContext_drawTriangle = function FG2dCanvasContext_drawTriangle(x1, y1, x2, y2, x3, y3, lineWidth, strokeColor, fillColor) {
   var o = this;
   var handle = o._handle;
   handle.lineWidth = lineWidth;
   handle.strokeStyle = strokeColor;
   handle.fillStyle = fillColor;
   handle.beginPath();
   handle.moveTo(x1 + 0.5, y1 + 0.5);
   handle.lineTo(x2 + 0.5, y2 + 0.5);
   handle.lineTo(x3 + 0.5, y3 + 0.5);
   handle.closePath();
   handle.fill();
   handle.stroke();
}
MO.FG2dCanvasContext_drawCircle = function FG2dCanvasContext_drawCircle(x, y, radius, lineWidth, strokeColor, fillColor) {
   var o = this;
   var handle = o._handle;
   handle.lineWidth = lineWidth;
   handle.strokeStyle = strokeColor;
   handle.fillStyle = fillColor;
   handle.beginPath();
   handle.arc(x, y, radius, 0, 2 * Math.PI, false);
   handle.closePath();
   handle.fill();
   handle.stroke();
}
MO.FG2dCanvasContext_toBytes = function FG2dCanvasContext_toBytes() {
   var o = this;
   var size = o._size;
   return o._handle.getImageData(0, 0, size.width, size.height);
}
MO.EG3dMaterialMap = new function EG3dMaterialMap(){
   var o = this;
   o.AmbientColor = 0;
   o.DiffuseColor = 1;
   o.SpecularColor = 2;
   o.ReflectColor = 3;
   o.EmissiveColor = 4;
   o.Count = 8;
   return o;
}
MO.EG3dRegionParameter = new function EG3dRegionParameter(){
   var o = this;
   o.Unknown                    = 0;
   o.CameraPosition             = 1;
   o.CameraDirection            = 2;
   o.CameraViewMatrix           = 3;
   o.CameraProjectionMatrix     = 4;
   o.CameraViewProjectionMatrix = 5;
   o.LightPosition              = 6;
   o.LightDirection             = 7;
   o.LightViewMatrix            = 8;
   o.LightProjectionMatrix      = 9;
   o.LightViewProjectionMatrix  = 10;
   o.LightInfo                  = 11;
   return o;
}
MO.EG3dTechniqueMode = new function EG3dTechniqueMode(){
   var o = this;
   o.Color         = 'color';
   o.Ambient       = 'ambient';
   o.DiffuseLevel  = 'diffuse.level';
   o.DiffuseColor  = 'diffuse.color';
   o.SpecularLevel = 'specular.level';
   o.SpecularColor = 'specular.color';
   o.Reflect       = 'reflect';
   o.Emissive      = 'emissive';
   o.Result        = 'result';
   return o;
}
MO.MG3dRegion = function MG3dRegion(o){
   o = MO.Class.inherits(this, o);
   o._changed                    = false;
   o._spaceName                  = MO.Class.register(o, new MO.AGetter('_spaceName'));
   o._technique                  = MO.Class.register(o, new MO.AGetSet('_technique'));
   o._techniquePass              = MO.Class.register(o, new MO.AGetter('_techniquePass'));
   o._camera                     = MO.Class.register(o, new MO.AGetter('_camera'));
   o._projection                 = null;
   o._directionalLight           = MO.Class.register(o, new MO.AGetter('_directionalLight'));
   o._lights                     = MO.Class.register(o, new MO.AGetter('_lights'));
   o._allRenderables             = MO.Class.register(o, new MO.AGetter('_allRenderables'));
   o._renderables                = MO.Class.register(o, new MO.AGetter('_renderables'));
   o._ratioMatrix                = null;
   o._cameraPosition             = null;
   o._cameraDirection            = null;
   o._cameraViewMatrix           = null;
   o._cameraProjectionMatrix     = null;
   o._cameraViewProjectionMatrix = null;
   o._lightPosition              = null;
   o._lightDirection             = null;
   o._lightViewMatrix            = null;
   o._lightProjectionMatrix      = null;
   o._lightViewProjectionMatrix  = null;
   o._lightInfo                  = null;
   o.construct                   = MO.MG3dRegion_construct;
   o.isChanged                   = MO.MG3dRegion_isChanged;
   o.setTechniquePass            = MO.MG3dRegion_setTechniquePass;
   o.pushRenderable              = MO.MG3dRegion_pushRenderable;
   o.setup                       = MO.MG3dRegion_setup;
   o.change                      = MO.MG3dRegion_change;
   o.prepare                     = MO.MG3dRegion_prepare;
   o.reset                       = MO.MG3dRegion_reset;
   o.calculate                   = MO.MG3dRegion_calculate;
   o.update                      = MO.MG3dRegion_update;
   o.dispose                     = MO.MG3dRegion_dispose;
   return o;
}
MO.MG3dRegion_construct = function MG3dRegion_construct(){
   var o = this;
   o._lights = new MO.TObjects();
   o._renderables = new MO.TObjects();
   o._allRenderables = new MO.TObjects();
   o._ratioMatrix = new MO.SMatrix3d();
   o._cameraPosition = new MO.SPoint3();
   o._cameraDirection = new MO.SVector3();
   o._cameraViewMatrix = new MO.SMatrix3d();
   o._cameraProjectionMatrix = new MO.SMatrix3d();
   o._cameraViewProjectionMatrix = new MO.SMatrix3d();
   o._lightPosition = new MO.SPoint3();
   o._lightDirection = new MO.SVector3();
   o._lightViewMatrix = new MO.SMatrix3d();
   o._lightProjectionMatrix = new MO.SMatrix3d();
   o._lightViewProjectionMatrix = new MO.SMatrix3d();
   o._lightInfo = new MO.SVector4();
}
MO.MG3dRegion_isChanged = function MG3dRegion_isChanged(){
   return this._changed;
}
MO.MG3dRegion_setTechniquePass = function MG3dRegion_setTechniquePass(p, f){
   var o = this;
   o._techniquePass = p;
   o._spaceName = p.fullCode();
   o._finish = f;
}
MO.MG3dRegion_pushRenderable = function MG3dRegion_pushRenderable(p){
   var o = this;
   o._renderables.push(p);
   o._allRenderables.push(p);
}
MO.MG3dRegion_setup = function MG3dRegion_setup(){
   var o = this;
}
MO.MG3dRegion_change = function MG3dRegion_change(){
   this._changed = true;
}
MO.MG3dRegion_prepare = function MG3dRegion_prepare(){
   var o = this;
   o._changed = false;
   var camera = o._camera;
   var projection = camera.projection();
   camera.updateFrustum();
   var pixelRatio = MO.Window.Browser.capability().pixelRatio;
   var ratioMatrix = o._ratioMatrix.identity();
   o._cameraPosition.assign(camera.position());
   o._cameraDirection.assign(camera.direction());
   o._cameraViewMatrix.assign(camera.matrix());
   o._cameraProjectionMatrix.assign(projection.matrix());
   o._cameraViewProjectionMatrix.assign(camera.matrix());
   o._cameraViewProjectionMatrix.append(projection.matrix());
   var light = o._directionalLight;
   var lc = light.camera();
   var lcp = lc.position();
   o._lightPosition.assign(lc.position());
   o._lightDirection.assign(lc.direction());
   o._lightViewMatrix.assign(lc.matrix());
   o._allRenderables.clear();
}
MO.MG3dRegion_reset = function MG3dRegion_reset(){
   var o = this;
   o._renderables.clear();
}
MO.MG3dRegion_calculate = function MG3dRegion_calculate(parameterCd){
   var o = this;
   switch(parameterCd){
      case MO.EG3dRegionParameter.CameraPosition:
         return o._cameraPosition;
      case MO.EG3dRegionParameter.CameraDirection:
         return o._cameraDirection;
      case MO.EG3dRegionParameter.CameraViewMatrix:
         return o._cameraViewMatrix;
      case MO.EG3dRegionParameter.CameraProjectionMatrix:
         return o._cameraProjectionMatrix;
      case MO.EG3dRegionParameter.CameraViewProjectionMatrix:
         return o._cameraViewProjectionMatrix;
      case MO.EG3dRegionParameter.LightPosition:
         return o._lightPosition;
      case MO.EG3dRegionParameter.LightDirection:
         return o._lightDirection;
      case MO.EG3dRegionParameter.LightViewMatrix:
         return o._lightViewMatrix;
      case MO.EG3dRegionParameter.LightProjectionMatrix:
         return o._lightProjectionMatrix;
      case MO.EG3dRegionParameter.LightViewProjectionMatrix:
         return o._lightViewProjectionMatrix;
      case MO.EG3dRegionParameter.LightInfo:
         return o._lightInfo;
   }
   throw new MO.TError(o, 'Unknown parameter type. (type_cd={1})', parameterCd);
}
MO.MG3dRegion_update = function MG3dRegion_update(){
   var o = this;
   var renderables = o._renderables;
   var count = renderables.count();
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(i);
      renderable.update(o);
   }
}
MO.MG3dRegion_dispose = function MG3dRegion_dispose(){
   var o = this;
   o._ratioMatrix = MO.Lang.Object.free(o._ratioMatrix);
   o._renderables = MO.Lang.Object.free(o._renderables);
   o._allRenderables = MO.Lang.Object.free(o._allRenderables);
}
MO.MG3dRenderable = function MG3dRenderable(o){
   o = MO.Class.inherits(this, o, MO.MGraphicRenderable);
   o._optionMerge   = false;
   o._currentMatrix = MO.Class.register(o, new MO.AGetter('_currentMatrix'));
   o._matrix        = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._material      = MO.Class.register(o, new MO.AGetSet('_material'));
   o._activeInfo    = MO.Class.register(o, new MO.AGetter('_activeInfo'));
   o._infos         = null;
   o.construct      = MO.MG3dRenderable_construct;
   o.activeEffect   = MO.MG3dRenderable_activeEffect;
   o.effectFind     = MO.MG3dRenderable_effectFind;
   o.effectSet      = MO.MG3dRenderable_effectSet;
   o.infos          = MO.MG3dRenderable_infos;
   o.selectInfo     = MO.MG3dRenderable_selectInfo;
   o.resetInfos     = MO.MG3dRenderable_resetInfos;
   o.testVisible    = MO.Method.emptyTrue;
   o.update         = MO.Method.empty;
   o.dispose        = MO.MG3dRenderable_dispose;
   return o;
}
MO.MG3dRenderable_construct = function MG3dRenderable_construct(){
   var o = this;
   o._currentMatrix = new MO.SMatrix3d();
   o._matrix = new MO.SMatrix3d();
}
MO.MG3dRenderable_activeEffect = function MG3dRenderable_activeEffect(){
   var info = this._activeInfo;
   return info ? info.effect : null;
}
MO.MG3dRenderable_effectFind = function MG3dRenderable_effectFind(code){
   var o = this;
   var infos = o._infos;
   if(infos){
      var info = infos.get(code);
      if(info){
         return info.effect;
      }
   }
   return null;
}
MO.MG3dRenderable_effectSet = function MG3dRenderable_effectSet(code, effect){
   var o = this;
   var infos = o.infos();
   var info = infos.get(code);
   if(!info){
      info = new MO.SG3dRenderableInfo();
      infos.set(code, info)
   }
   info.effect = effect;
}
MO.MG3dRenderable_infos = function MG3dRenderable_infos(){
   var o = this;
   var infos = o._infos;
   if(!infos){
      infos = o._infos = new MO.TDictionary();
   }
   return infos;
}
MO.MG3dRenderable_selectInfo = function MG3dRenderable_selectInfo(code){
   var o = this;
   var infos = o.infos();
   var info = infos.get(code);
   if(!info){
      info = new MO.SG3dRenderableInfo();
      infos.set(code, info)
   }
   o._activeInfo = info;
   return info;
}
MO.MG3dRenderable_resetInfos = function MG3dRenderable_resetInfos(){
   var o = this;
   var infos = o._infos;
   if(infos){
      var count = infos.count();
      for(var i = 0; i < count; i++){
         var info = infos.at(i);
         info.reset();
      }
   }
}
MO.MG3dRenderable_dispose = function MG3dRenderable_dispose(){
   var o = this;
   o._currentMatrix = MO.Lang.Object.dispose(o._currentMatrix);
   o._matrix = MO.Lang.Object.dispose(o._matrix);
   o._material = MO.Lang.Object.dispose(o._material);
   o._activeInfo = null;
   o._infos = MO.Lang.Object.dispose(o._infos);
}
MO.SG3dEffectInfo = function SG3dEffectInfo(){
   var o = this;
   o.code                  = null;
   o.techniqueCode         = null;
   o.techniqueModeCode     = null;
   o.optionMerge           = null;
   o.mergeCount            = null;
   o.fillModeCd            = null;
   o.optionCullMode        = null;
   o.cullModeCd            = null;
   o.optionDepthTest       = null;
   o.depthModeCd           = null;
   o.optionDepthWrite      = null;
   o.optionBlendMode       = null;
   o.blendSourceMode       = null;
   o.blendTargetMode       = null;
   o.optionAlphaTest       = null;
   o.optionNormalInvert    = null;
   o.optionNormalCompress  = null;
   o.supportInstance       = null;
   o.vertexCount           = 0;
   o.vertexColor           = null;
   o.vertexCoord           = null;
   o.vertexNormal          = null;
   o.vertexNormalFull      = null;
   o.vertexSkeleton        = null;
   o.vertexBoneCount       = 0;
   o.fragmentAlpha         = null;
   o.fragmentBump          = null;
   o.fragmentAmbient       = null;
   o.fragmentDiffuse       = null;
   o.fragmentDiffuseView   = null;
   o.fragmentSpecularColor = null;
   o.fragmentSpecularLevel = null;
   o.fragmentSpecularView  = null;
   o.fragmentEnvironment   = null;
   o.fragmentLight         = null;
   o.fragmentReflect       = null;
   o.fragmentRefract       = null;
   o.fragmentEmissive      = null;
   o.fragmentHeight        = null;
   o.attributes            = new MO.TArray();
   o.samplers              = new MO.TArray();
   o.attributeContains     = MO.SG3dEffectInfo_attributeContains;
   o.samplerContains       = MO.SG3dEffectInfo_samplerContains;
   o.reset                 = MO.SG3dEffectInfo_reset;
   o.reset();
   return o;
}
MO.SG3dEffectInfo_attributeContains = function SG3dEffectInfo_attributeContains(p){
   return this.attributes.contains(p);
}
MO.SG3dEffectInfo_samplerContains = function SG3dEffectInfo_samplerContains(p){
   return this.samplers.contains(p);
}
MO.SG3dEffectInfo_reset = function SG3dEffectInfo_reset(){
   var o = this;
   o.code = null;
   o.optionMerge = false;
   o.mergeCount = 0;
   o.fillModeCd = MO.EG3dFillMode.Fill;
   o.optionCullMode = true;
   o.cullModeCd = MO.EG3dCullMode.Front;
   o.optionDepthTest = true;
   o.depthModeCd = MO.EG3dDepthMode.Less;
   o.optionDepthWrite = true;
   o.optionBlendMode = false;
   o.blendSourceMode = MO.EG3dBlendMode.SourceAlpha;
   o.blendTargetMode = MO.EG3dBlendMode.OneMinusSourceAlpha;
   o.optionAlphaTest = false;
   o.optionNormalInvert = false;
   o.optionNormalCompress = true;
   o.supportInstance = false;
   o.vertexCount = 0;
   o.vertexColor = false;
   o.vertexCoord = false;
   o.vertexNormal = false;
   o.vertexNormalFull = false;
   o.vertexSkeleton = false;
   o.vertexBoneCount = 0;
   o.fragmentAlpha = false;
   o.fragmentBump = false;
   o.fragmentAmbient = false;
   o.fragmentDiffuse = false;
   o.fragmentDiffuseView = false;
   o.fragmentSpecularColor = false;
   o.fragmentSpecularLevel = false;
   o.fragmentSpecularView = false;
   o.fragmentEnvironment = false;
   o.fragmentLight = false;
   o.fragmentReflect = false;
   o.fragmentRefract = false;
   o.fragmentEmissive = false;
   o.fragmentHeight = false;
   o.attributes.clear();
   o.samplers.clear();
}
MO.SG3dMaterialInfo = function SG3dMaterialInfo(){
   var o = this;
   o.effectCode           = 'automatic';
   o.optionDepth          = null;
   o.optionDouble         = null;
   o.optionNormalInvert   = null;
   o.optionShadow         = null;
   o.optionShadowSelf     = null;
   o.optionAlpha          = null;
   o.alphaBase            = 1.0;
   o.alphaRate            = 1.0;
   o.alphaLevel           = 1.0;
   o.alphaMerge           = 1.0;
   o.optionColor          = null;
   o.colorMin             = 0.0;
   o.colorMax             = 1.0;
   o.colorBalance         = 0.5;
   o.colorRate            = 1.0;
   o.optionVertex         = null;
   o.vertexColor          = new MO.SColor4();
   o.optionAmbient        = null;
   o.ambientColor         = new MO.SColor4();
   o.ambientShadow        = 1.0;
   o.optionDiffuse        = null;
   o.diffuseColor         = new MO.SColor4();
   o.diffuseShadow        = 1.0;
   o.optionDiffuseView    = null;
   o.diffuseViewColor     = new MO.SColor4();
   o.diffuseViewShadow    = 1.0;
   o.optionSpecular       = null;
   o.specularColor        = new MO.SColor4();
   o.specularBase         = 1.0;
   o.specularLevel        = 1.0;
   o.specularAverage      = 1.0;
   o.specularShadow       = 1.0;
   o.specularInfo         = null;
   o.optionSpecularView   = null;
   o.specularViewColor    = new MO.SColor4();
   o.specularViewBase     = 1.0;
   o.specularViewRate     = 1.0;
   o.specularViewAverage  = 1.0;
   o.specularViewShadow   = 1.0;
   o.specularViewShadow   = null;
   o.optionReflect        = null;
   o.reflectColor         = new MO.SColor4();
   o.reflectMerge         = 1.0;
   o.reflectShadow        = 1.0;
   o.optionRefract        = null;
   o.refractFrontColor    = new MO.SColor4();
   o.refractBackColor     = new MO.SColor4();
   o.optionOpacity        = null;
   o.opacityColor         = new MO.SColor4();
   o.opacityRate          = 1.0;
   o.opacityAlpha         = 1.0;
   o.opacityDepth         = 1.0;
   o.opacityTransmittance = 1.0;
   o.optionEmissive       = null;
   o.emissiveColor        = new MO.SColor4();
   o.assign               = MO.SG3dMaterialInfo_assign;
   o.calculate            = MO.SG3dMaterialInfo_calculate;
   o.reset                = MO.SG3dMaterialInfo_reset;
   o.reset();
   return o;
}
MO.SG3dMaterialInfo_assign = function SG3dMaterialInfo_assign(info){
   var o = this;
   o.effectCode = info.effectCode;
   o.transformName = info.transformName;
   o.optionDepth = info.optionDepth;
   o.optionDouble = info.optionDouble;
   o.optionNormalInvert = info.optionNormalInvert;
   o.optionShadow = info.optionShadow;
   o.optionShadowSelf = info.optionShadowSelf;
   o.optionAlpha = info.optionAlpha;
   o.alphaBase = info.alphaBase;
   o.alphaRate = info.alphaRate;
   o.alphaLevel = info.alphaLevel;
   o.alphaMerge = info.alphaMerge;
   o.optionColor = info.optionColor;
   o.colorMin = info.colorMin;
   o.colorMax = info.colorMax;
   o.colorBalance = info.colorBalance;
   o.colorRate = info.colorRate;
   o.optionVertex = info.optionVertex;
   o.vertexColor.assign(info.vertexColor);
   o.optionAmbient = info.optionAmbient;
   o.ambientColor.assign(info.ambientColor);
   o.ambientShadow = info.ambientShadow;
   o.optionDiffuse = info.optionDiffuse;
   o.diffuseColor.assign(info.diffuseColor);
   o.diffuseShadow = info.diffuseShadow;
   o.optionDiffuseView = info.optionDiffuseView;
   o.diffuseViewColor.assign(info.diffuseViewColor);
   o.diffuseViewShadow = info.diffuseViewShadow;
   o.optionSpecular = info.optionSpecular;
   o.specularColor.assign(info.specularColor);
   o.specularBase = info.specularBase;
   o.specularLevel = info.specularLevel;
   o.specularAverage = info.specularAverage;
   o.specularShadow = info.specularShadow;
   o.optionSpecularView = info.optionSpecularView;
   o.specularViewColor.assign(info.specularViewColor);
   o.specularViewBase = info.specularViewBase;
   o.specularViewRate = info.specularViewRate;
   o.specularViewAverage = info.specularViewAverage;
   o.specularViewShadow = info.specularViewShadow;
   o.optionReflect = info.optionReflect;
   o.reflectColor.assign(info.reflectColor);
   o.reflectMerge = MO.Lang.Float.toRange(info.reflectMerge, 0, 2);
   o.reflectShadow = info.reflectShadow;
   o.optionRefract = info.optionRefract;
   o.refractFrontColor.assign(info.refractFrontColor);
   o.refractFrontMerge = info.refractFrontMerge;
   o.refractFrontShadow = info.refractFrontShadow;
   o.refractBackColor.assign(info.refractBackColor);
   o.refractBackMerge = info.refractBackMerge;
   o.refractBackShadow = info.refractBackShadow;
   o.optionOpacity = info.optionOpacity;
   o.opacityColor.assign(info.opacityColor);
   o.opacityRate = info.opacityRate;
   o.opacityAlpha = info.optionAlpha;
   o.opacityDepth = info.optionDepth;
   o.opacityTransmittance = info.optionTransmittance;
   o.optionEmissive = info.optionEmissive;
   o.emissiveColor.assign(info.emissiveColor);
}
MO.SG3dMaterialInfo_calculate = function SG3dMaterialInfo_calculate(info){
   var o = this;
   o.effectCode = info.effectCode;
   o.transformName = info.transformName;
   o.optionDepth = info.optionDepth;
   o.optionDouble = info.optionDouble;
   o.optionNormalInvert = info.optionNormalInvert;
   o.optionShadow = info.optionShadow;
   o.optionShadowSelf = info.optionShadowSelf;
   o.optionAlpha = info.optionAlpha;
   o.alphaBase = info.alphaBase;
   o.alphaRate = info.alphaRate;
   o.alphaLevel = info.alphaLevel;
   o.alphaMerge = info.alphaMerge;
   o.optionColor = info.optionColor;
   o.colorMin = info.colorMin;
   o.colorMax = info.colorMax;
   o.colorBalance = info.colorBalance;
   o.colorRate = info.colorRate;
   o.optionVertex = info.optionVertex;
   o.vertexColor.assignPower(info.vertexColor);
   o.optionAmbient = info.optionAmbient;
   o.ambientColor.assignPower(info.ambientColor);
   o.ambientShadow = info.ambientShadow;
   o.optionDiffuse = info.optionDiffuse;
   o.diffuseColor.assignPower(info.diffuseColor);
   o.diffuseShadow = info.diffuseShadow;
   o.optionDiffuseView = info.optionDiffuseView;
   o.diffuseViewColor.assignPower(info.diffuseViewColor);
   o.diffuseViewShadow = info.diffuseViewShadow;
   o.optionSpecular = info.optionSpecular;
   o.specularColor.assignPower(info.specularColor);
   o.specularBase = info.specularBase;
   o.specularLevel = info.specularLevel;
   o.specularAverage = info.specularAverage;
   o.specularShadow = info.specularShadow;
   o.optionSpecularView = info.optionSpecularView;
   o.specularViewColor.assignPower(info.specularViewColor);
   o.specularViewBase = info.specularViewBase;
   o.specularViewRate = info.specularViewRate;
   o.specularViewAverage = info.specularViewAverage;
   o.specularViewShadow = info.specularViewShadow;
   o.optionReflect = info.optionReflect;
   o.reflectColor.assignPower(info.reflectColor);
   o.reflectMerge = MO.Lang.Float.toRange(info.reflectMerge, 0, 2);
   o.reflectShadow = info.reflectShadow;
   o.optionRefract = info.optionRefract;
   o.refractFrontColor.assignPower(info.refractFrontColor);
   o.refractFrontMerge = info.refractFrontMerge;
   o.refractFrontShadow = info.refractFrontShadow;
   o.refractBackColor.assignPower(info.refractBackColor);
   o.refractBackMerge = info.refractBackMerge;
   o.refractBackShadow = info.refractBackShadow;
   o.optionOpacity = info.optionOpacity;
   o.opacityColor.assignPower(info.opacityColor);
   o.opacityRate = info.opacityRate;
   o.opacityAlpha = info.optionAlpha;
   o.opacityDepth = info.optionDepth;
   o.opacityTransmittance = info.optionTransmittance;
   o.optionEmissive = info.optionEmissive;
   o.emissiveColor.assignPower(info.emissiveColor);
}
MO.SG3dMaterialInfo_reset = function SG3dMaterialInfo_reset(){
   var o = this;
   o.optionDepth = true;
   o.optionDouble = false;
   o.optionNormalInvert = false;
   o.optionShadow = true;
   o.optionShadowSelf = true;
   o.optionAlpha = false;
   o.alphaBase = 0.2;
   o.alphaRate = 1;
   o.alphaLevel = 1;
   o.alphaMerge = 1;
   o.optionColor = true;
   o.colorMin = 0;
   o.colorMax = 1;
   o.colorBalance = 0.5;
   o.colorRate = 1;
   o.optionVertex = true;
   o.vertexColor.set(1, 1, 1, 1);
   o.optionAmbient = true;
   o.ambientColor.set(0.5, 0.5, 0.5, 1);
   o.ambientShadow = 1;
   o.optionDiffuse = true;
   o.diffuseColor.set(0.5, 0.5, 0.5, 1);
   o.diffuseShadow = 1;
   o.optionDiffuseView = true;
   o.diffuseViewColor.set(1, 1, 1, 1);
   o.diffuseViewShadow = 1;
   o.optionSpecular = true;
   o.specularColor.set(0.5, 0.5, 0.5, 1);
   o.specularBase = 0;
   o.specularLevel = 16;
   o.specularAverage = 1;
   o.specularShadow = 1;
   o.optionSpecularView = true;
   o.specularViewColor.set(1, 1, 1, 1);
   o.specularViewBase = 0;
   o.specularViewRate = 16;
   o.specularViewAverage = 1;
   o.specularViewShadow = 1;
   o.optionReflect = true;
   o.reflectColor.set(1, 1, 1, 1);
   o.reflectMerge = 1;
   o.reflectShadow = 1;
   o.optionRefract = true;
   o.refractFrontColor.set(1, 1, 1, 1);
   o.refractFrontMerge = 1;
   o.refractFrontShadow = 1;
   o.refractBackColor.set(1, 1, 1, 1);
   o.refractBackMerge = 1;
   o.refractBackShadow = 1;
   o.optionOpacity = true;
   o.opacityColor.set(1, 1, 1, 1);
   o.opacityRate = 1;
   o.opacityAlpha = 1;
   o.opacityDepth = 1;
   o.opacityTransmittance = 1;
   o.optionEmissive = true;
   o.emissiveColor.set(1, 1, 1, 1);
}
MO.SG3dRenderableInfo = function SG3dRenderableInfo(){
   var o = this;
   o.effect   = null;
   o.layout   = null;
   o.material = null;
   o.reset    = MO.SG3dRenderableInfo_reset;
   return o;
}
MO.SG3dRenderableInfo_reset = function SG3dRenderableInfo_reset(){
   var o = this;
   o.effect = null;
   o.layout = MO.Lang.Object.dispose(o.layout);
}
MO.FG3dAnimation = function FG3dAnimation(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0
   o._bones       = null;
   o.construct    = MO.FG3dAnimation_construct;
   o.findBone     = MO.FG3dAnimation_findBone;
   o.process      = MO.FG3dAnimation_process;
   o.dispose      = MO.FG3dAnimation_dispose;
   return o;
}
MO.FG3dAnimation_construct = function FG3dAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bones = new MO.TObjects();
}
MO.FG3dAnimation_findBone = function FG3dAnimation_findBone(p){
   var o = this;
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      var b = bs.get(i);
      if(b.boneId() == p){
         return b;
      }
   }
   return null;
}
MO.FG3dAnimation_process = function FG3dAnimation_process(){
   var o = this;
   var t = MO.Timer.current();
   if(o._lastTick == 0){
      o._lastTick = t;
   }
   o._currentTick = (t - o._lastTick + o._baseTick) / 1000;
   var bs = o._bones;
   var c = bs.count();
   for(var i = 0; i < c; i++){
      var b = bs.get(i);
      b.update(o._currentTick);
   }
   return true;
}
MO.FG3dAnimation_dispose = function FG3dAnimation_dispose(){
   var o = this;
   o._bones.dispose();
   o._bones = null;
   o.__base.FObject.dispose.call(o);
}
MO.FG3dBaseMaterial = function FG3dBaseMaterial(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name       = null;
   o._info       = MO.Class.register(o, new MO.AGetter('_info'));
   o.construct   = MO.FG3dBaseMaterial_construct;
   o.assignInfo  = MO.FG3dBaseMaterial_assignInfo;
   o.assign      = MO.FG3dBaseMaterial_assign;
   o.calculate   = MO.FG3dBaseMaterial_calculate;
   return o;
}
MO.FG3dBaseMaterial_construct = function FG3dBaseMaterial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._info = new MO.SG3dMaterialInfo();
}
MO.FG3dBaseMaterial_assignInfo = function FG3dBaseMaterial_assignInfo(info){
   this._info.assign(info);
}
MO.FG3dBaseMaterial_assign = function FG3dBaseMaterial_assign(material){
   this._info.assign(material.info());
}
MO.FG3dBaseMaterial_calculate = function FG3dBaseMaterial_calculate(material){
   this._info.calculate(material.info());
}
MO.FG3dBone = function FG3dBone(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._boneId   = 0;
   o._modeId   = null;
   o.update    = MO.FG3dBone_update;
   return o;
}
MO.FG3dBone_update = function FG3dBone_update(p){
}
MO.FG3dCamera = function FG3dCamera(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._matrix          = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._position        = MO.Class.register(o, new MO.AGetter('_position'));
   o._target          = null;
   o._direction       = MO.Class.register(o, new MO.AGetter('_direction'));
   o._directionTarget = null;
   o._centerFront     = 0.6;
   o._centerBack      = 1.0;
   o._focalNear       = 0.1;
   o._focalFar        = 200.0;
   o._frustum         = MO.Class.register(o, new MO.AGetter('_frustum'));
   o._planes          = MO.Class.register(o, new MO.AGetter('_planes'));
   o._viewport        = null;
   o.__axisUp         = null;
   o.__axisX          = null;
   o.__axisY          = null;
   o.__axisZ          = null;
   o.construct        = MO.FG3dCamera_construct;
   o.setPosition      = MO.FG3dCamera_setPosition;
   o.setDirection     = MO.FG3dCamera_setDirection;
   o.doWalk           = MO.FG3dCamera_doWalk;
   o.doStrafe         = MO.FG3dCamera_doStrafe;
   o.doFly            = MO.FG3dCamera_doFly;
   o.doPitch          = MO.FG3dCamera_doPitch;
   o.doYaw            = MO.FG3dCamera_doYaw;
   o.doRoll           = MO.FG3dCamera_doRoll;
   o.lookAt           = MO.FG3dCamera_lookAt;
   o.update           = MO.FG3dCamera_update;
   o.updateFrustum    = MO.FG3dCamera_updateFrustum;
   o.dispose          = MO.FG3dCamera_dispose;
   return o;
}
MO.FG3dCamera_construct = function FG3dCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
   o._position = new MO.SPoint3();
   o._target = new MO.SPoint3();
   o._direction = new MO.SVector3();
   o._directionTarget = new MO.SVector3();
   o._frustum = new MO.SFrustum();
   o._planes = new MO.SFrustumPlanes();
   o._viewport = MO.Class.create(MO.FG3dViewport);
   o.__axisUp = new MO.SVector3(0, 1, 0);
   o.__axisX = new MO.SVector3();
   o.__axisY = new MO.SVector3();
   o.__axisZ = new MO.SVector3();
}
MO.FG3dCamera_setPosition = function FG3dCamera_setPosition(x, y, z){
   this._position.set(x, y, z);
}
MO.FG3dCamera_setDirection = function FG3dCamera_setDirection(x, y, z){
   var o = this;
   o._direction.set(x, y, z);
   o._directionTarget.set(x, y, z);
}
MO.FG3dCamera_doWalk = function FG3dCamera_doWalk(p){
   var o = this;
   o._position.x += o._direction.x * p;
   o._position.z += o._direction.z * p;
}
MO.FG3dCamera_doStrafe = function FG3dCamera_doStrafe(p){
   var o = this;
   o._position.x += o.__axisY.x * p;
   o._position.z += o.__axisY.z * p;
}
MO.FG3dCamera_doFly = function FG3dCamera_doFly(p){
   var o = this;
   o._position.y += p;
}
MO.FG3dCamera_doPitch = function FG3dCamera_doPitch(p){
   throw new MO.TFatal(o, 'Unsupport.')
}
MO.FG3dCamera_doYaw = function FG3dCamera_doYaw(p){
   throw new MO.TFatal(o, 'Unsupport.')
}
MO.FG3dCamera_doRoll = function FG3dCamera_doRoll(p){
   throw new MO.TFatal(o, 'Unsupport.')
}
MO.FG3dCamera_lookAt = function FG3dCamera_lookAt(x, y, z){
   var o = this;
   var p = o._position;
   var d = o._direction;
   o._target.set(x, y, z);
   d.set(x - p.x, y - p.y, z - p.z);
   d.normalize();
   o._directionTarget.assign(d);
}
MO.FG3dCamera_update = function FG3dCamera_update(){
   var o = this;
   var ax = o.__axisX;
   var ay = o.__axisY;
   var az = o.__axisZ;
   az.assign(o._direction);
   az.normalize();
   o.__axisUp.cross2(ax, az);
   ax.normalize();
   az.cross2(ay, ax);
   ay.normalize();
   var d = o._matrix.data();
   d[ 0] = ax.x;
   d[ 1] = ay.x;
   d[ 2] = az.x;
   d[ 3] = 0.0;
   d[ 4] = ax.y;
   d[ 5] = ay.y;
   d[ 6] = az.y;
   d[ 7] = 0.0;
   d[ 8] = ax.z;
   d[ 9] = ay.z;
   d[10] = az.z;
   d[11] = 0.0;
   d[12] = -ax.dotPoint3(o._position);
   d[13] = -ay.dotPoint3(o._position);
   d[14] = -az.dotPoint3(o._position);
   d[15] = 1.0;
}
MO.FG3dCamera_updateFrustum = function FG3dCamera_updateFrustum(){
   var o = this;
   var m = MO.Lang.Math.matrix;
   m.assign(o._matrix);
   m.append(o._projection.matrix());
   o._planes.updateVision(m.data());
}
MO.FG3dCamera_dispose = function FG3dCamera_dispose(){
   var o = this;
   o._matrix = MO.Lang.Obejct.dispose(o._matrix);
   o.__base.FObject.dispose.call(o);
}
MO.FG3dDirectionalLight = function FG3dDirectionalLight(o){
   o = MO.Class.inherits(this, o, MO.FG3dLight);
   o._camera    = MO.Class.register(o, new MO.AGetter('_camera'));
   o._viewport  = MO.Class.register(o, new MO.AGetter('_viewport'));
   o._direction = MO.Class.register(o, new MO.AGetter('_direction'));
   o.construct  = MO.FG3dDirectionalLight_construct;
   o.dispose    = MO.FG3dDirectionalLight_dispose;
   return o;
}
MO.FG3dDirectionalLight_construct = function FG3dDirectionalLight_construct(){
   var o = this;
   o.__base.FG3dLight.construct.call(o);
   o._camera = MO.Class.create(MO.FG3dCamera);
   o._direction = new MO.SVector3();
}
MO.FG3dDirectionalLight_dispose = function FG3dDirectionalLight_dispose(){
   var o = this;
   o._camera = MO.Lang.Object.dispose(o._camera);
   o.__base.FG3dLight.dispose.call(o);
}
MO.FG3dEffect = function FG3dEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._ready              = null;
   o._code               = MO.Class.register(o, new MO.AGetter('_code'));
   o._stateFillCd        = MO.EG3dFillMode.Face;
   o._stateCullCd        = MO.EG3dCullMode.Front;
   o._stateDepth         = true;
   o._stateDepthCd       = MO.EG3dDepthMode.LessEqual;
   o._stateDepthWrite    = true;
   o._stateBlend         = true;
   o._stateBlendSourceCd = MO.EG3dBlendMode.SourceAlpha;
   o._stateBlendTargetCd = MO.EG3dBlendMode.OneMinusSourceAlpha;
   o._stateAlphaTest     = false;
   o._optionShadow       = false;
   o._optionLightMap     = false;
   o._optionFog          = false;
   o._program            = MO.Class.register(o, new MO.AGetter('_program'));
   o._vertexTemplate     = null;
   o._fragmentTemplate   = null;
   o.setup               = MO.Method.empty;
   o.testReady           = MO.FG3dEffect_testReady;
   o.setParameter        = MO.FG3dEffect_setParameter;
   o.setSampler          = MO.FG3dEffect_setSampler;
   o.drawRenderable      = MO.FG3dEffect_drawRenderable;
   o.drawRenderables     = MO.FG3dEffect_drawRenderables;
   o.drawGroup           = MO.FG3dEffect_drawGroup;
   o.drawRegion          = MO.FG3dEffect_drawRegion;
   o.buildInfo           = MO.FG3dEffect_buildInfo;
   o.loadConfig          = MO.FG3dEffect_loadConfig;
   o.load                = MO.FG3dEffect_load;
   o.build               = MO.FG3dEffect_build;
   return o;
}
MO.FG3dEffect_testReady = function FG3dEffect_testReady(){
   return this._ready;
}
MO.FG3dEffect_setParameter = function FG3dEffect_setParameter(name, value, count){
   this._program.setParameter(name, value, count);
}
MO.FG3dEffect_setSampler = function FG3dEffect_setSampler(name, texture){
   this._program.setSampler(name, texture);
}
MO.FG3dEffect_buildInfo = function FG3dEffect_buildInfo(tagContext, effectInfo){
}
MO.FG3dEffect_drawRenderable = function FG3dEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   if(program.hasAttribute()){
      var attributes = program.attributes();
      var attributeCount = attributes.count();
      for(var i = 0; i < attributeCount; i++){
         var attribute = attributes.value(i);
         if(attribute._statusUsed){
            var linker = attribute._linker;
            var vertexBuffer = renderable.findVertexBuffer(linker);
            if(!vertexBuffer){
               throw new MO.TError("Can't find renderable vertex buffer. (linker={1})", linker);
            }
            program.setAttribute(attribute._name, vertexBuffer, vertexBuffer._formatCd);
         }
      }
   }
   var indexBuffer = renderable.indexBuffer();
   context.drawTriangles(indexBuffer, 0, indexBuffer.count());
}
MO.FG3dEffect_drawRenderables = function FG3dEffect_drawRenderables(region, renderables, offset, count){
   var o = this;
   o._graphicContext.setProgram(o._program);
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(offset + i);
      o.drawRenderable(region, renderable);
   }
}
MO.FG3dEffect_drawGroup = function FG3dEffect_drawGroup(region, renderables, offset, count){
   this.drawRenderables(region, renderables, offset, count);
}
MO.FG3dEffect_drawRegion = function FG3dEffect_drawRegion(region, offset, count){
   var o = this;
   var renderabels = region.renderables();
   for(var n = 0; n < count; ){
      var groupBegin = n;
      var groupEnd = count;
      var groupRenderable = renderabels.at(offset + groupBegin);
      var groupMaterial = groupRenderable.materialReference();
      for(var i = n; i < count; i++){
         var renderable = renderabels.at(offset + i);
         var material = renderable.materialReference();
         if(groupMaterial != material){
            groupEnd = i;
            break;
         }
         n++;
      }
      o.drawGroup(region, renderabels, offset + groupBegin, groupEnd - groupBegin);
   }
}
MO.FG3dEffect_loadConfig = function FG3dEffect_loadConfig(xconfig){
   var o = this;
   var context = o._graphicContext;
   var program = o._program = context.createProgram();
   var xnodes = xconfig.nodes();
   var count = xnodes.count();
   for(var i = 0; i < count; i++){
      var xnode = xnodes.get(i);
      if(xnode.isName('State')){
         var name = xnode.get('name');
         var value = xnode.get('value');
         if(name == 'fill_mode'){
            o._stateFillCd = MO.Lang.Enum.parse(MO.EG3dFillMode, value);
         }else if(name == 'cull_mode'){
            o._stateCullCd = MO.Lang.Enum.parse(MO.EG3dCullMode, value);
         }else if(name == 'depth_mode'){
            o._stateDepth = true;
            o._stateDepthCd = MO.Lang.Enum.parse(MO.EG3dDepthMode, value);
         }else if(name == 'depth_write'){
            o._stateDepthWrite = MO.Lang.Boolean.parse(value);
         }else if(name == 'blend_mode'){
            o._stateBlend = MO.Lang.Boolean.parse(value);
            if(o._stateBlend){
               o._stateBlendSourceCd = MO.Lang.Enum.parse(MO.EG3dBlendMode, xnode.get('source'));
               o._stateBlendTargetCd = MO.Lang.Enum.parse(MO.EG3dBlendMode, xnode.get('target'));
            }
         }else if(name == 'alpha_test'){
            o._stateAlphaTest = MO.RBoolean.parse(value);
         }
      }else if(xnode.isName('Option')){
         var name = xnode.get('name');
         var value = xnode.get('value');
         if(name == 'shadow'){
            o._optionShadow = MO.Lang.Boolean.parse(value);
         }else if(name == 'lightmap'){
            o._optionLightMap = MO.Lang.Boolean.parse(value);
         }else if(name == 'fog'){
            o._optionFog = MO.Lang.Boolean.parse(value);
         }
      }else if(xnode.isName('Parameter')){
         var parameter = MO.Class.create(MO.FG3dProgramParameter);
         parameter.loadConfig(xnode);
         program.parameters().set(parameter.name(), parameter);
      }else if(xnode.isName('Attribute')){
         var attribute = MO.Class.create(MO.FG3dProgramAttribute);
         attribute.loadConfig(xnode);
         program.attributes().set(attribute.name(), attribute);
      }else if(xnode.isName('Sampler')){
         var sampler = MO.Class.create(MO.FG3dProgramSampler);
         sampler.loadConfig(xnode);
         program.samplers().set(sampler.name(), sampler);
      }else if(xnode.isName('Source')){
         var name = xnode.get('name');
         if(name == 'vertex'){
            o._vertexSource = xnode.value();
         }else if(name == 'fragment'){
            o._fragmentSource = xnode.value();
         }else{
            throw new MO.TError(o, 'Unknown source type. (name={1})', name);
         }
      }else{
         throw new MO.TError(o, 'Unknown config type. (name={1})', xnode.name());
      }
   }
   var vertexTemplate = o._vertexTemplate = MO.Class.create(MO.FG3dShaderTemplate);
   vertexTemplate.load(o._vertexSource);
   var fragmentTemplate = o._fragmentTemplate = MO.Class.create(MO.FG3dShaderTemplate);
   fragmentTemplate.load(o._fragmentSource);
}
MO.FG3dEffect_build = function FG3dEffect_build(p){
   var o = this;
   var program = o._program;
   var parameters = program.parameters();
   var parameterCount = parameters.count();
   var tagContext = MO.RInstance.get(MO.FTagContext);
   o.buildInfo(tagContext, p);
   var source = o._vertexTemplate.parse(tagContext);
   var formatSource = MO.Lang.String.formatLines(source);
   program.upload(MO.EG3dShader.Vertex, formatSource);
   var source = o._fragmentTemplate.parse(tagContext);
   for(var i = 0; i < parameterCount; i++){
      var parameter = parameters.at(i);
      var parameterName = parameter.name();
      var parameterDefine = parameter.define();
      if(parameterDefine){
         source = source.replace(new RegExp(parameterName, 'g'), parameterDefine);
      }
   }
   var formatSource = MO.Lang.String.formatLines(source);
   program.upload(MO.EG3dShader.Fragment, formatSource);
   program.build();
   program.link();
}
MO.FG3dEffect_load = function FG3dEffect_load(){
   var o = this;
   var xconfig = MO.Console.find(MO.FG3dEffectConsole).loadConfig(o._code);
   o.loadConfig(xconfig);
}
MO.FG3dEffectConsole = function FG3dEffectConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd         = MO.EScope.Local;
   o._configs         = null;
   o._loadEffects     = null;
   o._registerEffects = null;
   o._templateEffects = null;
   o._effects         = null;
   o._path            = MO.Class.register(o, MO.AGetter('_path'), "/ars/shader/");
   o._effectInfo      = null;
   o._tagContext      = null;
   o._thread          = null;
   o._interval        = 300;
   o.onProcess        = MO.FG3dEffectConsole_onProcess;
   o.construct        = MO.FG3dEffectConsole_construct;
   o.register         = MO.FG3dEffectConsole_register;
   o.unregister       = MO.FG3dEffectConsole_unregister;
   o.create           = MO.FG3dEffectConsole_create;
   o.buildEffectInfo  = MO.FG3dEffectConsole_buildEffectInfo;
   o.findTemplate     = MO.FG3dEffectConsole_findTemplate;
   o.find             = MO.FG3dEffectConsole_find;
   o.loadConfig       = MO.FG3dEffectConsole_loadConfig;
   return o;
}
MO.FG3dEffectConsole_onProcess = function FG3dEffectConsole_onProcess(){
   var o = this;
   var effects = o._loadEffects;
   effects.record();
   while(effects.next()){
      var effect = effects.current();
      if(effect.processLoad()){
         effects.removeCurrent();
      }
   }
}
MO.FG3dEffectConsole_construct = function FG3dEffectConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._configs = new MO.TDictionary();
   o._loadEffects = new MO.TLooper();
   o._registerEffects = new MO.TDictionary();
   o._templateEffects = new MO.TDictionary();
   o._effects = new MO.TDictionary();
   o._effectInfo = new MO.SG3dEffectInfo();
   o._tagContext = MO.Class.create(MO.FTagContext);
}
MO.FG3dEffectConsole_register = function FG3dEffectConsole_register(n, e){
   this._registerEffects.set(n, e);
}
MO.FG3dEffectConsole_unregister = function FG3dEffectConsole_unregister(n){
   this._registerEffects.set(n, null);
}
MO.FG3dEffectConsole_create = function FG3dEffectConsole_create(c, p){
   var o = this;
   var t = o._registerEffects.get(p);
   if(!t){
      throw new MO.TError(this, 'Unknown effect type name. (type={1})', t);
   }
   var e = MO.Class.create(t);
   e.linkGraphicContext(c);
   e.setup();
   return e;
}
MO.FG3dEffectConsole_buildEffectInfo = function FG3dEffectConsole_buildEffectInfo(context, effectInfo, region, renderable){
   var o = this;
   var capability = context.capability();
   var technique = region.technique();
   effectInfo.techniqueModeCode = technique.activeMode().code();
   effectInfo.optionMerge = renderable._optionMerge;
   if(effectInfo.optionMerge){
      effectInfo.mergeCount = renderable.mergeMaxCount();
      effectInfo.mergeStride = renderable.mergeStride();
   }
   var mi = renderable.material().info();
   effectInfo.optionNormalInvert = mi.optionNormalInvert;
   effectInfo.optionColor = mi.optionColor;
   effectInfo.optionAmbient = mi.optionAmbient;
   effectInfo.optionDiffuse = mi.optionDiffuse;
   effectInfo.optionSpecular = mi.optionSpecular;
   effectInfo.optionReflect = mi.optionReflect;
   effectInfo.optionRefract = mi.optionRefract;
   effectInfo.vertexCount = renderable.vertexCount();
   var vertexBuffers = renderable.vertexBuffers();
   var count = vertexBuffers.count();
   for(var i = 0; i < count; i++){
      var vertexBuffer = vertexBuffers.at(i);
      var vertexCode = vertexBuffer.code();
      if(vertexCode == 'normal'){
         var stride = vertexBuffer.stride();
         if(stride == 4){
            effectInfo.optionNormalCompress = true;
         }else{
            effectInfo.optionNormalCompress = false;
         }
      }
      if(MO.Lang.String.isEmpty(vertexCode)){
         throw new MO.TError(o, 'Vertex buffer code is empty.');
      }
      effectInfo.attributes.push(vertexCode);
   }
   var textures = renderable.textures();
   if(textures){
      var count = textures.count();
      for(var i = 0; i < count; i++){
         var textureCode = textures.name(i);
         if(MO.Lang.String.isEmpty(textureCode)){
            throw new MO.TError(o, 'Texture code is empty.');
         }
         effectInfo.samplers.push(textureCode);
      }
   }
   var bones = renderable.bones();
   if(bones){
      var boneCount = bones.count();
      effectInfo.vertexBoneCount = boneCount;
      var boneLimit = capability.calculateBoneCount(effectInfo.vertexBoneCount, effectInfo.vertexCount);
      if(boneCount > boneLimit){
         boneCount = boneLimit;
      }
      renderable._boneLimit = boneCount;
      effectInfo.vertexBoneLimit = boneCount;
   }
}
MO.FG3dEffectConsole_findTemplate = function FG3dEffectConsole_findTemplate(context, code){
   var o = this;
   var effects = o._templateEffects;
   var effect = effects.get(code);
   if(effect == null){
      var effect = o.create(context, code);
      effect.load();
      MO.Logger.info(o, 'Create effect template. (code={1}, instance={2})', code, effect);
      effects.set(code, effect);
   }
   return effect;
}
MO.FG3dEffectConsole_find = function FG3dEffectConsole_find(context, region, renderable){
   var o = this;
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      context = context.graphicContext();
   }
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      throw new MO.TError(o, 'Unknown context.');
   }
   var effectCode = renderable.material().info().effectCode;
   if(MO.Lang.String.isEmpty(effectCode)){
      effectCode = 'automatic'
   }
   if(effectCode == 'skeleton' || effectCode == 'skeleton.4'){
      if(renderable.bones() == null){
         effectCode = 'automatic'
      }
   }
   var effectFlag = region.spaceName() + '.' + effectCode;
   var effectTemplate = o.findTemplate(context, effectFlag);
   if(effectTemplate){
      var effectInfo = o._effectInfo;
      effectInfo.reset();
      o.buildEffectInfo(context, effectInfo, region, renderable);
      effectTemplate.buildInfo(o._tagContext, effectInfo);
      var flag = effectFlag + o._tagContext.code;
      var effects = o._effects;
      var effect = effects.get(flag);
      if(!effect){
         effect = o.create(context, effectFlag);
         effect._flag = flag;
         effect.load();
         effect.build(o._effectInfo);
         MO.Logger.info(o, 'Create effect. (name={1}, instance={2})', effectCode, effect);
      }
      effects.set(flag, effect);
   }
   return effect;
}
MO.FG3dEffectConsole_loadConfig = function FG3dEffectConsole_loadConfig(p){
   var o = this;
   var x = o._configs.get(p);
   if(x){
      return x;
   }
   var u = MO.RBrowser.contentPath(o._path + p + ".xml");
   if(MO.Runtime.isDebug()){
      u += '?' + MO.Lang.Date.format();
   }
   x = MO.Class.create(MO.FXmlConnection).send(u);
   o._configs.set(p, x);
   return x;
}
MO.FG3dLight = function FG3dLight(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   return o;
}
MO.FG3dLightMaterial = function FG3dLightMaterial(o){
   o = MO.Class.inherits(this, o, MO.FG3dBaseMaterial);
   return o;
}
MO.FG3dMaterial = function FG3dMaterial(o){
   o = MO.Class.inherits(this, o, MO.FG3dBaseMaterial);
   o._dirty     = true;
   o._textures  = MO.Class.register(o, new MO.AGetter('_textures'))
   o.setTexture = MO.FG3dMaterial_setTexture;
   o.update     = MO.FG3dMaterial_update;
   return o;
}
MO.FG3dMaterial_setTexture = function FG3dMaterial_setTexture(code, texture){
   var o = this;
   var textures = o._textures;
   if(!textures){
      textures = o._textures = new MO.TDictionary();
   }
   textures.set(code, texture);
}
MO.FG3dMaterial_update = function FG3dMaterial_update(){
   this._dirty = true;
}
MO.FG3dMaterialMap = function FG3dMaterialMap(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._size      = MO.Class.register(o, new MO.AGetter('_size'));
   o._data      = MO.Class.register(o, new MO.AGetter('_data'));
   o._texture   = MO.Class.register(o, new MO.AGetter('_texture'));
   o._stride    = null;
   o._dirty     = false;
   o.construct  = MO.FG3dMaterialMap_construct;
   o.setup      = MO.FG3dMaterialMap_setup;
   o.resize     = MO.FG3dMaterialMap_resize;
   o.setUint8   = MO.FG3dMaterialMap_setUint8;
   o.setUint16  = MO.FG3dMaterialMap_setUint16;
   o.setUint32  = MO.FG3dMaterialMap_setUint32;
   o.setFloat16 = MO.FG3dMaterialMap_setFloat16;
   o.setFloat32 = MO.FG3dMaterialMap_setFloat32;
   o.update     = MO.FG3dMaterialMap_update;
   return o;
}
MO.FG3dMaterialMap_construct = function FG3dMaterialMap_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._size = new MO.SSize2();
}
MO.FG3dMaterialMap_setup = function FG3dMaterialMap_setup(width, height){
   var o = this;
   var c = o._graphicContext;
   var texture = o._texture = c.createFlatTexture();
   o.resize(width, height);
   texture.setFilterCd(MO.EG3dSamplerFilter.Nearest, MO.EG3dSamplerFilter.Nearest);
   texture.uploadData(o._data, width, height);
}
MO.FG3dMaterialMap_resize = function FG3dMaterialMap_resize(width, height){
   var o = this;
   var s = o._size;
   if(height > 2048){
      height = 4096;
   }else if(height > 1024){
      height = 2048;
   }else if(height > 512){
      height = 1024;
   }else if(height > 256){
      height = 512;
   }else if(height > 128){
      height = 256;
   }else if(height > 64){
      height = 128;
   }else if(height > 32){
      height = 64;
   }else if(height > 16){
     height = 32;
   }
   if(height < s.height){
      height = s.height;
   }
   if((s.width == width) && (s.height == height)){
      return;
   }
   s.set(width, height);
   o._stride = 4 * width;
   var total = 4 * width * height;
   o._data = new Uint8Array(total);
}
MO.FG3dMaterialMap_setUint8 = function FG3dMaterialMap_setUint8(n, i, v1, v2, v3, v4){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   if(v1.constructor == MO.SColor4){
      var v = v1.red * 255;
      if(d[p] != v){
         o._dirty = true;
      }
      d[p++] = v;
      var v = v1.green * 255;
      if(d[p] != v){
         o._dirty = true;
      }
      d[p++] = v;
      var v = v1.blue * 255;
      if(d[p] != v){
         o._dirty = true;
      }
      d[p++] = v;
      var v = v1.alpha * 255;
      if(d[p] != v){
         o._dirty = true;
      }
      d[p++] = v;
   }else{
      d[p++] = v1;
      d[p++] = v2;
      d[p++] = v3;
      d[p++] = v4;
   }
}
MO.FG3dMaterialMap_setUint16 = function FG3dMaterialMap_setUint16(n, i, v1, v2){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = (v1 >> 8) & 0xFF;
   d[p++] = v1 & 0xFF;
   d[p++] = (v2 >> 8) & 0xFF;
   d[p++] = v2 & 0xFF;
   o._dirty = true;
}
MO.FG3dMaterialMap_setUint32 = function FG3dMaterialMap_setUint32(n, i, v){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = (v >> 24) & 0xFF;
   d[p++] = (v >> 16) & 0xFF;
   d[p++] = (v >> 8) & 0xFF;
   d[p++] = v & 0xFF;
   o._dirty = true;
}
MO.FG3dMaterialMap_setFloat16 = function FG3dMaterialMap_setFloat16(n, i, v1, v2){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   var v = parseInt(v1 * 256);
   d[p++] = parseInt(v1) & 0xFF;
   d[p++] = parseInt(v1 * 256) & 0xFF;
   d[p++] = parseInt(v2) & 0xFF;
   d[p++] = parseInt(v2 * 256) & 0xFF;
   o._dirty = true;
}
MO.FG3dMaterialMap_setFloat32 = function FG3dMaterialMap_setFloat32(n, i, v){
   var o = this;
   var d = o._data;
   var p = (o._stride * n) + (i << 2);
   d[p++] = parseInt(v * 0.00390625) & 0xFF;
   d[p++] = parseInt(v) & 0xFF;
   d[p++] = parseInt(v * 256) & 0xFF;
   d[p++] = parseInt(v * 65536) & 0xFF;
   o._dirty = true;
}
MO.FG3dMaterialMap_update = function FG3dMaterialMap_update(){
   var o = this;
   if(o._dirty){
      var s = o._size;
      o._texture.uploadData(o._data, s.width, s.height);
      o._dirty = false;
   }
}
MO.FG3dMaterialTexture = function FG3dMaterialTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dMaterial);
   o._texture = null;
   return o;
}
MO.FG3dObject = function FG3dObject(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o.setup   = MO.FG3dObject_setup;
   o.dispose = MO.FG3dObject_dispose;
   return o;
}
MO.FG3dObject_setup = function FG3dObject_setup(){
}
MO.FG3dObject_dispose = function FG3dObject_dispose(){
   var o = this;
   o.__base.MGraphicObject.dispose.call(o);
   o.__base.FObject.dispose.call(o);
}
MO.FG3dOrthoProjection = function FG3dOrthoProjection(o){
   o = MO.Class.inherits(this, o, MO.FG3dProjection);
   o.construct     = MO.FG3dOrthoProjection_construct;
   o.update        = MO.FG3dOrthoProjection_update;
   o.updateFrustum = MO.FG3dOrthoProjection_updateFrustum;
   o.dispose       = MO.FG3dOrthoProjection_dispose;
   return o;
}
MO.FG3dOrthoProjection_construct = function FG3dOrthoProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
}
MO.FG3dOrthoProjection_update = function FG3dOrthoProjection_update(){
   var o = this;
   var size = o._size;
   var left = -size.width * 0.5;
   var top = -size.height * 0.5;
   MO.Lang.Matrix.orthoLH(o._matrix, left, top, size.width, size.height, o._znear, o._zfar);
}
MO.FG3dOrthoProjection_updateFrustum = function FG3dOrthoProjection_updateFrustum(frustum){
   var o = this;
   o._znear = frustum.minZ;
   o._zfar = frustum.maxZ;
   o.update();
}
MO.FG3dOrthoProjection_dispose = function FG3dOrthoProjection_dispose(){
   var o = this;
   o.__base.FG3dProjection.dispose.call(o);
}
MO.FG3dPerspectiveProjection = function FG3dPerspectiveProjection(o){
   o = MO.Class.inherits(this, o, MO.FG3dProjection);
   o.construct     = MO.FG3dPerspectiveProjection_construct;
   o.update        = MO.FG3dPerspectiveProjection_update;
   o.updateFrustum = MO.FG3dPerspectiveProjection_updateFrustum;
   o.dispose       = MO.FG3dPerspectiveProjection_dispose;
   return o;
}
MO.FG3dPerspectiveProjection_construct = function FG3dPerspectiveProjection_construct(){
   var o = this;
   o.__base.FG3dProjection.construct.call(o);
}
MO.FG3dPerspectiveProjection_update = function FG3dPerspectiveProjection_update(){
   var o = this;
   var size = o._size;
   o._fieldOfView = MO.RConst.DEGREE_RATE * o._angle;
   MO.Lang.Matrix.perspectiveFieldOfViewLH(o._matrix, o._fieldOfView, size.width / size.height, o._znear, o._zfar);
}
MO.FG3dPerspectiveProjection_updateFrustum = function FG3dPerspectiveProjection_updateFrustum(p){
   var o = this;
   o._znear = p.minZ;
   o._zfar = p.maxZ;
   o.update();
}
MO.FG3dPerspectiveProjection_dispose = function FG3dPerspectiveProjection_dispose(){
   var o = this;
   o.__base.FG3dProjection.dispose.call(o);
}
MO.FG3dPointLight = function FG3dPointLight(o){
   o = MO.Class.inherits(this, o, MO.FG3dLight);
   return o;
}
MO.FG3dProjection = function FG3dProjection(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._matrix      = MO.Class.register(o, new MO.AGetter('_matrix'));
   o._size        = MO.Class.register(o, new MO.AGetter('_size'));
   o._angle       = MO.Class.register(o, new MO.AGetSet('_angle'), 60.0);
   o._fieldOfView = MO.Class.register(o, new MO.AGetSet('_fieldOfView'), 0);
   o._znear       = MO.Class.register(o, new MO.AGetSet('_znear'), 0.1);
   o._zfar        = MO.Class.register(o, new MO.AGetSet('_zfar'), 200);
   o._zoom        = MO.Class.register(o, new MO.AGetSet('_zoom'), 1);
   o.construct    = MO.FG3dProjection_construct;
   o.distance     = MO.FG3dProjection_distance;
   o.dispose      = MO.FG3dProjection_dispose;
   return o;
}
MO.FG3dProjection_construct = function FG3dProjection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new MO.SMatrix3d();
   o._size = new MO.SSize2();
}
MO.FG3dProjection_distance = function FG3dProjection_distance(){
   return this._zfar - this._znear;
}
MO.FG3dProjection_dispose = function FG3dProjection_dispose(){
   var o = this;
   o._matrix = MO.Lang.Object.dispose(o._matrix);
   o._size = MO.Lang.Object.dispose(o._size);
   o.__base.FObject.dispose.call(o);
}
MO.FG3dShaderTemplate = function FG3dShaderTemplate(o){
   o = MO.Class.inherits(this, o, MO.FTagDocument);
   o._space  = 'shader';
   return o;
}
MO.FG3dSpotLight = function FG3dSpotLight(o){
   o = MO.Class.inherits(this, o, MO.FG3dLight);
   return o;
}
MO.FG3dTechnique = function FG3dTechnique(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._code           = MO.Class.register(o, new MO.AGetter('_code'));
   o._activeMode     = MO.Class.register(o, new MO.AGetter('_activeMode'));
   o._modes          = MO.Class.register(o, new MO.AGetter('_modes'));
   o._passes         = MO.Class.register(o, new MO.AGetter('_passes'));
   o.construct       = MO.FG3dTechnique_construct;
   o.registerMode    = MO.FG3dTechnique_registerMode;
   o.selectMode      = MO.FG3dTechnique_selectMode;
   o.updateRegion    = MO.Method.empty;
   o.clear           = MO.FG3dTechnique_clear;
   o.clearDepth      = MO.FG3dTechnique_clearDepth;
   o.sortRenderables = MO.FG3dTechnique_sortRenderables;
   o.drawRegion      = MO.FG3dTechnique_drawRegion;
   o.present         = MO.FG3dTechnique_present;
   return o;
}
MO.FG3dTechnique_construct = function FG3dTechnique_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._modes = new MO.TObjects();
   o._passes = new MO.TObjects();
}
MO.FG3dTechnique_registerMode = function FG3dTechnique_registerMode(p){
   var o = this;
   var m = MO.Class.create(MO.FG3dTechniqueMode);
   m.setCode(p);
   o._modes.push(m);
   o._activeMode = m;
   return m;
}
MO.FG3dTechnique_selectMode = function FG3dTechnique_selectMode(p){
   var o = this;
}
MO.FG3dTechnique_clear = function FG3dTechnique_clear(color){
   var o = this;
   var context = o._graphicContext;
   context.setRenderTarget(null);
   context.clear(color.red, color.green, color.blue, color.alpha, 1);
}
MO.FG3dTechnique_clearDepth = function FG3dTechnique_clearDepth(depth){
   var o = this;
   if(depth == null){
      depth = 1;
   }
   var context = o._graphicContext;
   context.clearDepth(depth);
}
MO.FG3dTechnique_sortRenderables = function FG3dTechnique_sortRenderables(a, b){
}
MO.FG3dTechnique_drawRegion = function FG3dTechnique_drawRegion(region){
   var o = this;
   region.setTechnique(o);
   var passes = o._passes;
   var count = passes.count();
   for(var i = 0; i < count; i++){
      var pass = passes.at(i);
      region.setTechniquePass(pass, (i == count - 1));
      pass.drawRegion(region);
   }
}
MO.FG3dTechnique_present = function FG3dTechnique_present(p){
   this._graphicContext.present();
}
MO.FG3dTechniqueConsole = function FG3dTechniqueConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd    = MO.EScope.Local;
   o._techniques = MO.Class.register(o, new MO.AGetter('_techniques'));
   o.construct   = MO.FG3dTechniqueConsole_construct;
   o.find        = MO.FG3dTechniqueConsole_find;
   return o;
}
MO.FG3dTechniqueConsole_construct = function FG3dTechniqueConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._techniques = new MO.TDictionary();
}
MO.FG3dTechniqueConsole_find = function FG3dTechniqueConsole_find(context, clazz){
   var o = this;
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      context = context.graphicContext();
   }
   if(!MO.Class.isClass(context, MO.FGraphicContext)){
      throw new MO.TError(o, 'Unknown context.');
   }
   var code = context.hashCode() + '|' + MO.Class.name(clazz);
   var techniques = o._techniques;
   var technique = techniques.get(code);
   if(!technique){
      technique = MO.Class.create(clazz);
      technique.linkGraphicContext(context);
      technique.setup();
      var techniqueCode = technique.code();
      var passes = technique.passes();
      var passCount = passes.count();
      for(var i = 0; i < passCount; i++){
         var pass = passes.at(i);
         var passCode = pass.code();
         pass.setFullCode(techniqueCode + '.' + passCode);
      }
      techniques.set(code, technique);
   }
   return technique;
}
MO.FG3dTechniqueMode = function FG3dTechniqueMode(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._code = MO.Class.register(o, new MO.AGetSet('_code'));
   return o;
}
MO.FG3dTechniquePass = function FG3dTechniquePass(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._fullCode       = MO.Class.register(o, new MO.AGetSet('_fullCode'));
   o._code           = MO.Class.register(o, new MO.AGetter('_code'));
   o._index          = null;
   o._finish         = false;
   o._materialMap    = null;
   o.setup           = MO.FG3dTechniquePass_setup;
   o.activeEffects   = MO.FG3dTechniquePass_activeEffects;
   o.sortRenderables = MO.FG3dTechniquePass_sortRenderables;
   o.drawRegion      = MO.FG3dTechniquePass_drawRegion;
   return o;
}
MO.FG3dTechniquePass_setup = function FG3dTechniquePass_setup(){
   var o = this;
   var map = o._materialMap = MO.Class.create(MO.FG3dMaterialMap);
   map.linkGraphicContext(o);
   map.setup(MO.EG3dMaterialMap.Count, 32);
}
MO.FG3dTechniquePass_sortRenderables = function FG3dTechniquePass_sortRenderables(source, target){
   var sourceMaterial = source.material().info();
   var targetMaterial = target.material().info();
   if(sourceMaterial.optionAlpha && targetMaterial.optionAlpha){
      var sourceEffect = source.activeEffect();
      var targetEffect = target.activeEffect();
      if(sourceEffect == targetEffect){
         var sourceReference = source.materialReference();
         var targetReference = target.materialReference();
         if(sourceReference && targetReference){
            return sourceReference.hashCode() - targetReference.hashCode();
         }
      }
      return sourceEffect.hashCode() - targetEffect.hashCode();
   }else if(sourceMaterial.optionAlpha && !targetMaterial.optionAlpha){
      return 1;
   }else if(!sourceMaterial.optionAlpha && targetMaterial.optionAlpha){
      return -1;
   }else{
      var sourceEffect = source.activeEffect();
      var targetEffect = target.activeEffect();
      if(sourceEffect == targetEffect){
         var sourceReference = source.materialReference();
         var targetReference = target.materialReference();
         if(sourceReference && targetReference){
            return sourceReference.hashCode() - targetReference.hashCode();
         }
      }
      return sourceEffect.hashCode() - targetEffect.hashCode();
   }
}
MO.FG3dTechniquePass_activeEffects = function FG3dTechniquePass_activeEffects(region, renderables){
   var o = this;
   var spaceName = region.spaceName();
   var count = renderables.count();
   for(var i = 0; i < count; i++){
      var renderable = renderables.at(i);
      var info = renderable.selectInfo(spaceName);
      if(!info.effect){
         info.effect = MO.Console.find(MO.FG3dEffectConsole).find(o._graphicContext, region, renderable);
      }
   }
}
MO.FG3dTechniquePass_drawRegion = function FG3dTechniquePass_drawRegion(region){
   var o = this;
   var renderables = region.renderables();
   var count = renderables.count();
   if(count == 0){
      return;
   }
   var statistics = region._statistics;
   statistics._frameDrawSort.begin();
   o.activeEffects(region, renderables);
   renderables.sort(o.sortRenderables);
   statistics._frameDrawSort.end();
   var capability = o._graphicContext.capability();
   if(capability.optionMaterialMap){
      var mm = o._materialMap;
      mm.resize(MO.EG3dMaterialMap.Count, count);
      for(var i = 0; i < count; i++){
         var r = renderables.get(i);
         r._materialId = i;
         var m = r.material();
         var mi = m.info();
         mm.setUint8(i, MO.EG3dMaterialMap.AmbientColor, mi.ambientColor);
         mm.setUint8(i, MO.EG3dMaterialMap.DiffuseColor, mi.diffuseColor);
         mm.setUint8(i, MO.EG3dMaterialMap.SpecularColor, mi.specularColor);
         mm.setUint8(i, MO.EG3dMaterialMap.ReflectColor, mi.reflectColor);
         mm.setUint8(i, MO.EG3dMaterialMap.EmissiveColor, mi.emissiveColor);
      }
      mm.update();
      region._materialMap = mm;
   }
   for(var n = 0; n < count; ){
      var groupBegin = n;
      var groupEnd = count;
      var effect = renderables.at(groupBegin).activeEffect();
      for(var i = n; i < count; i++){
         var activeEffect = renderables.at(i).activeEffect();
         if(effect != activeEffect){
            groupEnd = i;
            break;
         }
         n++;
      }
      effect.drawRegion(region, groupBegin, groupEnd - groupBegin);
   }
}
MO.FG3dTrack = function FG3dTrack(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._frames   = null;
   o.construct = MO.FG3dTrack_construct;
   o.calculate = MO.FG3dTrack_calculate;
   return o;
}
MO.FG3dTrack_construct = function FG3dTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
MO.FG3dTrack_update = function FG3dTrack_update(p){
   var o = this;
   var info = new MO.SG3dFrameInfo();
   o._trackResource.calculateFrameInfo(info, tick);
   info.update();
   o._matrix.assign(o._trackResource.matrixInvert());
   o._matrix.append(info.matrix);
   return true;
}
MO.FG3dTrack_calculate = function FG3dTrack_calculate(tick){
   var o = this;
   var frameCount = o._frames.count();
   if(frameCount == 0){
      return false;
   }
   if(tick < 0){
      tick = -tick;
   }
   var pCurrentFrame = o._frames.Get(index);
   var pNextFrame = null;
   if(index < frameCount -1){
      pNextFrame = o._frames.Get(index + 1);
   }else{
      pNextFrame = o._frames.Get(0);
   }
   info.tick = tick;
   info.currentFrame = pCurrentFrame;
   info.nextFrame = pNextFrame;
   return true;
}
MO.FG3dViewport = function FG3dViewport(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o.left   = 0;
   o.top    = 0;
   o.width  = 0;
   o.height = 0;
   o.set    = MO.FG3dViewport_set;
   return o;
}
MO.FG3dViewport_set = function FG3dViewport_set(left, top, width, height){
   var o = this;
   o.left = left;
   o.top = top;
   o.width = width;
   o.height= height;
}
MO.REngine3d = function REngine3d(){
   var o = this;
   o._setuped  = false;
   o._contexts = null;
   return o;
}
MO.REngine3d.prototype.onUnload = function REngine3d_onUnload(event){
   this.dispose();
}
MO.REngine3d.prototype.setup = function REngine3d_setup(){
   var o = this;
   if(!o._setuped){
      o._contexts = new MO.TObjects();
      MO.Window.lsnsUnload.register(o, o.onUnload);
      o._setuped = true;
   }
}
MO.REngine3d.prototype.contexts = function REngine3d_contexts(){
   return this._contexts;
}
MO.REngine3d.prototype.createContext = function REngine3d_createContext(clazz, hCanvas, attributes){
   var o = this;
   o.setup();
   var context = MO.Class.create(clazz);
   if(attributes){
      context._optionAlpha = attributes.alpha;
      context._optionAntialias = attributes.antialias;
   }
   if(!context.linkCanvas(hCanvas)){
      return null;
   }
   o._contexts.push(context);
   return context;
}
MO.REngine3d.prototype.dispose = function REngine3d_dispose(){
   var o = this;
   var contexts = o._contexts;
   if(contexts){
      var count = contexts.count();
      for(var i = 0; i < count; i++){
         var context = contexts.at(i);
         context.dispose();
      }
      o._contexts = MO.Lang.Object.dispose(contexts);
   }
}
MO.REngine3d = new MO.REngine3d();
MO.Graphic.Context3d = MO.REngine3d;
MO.Engine3d = MO.REngine3d;
MO.EG3dAttribute = new function EG3dAttribute(){
   var o = this;
   o.Position   = 'position';
   o.Color      = 'color';
   o.Coord      = 'coord';
   o.Normal     = 'normal';
   o.Binormal   = 'binormal';
   o.Tangent    = 'tangent';
   o.BoneIndex  = 'bone_index';
   o.BoneWeight = 'bone_weight';
   return o;
}
MO.EG3dAttributeFormat = new function EG3dAttributeFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Byte4 = 5;
   o.Byte4Normal = 6;
   return o;
}
MO.EG3dBlendMode = new function EG3dBlendMode(){
   var o = this;
   o.Zero             = 0;
   o.One              = 1;
   o.SrcColor         = 2;
   o.OneMinusSrcColor = 3;
   o.DstColor         = 4;
   o.OneMinusDstColor = 5;
   o.SrcAlpha         = 6;
   o.OneMinusSrcAlpha = 7;
   o.DstAlpha         = 8;
   o.OneMinusDstAlpha = 9;
   o.SrcAlphaSaturate = 10;
   return o;
}
MO.EG3dCullMode = new function EG3dCullMode(){
   var o = this;
   o.None = 0;
   o.Front= 1;
   o.Back = 2;
   o.Both = 3;
   return o;
}
MO.EG3dDepthMode = new function EG3dDepthMode(){
   var o = this;
   o.None = 0;
   o.Equal = 1;
   o.NotEqual = 2;
   o.Less = 3;
   o.LessEqual = 4;
   o.Greater = 5;
   o.GreaterEqual = 6;
   o.Always = 7;
   return o;
}
MO.EG3dDrawMode = new function EG3dDrawMode(){
   var o = this;
   o.Unknown = 0;
   o.Points = 1;
   o.Lines = 2;
   o.LineStrip = 3;
   o.LineLoop = 4;
   o.Triangles = 5;
   o.TriangleStrip = 6;
   o.TriangleFan = 7;
   o.Quads = 8;
   o.QuadStrip = 9;
   return o;
}
MO.EG3dFillMode = new function EG3dFillMode(){
   var o = this;
   o.Unknown = 0;
   o.Point = 1;
   o.Line = 2;
   o.Face = 3;
   return o;
}
MO.EG3dIndexStride = new function EG3dIndexStride(){
   var o = this;
   o.Unknown = 0;
   o.Uint16 = 1;
   o.Uint32 = 2;
   return o;
}
MO.EG3dParameterFormat = new function EG3dParameterFormat(){
   var o = this;
   o.Unknown = 0;
   o.Float1 = 1;
   o.Float2 = 2;
   o.Float3 = 3;
   o.Float4 = 4;
   o.Float3x3 = 5;
   o.Float4x3 = 6;
   o.Float4x4 = 7;
   return o;
}
MO.EG3dSampler = new function EG3dSampler(){
   var o = this;
   o.Diffuse       = 'diffuse';
   o.Alpha         = 'alpha';
   o.Normal        = 'normal';
   o.SpecularColor = 'specular.color';
   o.SpecularLevel = 'specular.level';
   o.Light         = 'light';
   o.Reflect       = 'reflect';
   o.Refract       = 'refract';
   o.Emissive      = 'emissive';
   o.Height        = 'height';
   o.Environment   = 'environment';
   return o;
}
MO.EG3dSamplerFilter = new function EG3dSamplerFilter(){
   var o = this;
   o.Unknown       = 0;
   o.Nearest       = 1;
   o.Linear        = 2;
   o.Repeat        = 3;
   o.ClampToEdge   = 4;
   o.ClampToBorder = 5;
   return o;
}
MO.EG3dShader = new function EG3dShader(){
   var o = this;
   o.Unknown = 0;
   o.Vertex   = 1;
   o.Fragment = 2;
   return o;
}
MO.EG3dTexture = new function EG3dTexture(){
   var o = this;
   o.Unknown = 0;
   o.Flat2d = 1;
   o.Flat3d = 2;
   o.Cube= 3;
   return o;
}
MO.SG3dContextCapability = function SG3dContextCapability(){
   var o = this;
   o.vendor              = null;
   o.version             = null;
   o.shaderVersion       = null;
   o.optionDebug         = false;
   o.optionInstance      = false;
   o.optionLayout        = false;
   o.optionMaterialMap   = false;
   o.optionIndex32       = false;
   o.optionShaderSource  = false;
   o.mergeCount          = 0;
   o.attributeCount      = null;
   o.vertexCount         = 65536;
   o.vertexConst         = null;
   o.fragmentConst       = null;
   o.varyingCount        = null;
   o.samplerCount        = null;
   o.samplerSize         = null;
   o.samplerCompressRgb  = null;
   o.samplerCompressRgba = null;
   o.shader              = null;
   return o;
}
MO.SG3dContextCapability.prototype.calculateBoneCount = function SG3dContextCapability_calculateBoneCount(boneCount, vertexCount){
   var o = this;
   var rb = 0;
   var bi = boneCount % 4;
   if(bi != 0){
      rb = boneCount + 4 - bi;
   }else{
      rb = boneCount;
   }
   var r = 0;
   var ib = (o.vertexConst - 16) / 4;
   if(rb > ib){
      r = ib;
   }else{
      r = rb;
   }
   return r;
}
MO.SG3dContextCapability.prototype.calculateInstanceCount = function SG3dContextCapability_calculateInstanceCount(boneCount, vertexCount){
   var o = this;
   var cr = (4 * boneCount) + 4;
   var ib = (o.vertexConst - 16) / cr;
   var r = cl;
   if(vertexCount > 0){
      var iv = o.vertexCount / vertexCount;
      r = Math.min(ib, iv);
   }
   if(r > 64){
      r = 64;
   }
   return r;
}
MO.SG3dContextCapability.prototype.dispose = function SG3dContextCapability_dispose(){
   var o = this;
   o.shader = null;
   MO.RObject.free(o);
}
MO.SG3dLayoutBuffer = function SG3dLayoutBuffer(){
   var o = this;
   o.slot     = null;
   o.buffer   = null;
   o.index    = null;
   o.formatCd = null;
   o.dispose  = MO.SG3dLayoutBuffer_dispose;
   return o;
}
MO.SG3dLayoutBuffer_dispose = function SG3dLayoutBuffer_dispose(){
   var o = this;
   o.slot = null;
   o.buffer = null;
   o.index = null;
   o.formatCd = null;
}
MO.SG3dLayoutSampler = function SG3dLayoutSampler(){
   var o = this;
   o.slot    = null;
   o.index   = -1;
   o.texture = null;
   o.dispose = MO.SG3dLayoutSampler_dispose;
   return o;
}
MO.SG3dLayoutSampler_dispose = function SG3dLayoutSampler_dispose(){
   var o = this;
   o.slot = null;
   o.index = -1;
   o.texture = null;
}
MO.FG3dBuffer = function FG3dBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._code   = MO.Class.register(o, new MO.AGetSet('_code'));
   o._data   = MO.Class.register(o, new MO.AGetSet('_data'));
   o.isValid = MO.Method.virtual(o, 'isValid');
   o.dispose = MO.FG3dBuffer_dispose;
   return o;
}
MO.FG3dBuffer_dispose = function FG3dBuffer_dispose(){
   var o = this;
   o._data = null;
   o.__base.FG3dObject.dispose.call(o);
}
MO.FG3dContext = function FG3dContext(o){
   o = MO.Class.inherits(this, o, MO.FGraphicContext);
   o._optionAlpha        = true;
   o._optionAntialias    = false;
   o._viewportRectangle  = MO.Class.register(o, new MO.AGetter('_viewportRectangle'));
   o._capability         = MO.Class.register(o, new MO.AGetter('_capability'));
   o._statistics         = MO.Class.register(o, new MO.AGetter('_statistics'));
   o._fillModeCd         = MO.EG3dFillMode.Face;
   o._optionDepth        = false;
   o._optionCull         = false;
   o._depthModeCd        = 0;
   o._cullModeCd         = 0;
   o._statusBlend        = false;
   o._blendSourceCd      = 0;
   o._blendTargetCd      = 0;
   o._program            = null;
   o._storePrograms      = null;
   o._storeLayouts       = null;
   o._storeBuffers       = null;
   o._storeTextures      = null;
   o._storeTargets       = null;
   o.construct           = MO.FG3dContext_construct;
   o.linkCanvas          = MO.FG3dContext_linkCanvas;
   o.createObject        = MO.FG3dContext_createObject;
   o.createProgram       = MO.Method.virtual(o, 'createProgram');
   o.createLayout        = MO.Method.virtual(o, 'createLayout');
   o.createVertexBuffer  = MO.Method.virtual(o, 'createVertexBuffer');
   o.createIndexBuffer   = MO.Method.virtual(o, 'createIndexBuffer');
   o.createFlatTexture   = MO.Method.virtual(o, 'createFlatTexture');
   o.createCubeTexture   = MO.Method.virtual(o, 'createCubeTexture');
   o.createRenderTarget  = MO.Method.virtual(o, 'createRenderTarget');
   o.setViewport         = MO.Method.virtual(o, 'setViewport');
   o.setFillMode         = MO.Method.virtual(o, 'setFillMode');
   o.setDepthMode        = MO.Method.virtual(o, 'setDepthMode');
   o.setCullingMode      = MO.Method.virtual(o, 'setCullingMode');
   o.setBlendFactors     = MO.Method.virtual(o, 'setBlendFactors');
   o.setScissorRectangle = MO.Method.virtual(o, 'setScissorRectangle');
   o.setRenderTarget     = MO.Method.virtual(o, 'setRenderTarget');
   o.setProgram          = MO.Method.virtual(o, 'setProgram');
   o.bindVertexBuffer    = MO.Method.virtual(o, 'bindVertexBuffer');
   o.bindTexture         = MO.Method.virtual(o, 'bindTexture');
   o.prepare             = MO.FG3dContext_prepare;
   o.clear               = MO.Method.virtual(o, 'clear');
   o.clearColor          = MO.Method.virtual(o, 'clearColor');
   o.clearDepth          = MO.Method.virtual(o, 'clearDepth');
   o.drawTriangles       = MO.Method.virtual(o, 'drawTriangles');
   o.present             = MO.Method.virtual(o, 'present');
   o.dispose             = MO.FG3dContext_dispose;
   return o;
}
MO.FG3dContext_construct = function FG3dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
   o._viewportRectangle = new MO.SRectangle();
   o._statistics = MO.Class.create(MO.FG3dStatistics);
   MO.Console.find(MO.FStatisticsConsole).register('graphic3d.context', o._statistics);
   o._storePrograms = new MO.TObjects();
   o._storeLayouts = new MO.TObjects();
   o._storeBuffers = new MO.TObjects();
   o._storeTextures = new MO.TObjects();
   o._storeTargets = new MO.TObjects();
}
MO.FG3dContext_linkCanvas = function FG3dContext_linkCanvas(h){
   var o = this;
   o._size.set(h.width, h.height);
}
MO.FG3dContext_createObject = function FG3dContext_createObject(clazz){
   var o = this;
   var instance = MO.Class.create(clazz);
   instance.linkGraphicContext(o);
   instance.setup();
   return instance;
}
MO.FG3dContext_prepare = function FG3dContext_prepare(){
   this._statistics.resetFrame();
}
MO.FG3dContext_dispose = function FG3dContext_dispose(){
   var o = this;
   var programs = o._storePrograms;
   if(programs){
      var count = programs.count();
      for(var i = 0; i < count; i++){
         var program = programs.at(i);
         program.dispose();
      }
      o._storePrograms = MO.Lang.Object.dispose(programs);
   }
   var layouts = o._storeLayouts;
   if(layouts){
      var count = layouts.count();
      for(var i = 0; i < count; i++){
         var layout = layouts.at(i);
         layout.dispose();
      }
      o._storeLayouts = MO.Lang.Object.dispose(layouts);
   }
   var buffers = o._storeBuffers;
   if(buffers){
      var count = buffers.count();
      for(var i = 0; i < count; i++){
         var buffer = buffers.at(i);
         buffer.dispose();
      }
      o._storeBuffers = MO.Lang.Object.dispose(buffers);
   }
   var textures = o._storeTextures;
   if(textures){
      var count = textures.count();
      for(var i = 0; i < count; i++){
         var texture = textures.at(i);
         texture.dispose();
      }
      o._storeTextures = MO.Lang.Object.dispose(textures);
   }
   var targets = o._storeTargets;
   if(targets){
      var count = targets.count();
      for(var i = 0; i < count; i++){
         var target = targets.at(i);
         target.dispose();
      }
      o._storeTargets = MO.Lang.Object.dispose(targets);
   }
   o._program = null;
   o._viewportRectangle = MO.Lang.Object.dispose(o._viewportRectangle);
   o._capability = MO.Lang.Object.dispose(o._capability);
   o._statistics = MO.Lang.Object.dispose(o._statistics);
   o._handleInstance = null;
   o._handleLayout = null;
   o._handle = null;
   o.__base.FGraphicContext.dispose.call(o);
}
MO.FG3dCubeTexture = function FG3dCubeTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dTexture);
   o.size = 0;
   o.construct = MO.FG3dTexture_construct;
   o.upload    = MO.Method.virtual(o, 'upload');
   o.update    = MO.Method.empty;
   return o;
}
MO.FG3dTexture_construct = function FG3dTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = MO.EG3dTexture.Cube;
}
MO.FG3dFlatTexture = function FG3dFlatTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dTexture);
   o._optionFlipY = MO.Class.register(o, new MO.AGetSet('_optionFlipY'), false);
   o._size        = MO.Class.register(o, new MO.AGetter('_size'));
   o.construct    = MO.FG3dFlatTexture_construct;
   o.uploadData   = MO.Method.virtual(o, 'uploadData');
   o.upload       = MO.Method.virtual(o, 'upload');
   o.update       = MO.Method.empty;
   return o;
}
MO.FG3dFlatTexture_construct = function FG3dFlatTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = MO.EG3dTexture.Flat2d;
}
MO.FG3dFragmentShader = function FG3dFragmentShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dShader);
   return o;
}
MO.FG3dIndexBuffer = function FG3dIndexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dBuffer);
   o._strideCd   = MO.Class.register(o, new MO.AGetSet('_strideCd'), MO.EG3dIndexStride.Uint16);
   o._count      = MO.Class.register(o, new MO.AGetSet('_count'), 0);
   o._drawModeCd = MO.Class.register(o, new MO.AGetSet('_drawModeCd'), MO.EG3dDrawMode.Triangles);
   o._lineWidth  = MO.Class.register(o, new MO.AGetSet('_lineWidth'), 1);
   o.upload      = MO.Method.virtual(o, 'upload');
   return o;
}
MO.FG3dLayout = function FG3dLayout(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._buffers       = MO.Class.register(o, new MO.AGetter('_buffers'));
   o._samplers      = MO.Class.register(o, new MO.AGetter('_samplers'));
   o.linkBuffers    = MO.FG3dLayout_linkBuffers;
   o.bindBuffers    = MO.FG3dLayout_bindBuffers;
   o.linkSamplers   = MO.FG3dLayout_linkSamplers;
   o.bindSamplers   = MO.FG3dLayout_bindSamplers;
   o.unbindSamplers = MO.FG3dLayout_unbindSamplers;
   o.dispose        = MO.FG3dLayout_dispose;
   return o;
}
MO.FG3dLayout_construct = function FG3dLayout_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
}
MO.FG3dLayout_linkBuffers = function FG3dLayout_linkBuffers(buffers){
   var o = this;
   if(!buffers.isEmpty()){
      var items = o._buffers;
      if(!items){
         items = o._buffers = new MO.TObjects();
      }
      items.assign(buffers);
   }
}
MO.FG3dLayout_bindBuffers = function FG3dLayout_bindBuffers(){
   var o = this;
   var context = o._graphicContext;
   var buffers = o._buffers;
   if(buffers){
      var count = buffers.count();
      for(var i = 0; i < count; i++){
         var buffer = buffers.at(i);
         context.bindVertexBuffer(buffer.slot, buffer.buffer, buffer.index, buffer.formatCd);
      }
   }
}
MO.FG3dLayout_linkSamplers = function FG3dLayout_linkSamplers(samplers){
   var o = this;
   if(!samplers.isEmpty()){
      var items = o._samplers;
      if(!items){
         items = o._samplers = new MO.TObjects();
      }
      items.assign(samplers);
   }
}
MO.FG3dLayout_bindSamplers = function FG3dLayout_bindSamplers(){
   var o = this;
   var context = o._graphicContext;
   var samplers = o._samplers;
   if(samplers){
      var count = samplers.count();
      for(var i = 0; i < count; i++){
         var sampler = samplers.at(i);
         context.bindTexture(sampler.slot, sampler.index, sampler.texture);
      }
   }
}
MO.FG3dLayout_unbindSamplers = function FG3dLayout_unbindSamplers(){
   var o = this;
   var context = o._graphicContext;
   var samplers = o._samplers;
   if(samplers){
      var count = samplers.count();
      for(var i = 0; i < count; i++){
         var sampler = samplers.at(i);
         context.bindTexture(sampler.slot, sampler.index, null);
      }
   }
}
MO.FG3dLayout_dispose = function FG3dLayout_dispose(){
   var o = this;
   o._buffers = MO.Lang.Object.dispose(o._buffers);
   o._samplers = MO.Lang.Object.dispose(o._samplers);
   o.__base.FG3dObject.dispose.call(o);
}
MO.FG3dProgram = function FG3dProgram(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._attributes       = null;
   o._parameters       = null;
   o._samplers         = null;
   o._vertexShader     = null;
   o._fragmentShader   = null;
   o.hasAttribute      = MO.FG3dProgram_hasAttribute;
   o.registerAttribute = MO.FG3dProgram_registerAttribute;
   o.findAttribute     = MO.FG3dProgram_findAttribute;
   o.attributes        = MO.FG3dProgram_attributes;
   o.hasParameter      = MO.FG3dProgram_hasParameter;
   o.registerParameter = MO.FG3dProgram_registerParameter;
   o.findParameter     = MO.FG3dProgram_findParameter;
   o.parameters        = MO.FG3dProgram_parameters;
   o.hasSampler        = MO.FG3dProgram_hasSampler;
   o.registerSampler   = MO.FG3dProgram_registerSampler;
   o.findSampler       = MO.FG3dProgram_findSampler;
   o.samplers          = MO.FG3dProgram_samplers;
   o.vertexShader      = MO.Method.virtual(o, 'vertexShader');
   o.fragmentShader    = MO.Method.virtual(o, 'fragmentShader');
   o.setAttribute      = MO.FG3dProgram_setAttribute;
   o.setParameter      = MO.FG3dProgram_setParameter;
   o.setParameter4     = MO.FG3dProgram_setParameter4;
   o.setSampler        = MO.FG3dProgram_setSampler;
   o.upload            = MO.Method.virtual(o, 'upload');
   o.dispose           = MO.FG3dProgram_dispose;
   return o;
}
MO.FG3dProgram_hasAttribute = function FG3dProgram_hasAttribute(){
   var o = this;
   var r = o._attributes;
   return r ? !r.isEmpty() : false;
}
MO.FG3dProgram_registerAttribute = function FG3dProgram_registerAttribute(n){
   var o = this;
   var r = MO.Class.create(MO.FG3dProgramAttribute);
   r._name = n;
   o.attributes().set(n, r);
   return r;
}
MO.FG3dProgram_findAttribute = function FG3dProgram_findAttribute(n){
   return this._attributes ? this._attributes.get(n) : null;
}
MO.FG3dProgram_attributes = function FG3dProgram_attributes(){
   var o = this;
   var r = o._attributes;
   if(r == null){
      r = o._attributes = new MO.TDictionary();
   }
   return r;
}
MO.FG3dProgram_hasParameter = function FG3dProgram_hasParameter(){
   var o = this;
   var r = o._parameters;
   return r ? !r.isEmpty() : false;
}
MO.FG3dProgram_registerParameter = function FG3dProgram_registerParameter(pn, pf){
   var o = this;
   var r = MO.Class.create(MO.FG3dProgramParameter);
   r._name = pn;
   r.formatCd = pf;
   o.parameters().set(pn, r);
   return r;
}
MO.FG3dProgram_findParameter = function FG3dProgram_findParameter(n){
   return this._parameters ? this._parameters.get(n) : null;
}
MO.FG3dProgram_parameters = function FG3dProgram_parameters(){
   var o = this;
   var r = o._parameters;
   if(r == null){
      r = o._parameters = new MO.TDictionary();
   }
   return r;
}
MO.FG3dProgram_hasSampler = function FG3dProgram_hasSampler(){
   var o = this;
   var r = o._samplers;
   return r ? !r.isEmpty() : false;
}
MO.FG3dProgram_registerSampler = function FG3dProgram_registerSampler(pn){
   var o = this;
   var r = MO.Class.create(MO.FG3dProgramSampler);
   r._name = pn;
   o.samplers().set(pn, r);
   return r;
}
MO.FG3dProgram_findSampler = function FG3dProgram_findSampler(n){
   return this._samplers ? this._samplers.get(n) : null;
}
MO.FG3dProgram_samplers = function FG3dProgram_samplers(){
   var o = this;
   var r = o._samplers;
   if(r == null){
      r = o._samplers = new MO.TDictionary();
   }
   return r;
}
MO.FG3dProgram_setAttribute = function FG3dProgram_setAttribute(pn, pb, pf){
   var o = this;
   var p = o.findAttribute(pn);
   if(p == null){
      throw new MO.TError(o, 'Bind invalid attribute. (name={1})', pn);
   }
   o._graphicContext.bindVertexBuffer(p._slot, pb, 0, pf);
}
MO.FG3dProgram_setParameter = function FG3dProgram_setParameter(pn, pv, pc){
   var o = this;
   var p = o.findParameter(pn);
   if(p == null){
      throw new MO.TError(o, 'Bind invalid parameter. (name={1})', pn);
   }
   var d = null;
   var t = pv.constructor;
   if((t == Float32Array) || (t == MO.SMatrix3d) || (t == MO.SPerspectiveMatrix3d)){
      d = pv;
   }else if(t == MO.SColor4){
      d = MO.Lang.TypeArray.float4();
      d[0] = pv.red;
      d[1] = pv.green;
      d[2] = pv.blue;
      d[3] = pv.alpha;
   }else if((t == MO.SPoint3) || (t == MO.SVector3)){
      d = MO.Lang.TypeArray.float3();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
   }else if((t == MO.SPoint4) || (t == MO.SVector4)){
      d = MO.Lang.TypeArray.float4();
      d[0] = pv.x;
      d[1] = pv.y;
      d[2] = pv.z;
      d[3] = pv.w;
   }else{
      throw new MO.TError(o, 'Bind invalid parameter type. (name={1}, type={2})', pn, t);
   }
   if(p.attachData(d)){
      o._graphicContext.bindConst(null, p._slot, p._formatCd, d, pc);
   }
}
MO.FG3dProgram_setParameter4 = function FG3dProgram_setParameter4(pn, px, py, pz, pw){
   var v = MO.Lang.TypeArray.float4();
   v[0] = px;
   v[1] = py;
   v[2] = pz;
   v[3] = pw;
   this.setParameter(pn, v, 1);
}
MO.FG3dProgram_setSampler = function FG3dProgram_setSampler(pn, pt){
   var o = this;
   var p = o.findSampler(pn);
   if(p == null){
      throw new MO.TError(o, 'Bind invalid sampler. (name={1})', pn);
   }
   o._graphicContext.bindTexture(p._slot, p._index, pt);
}
MO.FG3dProgram_dispose = function FG3dProgram_dispose(){
   var o = this;
   o._attributes = MO.Lang.Object.dispose(o._attributes, true);
   o._parameters = MO.Lang.Object.dispose(o._parameters, true);
   o._samplers = MO.Lang.Object.dispose(o._samplers, true);
   o._vertexShader = MO.Lang.Object.dispose(o._vertexShader);
   o._fragmentShader = MO.Lang.Object.dispose(o._fragmentShader);
   o.__base.FG3dObject.dispose.call(o);
}
MO.FG3dProgramAttribute = function FG3dProgramAttribute(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._linker     = MO.Class.register(o, new MO.AGetter('_linker'));
   o._statusUsed = false;
   o._slot       = null;
   o._index      = -1;
   o._formatCd   = MO.EG3dAttributeFormat.Unknown;
   o.loadConfig  = MO.FG3dProgramAttribute_loadConfig;
   o.dispose     = MO.FG3dProgramAttribute_dispose;
   return o;
}
MO.FG3dProgramAttribute_loadConfig = function FG3dProgramAttribute_loadConfig(xconfig){
   var o = this;
   o._name = xconfig.get('name');
   o._linker = xconfig.get('linker');
   o._formatCd = MO.REnum.encode(MO.EG3dAttributeFormat, xconfig.get('format'));
}
MO.FG3dProgramAttribute_dispose = function FG3dProgramAttribute_dispose(){
   var o = this;
   o._slot = null;
   o.__base.FObject.dispose.call(o);
}
MO.FG3dProgramParameter = function FG3dProgramParameter(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._linker     = MO.Class.register(o, new MO.AGetter('_linker'));
   o._formatCd   = MO.EG3dParameterFormat.Unknown;
   o._define     = MO.Class.register(o, new MO.AGetter('_define'));
   o._statusUsed = false;
   o._slot       = null;
   o._size       = 0;
   o._buffer     = null;
   o._memory     = null;
   o.attachData  = MO.FG3dProgramParameter_attachData;
   o.loadConfig  = MO.FG3dProgramParameter_loadConfig;
   o.dispose     = MO.FG3dProgramParameter_dispose;
   return o;
}
MO.FG3dProgramParameter_attachData = function FG3dProgramParameter_attachData(value){
   var o = this;
   var result = false;
   var clazz = value.constructor;
   if(clazz == MO.SMatrix3d){
      var memory = o._memory;
      if(!memory){
         memory = o._memory = new Float32Array(16);
      }
      result = MO.Lang.Float.attach(memory, value._data, 16);
   }else if(clazz == Float32Array){
      var length = value.length;
      var memory = o._memory;
      if(!memory){
         memory = o._memory = new Float32Array(length);
      }
      result = MO.Lang.Float.attach(memory, value, length);
   }else{
      throw new MO.TError(o, 'Unknown data type.');
   }
   return result;
}
MO.FG3dProgramParameter_loadConfig = function FG3dProgramParameter_loadConfig(xconfig){
   var o = this;
   o._name = xconfig.get('name');
   o._linker = xconfig.get('linker');
   o._formatCd = MO.Lang.Enum.encode(MO.EG3dParameterFormat, xconfig.get('format'));
   o._define = xconfig.get('define');
}
MO.FG3dProgramParameter_dispose = function FG3dProgramParameter_dispose(){
   var o = this;
   o._slot = null;
   o._memory = null;
   o.__base.FObject.dispose.call(o);
}
MO.FG3dProgramSampler = function FG3dProgramSampler(o){
   o = MO.Class.inherits(this, o, MO.FObject);
   o._name       = MO.Class.register(o, new MO.AGetter('_name'));
   o._linker     = MO.Class.register(o, new MO.AGetter('_linker'));
   o._statusUsed = false;
   o._formatCd   = MO.Class.register(o, new MO.AGetter('_formatCd'), MO.EG3dTexture.Flat2d);
   o._bind       = true;
   o._slot       = -1;
   o._index      = 0;
   o._source     = null;
   o.loadConfig  = MO.FG3dProgramSampler_loadConfig;
   o.dispose     = MO.FG3dProgramSampler_dispose;
   return o;
}
MO.FG3dProgramSampler_loadConfig = function FG3dProgramSampler_loadConfig(xconfig){
   var o = this;
   o._name = xconfig.get('name');
   o._linker = xconfig.get('linker');
   o._bind = MO.Lang.Boolean.parse(xconfig.get('bind', 'Y'));
   o._formatCd = MO.Lang.Enum.encode(MO.EG3dTexture, xconfig.get('format', 'Flat2d'));
}
MO.FG3dProgramSampler_dispose = function FG3dProgramSampler_dispose(){
   var o = this;
   o._slot = null;
   o.__base.FObject.dispose.call(o);
}
MO.FG3dRenderTarget = function FG3dRenderTarget(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._size     = MO.Class.register(o, new MO.AGetter('_size'));
   o._color    = MO.Class.register(o, new MO.AGetter('_color'));
   o._textures = null;
   o.construct = MO.FG3dRenderTarget_construct;
   o.textures  = MO.FG3dRenderTarget_textures;
   o.dispose   = MO.FG3dRenderTarget_dispose;
   return o;
}
MO.FG3dRenderTarget_construct = function FG3dRenderTarget_construct(){
   var o = this;
   o.__base.FG3dObject.construct();
   o._size = new SSize2();
   o._color = new SColor4();
   o._color.set(0.0, 0.0, 0.0, 1.0);
}
MO.FG3dRenderTarget_textures = function FG3dRenderTarget_textures(){
   var o = this;
   var textures = o._textures;
   if(textures == null){
      textures = o._textures = new TObjects();
   }
   return textures;
}
MO.FG3dRenderTarget_dispose = function FG3dRenderTarget_dispose(){
   var o = this;
   o._size = RObject.dispose(o._size);
   o._color = RObject.dispose(o._color);
   o.__base.dispose.construct();
}
MO.FG3dShader = function FG3dShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._source = MO.Class.register(o, new MO.AGetter('_source'));
   o.upload  = MO.Method.virtual(o, 'upload');
   return o;
}
MO.FG3dStatistics = function FG3dStatistics(o){
   o = MO.Class.inherits(this, o, MO.FStatistics);
   o._frameClearCount     = MO.Class.register(o, new MO.AGetter('_frameClearCount'), 0);
   o._frameFillModeCount  = MO.Class.register(o, new MO.AGetter('_frameFillModeCount'), 0);
   o._frameDepthModeCount = MO.Class.register(o, new MO.AGetter('_frameDepthModeCount'), 0);
   o._frameCullModeCount  = MO.Class.register(o, new MO.AGetter('_frameCullModeCount'), 0);
   o._frameBlendModeCount = MO.Class.register(o, new MO.AGetter('_frameBlendModeCount'), 0);
   o._frameProgramCount   = MO.Class.register(o, new MO.AGetter('_frameProgramCount'), 0);
   o._frameConstCount     = MO.Class.register(o, new MO.AGetter('_frameConstCount'), 0);
   o._frameConstLength    = MO.Class.register(o, new MO.AGetter('_frameConstLength'), 0);
   o._frameBufferCount    = MO.Class.register(o, new MO.AGetter('_frameBufferCount'), 0);
   o._frameTextureCount   = MO.Class.register(o, new MO.AGetter('_frameTextureCount'), 0);
   o._frameTargetCount    = MO.Class.register(o, new MO.AGetter('_frameTargetCount'), 0);
   o._frameDrawCount      = MO.Class.register(o, new MO.AGetter('_frameDrawCount'), 0);
   o._frameTriangleCount  = MO.Class.register(o, new MO.AGetter('_frameTriangleCount'), 0);
   o._programTotal        = MO.Class.register(o, new MO.AGetter('_programTotal'), 0);
   o._layoutTotal         = MO.Class.register(o, new MO.AGetter('_layoutTotal'), 0);
   o._vertexBufferTotal   = MO.Class.register(o, new MO.AGetter('_vertexBufferTotal'), 0);
   o._indexBufferTotal    = MO.Class.register(o, new MO.AGetter('_indexBufferTotal'), 0);
   o._flatTextureTotal    = MO.Class.register(o, new MO.AGetter('_flatTextureTotal'), 0);
   o._cubeTextureTotal    = MO.Class.register(o, new MO.AGetter('_cubeTextureTotal'), 0);
   o._targetTotal         = MO.Class.register(o, new MO.AGetter('_targetTotal'), 0);
   o.reset                = MO.FG3dStatistics_reset;
   o.resetFrame           = MO.FG3dStatistics_resetFrame;
   return o;
}
MO.FG3dStatistics_reset = function FG3dStatistics_reset(){
   o._programTotal = 0;
   o._layoutTotal = 0;
   o._vertexBufferTotal = 0;
   o._indexBufferTotal = 0;
   o._flatTextureTotal = 0;
   o._cubeTextureTotal = 0;
   o._targetTotal = 0;
}
MO.FG3dStatistics_resetFrame = function FG3dStatistics_resetFrame(){
   var o = this;
   o._frameClearCount = 0;
   o._frameFillModeCount = 0;
   o._frameDepthModeCount = 0;
   o._frameCullModeCount = 0;
   o._frameBlendModeCount = 0;
   o._frameProgramCount = 0;
   o._frameConstCount = 0;
   o._frameConstLength = 0;
   o._frameBufferCount = 0;
   o._frameTextureCount = 0;
   o._frameTargetCount = 0;
   o._frameTriangleCount = 0;
   o._frameDrawCount = 0;
}
MO.FG3dTexture = function FG3dTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dObject);
   o._textureCd   = MO.Class.register(o, new MO.AGetter('_textureCd'), MO.EG3dTexture.Unknown);
   o._filterMinCd = MO.Class.register(o, new MO.AGetSet('_filterMinCd'), MO.EG3dSamplerFilter.Linear);
   o._filterMagCd = MO.Class.register(o, new MO.AGetSet('_filterMagCd'), MO.EG3dSamplerFilter.Linear);
   o._wrapS       = MO.Class.register(o, new MO.AGetSet('_wrapS'), MO.EG3dSamplerFilter.Unknown);
   o._wrapT       = MO.Class.register(o, new MO.AGetSet('_wrapT'), MO.EG3dSamplerFilter.Unknown);
   o._statusLoad  = false;
   o.isValid      = MO.Method.virtual(o, 'isValid');
   o.setFilterCd  = MO.FG3dTexture_setFilterCd;
   o.setWrapCd    = MO.FG3dTexture_setWrapCd;
   return o;
}
MO.FG3dTexture_setFilterCd = function FG3dTexture_setFilterCd(minCd, magCd){
   var o = this;
   o._filterMinCd = minCd;
   o._filterMagCd = magCd;
}
MO.FG3dTexture_setWrapCd = function FG3dTexture_setWrapCd(wrapS, wrapT){
   var o = this;
   o._wrapS = wrapS;
   o._wrapT = wrapT;
}
MO.FG3dVertexBuffer = function FG3dVertexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dBuffer);
   o._formatCd = MO.Class.register(o, new MO.AGetSet('_formatCd'), MO.EG3dAttributeFormat.Unknown);
   o._stride   = MO.Class.register(o, new MO.AGetSet('_stride'), 0);
   o._count    = MO.Class.register(o, new MO.AGetSet('_count'), 0);
   o.upload    = MO.Method.virtual(o, 'upload');
   return o;
}
MO.FG3dVertexShader = function FG3dVertexShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dShader);
   return o;
}
MO.FG3dAutomaticEffect = function FG3dAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dEffect);
   o._optionMerge                 = false;
   o._optionBlendMode             = true;
   o._supportInstance             = false;
   o._supportLayout               = false;
   o._supportMaterialMap          = false;
   o._supportVertexColor          = true;
   o._supportVertexCoord          = true;
   o._supportVertexNormal         = true;
   o._supportVertexNormalFull     = true;
   o._supportVertexNormalCompress = false;
   o._supportSkeleton             = false;
   o._supportAlpha                = true;
   o._supportAmbient              = true;
   o._supportDiffuse              = true;
   o._supportDiffuseView          = true;
   o._supportSpecularColor        = true;
   o._supportSpecularLevel        = true;
   o._supportSpecularView         = true;
   o._supportLight                = true;
   o._supportReflect              = true;
   o._supportRefract              = true;
   o._supportEmissive             = true;
   o._supportHeight               = true;
   o._supportEnvironment          = true;
   o._dynamicSkeleton             = true;
   o.setup                        = MO.FG3dAutomaticEffect_setup;
   o.buildInfo                    = MO.FG3dAutomaticEffect_buildInfo;
   o.bindAttributes               = MO.FG3dAutomaticEffect_bindAttributes;
   o.bindSamplers                 = MO.FG3dAutomaticEffect_bindSamplers;
   o.bindMaterialSamplers         = MO.FG3dAutomaticEffect_bindMaterialSamplers;
   o.bindMaterial                 = MO.FG3dAutomaticEffect_bindMaterial;
   o.drawRenderable               = MO.FG3dAutomaticEffect_drawRenderable;
   return o;
}
MO.FG3dAutomaticEffect_setup = function FG3dAutomaticEffect_setup(){
   var o = this;
   var c = o._graphicContext;
   var cp = c.capability();
   o._supportLayout = cp.optionLayout;
}
MO.FG3dAutomaticEffect_buildInfo = function FG3dAutomaticEffect_buildInfo(tagContext, info){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var flag = new MO.TString();
   flag.append(info.techniqueModeCode)
   tagContext.set("technique.mode", info.techniqueModeCode);
   var om = o._optionMerge = info.optionMerge;
   if(om){
      var mergeCount = info.mergeCount;
      var mergeStride = info.mergeStride;
      flag.append("|OI" + mergeCount);
      tagContext.setBoolean("option.instance", true);
      tagContext.set("instance.count", mergeCount);
      tagContext.set("instance.length", mergeStride * mergeCount);
   }
   if(capability.optionMaterialMap){
      flag.append("|OM");
      tagContext.setBoolean("option.material.map", true);
      o._supportMaterialMap = true;
   }
   if(info.optionNormalInvert){
      flag.append("|ON");
      tagContext.setBoolean("option.normal.invert", true);
      o._supportNormalInvert = true;
   }
   if(info.optionColor){
      flag.append("|OC");
      tagContext.setBoolean("option.color", true);
      o.optionAmbient = true;
   }
   if(info.optionAmbient){
      flag.append("|OA");
      tagContext.setBoolean("option.ambient", true);
      o.optionAmbient = true;
   }
   if(info.optionDiffuse){
      flag.append("|OD");
      tagContext.setBoolean("option.diffuse", true);
      o.optionDiffuse = true;
   }
   if(info.optionSpecular){
      flag.append("|OS");
      tagContext.setBoolean("option.specular", true);
      o.optionSpecular = true;
   }
   if(info.optionReflect){
      flag.append("|ORL");
      tagContext.setBoolean("option.reflect", true);
      o.optionReflect = true;
   }
   if(info.optionRefract){
      flag.append("|ORF");
      tagContext.setBoolean("option.refract", true);
      o.optionRefract = true;
   }
   var ac = info.attributeContains(MO.EG3dAttribute.Color);
   o._dynamicVertexColor = (o._supportVertexColor && ac);
   if(o._dynamicVertexColor){
      flag.append("|AC");
      tagContext.setBoolean("vertex.attribute.color", true);
   }
   var ad = info.attributeContains(MO.EG3dAttribute.Coord);
   o._dynamicVertexCoord = (o._supportVertexCoord && ad);
   if(o._dynamicVertexCoord){
      flag.append("|AD");
      tagContext.setBoolean("vertex.attribute.coord", true);
   }
   var an = info.attributeContains(MO.EG3dAttribute.Normal);
   o._dynamicVertexNormal = (o._supportVertexNormal && an);
   if(o._dynamicVertexNormal){
      flag.append("|AN");
      tagContext.setBoolean("vertex.attribute.normal", true);
   }
   var ab = info.attributeContains(MO.EG3dAttribute.Binormal);
   var at = info.attributeContains(MO.EG3dAttribute.Tangent);
   var af = (an && ab && at);
   o._dynamicVertexNormalFull = (o._supportVertexNormalFull && af);
   if(o._dynamicVertexNormalFull){
      flag.append("|ANF");
      tagContext.setBoolean("vertex.attribute.normal.full", true);
   }
   o._dynamicVertexNormalCompress = info.optionNormalCompress;
   if(o._dynamicVertexNormalCompress){
      flag.append("|ANC");
      tagContext.setBoolean("vertex.attribute.normal.compress", true);
   }
   o._dynamicInstance = (o._supportInstance && capability.optionInstance);
   if(o._dynamicInstance){
      flag.append("|SI");
      if(info){
         tagContext.setBoolean("support.instance", true);
      }
   }
   o._dynamicSkeleton = o._supportSkeleton;
   if(o._dynamicSkeleton){
      flag.append("|SS");
      if(info){
         tagContext.setBoolean("support.skeleton", true);
      }
   }
   var sdf  = info.samplerContains(MO.EG3dSampler.Diffuse);
   o._dynamicAlpha = o._supportAlpha;
   if(o._dynamicAlpha){
      flag.append("|RA");
      if(info){
         tagContext.setBoolean("support.alpha", true);
      }
      o._optionBlendMode = true;
   }else{
      o._optionBlendMode = false;
   }
   o._dynamicAmbient = o._supportAmbient;
   if(o._dynamicAmbient){
      flag.append("|TA");
      if(info){
         tagContext.setBoolean("support.ambient", true);
      }
      if(sdf){
         flag.append("|TAS");
         if(info){
            tagContext.setBoolean("support.ambient.sampler", true);
         }
      }
   }
   if(info.samplerContains(MO.EG3dSampler.Alpha)){
      tagContext.setBoolean("support.alpha.sampler", true);
   }
   var snr = info.samplerContains(MO.EG3dSampler.Normal);
   o._dynamicDiffuse = o._supportDiffuse && (o._dynamicVertexNormal || snr);
   if(o._supportDiffuse){
      if(info){
         tagContext.setBoolean("support.diffuse", true);
      }
      if(snr){
         flag.append("|TDD");
         if(info){
            tagContext.setBoolean("support.dump", true);
            tagContext.setBoolean("support.diffuse.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         flag.append("|TDN");
         if(info){
            tagContext.setBoolean("support.diffuse.normal", true);
         }
      }
   }
   o._dynamicDiffuseView = (o._supportDiffuseView && (o._dynamicVertexNormal || snr));
   if(o._supportDiffuseView){
      if(info){
         tagContext.setBoolean("support.diffuse.view", true);
      }
      if(snr){
         flag.append("|TDVD");
         if(info){
            tagContext.setBoolean("support.dump", true);
            tagContext.setBoolean("support.diffuse.view.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         flag.append("|TDVN");
         if(info){
            tagContext.setBoolean("support.diffuse.view.normal", true);
         }
      }
   }
   var spc = info.samplerContains(MO.EG3dSampler.SpecularColor);
   var spl = info.samplerContains(MO.EG3dSampler.SpecularLevel);
   o._dynamicSpecularColor = (o._supportSpecularColor && spc);
   o._dynamicSpecularLevel = (o._supportSpecularLevel && spl);
   if((o._dynamicSpecularColor || o._dynamicSpecularLevel) && o._dynamicVertexNormal){
      flag.append("|TS");
      if(info){
         tagContext.setBoolean("support.specular", true);
      }
      if(o._dynamicSpecularColor){
         flag.append("|TSC");
         if(info){
            tagContext.setBoolean("support.specular.color", true);
         }
      }
      if(o._dynamicSpecularLevel){
         flag.append("|TSL");
         if(info){
            tagContext.setBoolean("support.specular.level", true);
         }
      }else{
         flag.append("|NSL");
         if(info){
            tagContext.setBoolean("support.specular.normal", true);
         }
      }
   }
   o._dynamicSpecularView = o._supportSpecularView;
   if(o._dynamicSpecularView && o._dynamicVertexNormal){
      flag.append("|TSV");
      if(info){
         tagContext.setBoolean("support.specular.view", true);
      }
      if(o._dynamicSpecularColor){
         flag.append("|TSVC");
         if(info){
            tagContext.setBoolean("support.specular.view.color", true);
         }
      }
      if(o._dynamicSpecularLevel){
         flag.append("|TSVL");
         if(info){
            tagContext.setBoolean("support.specular.view.level", true);
         }
      }else{
         flag.append("|NSVL");
         if(info){
            tagContext.setBoolean("support.specular.view.normal", true);
         }
      }
   }
   var slg = info.samplerContains(MO.EG3dSampler.Light);
   o._dynamicLight = (o._supportLight && slg);
   if(o._dynamicLight){
      flag.append("|TL");
      if(info){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.light", true);
      }
   }
   var slr = info.samplerContains(MO.EG3dSampler.Reflect);
   o._dynamicReflect = (o._supportReflect && slr);
   if(o._dynamicReflect){
      flag.append("|TRL");
      if(info){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.reflect", true);
      }
   }
   var slf = info.samplerContains(MO.EG3dSampler.Refract);
   o._dynamicRefract = (o._supportRefract && slf);
   if(o._dynamicRefract){
      flag.append("|TRF");
      if(info){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.refract", true);
      }
   }
   var sle = info.samplerContains(MO.EG3dSampler.Emissive);
   o._dynamicEmissive = (o._supportEmissive && sle);
   if(o._dynamicEmissive){
      flag.append("|TLE");
      if(info){
         tagContext.setBoolean("support.sampler.light", true);
         tagContext.setBoolean("support.emissive", true);
      }
   }
   var shg = info.samplerContains(MO.EG3dSampler.Height);
   o._dynamicHeight = (o._supportHeight && shg);
   if(o._dynamicHeight){
      flag.append("|TH");
      if(info){
         tagContext.setBoolean("support.height", true);
      }
   }
   var sen = info.samplerContains(MO.EG3dSampler.Environment);
   o._dynamicEnvironment = (o._supportEnvironment && sen);
   if(o._dynamicEnvironment){
      flag.append("|TE");
      if(info){
         tagContext.setBoolean("support.environment", true);
      }
   }
   if(o._dynamicSkeleton){
      var boneCount = capability.calculateBoneCount(info.vertexBoneCount, info.vertexCount);
      flag.append("|B" + boneCount);
      tagContext.set("bone.count", boneCount);
      tagContext.set("bone.array.count", boneCount * 3);
      tagContext.setBoolean("support.bone.weight.1", true);
      tagContext.setBoolean("support.bone.weight.2", true);
      tagContext.setBoolean("support.bone.weight.3", true);
      tagContext.setBoolean("support.bone.weight.4", true);
   }
   tagContext.code = flag.flush();
}
MO.FG3dAutomaticEffect_bindAttributes = function FG3dAutomaticEffect_bindAttributes(renderable){
   var o = this;
   var program = o._program;
   if(program.hasAttribute()){
      var attributes = program.attributes();
      var count = attributes.count();
      for(var n = 0; n < count; n++){
         var attribute = attributes.at(n);
         if(attribute._statusUsed){
            var buffer = renderable.findVertexBuffer(attribute._linker);
            program.setAttribute(attribute._name, buffer, buffer._formatCd);
         }
      }
   }
}
MO.FG3dAutomaticEffect_bindSamplers = function FG3dAutomaticEffect_bindSamplers(renderable){
   var o = this;
   var program = o._program;
   if(o._supportMaterialMap){
      program.setSampler('fs_material', region.materialMap().texture());
   }
   if(program.hasSampler()){
      var samplers = program.samplers();
      var count = samplers.count();
      for(var n = 0; n < count; n++){
         var sampler = samplers.at(n);
         if(sampler._bind && sampler._statusUsed){
            var linker = sampler.linker();
            var texture = renderable.findTexture(linker);
            program.setSampler(sampler.name(), texture.texture());
         }
      }
   }
}
MO.FG3dAutomaticEffect_bindMaterialSamplers = function FG3dAutomaticEffect_bindMaterialSamplers(renderable, material){
   var o = this;
   var program = o._program;
   if(program.hasSampler()){
      var samplers = program.samplers();
      var count = samplers.count();
      for(var n = 0; n < count; n++){
         var sampler = samplers.at(n);
         if(sampler._bind && sampler._statusUsed){
            var linker = sampler.linker();
            var texture = material.findBitmap(linker);
            program.setSampler(sampler.name(), texture.texture());
         }
      }
   }
}
MO.FG3dAutomaticEffect_bindMaterial = function FG3dAutomaticEffect_bindMaterial(material){
   var o = this;
   var context = o._graphicContext;
   var info = material.info();
   if(info.optionDepth){
      context.setDepthMode(o._stateDepth, o._stateDepthCd);
   }else{
      context.setDepthMode(false);
   }
   if(info.optionAlpha){
      context.setBlendFactors(o._stateBlend, o._stateBlendSourceCd, o._stateBlendTargetCd);
   }else{
      context.setBlendFactors(false);
   }
   if(info.optionDouble){
      context.setCullingMode(false);
   }else{
      context.setCullingMode(o._stateDepth, o._stateCullCd);
   }
}
MO.FG3dAutomaticEffect_drawRenderable = function FG3dAutomaticEffect_drawRenderable(region, renderable){
   var o = this;
   var context = o._graphicContext;
   var program = o._program;
   var info = renderable.activeInfo();
   var layout = info.layout;
   if(!layout){
      layout = info.layout = context.createLayout();
      if(o._supportLayout){
         layout.bind();
         o.bindAttributes(renderable);
         layout.unbind();
         layout.active();
      }else{
         context.recordBegin();
         o.bindAttributes(renderable);
         context.recordEnd();
         layout.linkBuffers(context.recordBuffers());
      }
      context.recordBegin();
      o.bindSamplers(renderable);
      context.recordEnd();
      layout.linkSamplers(context.recordSamplers());
   }else{
      if(o._supportLayout){
         layout.active();
      }else{
         layout.bindBuffers();
      }
      layout.bindSamplers();
   }
   var indexCount = 0;
   var indexBuffers = renderable.indexBuffers();
   if(indexBuffers){
      indexCount = indexBuffers.count();
   }
   if(indexCount > 1){
      var materials = renderable.materials();
      for(var i = 0; i < indexCount; i++){
         var indexBuffer = indexBuffers.at(i);
         if(materials){
            var material = materials.at(i);
            if(material){
               o.bindMaterialSamplers(renderable, material);
            }
         }
         context.drawTriangles(indexBuffer);
      }
   }else if(indexCount == 1){
      var indexBuffer = indexBuffers.first();
      context.drawTriangles(indexBuffer);
   }else{
      throw new MO.TError(o, 'Index buffer is not found.');
   }
   if(o._supportLayout){
      layout.deactive();
   }
}
MO.FG3dSelectAutomaticEffect = function FG3dSelectAutomaticEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'select.automatic';
   o.drawRenderable = MO.FG3dSelectAutomaticEffect_drawRenderable;
   return o;
}
MO.FG3dSelectAutomaticEffect_drawRenderable = function FG3dSelectAutomaticEffect_drawRenderable(region, renderable, index){
   var o = this;
   var context = o._graphicContext;
   var size = context.size();
   var program = o._program;
   var selectX = region._selectX;
   var selectY = region._selectY;
   var material = renderable.material();
   var materialInfo = material.info();
   o.bindMaterial(material);
   program.setParameter('vc_model_matrix', renderable.currentMatrix());
   program.setParameter('vc_vp_matrix', region.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix));
   program.setParameter4('vc_offset', size.width, size.height, 1 - (selectX / size.width) * 2, (selectY / size.height) * 2 - 1);
   var i = index + 1;
   var i1 = i  & 0xFF;
   var i2 = (i >> 8) & 0xFF;
   var i3 = (i >> 16) & 0xFF;
   program.setParameter4('fc_index', i1 / 255, i2 / 255, i3 / 255, materialInfo.alphaBase);
   o.bindAttributes(renderable);
   o.bindSamplers(renderable);
   var indexBuffers = renderable.indexBuffers();
   var count = indexBuffers.count();
   for(var i = 0; i < count; i++){
      var indexBuffer = indexBuffers.at(i);
      context.drawTriangles(indexBuffer);
   }
}
MO.FG3dSelectPass = function FG3dSelectPass(o){
   o = MO.Class.inherits(this, o, MO.FG3dTechniquePass);
   o._code         = 'select';
   o._texture      = MO.Class.register(o, new MO.AGetter('_texture'));
   o._renderTarget = null;
   o._position     = null;
   o._data         = null;
   o.construct     = MO.FG3dSelectPass_construct;
   o.setup         = MO.FG3dSelectPass_setup;
   o.drawRegion    = MO.FG3dSelectPass_drawRegion;
   return o;
}
MO.FG3dSelectPass_construct = function FG3dSelectPass_construct(){
   var o = this;
   o.__base.FG3dTechniquePass.construct.call(o);
   o._data = new Uint8Array(4);
   o._position = new MO.SPoint2();
}
MO.FG3dSelectPass_setup = function FG3dSelectPass_setup(){
   var o = this;
   o.__base.FG3dTechniquePass.setup.call(o);
   var c = o._graphicContext;
   var T = o._texture = c.createFlatTexture();
   T.setFilterCd(MO.EG3dSamplerFilter.Nearest, MO.EG3dSamplerFilter.Nearest);
   T.setWrapCd(MO.EG3dSamplerFilter.ClampToEdge, MO.EG3dSamplerFilter.ClampToEdge);
   var t = o._renderTarget = c.createRenderTarget();
   t.size().set(1, 1);
   t.textures().push(T);
   t.build();
}
MO.FG3dSelectPass_drawRegion = function FG3dSelectPass_drawRegion(p){
   var o = this;
   var context = o._graphicContext;
   var handle = context.handle();
   context.setRenderTarget(o._renderTarget);
   context.clear(0, 0, 0, 0, 1, 1);
   var rs = p.allRenderables();
   o.activeEffects(p, rs);
   var rc = rs.count();
   for(var i = 0; i < rc; i++){
      var r = rs.get(i);
      var e = r.activeEffect();
      context.setProgram(e.program());
      var d = r.display();
      if(!d){
         e.drawRenderable(p, r, i);
      }else if(!d._optionFace){
         e.drawRenderable(p, r, i);
      }
   }
   context.clearDepth(1);
   for(var i = 0; i < rc; i++){
      var r = rs.get(i);
      var e = r.activeEffect();
      context.setProgram(e.program());
      var d = r.display();
      if(d && d._optionFace){
         e.drawRenderable(p, r, i);
      }
   }
   handle.readPixels(0, 0, 1, 1, handle.RGBA, handle.UNSIGNED_BYTE, o._data);
   var v = o._data[0] + (o._data[1] << 8) + (o._data[2] << 16);
   o._selectRenderable = null;
   if(v != 0){
      o._selectRenderable = rs.get(v - 1);
   }
}
MO.FG3dSelectSkeletonEffect = function FG3dSelectSkeletonEffect(o){
   o = MO.Class.inherits(this, o, MO.FG3dAutomaticEffect);
   o._code          = 'select.automatic';
   o.drawRenderable = MO.FG3dSelectSkeletonEffect_drawRenderable;
   return o;
}
MO.FG3dSelectSkeletonEffect_drawRenderable = function FG3dSelectSkeletonEffect_drawRenderable(pg, pr, pi){
   var o = this;
   var c = o._graphicContext;
   var s = c.size();
   var p = o._program;
   var sx = pg._selectX;
   var sy = pg._selectY;
   var m = pr.material();
   var mi = m.info();
   o.bindMaterial(m);
   p.setParameter('vc_model_matrix', pr.currentMatrix());
   p.setParameter('vc_vp_matrix', pg.calculate(MO.EG3dRegionParameter.CameraViewProjectionMatrix));
   p.setParameter4('vc_offset', s.width, s.height, 1 - (sx / s.width) * 2, (sy / s.height) * 2 - 1);
   var i = pi + 1;
   var i1 = i  & 0xFF;
   var i2 = (i >> 8) & 0xFF;
   var i3 = (i >> 16) & 0xFF;
   p.setParameter4('fc_index', i1 / 255, i2 / 255, i3 / 255, mi.alphaBase);
   o.bindAttributes(pr);
   o.bindSamplers(pr);
   c.drawTriangles(pr.indexBuffer());
}
MO.FG3dSelectTechnique = function FG3dSelectTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   o._code       = 'select';
   o._passSelect = MO.Class.register(o, new MO.AGetter('_passSelect'));
   o.setup       = MO.FG3dSelectTechnique_setup;
   o.test        = MO.FG3dSelectTechnique_test;
   return o;
}
MO.FG3dSelectTechnique_setup = function FG3dSelectTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   o.registerMode(MO.EG3dTechniqueMode.Result);
   var pd = o._passSelect = MO.Class.create(MO.FG3dSelectPass);
   pd.linkGraphicContext(o);
   pd.setup();
   o._passes.push(pd);
}
MO.FG3dSelectTechnique_test = function FG3dSelectTechnique_test(region, x, y){
   var o = this;
   region._selectX = x;
   region._selectY = y;
   region.setTechnique(o);
   o.drawRegion(region);
   return o._passSelect._selectRenderable;
}
MO.FWglContext = function FWglContext(o){
   o = MO.Class.inherits(this, o, MO.FG3dContext);
   o._handle             = MO.Class.register(o, new MO.AGetter('_handle'));
   o._handleInstance     = null;
   o._handleLayout       = null;
   o._handleSamplerS3tc  = null;
   o._handleDebugShader  = null;
   o._activeRenderTarget = null;
   o._activeTextureSlot  = null;
   o._parameters         = null;
   o._extensions         = null;
   o._statusRecord       = false;
   o._recordBuffers      = MO.Class.register(o, new MO.AGetter('_recordBuffers'));
   o._recordSamplers     = MO.Class.register(o, new MO.AGetter('_recordSamplers'));
   o._statusScissor      = false;
   o._data9              = null;
   o._data16             = null;
   o.construct           = MO.FWglContext_construct;
   o.isValid             = MO.FWglContext_isValid;
   o.linkCanvas          = MO.FWglContext_linkCanvas;
   o.parameter           = MO.FWglContext_parameter;
   o.parameters          = MO.FWglContext_parameters;
   o.extension           = MO.FWglContext_extension;
   o.extensions          = MO.FWglContext_extensions;
   o.recordBegin         = MO.FWglContext_recordBegin;
   o.recordEnd           = MO.FWglContext_recordEnd;
   o.createProgram       = MO.FWglContext_createProgram;
   o.createLayout        = MO.FWglContext_createLayout;
   o.createVertexBuffer  = MO.FWglContext_createVertexBuffer;
   o.createIndexBuffer   = MO.FWglContext_createIndexBuffer;
   o.createFlatTexture   = MO.FWglContext_createFlatTexture;
   o.createCubeTexture   = MO.FWglContext_createCubeTexture;
   o.createRenderTarget  = MO.FWglContext_createRenderTarget;
   o.setViewport         = MO.FWglContext_setViewport;
   o.setFillMode         = MO.FWglContext_setFillMode;
   o.setDepthMode        = MO.FWglContext_setDepthMode;
   o.setCullingMode      = MO.FWglContext_setCullingMode;
   o.setBlendFactors     = MO.FWglContext_setBlendFactors;
   o.setScissorRectangle = MO.FWglContext_setScissorRectangle;
   o.setRenderTarget     = MO.FWglContext_setRenderTarget;
   o.setProgram          = MO.FWglContext_setProgram;
   o.bindConst           = MO.FWglContext_bindConst;
   o.bindVertexBuffer    = MO.FWglContext_bindVertexBuffer;
   o.bindTexture         = MO.FWglContext_bindTexture;
   o.clear               = MO.FWglContext_clear;
   o.clearColor          = MO.FWglContext_clearColor;
   o.clearDepth          = MO.FWglContext_clearDepth;
   o.readPixels          = MO.FWglContext_readPixels;
   o.drawTriangles       = MO.FWglContext_drawTriangles;
   o.present             = MO.FWglContext_present;
   o.checkError          = MO.FWglContext_checkError;
   o.saveConfig          = MO.FWglContext_saveConfig;
   o.dispose             = MO.FWglContext_dispose;
   return o;
}
MO.FWglContext_construct = function FWglContext_construct(){
   var o = this;
   o.__base.FG3dContext.construct.call(o);
   o._capability = new MO.SG3dContextCapability();
   o._data9 = new Float32Array(9);
   o._data16 = new Float32Array(16);
   o._recordBuffers = new MO.TObjects();
   o._recordSamplers = new MO.TObjects();
}
MO.FWglContext_isValid = function FWglContext_isValid(){
   return this._handle;
}
MO.FWglContext_linkCanvas = function FWglContext_linkCanvas(hCanvas){
   var o = this;
   o.__base.FG3dContext.linkCanvas.call(o, hCanvas)
   o._hCanvas = hCanvas;
   if(hCanvas.getContext){
      var parameters = new Object();
      parameters.alpha = o._optionAlpha;
      parameters.antialias = o._optionAntialias;
      parameters.depth = true;
      parameters.stencil = false;
      parameters.premultipliedAlpha = false;
      var handle = null;
      var codes = ['experimental-webgl2', 'experimental-webgl', 'webgl', 'webkit-3d', 'moz-webgl']
      var count = codes.length;
      for(var i = 0; i < count; i++){
         var code = codes[i];
         handle = hCanvas.getContext(code, parameters);
         if(handle){
            MO.Logger.debug(o, 'Create context3d. (code={1}, handle={2})', code, handle);
            break;
         }
      }
      if(!handle){
         MO.Logger.error(o, 'Create context3d failure.');
         var event = new MO.SEvent(o);
         event.code = MO.EGraphicError.UnsupportWebGL;
         event.message = "Current browser can't support WebGL technique.";
         MO.Window.processDeviceError(event);
         event.dispose();
         return false;
      }
      o._handle = handle;
      o._contextAttributes = handle.getContextAttributes();
   }else{
      var event = new MO.SEvent(o);
      event.code = MO.EGraphicError.UnsupportWebGL;
      event.message = "Canvas can't support WebGL technique.";
      MO.Window.processDeviceError(event);
      event.dispose();
      return false;
   }
   var handle = o._handle;
   o.setDepthMode(true, MO.EG3dDepthMode.LessEqual);
   o.setCullingMode(true, MO.EG3dCullMode.Front);
   var capability = o._capability;
   capability.vendor = handle.getParameter(handle.VENDOR);
   capability.version = handle.getParameter(handle.VERSION);
   capability.shaderVersion = handle.getParameter(handle.SHADING_LANGUAGE_VERSION);
   capability.attributeCount = handle.getParameter(handle.MAX_VERTEX_ATTRIBS);
   capability.vertexConst = handle.getParameter(handle.MAX_VERTEX_UNIFORM_VECTORS);
   capability.varyingCount = handle.getParameter(handle.MAX_VARYING_VECTORS);
   capability.fragmentConst = handle.getParameter(handle.MAX_FRAGMENT_UNIFORM_VECTORS);
   capability.samplerCount = handle.getParameter(handle.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
   capability.samplerSize = handle.getParameter(handle.MAX_TEXTURE_SIZE);
   var extension = o._handleInstance = handle.getExtension('ANGLE_instanced_arrays');
   if(extension){
      capability.optionInstance = true;
   }
   capability.mergeCount = parseInt((capability.vertexConst - 32) / 4);
   var extension = o._handleLayout = handle.getExtension('OES_vertex_array_object');
   if(extension){
      capability.optionLayout = true;
   }
   var extension = handle.getExtension('OES_element_index_uint');
   if(extension){
      capability.optionIndex32 = true;
   }
   var extension = o._handleSamplerS3tc = handle.getExtension('WEBGL_compressed_texture_s3tc');
   if(extension){
      capability.samplerCompressRgb = extension.COMPRESSED_RGB_S3TC_DXT1_EXT;
      capability.samplerCompressRgba = extension.COMPRESSED_RGBA_S3TC_DXT5_EXT;
   }
   var shader = capability.shader = new Object();
   var vertexPrecision = shader.vertexPrecision = new Object();
   if(handle.getShaderPrecisionFormat){
      vertexPrecision.floatLow = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.LOW_FLOAT);
      vertexPrecision.floatMedium = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.MEDIUM_FLOAT);
      vertexPrecision.floatHigh = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.HIGH_FLOAT);
      vertexPrecision.intLow = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.LOW_INT);
      vertexPrecision.intMedium = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.MEDIUM_INT);
      vertexPrecision.intHigh = handle.getShaderPrecisionFormat(handle.VERTEX_SHADER, handle.HIGH_INT);
   }
   var fragmentPrecision = shader.fragmentPrecision = new Object();
   if(handle.getShaderPrecisionFormat){
      fragmentPrecision.floatLow = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.LOW_FLOAT);
      fragmentPrecision.floatMedium = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.MEDIUM_FLOAT);
      fragmentPrecision.floatHigh = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.HIGH_FLOAT);
      fragmentPrecision.intLow = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.LOW_INT);
      fragmentPrecision.intMedium = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.MEDIUM_INT);
      fragmentPrecision.intHigh = handle.getShaderPrecisionFormat(handle.FRAGMENT_SHADER, handle.HIGH_INT);
   }
   var extension = o._handleDebugShader = handle.getExtension('WEBGL_debug_shaders');
   if(extension){
      capability.optionShaderSource = true;
   }
   return true;
}
MO.FWglContext_parameter = function FWglContext_parameter(name){
   var parameters = this.parameters();
   return parameters[name];
}
MO.FWglContext_parameters = function FWglContext_parameters(){
   var o = this;
   var parameters = o._parameters;
   if(parameters){
      return parameters;
   }
   var names =['ACTIVE_TEXTURE',
      'ALIASED_LINE_WIDTH_RANGE',
      'ALIASED_POINT_SIZE_RANGE',
      'ALPHA_BITS',
      'ARRAY_BUFFER_BINDING',
      'BLEND',
      'BLEND_COLOR',
      'BLEND_DST_ALPHA',
      'BLEND_DST_RGB',
      'BLEND_EQUATION_ALPHA',
      'BLEND_EQUATION_RGB',
      'BLEND_SRC_ALPHA',
      'BLEND_SRC_RGB',
      'BLUE_BITS',
      'COLOR_CLEAR_VALUE',
      'COLOR_WRITEMASK',
      'COMPRESSED_TEXTURE_FORMATS',
      'CULL_FACE',
      'CULL_FACE_MODE',
      'CURRENT_PROGRAM',
      'DEPTH_BITS',
      'DEPTH_CLEAR_VALUE',
      'DEPTH_FUNC',
      'DEPTH_RANGE',
      'DEPTH_TEST',
      'DEPTH_WRITEMASK',
      'DITHER',
      'ELEMENT_ARRAY_BUFFER_BINDING',
      'FRAMEBUFFER_BINDING',
      'FRONT_FACE',
      'GENERATE_MIPMAP_HINT',
      'GREEN_BITS',
      'IMPLEMENTATION_COLOR_READ_FORMAT',
      'IMPLEMENTATION_COLOR_READ_TYPE',
      'LINE_WIDTH',
      'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
      'MAX_CUBE_MAP_TEXTURE_SIZE',
      'MAX_FRAGMENT_UNIFORM_VECTORS',
      'MAX_RENDERBUFFER_SIZE',
      'MAX_TEXTURE_IMAGE_UNITS',
      'MAX_TEXTURE_SIZE',
      'MAX_VARYING_VECTORS',
      'MAX_VERTEX_ATTRIBS',
      'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
      'MAX_VERTEX_UNIFORM_VECTORS',
      'MAX_VIEWPORT_DIMS',
      'PACK_ALIGNMENT',
      'POLYGON_OFFSET_FACTOR',
      'POLYGON_OFFSET_FILL',
      'POLYGON_OFFSET_UNITS',
      'RED_BITS',
      'RENDERBUFFER_BINDING',
      'RENDERER',
      'SAMPLE_BUFFERS',
      'SAMPLE_COVERAGE_INVERT',
      'SAMPLE_COVERAGE_VALUE',
      'SAMPLES',
      'SCISSOR_BOX',
      'SCISSOR_TEST',
      'SHADING_LANGUAGE_VERSION',
      'STENCIL_BACK_FAIL',
      'STENCIL_BACK_FUNC',
      'STENCIL_BACK_PASS_DEPTH_FAIL',
      'STENCIL_BACK_PASS_DEPTH_PASS',
      'STENCIL_BACK_REF',
      'STENCIL_BACK_VALUE_MASK',
      'STENCIL_BACK_WRITEMASK',
      'STENCIL_BITS',
      'STENCIL_CLEAR_VALUE',
      'STENCIL_FAIL',
      'STENCIL_FUNC',
      'STENCIL_PASS_DEPTH_FAIL',
      'STENCIL_PASS_DEPTH_PASS',
      'STENCIL_REF',
      'STENCIL_TEST',
      'STENCIL_VALUE_MASK',
      'STENCIL_WRITEMASK',
      'SUBPIXEL_BITS',
      'TEXTURE_BINDING_2D',
      'TEXTURE_BINDING_CUBE_MAP',
      'UNPACK_ALIGNMENT',
      'UNPACK_COLORSPACE_CONVERSION_WEBGL',
      'UNPACK_FLIP_Y_WEBGL',
      'UNPACK_PREMULTIPLY_ALPHA_WEBGL',
      'VENDOR',
      'VERSION',
      'VIEWPORT'];
   var handle = o._handle;
   var count = names.length;
   parameters = new Object();
   for(var i = 0; i < count; i++){
      var name = names[i];
      parameters[name] = handle.getParameter(handle[name]);
   }
   var extension = handle.getExtension('WEBGL_debug_renderer_info');
   if(extension){
      parameters['UNMASKED_RENDERER_WEBGL'] = handle.getParameter(extension.UNMASKED_RENDERER_WEBGL);
      parameters['UNMASKED_VENDOR_WEBGL'] = handle.getParameter(extension.UNMASKED_VENDOR_WEBGL);
   }
   o._parameters = parameters;
   return parameters;
}
MO.FWglContext_extension = function FWglContext_extension(name){
   var extensions = this.extensions();
   return extensions[name];
}
MO.FWglContext_extensions = function FWglContext_extensions(){
   var o = this;
   var extensions = o._extensions;
   if(!extensions){
      extensions = o._extensions = new Object();
      var handle = o._handle;
      var names = handle.getSupportedExtensions();
      var count = names.length;
      for(var i = 0; i < count; i++){
         var name = names[i];
         extensions[name] = handle.getExtension(name);
      }
   }
   return extensions;
}
MO.FWglContext_recordBegin = function FWglContext_recordBegin(){
   var o = this;
   o._recordBuffers.clear();
   o._recordSamplers.clear();
   o._statusRecord = true;
}
MO.FWglContext_recordEnd = function FWglContext_recordEnd(){
   this._statusRecord = false;
}
MO.FWglContext_createProgram = function FWglContext_createProgram(){
   var o = this;
   var program = o.createObject(MO.FWglProgram);
   o._storePrograms.push(program);
   o._statistics._programTotal++;
   return program;
}
MO.FWglContext_createLayout = function FWglContext_createLayout(){
   var o = this;
   var layout = MO.Class.create(MO.FWglLayout);
   layout.linkGraphicContext(o);
   if(o._capability.optionLayout){
      layout.setup();
   }
   o._storeLayouts.push(layout);
   o._statistics._layoutTotal++;
   return layout;
}
MO.FWglContext_createVertexBuffer = function FWglContext_createVertexBuffer(clazz){
   var o = this;
   var buffer = o.createObject(MO.Runtime.nvl(clazz, MO.FWglVertexBuffer));
   buffer.linkGraphicContext(o);
   buffer.setup();
   o._storeBuffers.push(buffer);
   o._statistics._vertexBufferTotal++;
   return buffer;
}
MO.FWglContext_createIndexBuffer = function FWglContext_createIndexBuffer(clazz){
   var o = this;
   var buffer = o.createObject(MO.Runtime.nvl(clazz, MO.FWglIndexBuffer));
   o._storeBuffers.push(buffer);
   o._statistics._indexBufferTotal++;
   return buffer;
}
MO.FWglContext_createFlatTexture = function FWglContext_createFlatTexture(clazz){
   var o = this;
   var texture = o.createObject(MO.Runtime.nvl(clazz, MO.FWglFlatTexture));
   o._storeTextures.push(texture);
   o._statistics._flatTextureTotal++;
   return texture;
}
MO.FWglContext_createCubeTexture = function FWglContext_createCubeTexture(clazz){
   var o = this;
   var texture = o.createObject(MO.Runtime.nvl(clazz, MO.FWglCubeTexture));
   o._storeTextures.push(texture);
   o._statistics._cubeTextureTotal++;
   return texture;
}
MO.FWglContext_createRenderTarget = function FWglContext_createRenderTarget(clazz){
   var o = this;
   var texture = o.createObject(MO.Runtime.nvl(clazz, MO.FWglRenderTarget));
   o._storeTargets.push(target);
   o._statistics._targetTotal++;
   return target;
}
MO.FWglContext_setViewport = function FWglContext_setViewport(left, top, width, height){
   var o = this;
   o._size.set(width, height);
   o._viewportRectangle.set(left, top, width, height);
   o._handle.viewport(left, top, width, height);
   MO.Logger.debug(o, 'Context3d viewport. (location={1},{2}, size={3}x{4})', left, top, width, height);
}
MO.FWglContext_setFillMode = function FWglContext_setFillMode(fillModeCd){
   var o = this;
   var graphic = o._handle;
   if(o._fillModeCd == fillModeCd){
      return false;
   }
   o._statistics._frameFillModeCount++;
   switch(fillModeCd){
      case EG3dFillMode.Point:
         graphic.polygonMode(graphic.FRONT_AND_BACK, graphic.POINT);
         break;
      case EG3dFillMode.Line:
         graphic.polygonMode(graphic.FRONT_AND_BACK, graphic.LINE);
         break;
      case EG3dFillMode.Face:
         graphic.polygonMode(graphic.FRONT, graphic.FILL);
         break;
      default:
         throw new MO.TError('Invalid parameter. (fill_mode={1})', fillModeCd);
   }
   o._fillModeCd = fillModeCd;
   return true;
}
MO.FWglContext_setDepthMode = function FWglContext_setDepthMode(depthFlag, depthCd){
   var o = this;
   var graphic = o._handle;
   if((o._optionDepth == depthFlag) && (o._depthModeCd == depthCd)){
      return false;
   }
   o._statistics._frameDepthModeCount++;
   if(o._optionDepth != depthFlag){
      if(depthFlag){
         graphic.enable(graphic.DEPTH_TEST);
      }else{
         graphic.disable(graphic.DEPTH_TEST);
      }
      o._optionDepth = depthFlag;
   }
   if(depthFlag && (o._depthModeCd != depthCd)){
      var depthCode = MO.RWglUtility.convertDepthMode(graphic, depthCd);
      graphic.depthFunc(depthCode);
      o._depthModeCd = depthCd;
   }
   return true;
}
MO.FWglContext_setCullingMode = function FWglContext_setCullingMode(cullFlag, cullCd){
   var o = this;
   var graphic = o._handle;
   if((o._optionCull == cullFlag) && (o._cullModeCd == cullCd)){
      return false;
   }
   o._statistics._frameCullModeCount++;
   if(o._optionCull != cullFlag){
      if(cullFlag){
         graphic.enable(graphic.CULL_FACE);
      }else{
         graphic.disable(graphic.CULL_FACE);
      }
      o._optionCull = cullFlag;
   }
   if(cullFlag && (o._cullModeCd != cullCd)){
      var cullValue = MO.RWglUtility.convertCullMode(graphic, cullCd);
      graphic.cullFace(cullValue);
      o._cullModeCd = cullCd;
   }
   return true;
}
MO.FWglContext_setBlendFactors = function FWglContext_setBlendFactors(blendFlag, sourceCd, tagetCd){
   var o = this;
   var graphic = o._handle;
   if((o._statusBlend == blendFlag) && (o._blendSourceCd == sourceCd) && (o._blendTargetCd == tagetCd)){
      return false;
   }
   o._statistics._frameBlendModeCount++;
   if(o._statusBlend != blendFlag){
      if(blendFlag){
         graphic.enable(graphic.BLEND);
      }else{
         graphic.disable(graphic.BLEND);
         o._blendSourceCd = 0;
         o._blendTargetCd = 0;
      }
      o._statusBlend = blendFlag;
   }
   if(blendFlag && ((o._blendSourceCd != sourceCd) || (o._blendTargetCd != tagetCd))){
      var sourceValue = MO.RWglUtility.convertBlendFactors(graphic, sourceCd);
      var tagetValue = MO.RWglUtility.convertBlendFactors(graphic, tagetCd);
      graphic.blendFunc(sourceValue, tagetValue);
      o._blendSourceCd = sourceCd;
      o._blendTargetCd = tagetCd;
   }
   return true;
}
MO.FWglContext_setScissorRectangle = function FWglContext_setScissorRectangle(left, top, width, height){
   var o = this;
   var handle = o._handle;
   var scissorFlag = (width > 0) && (height > 0);
   if(o._statusScissor != scissorFlag){
      if(scissorFlag){
         handle.enable(handle.SCISSOR_TEST);
      }else{
         handle.disable(handle.SCISSOR_TEST);
      }
      o._statusScissor = scissorFlag;
   }
   if(scissorFlag){
      handle.scissor(left, top, width, height);
   }
}
MO.FWglContext_setRenderTarget = function FWglContext_setRenderTarget(renderTarget){
   var o = this;
   var graphic = o._handle;
   if(o._activeRenderTarget == renderTarget){
      return;
   }
   o._statistics._frameTargetCount++;
   var result = true;
   if(renderTarget == null){
      graphic.bindFramebuffer(graphic.FRAMEBUFFER, null);
      result = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", null);
      if(!result){
         return result;
      }
      graphic.viewport(0, 0, o._size.width, o._size.height);
   }else{
      graphic.bindFramebuffer(graphic.FRAMEBUFFER, renderTarget._handle);
      result = o.checkError("glBindFramebuffer", "Bind frame buffer. (frame_buffer={1})", renderTarget._handle);
      if(!result){
         return result;
      }
      var size = renderTarget.size();
      graphic.viewport(0, 0, size.width, size.height);
   }
   o._activeRenderTarget = renderTarget;
   return result;
}
MO.FWglContext_setProgram = function FWglContext_setProgram(program){
   var o = this;
   var graphic = o._handle;
   if(o._program == program){
      return;
   }
   o._statistics._frameProgramCount++;
   if(program){
      graphic.useProgram(program._handle);
   }else{
      graphic.useProgram(null);
   }
   o._program = program;
   return o.checkError("useProgram", "Set program failure. (program={1}, program_native={2})", program, program._handle);
}
MO.FWglContext_bindConst = function FWglContext_bindConst(shaderCd, slot, formatCd, data, count){
   var o = this;
   var graphic = o._handle;
   var result = true;
   o._statistics._frameConstCount++;
   switch(formatCd){
      case MO.EG3dParameterFormat.Float1:{
         graphic.uniform1fv(slot, data);
         o._statistics._frameConstLength += data.byteLength;
         result = o.checkError("uniform1fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float2:{
         graphic.uniform2fv(slot, data);
         o._statistics._frameConstLength += data.byteLength;
         result = o.checkError("uniform2fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float3:{
         graphic.uniform3fv(slot, data);
         o._statistics._frameConstLength += data.byteLength;
         result = o.checkError("uniform3fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float4:{
         graphic.uniform4fv(slot, data);
         o._statistics._frameConstLength += data.byteLength;
         result = o.checkError("uniform4fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float3x3:{
         var bytes = o._data9;
         bytes[ 0] = data[ 0];
         bytes[ 1] = data[ 4];
         bytes[ 2] = data[ 8];
         bytes[ 3] = data[ 1];
         bytes[ 4] = data[ 5];
         bytes[ 5] = data[ 9];
         bytes[ 6] = data[ 2];
         bytes[ 7] = data[ 6];
         bytes[ 8] = data[10];
         graphic.uniformMatrix3fv(slot, graphic.FALSE, bytes);
         o._statistics._frameConstLength += bytes.byteLength;
         result = o.checkError("uniformMatrix3fv", "Bind const matrix3x3 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      case MO.EG3dParameterFormat.Float4x4:{
         var bytes = null;
         if(data.constructor == Float32Array){
            bytes = data;
         }else if(data.writeData){
            bytes = o._data16;
            data.writeData(bytes, 0);
         }else{
            throw new MO.TError('Unknown data type.');
         }
         graphic.uniformMatrix4fv(slot, graphic.FALSE, bytes);
         o._statistics._frameConstLength += bytes.byteLength;
         result = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd={1}, slot={2}, data={3}, count={4})", shaderCd, slot, data, count);
         break;
      }
      default:{
         throw new MO.TError(o, 'Unknown format type. (format_cd={1})', formatCd);
      }
   }
   return result;
}
MO.FWglContext_bindVertexBuffer = function FWglContext_bindVertexBuffer(slot, vertexBuffer, offset, formatCd){
   var o = this;
   var graphic = o._handle;
   var result = true;
   o._statistics._frameBufferCount++;
   if(o._statusRecord){
      var layout = new MO.SG3dLayoutBuffer();
      layout.slot = slot;
      layout.buffer = vertexBuffer;
      layout.index = offset;
      layout.formatCd = formatCd;
      o._recordBuffers.push(layout);
   }
   var handle = null;
   if(vertexBuffer != null){
      handle = vertexBuffer._handle;
   }
   graphic.bindBuffer(graphic.ARRAY_BUFFER, handle);
   result = o.checkError("bindBuffer", "Bind buffer. (buffer_id=%d)", handle);
   if(!result){
      return result;
   }
   if(vertexBuffer){
      graphic.enableVertexAttribArray(slot);
      result = o.checkError("enableVertexAttribArray", "Enable vertex attribute array. (slot=%d)", slot);
      if(!result){
         return result;
      }
   }else{
      graphic.disableVertexAttribArray(slot);
      result = o.checkError("disableVertexAttribArray", "Disable vertex attribute array. (slot=%d)", slot);
      return result;
   }
   var stride = vertexBuffer._stride;
   switch(formatCd){
      case MO.EG3dAttributeFormat.Float1:
         graphic.vertexAttribPointer(slot, 1, graphic.FLOAT, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Float2:
         graphic.vertexAttribPointer(slot, 2, graphic.FLOAT, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Float3:
         graphic.vertexAttribPointer(slot, 3, graphic.FLOAT, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Float4:
         graphic.vertexAttribPointer(slot, 4, graphic.FLOAT, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Byte4:
         graphic.vertexAttribPointer(slot, 4, graphic.UNSIGNED_BYTE, false, stride, offset);
         break;
      case MO.EG3dAttributeFormat.Byte4Normal:
         graphic.vertexAttribPointer(slot, 4, graphic.UNSIGNED_BYTE, true, stride, offset);
         break;
      default:
         throw new MO.TError(o, "Unknown vertex format. (format_cd=%d)", formatCd);
   }
   result = o.checkError("glVertexAttribPointer", "Bind vertex attribute pointer. (slot=%d, format_cd=%d)", slot, formatCd);
   return result;
}
MO.FWglContext_bindTexture = function FWglContext_bindTexture(slot, index, texture){
   var o = this;
   var graphic = o._handle;
   var result = true;
   o._statistics._frameTextureCount++;
   if(o._statusRecord){
      var layout = new MO.SG3dLayoutSampler();
      layout.slot = slot;
      layout.index = index;
      layout.texture = texture;
      o._recordSamplers.push(layout);
   }
   if(o._activeTextureSlot != slot){
      graphic.uniform1i(slot, index);
      graphic.activeTexture(graphic.TEXTURE0 + index);
      result = o.checkError("activeTexture", "Active texture failure. (slot=%d, index=%d)", slot, index);
      if(!result){
         return result;
      }
      o._activeTextureSlot = slot;
   }
   if(texture == null){
      graphic.bindTexture(graphic.TEXTURE_2D, null);
      result = o.checkError("bindTexture", "Bind texture clear failure. (slot=%d)", slot);
      return result;
   }
   var handle = texture._handle;
   var textureCd = texture.textureCd();
   switch(textureCd){
      case MO.EG3dTexture.Flat2d:{
         graphic.bindTexture(graphic.TEXTURE_2D, handle);
         result = o.checkError("glBindTexture", "Bind flag texture failure. (texture_id=%d)", handle);
         if(!result){
            return result;
         }
         break;
      }
      case MO.EG3dTexture.Cube:{
         graphic.bindTexture(graphic.TEXTURE_CUBE_MAP, handle);
         result = o.checkError("glBindTexture", "Bind cube texture failure. (texture_id=%d)", handle);
         if(!result){
            return result;
         }
         break;
      }
      default:{
         throw new MO.TError(o, 'Unknown texture type.');
      }
   }
   return result;
}
MO.FWglContext_clear = function FWglContext_clear(red, green, blue, alpha, depth){
   var o = this;
   var graphic = o._handle;
   graphic.clearColor(red, green, blue, alpha);
   graphic.clearDepth(depth);
   graphic.clear(graphic.COLOR_BUFFER_BIT | graphic.DEPTH_BUFFER_BIT);
   o._statistics._frameClearCount++;
}
MO.FWglContext_clearColor = function FWglContext_clearColor(red, green, blue, alpha){
   var o = this;
   var graphic = o._handle;
   graphic.clearColor(red, green, blue, alpha);
   graphic.clear(graphic.COLOR_BUFFER_BIT);
   o._statistics._frameClearCount++;
}
MO.FWglContext_clearDepth = function FWglContext_clearDepth(depth){
   var o = this;
   var graphic = o._handle;
   graphic.clearDepth(depth);
   graphic.clear(graphic.DEPTH_BUFFER_BIT);
   o._statistics._frameClearCount++;
}
MO.FWglContext_readPixels = function FWglContext_readPixels(left, top, width, height){
   var o = this;
   var graphic = o._handle;
   var length = 4 * width * height;
   var data = new Uint8Array(length);
   graphic.readPixels(left, top, width, height, graphic.RGBA, graphic.UNSIGNED_BYTE, data);
   return data;
}
MO.FWglContext_drawTriangles = function FWglContext_drawTriangles(indexBuffer, offset, count){
   var o = this;
   var graphic = o._handle;
   var result = true;
   if(offset == null){
      offset = 0;
   }
   if(count == null){
      count = indexBuffer.count();
   }
   graphic.bindBuffer(graphic.ELEMENT_ARRAY_BUFFER, indexBuffer._handle);
   result = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d, buffer_id)", indexBuffer, offset, count, indexBuffer._handle);
   if(!result){
       return result;
   }
   var strideCd = indexBuffer.strideCd();
   var strideValue = MO.RWglUtility.convertIndexStride(graphic, strideCd);
   var offsetValue = 0;
   switch(strideCd){
      case MO.EG3dIndexStride.Uint16:
         offsetValue = offset << 1;
         break;
      case MO.EG3dIndexStride.Uint32:
         offsetValue = offset << 2;
         break;
   }
   var drawModeCd = indexBuffer.drawModeCd();
   var drawModeValue = MO.RWglUtility.convertDrawMode(graphic, drawModeCd);
   switch(drawModeCd){
      case MO.EG3dDrawMode.Line:
         break;
   }
   graphic.drawElements(drawModeValue, count, strideValue, offsetValue);
   o._statistics._frameTriangleCount += count;
   o._statistics._frameDrawCount++;
   result = o.checkError("drawElements", "Draw triangles failure. (index={1}, offset={2}, count={3})", indexBuffer, offset, count);
   if(!result){
       return result;
   }
   graphic.bindBuffer(graphic.ELEMENT_ARRAY_BUFFER, null);
   result = o.checkError("bindBuffer", "Bind element array buffer failure. (index={1}, offset={2}, count={3})", indexBuffer, offset, count);
   if(!result){
       return result;
   }
   return result;
}
MO.FWglContext_present = function FWglContext_present(){
}
MO.FWglContext_checkError = function FWglContext_checkError(code, message, parameter1){
   var o = this;
   if(!o._capability.optionDebug){
      return true;
   }
   if(!MO.Runtime.isDebug()){
      return true;
   }
   var graphic = o._handle;
   var result = false;
   var error = null;
   var errorInfo = null;
   while(true){
      error = graphic.getError();
      if(error == graphic.NO_ERROR){
         result = true;
         break;
      }
      switch(error){
         case graphic.INVALID_OPERATION:
            errorInfo = "Invalid operation.";
            break;
         case graphic.INVALID_ENUM:
            errorInfo = "Invalid enum.";
            break;
         case graphic.INVALID_VALUE:
            errorInfo = "Invalid value.";
            break;
         case graphic.INVALID_FRAMEBUFFER_OPERATION:
            errorInfo = "Invalid paramebuffer opeartion.";
            break;
         case graphic.OUT_OF_MEMORY:
            errorInfo = "Out of memory.";
            break;
         default:
            errorInfo = "Unknown";
            break;
      }
   }
   if(!result){
      MO.Logger.fatal(o, null, 'OpenGL check failure. (code={1}, description={2})', error, errorInfo);
   }
   return result;
}
MO.FWglContext_saveConfig = function FWglContext_saveConfig(xconfig){
   var o = this;
   var parameters = o.parameters();
   var xparameters = xconfig.create('Parameters');
   MO.Lang.Xml.saveObject(xparameters, 'Parameter', parameters);
   var extensions = o.extensions();
   var xextensions = xconfig.create('Extensions');
   MO.Lang.Xml.saveObject(xextensions, 'Extension', extensions);
}
MO.FWglContext_dispose = function FWglContext_dispose(){
   var o = this;
   o._data9 = null;
   o._data16 = null;
   o._recordBuffers = MO.Lang.Object.dispose(o._recordBuffers);
   o._recordSamplers = MO.Lang.Object.dispose(o._recordSamplers);
   o._contextAttributes = null;
   o._parameters = null;
   o._extensions = null;
   o._activeTextureSlot = null;
   o._handleSamplerS3tc = null;
   o._handleDebugShader = null;
   o.__base.FG3dContext.dispose.call(o);
}
MO.FWglCubeTexture = function FWglCubeTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dCubeTexture);
   o._handle    = null;
   o.setup      = MO.FWglCubeTexture_setup;
   o.isValid    = MO.FWglCubeTexture_isValid;
   o.makeMipmap = MO.FWglCubeTexture_makeMipmap;
   o.upload     = MO.FWglCubeTexture_upload;
   o.update     = MO.FWglCubeTexture_update;
   o.dispose    = MO.FWglCubeTexture_dispose;
   return o;
}
MO.FWglCubeTexture_setup = function FWglCubeTexture_setup(){
   var o = this;
   var g = o._graphicContext._handle;
   o.__base.FG3dCubeTexture.setup.call(o);
   o._handle = g.createTexture();
}
MO.FWglCubeTexture_isValid = function FWglCubeTexture_isValid(){
   var o = this;
   var g = o._graphicContext._handle;
   return g.isTexture(o._handle);
}
MO.FWglCubeTexture_makeMipmap = function FWglCubeTexture_makeMipmap(){
   var o = this;
   var g = o._graphicContext._handle;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._handle);
   g.generateMipmap(g.TEXTURE_CUBE_MAP);
}
MO.FWglCubeTexture_upload = function FWglCubeTexture_upload(x1, x2, y1, y2, z1, z2){
   var o = this;
   var c = o._graphicContext;
   var g = c._handle;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._handle);
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z2.image());
   o._statusLoad = c.checkError("texImage2D", "Upload cube image failure.");
   o.update();
}
MO.FWglCubeTexture_update = function FWglCubeTexture_update(){
   var o = this;
   o.__base.FG3dCubeTexture.update.call(o);
   var g = o._graphicContext._handle;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._handle);
   var c = MO.RWglUtility.convertSamplerFilter(g, o._filterMinCd);
   if(c){
      g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MIN_FILTER, c);
   }
   var c = MO.RWglUtility.convertSamplerFilter(g, o._filterMagCd);
   if(c){
      g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MAG_FILTER, c);
   }
}
MO.FWglCubeTexture_dispose = function FWglCubeTexture_dispose(){
   var o = this;
   var c = o._graphicContext;
   var n = o._handle;
   if(n){
      c._handle.deleteTexture(n);
      o._handle = null;
   }
   o.__base.FG3dCubeTexture.dispose.call(o);
}
MO.FWglFlatTexture = function FWglFlatTexture(o){
   o = MO.Class.inherits(this, o, MO.FG3dFlatTexture);
   o._handle    = null;
   o.setup      = MO.FWglFlatTexture_setup;
   o.isValid    = MO.FWglFlatTexture_isValid;
   o.texture    = MO.FWglFlatTexture_texture;
   o.makeMipmap = MO.FWglFlatTexture_makeMipmap;
   o.uploadData = MO.FWglFlatTexture_uploadData;
   o.upload     = MO.FWglFlatTexture_upload;
   o.update     = MO.FWglFlatTexture_update;
   o.dispose    = MO.FWglFlatTexture_dispose;
   return o;
}
MO.FWglFlatTexture_setup = function FWglFlatTexture_setup(){
   var o = this;
   var g = o._graphicContext._handle;
   o.__base.FG3dFlatTexture.setup.call(o);
   o._handle = g.createTexture();
}
MO.FWglFlatTexture_isValid = function FWglFlatTexture_isValid(){
   var o = this;
   var g = o._graphicContext._handle;
   return g.isTexture(o._handle);
}
MO.FWglFlatTexture_texture = function FWglFlatTexture_texture(){
   return this;
}
MO.FWglFlatTexture_makeMipmap = function FWglFlatTexture_makeMipmap(){
   var o = this;
   var g = o._graphicContext._handle;
   g.bindTexture(g.TEXTURE_2D, o._handle);
   g.generateMipmap(g.TEXTURE_2D);
}
MO.FWglFlatTexture_uploadData = function FWglFlatTexture_uploadData(content, width, height){
   var o = this;
   var context = o._graphicContext;
   var handle = context._handle;
   var data = null;
   if(content.constructor == ArrayBuffer){
      data = new Uint8Array(content);
   }else if(content.constructor == Uint8Array){
      data = content;
   }else{
      throw new MO.TError('Invalid content format.');
   }
   o.width = width;
   o.height = height;
   handle.bindTexture(handle.TEXTURE_2D, o._handle);
   handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, width, height, 0, handle.RGBA, handle.UNSIGNED_BYTE, data);
   o._statusLoad = context.checkError("texImage2D", "Upload content failure.");
   o.update();
}
MO.FWglFlatTexture_upload = function FWglFlatTexture_upload(content){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var handle = context._handle;
   var data = null;
   var tagName = content.tagName;
   if((tagName == 'IMG') || (tagName == 'VIDEO') || (tagName == 'CANVAS')){
      data = content;
   }else if(MO.Class.isClass(content, MO.FImage)){
      data = content.image();
   }else if(MO.Class.isClass(content, MO.MCanvasObject)){
      data = content.htmlCanvas();
   }else{
      throw new TError('Invalid image format.');
   }
   handle.bindTexture(handle.TEXTURE_2D, o._handle);
   if(o._optionFlipY){
      handle.pixelStorei(handle.UNPACK_FLIP_Y_WEBGL, true);
   }
   handle.texImage2D(handle.TEXTURE_2D, 0, handle.RGBA, handle.RGBA, handle.UNSIGNED_BYTE, data);
   o.update();
   o._statusLoad = context.checkError("texImage2D", "Upload image failure.");
}
MO.FWglFlatTexture_update = function FWglFlatTexture_update(){
   var o = this;
   o.__base.FG3dFlatTexture.update.call(o);
   var handle = o._graphicContext._handle;
   handle.bindTexture(handle.TEXTURE_2D, o._handle);
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._filterMinCd);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MIN_FILTER, code);
   }
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._filterMagCd);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_MAG_FILTER, code);
   }
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._wrapS);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_WRAP_S, code);
   }
   var code = MO.RWglUtility.convertSamplerFilter(handle, o._wrapT);
   if(code){
      handle.texParameteri(handle.TEXTURE_2D, handle.TEXTURE_WRAP_T, code);
   }
}
MO.FWglFlatTexture_dispose = function FWglFlatTexture_dispose(){
   var o = this;
   var context = o._graphicContext;
   var handle = o._handle;
   if(handle){
      context._handle.deleteTexture(handle);
      o._handle = null;
   }
   o.__base.FG3dFlatTexture.dispose.call(o);
}
MO.FWglFragmentShader = function FWglFragmentShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dFragmentShader);
   o._handle      = null;
   o.setup        = MO.FWglFragmentShader_setup;
   o.targetSource = MO.FWglFragmentShader_targetSource;
   o.upload       = MO.FWglFragmentShader_upload;
   o.dispose      = MO.FWglFragmentShader_dispose;
   return o;
}
MO.FWglFragmentShader_setup = function FWglFragmentShader_setup(){
   var o = this;
   o.__base.FG3dFragmentShader.setup.call(o);
   var graphic = o._graphicContext._handle;
   o._handle = graphic.createShader(graphic.FRAGMENT_SHADER);
}
MO.FWglFragmentShader_targetSource = function FWglFragmentShader_targetSource(){
   var o = this;
   var source = null;
   var context = o._graphicContext;
   var capability = context.capability();
   if(capability.optionShaderSource){
      source = context._handleDebugShader.getTranslatedShaderSource(o._handle);
   }else{
      source = o._source;
   }
   return source;
}
MO.FWglFragmentShader_upload = function FWglFragmentShader_upload(source){
   var o = this;
   var graphic = o._graphicContext._handle;
   var shader = o._handle;
   graphic.shaderSource(shader, source);
   graphic.compileShader(shader);
   var result = graphic.getShaderParameter(shader, graphic.COMPILE_STATUS);
   if(!result){
      var info = graphic.getShaderInfoLog(shader);
      graphic.deleteShader(shader);
      o._handle = null;
      throw new MO.TError(o, 'Upload fragment shader source failure. (error={1})\n{2}', info, source);
   }
   o._source = source;
   return true;
}
MO.FWglFragmentShader_dispose = function FWglFragmentShader_dispose(){
   var o = this;
   var context = o._graphicContext;
   var shader = o._handle;
   if(shader){
      context._handle.deleteShader(shader);
      o._handle = null;
   }
   o.__base.FG3dFragmentShader.dispose.call(o);
}
MO.FWglIndexBuffer = function FWglIndexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dIndexBuffer);
   o._handle = null;
   o.setup   = MO.FWglIndexBuffer_setup;
   o.isValid = MO.FWglIndexBuffer_isValid;
   o.upload  = MO.FWglIndexBuffer_upload;
   o.dispose = MO.FWglIndexBuffer_dispose;
   return o;
}
MO.FWglIndexBuffer_setup = function FWglIndexBuffer_setup(){
   var o = this;
   o.__base.FG3dIndexBuffer.setup.call(o);
   o._handle = o._graphicContext._handle.createBuffer();
}
MO.FWglIndexBuffer_isValid = function FWglIndexBuffer_isValid(){
   var o = this;
   var handle = o._graphicContext._handle;
   return handle.isBuffer(o._handle);
}
MO.FWglIndexBuffer_upload = function FWglIndexBuffer_upload(data, count, remain){
   var o = this;
   var context = o._graphicContext;
   var handle = context._handle;
   if(remain){
      o._data = data;
   }
   o._count = count;
   var memory = null;
   if((data.constructor == Array) || (data.constructor == ArrayBuffer)){
      if(o._strideCd == MO.EG3dIndexStride.Uint16){
         memory = new Uint16Array(data);
      }else if(o._strideCd == MO.EG3dIndexStride.Uint32){
         memory = new Uint32Array(data);
      }else{
         throw new TError(o, 'Index stride is invalid.');
      }
   }else if(data.constructor == Uint16Array){
      if(o._strideCd != MO.EG3dIndexStride.Uint16){
         throw new TError(o, 'Index stride16 is invalid.');
      }
      memory = data;
   }else if(data.constructor == Uint32Array){
      if(o._strideCd != MO.EG3dIndexStride.Uint32){
         throw new TError(o, 'Index stride16 is invalid.');
      }
      memory = data;
   }else{
      throw new TError(o, 'Upload index data type is invalid. (value={1})', data);
   }
   handle.bindBuffer(handle.ELEMENT_ARRAY_BUFFER, o._handle);
   context.checkError('bindBuffer', 'Bind buffer failure.');
   handle.bufferData(handle.ELEMENT_ARRAY_BUFFER, memory, handle.STATIC_DRAW);
   context.checkError('bufferData', 'Upload buffer data. (count={1})', count);
}
MO.FWglIndexBuffer_dispose = function FWglIndexBuffer_dispose(){
   var o = this;
   var context = o._graphicContext;
   o._resource = null;
   var handle = o._handle;
   if(handle){
      context._handle.deleteBuffer(handle);
      o._handle = null;
   }
   o.__base.FG3dIndexBuffer.dispose.call(o);
}
MO.FWglLayout = function FWglLayout(o){
   o = MO.Class.inherits(this, o, MO.FG3dLayout);
   o._handle  = null;
   o.setup    = MO.FWglLayout_setup;
   o.bind     = MO.FWglLayout_bind;
   o.unbind   = MO.FWglLayout_unbind;
   o.active   = MO.FWglLayout_active;
   o.deactive = MO.FWglLayout_deactive;
   o.dispose  = MO.FWglLayout_dispose;
   return o;
}
MO.FWglLayout_setup = function FWglLayout_setup(){
   var o = this;
   o.__base.FG3dLayout.setup.call(o);
   var c = o._graphicContext;
   o._handle = c._handleLayout.createVertexArrayOES();
}
MO.FWglLayout_bind = function FWglLayout_bind(){
   var o = this;
   var c = o._graphicContext;
   c._handleLayout.bindVertexArrayOES(o._handle);
}
MO.FWglLayout_unbind = function FWglLayout_unbind(){
   var o = this;
   var c = o._graphicContext;
   c._handleLayout.bindVertexArrayOES(null);
}
MO.FWglLayout_active = function FWglLayout_active(){
   var o = this;
   var c = o._graphicContext;
   c._handleLayout.bindVertexArrayOES(o._handle);
}
MO.FWglLayout_deactive = function FWglLayout_deactive(){
   var o = this;
   var c = o._graphicContext;
   c._handleLayout.bindVertexArrayOES(null);
}
MO.FWglLayout_dispose = function FWglLayout_dispose(){
   var o = this;
   var c = o._graphicContext;
   var layout = o._handle;
   if(layout){
      c._handleLayout.deleteVertexArrayOES(layout);
      o._handle = null;
   }
   o.__base.FG3dLayout.dispose.call(o);
}
MO.FWglProgram = function FWglProgram(o){
   o = MO.Class.inherits(this, o, MO.FG3dProgram);
   o._handle        = null;
   o.setup          = MO.FWglProgram_setup;
   o.vertexShader   = MO.FWglProgram_vertexShader;
   o.fragmentShader = MO.FWglProgram_fragmentShader;
   o.upload         = MO.FWglProgram_upload;
   o.build          = MO.FWglProgram_build;
   o.link           = MO.FWglProgram_link;
   o.dispose        = MO.FWglProgram_dispose;
   return o;
}
MO.FWglProgram_setup = function FWglProgram_setup(){
   var o = this;
   var c = g = o._graphicContext;
   o._handle = c._handle.createProgram();
}
MO.FWglProgram_vertexShader = function FWglProgram_vertexShader(){
   var o = this;
   var shader = o._vertexShader;
   if(!shader){
      shader = o._vertexShader = MO.Class.create(MO.FWglVertexShader);
      shader.linkGraphicContext(o);
      shader.setup();
   }
   return shader;
}
MO.FWglProgram_fragmentShader = function FWglProgram_fragmentShader(){
   var o = this;
   var shader = o._fragmentShader;
   if(!shader){
      shader = o._fragmentShader = MO.Class.create(MO.FWglFragmentShader);
      shader.linkGraphicContext(o);
      shader.setup();
   }
   return shader;
}
MO.FWglProgram_upload = function FWglProgram_upload(shaderCd, source){
   var o = this;
   if(shaderCd == MO.EG3dShader.Vertex){
      o.vertexShader().upload(source);
   }else if(shaderCd == MO.EG3dShader.Fragment){
      o.fragmentShader().upload(source);
   }else{
      throw new Error('Unknown type');
   }
}
MO.FWglProgram_build = function FWglProgram_build(){
   var o = this;
   var context = o._graphicContext;
   var g = context._handle;
   var pn = o._handle;
   var vertexShader = o.vertexShader();
   g.attachShader(pn, vertexShader._handle);
   var result = context.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, vertexShader._handle);
   if(!result){
      return result;
   }
   var fragmentShader = o.fragmentShader();
   g.attachShader(pn, fragmentShader._handle);
   var result = context.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, fragmentShader._handle);
   if(!result){
      return result;
   }
   if(o.hasAttribute()){
      var attributes = o.attributes();
      var ac = attributes.count();
      for(var n = 0; n < ac; n++){
         var attribute = attributes.at(n);
         var attributeName = attribute.name();
         g.bindAttribLocation(pn, n, attributeName);
         result = context.checkError("bindAttribLocation", "Bind attribute location. (program_id=%d, slot=%d, name=%s)", pn, n, attributeName);
         if(!result){
            return result;
         }
      }
   }
}
MO.FWglProgram_link = function FWglProgram_link(){
   var o = this;
   var context = o._graphicContext;
   var g = context._handle;
   var result = false;
   var pn = o._handle;
   g.linkProgram(pn);
   var pr = g.getProgramParameter(pn, g.LINK_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
      MO.Logger.fatal(this, null, "Link program failure. (status={1}, reason={2})", pr, pi);
      g.deleteProgram(o._handle);
      o._handle = null;
      return false;
   }
   g.validateProgram(pn);
   var pr = g.getProgramParameter(pn, g.VALIDATE_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
   }
   g.finish();
   result = context.checkError("finish", "Finish program link faliure. (program_id={1})", pn);
   if(!result){
      return result;
   }
   if(o.hasParameter()){
      var count = o._parameters.count();
      for(var n = 0; n < count; n++){
         var parameter = o._parameters.at(n);
         var handle = g.getUniformLocation(pn, parameter.name());
         result = context.checkError("getUniformLocation", "Find parameter slot. (program_id=%d, name=%s, slot=%d)", pn, parameter.name(), handle);
         if(!result){
            return result;
         }
         parameter._slot = handle;
         if(handle != null){
            parameter._statusUsed = true;
         }
      }
   }
   if(o.hasAttribute()){
      var count = o._attributes.count();
      for(var n = 0; n < count; n++){
         var attribute = o._attributes.at(n);
         var handle = g.getAttribLocation(pn, attribute.name());
         result = context.checkError("getAttribLocation", "Find attribute slot. (program_id=%d, name=%s, slot=%d)", pn, attribute.name(), handle);
         if(!result){
            return result;
         }
         attribute._slot = handle;
         if(handle != -1){
            attribute._statusUsed = true;
         }
      }
   }
   if(o.hasSampler()){
      var count = o._samplers.count();
      for(var n = 0; n < count; n++){
         var sampler = o._samplers.at(n);
         var handle = g.getUniformLocation(pn, sampler.name());
         result = context.checkError("getUniformLocation", "Find sampler slot. (program_id=%d, name=%s, slot=%d)", pn, sampler.name(), handle);
         if(!result){
            return result;
         }
         sampler._slot = handle;
         if(handle != null){
            sampler._statusUsed = true;
         }
      }
      var si = 0;
      for(var n = 0; n < count; n++){
         var sampler = o._samplers.value(n);
         if(sampler._statusUsed){
            sampler._index = si++;
         }
      }
   }
   return result;
}
MO.FWglProgram_dispose = function FWglProgram_dispose(){
   var o = this;
   var context = o._graphicContext;
   var handle = o._handle;
   if(handle){
      context._handle.deleteProgram(handle);
      o._handle = null;
   }
   o.__base.FG3dProgram.dispose.call(o);
}
MO.FWglRenderTarget = function FWglRenderTarget(o){
   o = MO.Class.inherits(this, o, MO.FG3dRenderTarget);
   o._optionDepth = true;
   o._handle      = null;
   o._handleDepth = null;
   o.setup        = MO.FWglRenderTarget_setup;
   o.build        = MO.FWglRenderTarget_build;
   o.dispose      = MO.FWglRenderTarget_dispose;
   return o;
}
MO.FWglRenderTarget_setup = function FWglRenderTarget_setup(){
   var o = this;
   o.__base.FG3dRenderTarget.setup.call(o);
   var c = o._graphicContext;
   var g = c._handle;
   o._handle = g.createFramebuffer();
   return c.checkError('createFramebuffer', 'Create frame buffer failure.');
}
MO.FWglRenderTarget_build = function FWglRenderTarget_build(){
   var o = this;
   var s = o._size;
   var c = o._graphicContext;
   var g = c._handle;
   g.bindFramebuffer(g.FRAMEBUFFER, o._handle);
   var r = c.checkError('bindFramebuffer', 'Bind frame buffer failure.');
   if(!r){
      return r;
   }
   if(o._optionDepth){
      var nd = o._handleDepth = g.createRenderbuffer();
      var r = c.checkError('createRenderbuffer', 'Create render buffer failure.');
      if(!r){
         return r;
      }
      g.bindRenderbuffer(g.RENDERBUFFER, nd);
      var r = c.checkError('bindRenderbuffer', 'Bind render buffer failure.');
      if(!r){
         return r;
      }
      g.renderbufferStorage(g.RENDERBUFFER, g.DEPTH_COMPONENT16, s.width, s.height);
      var r = c.checkError('renderbufferStorage', 'Set render buffer storage format failure.');
      if(!r){
         return r;
      }
      g.framebufferRenderbuffer(g.FRAMEBUFFER, g.DEPTH_ATTACHMENT, g.RENDERBUFFER, nd);
      var r = c.checkError('framebufferRenderbuffer', "Set depth buffer to frame buffer failure. (framebuffer=%d, depthbuffer=%d)", o._handle, nd);
      if(!r){
         return r;
      }
   }
   var ts = o._textures;
   var tc = ts.count();
   for(var i = 0; i < tc; i++){
      var t = ts.get(i);
      g.bindTexture(g.TEXTURE_2D, t._handle);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
      g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
      g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, s.width, s.height, 0, g.RGBA, g.UNSIGNED_BYTE, null);
      var r = c.checkError('texImage2D', "Alloc texture storage. (texture_id, size=%dx%d)", t._handle, o._size.width, o._size.height);
      if(!r){
         return r;
      }
      g.framebufferTexture2D(g.FRAMEBUFFER, g.COLOR_ATTACHMENT0 + i, g.TEXTURE_2D, t._handle, 0);
      var r = c.checkError('framebufferTexture2D', "Set color buffer into frame buffer failure. (framebuffer_id=%d, texture_id=%d)", o._handle, t._handle);
      if(!r){
         return r;
      }
   }
}
MO.FWglRenderTarget_dispose = function FWglRenderTarget_dispose(){
   var o = this;
   var c = o._graphicContext;
   var n = o._handleDepth;
   if(n){
      c._handle.deleteRenderbuffer(n);
      o._handleDepth = null;
   }
   var n = o._handle;
   if(n){
      c._handle.deleteFramebuffer(n);
      o._handle = null;
   }
   o.__base.FG3dRenderTarget.dispose.call(o);
}
MO.FWglVertexBuffer = function FWglVertexBuffer(o){
   o = MO.Class.inherits(this, o, MO.FG3dVertexBuffer);
   o._handle = null;
   o.setup   = MO.FWglVertexBuffer_setup;
   o.isValid = MO.FWglVertexBuffer_isValid;
   o.upload  = MO.FWglVertexBuffer_upload;
   o.dispose = MO.FWglVertexBuffer_dispose;
   return o;
}
MO.FWglVertexBuffer_setup = function FWglVertexBuffer_setup(){
   var o = this;
   o.__base.FG3dVertexBuffer.setup.call(o);
   var graphic = o._graphicContext._handle;
   o._handle = graphic.createBuffer();
}
MO.FWglVertexBuffer_isValid = function FWglVertexBuffer_isValid(){
   var o = this;
   var graphic = o._graphicContext._handle;
   return graphic.isBuffer(o._handle);
}
MO.FWglVertexBuffer_upload = function FWglVertexBuffer_upload(data, stride, count, remain){
   var o = this;
   var context = o._graphicContext;
   var graphics = context._handle;
   if(remain){
      o._data = data;
   }
   o._stride = stride;
   o._count = count;
   var arrays = null;
   if((data.constructor == Array) || (data.constructor == ArrayBuffer)){
      switch(o._formatCd){
         case MO.EG3dAttributeFormat.Float1:
         case MO.EG3dAttributeFormat.Float2:
         case MO.EG3dAttributeFormat.Float3:
         case MO.EG3dAttributeFormat.Float4:
            arrays = new Float32Array(data);
            break;
         case MO.EG3dAttributeFormat.Byte4:
         case MO.EG3dAttributeFormat.Byte4Normal:
            arrays = new Uint8Array(data);
            break;
         default:
            throw new MO.TError(o, 'Unknown data type.');
      }
   }else if(data.constructor == Uint8Array){
      arrays = data;
   }else if(data.constructor == Float32Array){
      arrays = data;
   }else{
      throw new MO.TError(o, 'Upload vertex data type is invalid. (data={1})', data);
   }
   graphics.bindBuffer(graphics.ARRAY_BUFFER, o._handle);
   context.checkError('bindBuffer', 'Bindbuffer');
   graphics.bufferData(graphics.ARRAY_BUFFER, arrays, graphics.STATIC_DRAW);
   context.checkError('bufferData', 'bufferData');
}
MO.FWglVertexBuffer_dispose = function FWglVertexBuffer_dispose(){
   var o = this;
   var context = o._graphicContext;
   o._resource = null;
   var buffer = o._handle;
   if(buffer){
      context._handle.deleteBuffer(buffer);
      o._handle = null;
   }
   o.__base.FG3dVertexBuffer.dispose.call(o);
}
MO.FWglVertexShader = function FWglVertexShader(o){
   o = MO.Class.inherits(this, o, MO.FG3dVertexShader);
   o._handle      = null;
   o.setup        = MO.FWglVertexShader_setup;
   o.targetSource = MO.FWglVertexShader_targetSource;
   o.upload       = MO.FWglVertexShader_upload;
   o.dispose      = MO.FWglVertexShader_dispose;
   return o;
}
MO.FWglVertexShader_setup = function FWglVertexShader_setup(){
   var o = this;
   o.__base.FG3dVertexShader.setup.call(o);
   var graphic = o._graphicContext._handle;
   o._handle = graphic.createShader(graphic.VERTEX_SHADER);
}
MO.FWglVertexShader_targetSource = function FWglVertexShader_targetSource(){
   var o = this;
   var source = null;
   var context = o._graphicContext;
   var capability = context.capability();
   if(capability.optionShaderSource){
      source = context._handleDebugShader.getTranslatedShaderSource(o._handle);
   }else{
      source = o._source;
   }
   return source;
}
MO.FWglVertexShader_upload = function FWglVertexShader_upload(source){
   var o = this;
   var graphic = o._graphicContext._handle;
   var shader = o._handle;
   graphic.shaderSource(shader, source);
   graphic.compileShader(shader);
   var result = graphic.getShaderParameter(shader, graphic.COMPILE_STATUS);
   if(!result){
      var info = graphic.getShaderInfoLog(shader);
      graphic.deleteShader(shader);
      o._handle = null;
      throw new MO.TError(o, 'Upload vertex shader source failure. (error={1})\n{2}', info, source);
   }
   o._source = source;
   return true;
}
MO.FWglVertexShader_dispose = function FWglVertexShader_dispose(){
   var o = this;
   var context = o._graphicContext;
   var shader = o._handle;
   if(shader){
      context._handle.deleteShader(shader);
      o._handle = null;
   }
   o.__base.FG3dVertexShader.dispose.call(o);
}
MO.RWglUtility = function RWglUtility(){
   return this;
}
MO.RWglUtility.prototype.convertFillMode = function RWglUtility_convertFillMode(graphic, fillCd){
   switch(fillCd){
      case MO.EG3dFillMode.Point:
         return graphic.POINT;
      case MO.EG3dFillMode.Line:
         return graphic.LINE;
      case MO.EG3dFillMode.Face:
         return graphic.FILL;
   }
   throw new TError(this, "Convert fill mode failure. (fill_cd={1})", fillCd);
}
MO.RWglUtility.prototype.convertDrawMode = function RWglUtility_convertDrawMode(graphic, drawCd){
   switch(drawCd){
      case MO.EG3dDrawMode.Point:
         return graphic.POINTS;
      case MO.EG3dDrawMode.Lines:
         return graphic.LINES;
      case MO.EG3dDrawMode.LineStrip:
         return graphic.LINE_STRIP;
      case MO.EG3dDrawMode.LineLoop:
         return graphic.LINE_LOOP;
      case MO.EG3dDrawMode.Triangles:
         return graphic.TRIANGLES;
      case MO.EG3dDrawMode.TriangleStrip:
         return graphic.TRIANGLE_STRIP;
      case MO.EG3dDrawMode.TriangleFan:
         return graphic.TRIANGLE_FAN;
      case MO.EG3dDrawMode.Quads:
         return graphic.QUADS;
      case MO.EG3dDrawMode.QuadStrip:
         return graphic.QUAD_STRIP;
   }
   throw new TError(this, "Convert draw mode failure. (draw_cd={1})", drawCd);
}
MO.RWglUtility.prototype.convertCullMode = function RWglUtility_convertCullMode(graphic, cullCd){
   switch(cullCd){
      case MO.EG3dCullMode.Front:
         return graphic.FRONT;
      case MO.EG3dCullMode.Back:
         return graphic.BACK;
      case MO.EG3dCullMode.Both:
         return graphic.FRONT_AND_BACK;
   }
   throw new TError(this, "Convert cull mode failure. (cull_cd={1})", cullCd);
}
MO.RWglUtility.prototype.convertDepthMode = function RWglUtility_convertDepthMode(graphic, depthCd){
   switch(depthCd){
      case MO.EG3dDepthMode.Equal:
         return graphic.EQUAL;
      case MO.EG3dDepthMode.NotEqual:
         return graphic.NOTEQUAL;
      case MO.EG3dDepthMode.Less:
         return graphic.LESS;
      case MO.EG3dDepthMode.LessEqual:
         return graphic.LEQUAL;
      case MO.EG3dDepthMode.Greater:
         return graphic.GREATER;
      case MO.EG3dDepthMode.GreaterEqual:
         return graphic.GEQUAL;
      case MO.EG3dDepthMode.Always:
         return graphic.ALWAYS;
   }
   throw new TError(this, "Convert depth mode failure. (depth_cd={1})", depthCd);
}
MO.RWglUtility.prototype.convertBlendFactors = function RWglUtility_convertBlendFactors(graphic, blendCd){
   switch(blendCd){
      case MO.EG3dBlendMode.Zero:
         return graphic.ZERO;
      case MO.EG3dBlendMode.One:
         return graphic.ONE;
      case MO.EG3dBlendMode.SrcColor:
         return graphic.SRC_COLOR;
      case MO.EG3dBlendMode.OneMinusSrcColor:
         return graphic.ONE_MINUS_SRC_COLOR;
      case MO.EG3dBlendMode.DstColor:
         return graphic.DST_COLOR;
      case MO.EG3dBlendMode.OneMinusDstColor:
         return graphic.ONE_MINUS_DST_COLOR;
      case MO.EG3dBlendMode.SrcAlpha:
         return graphic.SRC_ALPHA;
      case MO.EG3dBlendMode.OneMinusSrcAlpha:
         return graphic.ONE_MINUS_SRC_ALPHA;
      case MO.EG3dBlendMode.DstAlpha:
         return graphic.DST_ALPHA;
      case MO.EG3dBlendMode.OneMinusDstAlpha:
         return graphic.ONE_MINUS_DST_ALPHA;
      case MO.EG3dBlendMode.SrcAlphaSaturate:
         return graphic.SRC_ALPHA_SATURATE;
   }
   throw new TError(this, "Convert blend factors failure. (blend_cd={1})", blendCd);
}
MO.RWglUtility.prototype.convertIndexStride = function RWglUtility_convertIndexStride(graphic, strideCd){
   switch(strideCd){
      case MO.EG3dIndexStride.Uint16:
         return graphic.UNSIGNED_SHORT;
      case MO.EG3dIndexStride.Uint32:
         return graphic.UNSIGNED_INT;
   }
   throw new TError(this, "Convert index stride failure. (stride_cd={1})", strideCd);
}
MO.RWglUtility.prototype.convertSamplerFilter = function RWglUtility_convertSamplerFilter(graphic, filterCd){
   switch(filterCd){
      case MO.EG3dSamplerFilter.Unknown:
         return 0;
      case MO.EG3dSamplerFilter.Nearest:
         return graphic.NEAREST;
      case MO.EG3dSamplerFilter.Linear:
         return graphic.LINEAR;
      case MO.EG3dSamplerFilter.Repeat:
         return graphic.REPEAT;
      case MO.EG3dSamplerFilter.ClampToEdge:
         return graphic.CLAMP_TO_EDGE;
      case MO.EG3dSamplerFilter.ClampToBorder:
         return graphic.CLAMP_TO_BORDER;
   }
   throw new TError(this, "Convert sampler filter failure. (filter_cd={1})", filterCd);
}
MO.RWglUtility = new MO.RWglUtility();
