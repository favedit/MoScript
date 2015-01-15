function FGraphicContext(o){
   o = RClass.inherits(this, o, FObject);
   o._hCanvas   = null;
   o.construct  = FGraphicContext_construct;
   o.linkCanvas = RMethod.virtual(o, 'linkCanvas');
   o.dispose    = FGraphicContext_dispose;
   return o;
}
function FGraphicContext_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FGraphicContext_dispose(){
   var o = this;
   o._hCanvas = null;
   o.__base.FObject.dispose.call(o);
}
function FGraphicRenderable(o){
   o = RClass.inherits(this, o, FObject);
   o.process = FGraphicRenderable_process;
   return o;
}
function FGraphicRenderable_process(){
}
function FG2dContext(o){
   o = RClass.inherits(this, o, FGraphicContext);
   o._native       = null;
   o.construct     = FG2dContext_construct;
   o.linkCanvas    = FG2dContext_linkCanvas;
   o.drawLine      = FG2dContext_drawLine;
   o.drawRecrangle = FG2dContext_drawRecrangle;
   o.drawText      = FG2dContext_drawText;
   o.drawImage     = FG2dContext_drawImage;
   o.fillRecrangle = FG2dContext_fillRecrangle;
   o.dispose       = FG2dContext_dispose;
   return o;
}
function FG2dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
}
function FG2dContext_linkCanvas(h){
   var o = this;
   o._hCanvas = h;
   o._native = h.getContext('2d')
}
function FG2dContext_drawLine(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.moveTo(x1, y1);
   c.lineTo(x2, y2);
   c.stroke();
}
function FG2dContext_drawRecrangle(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.moveTo(x1, y1);
   c.lineTo(x2, y1);
   c.lineTo(x2, y2);
   c.lineTo(x1, y2);
   c.lineTo(x1, y1);
   c.stroke();
}
function FG2dContext_drawText(x, y, t){
   var o = this;
   o._native.fillText(t, x, y);
}
function FG2dContext_drawImage(){
}
function FG2dContext_fillRecrangle(x1, y1, x2, y2){
   var o = this;
   var c = o._native;
   c.beginPath();
   c.moveTo(x1, y1);
   c.lineTo(x2, y1);
   c.lineTo(x2, y2);
   c.lineTo(x1, y2);
   c.lineTo(x1, y1);
   c.closePath();
   c.fill();
}
function FG2dContext_dispose(){
   var o = this;
   o._native = null;
   o.__base.FGraphicContext.dispose.call(o);
}
function FG3dAnimation(o){
   o = RClass.inherits(this, o, FObject);
   o._baseTick    = 0;
   o._currentTick = 0;
   o._lastTick    = 0
   o._bones       = null;
   o.construct    = FG3dAnimation_construct;
   o.findBone     = FG3dAnimation_findBone;
   o.process      = FG3dAnimation_process;
   o.dispose      = FG3dAnimation_dispose;
   return o;
}
function FG3dAnimation_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._bones = new TObjects();
}
function FG3dAnimation_findBone(p){
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
function FG3dAnimation_process(){
   var o = this;
   var t = RTimer.current();
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
function FG3dAnimation_dispose(){
   var o = this;
   o._bones.dispose();
   o._bones = null;
   o.__base.FObject.dispose.call(o);
}
function FG3dBaseMaterial(o){
   o = RClass.inherits(this, o, FObject);
   o._name      = null;
   o._info      = null;
   o.construct  = FG3dBaseMaterial_construct;
   o.info       = FG3dBaseMaterial_info;
   o.assignInfo = FG3dBaseMaterial_assignInfo;
   return o;
}
function FG3dBaseMaterial_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._info = new SG3dMaterialInfo();
}
function FG3dBaseMaterial_info(){
   return this._info;
}
function FG3dBaseMaterial_assignInfo(p){
   this._info.assign(p);
}
function FG3dBone(o){
   o = RClass.inherits(this, o, FObject);
   o._boneId   = 0;
   o._modeId   = null;
   o.update    = FG3dBone_update;
   return o;
}
function FG3dBone_update(p){
}
function FG3dCamera(o){
   o = RClass.inherits(this, o, FObject);
   o.__rotationX   = null;
   o.__rotationY   = null;
   o.__rotationZ   = null;
   o._position     = null;
   o._direction    = null;
   o._rotation     = null;
   o._matrix       = null;
   o._centerFront  = 0;
   o._centerBack   = 0;
   o._focalNear    = 0.1;
   o._focalFar     = 100.0;
   o._planes       = null;
   o._frustum      = null;
   o._projection   = null;
   o._viewport     = null;
   o._axisUp       = null;
   o._axisX        = null;
   o._axisY        = null;
   o._axisZ        = null;
   o.construct     = FG3dCamera_construct;
   o.position      = FG3dCamera_position;
   o.setPosition   = FG3dCamera_setPosition;
   o.direction     = FG3dCamera_direction;
   o.setDirection  = FG3dCamera_setDirection;
   o.matrix        = FG3dCamera_matrix;
   o.doWalk        = FG3dCamera_doWalk;
   o.doStrafe      = FG3dCamera_doStrafe;
   o.doFly         = FG3dCamera_doFly;
   o.doYaw         = FG3dCamera_doYaw;
   o.doPitch       = FG3dCamera_doPitch;
   o.lookAt        = FG3dCamera_lookAt;
   o.updateFrustum = FG3dCamera_updateFrustum;
   o.update        = FG3dCamera_update;
   return o;
}
function FG3dCamera_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o.__rotationX = new SQuaternion();
   o.__rotationY = new SQuaternion();
   o.__rotationZ = new SQuaternion();
   o._position = new SPoint3();
   o._direction = new SVector3();
   o._rotation = new SQuaternion();
   o._matrix = new SMatrix3d();
   o.viewport = RClass.create(FG3dViewport);
   o.projection = RClass.create(FG3dProjection);
   o._axisUp = new SVector3();
   o._axisUp.set(0, 1, 0);
   o._axisX = new SVector3();
   o._axisY = new SVector3();
   o._axisZ = new SVector3();
}
function FG3dCamera_position(){
   return this._position;
}
function FG3dCamera_setPosition(x, y, z){
   this._position.set(x, y, z);
}
function FG3dCamera_direction(){
   return this._direction;
}
function FG3dCamera_setDirection(x, y, z){
   this._direction.set(x, y, z);
}
function FG3dCamera_matrix(){
   return this._matrix;
}
function FG3dCamera_doWalk(p){
   var o = this;
   o._position.x += o._direction.x * p;
   o._position.z += o._direction.z * p;
}
function FG3dCamera_doStrafe(p){
   var o = this;
   o._position.x += o._axisY.x * p;
   o._position.z += o._axisY.z * p;
}
function FG3dCamera_doFly(p){
   var o = this;
   o._position.y += p;
}
function FG3dCamera_doYaw(p){
   var o = this;
}
function FG3dCamera_doPitch(p){
   var o = this;
}
function FG3dCamera_lookAt(x, y, z){
   var o = this;
   var p = o._position;
   o._direction.set(x - p.x, y - p.y, z - p.z);
   o._direction.normalize();
}
function FG3dCamera_updateFrustum(){
}
function FG3dCamera_update(){
   var o = this;
   var ax = o._axisX;
   var ay = o._axisY;
   var az = o._axisZ;
   az.assign(o._direction);
   az.normalize();
   o._axisUp.cross2(ax, az);
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
function FG3dDirectionalLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   o._direction = null;
   o.construct = FG3dDirectionalLight_construct;
   o.direction = FG3dDirectionalLight_direction;
   return o;
}
function FG3dDirectionalLight_construct(){
   var o = this;
   o.__base.FG3dLight.construct.call(o);
   o._direction = new SVector3();
}
function FG3dDirectionalLight_direction(){
   return this._direction;
}
function FG3dEffect(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._program          = null;
   o._templateContext  = null;
   o._vertexTemplate   = null;
   o._fragmentTemplate = null;
   o.construct         = FG3dEffect_construct;
   o.program           = FG3dEffect_program;
   o.setParameter      = FG3dEffect_setParameter;
   o.setSampler        = FG3dEffect_setSampler;
   o.drawRenderable    = FG3dEffect_drawRenderable;
   o.buildInfo         = FG3dEffect_buildInfo;
   o.loadUrl           = FG3dEffect_loadUrl;
   o.build             = FG3dEffect_build;
   return o;
}
function FG3dEffect_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._templateContext = RClass.create(FTagContext);
}
function FG3dEffect_program(){
   return this._program;
}
function FG3dEffect_setParameter(pn, pv, pc){
   this._program.setParameter(pn, pv, pc);
}
function FG3dEffect_setSampler(pn, pt){
   this._program.setSampler(pn, pt);
}
function FG3dEffect_buildInfo(f, r){
}
function FG3dEffect_drawRenderable(r){
   var o = this;
   var c = o._context;
   var p = o._program;
   c.setProgram(p);
   if(p.hasAttribute()){
      var as = p.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         if(a._statusUsed){
            var vb = r.findVertexBuffer(a._linker);
            if(vb == null){
               throw new TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
            }
            p.setAttribute(a._name, vb, vb._formatCd);
         }
      }
   }
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib._count);
}
function FG3dEffect_loadUrl(u){
   var o = this;
   var c = o._context;
   var x = RClass.create(FXmlConnection);
   var d = x.send(u);
   var p = o._program = c.createProgram();
   p.loadConfig(d);
   var vt = o._vertexTemplate = RClass.create(FTagDocument);
   vt.setSpace('shader');
   vt.load(p._vertexSource);
   var ft = o._fragmentTemplate = RClass.create(FTagDocument);
   ft.setSpace('shader');
   ft.load(p._fragmentSource);
}
function FG3dEffect_build(p){
   var o = this;
   var g = o._program;
   var c = o._templateContext;
   c.resetAttributes();
   o.buildInfo(c, p);
   c.resetSource();
   var vs = o._vertexTemplate.parse(c);
   var vsf = RString.formatLines(vs);
   g.upload(EG3dShader.Vertex, vsf);
   c.resetSource();
   var fs = o._fragmentTemplate.parse(c);
   var fsf = RString.formatLines(fs);
   g.upload(EG3dShader.Fragment, fsf);
   g.build();
   g.link();
}
function FG3dEffectConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._templateEffects = null;
   o._effects         = null;
   o._path            = "/assets/shader/";
   o._effectInfo      = null;
   o._tagContext      = null;
   o.construct        = FG3dEffectConsole_construct;
   o.buildEffectInfo  = FG3dEffectConsole_buildEffectInfo;
   o.findTemplate     = FG3dEffectConsole_findTemplate;
   o.find             = FG3dEffectConsole_find;
   o.findByName       = FG3dEffectConsole_findByName;
   o.findByRenderable = FG3dEffectConsole_findByRenderable;
   return o;
}
function FG3dEffectConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._templateEffects = new TDictionary();
   o._effects = new TDictionary();
   o._effectInfo = new SG3dEffectInfo();
   o._tagContext = RClass.create(FTagContext);
}
function FG3dEffectConsole_buildEffectInfo(f, r){
   var o = this;
   var vs = r.vertexBuffers();
   var c = vs.count();
   for(var i = 0; i < c; i++){
      var v = vs.get(i);
      f.attributes.push(v.name());
   }
   var ts = r.textures();
   if(ts){
      var c = ts.count();
      for(var i = 0; i < c; i++){
         f.samplers.push(ts.name(i));
      }
   }
}
function FG3dEffectConsole_findTemplate(pc, pn){
   var o = this;
   var es = o._templateEffects;
   var e = es.get(pn);
   if(e == null){
      if(pn == 'skeleton'){
         e = RClass.create(FG3dSampleSkeletonEffect);
      }else{
         e = RClass.create(FG3dSampleAutomaticEffect);
      }
      e.linkContext(pc);
      e._path = o._path;
      e.load();
      RLogger.info(o, 'Create effect template. (name={1}, instance={2})', pn, e);
      es.set(pn, e);
   }
   return e;
}
function FG3dEffectConsole_find(c, p){
   var o = this;
   var n = RClass.name(p);
   var e = o._effects.get(n);
   if(e == null){
      e = RClass.createByName(n);
      e.linkContext(c);
      e._path = o._path;
      e.load();
      o._effects.set(n, e);
   }
   return e;
}
function FG3dEffectConsole_findByName(c, p){
   var o = this;
   var es = o._effects;
   var e = es.get(p);
   if(e == null){
      if(p == 'skeleton'){
         e = RClass.create(FG3dSampleSkeletonEffect);
      }else{
         e = RClass.create(FG3dSampleAutomaticEffect);
      }
      e.linkContext(c);
      e._path = o._path;
      e.load();
      RLogger.info(o, 'Create effect. (name={1}, instance={2})', p, e);
      es.set(p, e);
   }
   return e;
}
function FG3dEffectConsole_findByRenderable(pc, pr){
   var o = this;
   var en = pr.material().info().effectName;
   if(en == null){
      en = 'automatic'
   }
   var et = o.findTemplate(pc, en);
   if(et){
      o._effectInfo.reset();
      o.buildEffectInfo(o._effectInfo, pr);
      et.buildInfo(o._tagContext, o._effectInfo);
      var ec = en + o._tagContext.code;
      var es = o._effects;
      var e = es.get(ec);
      if(e == null){
         if(en == 'skeleton'){
            e = RClass.create(FG3dSampleSkeletonEffect);
         }else{
            e = RClass.create(FG3dSampleAutomaticEffect);
         }
         e._code = ec;
         e.linkContext(pc);
         e._path = o._path;
         e.load();
         e.build(o._effectInfo);
         RLogger.info(o, 'Create effect. (name={1}, instance={2})', en, e);
      }
      es.set(ec, e);
   }
   return e;
}
function FG3dLight(o){
   o = RClass.inherits(this, o, FObject);
   return o;
}
function FG3dLightMaterial(o){
   o = RClass.inherits(this, o, FG3dBaseMaterial);
   return o;
}
function FG3dMaterial(o){
   o = RClass.inherits(this, o, FG3dBaseMaterial);
   o._textures = null;
   o.textures  = FG3dMaterial_textures;
   return o;
}
function FG3dMaterial_textures(){
   return this._textures;
}
function FG3dMaterialTexture(o){
   o = RClass.inherits(this, o, FG3dMaterial);
   o._texture  = null;
   o.construct = FG3dMaterialTexture_construct;
   return o;
}
function FG3dMaterialTexture_construct(){
   var o = this;
}
function FG3dObject(o){
   o = RClass.inherits(this, o, FObject);
   o._context = null;
   o.linkContext = FG3dObject_linkContext;
   o.setup       = FG3dObject_setup;
   return o;
}
function FG3dObject_linkContext(c){
   this._context = c;
}
function FG3dObject_setup(){
}
function FG3dPointLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   return o;
}
function FG3dProjection(o){
   o = RClass.inherits(this, o, FObject);
   o.width       = 0;
   o.height      = 0;
   o.angle       = 60;
   o.fieldOfView = 0;
   o.scale       = 0;
   o.znear       = 0.1;
   o.zfar        = 100;
   o._matrix     = null;
   o.construct   = FG3dProjection_construct;
   o.matrix      = FG3dProjection_matrix;
   o.update      = FG3dProjection_update;
   return o;
}
function FG3dProjection_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._matrix = new SPerspectiveMatrix3d();
}
function FG3dProjection_matrix(){
   return this._matrix;
}
function FG3dProjection_update(){
   var o = this;
   o.fieldOfView = RMath.DEGREE_RATE * o.angle;
   o._matrix.perspectiveFieldOfViewLH(o.fieldOfView, o.width / o.height, o.znear, o.zfar);
}
function FG3dRegion(o){
   o = RClass.inherits(this, o, FObject);
   o._camera               = null;
   o._projection           = null;
   o._directionalLight     = null
   o._renderables          = null;
   o._matrixViewProjection = null;
   o._cameraPosition       = null;
   o._lightDirection       = null;
   o.construct             = FG3dRegion_construct;
   o.matrixViewProjection  = FG3dRegion_matrixViewProjection;
   o.cameraPosition        = FG3dRegion_cameraPosition;
   o.lightDirection        = FG3dRegion_lightDirection;
   o.renderables           = FG3dRegion_renderables;
   o.pushRenderable        = FG3dRegion_pushRenderable;
   o.prepare               = FG3dRegion_prepare;
   o.update                = FG3dRegion_update;
   o.dispose               = FG3dRegion_dispose;
   return o;
}
function FG3dRegion_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
   o._renderables = new TObjects();
   o._matrixViewProjection = new SMatrix3d();
   o._cameraPosition = new Float32Array(3);
   o._lightDirection = new Float32Array(3);
}
function FG3dRegion_matrixViewProjection(p){
   return this._matrixViewProjection;
}
function FG3dRegion_cameraPosition(){
   return this._cameraPosition;
}
function FG3dRegion_lightDirection(){
   return this._lightDirection;
}
function FG3dRegion_renderables(p){
   return this._renderables;
}
function FG3dRegion_pushRenderable(p){
   this._renderables.push(p);
}
function FG3dRegion_prepare(){
   var o = this;
   o._matrixViewProjection.assign(o._camera.matrix());
   o._matrixViewProjection.append(o._projection.matrix());
   var cp = o._camera.position();
   o._cameraPosition[0] = cp.x;
   o._cameraPosition[1] = cp.y;
   o._cameraPosition[2] = cp.z;
   var ld = o._directionalLight.direction();
   ld.normalize();
   o._lightDirection[0] = ld.x;
   o._lightDirection[1] = ld.y;
   o._lightDirection[2] = ld.z;
   o._renderables.clear();
}
function FG3dRegion_update(){
   var o = this;
   var rs = o._renderables;
   var c = rs.count();
   for(var i = 0; i < c; i++){
      var r = rs.get(i);
      r.update(o);
   }
}
function FG3dRegion_dispose(){
   var o = this;
   o._renderables = null;
   o.__base.FObject.dispose.call(o);
}
function FG3dRenderable(o){
   o = RClass.inherits(this, o, FGraphicRenderable);
   o._matrix       = null;
   o._effectName   = null;
   o._effect       = null;
   o._materialName = null;
   o._material     = null;
   o.construct     = FG3dRenderable_construct;
   o.matrix        = FG3dRenderable_matrix;
   o.effectName    = FG3dRenderable_effectName;
   o.effect        = FG3dRenderable_effect;
   o.setEffect     = FG3dRenderable_setEffect;
   o.material      = FG3dRenderable_material;
   o.testVisible   = RMethod.virtual(o, 'testVisible');
   o.update        = FG3dRenderable_update;
   return o;
}
function FG3dRenderable_construct(){
   var o = this;
   o.__base.FGraphicRenderable.construct.call(o);
   o._matrix = new SMatrix3d();
   o._material = RClass.create(FG3dMaterial);
}
function FG3dRenderable_matrix(){
   return this._matrix;
}
function FG3dRenderable_effectName(){
   return this._effectName;
}
function FG3dRenderable_effect(){
   return this._effect;
}
function FG3dRenderable_setEffect(p){
   this._effect = p;
}
function FG3dRenderable_material(){
   return this._material;
}
function FG3dRenderable_update(p){
}
function FG3dShader(o){
   o = RClass.inherits(this, o, FG3dObject);
   o.source = null;
   return o;
}
function FG3dSpotLight(o){
   o = RClass.inherits(this, o, FG3dLight);
   return o;
}
function FG3dTechnique(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._name      = null;
   o._passes    = null;
   o.construct  = FG3dTechnique_construct;
   o.name       = FG3dTechnique_name;
   o.drawRegion = FG3dTechnique_drawRegion;
   return o;
}
function FG3dTechnique_construct(){
   var o = this;
   o.__base.FG3dObject.construct.call(o);
   o._passes = new TObjects();
}
function FG3dTechnique_name(){
   return this._name;
}
function FG3dTechnique_drawRegion(r){
   var o = this;
   var ps = o._passes;
   var c = ps.count();
   for(var n = 0; n < c; n++){
      var p = ps.get(n);
      p.drawRegion(r);
   }
   o._context.present();
}
function FG3dTechniqueConsole(o){
   o = RClass.inherits(this, o, FConsole);
   o._techniques = null;
   o.construct   = FG3dTechniqueConsole_construct;
   o.find        = FG3dTechniqueConsole_find;
   return o;
}
function FG3dTechniqueConsole_construct(){
   var o = this;
   o.__base.FConsole.construct.call(o);
   o._techniques = new TDictionary();
}
function FG3dTechniqueConsole_find(c, p){
   var o = this;
   var n = RClass.name(p);
   var t = o._techniques.get(n);
   if(t == null){
      t = RClass.createByName(n);
      t.linkContext(c);
      t.setup();
      o._techniques.set(n, t);
   }
   return t;
}
function FG3dTechniquePass(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._name      = null;
   o.name       = FG3dTechniquePass_name;
   o.drawRegion = FG3dTechniquePass_drawRegion;
   return o;
}
function FG3dTechniquePass_name(){
   return this._name;
}
function FG3dTechniquePass_drawRegion(p){
   var o = this;
   var ec = RConsole.find(FG3dEffectConsole);
   var rs = p.renderables();
   var c = rs.count();
   for(var i = 0; i < c; i++){
      var r = rs.get(i);
      var e = r.effect();
      if(e == null){
         e = ec.findByRenderable(o._context, r);
         r.setEffect(e);
      }
      o._context.setProgram(e.program());
      e.drawRenderable(p, r);
   }
}
function FG3dTexture(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._textureCd  = EG3dTexture.Unknown;
   o._statusLoad = false;
   o.textureCd   = FG3dTexture_textureCd;
   return o;
}
function FG3dTexture_textureCd(){
   return this._textureCd;
}
function FG3dTrack(o){
   o = RClass.inherits(this, o, FObject);
   o._frames = null;
   o.construct = FG3dTrack_construct;
   o.calculate = FG3dTrack_calculate;
   return o;
}
function FG3dTrack_construct(){
   var o = this;
   o.__base.FObject.construct.call(o);
}
function FG3dTrack_update(p){
   var o = this;
   var info = new SG3dFrameInfo();
   o._trackResource.calculateFrameInfo(info, tick);
   info.update();
   o._matrix.assign(o._trackResource.matrixInvert());
   o._matrix.append(info.matrix);
   return true;
}
function FG3dTrack_calculate(tick){
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
function FG3dViewport(o){
   o = RClass.inherits(this, o, FObject);
   o.left   = 0;
   o.top    = 0;
   o.width  = 0;
   o.height = 0;
   o.set    = FG3dViewport_set;
   return o;
}
function FG3dViewport_set(l, t, w, h){
   var o = this;
   o.left = l;
   o.top = t;
   o.width = w;
   o.height= h;
}
var REngine3d = new function REngine3d(){
   var o = this;
   o.contexts = new TObjects();
   o.createContext = REngine3d_createContext;
   return o;
}
function REngine3d_createContext(c, h){
   var o = this;
   var r = RClass.create(c);
   r.linkCanvas(h);
   o.contexts.push(r);
   return r;
}
function SG3dEffectInfo(o){
   if(!o){o = this;}
   o.code                  = null;
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
   o.supportInstance       = null;
   o.vertexColor           = null;
   o.vertexCoord           = null;
   o.vertexNormal          = null;
   o.vertexNormalFull      = null;
   o.vertexSkeleton        = null;
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
   o.attributes            = new TArray();
   o.samplers              = new TArray();
   o.attributeContains     = SG3dEffectInfo_attributeContains;
   o.samplerContains       = SG3dEffectInfo_samplerContains;
   o.reset                 = SG3dEffectInfo_reset;
   o.reset();
   return o;
}
function SG3dEffectInfo_attributeContains(p){
   return this.attributes.contains(p);
}
function SG3dEffectInfo_samplerContains(p){
   return this.samplers.contains(p);
}
function SG3dEffectInfo_reset(){
   var o = this;
   o.code = null;
   o.fillModeCd = EG3dFillMode.Fill;
   o.optionCullMode = true;
   o.cullModeCd = EG3dCullMode.Front;
   o.optionDepthTest = true;
   o.depthModeCd = EG3dDepthMode.Less;
   o.optionDepthWrite = true;
   o.optionBlendMode = false;
   o.blendSourceMode = EG3dBlendMode.SourceAlpha;
   o.blendTargetMode = EG3dBlendMode.OneMinusSourceAlpha;
   o.optionAlphaTest = false;
   o.supportInstance = false;
   o.vertexColor = false;
   o.vertexCoord = false;
   o.vertexNormal = false;
   o.vertexNormalFull = false;
   o.vertexSkeleton = false;
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
function SG3dMaterialInfo(o){
   if(!o){o = this;}
   o.effectName    = null;
   o.transformName = null;
   o.optionLight = null;
   o.optionMerge = null;
   o.optionSort = null;
   o.sortLevel = null;
   o.optionAlpha = null;
   o.optionDepth = null;
   o.optionCompare = null;
   o.optionDouble = null;
   o.optionShadow = null;
   o.optionShadowSelf = null;
   o.optionDynamic = null;
   o.optionTransmittance = null;
   o.optionOpacity = null;
   o.coordRateWidth  = 1.0;
   o.coordRateHeight = 1.0;
   o.colorMin        = 0.0;
   o.colorMax        = 1.0;
   o.colorRate       = 1.0;
   o.colorMerge      = 1.0;
   o.alphaBase       = 1.0;
   o.alphaRate       = 1.0;
   o.alphaLevel      = 1.0;
   o.alphaMerge      = 1.0;
   o.ambientColor         = new SColor4();
   o.ambientShadow        = 1.0;
   o.diffuseColor         = new SColor4();
   o.diffuseShadow        = 1.0;
   o.diffuseViewColor     = new SColor4();
   o.diffuseViewShadow    = 1.0;
   o.specularColor        = new SColor4();
   o.specularBase         = 1.0;
   o.specularRate         = 1.0;
   o.specularAverage      = 1.0;
   o.specularShadow       = 1.0;
   o.specularInfo         = null;
   o.specularViewColor    = new SColor4();
   o.specularViewBase     = 1.0;
   o.specularViewRate     = 1.0;
   o.specularViewAverage  = 1.0;
   o.specularViewShadow   = 1.0;
   o.specularViewShadow   = null;
   o.reflectColor         = new SColor4();
   o.reflectMerge         = 1.0;
   o.reflectShadow        = 1.0;
   o.refractFrontColor    = new SColor4();
   o.refractBackColor     = new SColor4();
   o.opacityColor         = new SColor4();
   o.opacityRate          = 1.0;
   o.opacityAlpha         = 1.0;
   o.opacityDepth         = 1.0;
   o.opacityTransmittance = 1.0;
   o.emissiveColor        = new SColor4();
   o.assign = SG3dMaterialInfo_assign;
   o.reset  = SG3dMaterialInfo_reset;
   return o;
}
function SG3dMaterialInfo_assign(p){
   var o = this;
   o.effectName = p.effectName;
   o.transformName = p.transformName;
   o.optionLight = p.optionLight;
   o.optionMerge = p.optionMerge;
   o.optionDepth = p.optionDepth;
   o.optionCompare = p.optionCompare;
   o.optionAlpha = p.optionAlpha;
   o.optionDouble = p.optionDouble;
   o.optionOpacity = p.optionOpacity;
   o.optionShadow = p.optionShadow;
   o.optionShadowSelf = p.optionShadowSelf;
   o.optionTransmittance = p.optionTransmittance;
   o.sortLevel = p.sortLevel;
   o.colorMin = p.colorMin;
   o.colorMax = p.colorMax;
   o.colorRate = p.colorRate;
   o.colorMerge = p.colorMerge;
   o.alphaBase = p.alphaBase;
   o.alphaRate = p.alphaRate;
   o.alphaLevel = p.alphaLevel;
   o.alphaMerge = p.alphaMerge;
   o.ambientColor.assign(p.ambientColor);
   o.ambientShadow = p.ambientShadow;
   o.diffuseColor.assign(p.diffuseColor);
   o.diffuseShadow = p.diffuseShadow;
   o.diffuseViewColor.assign(p.diffuseViewColor);
   o.diffuseViewShadow = p.diffuseViewShadow;
   o.specularColor.assign(p.specularColor);
   o.specularBase = p.specularBase;
   o.specularRate = p.specularRate;
   o.specularAverage = p.specularAverage;
   o.specularShadow = p.specularShadow;
   o.specularViewColor.assign(p.specularViewColor);
   o.specularViewBase = p.specularViewBase;
   o.specularViewRate = p.specularViewRate;
   o.specularViewAverage = p.specularViewAverage;
   o.specularViewShadow = p.specularViewShadow;
   o.reflectColor.assign(p.reflectColor);
   o.reflectMerge = p.reflectMerge;
   o.reflectShadow = p.reflectShadow;
   o.refractFrontColor.assign(p.refractFrontColor);
   o.refractFrontMerge = p.refractFrontMerge;
   o.refractFrontShadow = p.refractFrontShadow;
   o.refractBackColor.assign(p.refractBackColor);
   o.refractBackMerge = p.refractBackMerge;
   o.refractBackShadow = p.refractBackShadow;
   o.opacityColor.assign(p.opacityColor);
   o.opacityRate = p.opacityRate;
   o.opacityAlpha = p.optionAlpha;
   o.opacityDepth = p.optionDepth;
   o.opacityTransmittance = p.optionTransmittance;
   o.emissiveColor.assign(p.emissiveColor);
}
function SG3dMaterialInfo_reset(){
   var o = this;
   o.coordRateWidth = 1.0;
   o.coordRateHeight = 1.0;
   o.colorMin = 0.0;
   o.colorMax = 1.0;
   o.colorRate = 1.0;
   o.colorMerge = 1.0;
   o.alphaBase = 1.0;
   o.alphaRate = 1.0;
   o.alphaLevel = 1.0;
   o.alphaMerge = 1.0;
   o.ambientColor.set(1.0, 1.0, 1.0, 1.0);
   o.ambientShadow = 1.0;
   o.diffuseColor.set(1.0, 1.0, 1.0, 1.0);
   o.diffuseShadow = 1.0;
   o.diffuseViewColor.set(1.0, 1.0, 1.0, 1.0);
   o.diffuseViewShadow = 1.0;
   o.specularColor.set(1.0, 1.0, 1.0, 1.0);
   o.specularBase = 1.0;
   o.specularRate = 1.0;
   o.specularAverage = 1.0;
   o.specularShadow = 1.0;
   o.specularViewColor.set(1.0, 1.0, 1.0, 1.0);
   o.specularViewBase = 1.0;
   o.specularViewRate = 1.0;
   o.specularViewAverage = 1.0;
   o.specularViewShadow = 1.0;
   o.reflectColor.set(1.0, 1.0, 1.0, 1.0);
   o.reflectMerge = 1.0;
   o.reflectShadow = 1.0;
   o.refractFrontColor.set(1.0, 1.0, 1.0, 1.0);
   o.refractFrontMerge = 1.0;
   o.refractFrontShadow = 1.0;
   o.refractBackColor.set(1.0, 1.0, 1.0, 1.0);
   o.refractBackMerge = 1.0;
   o.refractBackShadow = 1.0;
   o.opacityColor.set(1.0, 1.0, 1.0, 1.0);
   o.opacityRate = 1.0;
   o.opacityAlpha = 1.0;
   o.opacityDepth = 1.0;
   o.opacityTransmittance = 1.0;
   o.emissiveColor.set(1.0, 1.0, 1.0, 1.0);
}
var EG3dAttribute = new function EG3dAttribute(){
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
var EG3dAttributeFormat = new function EG3dAttributeFormat(){
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
var EG3dBlendMode = new function EG3dBlendMode(){
   var o = this;
   o.None = 0;
   o.SourceAlpha= 1;
   o.OneMinusSourceAlpha = 2;
   return o;
}
var EG3dCullMode = new function EG3dCullMode(){
   var o = this;
   o.None = 0;
   o.Front= 1;
   o.Back = 2;
   o.Both = 3;
   return o;
}
var EG3dDepthMode = new function EG3dDepthMode(){
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
var EG3dFillMode = new function EG3dFillMode(){
   var o = this;
   o.Unknown = 0;
   o.Point = 1;
   o.Line = 2;
   o.Face = 3;
   return o;
}
var EG3dIndexStride = new function EG3dIndexStride(){
   var o = this;
   o.Unknown = 0;
   o.Uint16 = 1;
   o.Uint32 = 2;
   return o;
}
var EG3dParameterFormat = new function EG3dParameterFormat(){
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
var EG3dSampler = new function EG3dSampler(){
   var o = this;
   o.Diffuse       = 'Diffuse';
   o.Alpha         = 'Alpha';
   o.Normal        = 'Normal';
   o.SpecularColor = 'SpecularColor';
   o.SpecularLevel = 'SpecularLevel';
   o.Light         = 'Light';
   o.Reflect       = 'Reflect';
   o.Refract       = 'Refract';
   o.Emissive      = 'Emissive';
   o.Height        = 'Height';
   o.Environment   = 'Environment';
   return o;
}
var EG3dShader = new function EG3dShader(){
   var o = this;
   o.Unknown = 0;
   o.Vertex   = 1;
   o.Fragment = 2;
   return o;
}
var EG3dTexture = new function EG3dTexture(){
   var o = this;
   o.Unknown = 0;
   o.Flat2d = 1;
   o.Flat3d = 2;
   o.Cube= 3;
   return o;
}
function FG3dContext(o){
   o = RClass.inherits(this, o, FGraphicContext);
   o._capability         = null;
   o._optionDepth        = false;
   o._optionCull         = false;
   o._depthModeCd        = 0;
   o._cullModeCd         = 0;
   o._statusBlend        = false;
   o._blendSourceCd      = 0;
   o._blendTargetCd      = 0;
   o._program            = null;
   o.construct           = FG3dContext_construct;
   o.capability          = FG3dContext_capability;
   o.createProgram       = RMethod.virtual(o, 'createProgram');
   o.createVertexBuffer  = RMethod.virtual(o, 'createVertexBuffer');
   o.createIndexBuffer   = RMethod.virtual(o, 'createIndexBuffer');
   o.createFlatTexture   = RMethod.virtual(o, 'createFlatTexture');
   o.createCubeTexture   = RMethod.virtual(o, 'createCubeTexture');
   o.setFillMode         = RMethod.virtual(o, 'setFillMode');
   o.setDepthMode        = RMethod.virtual(o, 'setDepthMode');
   o.setCullingMode      = RMethod.virtual(o, 'setCullingMode');
   o.setBlendFactors     = RMethod.virtual(o, 'setBlendFactors');
   o.setScissorRectangle = RMethod.virtual(o, 'setScissorRectangle');
   o.setProgram          = RMethod.virtual(o, 'setProgram');
   o.bindVertexBuffer    = RMethod.virtual(o, 'bindVertexBuffer');
   o.bindTexture         = RMethod.virtual(o, 'bindTexture');
   o.clear               = RMethod.virtual(o, 'clear');
   o.drawTriangles       = RMethod.virtual(o, 'drawTriangles');
   o.present             = RMethod.virtual(o, 'present');
   o.dispose             = FG3dContext_dispose;
   return o;
}
function FG3dContext_construct(){
   var o = this;
   o.__base.FGraphicContext.construct.call(o);
}
function FG3dContext_capability(){
   return this._capability;
}
function FG3dContext_dispose(){
   var o = this;
   o._program = null;
   o.__base.FGraphicContext.dispose.call(o);
}
function FG3dCubeTexture(o){
   o = RClass.inherits(this, o, FG3dTexture);
   o.size = 0;
   o.construct = FG3dTexture_construct;
   return o;
}
function FG3dTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = EG3dTexture.Cube;
}
function FG3dFlatTexture(o){
   o = RClass.inherits(this, o, FG3dTexture);
   o.width     = 0;
   o.height    = 0;
   o.construct = FG3dFlatTexture_construct;
   return o;
}
function FG3dFlatTexture_construct(){
   var o = this;
   o.__base.FG3dTexture.construct();
   o._textureCd = EG3dTexture.Flat2d;
}
function FG3dFragmentShader(o){
   o = RClass.inherits(this, o, FG3dShader);
   return o;
}
function FG3dIndexBuffer(o){
   o = RClass.inherits(this, o, FG3dObject);
   o.strideCd = EG3dIndexStride.Uint16;
   o.count    = 0;
   o.upload = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dProgram(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._attributes       = null;
   o._parameters       = null;
   o._samplers         = null;
   o._vertexSource     = null;
   o._vertexShader     = null;
   o._fragmentSource   = null;
   o._fragmentShader   = null;
   o.hasAttribute      = FG3dProgram_hasAttribute;
   o.registerAttribute = FG3dProgram_registerAttribute;
   o.findAttribute     = FG3dProgram_findAttribute;
   o.attributes        = FG3dProgram_attributes;
   o.hasParameter      = FG3dProgram_hasParameter;
   o.registerParameter = FG3dProgram_registerParameter;
   o.findParameter     = FG3dProgram_findParameter;
   o.parameters        = FG3dProgram_parameters;
   o.hasSampler        = FG3dProgram_hasSampler;
   o.registerSampler   = FG3dProgram_registerSampler;
   o.findSampler       = FG3dProgram_findSampler;
   o.samplers          = FG3dProgram_samplers;
   o.vertexShader      = RMethod.virtual(o, 'vertexShader');
   o.fragmentShader    = RMethod.virtual(o, 'fragmentShader');
   o.setAttribute      = RMethod.virtual(o, 'setAttribute');
   o.setParameter      = RMethod.virtual(o, 'setParameter');
   o.setSampler        = RMethod.virtual(o, 'setSampler');
   o.upload            = RMethod.virtual(o, 'upload');
   o.loadConfig        = FG3dProgram_loadConfig;
   return o;
}
function FG3dProgram_hasAttribute(){
   var o = this;
   var r = o._attributes;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerAttribute(n){
   var o = this;
   var r = RClass.create(FG3dProgramAttribute);
   r._name = n;
   o.attributes().set(n, r);
   return r;
}
function FG3dProgram_findAttribute(n){
   return this._attributes ? this._attributes.get(n) : null;
}
function FG3dProgram_attributes(){
   var o = this;
   var r = o._attributes;
   if(r == null){
      r = o._attributes = new TDictionary();
   }
   return r;
}
function FG3dProgram_hasParameter(){
   var o = this;
   var r = o._parameters;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerParameter(pn, pf){
   var o = this;
   var r = RClass.create(FG3dProgramParameter);
   r._name = pn;
   r.formatCd = pf;
   o.parameters().set(pn, r);
   return r;
}
function FG3dProgram_findParameter(n){
   return this._parameters ? this._parameters.get(n) : null;
}
function FG3dProgram_parameters(){
   var o = this;
   var r = o._parameters;
   if(r == null){
      r = o._parameters = new TDictionary();
   }
   return r;
}
function FG3dProgram_hasSampler(){
   var o = this;
   var r = o._samplers;
   return r ? !r.isEmpty() : false;
}
function FG3dProgram_registerSampler(pn){
   var o = this;
   var r = RClass.create(FG3dProgramSampler);
   r._name = pn;
   o.samplers().set(pn, r);
   return r;
}
function FG3dProgram_findSampler(n){
   return this._samplers ? this._samplers.get(n) : null;
}
function FG3dProgram_samplers(){
   var o = this;
   var r = o._samplers;
   if(r == null){
      r = o._samplers = new TDictionary();
   }
   return r;
}
function FG3dProgram_loadConfig(p){
   var o = this;
   var ns = p.nodes();
   var nc = ns.count();
   for(var i = 0; i < nc; i++){
      var n = ns.get(i);
      if(n.isName('State')){
      }else if(n.isName('Specular')){
      }else if(n.isName('Parameter')){
         var pp = RClass.create(FG3dProgramParameter);
         pp.loadConfig(n);
         o.parameters().set(pp.name(), pp);
         var s = pp.toString();
      }else if(n.isName('Attribute')){
         var pa = RClass.create(FG3dProgramAttribute);
         pa.loadConfig(n);
         o.attributes().set(pa.name(), pa);
      }else if(n.isName('Sampler')){
         var ps = RClass.create(FG3dProgramSampler);
         ps.loadConfig(n);
         o.samplers().set(ps.name(), ps);
      }else if(n.isName('Source')){
         var st = n.get('name');
         var sv = n.value();
         if(st == 'vertex'){
            o._vertexSource = sv;
         }else if(st == 'fragment'){
            o._fragmentSource = sv;
         }else{
            throw new TError(o, 'Unknown source type. (name={1})', nt);
         }
      }else{
         throw new TError(o, 'Unknown config type. (name={1})', n.name());
      }
   }
}
function FG3dProgramAttribute(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._slot       = -1;
   o._index      = -1;
   o._formatCd   = EG3dAttributeFormat.Unknown;
   o.name        = FG3dProgramAttribute_name;
   o.linker      = FG3dProgramAttribute_linker;
   o.loadConfig  = FG3dProgramAttribute_loadConfig;
   return o;
}
function FG3dProgramAttribute_name(){
   return this._name;
}
function FG3dProgramAttribute_linker(){
   return this._linker;
}
function FG3dProgramAttribute_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._formatCd = REnum.encode(EG3dAttributeFormat, p.get('format'));
}
function FG3dProgramParameter(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._shaderCd   = -1;
   o._formatCd   = EG3dParameterFormat.Unknown;
   o._slot       = -1;
   o._size       = 0;
   o._buffer     = null;
   o.name        = FG3dProgramParameter_name;
   o.linker      = FG3dProgramParameter_linker;
   o.loadConfig  = FG3dProgramParameter_loadConfig;
   return o;
}
function FG3dProgramParameter_name(){
   return this._name;
}
function FG3dProgramParameter_linker(){
   return this._linker;
}
function FG3dProgramParameter_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._formatCd = REnum.encode(EG3dParameterFormat, p.get('format'));
}
function FG3dProgramSampler(o){
   o = RClass.inherits(this, o, FObject);
   o._name       = null;
   o._linker     = null;
   o._statusUsed = false;
   o._formatCd   = EG3dTexture.Flat2d;
   o._slot       = -1;
   o._index      = 0;
   o._source     = null;
   o.name        = FG3dProgramSampler_name;
   o.linker      = FG3dProgramSampler_linker;
   o.formatCd    = FG3dProgramSampler_formatCd;
   o.loadConfig  = FG3dProgramSampler_loadConfig;
   return o;
}
function FG3dProgramSampler_name(){
   return this._name;
}
function FG3dProgramSampler_linker(){
   return this._linker;
}
function FG3dProgramSampler_formatCd(){
   return this._formatCd;
}
function FG3dProgramSampler_loadConfig(p){
   var o = this;
   o._name = p.get('name');
   o._linker = p.get('linker');
   o._formatCd = REnum.encode(EG3dTexture, p.get('format', 'Flat2d'));
}
function FG3dVertexBuffer(o){
   o = RClass.inherits(this, o, FG3dObject);
   o._name     = 0;
   o._formatCd = EG3dAttributeFormat.Unknown;
   o.stride    = 0;
   o.count     = 0;
   o.name   = FG3dVertexBuffer_name;
   o.upload = RMethod.virtual(o, 'upload');
   return o;
}
function FG3dVertexBuffer_name(){
   return this._name;
}
function FG3dVertexShader(o){
   o = RClass.inherits(this, o, FG3dShader);
   return o;
}
function SG3dContextCapability(o){
   if(!o){o = this;}
   o.vendor        = null;
   o.version       = null;
   o.shaderVersion = null;
   o.vertexCount   = null;
   o.vertexConst   = null;
   o.fragmentConst = null;
   o.varyingCount  = null;
   o.samplerCount  = null;
   o.samplerSize   = null;
   o.calculateInstanceCount = SG3dContextCapability_calculateInstanceCount;
   return o;
}
function SG3dContextCapability_calculateInstanceCount(vertexCount, boneCount){
   var o = this;
   var vertexConstLimit = o.vertexCount;
   var constRequire = (3 * boneCount) + 4;
   var constLimit = (vertexConstLimit - 16) / constRequire;
   var instanceCount = constLimit;
   if(vertexCount > 0){
      var vertexCountLimit = 65535;
      var vertexLimit = vertexCountLimit / vertexCount;
      instanceCount = Math.min(instanceCount, vertexLimit);
   }
   instanceCount = Math.min(instanceCount, 256);
   return instanceCount;
}
function FG3dAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dEffect);
   o._optionBlendMode = true;
   o._supportVertexColor      = true;
   o._supportVertexCoord      = true;
   o._supportVertexNormal     = true;
   o._supportVertexNormalFull = true;
   o._supportInstance         = false;
   o._supportSkeleton         = false;
   o._supportAlpha = true;
   o._supportAmbient = true;
   o._supportDiffuse = true;
   o._supportDiffuseView = true;
   o._supportSpecularColor = true;
   o._supportSpecularLevel = true;
   o._supportSpecularView = true;
   o._supportLight = true;
   o._supportReflect = true;
   o._supportRefract = true;
   o._supportEmissive = true;
   o._supportHeight = true;
   o._supportEnvironment = true;
   o._dynamicSkeleton = true;
   o.buildInfo = FG3dAutomaticEffect_buildInfo;
   return o;
}
function FG3dAutomaticEffect_buildInfo(pt, pc){
   var o = this;
   var s = new TString();
   var cb = o._context.capability();
   var ac = pc.attributeContains(EG3dAttribute.Color);
   o._dynamicVertexColor = (o._supportVertexColor && ac);
   if(o._dynamicVertexColor){
      s.append("|AC");
      pt.setBoolean("vertex.attribute.color", true);
   }
   var ad = pc.attributeContains(EG3dAttribute.Coord);
   o._dynamicVertexCoord = (o._supportVertexCoord && ad);
   if(o._dynamicVertexCoord){
      s.append("|AD");
      pt.setBoolean("vertex.attribute.coord", true);
   }
   var an = pc.attributeContains(EG3dAttribute.Normal);
   o._dynamicVertexNormal = (o._supportVertexNormal && an);
   if(o._dynamicVertexNormal){
      s.append("|AN");
      pt.setBoolean("vertex.attribute.normal", true);
   }
   var ab = pc.attributeContains(EG3dAttribute.Binormal);
   var at = pc.attributeContains(EG3dAttribute.Tangent);
   var af = (an && ab && at);
   o._dynamicVertexNormalFull = (o._supportVertexNormalFull && af);
   if(o._dynamicVertexNormalFull){
      s.append("|AF");
      pt.setBoolean("vertex.attribute.normal.full", true);
   }
   o._dynamicInstance = (o._supportInstance && cb.optionInstance);
   if(o._dynamicInstance){
      s.append("|SI");
      if(pc){
         pt.setBoolean("support.instance", true);
      }
   }
   o._dynamicSkeleton = o._supportSkeleton;
   if(o._dynamicSkeleton){
      s.append("|SS");
      if(pc){
         pt.setBoolean("support.skeleton", true);
      }
   }
   var sdf  = pc.samplerContains(EG3dSampler.Diffuse);
   o._dynamicAlpha = o._supportAlpha;
   if(o._dynamicAlpha){
      s.append("|RA");
      if(pc){
         pt.setBoolean("support.alpha", true);
      }
      o._optionBlendMode = true;
   }else{
      o._optionBlendMode = false;
   }
   o._dynamicAmbient = o._supportAmbient;
   if(o._dynamicAmbient){
      s.append("|TA");
      if(pc){
         pt.setBoolean("support.ambient", true);
      }
      if(sdf){
         s.append("|TAS");
         if(pc){
            pt.setBoolean("support.ambient.sampler", true);
         }
      }
   }
   var snr = pc.samplerContains(EG3dSampler.Normal);
   o._dynamicDiffuse = o._supportDiffuse && (o._dynamicVertexNormal || snr);
   if(o._supportDiffuse){
      if(pc){
         pt.setBoolean("support.diffuse", true);
      }
      if(snr){
         s.append("|TDD");
         if(pc){
            pt.setBoolean("support.dump", true);
            pt.setBoolean("support.diffuse.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         s.append("|TDN");
         if(pc){
            pt.setBoolean("support.diffuse.normal", true);
         }
      }
   }
   o._dynamicDiffuseView = (o._supportDiffuseView && (o._dynamicVertexNormal || snr));
   if(o._supportDiffuseView){
      if(pc){
         pt.setBoolean("support.diffuse.view", true);
      }
      if(snr){
         s.append("|TDVD");
         if(pc){
            pt.setBoolean("support.dump", true);
            pt.setBoolean("support.diffuse.view.dump", true);
         }
      }else if(o._dynamicVertexNormal){
         s.append("|TDVN");
         if(pc){
            pt.setBoolean("support.diffuse.view.normal", true);
         }
      }
   }
   var spc = pc.samplerContains(EG3dSampler.SpecularColor);
   var spl = pc.samplerContains(EG3dSampler.SpecularLevel);
   o._dynamicSpecularColor = (o._supportSpecularColor && spc);
   o._dynamicSpecularLevel = (o._supportSpecularLevel && spl);
   if((o._dynamicSpecularColor || o._dynamicSpecularLevel) && o._dynamicVertexNormal){
      s.append("|TS");
      if(pc){
         pt.setBoolean("support.specular", true);
      }
      if(o._dynamicSpecularColor){
         s.append("|TSC");
         if(pc){
            pt.setBoolean("support.specular.color", true);
         }
      }
      if(o._dynamicSpecularLevel){
         s.append("|TSL");
         if(pc){
            pt.setBoolean("support.specular.level", true);
         }
      }else{
         s.append("|NSL");
         if(pc){
            pt.setBoolean("support.specular.normal", true);
         }
      }
   }
   o._dynamicSpecularView = o._supportSpecularView;
   if(o._dynamicSpecularView && o._dynamicVertexNormal){
      s.append("|TSV");
      if(pc){
         pt.setBoolean("support.specular.view", true);
      }
      if(o._dynamicSpecularColor){
         s.append("|TSVC");
         if(pc){
            pt.setBoolean("support.specular.view.color", true);
         }
      }
      if(o._dynamicSpecularLevel){
         s.append("|TSVL");
         if(pc){
            pt.setBoolean("support.specular.view.level", true);
         }
      }else{
         s.append("|NSVL");
         if(pc){
            pt.setBoolean("support.specular.view.normal", true);
         }
      }
   }
   var slg = pc.samplerContains(EG3dSampler.Light);
   o._dynamicLight = (o._supportLight && slg);
   if(o._dynamicLight){
      s.append("|TL");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.light", true);
      }
   }
   var slr = pc.samplerContains(EG3dSampler.Reflect);
   o._dynamicReflect = (o._supportReflect && slr);
   if(o._dynamicReflect){
      s.append("|TRL");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.reflect", true);
      }
   }
   var slf = pc.samplerContains(EG3dSampler.Refract);
   o._dynamicRefract = (o._supportRefract && slf);
   if(o._dynamicRefract){
      s.append("|TRF");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.refract", true);
      }
   }
   var sle = pc.samplerContains(EG3dSampler.Emissive);
   o._dynamicEmissive = (o._supportEmissive && sle);
   if(o._dynamicEmissive){
      s.append("|TLE");
      if(pc){
         pt.setBoolean("support.sampler.light", true);
         pt.setBoolean("support.emissive", true);
      }
   }
   var shg = pc.samplerContains(EG3dSampler.Height);
   o._dynamicHeight = (o._supportHeight && shg);
   if(o._dynamicHeight){
      s.append("|TH");
      if(pc){
         pt.setBoolean("support.height", true);
      }
   }
   var sen = pc.samplerContains(EG3dSampler.Environment);
   o._dynamicEnvironment = (o._supportEnvironment && sen);
   if(o._dynamicEnvironment){
      s.append("|TE");
      if(pc){
         pt.setBoolean("support.environment", true);
      }
   }
   if(o._dynamicSkeleton){
      pt.setBoolean("support.bone.weight.1", true);
      pt.setBoolean("support.bone.weight.2", true);
      pt.setBoolean("support.bone.weight.3", true);
      pt.setBoolean("support.bone.weight.4", true);
   }
   pt.set("bone.count", 32);
   pt.setBoolean("support.bone.weight.4", true);
   pt.code = s.toString();
}
function FG3dSampleAutomaticEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._context       = null;
   o._program       = null;
   o.drawRenderable = FG3dSampleAutomaticEffect_drawRenderable;
   o.load           = FG3dSampleAutomaticEffect_load;
   return o;
}
function FG3dSampleAutomaticEffect_drawRenderable(pr, r){
   var o = this;
   var c = o._context;
   var p = o._program;
   var prvp = pr.matrixViewProjection();
   var prcp = pr.cameraPosition();
   var prld = pr.lightDirection();
   if(p.hasAttribute()){
      var as = p.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         if(a._statusUsed){
            var vb = r.findVertexBuffer(a._linker);
            if(vb == null){
               throw new TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
            }
            p.setAttribute(a._name, vb, vb._formatCd);
         }
      }
   }
   if(p.hasSampler()){
      var ss = p.samplers();
      var sc = ss.count();
      for(var n = 0; n < sc; n++){
         var s = ss.value(n);
         if(s._statusUsed){
            var ln = s.linker();
            var sp = r.findTexture(ln);
            if(sp != null){
               p.setSampler(s.name(), sp.texture());
            }else{
            }
         }
      }
   }
   p.setParameter('vc_model_matrix', r.matrix());
   p.setParameter('vc_vp_matrix', prvp);
   p.setParameter('vc_camera_position', prcp);
   p.setParameter('vc_light_direction', prld);
   p.setParameter('fc_camera_position', prcp);
   p.setParameter('fc_light_direction', prld);
   var m = r.material();
   var mi = m.info();
   p.setParameterColor4('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameterColor4('fc_ambient_color', mi.ambientColor);
   p.setParameterColor4('fc_diffuse_color', mi.diffuseColor);
   p.setParameterColor4('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
   p.setParameterColor4('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameterColor4('fc_reflect_color', mi.reflectColor);
   if(mi.optionAlpha){
      c.setBlendFactors(true, EG3dBlendMode.SourceAlpha, EG3dBlendMode.OneMinusSourceAlpha);
   }else{
      c.setBlendFactors(false);
   }
   if(mi.optionDouble){
      c.setCullingMode(false);
   }else{
      c.setCullingMode(true, EG3dCullMode.Front);
   }
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib._count);
}
function FG3dSampleAutomaticEffect_load(){
   var o = this;
   var u = RBrowser.contentPath() + o._path + "simple.automatic.xml";
   o.loadUrl(u);
}
function FG3dSampleColorEffect(o){
   o = RClass.inherits(this, o, FG3dEffect);
   o._context       = null;
   o._program       = null;
   o.setParameter   = FG3dSampleColorEffect_setParameter;
   o.setSampler     = FG3dSampleColorEffect_setSampler;
   o.drawRenderable = FG3dSampleColorEffect_drawRenderable;
   o.loadUrl        = FG3dSampleColorEffect_loadUrl;
   return o;
}
function FG3dSampleColorEffect_setParameter(pn, pv, pc){
   this._program.setParameter(pn, pv, pc);
}
function FG3dSampleColorEffect_setSampler(pn, pt){
   this._program.setSampler(pn, pt);
}
function FG3dSampleColorEffect_drawRenderable(r){
   var o = this;
   var c = o._context;
   var p = o._program;
   if(p.hasAttribute()){
      var as = p.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         if(a._statusUsed){
            var vb = r.findVertexBuffer(a._linker);
            if(vb == null){
               throw new TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
            }
            p.setAttribute(a._name, vb, vb._formatCd);
         }
      }
   }
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib._count);
}
function FG3dSampleColorEffect_loadUrl(u){
   var o = this;
   var c = o._context;
   var x = RClass.create(FXmlConnection);
   var d = x.send(u);
   var p = o._program = c.createProgram();
   p.loadConfig(d);
   p.build();
   p.link();
}
function FG3dSampleSkeletonEffect(o){
   o = RClass.inherits(this, o, FG3dAutomaticEffect);
   o._supportSkeleton = true;
   o._context         = null;
   o._program         = null;
   o._data            = new Float32Array();
   o.drawRenderable   = FG3dSampleSkeletonEffect_drawRenderable;
   o.load             = FG3dSampleSkeletonEffect_load;
   return o;
}
function FG3dSampleSkeletonEffect_drawRenderable(pr, r){
   var o = this;
   var c = o._context;
   var p = o._program;
   var prvp = pr.matrixViewProjection();
   var prcp = pr.cameraPosition();
   var prld = pr.lightDirection();
   if(p.hasAttribute()){
      var as = p.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         if(a._statusUsed){
            var vb = r.findVertexBuffer(a._linker);
            if(vb == null){
               throw new TError("Can't find renderable vertex buffer. (linker={1})", a._linker);
            }
            p.setAttribute(a._name, vb, vb._formatCd);
         }
      }
   }
   if(p.hasSampler()){
      var ss = p.samplers();
      var sc = ss.count();
      for(var n = 0; n < sc; n++){
         var s = ss.value(n);
         if(s._statusUsed){
            var ln = s.linker();
            var sp = r.findTexture(ln);
            if(sp != null){
               p.setSampler(s.name(), sp.texture());
            }else{
            }
         }
      }
   }
   p.setParameter('vc_model_matrix', r.matrix());
   p.setParameter('vc_vp_matrix', prvp);
   p.setParameter('vc_camera_position', prcp);
   p.setParameter('vc_light_direction', prld);
   p.setParameter('fc_camera_position', prcp);
   p.setParameter('fc_light_direction', prld);
   var m = r.material();
   var mi = m.info();
   p.setParameterColor4('fc_color', mi.ambientColor);
   p.setParameter4('fc_vertex_color', mi.colorMin, mi.colorMax, mi.colorRate, mi.colorMerge);
   p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
   p.setParameterColor4('fc_ambient_color', mi.ambientColor);
   p.setParameterColor4('fc_diffuse_color', mi.diffuseColor);
   p.setParameterColor4('fc_specular_color', mi.specularColor);
   p.setParameter4('fc_specular', mi.specularBase, mi.specularRate, mi.specularAverage, mi.specularShadow);
   p.setParameterColor4('fc_specular_view_color', mi.specularViewColor);
   p.setParameter4('fc_specular_view', mi.specularViewBase, mi.specularViewRate, mi.specularViewAverage, mi.specularViewShadow);
   p.setParameterColor4('fc_reflect_color', mi.reflectColor);
   var bs = r.bones();
   if(bs){
      var bc = bs.count();
      if(bc > 32){
         bc = 32;
      }
      var d = RTypeArray.findTemp(EDataType.Float, 16 * bc);
      for(var i = 0; i < bc; i++){
         var b = bs.get(i);
         var m = b.matrix();
         m.writeData(d, 16 * i);
      }
      p.setParameter('vc_bone_matrix', d);
   }
   var ib = r.indexBuffer();
   c.drawTriangles(ib, 0, ib._count);
}
function FG3dSampleSkeletonEffect_load(){
   var o = this;
   var u = RBrowser.contentPath() + o._path + "simple.skeleton.xml";
   o.loadUrl(u);
}
function FG3dSampleTechnique(o){
   o = RClass.inherits(this, o, FG3dTechnique);
   o._pass = null;
   o.setup = FG3dSampleTechnique_setup;
   return o;
}
function FG3dSampleTechnique_setup(){
   var o = this;
   o.__base.FG3dTechnique.setup.call(o);
   o._pass = RClass.create(FG3dSampleTechniquePass);
   o._pass.linkContext(o._context);
   o._passes.push(o._pass);
}
function FG3dSampleTechniquePass(o){
   o = RClass.inherits(this, o, FG3dTechniquePass);
   return o;
}
function FWglContext(o){
   o = RClass.inherits(this, o, FG3dContext);
   o._native             = null;
   o._textureActiveSlot  = 0;
   o._parameters         = null;
   o._extensions         = null;
   o._data9              = null;
   o._data16             = null;
   o.construct           = FWglContext_construct;
   o.linkCanvas          = FWglContext_linkCanvas;
   o.parameters          = FWglContext_parameters;
   o.extensions          = FWglContext_extensions;
   o.createProgram       = FWglContext_createProgram;
   o.createVertexBuffer  = FWglContext_createVertexBuffer;
   o.createIndexBuffer   = FWglContext_createIndexBuffer;
   o.createFlatTexture   = FWglContext_createFlatTexture;
   o.createCubeTexture   = FWglContext_createCubeTexture;
   o.setViewPort         = FWglContext_setViewPort;
   o.setFillMode         = FWglContext_setFillMode;
   o.setDepthMode        = FWglContext_setDepthMode;
   o.setCullingMode      = FWglContext_setCullingMode;
   o.setBlendFactors     = FWglContext_setBlendFactors;
   o.setScissorRectangle = FWglContext_setScissorRectangle;
   o.setProgram          = FWglContext_setProgram;
   o.bindConst           = FWglContext_bindConst;
   o.bindVertexBuffer    = FWglContext_bindVertexBuffer;
   o.bindTexture         = FWglContext_bindTexture;
   o.clear               = FWglContext_clear;
   o.drawTriangles       = FWglContext_drawTriangles;
   o.present             = FWglContext_present;
   o.checkError          = FWglContext_checkError;
   return o;
}
function FWglContext_construct(){
   var o = this;
   o.__base.FG3dContext.construct.call(o);
   o._capability = new SWglContextCapability();
   o._data9 = new Float32Array(9);
   o._data16 = new Float32Array(16);
}
function FWglContext_linkCanvas(h){
   var o = this;
   o._hCanvas = h;
   if(h.getContext){
      var n = h.getContext('webgl');
      if(n == null){
         n = h.getContext('experimental-webgl');
      }
      if(n == null){
         throw new TError("Current browser can't support WebGL technique.");
      }
      o._native = n;
   }
   var g = o._native;
   o.setViewPort(h.width, h.height);
   o.setDepthMode(true, EG3dDepthMode.LessEqual);
   o.setCullingMode(true, EG3dCullMode.Front);
   var c = o._capability;
   c.vendor = g.getParameter(g.VENDOR);
   c.version = g.getParameter(g.VERSION);
   c.shaderVersion = g.getParameter(g.SHADING_LANGUAGE_VERSION);
   c.vertexCount = g.getParameter(g.MAX_VERTEX_ATTRIBS);
   c.vertexConst = g.getParameter(g.MAX_VERTEX_UNIFORM_VECTORS);
   c.varyingCount = g.getParameter(g.MAX_VARYING_VECTORS);
   c.fragmentConst = g.getParameter(g.MAX_FRAGMENT_UNIFORM_VECTORS);
   c.samplerCount = g.getParameter(g.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
   c.samplerSize = g.getParameter(g.MAX_TEXTURE_SIZE);
}
function FWglContext_parameters(){
   var o = this;
   var r = o._parameters;
   if(r){
      return r;
   }
   var ns =['ACTIVE_TEXTURE',
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
   var g = o._native;
   var c = ns.length;
   r = new Object();
   for(var i = 0; i < c; i++){
      var n = ns[i];
      r[n] = g.getParameter(g[n]);
   }
   o._parameters = r;
   return r;
}
function FWglContext_extensions(){
   var o = this;
   var r = o._extensions;
   if(r){
      return r;
   }
   var ns =[
      'ANGLE_instanced_arrays',
      'EXT_blend_minmax',
      'EXT_color_buffer_float',
      'EXT_color_buffer_half_float',
      'EXT_disjoint_timer_query',
      'EXT_frag_depth',
      'EXT_sRGB',
      'EXT_shader_texture_lod',
      'EXT_texture_filter_anisotropic',
      'OES_element_index_uint',
      'OES_standard_derivatives',
      'OES_texture_float',
      'OES_texture_float_linear',
      'OES_texture_half_float',
      'OES_texture_half_float_linear',
      'OES_vertex_array_object',
      'WEBGL_color_buffer_float',
      'WEBGL_compressed_texture_atc',
      'WEBGL_compressed_texture_es3',
      'WEBGL_compressed_texture_etc1',
      'WEBGL_compressed_texture_pvrtc',
      'WEBGL_compressed_texture_s3tc',
      'WEBGL_debug_renderer_info',
      'WEBGL_debug_shader_precision',
      'WEBGL_debug_shaders',
      'WEBGL_depth_texture',
      'WEBGL_draw_buffers',
      'WEBGL_draw_elements_no_range_check',
      'WEBGL_dynamic_texture',
      'WEBGL_lose_context',
      'WEBGL_security_sensitive_resources',
      'WEBGL_shared_resources',
      'WEBGL_subscribe_uniform',
      'WEBGL_texture_from_depth_video'];
   var g = o._native;
   var c = ns.length;
   r = new Object();
   for(var i = 0; i < c; i++){
      var n = ns[i];
      r[n] = g.getExtension(n);
   }
   o._extensions = r;
   return r;
}
function FWglContext_createProgram(){
   var o = this;
   var r = RClass.create(FWglProgram);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createVertexBuffer(){
   var o = this;
   var r = RClass.create(FWglVertexBuffer);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createIndexBuffer(){
   var o = this;
   var r = RClass.create(FWglIndexBuffer);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createFlatTexture(){
   var o = this;
   var r = RClass.create(FWglFlatTexture);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_createCubeTexture(){
   var o = this;
   var r = RClass.create(FWglCubeTexture);
   r.linkContext(o);
   r.setup();
   return r;
}
function FWglContext_setViewPort(w, h){
   var g = this._native;
   g.viewportWidth = w;
   g.viewportHeight = h;
   g.viewport(0, 0, w, h);
}
function FWglContext_setFillMode(){
}
function FWglContext_setDepthMode(f, v){
   var o = this;
   var g = o._native;
   if((o._optionDepth == f) && (o._depthModeCd == v)){
      return true;
   }
   if(o._optionDepth != f){
      if(f){
         g.enable(g.DEPTH_TEST);
      }else{
         g.disable(g.DEPTH_TEST);
      }
      o._optionDepth = f;
   }
   if(f && (o._depthModeCd != v)){
      var r = RWglUtility.convertDepthMode(g, v);
      g.depthFunc(r);
      o._depthModeCd = v;
   }
   return true;
}
function FWglContext_setCullingMode(f, v){
   var o = this;
   var g = o._native;
   if((o._optionCull == f) && (o._optionCull == v)){
      return true;
   }
   if(o._optionCull != f){
      if(f){
         g.enable(g.CULL_FACE);
      }else{
         g.disable(g.CULL_FACE);
      }
      o._optionCull = f;
   }
   if(f && (o._cullModeCd != v)){
      var r = RWglUtility.convertCullMode(g, v);
      g.cullFace(r);
      o._cullModeCd = v;
   }
   return true;
}
function FWglContext_setBlendFactors(f, vs, vt){
   var o = this;
   var g = o._native;
   if((o._statusBlend == f) && (o._blendSourceCd == vs) && (o._blendTargetCd == vt)){
      return true;
   }
   if(o._statusBlend != f){
      if(f){
         g.enable(g.BLEND);
      }else{
         g.disable(g.BLEND);
      }
      o._statusBlend = f;
   }
   if(f && ((o._blendSourceCd != vs) || (o._blendTargetCd != vt))){
      var gs = RWglUtility.convertBlendFactors(g, vs);
      var gt = RWglUtility.convertBlendFactors(g, vt);
      g.blendFunc(gs, gt);
      o._blendSourceCd = vs;
      o._blendTargetCd = vt;
   }
   return true;
}
function FWglContext_setScissorRectangle(l, t, w, h){
   this._native.scissor(l, t, w, h);
}
function FWglContext_setProgram(v){
   var o = this;
   var g = o._native;
   if(v != null){
      g.useProgram(v._native);
   }else{
      g.useProgram(null);
   }
   _program = v;
   var r = o.checkError("useProgram", "Set program failure. (program={1}, program_id={2})", v, v._native);
   return r;
}
function FWglContext_bindConst(shaderCd, slot, formatCd, pd, length){
   var o = this;
   var g = o._native;
   var r = true;
   switch (formatCd){
      case EG3dParameterFormat.Float1:{
         g.uniform1fv(slot, pd);
         r = o.checkError("uniform1fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, length={4})", shaderCd, slot, pd, length);
         break;
      }
      case EG3dParameterFormat.Float2:{
         g.uniform2fv(slot, pd);
         r = o.checkError("uniform2fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, length={4})", shaderCd, slot, pd, length);
         break;
      }
      case EG3dParameterFormat.Float3:{
         g.uniform3fv(slot, pd);
         r = o.checkError("uniform3fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, length={4})", shaderCd, slot, pd, length);
         break;
      }
      case EG3dParameterFormat.Float4:{
         g.uniform4fv(slot, pd);
         r = o.checkError("uniform4fv", "Bind const data failure. (shader_cd={1}, slot={2}, data={3}, length={4})", shaderCd, slot, pd, length);
         break;
      }
      case EG3dParameterFormat.Float3x3:{
         var dt = o._data9;
         dt[ 0] = pd[ 0];
         dt[ 1] = pd[ 4];
         dt[ 2] = pd[ 8];
         dt[ 3] = pd[ 1];
         dt[ 4] = pd[ 5];
         dt[ 5] = pd[ 9];
         dt[ 6] = pd[ 2];
         dt[ 7] = pd[ 6];
         dt[ 8] = pd[10];
         g.uniformMatrix3fv(slot, g.FALSE, dt);
         r = o.checkError("uniformMatrix3fv", "Bind const matrix3x3 failure. (shader_cd={1}, slot={2}, data={3}, length={4})", shaderCd, slot, pd, length);
         break;
      }
      case EG3dParameterFormat.Float4x3:{
         if(length % 48 != 0){
            RLogger.fatal(o, null, "Length is invalid. (length=%d)", length);
            return false;
         }
         var count = length / 48;
         g.uniform4fv(slot, pd);
         r = o.checkError("uniform4fv", "Bind const matrix4x3 failure. (shader_cd={1}, slot={2}, data={3}, length={4})", shaderCd, slot, pd, length);
         break;
      }
      case EG3dParameterFormat.Float4x4:{
         if(pd.constructor == Float32Array){
            g.uniformMatrix4fv(slot, g.FALSE, pd);
         }else if(pd.constructor == SMatrix3d){
            var dt = o._data16;
            pd.writeData(dt, 0);
            g.uniformMatrix4fv(slot, g.FALSE, dt);
         }else{
            throw new TError('Unknown data type.');
         }
         r = o.checkError("uniformMatrix4fv", "Bind const matrix4x4 failure. (shader_cd=%d, slot=%d, pData=0x%08X, length=%d)", shaderCd, slot, pd, length);
         break;
      }
   }
   return r;
}
function FWglContext_bindVertexBuffer(s, b, i, f){
   var o = this;
   var g = o._native;
   var r = true;
   var n = null;
   if(b != null){
      n = b._native;
   }
   g.bindBuffer(g.ARRAY_BUFFER, n);
   r = o.checkError("bindBuffer", "Bind buffer. (buffer_id=%d)", n);
   if(!r){
      return r;
   }
   if(b != null){
      g.enableVertexAttribArray(s);
      r = o.checkError("enableVertexAttribArray", "Enable vertex attribute array. (slot=%d)", s);
      if(!r){
         return r;
      }
   }else{
      g.disableVertexAttribArray(s);
      r = o.checkError("disableVertexAttribArray", "Disable vertex attribute array. (slot=%d)", s);
      return r;
   }
   var bs = b.stride;
   switch(f){
      case EG3dAttributeFormat.Float1:
         g.vertexAttribPointer(s, 1, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float2:
         g.vertexAttribPointer(s, 2, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float3:
         g.vertexAttribPointer(s, 3, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Float4:
         g.vertexAttribPointer(s, 4, g.FLOAT, false, bs, i);
         break;
      case EG3dAttributeFormat.Byte4:
         g.vertexAttribPointer(s, 4, g.UNSIGNED_BYTE, false, bs, i);
         break;
      case EG3dAttributeFormat.Byte4Normal:
         g.vertexAttribPointer(s, 4, g.UNSIGNED_BYTE, true, bs, i);
         break;
      default:
         RLogger.fatal(o, null, "Unknown vertex format. (format_cd=%d)", formatCd);
         break;
   }
   r = o.checkError("glVertexAttribPointer", "Bind vertex attribute pointer. (slot=%d, format_cd=%d)", s, f);
   return r;
}
function FWglContext_bindTexture(ps, pi, pt){
   var o = this;
   var g = o._native;
   var r = true;
   if(pt == null){
      g.bindTexture(g.TEXTURE_2D, null);
      r = o.checkError("bindTexture", "Bind texture clear failure. (slot=%d)", ps);
      return r;
   }
   if(o._textureActiveSlot != ps){
      g.uniform1i(ps, pi);
      g.activeTexture(g.TEXTURE0 + pi);
      r = o.checkError("activeTexture", "Active texture failure. (slot=%d, index=%d)", ps, pi);
      if(!r){
         return r;
      }
      o._renderTextureActiveSlot = ps;
   }
   switch(pt.textureCd()){
      case EG3dTexture.Flat2d:{
         g.bindTexture(g.TEXTURE_2D, pt._native);
         g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
         g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
         r = o.checkError("glBindTexture", "Bind texture failure. (texture_id=%d)", pt._native);
         if(!r){
            return r;
         }
         break;
      }
      case EG3dTexture.Cube:{
         g.bindTexture(g.TEXTURE_CUBE_MAP, pt._native);
         g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MIN_FILTER, g.NEAREST);
         g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_MAG_FILTER, g.NEAREST);
         g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
         g.texParameteri(g.TEXTURE_CUBE_MAP, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
         r = o.checkError("glBindTexture", "Bind texture failure. (texture_id=%d)", pt._native);
         if(!r){
            return r;
         }
         break;
      }
      default:{
         RLogger.fatal(o, null, "Unknown texture type.");
         break;
      }
   }
   return r;
}
function FWglContext_clear(r, g, b, a, d){
   var o = this;
   var c = o._native;
   c.clearColor(r, g, b, a);
   c.clearDepth(d);
   c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
}
function FWglContext_drawTriangles(b, i, c){
   var o = this;
   var g = o._native;
   var r = true;
   if(i == null){
      i = 0;
   }
   if(c == null){
      c = b.count;
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, b._native);
   r = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d, buffer_id)", b, i, c, b._native);
   if(!r){
       return r;
   }
   var strideCd = RWglUtility.convertIndexStride(g, b.strideCd);
   g.drawElements(g.TRIANGLES, c, strideCd, 2 * i);
   r = o.checkError("drawElements", "Draw triangles failure. (index=0x%08X, offset=%d, count=%d)", b, i, c);
   if(!r){
       return r;
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, null);
   r = o.checkError("bindBuffer", "Bind element array buffer failure. (index=0x%08X, offset=%d, count=%d)", b, i, c);
   if(!r){
       return r;
   }
   return r;
}
function FWglContext_present(){
}
function FWglContext_checkError(c, m, p1){
   if(!RRuntime.isDebug()){
      return true;
   }
   var o = this;
   var g = o._native;
   var r = false;
   var e = null;
   var es = null;
   while(true){
      e = g.getError();
      if(e == g.NO_ERROR){
         r = true;
         break;
      }
      switch(e){
         case g.INVALID_OPERATION:
            es = "Invalid operation.";
            break;
         case g.INVALID_ENUM:
            es = "Invalid enum.";
            break;
         case g.INVALID_VALUE:
            es = "Invalid value.";
            break;
         case g.INVALID_FRAMEBUFFER_OPERATION:
            es = "Invalid paramebuffer opeartion.";
            break;
         case g.OUT_OF_MEMORY:
            es = "Out of memory.";
            break;
         default:
            es = "Unknown";
            break;
      }
   }
   if(!r){
      RLogger.fatal(o, null, 'OpenGL check failure. (code={1}, description={2})', e, es);
   }
   return r;
}
function FWglCubeTexture(o){
   o = RClass.inherits(this, o, FG3dCubeTexture);
   o._native = null;
   o.setup   = FWglCubeTexture_setup;
   o.link    = FWglCubeTexture_link;
   o.upload  = FWglCubeTexture_upload;
   return o;
}
function FWglCubeTexture_setup(){
   var o = this;
   var g = o._context._native;
   o.__base.FG3dCubeTexture.setup.call(o);
   o._native = g.createTexture();
}
function FWglCubeTexture_link(v){
   this._texture = v;
}
function FWglCubeTexture_upload(x1, x2, y1, y2, z1, z2){
   var o = this;
   var c = o._context;;
   var g = c._native;
   g.bindTexture(g.TEXTURE_CUBE_MAP, o._native);
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, x2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, y2.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z1.image());
   g.texImage2D(g.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, g.RGB, g.RGB, g.UNSIGNED_BYTE, z2.image());
   var r = c.checkError("texImage2D", "Upload cube image failure.");
   o._statusLoad = r;
}
function FWglFlatTexture(o){
   o = RClass.inherits(this, o, FG3dFlatTexture);
   o._native = null;
   o.onImageLoad = FWglFlatTexture_onImageLoad;
   o.setup   = FWglFlatTexture_setup;
   o.loadUrl = FWglFlatTexture_loadUrl;
   o.upload  = FWglFlatTexture_upload;
   return o;
}
function FWglFlatTexture_onImageLoad(v){
   var o = this;
   var c = o._context;;
   var g = c._native;
   g.bindTexture(g.TEXTURE_2D, o._native);
   g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, v);
   var r = c.checkError("texImage2D", "");
   o._statusLoad = r;
}
function FWglFlatTexture_setup(){
   var o = this;
   var g = o._context._native;
   o.__base.FG3dFlatTexture.setup.call(o);
   o._native = g.createTexture();
}
function FWglFlatTexture_loadUrl(p){
   var o = this;
   var r = new Image();
   r.src = p;
   r.onload = function(){o.onImageLoad(this);}
}
function FWglFlatTexture_upload(p){
   var o = this;
   var c = o._context;;
   var g = c._native;
   g.bindTexture(g.TEXTURE_2D, o._native);
   g.texImage2D(g.TEXTURE_2D, 0, g.RGBA, g.RGBA, g.UNSIGNED_BYTE, p);
   var r = c.checkError("texImage2D", "Upload image failure.");
   o._statusLoad = r;
}
function FWglFragmentShader(o){
   o = RClass.inherits(this, o, FG3dFragmentShader);
   o._native = null;
   o.setup   = FWglFragmentShader_setup;
   o.upload  = FWglFragmentShader_upload;
   o.dispose = FWglFragmentShader_dispose;
   return o;
}
function FWglFragmentShader_setup(){
   var o = this;
   o.__base.FG3dFragmentShader.setup.call(o);
   var g = o._context._native;
   o._native = g.createShader(g.FRAGMENT_SHADER);
}
function FWglFragmentShader_upload(v){
   var o = this;
   var g = o._context._native;
   var n = o._native;
   g.shaderSource(n, v);
   g.compileShader(n);
   var r = g.getShaderParameter(n, g.COMPILE_STATUS);
   if(!r){
      var i = g.getShaderInfoLog(n);
      RLogger.fatal(o, null, 'Upload fragment shader source failure. (error={1})\n{2}', i, v);
      g.deleteShader(n);
      o._native = null;
      return false;
   }
   o._source = v;
   return true;
}
function FWglFragmentShader_dispose(){
   var o = this;
   var g = o._context._native;
   if(o._native){
      g.deleteShader(o._native);
   }
   o._native = null;
   o.__base.FG3dFragmentShader.dispose.call(o);
}
function FWglIndexBuffer(o){
   o = RClass.inherits(this, o, FG3dIndexBuffer);
   o.setup  = FWglIndexBuffer_setup;
   o.upload = FWglIndexBuffer_upload;
   return o;
}
function FWglIndexBuffer_setup(){
   var o = this;
   o.__base.FG3dIndexBuffer.setup.call(o);
   var g = o._context._native;
   o._native = g.createBuffer();
}
function FWglIndexBuffer_upload(pd, pc){
   var o = this;
   var c = o._context;
   var g = c._native;
   o.count  = pc;
   var d = null;
   if(pd.constructor == Array){
      d = new Uint16Array(pd);
   }else if(pd.constructor == Uint16Array){
      d = pd;
   }else{
      RLogger.fatal(o, null, 'Upload index data type is invalid. (value={1})', pd);
   }
   g.bindBuffer(g.ELEMENT_ARRAY_BUFFER, o._native);
   c.checkError('bindBuffer', 'Bindbuffer');
   g.bufferData(g.ELEMENT_ARRAY_BUFFER, d, g.STATIC_DRAW);
   c.checkError('bufferData', 'bufferData');
}
function FWglProgram(o){
   o = RClass.inherits(this, o, FG3dProgram);
   o._native        = null;
   o.setup          = FWglProgram_setup;
   o.vertexShader   = FWglProgram_vertexShader;
   o.fragmentShader = FWglProgram_fragmentShader;
   o.upload         = FWglProgram_upload;
   o.build          = FWglProgram_build;
   o.link           = FWglProgram_link;
   o.setAttribute   = FWglProgram_setAttribute;
   o.setParameter   = FWglProgram_setParameter;
   o.setParameter4  = FWglProgram_setParameter4;
   o.setParameterColor4 = FWglProgram_setParameterColor4;
   o.setSampler     = FWglProgram_setSampler;
   o.dispose        = FWglProgram_dispose;
   return o;
}
function FWglProgram_setup(){
   var o = this;
   var g = o._context._native;
   o._native = g.createProgram();
}
function FWglProgram_vertexShader(){
   var o = this;
   var s = o._vertexShader;
   if(s == null){
      s = RClass.create(FWglVertexShader);
      s.linkContext(o._context);
      s.setup();
      o._vertexShader = s;
   }
   return s;
}
function FWglProgram_fragmentShader(){
   var o = this;
   var s = o._fragmentShader;
   if(s == null){
      s = RClass.create(FWglFragmentShader);
      s.linkContext(o._context);
      s.setup();
      o._fragmentShader = s;
   }
   return s;
}
function FWglProgram_upload(t, s){
   var o = this;
   var g = o._context._native;
   if(t == EG3dShader.Vertex){
      var vs = o.vertexShader();
      vs.upload(s);
   }else if(t == EG3dShader.Fragment){
      var fs = o.fragmentShader();
      fs.upload(s);
   }else{
      throw new Error('Unknown type');
   }
}
function FWglProgram_build(){
   var o = this;
   var c = o._context;
   var g = c._native;
   var pn = o._native;
   var vs = o.vertexShader();
   g.attachShader(pn, vs._native);
   var r = c.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, vs._native);
   if(!r){
      return r;
   }
   var fs = o.fragmentShader();
   g.attachShader(pn, fs._native);
   var r = c.checkError("attachShader", "Attach shader failure. (program_id=%d, shader_id=%d)", pn, fs._native);
   if(!r){
      return r;
   }
   if(o.hasAttribute()){
      var as = o.attributes();
      var ac = as.count();
      for(var n = 0; n < ac; n++){
         var a = as.value(n);
         var an = a.name();
         g.bindAttribLocation(pn, n, an);
         r = c.checkError("bindAttribLocation", "Bind attribute location. (program_id=%d, slot=%d, name=%s)", pn, n, an);
         if(!r){
            return r;
         }
      }
   }
}
function FWglProgram_link(){
   var o = this;
   var c = o._context;
   var g = c._native;
   var r = false;
   var pn = o._native;
   g.linkProgram(pn);
   var pr = g.getProgramParameter(pn, g.LINK_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
      RLogger.fatal(this, null, "Link program failure. (status={1}, reason={2})", pr, pi);
      g.deleteProgram(o._native);
      o._native = null;;
      return false;
   }
   g.validateProgram(pn);
   var pr = g.getProgramParameter(pn, g.VALIDATE_STATUS);
   if(!pr){
      var pi = g.getProgramInfoLog(pn);
   }
   g.finish();
   r = c.checkError("finish", "Finish program link faliure. (program_id={1})", pn);
   if(!r){
      return r;
   }
   if(o.hasParameter()){
      var pc = o._parameters.count();
      for(var n = 0; n < pc; n++){
         var p = o._parameters.value(n);
         var i = g.getUniformLocation(pn, p.name());
         r = c.checkError("getUniformLocation", "Find parameter slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != null){
            p._statusUsed = true;
         }
      }
   }
   if(o.hasAttribute()){
      var pc = o._attributes.count();
      for(var n = 0; n < pc; n++){
         var p = o._attributes.value(n);
         var i = g.getAttribLocation(pn, p.name());
         r = c.checkError("getAttribLocation", "Find attribute slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != -1){
            p._statusUsed = true;
         }
      }
   }
   if(o.hasSampler()){
      var pc = o._samplers.count();
      for(var n = 0; n < pc; n++){
         var p = o._samplers.value(n);
         var i = g.getUniformLocation(pn, p.name());
         r = c.checkError("getUniformLocation", "Find sampler slot. (program_id=%d, name=%s, slot=%d)", pn, p.name(), i);
         if(!r){
            return r;
         }
         p._slot = i;
         if(i != null){
            p._statusUsed = true;;
         }
      }
      var si = 0;
      for(var n = 0; n < pc; n++){
         var p = o._samplers.value(n);
         if(p._statusUsed){
            p._index = si++;
         }
      }
   }
   return r;
}
function FWglProgram_setAttribute(pn, pb, pf){
   var o = this;
   var p = o.findAttribute(pn);
   o._context.bindVertexBuffer(p._slot, pb, 0, pf);
}
function FWglProgram_setParameter(pn, pv, pc){
   var o = this;
   var p = o.findParameter(pn);
   o._context.bindConst(null, p._slot, p._formatCd, pv, pc);
}
function FWglProgram_setParameter4(pn, px, py, pz, pw){
   var o = this;
   var p = o.findParameter(pn);
   var v = RTypeArray.float4();
   v[0] = px;
   v[1] = py;
   v[2] = pz;
   v[3] = pw;
   o._context.bindConst(null, p._slot, p._formatCd, v);
}
function FWglProgram_setParameterColor4(pn, pv){
   var o = this;
   var p = o.findParameter(pn);
   var v = RTypeArray.float4();
   v[0] = pv.red;
   v[1] = pv.green;
   v[2] = pv.blue;
   v[3] = pv.alpha;
   o._context.bindConst(null, p._slot, p._formatCd, v);
}
function FWglProgram_setSampler(pn, pt){
   var o = this;
   var p = o.findSampler(pn);
   o._context.bindTexture(p._slot, p._index, pt);
}
function FWglProgram_dispose(){
   var o = this;
   if(o._program){
      o._context._context.deleteProgram(o._program);
   }
   o._program = null;
   o.base.FProgram3d.dispose.call(o);
}
function FWglVertexBuffer(o){
   o = RClass.inherits(this, o, FG3dVertexBuffer);
   o.setup  = FWglVertexBuffer_setup;
   o.upload = FWglVertexBuffer_upload;
   return o;
}
function FWglVertexBuffer_setup(){
   var o = this;
   o.__base.FG3dVertexBuffer.setup.call(o);
   var g = o._context._native;
   o._native = g.createBuffer();
}
function FWglVertexBuffer_upload(v, s, c){
   var o = this;
   var c = o._context;
   var g = c._native;
   o.stride = s;
   o.count  = c;
   var d = null;
   if(v.constructor == Array){
      d = new Float32Array(v);
   }else if(v.constructor == Float32Array){
      d = v;
   }else{
      RLogger.fatal(o, null, 'Upload vertex data type is invalid. (value={1})', v);
   }
   g.bindBuffer(g.ARRAY_BUFFER, o._native);
   c.checkError('bindBuffer', 'Bindbuffer');
   g.bufferData(g.ARRAY_BUFFER, d, g.STATIC_DRAW);
   c.checkError('bufferData', 'bufferData');
}
function FWglVertexShader(o){
   o = RClass.inherits(this, o, FG3dVertexShader);
   o._native = null;
   o.setup   = FWglVertexShader_setup;
   o.upload  = FWglVertexShader_upload;
   o.dispose = FWglVertexShader_dispose;
   return o;
}
function FWglVertexShader_setup(){
   var o = this;
   o.__base.FG3dVertexShader.setup.call(o);
   var g = o._context._native;
   o._native = g.createShader(g.VERTEX_SHADER);
}
function FWglVertexShader_upload(v){
   var o = this;
   var g = o._context._native;
   var n = o._native;
   g.shaderSource(n, v);
   g.compileShader(n);
   var r = g.getShaderParameter(n, g.COMPILE_STATUS);
   if(!r){
      var i = g.getShaderInfoLog(n);
      RLogger.fatal(o, null, 'Upload vertex shader source failure. (error={1})\n{2}', i, v);
      g.deleteShader(n);
      o._native = null;
      return false;
   }
   o._source = v;
   return true;
}
function FWglVertexShader_dispose(){
   var o = this;
   var g = o._context._native;
   if(o._native){
      g.deleteShader(o._native);
   }
   o._native = null;
   o.__base.FG3dVertexShader.dispose.call(o);
}
var RWglUtility = new function RWglUtility(){
   var o = this;
   o.convertFillMode     = RWglUtility_convertFillMode;
   o.convertCullMode     = RWglUtility_convertCullMode;
   o.convertDepthMode    = RWglUtility_convertDepthMode;
   o.convertBlendFactors = RWglUtility_convertBlendFactors;
   o.convertIndexStride  = RWglUtility_convertIndexStride;
   return o;
}
function RWglUtility_convertFillMode(g, v){
   switch(v){
      case EG3dFillMode.Point:
         return g.POINT;
      case EG3dFillMode.Line:
         return g.LINE;
      case EG3dFillMode.Face:
         return g.FILL;
   }
   RLogger.fatal(this, null, "Convert fill mode failure. (fill_cd={1})", v);
   return g.FILL;
}
function RWglUtility_convertCullMode(g, v){
   switch(v){
      case EG3dCullMode.Front:
         return g.FRONT;
      case EG3dCullMode.Back:
         return g.BACK;
      case EG3dCullMode.Both:
         return g.FRONT_AND_BACK;
   }
   RLogger.fatal(this, null, "Convert cull mode failure. (cull_cd={1})", v);
   return g.FRONT;
}
function RWglUtility_convertDepthMode(g, v){
   switch(v){
      case EG3dDepthMode.Equal:
         return g.EQUAL;
      case EG3dDepthMode.NotEqual:
         return g.NOTEQUAL;
      case EG3dDepthMode.Less:
         return g.LESS;
      case EG3dDepthMode.LessEqual:
         return g.LEQUAL;
      case EG3dDepthMode.Greater:
         return g.GREATER;
      case EG3dDepthMode.GreaterEqual:
         return g.GEQUAL;
      case EG3dDepthMode.Always:
         return g.ALWAYS;
   }
   RLogger.fatal(this, null, "Convert depth mode failure. (depth_cd={1})", v);
   return g.LESS;
}
function RWglUtility_convertBlendFactors(g, v){
   switch(v){
      case EG3dBlendMode.SourceAlpha:
         return g.SRC_ALPHA;
      case EG3dBlendMode.OneMinusSourceAlpha:
         return g.ONE_MINUS_SRC_ALPHA;
      default:
         break;
   }
   RLogger.fatal(this, null, "Convert blend factors failure. (blend_cd={1})", v);
   return 0;
}
function RWglUtility_convertIndexStride(g, v){
   switch(v){
      case EG3dIndexStride.Uint16:
         return g.UNSIGNED_SHORT;
      case EG3dIndexStride.Uint32:
         return g.UNSIGNED_INT;
   }
   RLogger.fatal(this, null, "Convert index stride failure. (stride_cd={1})", v);
   return 0;
}
function SWglContextCapability(o){
   if(!o){o = this;}
   SG3dContextCapability(o);
   return o;
}
