MO.ME3dBoundaryPolygon = function ME3dBoundaryPolygon(o){
   o = MO.Class.inherits(this, o);
   o._positionCount = MO.Class.register(o, new MO.AGetter('_positionCount'));
   o._positions     = MO.Class.register(o, new MO.AGetter('_positions'));
   o._indexCount    = MO.Class.register(o, new MO.AGetter('_indexCount'));
   o._indexes       = MO.Class.register(o, new MO.AGetter('_indexes'));
   o.construct      = MO.ME3dBoundaryPolygon_construct;
   o.dispose        = MO.ME3dBoundaryPolygon_dispose;
   return o;
}
MO.ME3dBoundaryPolygon_construct = function ME3dBoundaryPolygon_construct(){
   var o = this;
}
MO.ME3dBoundaryPolygon_dispose = function ME3dBoundaryPolygon_dispose(){
   var o = this;
   o._positions = null;
   o._indexes = null;
}
MO.ME3dDynamicRenderable = function ME3dDynamicRenderable(o){
   o = MO.Class.inherits(this, o);
   o._color    = MO.Class.register(o, new MO.AGetter('_color'));
   o.construct = MO.ME3dDynamicRenderable_construct;
   o.dispose   = MO.ME3dDynamicRenderable_dispose;
   return o;
}
MO.ME3dDynamicRenderable_construct = function ME3dDynamicRenderable_construct(){
   var o = this;
   o._color = new MO.SColor4(1, 1, 1, 1);
}
MO.ME3dDynamicRenderable_dispose = function ME3dDynamicRenderable_dispose(){
   var o = this;
   o._color = MO.Lang.Object.dispose(o._color);
}
MO.SE3dRulerPrecision = function SE3dRulerPrecision(o){
   var o = this;
   o.interval = 1;
   o.length   = 0.5;
   o.color    = new MO.SColor4(255, 255, 255, 255);
   return o;
}
MO.SE3dRulerPrecision_assign = function SE3dRulerPrecision_assign(info){
   var o = this;
   o.interval.assign(info.interval);
   o.color.assign(info.color);
}
MO.SE3dRulerStyle = function SE3dRulerStyle(o){
   var o = this;
   o.lineColor    = new MO.SColor4(255, 255, 255, 255);
   o.bothLength   = 0.5;
   o.bothColor    = new MO.SColor4(255, 255, 255, 255);
   o.tickInterval = 1;
   o.tickLength   = 0.3;
   o.tickColor    = new MO.SColor4(255, 255, 255, 255);
   o.precisions   = new MO.TObjects();
   o.assign       = MO.SE3dRulerStyle_assign;
   return o;
}
MO.SE3dRulerStyle = function SE3dRulerStyle_assign(info){
   var o = this;
   o.lineColor.assign(info.lineColor);
   o.bothLength = info.bothLength;
   o.bothColor.assign(info.lineColor);
   o.tickInterval = info.tickInterval;
   o.tickLength = info.tickLength;
   o.tickColor.assign(info.lineColor);
   o.precisions.assign(info.precisions);
}
MO.FE3dBitmap = function FE3dBitmap(o){
   o = MO.Class.inherits(this, o, MO.FE3dFace);
   o.construct = MO.FE3dBitmap_construct;
   o.testReady = MO.FE3dBitmap_testReady;
   o.loadUrl   = MO.FE3dBitmap_loadUrl;
   o.dispose   = MO.FE3dBitmap_dispose;
   return o;
}
MO.FE3dBitmap_construct = function FE3dBitmap_construct(){
   var o = this;
   o.__base.FE3dFace.construct.call(o);
}
MO.FE3dBitmap_testReady = function FE3dBitmap_testReady(){
   var o = this;
   if(!o._ready){
      var renderable = o._renderable;
      if(renderable){
         o._ready = renderable.testReady();
         if(o._ready){
            var size = renderable.size();
            var adjustSize = renderable.adjustSize();
            var matrix = o.matrix();
            matrix.sz = adjustSize.height / size.height;
            matrix.updateForce();
            var event = new MO.SEvent(o);
            o.processLoadListener(event);
            event.dispose();
         }
         o._materialReference = renderable;
      }
   }
   return o._ready;
}
MO.FE3dBitmap_loadUrl = function FE3dBitmap_loadUrl(url){
   var o = this;
   o._renderable = MO.Console.find(MO.FE3dBitmapConsole).loadDataByUrl(o, url);
   o._ready = false;
}
MO.FE3dBitmap_dispose = function FE3dBitmap_dispose(){
   var o = this;
   o.__base.FE3dFace.dispose.call(o);
}
MO.FE3dBitmapConsole = function FE3dBitmapConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd       = MO.EScope.Local;
   o._bitmaps       = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   o._bitmapDatas   = MO.Class.register(o, new MO.AGetter('_bitmapDatas'));
   o._dataUrl       = '/cloud.resource.bitmap.wv'
   o.construct      = MO.FE3dBitmapConsole_construct;
   o.loadByUrl      = MO.FE3dBitmapConsole_loadByUrl;
   o.loadByGuid     = MO.FE3dBitmapConsole_loadByGuid;
   o.loadDataByUrl  = MO.FE3dBitmapConsole_loadDataByUrl;
   o.loadDataByGuid = MO.FE3dBitmapConsole_loadDataByGuid;
   o.dispose        = MO.FE3dBitmapConsole_dispose;
   return o;
}
MO.FE3dBitmapConsole_construct = function FE3dBitmapConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._bitmaps = new MO.TDictionary();
   o._bitmapDatas = new MO.TDictionary();
}
MO.FE3dBitmapConsole_loadByUrl = function FE3dBitmapConsole_loadByUrl(context, url){
   var o = this;
   var bitmap = o._bitmaps.get(url);
   if(bitmap){
      return bitmap;
   }
   var loadUrl = MO.Window.Browser.contentPath(url);
   MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
   var bitmap = MO.Class.create(MO.FE3dBitmap);
   bitmap.linkGraphicContext(context);
   bitmap.setup();
   bitmap.loadUrl(url);
   o._bitmaps.set(url, bitmap);
   return bitmap;
}
MO.FE3dBitmapConsole_loadByGuid = function FE3dBitmapConsole_loadByGuid(context, guid){
   var o = this;
   var url = MO.Window.Browser.hostPath(o._dataUrl + '?do=view&guid=' + guid);
   return o.loadByUrl(context, url);
}
MO.FE3dBitmapConsole_loadDataByUrl = function FE3dBitmapConsole_loadDataByUrl(context, url){
   var o = this;
   var dataUrl = MO.Window.Browser.contentPath(url);
   MO.Logger.info(o, 'Load bitmap data from url. (url={1})', dataUrl);
   var data = o._bitmapDatas.get(url);
   if(!data){
      data = MO.Class.create(MO.FE3dBitmapData);
      data.linkGraphicContext(context);
      data.setup();
      data.loadUrl(url);
      o._bitmapDatas.set(url, data);
   }
   return data;
}
MO.FE3dBitmapConsole_loadDataByGuid = function FE3dBitmapConsole_loadDataByGuid(context, guid){
   var o = this;
   var url = MO.Window.Browser.hostPath(o._dataUrl + '?do=view&guid=' + guid);
   return o.loadDataByUrl(context, url);
}
MO.FE3dBitmapConsole_dispose = function FE3dBitmapConsole_dispose(){
   var o = this;
   o._bitmaps = MO.Lang.Object.dispose(o._bitmaps);
   o._bitmapDatas = MO.Lang.Object.dispose(o._bitmapDatas);
   o.__base.FConsole.dispose.call(o);
}
MO.FE3dBitmapData = function FE3dBitmapData(o){
   o = MO.Class.inherits(this, o, MO.FE3dFaceData, MO.MListener);
   o._image      = null;
   o._listenersImageLoad = MO.Class.register(o, new MO.AListener('_listenersImageLoad'));
   o.onImageLoad = MO.FE3dBitmapData_onImageLoad;
   o.construct   = MO.FE3dBitmapData_construct;
   o.loadUrl     = MO.FE3dBitmapData_loadUrl;
   o.dispose     = MO.FE3dBitmapData_dispose;
   return o;
}
MO.FE3dBitmapData_onImageLoad = function FE3dBitmapData_onImageLoad(event){
   var o = this;
   var context = o._graphicContext;
   var image = event.sender;
   var size = image.size();
   var width = size.width;
   var height = size.height;
   o._size.set(width, height);
   var adjustWidth = MO.Lang.Integer.pow2(width);
   var adjustHeight = MO.Lang.Integer.pow2(height);
   o._adjustSize.set(adjustWidth, adjustHeight);
   var texture = o._texture;
   if((adjustWidth == width) && (adjustHeight == height)){
      texture.upload(image);
   }else{
      var canvasConsole = MO.Console.find(MO.FE2dCanvasConsole);
      var canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
      var context2d = canvas.graphicContext();
      context2d.drawImage(image, 0, 0, width, height);
      texture.upload(canvas);
      canvasConsole.free(canvas);
   }
   image.dispose();
   o._ready = true;
   o.processImageLoadListener(o);
}
MO.FE3dBitmapData_construct = function FE3dBitmapData_construct(){
   var o = this;
   o.__base.FE3dFaceData.construct.call(o);
}
MO.FE3dBitmapData_loadUrl = function FE3dBitmapData_loadUrl(url){
   var o = this;
   var image = MO.Class.create(MO.FImage);
   image.addLoadListener(o, o.onImageLoad);
   image.loadUrl(url);
   o._ready = false;
}
MO.FE3dBitmapData_dispose = function FE3dBitmapData_dispose(){
   var o = this;
   o.__base.FE3dFaceData.dispose.call(o);
}
MO.EE3dBoundaryShape = function EE3dBoundaryShape(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._optionSphere     = false;
   o._scale            = MO.Class.register(o, new MO.AGetter('_scale'), 1);
   o._color            = MO.Class.register(o, new MO.AGetter('_color'));
   o._polygons         = MO.Class.register(o, new MO.AGetter('_polygons'));
   o._faceEffectCode   = MO.Class.register(o, new MO.AGetSet('_faceEffectCode'));
   o._faceRenderable   = MO.Class.register(o, new MO.AGetter('_faceRenderable'));
   o._borderEffectCode = MO.Class.register(o, new MO.AGetSet('_borderEffectCode'));
   o._borderRenderable = MO.Class.register(o, new MO.AGetter('_borderRenderable'));
   o.construct         = MO.EE3dBoundaryShape_construct;
   o.pushPolygon       = MO.EE3dBoundaryShape_pushPolygon;
   o.buildFace         = MO.EE3dBoundaryShape_buildFace;
   o.buildBorder       = MO.EE3dBoundaryShape_buildBorder;
   o.build             = MO.EE3dBoundaryShape_build;
   o.buildFlat         = MO.EE3dBoundaryShape_buildFlat;
   o.buildSphere       = MO.EE3dBoundaryShape_buildSphere;
   o.dispose           = MO.EE3dBoundaryShape_dispose;
   return o;
}
MO.EE3dBoundaryShape_construct = function EE3dBoundaryShape_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._color = new MO.SColor4(0.3, 0.3, 0.3);
   o._polygons = new MO.TObjects();
}
MO.EE3dBoundaryShape_pushPolygon = function EE3dBoundaryShape_pushPolygon(polygon){
   this._polygons.push(polygon);
}
MO.EE3dBoundaryShape_buildFace = function EE3dBoundaryShape_buildFace(){
   var o = this;
   var context = o._graphicContext;
   var boundaries = o._polygons;
   var count = boundaries.count();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   var color = o._color;
   var vertexStart = 0;
   var vertexIndex = 0;
   var vertexData = new Float32Array(3 * vertexTotal * 2);
   var coordIndex = 0;
   var coordData = new Float32Array(2 * vertexTotal * 2);
   var faceIndex = 0;
   var faceData = new Uint32Array(indexTotal + 3 * 2 * vertexTotal);
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var cx = positions[positionIndex++];
         var cy = positions[positionIndex++];
         var x = cx * MO.Lang.Const.DEGREE_RATE;
         var y = cy * MO.Lang.Const.DEGREE_RATE;
         vertexData[vertexIndex++] = Math.sin(x) * Math.cos(y) * o._scale;
         vertexData[vertexIndex++] = Math.sin(y) * o._scale;
         vertexData[vertexIndex++] = -Math.cos(x) * Math.cos(y) * o._scale;
         coordData[coordIndex++] = cx / 360 + 0.5;
         coordData[coordIndex++] = 0.5 - cy / 180;
      }
      var indexes = boundary.indexes();
      var indexCount = indexes.length;
      var faceCount = indexCount / 3;
      for(var i = 0; i < faceCount; i++){
         var facePosition = 3 * i;
         faceData[faceIndex++] = vertexStart + indexes[facePosition + 2];
         faceData[faceIndex++] = vertexStart + indexes[facePosition + 1];
         faceData[faceIndex++] = vertexStart + indexes[facePosition    ];
      }
      vertexStart += positionCount;
   }
   var layerStart = vertexStart;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var x = positions[positionIndex++] * MO.Lang.Const.DEGREE_RATE;
         var y = positions[positionIndex++] * MO.Lang.Const.DEGREE_RATE;
         vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * 0.9;
         vertexData[vertexIndex++] = (Math.sin(y)) * 0.9;
         vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * 0.9;
         coordData[coordIndex++] = x;
         coordData[coordIndex++] = y;
      }
   }
   var vertexStart = 0;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      for(var i = 0; i < positionCount; i++){
         if(i == positionCount - 1){
            faceData[faceIndex++] = vertexStart + i;
            faceData[faceIndex++] = vertexStart + 0;
            faceData[faceIndex++] = vertexStart + i + layerStart;
            faceData[faceIndex++] = vertexStart + 0;
            faceData[faceIndex++] = vertexStart + layerStart;
            faceData[faceIndex++] = vertexStart + i + layerStart;
         }else{
            faceData[faceIndex++] = vertexStart + i;
            faceData[faceIndex++] = vertexStart + i + 1;
            faceData[faceIndex++] = vertexStart + i + layerStart;
            faceData[faceIndex++] = vertexStart + i + 1;
            faceData[faceIndex++] = vertexStart + i + layerStart + 1;
            faceData[faceIndex++] = vertexStart + i + layerStart;
         }
      }
      vertexStart += positionCount;
   }
   var colorIndex = 0;
   var colors = o.colorsData = new Uint8Array(4 * vertexTotal * 2);
   var positionTotal = vertexTotal * 2;
   for(var i = 0; i < positionTotal; i++){
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
   }
   var renderable = o._faceRenderable = MO.Class.create(MO.FE3dDataBox);
   renderable._shape = o;
   renderable.linkGraphicContext(context);
   renderable.setOptionColor(true);
   renderable.setOptionCoord(true);
   renderable.setVertexCount(vertexTotal * 2);
   renderable.setup();
   renderable.color().setHex('#0a5294');
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2, true);
   renderable.vertexCoordBuffer().upload(coordData, 4 * 2, vertexTotal * 2, true);
   renderable.indexBuffer().setStrideCd(MO.EG3dIndexStride.Uint32);
   renderable.indexBuffer().upload(faceData, faceIndex, true);
}
MO.EE3dBoundaryShape_buildBorder = function EE3dBoundaryShape_buildBorder(){
   var o = this;
   var context = o._graphicContext;
   var boundaries = o._polygons;
   var count = boundaries.count();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   var color = o._color;
   var vertexStart = 0;
   var vertexIndex = 0;
   var faceIndex = 0;
   var vertexData = new Float32Array(3 * vertexTotal * 2);
   var borderIndex = 0;
   var borderData = new Uint32Array(2 * vertexTotal + 2 * vertexTotal);
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var x = positions[positionIndex++] / 180 * Math.PI;
         var y = positions[positionIndex++] / 180 * Math.PI;
         vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * 1.001;
         vertexData[vertexIndex++] = (Math.sin(y)) * 1.001;
         vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * 1.001;
      }
      for(var i = 0; i < positionCount; i++){
         borderData[borderIndex++] = vertexStart + i;
         if(i == positionCount - 1){
            borderData[borderIndex++] = vertexStart;
         }else{
            borderData[borderIndex++] = vertexStart + i + 1;
         }
      }
      vertexStart += positionCount;
   }
   var layerStart = vertexStart;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var x = positions[positionIndex++] / 180 * Math.PI;
         var y = positions[positionIndex++] / 180 * Math.PI;
         vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * 0.98;
         vertexData[vertexIndex++] = (Math.sin(y)) * 0.98;
         vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * 0.98;
      }
      vertexStart += positionCount;
   }
   var vertexStart = 0;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      for(var i = 0; i < positionCount; i++){
         borderData[borderIndex++] = vertexStart + i;
         borderData[borderIndex++] = vertexStart + i + layerStart;
      }
      vertexStart += positionCount;
   }
   var colorIndex = 0;
   var colors = o.colorsData = new Uint8Array(4 * vertexTotal * 2);
   for(var i = 0; i < vertexTotal; i++){
      colors[colorIndex++] = 0x22;
      colors[colorIndex++] = 0xA9;
      colors[colorIndex++] = 0xFF;
      colors[colorIndex++] = 0xFF;
   }
   for(var i = 0; i < vertexTotal; i++){
      colors[colorIndex++] = 0x96;
      colors[colorIndex++] = 0xB0;
      colors[colorIndex++] = 0xD6;
      colors[colorIndex++] = 0xFF;
   }
   var renderable = o._borderRenderable = MO.Class.create(MO.FE3dDataBox);
   renderable._shape = o;
   renderable.linkGraphicContext(context);
   renderable.setup();
   renderable.setVertexCount(vertexTotal * 2);
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2, true);
   renderable.indexBuffer().setDrawModeCd(MO.EG3dDrawMode.Lines);
   renderable.indexBuffer().setStrideCd(MO.EG3dIndexStride.Uint32);
   renderable.indexBuffer().setLineWidth(1);
   renderable.indexBuffer().upload(borderData, borderIndex, true);
   renderable.material().info().effectCode = 'eai.map.face';
}
MO.EE3dBoundaryShape_build = function EE3dBoundaryShape_build(context){
   var o = this;
   var vertexTotal = 0;
   var indexTotal = 0;
   var boundaries = o._polygons;
   var count = boundaries.count();
   for(var i = 0; i < count; i++){
      var boundary = boundaries.at(i);
      vertexTotal += boundary.positionCount();
      indexTotal += boundary.indexes().length;
   }
   o._vertexTotal = vertexTotal;
   o._indexTotal = indexTotal;
   o.buildFace(context);
   o.buildBorder(context);
}
MO.EE3dBoundaryShape_buildFlat = function EE3dBoundaryShape_buildFlat(context){
   var o = this;
   o._optionSphere = false;
   o.build(context)
}
MO.EE3dBoundaryShape_buildSphere = function EE3dBoundaryShape_buildSphere(context){
   var o = this;
   o._optionSphere = true;
   o.build(context)
}
MO.EE3dBoundaryShape_dispose = function EE3dBoundaryShape_dispose(){
   var o = this;
   o._polygons = MO.Lang.Obejct.dispose(o._polygons);
   o.__base.FObject.dispose.call(o);
}
MO.FE3dBoundaryShape3d = function FE3dBoundaryShape3d(o){
   o = MO.Class.inherits(this, o, MO.FObject, MO.MGraphicObject);
   o._scaleTop          = MO.Class.register(o, new MO.AGetSet('_scaleTop'), 1);
   o._scaleBottom       = MO.Class.register(o, new MO.AGetSet('_scaleBottom'), 0.9);
   o._color             = MO.Class.register(o, new MO.AGetter('_color'));
   o._faceColor         = MO.Class.register(o, new MO.AGetter('_faceColor'));
   o._faceBottomColor   = MO.Class.register(o, new MO.AGetter('_faceBottomColor'));
   o._borderColor       = MO.Class.register(o, new MO.AGetter('_borderColor'));
   o._borderBottomColor = MO.Class.register(o, new MO.AGetter('_borderBottomColor'));
   o._polygons          = MO.Class.register(o, new MO.AGetter('_polygons'));
   o._faceEffectCode    = MO.Class.register(o, new MO.AGetSet('_faceEffectCode'));
   o._faceRenderable    = MO.Class.register(o, new MO.AGetter('_faceRenderable'));
   o._borderEffectCode  = MO.Class.register(o, new MO.AGetSet('_borderEffectCode'));
   o._borderRenderable  = MO.Class.register(o, new MO.AGetter('_borderRenderable'));
   o.construct          = MO.FE3dBoundaryShape3d_construct;
   o.pushPolygon        = MO.FE3dBoundaryShape3d_pushPolygon;
   o.buildFace          = MO.FE3dBoundaryShape3d_buildFace;
   o.buildBorder        = MO.FE3dBoundaryShape3d_buildBorder;
   o.build              = MO.FE3dBoundaryShape3d_build;
   o.dispose            = MO.FE3dBoundaryShape3d_dispose;
   return o;
}
MO.FE3dBoundaryShape3d_construct = function FE3dBoundaryShape3d_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._faceColor = new MO.SColor4(1, 1, 1, 1);
   o._color = new MO.SColor4(0.3, 0.3, 0.3);
   o._polygons = new MO.TObjects();
}
MO.FE3dBoundaryShape3d_pushPolygon = function FE3dBoundaryShape3d_pushPolygon(polygon){
   this._polygons.push(polygon);
}
MO.FE3dBoundaryShape3d_buildFace = function FE3dBoundaryShape3d_buildFace(){
   var o = this;
   var context = o._graphicContext;
   var faceColor = o._faceColor;
   var scaleTop = o._scaleTop;
   var scaleBottom = o._scaleBottom;
   var boundaries = o._polygons;
   var count = boundaries.count();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   var vertexSum = vertexTotal * 3;
   var vertexIndex = 0;
   var vertexData = new Float32Array(3 * vertexSum);
   var colorIndex = 0;
   var colors = new Uint8Array(4 * vertexSum);
   var coordIndex = 0;
   var coordData = new Float32Array(2 * vertexSum);
   var faceIndex = 0;
   var faceData = new Uint32Array(indexTotal + 3 * 2 * vertexTotal);
   var vertexStart = 0;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var cx = positions[positionIndex++];
         var cy = positions[positionIndex++];
         var x = cx * MO.Lang.Const.DEGREE_RATE;
         var y = cy * MO.Lang.Const.DEGREE_RATE;
         vertexData[vertexIndex++] = Math.sin(x) * Math.cos(y) * scaleTop;
         vertexData[vertexIndex++] = Math.sin(y) * scaleTop;
         vertexData[vertexIndex++] = -Math.cos(x) * Math.cos(y) * scaleTop;
         colors[colorIndex++] = 0xFF;
         colors[colorIndex++] = 0xFF;
         colors[colorIndex++] = 0xFF;
         colors[colorIndex++] = 0xFF;
         coordData[coordIndex++] = cx / 360 + 0.5;
         coordData[coordIndex++] = cy / 180 - 0.5;
      }
      var indexes = boundary.indexes();
      var indexCount = indexes.length;
      var faceCount = indexCount / 3;
      for(var i = 0; i < faceCount; i++){
         var facePosition = 3 * i;
         faceData[faceIndex++] = vertexStart + indexes[facePosition + 2];
         faceData[faceIndex++] = vertexStart + indexes[facePosition + 1];
         faceData[faceIndex++] = vertexStart + indexes[facePosition    ];
      }
      vertexStart += positionCount;
   }
   var layerUpStart = vertexStart;
   scaleTop *= 0.999;
   var vertexStart = 0;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var x = positions[positionIndex++] * MO.Lang.Const.DEGREE_RATE;
         var y = positions[positionIndex++] * MO.Lang.Const.DEGREE_RATE;
         vertexData[vertexIndex++] = Math.sin(x) * Math.cos(y) * scaleTop;
         vertexData[vertexIndex++] = Math.sin(y) * scaleTop;
         vertexData[vertexIndex++] = -Math.cos(x) * Math.cos(y) * scaleTop;
         colors[colorIndex++] = 0x22;
         colors[colorIndex++] = 0x66;
         colors[colorIndex++] = 0xFF;
         colors[colorIndex++] = 0xFF;
         coordData[coordIndex++] = 0;
         coordData[coordIndex++] = 0;
      }
      vertexStart += positionCount;
   }
   var layerDownStart = layerUpStart + vertexStart;
   var vertexStart = 0;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var x = positions[positionIndex++] * MO.Lang.Const.DEGREE_RATE;
         var y = positions[positionIndex++] * MO.Lang.Const.DEGREE_RATE;
         vertexData[vertexIndex++] = Math.sin(x) * Math.cos(y) * scaleBottom;
         vertexData[vertexIndex++] = Math.sin(y) * scaleBottom;
         vertexData[vertexIndex++] = -Math.cos(x) * Math.cos(y) * scaleBottom;
         colors[colorIndex++] = 0x00;
         colors[colorIndex++] = 0x00;
         colors[colorIndex++] = 0x00;
         colors[colorIndex++] = 0xFF;
         coordData[coordIndex++] = 0;
         coordData[coordIndex++] = 0;
      }
      vertexStart += positionCount;
   }
   var vertexStart = 0;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      for(var i = 0; i < positionCount; i++){
         if(i == positionCount - 1){
            faceData[faceIndex++] = layerUpStart   + vertexStart + i;
            faceData[faceIndex++] = layerUpStart   + vertexStart;
            faceData[faceIndex++] = layerDownStart + vertexStart + i;
            faceData[faceIndex++] = layerUpStart   + vertexStart;
            faceData[faceIndex++] = layerDownStart + vertexStart;
            faceData[faceIndex++] = layerDownStart + vertexStart + i;
         }else{
            faceData[faceIndex++] = layerUpStart   + vertexStart + i;
            faceData[faceIndex++] = layerUpStart   + vertexStart + i + 1;
            faceData[faceIndex++] = layerDownStart + vertexStart + i;
            faceData[faceIndex++] = layerUpStart   + vertexStart + i + 1;
            faceData[faceIndex++] = layerDownStart + vertexStart + i + 1;
            faceData[faceIndex++] = layerDownStart + vertexStart + i;
         }
      }
      vertexStart += positionCount;
   }
   var renderable = o._faceRenderable = MO.Class.create(MO.FE3dDataBox);
   renderable._name = 'face';
   renderable._shape = o;
   renderable.linkGraphicContext(context);
   renderable.setOptionColor(true);
   renderable.setOptionCoord(true);
   renderable.setVertexCount(vertexTotal * 3);
   renderable.setup();
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexSum, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexSum, true);
   renderable.vertexCoordBuffer().upload(coordData, 4 * 2, vertexSum, true);
   var indexBuffer = renderable.indexBuffer();
   indexBuffer.setStrideCd(MO.EG3dIndexStride.Uint32);
   indexBuffer.upload(faceData, faceIndex, true);
}
MO.FE3dBoundaryShape3d_buildBorder = function FE3dBoundaryShape3d_buildBorder(){
   var o = this;
   var context = o._graphicContext;
   var scaleTop = o._scaleTop * 1.0008;
   var scaleBottom = o._scaleBottom;
   var boundaries = o._polygons;
   var count = boundaries.count();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   var vertexStart = 0;
   var vertexIndex = 0;
   var faceIndex = 0;
   var vertexData = new Float32Array(3 * vertexTotal * 2);
   var colorIndex = 0;
   var colors = new Uint8Array(4 * vertexTotal * 2);
   var borderIndex = 0;
   var borderData = new Uint32Array(2 * vertexTotal + 2 * vertexTotal);
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var x = positions[positionIndex++] / 180 * Math.PI;
         var y = positions[positionIndex++] / 180 * Math.PI;
         vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * scaleTop;
         vertexData[vertexIndex++] = (Math.sin(y)) * scaleTop;
         vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * scaleTop;
      }
      for(var i = 0; i < positionCount; i++){
         borderData[borderIndex++] = vertexStart + i;
         if(i == positionCount - 1){
            borderData[borderIndex++] = vertexStart;
         }else{
            borderData[borderIndex++] = vertexStart + i + 1;
         }
      }
      vertexStart += positionCount;
   }
   var layerStart = vertexStart;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      var positions = boundary.positions();
      var positionIndex = 0;
      for(var i = 0; i < positionCount; i++){
         var x = positions[positionIndex++] / 180 * Math.PI;
         var y = positions[positionIndex++] / 180 * Math.PI;
         vertexData[vertexIndex++] = (Math.sin(x) * Math.cos(y)) * scaleBottom;
         vertexData[vertexIndex++] = (Math.sin(y)) * scaleBottom;
         vertexData[vertexIndex++] = (-Math.cos(x) * Math.cos(y)) * scaleBottom;
      }
      vertexStart += positionCount;
   }
   var vertexStart = 0;
   for(var n = 0; n < count; n++){
      var boundary = boundaries.at(n);
      var positionCount = boundary.positionCount();
      for(var i = 0; i < positionCount; i++){
         borderData[borderIndex++] = vertexStart + i;
         borderData[borderIndex++] = vertexStart + i + layerStart;
      }
      vertexStart += positionCount;
   }
   for(var i = 0; i < vertexTotal; i++){
      colors[colorIndex++] = 0x42;
      colors[colorIndex++] = 0x9A;
      colors[colorIndex++] = 0xF9;
      colors[colorIndex++] = 0xFF;
   }
   for(var i = 0; i < vertexTotal; i++){
      colors[colorIndex++] = 0x00;
      colors[colorIndex++] = 0x00;
      colors[colorIndex++] = 0x00;
      colors[colorIndex++] = 0xFF;
   }
   var renderable = o._borderRenderable = MO.Class.create(MO.FE3dDataBox);
   renderable._name = 'border';
   renderable._shape = o;
   renderable.linkGraphicContext(context);
   renderable.setup();
   renderable.setVertexCount(vertexTotal * 2);
   renderable.vertexPositionBuffer().upload(vertexData, 4 * 3, vertexTotal * 2, true);
   renderable.vertexColorBuffer().upload(colors, 1 * 4, vertexTotal * 2, true);
   var indexBuffer = renderable.indexBuffer();
   indexBuffer.setDrawModeCd(MO.EG3dDrawMode.Lines);
   indexBuffer.setStrideCd(MO.EG3dIndexStride.Uint32);
   indexBuffer.setLineWidth(1);
   indexBuffer.upload(borderData, borderIndex, true);
   renderable.material().info().effectCode = 'eai.map.face';
}
MO.FE3dBoundaryShape3d_build = function FE3dBoundaryShape3d_build(context){
   var o = this;
   var vertexTotal = 0;
   var indexTotal = 0;
   var boundaries = o._polygons;
   var count = boundaries.count();
   for(var i = 0; i < count; i++){
      var boundary = boundaries.at(i);
      vertexTotal += boundary.positionCount();
      indexTotal += boundary.indexes().length;
   }
   o._vertexTotal = vertexTotal;
   o._indexTotal = indexTotal;
   o.buildFace(context);
   o.buildBorder(context);
}
MO.FE3dBoundaryShape3d_dispose = function FE3dBoundaryShape3d_dispose(){
   var o = this;
   o._polygons = MO.Lang.Obejct.dispose(o._polygons);
   o.__base.FObject.dispose.call(o);
}
MO.FE3dBoundBox = function FE3dBoundBox(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._outline              = MO.Class.create(o, new MO.AGetter('_outline'));
   o._rate                 = 0.2;
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o.construct             = MO.FE3dBoundBox_construct;
   o.setup                 = MO.FE3dBoundBox_setup;
   o.upload                = MO.FE3dBoundBox_upload;
   return o;
}
MO.FE3dBoundBox_construct = function FE3dBoundBox_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._material = MO.Class.create(MO.FE3dMaterial);
   o._outline = new MO.SOutline3();
}
MO.FE3dBoundBox_setup = function FE3dBoundBox_setup(){
   var o = this;
   var c = o._graphicContext;
   var buffer = o._vertexPositionBuffer = c.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   o.pushVertexBuffer(buffer);
   var vertexData = new Uint8Array(4 * 32);
   for(var n = 4 * 32 - 1; n >= 0; n--){
      vertexData[n] = 0xFF;
   }
   var buffer = o._vertexColorBuffer = c.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   buffer.upload(vertexData, 1 * 4, 32);
   o.pushVertexBuffer(buffer);
   o._vertexCount = 32;
   var indexData = [
       0,  1,  0,  4,  0, 12,
       3,  2,  3,  5,  3, 13,
       8,  6,  8,  9,  8, 14,
      11,  7, 11, 10, 11, 15,
      20, 16, 20, 21, 20, 24,
      23, 17, 23, 22, 23, 25,
      28, 18, 28, 26, 28, 29,
      31, 19, 31, 27, 31, 30 ];
   var buffer = o._indexBuffer = c.createIndexBuffer();
   buffer.setDrawModeCd(MO.EG3dDrawMode.Lines);
   buffer.setLineWidth(1);
   buffer.upload(indexData, 48);
   o.pushIndexBuffer(buffer);
   o.update();
   var info = o.material().info();
   info.effectCode = 'control';
   info.ambientColor.set(1, 1, 1, 1);
}
MO.FE3dBoundBox_upload = function FE3dBoundBox_upload(){
   var o = this;
   var l = o._outline;
   var a = l.max;
   var ax = a.x;
   var ay = a.y;
   var az = a.z;
   var i = l.min;
   var ix = i.x;
   var iy = i.y;
   var iz = i.z;
   var r = o._rate;
   var cx = (ax - ix) * r;
   var cy = (ay - iy) * r;
   var cz = (az - iz) * r;
   var data = [
      ix,       ay,      iz,
      ix + cx,  ay,      iz,
      ax - cx,  ay,      iz,
      ax,       ay,      iz,
      ix,       ay - cy, iz,
      ax,       ay - cy, iz,
      ix,       iy + cy, iz,
      ax,       iy + cy, iz,
      ix,       iy,      iz,
      ix + cx,  iy,      iz,
      ax - cx,  iy,      iz,
      ax,       iy,      iz,
      ix,       ay,      iz + cz,
      ax,       ay,      iz + cz,
      ix,       iy,      iz + cz,
      ax,       iy,      iz + cz,
      ix,       ay,      az - cz,
      ax,       ay,      az - cz,
      ix,       iy,      az - cz,
      ax,       iy,      az - cz,
      ix,       ay,      az,
      ix + cx,  ay,      az,
      ax - cx,  ay,      az,
      ax,       ay,      az,
      ix,       ay - cy, az,
      ax,       ay - cy, az,
      ix,       iy + cy, az,
      ax,       iy + cy, az,
      ix,       iy,      az,
      ix + cx,  iy,      az,
      ax - cx,  iy,      az,
      ax,       iy,      az];
   o._vertexPositionBuffer.upload(data, 4 * 3, 32);
}
MO.FE3dCube = function FE3dCube(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o.vertexPositionBuffer = null;
   o.vertexColorBuffer    = null;
   o.indexBuffer          = null;
   o.setup                = MO.FE3dCube_setup;
   return o;
}
MO.FE3dCube_setup = function FE3dCube_setup(p){
   var o = this;
   var vp = [
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,
      -1.0, -1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0 ];
   var buffer = o.vertexPositionBuffer = p.createVertexBuffer();
   buffer.upload(vp, 4 * 3, 8);
   o.pushVertexBuffer(buffer);
   var vc = [
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      1.0, 0.0, 1.0, 1.0,
      0.0, 0.0, 1.0, 1.0 ];
   var buffer = o.vertexColorBuffer = p.createVertexBuffer();
   buffer.upload(vc, 4 * 4, 8);
   o.pushVertexBuffer(buffer);
   var id = [
      0, 1, 2, 0, 2, 3,
      1, 5, 6, 1, 6, 2,
      5, 4, 7, 5, 7, 6,
      4, 0, 3, 4, 3, 7,
      0, 4, 5, 0, 5, 1,
      3, 2, 6, 3, 6, 7  ];
   var buffer = context.createIndexBuffer();
   buffer.upload(id, 36);
   o.pushIndexBuffer(buffer);
   var mi = o.material().info();
   mi.effectCode = 'control';
   mi.ambientColor.set(1, 1, 1, 1);
}
MO.FE3dDataBox = function FE3dDataBox(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable, MO.ME3dDynamicRenderable);
   o._optionColor          = MO.Class.register(o, new MO.AGetSet('_optionColor'), true);
   o._optionCoord          = MO.Class.register(o, new MO.AGetSet('_optionCoord'), false);
   o._optionNormal         = MO.Class.register(o, new MO.AGetSet('_optionNormal'), false);
   o._vertexPositionBuffer = MO.Class.register(o, new MO.AGetter('_vertexPositionBuffer'));
   o._vertexColorBuffer    = MO.Class.register(o, new MO.AGetter('_vertexColorBuffer'));
   o._vertexCoordBuffer    = MO.Class.register(o, new MO.AGetter('_vertexCoordBuffer'));
   o._vertexNormalBuffer   = MO.Class.register(o, new MO.AGetter('_vertexNormalBuffer'));
   o._indexBuffer          = MO.Class.register(o, new MO.AGetter('_indexBuffer'));
   o.construct             = MO.FE3dDataBox_construct;
   o.setup                 = MO.FE3dDataBox_setup;
   o.calculateOutline      = MO.FE3dDataBox_calculateOutline;
   o.dispose               = MO.FE3dDataBox_dispose;
   return o;
}
MO.FE3dDataBox_construct = function FE3dDataBox_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o.__base.ME3dDynamicRenderable.construct.call(o);
   o._material = MO.Class.create(MO.FE3dMaterial);
}
MO.FE3dDataBox_setup = function FE3dDataBox_setup(vd, vc, id){
   var o = this;
   var c = o._graphicContext;
   var buffer = o._vertexPositionBuffer = c.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   o.pushVertexBuffer(buffer);
   if(o._optionColor){
      var buffer = o._vertexColorBuffer = c.createVertexBuffer();
      buffer.setCode('color');
      buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
      o.pushVertexBuffer(buffer);
   }
   if(o._optionCoord){
      var buffer = o._vertexCoordBuffer = c.createVertexBuffer();
      buffer.setCode('coord');
      buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
      o.pushVertexBuffer(buffer);
   }
   if(o._optionNormal){
      var buffer = o._vertexNormalBuffer = c.createVertexBuffer();
      buffer.setCode('normal');
      buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
      o.pushVertexBuffer(buffer);
   }
   var buffer = o._indexBuffer = c.createIndexBuffer();
   o.pushIndexBuffer(buffer);
   var info = o.material().info();
   info.effectCode = 'control';
   info.ambientColor.set(1, 1, 1, 1);
}
MO.FE3dDataBox_calculateOutline = function FE3dDataBox_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      outline.setMin();
      var vertexCount = o._vertexCount;
      var data = o._vertexPositionBuffer._data;
      var index = 0;
      for(var i = 0; i < vertexCount; i++){
         var x = data[index++];
         var y = data[index++];
         var z = data[index++];
         outline.mergePoint(x, y, z);
      }
      outline.update();
   }
   return outline;
}
MO.FE3dDataBox_dispose = function FE3dDataBox_dispose(){
   var o = this;
   o._material = MO.Class.create(MO.FE3dMaterial);
   o.__base.ME3dDynamicRenderable.dispose.call(o);
   o.__base.FE3dRenderable.dispose.call(o);
}
MO.FE3dDimensional = function FE3dDimensional(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._cellSize             = null;
   o._size                 = null;
   o._lineColor            = null;
   o._lineCenterColor      = null;
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o.construct             = MO.FE3dDimensional_construct;
   o.setup                 = MO.FE3dDimensional_setup;
   return o;
}
MO.FE3dDimensional_construct = function FE3dDimensional_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._material = MO.Class.create(MO.FE3dMaterial);
   o._cellSize = new MO.SSize2();
   o._cellSize.set(1, 1);
   o._size = new MO.SSize2();
   o._size.set(16, 16);
}
MO.FE3dDimensional_setup = function FE3dDimensional_setup(){
   var o = this;
   var context = o._graphicContext;
   var cw = o._cellSize.width;
   var ch = o._cellSize.height;
   var sw = o._size.width;
   var sw2 = sw / 2;
   var sh = o._size.height;
   var sh2 = sh / 2;
   var vc = 2 * ((sw + 2) + (sh + 2));
   var v = 0;
   var vi = 0;
   var vd = new Float32Array(3 * vc);
   var vci = 0;
   var vcd = new Uint8Array(4 * vc);
   var i = 0;
   var it = vc;
   var id = new Uint16Array(it);
   for(var y = 0; y <= sh; y++){
      var r = 1;
      if(y - sh2 == 0){
         r = 0
      }
      vd[v++] = cw * -sw2 * r;
      vd[v++] = 0;
      vd[v++] = ch * (y - sh2);
      vd[v++] = cw * sw2 * r;
      vd[v++] = 0;
      vd[v++] = ch * (y - sh2);
      for(var ci = 0; ci < 8; ci++){
         vcd[vci++] = 255;
      }
      id[i++] = vi++;
      id[i++] = vi++;
   }
   vd[v++] = cw * -sw2;
   vd[v++] = 0;
   vd[v++] = 0;
   vd[v++] = cw * sw2;
   vd[v++] = 0;
   vd[v++] = 0;
   for(var ci = 0; ci < 2; ci++){
      vcd[vci++] = 255;
      vcd[vci++] = 0;
      vcd[vci++] = 0;
      vcd[vci++] = 255;
   }
   id[i++] = vi++;
   id[i++] = vi++;
   for(var x = 0; x <= sw; x++){
      var r = 1;
      if(x - sw2 == 0){
         r = 0
      }
      vd[v++] = cw * (x - sw2);
      vd[v++] = 0;
      vd[v++] = ch * - sh2 * r;
      vd[v++] = cw * (x - sw2);
      vd[v++] = 0;
      vd[v++] = ch * sh2 * r;
      for(var ci = 0; ci < 8; ci++){
         vcd[vci++] = 255;
      }
      id[i++] = vi++;
      id[i++] = vi++;
   }
   vd[v++] = 0;
   vd[v++] = 0;
   vd[v++] = ch * -sh2;
   vd[v++] = 0;
   vd[v++] = 0;
   vd[v++] = ch * sh2;
   for(var ci = 0; ci < 2; ci++){
      vcd[vci++] = 255;
      vcd[vci++] = 0;
      vcd[vci++] = 0;
      vcd[vci++] = 255;
   }
   id[i++] = vi++;
   id[i++] = vi++;
   o._vertexCount = vc;
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(vd, 4 * 3, vc);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   buffer.upload(vcd, 4, vc);
   o.pushVertexBuffer(buffer);
   var buffer = context.createIndexBuffer();
   buffer.setDrawModeCd(MO.EG3dDrawMode.Lines);
   buffer.upload(id, it);
   o.pushIndexBuffer(buffer);
   var materialInfo = o.material().info();
   materialInfo.effectCode = 'control';
   materialInfo.ambientColor.set(1, 1, 1, 1);
}
MO.FE3dDynamicMesh = function FE3dDynamicMesh(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._shape              = MO.Class.register(o, new MO.AGetSet('_shape'));
   o._optionMerge        = true;
   o._vertexPosition     = 0;
   o._vertexTotal        = 0;
   o._indexPosition      = 0;
   o._indexTotal         = 0;
   o._mergeRenderables   = MO.Class.register(o, new MO.AGetter('_mergeRenderables'));
   o.construct           = MO.FE3dDynamicMesh_construct;
   o.mergeCount          = MO.FE3dDynamicMesh_mergeCount;
   o.mergeMaxCount       = MO.FE3dDynamicMesh_mergeMaxCount;
   o.mergeStride         = MO.FE3dDynamicMesh_mergeStride;
   o.findMergeRenderable = MO.FE3dDynamicMesh_findMergeRenderable;
   o.calculateOutline    = MO.FE3dDynamicMesh_calculateOutline;
   o.syncVertexBuffer    = MO.FE3dDynamicMesh_syncVertexBuffer;
   o.mergeRenderable     = MO.FE3dDynamicMesh_mergeRenderable;
   o.mergeVertexBuffer   = MO.FE3dDynamicMesh_mergeVertexBuffer;
   o.mergeIndexBuffer    = MO.FE3dDynamicMesh_mergeIndexBuffer;
   o.build               = MO.FE3dDynamicMesh_build;
   o.dispose             = MO.FE3dDynamicMesh_dispose;
   return o;
}
MO.FE3dDynamicMesh_construct = function FE3dDynamicMesh_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._mergeRenderables = new MO.TObjects();
}
MO.FE3dDynamicMesh_mergeCount = function FE3dDynamicMesh_mergeCount(){
   return this._mergeRenderables.count();
}
MO.FE3dDynamicMesh_mergeMaxCount = function FE3dDynamicMesh_mergeMaxCount(){
   return this._shape.mergeMaxCount();
}
MO.FE3dDynamicMesh_mergeStride = function FE3dDynamicMesh_mergeStride(){
   return this._shape.mergeStride();
}
MO.FE3dDynamicMesh_findMergeRenderable = function FE3dDynamicMesh_findMergeRenderable(index){
   return this._mergeRenderables.get(index);
}
MO.FE3dDynamicMesh_syncVertexBuffer = function FE3dDynamicMesh_syncVertexBuffer(vertexBuffer){
   var o = this;
   var code = vertexBuffer.code();
   var buffer = o._vertexBuffers.get(code);
   if(!buffer){
      var formatCd = vertexBuffer.formatCd();
      var vertexTotal = o._vertexTotal;
      buffer = o._graphicContext.createVertexBuffer();
      buffer.setCode(code);
      buffer.setFormatCd(formatCd);
      buffer.setStride(vertexBuffer.stride());
      var bufferData = null;
      switch(formatCd){
         case MO.EG3dAttributeFormat.Float1:
            bufferData = new Float32Array(1 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float2:
            bufferData = new Float32Array(2 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float3:
            bufferData = new Float32Array(3 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Float4:
            bufferData = new Float32Array(4 * vertexTotal);
            break;
         case MO.EG3dAttributeFormat.Byte4:
         case MO.EG3dAttributeFormat.Byte4Normal:
            bufferData = new Uint8Array(4 * vertexTotal);
            break;
         default:
            throw new MO.TError("Unknown code");
      }
      buffer.setData(bufferData);
      o.pushVertexBuffer(buffer);
   }
   return buffer;
}
MO.FE3dDynamicMesh_mergeRenderable = function FE3dDynamicMesh_mergeRenderable(renderable){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var vertexCount = renderable.vertexCount();
   var indexBuffer = renderable.indexBuffers().first();
   var indexCount = indexBuffer.count();
   var mergeCount = capability.mergeCount;
   if(o._mergeRenderables.count() >= mergeCount){
      return false;
   }
   var vertexLimit = o._vertexTotal + vertexCount;
   if(capability.optionIndex32){
      if(vertexLimit > MO.Lang.Integer.MAX_UINT32){
         return false;
      }
   }else{
      if(vertexLimit > MO.Lang.Integer.MAX_UINT16){
         return false;
      }
   }
   o._vertexTotal += vertexCount;
   o._indexTotal += indexCount;
   o._mergeRenderables.push(renderable);
   return true;
}
MO.FE3dDynamicMesh_mergeVertexBuffer = function FE3dDynamicMesh_mergeVertexBuffer(vertexBuffer){
   var o = this;
   var position = o._vertexPosition;
   var count = vertexBuffer.count();
   var formatCd = vertexBuffer.formatCd();
   var stride = vertexBuffer.stride();
   var data = vertexBuffer.data();
   var mergeVertexBuffer = o.syncVertexBuffer(vertexBuffer);
   var mergeData = mergeVertexBuffer.data();
   switch(formatCd){
      case MO.EG3dAttributeFormat.Float1:
      case MO.EG3dAttributeFormat.Float2:
      case MO.EG3dAttributeFormat.Float3:
      case MO.EG3dAttributeFormat.Float4:
         MO.Lang.Float.copy(mergeData, (stride / 4) * position, data, 0, (stride / 4) * count);
         break;
      case MO.EG3dAttributeFormat.Byte4:
      case MO.EG3dAttributeFormat.Byte4Normal:
         MO.Lang.Byte.copy(mergeData, stride * position, data, 0, stride * count);
         break;
      default:
         throw new MO.TError("Unknown code");
   }
}
MO.FE3dDynamicMesh_mergeIndexBuffer = function FE3dDynamicMesh_mergeIndexBuffer(indexBuffer){
   var o = this;
   var vertexPosition = o._vertexPosition;
   var indexPosition = o._indexPosition;
   var drawModeCd = indexBuffer.drawModeCd();
   var data = indexBuffer.data();
   var mergeData = o._indexBuffer.data();
   var renderableCount = indexBuffer.count();
   for(var i = 0; i < renderableCount; i++){
      mergeData[indexPosition++] = vertexPosition + data[i]
   }
   o._indexBuffer.setDrawModeCd(drawModeCd);
}
MO.FE3dDynamicMesh_build = function FE3dDynamicMesh_build(){
   var o = this;
   var context = o._graphicContext;
   var capability = context.capability();
   var vertexTotal = o._vertexTotal;
   var indexTotal = o._indexTotal;
   var renderables = o._mergeRenderables;
   var renderableCount = renderables.count();
   var renderable = renderables.first();
   o._material = renderable.material();
   o._textures = renderable.textures();
   var instanceVertexData = new Float32Array(vertexTotal);
   var instanceVertexBuffer = o._instanceVertexBuffer = context.createVertexBuffer();
   instanceVertexBuffer.setCode('instance');
   instanceVertexBuffer.setStride(4);
   instanceVertexBuffer.setFormatCd(MO.EG3dAttributeFormat.Float1);
   instanceVertexBuffer.setData(instanceVertexData);
   o.pushVertexBuffer(instanceVertexBuffer);
   var indexVertexData = new Float32Array(4 * vertexTotal);
   var indexVertexBuffer = o._indexVertexBuffer = context.createVertexBuffer();
   indexVertexBuffer.setCode('index');
   indexVertexBuffer.setStride(16);
   indexVertexBuffer.setFormatCd(MO.EG3dAttributeFormat.Float4);
   indexVertexBuffer.setData(indexVertexData);
   o.pushVertexBuffer(indexVertexBuffer);
   var indexBuffer = o._indexBuffer = context.createIndexBuffer(MO.FE3rIndexBuffer);
   if(capability.optionIndex32){
      indexBuffer.setStrideCd(MO.EG3dIndexStride.Uint32);
      indexBuffer.setData(new Uint32Array(indexTotal));
   }else{
      indexBuffer.setStrideCd(MO.EG3dIndexStride.Uint16);
      indexBuffer.setData(new Uint16Array(indexTotal));
   }
   indexBuffer.setCount(indexTotal);
   o.pushIndexBuffer(indexBuffer);
   var indexVertexPosition = 0;
   for(var n = 0; n < renderableCount; n++){
      var renderable = renderables.at(n);
      var renderableVertexCount = renderable.vertexCount();
      MO.Lang.Float.fill(instanceVertexData, o._vertexPosition, renderableVertexCount, n);
      var index = n + 1;
      var index1 = (index  & 0xFF) / 255;
      var index2 = ((index >> 8) & 0xFF) / 255;
      var index3 = ((index >> 16) & 0xFF) / 255;
      for(var i = 0; i < renderableVertexCount; i++){
         indexVertexData[indexVertexPosition++] = index1;
         indexVertexData[indexVertexPosition++] = index2;
         indexVertexData[indexVertexPosition++] = index3;
         indexVertexData[indexVertexPosition++] = 1;
      }
      var vertexBuffers = renderable.vertexBuffers();
      var vertexBufferCount = vertexBuffers.count();
      for(var i = 0; i < vertexBufferCount; i++){
         var vertexBuffer = vertexBuffers.at(i);
         o.mergeVertexBuffer(vertexBuffer);
      }
      var renderableIndexBuffer = renderable.indexBuffers().first();
      var renderableIndexCount = renderableIndexBuffer.count();
      o.mergeIndexBuffer(renderableIndexBuffer);
      o._vertexPosition += renderableVertexCount;
      o._indexPosition += renderableIndexCount;
   }
   var vertexBuffers = o._vertexBuffers;
   var vertexBufferCount = vertexBuffers.count();
   for(var i = 0; i < vertexBufferCount; i++){
      var vertexBuffer = vertexBuffers.at(i);
      var vertexData = vertexBuffer.data();
      var vertexStride = vertexBuffer.stride();
      vertexBuffer.upload(vertexData, vertexStride, vertexTotal);
      vertexBuffer.setData(null);
   }
   var indexData = indexBuffer.data();
   indexBuffer.upload(indexData, indexTotal);
   indexBuffer.setData(null);
}
MO.FE3dDynamicMesh_calculateOutline = function FE3dDynamicMesh_calculateOutline(){
   var o = this;
   var outline = o._outline;
   if(outline.isEmpty()){
      outline.setMin();
      var renderables = o._mergeRenderables;
      if(renderables){
         var count = renderables.count();
         for(var i = 0; i < count; i++){
            var renderable = renderables.at(i);
            var renderableOutline = renderable.calculateOutline()
            outline.mergeMax(renderableOutline);
         }
      }
   }
   return outline;
}
MO.FE3dDynamicMesh_dispose = function FE3dDynamicMesh_dispose(){
   var o = this;
   o._mergeRenderables = MO.Lang.Object.dispose(o._mergeRenderables);
   o.__base.FE3dRenderable.dispose.call(o);
}
MO.FE3dDynamicShape = function FE3dDynamicShape(o){
   o = MO.Class.inherits(this, o, MO.FE3dDisplay);
   o._mergeMaxCount      = MO.Class.register(o, new MO.AGetter('_mergeMaxCount'));
   o._mergeStride        = MO.Class.register(o, new MO.AGetter('_mergeStride'), 4);
   o._sourceRenderables  = MO.Class.register(o, new MO.AGetter('_sourceRenderables'));
   o._meshes             = MO.Class.register(o, new MO.AGetter('_meshes'));
   o.construct           = MO.FE3dDynamicShape_construct;
   o.createMesh          = MO.FE3dDynamicShape_createMesh;
   o.pushMergeRenderable = MO.FE3dDynamicShape_pushMergeRenderable;
   o.build               = MO.FE3dDynamicShape_build;
   o.dispose             = MO.FE3dDynamicShape_dispose;
   return o;
}
MO.FE3dDynamicShape_construct = function FE3dDynamicShape_construct(){
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   o._sourceRenderables = new MO.TObjects();
   o._meshes = new MO.TObjects();
   o._material = MO.Class.create(MO.FE3dMaterial);
}
MO.FE3dDynamicShape_createMesh = function FE3dDynamicShape_createMesh(){
   var o = this;
   var mesh = MO.Class.create(MO.FE3dDynamicMesh);
   mesh._shape = o;
   mesh.linkGraphicContext(o);
   mesh.setShape(o);
   o._meshes.push(mesh);
   o.pushRenderable(mesh);
   return mesh;
}
MO.FE3dDynamicShape_pushMergeRenderable = function FE3dDynamicShape_pushMergeRenderable(renderable){
   this._sourceRenderables.push(renderable);
}
MO.FE3dDynamicShape_build = function FE3dDynamicShape_build(){
   var o = this;
   var renderables = o._sourceRenderables;
   var meshes = o.renderables();
   var count = renderables.count();
   if(count > 0){
      var mesh = o.createMesh();
      for(var i = 0; i < count; i++){
         var renderable = renderables.at(i);
         if(!mesh.mergeRenderable(renderable)){
            mesh = o.createMesh();
            if(!mesh.mergeRenderable(renderable)){
               throw new MO.TError(o, 'Merge renderable failure.');
            }
         }
      }
   }
   var mergeMax = 0;
   var count = meshes.count();
   for(var i = 0; i < count; i++){
      var mesh = meshes.at(i);
      mesh.build();
      mergeMax = Math.max(mergeMax, mesh.mergeCount());
   }
   o._mergeMaxCount = mergeMax;
}
MO.FE3dDynamicShape_dispose = function FE3dDynamicShape_dispose(){
   var o = this;
   o._sourceRenderables = MO.Lang.Object.dispose(o._sourceRenderables);
   o._meshes = MO.Lang.Object.dispose(o._meshes);
   o.__base.FE3dDisplay.dispose.call(o);
}
MO.FE3dFace = function FE3dFace(o){
   o = MO.Class.inherits(this, o, MO.FE3dMeshRenderable, MO.MListener);
   o._ready           = false;
   o._size            = MO.Class.register(o, new MO.AGetter('_size'));
   o._loadListeners   = MO.Class.register(o, new MO.AListener('_loadListeners', MO.EEvent.Load));
   o._statusDirty     = true;
   o.construct        = MO.FE3dFace_construct;
   o.setSize          = MO.FE3dFace_setSize;
   o.setData          = MO.FE3dFace_setData;
   o.findVertexBuffer = MO.FE3dFace_findVertexBuffer;
   o.vertexBuffers    = MO.FE3dFace_vertexBuffers;
   o.findTexture      = MO.FE3dFace_findTexture;
   o.textures         = MO.FE3dFace_textures;
   o.material         = MO.FE3dFace_material;
   o.dirty            = MO.FE3dFace_dirty;
   o.processLoad      = MO.FE3dFace_processLoad;
   o.process          = MO.FE3dFace_process;
   o.dispose          = MO.FE3dFace_dispose;
   return o;
}
MO.FE3dFace_construct = function FE3dFace_construct(){
   var o = this;
   o.__base.FE3dMeshRenderable.construct.call(o);
   o._size = new MO.SSize2();
}
MO.FE3dFace_setSize = function FE3dFace_setSize(width, height){
   var o = this;
   o._size.set(width, height);
   o._matrix.setScale(width, height, 1);
}
MO.FE3dFace_setData = function FE3dFace_setData(data){
   var o = this;
   o._renderable = data;
}
MO.FE3dFace_findVertexBuffer = function FE3dFace_findVertexBuffer(p){
   return this._renderable.findVertexBuffer(p);
}
MO.FE3dFace_vertexBuffers = function FE3dFace_vertexBuffers(){
   return this._renderable.vertexBuffers();
}
MO.FE3dFace_findTexture = function FE3dFace_findTexture(p){
   return this._renderable.findTexture(p);
}
MO.FE3dFace_textures = function FE3dFace_textures(){
   return this._renderable.textures();
}
MO.FE3dFace_material = function FE3dFace_material(){
   return this._renderable.material();
}
MO.FE3dFace_dirty = function FE3dFace_dirty(){
   this._statusDirty = true;
}
MO.FE3dFace_processLoad = function FE3dFace_processLoad(){
   var o = this;
   return true;
}
MO.FE3dFace_process = function FE3dFace_process(){
   var o = this;
   o.__base.FE3dMeshRenderable.process.call(o);
}
MO.FE3dFace_dispose = function FE3dFace_dispose(){
   var o = this;
   o._material = RObject.dispoe(o._material);
   o.__base.FE3dMeshRenderable.dispose.call(o);
}
MO.FE3dFaceData = function FE3dFaceData(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._ready                = false;
   o._optionCenter         = MO.Class.register(o, new MO.AGetSet('_optionCenter'), false);
   o._size                 = MO.Class.register(o, new MO.AGetter('_size'));
   o._adjustSize           = MO.Class.register(o, new MO.AGetter('_adjustSize'));
   o._vertexPositionBuffer = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = null;
   o._texture              = null;
   o.construct             = MO.FE3dFaceData_construct;
   o.testReady             = MO.FE3dFaceData_testReady;
   o.setup                 = MO.FE3dFaceData_setup;
   o.dispose               = MO.FE3dFaceData_dispose;
   return o;
}
MO.FE3dFaceData_construct = function FE3dFaceData_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._size = new MO.SSize2();
   o._adjustSize = new MO.SSize2();
   o._material = MO.Class.create(MO.FE3dMaterial);
}
MO.FE3dFaceData_testReady = function FE3dFaceData_testReady(){
   return this._ready;
}
MO.FE3dFaceData_setup = function FE3dFaceData_setup(){
   var o = this;
   var context = o._graphicContext;
   o._vertexCount = 4;
   var data = null;
   if(o._optionCenter){
      data = [-1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0];
   }else{
      data = [0, 0, 0, 1, 0, 0, 1, -1, 0, 0, -1, 0];
   }
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(data, 4 * 3, 4);
   var stream = MO.Class.create(MO.FE3sStream);
   stream.setCode('position');
   stream.setDataCount(4);
   stream.setData(data);
   buffer._resource = stream;
   o.pushVertexBuffer(buffer);
   var data = [0, 1, 1, 1, 1, 0, 0, 0];
   var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   buffer.upload(data, 4 * 2, 4);
   var stream = MO.Class.create(MO.FE3sStream);
   stream.setCode('coord');
   stream.setDataCount(4);
   stream.setData(data);
   buffer._resource = stream;
   o.pushVertexBuffer(buffer);
   var data = [0, 1, 2, 0, 2, 3];
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.upload(data, 6);
   var stream = MO.Class.create(MO.FE3sStream);
   stream.setCode('index16');
   stream.setDataCount(2);
   stream.setData(data);
   buffer._resource = stream;
   o.pushIndexBuffer(buffer);
   var texture = o._texture = context.createFlatTexture();
   texture.setOptionFlipY(true);
   texture.setWrapCd(MO.EG3dSamplerFilter.ClampToEdge, MO.EG3dSamplerFilter.ClampToEdge);
   o.pushTexture(texture, 'diffuse');
   o._material.info().optionDouble = true;
   o._material._textures = o._textures;
}
MO.FE3dFaceData_dispose = function FE3dFaceData_dispose(){
   var o = this;
   o._size = MO.Lang.Object.dispose(o._size);
   o._adjustSize = MO.Lang.Object.dispose(o._adjustSize);
   o._texture = MO.Lang.Object.dispose(o._texture);
   o._vertexPositionBuffer = MO.Lang.Object.dispose(o._vertexPositionBuffer);
   o._vertexCoordBuffer = MO.Lang.Object.dispose(o._vertexCoordBuffer);
   o._indexBuffer = MO.Lang.Object.dispose(o._indexBuffer);
   o.__base.FE3dRenderable.dispose.call(o);
}
MO.FE3dLines = function FE3dLines(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._count                = MO.Class.register(o, new MO.AGetter('_count'));
   o._positionsData        = MO.Class.register(o, new MO.AGetter('_positionsData'));
   o._colorsData           = MO.Class.register(o, new MO.AGetter('_colorsData'));
   o._vertexPositionBuffer = MO.Class.register(o, new MO.AGetter('_vertexPositionBuffer'));
   o._vertexColorBuffer    = MO.Class.register(o, new MO.AGetter('_vertexColorBuffer'));
   o._indexBuffer          = MO.Class.register(o, new MO.AGetter('_indexBuffer'));
   o.construct             = MO.FE3dLines_construct;
   o.setCount              = MO.FE3dLines_setCount;
   o.setup                 = MO.FE3dLines_setup;
   o.upload                = MO.FE3dLines_upload;
   o.dispose               = MO.FE3dLines_dispose;
   return o;
}
MO.FE3dLines_construct = function FE3dLines_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._material = MO.Class.create(MO.FE3dMaterial);
}
MO.FE3dLines_setCount = function FE3dLines_setCount(count){
   var o = this;
   var count = o._count;
   o._positionsData = new Float32Array(3 * 2 * count);
   o._colorsData = new Uint8Array(4 * 2 * count);
}
MO.FE3dLines_setup = function FE3dLines_setup(){
   var o = this;
   var context = o._graphicContext;
   var count = o._count;
   var vertexCount = o._vertexCount = 2 * count;
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   o.pushVertexBuffer(buffer);
   var indexData = new Uint16Array(vertexCount);
   for(var i = 0; i < vertexCount; i++){
      indexData[vertexCount] = vertexCount;
   }
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.setDrawModeCd(MO.EG3dDrawMode.Lines);
   buffer.upload(indexData, vertexCount);
   o.pushIndexBuffer(buffer);
}
MO.FE3dLines_upload = function FE3dLines_upload(){
   var o = this;
   var vertexCount = o._vertexCount;
   o._vertexPositionBuffer.upload(o._positionsData, 4 * 3, vertexCount);
   o._vertexColorBuffer.upload(o._colorsData, 4 * 1, vertexCount);
}
MO.FE3dLines_dispose = function FE3dLines_dispose(){
   var o = this;
   o._positionsData = null;
   o._colorsData = null;
   o._material = MO.Lang.Object.dispose(o._material);
   o.__base.FE3dRenderable.dispose.call(o);
}
MO.FE3dPolygon = function FE3dPolygon(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   return o;
}
MO.FE3dRectangle = function FE3dRectangle(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o._indexBuffer          = MO.Class.register(o, new MO.AGetter('_indexBuffer'));
   o.construct             = MO.FE3dRectangle_construct;
   o.setup                 = MO.FE3dRectangle_setup;
   return o;
}
MO.FE3dRectangle_construct = function FE3dRectangle_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._material = MO.Class.create(MO.FE3dMaterial);
}
MO.FE3dRectangle_setup = function FE3dRectangle_setup(){
   var o = this;
   var context = o._graphicContext;
   var vertexPositionData = [-1, 1, 0, 0.5, 0.5, 0, 0.5, -0.5, 0, -0.5, -0.5, 0];
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(vertexPositionData, 4 * 2, 4);
   o.pushVertexBuffer(buffer);
   var vertexCoordData = [0, 1, 1, 1, 1, 0, 0, 0];
   var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   buffer.upload(vertexCoordData, 4 * 2, 4);
   o.pushVertexBuffer(buffer);
   var indexData = [0, 1, 2, 0, 2, 3];
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.upload(indexData, 6);
   o.pushIndexBuffer(buffer);
   o._textures = new MO.TDictionary();
   o._material.info().optionDouble = true;
}
MO.FE3dRectangleArea = function FE3dRectangleArea(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._coordFlip            = MO.Class.register(o, new MO.AGetSet('_coordFlip'), false);
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o._indexBuffer          = MO.Class.register(o, new MO.AGetter('_indexBuffer'));
   o.construct             = MO.FE3dRectangleArea_construct;
   o.setup                 = MO.FE3dRectangleArea_setup;
   return o;
}
MO.FE3dRectangleArea_construct = function FE3dRectangleArea_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._material = MO.Class.create(MO.FE3dMaterial);
}
MO.FE3dRectangleArea_setup = function FE3dRectangleArea_setup(){
   var o = this;
   var context = o._graphicContext;
   var vertexPositionData = [-1, 1, 1, 1, 1, -1, -1, -1];
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   buffer.upload(vertexPositionData, 4 * 2, 4);
   o.pushVertexBuffer(buffer);
   var vertexCoordData = null;
   if(o._coordFlip){
      vertexCoordData = [0, 1, 1, 1, 1, 0, 0, 0];
   }else{
      vertexCoordData = [0, 1, 1, 1, 1, 0, 0, 0];
   }
   var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   buffer.upload(vertexCoordData, 4 * 2, 4);
   o.pushVertexBuffer(buffer);
   var indexData = [0, 1, 2, 0, 2, 3];
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.upload(indexData, 6);
   o.pushIndexBuffer(buffer);
   o._material.info().optionDouble = true;
}
MO.FE3dRuler = function FE3dRuler(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._style                = MO.Class.register(o, new MO.AGetter('_style'));
   o._beginPoint           = MO.Class.register(o, new MO.AGetter('_beginPoint'));
   o._endPoint             = MO.Class.register(o, new MO.AGetter('_endPoint'));
   o._direction            = MO.Class.register(o, new MO.AGetter('_direction'));
   o._directionLine        = null;
   o._vertexPositionBuffer = null;
   o._vertexColorBuffer    = null;
   o._vertexPositionData   = null;
   o._vertexColorData      = null;
   o._indexData            = null;
   o.construct             = MO.FE3dRuler_construct;
   o.setup                 = MO.FE3dRuler_setup;
   o.upload                = MO.FE3dRuler_upload;
   return o;
}
MO.FE3dRuler_construct = function FE3dRuler_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._material = MO.Class.create(MO.FE3dMaterial);
   o._style = new MO.SE3dRulerStyle();
   o._beginPoint = new MO.SPoint3(0, 0, 0);
   o._endPoint = new MO.SPoint3(0, 10, 0);
   o._direction = new MO.SVector3(1, 0, 0);
   o._directionLine = new MO.SVector3();
   o._vertexPositionData = new MO.TArray();
   o._vertexColorData = new MO.TArray();
   o._indexData = new MO.TArray();
}
MO.FE3dRuler_setup = function FE3dRuler_setup(){
   var o = this;
   var context = o._graphicContext;
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexColorBuffer = context.createVertexBuffer();
   buffer.setCode('color');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Byte4Normal);
   o.pushVertexBuffer(buffer);
   var indexBuffer = o._indexBuffer = context.createIndexBuffer();
   indexBuffer.setFillModeCd(MO.EG3dFillMode.Line);
   indexBuffer.setLineWidth(1);
   o.pushIndexBuffer(indexBuffer);
   o.upload();
   o.update();
   var info = o.material().info();
   info.effectCode = 'control';
   info.ambientColor.set(1, 1, 1, 1);
}
MO.FE3dRuler_upload = function FE3dRuler_upload(){
   var o = this;
   var vertexCount = 0;
   var style = o._style;
   var positions = o._vertexPositionData;
   positions.clear();
   var colors = o._vertexColorData;
   colors.clear();
   var indexs = o._indexData;
   indexs.clear();
   var beginPoint = o._beginPoint;
   var endPoint = o._endPoint;
   positions.push(beginPoint.x, beginPoint.y, beginPoint.z);
   colors.push(255, 255, 255, 255);
   vertexCount++;
   positions.push(endPoint.x, endPoint.y, endPoint.z);
   colors.push(255, 255, 255, 255);
   vertexCount++;
   indexs.push(0, 1);
   var bothLength = style.bothLength;
   var bothColor = style.bothColor;
   var direction = o._direction;
   var tickBeginPoint = new SPoint3();
   var tickEndPoint = new SPoint3();
   positions.push(beginPoint.x, beginPoint.y, beginPoint.z);
   colors.push(bothColor.red, bothColor.green, bothColor.blue, bothColor.alpha);
   tickEndPoint.x = direction.x * bothLength + beginPoint.x;
   tickEndPoint.y = direction.y * bothLength + beginPoint.y;
   tickEndPoint.z = direction.z * bothLength + beginPoint.z;
   positions.push(tickEndPoint.x, tickEndPoint.y, tickEndPoint.z);
   colors.push(bothColor.red, bothColor.green, bothColor.blue, bothColor.alpha);
   indexs.push(vertexCount, vertexCount + 1);
   vertexCount += 2;
   positions.push(endPoint.x, endPoint.y, endPoint.z);
   colors.push(bothColor.red, bothColor.green, bothColor.blue, bothColor.alpha);
   tickEndPoint.x = direction.x * bothLength + endPoint.x;
   tickEndPoint.y = direction.y * bothLength + endPoint.y;
   tickEndPoint.z = direction.z * bothLength + endPoint.z;
   positions.push(tickEndPoint.x, tickEndPoint.y, tickEndPoint.z);
   colors.push(bothColor.red, bothColor.green, bothColor.blue, bothColor.alpha);
   indexs.push(vertexCount, vertexCount + 1);
   vertexCount += 2;
   var lineDirection = o._directionLine.direction(beginPoint, o._endPoint);
   var length = lineDirection.length();
   lineDirection.normalize();
   var precisions = style.precisions;
   var count = precisions.count();
   for(var n = 0; n < count; n++){
      var precision = precisions.at(n);
      var tickInterval = precision.interval;
      var tickLength = precision.length;
      var tickColor = precision.color;
      for(var i = tickInterval; i < length; i += tickInterval){
         tickBeginPoint.x = lineDirection.x * i + beginPoint.x;
         tickBeginPoint.y = lineDirection.y * i + beginPoint.y;
         tickBeginPoint.z = lineDirection.z * i + beginPoint.z;
         positions.push(tickBeginPoint.x, tickBeginPoint.y, tickBeginPoint.z);
         colors.push(tickColor.red, tickColor.green, tickColor.blue, tickColor.alpha);
         tickEndPoint.x = direction.x * tickLength + tickBeginPoint.x;
         tickEndPoint.y = direction.y * tickLength + tickBeginPoint.y;
         tickEndPoint.z = direction.z * tickLength + tickBeginPoint.z;
         positions.push(tickEndPoint.x, tickEndPoint.y, tickEndPoint.z);
         colors.push(tickColor.red, tickColor.green, tickColor.blue, tickColor.alpha);
         indexs.push(vertexCount, vertexCount + 1);
         vertexCount += 2;
      }
   }
   o._vertexPositionBuffer.upload(positions.memory(), 4 * 3, vertexCount);
   o._vertexColorBuffer.upload(colors.memory(), 1 * 4, vertexCount);
   indexBuffer.upload(indexs.memory(), indexs.length());
}
MO.FE3dRulerBox = function FE3dRulerBox(o){
   o = MO.Class.inherits(this, o, MO.FE3dSprite);
   o._outline  = MO.Class.register(o, new MO.AGetter('_outline'));
   o._style    = MO.Class.register(o, new MO.AGetter('_style'));
   o._rulerX   = null;
   o._rulerY   = null;
   o._rulerZ   = null;
   o.construct = MO.FE3dRulerBox_construct;
   o.setup     = MO.FE3dRulerBox_setup;
   o.upload    = MO.FE3dRulerBox_upload;
   return o;
}
MO.FE3dRulerBox_construct = function FE3dRulerBox_construct(){
   var o = this;
   o.__base.FE3dSprite.construct.call(o);
   o._material = MO.Class.create(MO.FE3dMaterial);
   o._style = new SE3dRulerStyle();
   o._outline = new MO.SOutline3();
   var ruler = o._rulerX = MO.Class.create(MO.FE3dRuler);
   o.pushRenderable(ruler);
   var ruler = o._rulerY = MO.Class.create(MO.FE3dRuler);
   o.pushRenderable(ruler);
   var ruler = o._rulerZ = MO.Class.create(MO.FE3dRuler);
   o.pushRenderable(ruler);
}
MO.FE3dRulerBox_setup = function FE3dRulerBox_setup(){
   var o = this;
   var context = o._graphicContext;
   var style = o._style;
   o.matrix().setScaleAll(0.1);
   o.matrix().update();
   var outline = o._outline;
   var min = outline.min;
   var max = outline.max;
   var ruler = o._rulerX;
   ruler.linkGraphicContext(context);
   ruler.style().assign(style);
   ruler.beginPoint().assign(min);
   ruler.endPoint().set(max.x, min.y, min.z);
   ruler.direction().set(0, 0, -1);
   ruler.setup();
   var ruler = o._rulerY;
   ruler.linkGraphicContext(context);
   ruler.style().assign(style);
   ruler.beginPoint().assign(min);
   ruler.endPoint().set(min.x, max.y, min.z);
   ruler.direction().set(-1, 0, 0);
   ruler.setup();
   var ruler = o._rulerZ;
   ruler.linkGraphicContext(context);
   ruler.style().assign(style);
   ruler.beginPoint().assign(min);
   ruler.endPoint().set(min.x, min.y, max.z);
   ruler.direction().set(-1, 0, 0);
   ruler.setup();
}
MO.FE3dRulerBox_upload = function FE3dRulerBox_upload(){
   var o = this;
   o._rulerX.upload();
   o._rulerY.upload();
   o._rulerZ.upload();
}
MO.FE3dShape = function FE3dShape(o){
   o = MO.Class.inherits(this, o, MO.FE3dFace);
   o._ready    = true;
   o.construct = MO.FE3dShape_construct;
   o.dispose   = MO.FE3dShape_dispose;
   return o;
}
MO.FE3dShape_construct = function FE3dShape_construct(){
   var o = this;
   o.__base.FE3dFace.construct.call(o);
}
MO.FE3dShape_dispose = function FE3dShape_dispose(){
   var o = this;
   o.__base.FE3dFace.dispose.call(o);
}
MO.FE3dShapeConsole = function FE3dShapeConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Local;
   o._bitmaps  = MO.Class.register(o, new MO.AGetter('_bitmaps'));
   o.construct = MO.FE3dShapeConsole_construct;
   o.load      = MO.FE3dShapeConsole_load;
   o.loadUrl   = MO.FE3dShapeConsole_loadUrl;
   return o;
}
MO.FE3dShapeConsole_construct = function FE3dShapeConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._bitmaps = new MO.TDictionary();
}
MO.FE3dShapeConsole_load = function FE3dShapeConsole_load(context, guid, code){
   var o = this;
   var flag = guid + '|' + code;
   var bitmap = o._bitmaps.get(flag);
   if(bitmap){
      return bitmap;
   }
   var url = MO.Window.Browser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
   MO.Logger.info(o, 'Load bitmap. (url={1})', url);
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
MO.FE3dShapeConsole_loadUrl = function FE3dShapeConsole_loadUrl(context, url){
   var o = this;
   var bitmap = o._bitmaps.get(url);
   if(bitmap){
      return bitmap;
   }
   var loadUrl = MO.Window.Browser.contentPath(url);
   MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
   var bitmap = MO.Class.create(MO.FE3dBitmapData);
   bitmap.linkGraphicContext(context);
   bitmap.setup();
   bitmap.loadUrl(url);
   o._bitmaps.set(url, bitmap);
   return bitmap;
}
MO.FE3dShapeData = function FE3dShapeData(o){
   o = MO.Class.inherits(this, o, MO.FE3dFaceData);
   o._graphic  = null;
   o._texture  = null;
   o.construct = MO.FE3dShapeData_construct;
   o.beginDraw = MO.FE3dShapeData_beginDraw;
   o.endDraw   = MO.FE3dShapeData_endDraw;
   o.dispose   = MO.FE3dShapeData_dispose;
   return o;
}
MO.FE3dShapeData_construct = function FE3dShapeData_construct(){
   var o = this;
   o.__base.FE3dFaceData.construct.call(o);
}
MO.FE3dShapeData_beginDraw = function FE3dShapeData_beginDraw(){
   var o = this;
   var size = o._size;
   var adjustWidth = MO.Lang.Integer.pow2(size.width);
   var adjustHeight = MO.Lang.Integer.pow2(size.height);
   o._adjustSize.set(adjustWidth, adjustHeight);
   var canvasConsole = MO.Console.find(MO.FE2dCanvasConsole);
   var canvas = o._canvas = canvasConsole.allocBySize(adjustWidth, adjustHeight);
   var graphic = o._graphic = canvas.graphicContext();
   return graphic;
}
MO.FE3dShapeData_endDraw = function FE3dShapeData_endDraw(){
   var o = this;
   var graphic = o._graphic;
   o._texture.upload(o._canvas);
   var canvasConsole = MO.Console.find(MO.FE2dCanvasConsole);
   canvasConsole.free(o._canvas);
   o._canvas = null;
   o._graphic = null;
   o._ready = true;
}
MO.FE3dShapeData_dispose = function FE3dShapeData_dispose(){
   var o = this;
   o.__base.FE3dFaceData.dispose.call(o);
}
MO.FE3dSphere = function FE3dSphere(o){
   o = MO.Class.inherits(this, o, MO.FE3dRenderable);
   o._outline              = null;
   o._drawModeCd           = MO.Class.register(o, new MO.AGetSet('_drawModeCd'), MO.EG3dDrawMode.Triangles);
   o._splitCount           = MO.Class.register(o, new MO.AGetSet('_splitCount'), 8);
   o._vertexPositionBuffer = null;
   o._vertexNormalBuffer   = null;
   o._vertexCoordBuffer    = null;
   o._indexBuffer          = MO.Class.register(o, new MO.AGetter('_indexBuffer'));
   o.construct             = MO.FE3dSphere_construct;
   o.setup                 = MO.FE3dSphere_setup;
   return o;
}
MO.FE3dSphere_construct = function FE3dSphere_construct(){
   var o = this;
   o.__base.FE3dRenderable.construct.call(o);
   o._material = MO.Class.create(MO.FE3dMaterial);
   o._outline = new MO.SOutline3();
}
MO.FE3dSphere_setup = function FE3dSphere_setup(){
   var o = this;
   var context = o._graphicContext;
   var countAngle = o._splitCount * 2;
   var countZ = o._splitCount;
   var vertexCount = o._vertexCount = (countZ + 1) * (countAngle + 1);
   var positionIndex = 0;;
   var positionData = new Float32Array(3 * vertexCount);
   var normalIndex = 0;;
   var normalData = new Float32Array(3 * vertexCount);
   var coordIndex = 0;;
   var coordData = new Float32Array(2 * vertexCount);
   var stepAngle = Math.PI * 2 / countAngle;
   var stepZ = Math.PI / countZ;
   for(var rz = 0; rz <= countZ; rz++){
      for(var r = 0; r <= countAngle; r++){
         var radius = stepAngle * r - Math.PI;
         var radiusZ = stepZ * rz - MO.Const.PI_2;
         var x = Math.sin(radius) * Math.cos(radiusZ);
         var y = Math.sin(radiusZ);
         var z = -Math.cos(radius) * Math.cos(radiusZ);
         positionData[positionIndex++] = x;
         positionData[positionIndex++] = y;
         positionData[positionIndex++] = z;
         normalData[normalIndex++] = x;
         normalData[normalIndex++] = y;
         normalData[normalIndex++] = z;
         coordData[coordIndex++] = radius / Math.PI / 2 + 0.5;
         coordData[coordIndex++] = radiusZ / Math.PI - 0.5;
      }
   }
   var buffer = o._vertexPositionBuffer = context.createVertexBuffer();
   buffer.setCode('position');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(positionData, 4 * 3, vertexCount);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexNormalBuffer = context.createVertexBuffer();
   buffer.setCode('normal');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float3);
   buffer.upload(normalData, 4 * 3, vertexCount);
   o.pushVertexBuffer(buffer);
   var buffer = o._vertexCoordBuffer = context.createVertexBuffer();
   buffer.setCode('coord');
   buffer.setFormatCd(MO.EG3dAttributeFormat.Float2);
   buffer.upload(coordData, 4 * 2, vertexCount);
   o.pushVertexBuffer(buffer);
   var drawModeCd = o._drawModeCd;
   var indexes = new MO.TArray();
   for(var rz = 0; rz < countZ; rz++){
      for(var r = 0; r < countAngle; r++){
         var i = (countAngle + 1) * rz;
         var ci = i + r;
         var ni = i + r + (countAngle + 1);
         if(drawModeCd == MO.EG3dDrawMode.Lines){
            indexes.push(ci, ni, ni, ci + 1, ci + 1, ci);
            indexes.push(ni, ni + 1, ni + 1, ci + 1, ci + 1, ni);
         }else{
            indexes.push(ci, ni, ci + 1);
            indexes.push(ni, ni + 1, ci + 1);
         }
      }
   }
   var buffer = o._indexBuffer = context.createIndexBuffer();
   buffer.setDrawModeCd(drawModeCd);
   var indexLength = indexes.length();
   var indexMemory = indexes.memory();
   if(indexLength > 65535){
      buffer.setStrideCd(MO.EG3dIndexStride.Uint32);
      buffer.upload(new Uint32Array(indexMemory), indexLength);
   }else{
      buffer.upload(new Uint16Array(indexMemory), indexLength);
   }
   o.pushIndexBuffer(buffer);
   o.update();
   var info = o.material().info();
   info.ambientColor.set(0.2, 0.2, 0.2, 1);
   info.diffuseColor.set(0.8, 0.8, 0.8, 1);
   info.specularColor.set(0.8, 0.8, 0.8, 1);
   info.specularLevel = 64;
}
MO.FE3dVideo = function FE3dVideo(o){
   o = MO.Class.inherits(this, o, MO.FE3dFace);
   o.construct = MO.FE3dVideo_construct;
   o.testReady = MO.FE3dVideo_testReady;
   o.loadUrl   = MO.FE3dVideo_loadUrl;
   o.dispose   = MO.FE3dVideo_dispose;
   return o;
}
MO.FE3dVideo_construct = function FE3dVideo_construct(){
   var o = this;
   o.__base.FE3dFace.construct.call(o);
}
MO.FE3dVideo_testReady = function FE3dVideo_testReady(){
   var o = this;
   if(!o._ready){
      var renderable = o._renderable;
      if(renderable){
         o._ready = renderable.testReady();
         if(o._ready){
            var event = new MO.SEvent(o);
            o.processLoadListener(event);
            event.dispose();
         }
         o._materialReference = renderable;
      }
   }
   return o._ready;
}
MO.FE3dVideo_loadUrl = function FE3dVideo_loadUrl(url){
   var o = this;
   var context = o._graphicContext;
   o._renderable = MO.Console.find(MO.FE3dVideoConsole).loadUrl(context, url);
   o._ready = false;
}
MO.FE3dVideo_dispose = function FE3dVideo_dispose(){
   var o = this;
   o.__base.FE3dFace.dispose.call(o);
}
MO.FE3dVideoConsole = function FE3dVideoConsole(o){
   o = MO.Class.inherits(this, o, MO.FConsole);
   o._scopeCd  = MO.EScope.Local;
   o._videos   = null;
   o._dataUrl  = '/cloud.resource.bitmap.wv'
   o.construct = MO.FE3dVideoConsole_construct;
   o.videos    = MO.FE3dVideoConsole_videos;
   o.load      = MO.FE3dVideoConsole_load;
   o.loadUrl   = MO.FE3dVideoConsole_loadUrl;
   return o;
}
MO.FE3dVideoConsole_construct = function FE3dVideoConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._videos = new MO.TDictionary();
}
MO.FE3dVideoConsole_videos = function FE3dVideoConsole_videos(){
   return this._videos;
}
MO.FE3dVideoConsole_load = function FE3dVideoConsole_load(context, guid, code){
   var o = this;
   var flag = guid + '|' + code;
   var bitmap = o._videos.get(flag);
   if(bitmap){
      return bitmap;
   }
   var url = MO.Window.Browser.hostPath(o._dataUrl + '?guid=' + guid + '&code=' + code);
   MO.Logger.info(o, 'Load bitmap. (url={1})', url);
   if(code == 'environment'){
      bitmap = MO.Class.create(MO.FE3rBitmapCubePack);
   }else{
      bitmap = MO.Class.create(MO.FE3rBitmapFlatPack);
   }
   bitmap.linkGraphicContext(context);
   bitmap.loadUrl(url);
   o._videos.set(flag, bitmap);
   return bitmap;
}
MO.FE3dVideoConsole_loadUrl = function FE3dVideoConsole_loadUrl(context, url){
   var o = this;
   var bitmap = o._videos.get(url);
   if(bitmap){
      return bitmap;
   }
   var loadUrl = MO.Window.Browser.contentPath(url);
   MO.Logger.info(o, 'Load bitmap from url. (url={1})', loadUrl);
   var bitmap = MO.Class.create(MO.FE3dVideoData);
   bitmap.linkGraphicContext(context);
   bitmap.setup();
   bitmap.loadUrl(url);
   o._videos.set(url, bitmap);
   return bitmap;
}
MO.FE3dVideoData = function FE3dVideoData(o){
   o = MO.Class.inherits(this, o, MO.FE3dFaceData);
   o._loaded       = false;
   o._ready        = false;
   o._hVideo       = MO.Class.register(o, new MO.AGetSet('_hVideo'));
   o.ohVideoLoad   = MO.FE3dVideoData_ohVideoLoad;
   o.ohVideoLoaded = MO.FE3dVideoData_ohVideoLoaded;
   o.ohVideoEnded  = MO.FE3dVideoData_ohVideoEnded;
   o.construct     = MO.FE3dVideoData_construct;
   o.loadUrl       = MO.FE3dVideoData_loadUrl;
   o.setLoop       = MO.FE3dVideoData_setLoop;
   o.testReady     = MO.FE3dVideoData_testReady;
   o.play          = MO.FE3dVideoData_play;
   o.process       = MO.FE3dVideoData_process;
   o.dispose       = MO.FE3dVideoData_dispose;
   return o;
}
MO.FE3dVideoData_ohVideoLoad = function FE3dVideoData_ohVideoLoad(event){
   var o = this.__linker;
   var hVideo = o._hVideo;
   o._loaded  = true;
}
MO.FE3dVideoData_ohVideoLoaded = function FE3dVideoData_ohVideoLoaded(event){
   var o = this.__linker;
   var hVideo = o._hVideo;
   o._ready = true;
}
MO.FE3dVideoData_ohVideoEnded = function FE3dVideoData_ohVideoEnded(){
   var o = this.__linker;
   var hVideo = o._hVideo;
}
MO.FE3dVideoData_construct = function FE3dVideoData_construct(){
   var o = this;
   o.__base.FE3dFaceData.construct.call(o);
   o._material.info().effectCode = 'video';
}
MO.FE3dVideoData_loadUrl = function FE3dVideoData_loadUrl(uri, auto){
   var o = this;
   var url = MO.Console.find(MO.FEnvironmentConsole).parse(uri);
   var video = o._hVideo = document.createElement('VIDEO');
   video.__linker = o;
   video.autoplay = auto;
   video.src = url;
   video.addEventListener('canplay', o.ohVideoLoad);
   video.addEventListener('canplaythrough', o.ohVideoLoaded);
   video.load();
   o._ready = false;
}
MO.FE3dVideoData_setLoop = function FE3dVideoData_setLoop(flag){
   this._hVideo.loop = flag;
}
MO.FE3dVideoData_play = function FE3dVideoData_play(flag){
   var o = this;
   var video = o._hVideo;
   if(flag){
      video.play();
   }else{
      video.pause();
   }
}
MO.FE3dVideoData_process = function FE3dVideoData_process(){
   var o = this;
   if(o._loaded){
      o._texture.uploadElement(o._hVideo);
      o._ready = true;
   }
}
MO.FE3dVideoData_dispose = function FE3dVideoData_dispose(){
   var o = this;
   o._hVideo = null;
   o.__base.FE3dFaceData.dispose.call(o);
}
