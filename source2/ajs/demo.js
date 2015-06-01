with(MO){
   MO.FE3dGalaxy = function FE3dGalaxy(o){
      o = RClass.inherits(this, o, FE3dRenderable);
      o._seed                 = 0;
      o._cellSize             = null;
      o._size                 = null;
      o._lineColor            = null;
      o._lineCenterColor      = null;
      o._radius               = 0;
      o._vertexSpecialBuffer  = null;
      o._vertexPositionBuffer = null;
      o._vertexCoordBuffer    = null;
      o._vertexColorBuffer    = null;
      o._vertexSpecialData    = null;
      o._vertexPositionData   = null;
      o._vertexCoordData      = null;
      o._vertexColorData      = null;
      o._indexData            = null;
      o.construct             = FE3dGalaxy_construct;
      o.generatePixel         = FE3dGalaxy_generatePixel;
      o.setup                 = FE3dGalaxy_setup;
      return o;
   }
   MO.FE3dGalaxy_construct = function FE3dGalaxy_construct(){
      var o = this;
      o.__base.FE3dRenderable.construct.call(o);
      o._material = RClass.create(FE3dMaterial);
      o._cellSize = new SSize2();
      o._cellSize.set(2, 2);
      o._size = new SSize2();
      o._size.set(16, 16);
   }
   MO.FE3dGalaxy_generatePixel = function FE3dGalaxy_generatePixel(i, ix, iy, x, y, d){
      var o = this;
      var di = (o._size.width * iy + ix) * 4;
      var cr = d[di++];
      var cg = d[di++];
      var cb = d[di++];
      var r = 1 - Math.sqrt(x * x + y * y) / o._radius;
      for(var ci = 0; ci < 1; ci++){
         var vd = [
            x, 0, y, r,
            x, 0, y, r,
            x, 0, y, r,
            x, 0, y, r];
         RFloat.copy(o._vertexSpecialData, 16 * i, vd, 0, 16);
         var s = 0.5;
         var vd = [
            x - s, 0, y + s,
            x + s, 0, y + s,
            x + s, 0, y - s,
            x - s, 0, y - s];
         RFloat.copy(o._vertexPositionData, 12 * i, vd, 0, 12);
         var vd = [
            0, 1,
            1, 1,
            1, 0,
            0, 0];
         RFloat.copy(o._vertexCoordData, 8 * i, vd, 0, 8);
         var vd = [
            cr, cg, cb, 1,
            cr, cg, cb, 1,
            cr, cg, cb, 1,
            cr, cg, cb, 1];
         RFloat.copy(o._vertexColorData, 16 * i, vd, 0, 16);
         var ib = i * 4;
         var id = [ib + 0, ib + 1, ib + 2, ib + 0, ib + 2, ib + 3];
         RInteger.copy(o._indexData, 6 * i, id, 0, 6);
      }
   }
   MO.FE3dGalaxy_setup = function FE3dGalaxy_setup(p){
      var o = this;
      var c = o._graphicContext;
      var dw = o._size.width;
      var dw2 = dw / 2;
      var dh = o._size.height;
      var dh2 = dh / 2;
      var sw = o._cellSize.width;
      var sh = o._cellSize.height;
      o._radius = Math.sqrt(dw2 * dw2 + dh2 * dh2);
      var tc = (dw / sw) * (dh / sh);
      var vc = 4 * tc;
      o._vertexCount = vc;
      o._vertexSpecialData = new Float32Array(4 * vc);
      o._vertexPositionData = new Float32Array(3 * vc);
      o._vertexCoordData = new Float32Array(2 * vc);
      o._vertexColorData = new Uint8Array(4 * vc);
      o._indexData = new Array(6 * tc);
      var i = 0;
      for(var y = 0; y < dh; y += sh){
         for(var x = 0; x < dw; x += sw){
            o.generatePixel(i++, x, y, x - dw2, y - dh2, p);
         }
      }
      var vb = o._vertexSpecialBuffer = c.createVertexBuffer();
      vb.setCode('special');
      vb._formatCd = EG3dAttributeFormat.Float4;
      vb.upload(o._vertexSpecialData, 4 * 4, vc);
      o.pushVertexBuffer(vb);
      var vb = o._vertexPositionBuffer = c.createVertexBuffer();
      vb.setCode('position');
      vb._formatCd = EG3dAttributeFormat.Float3;
      vb.upload(o._vertexPositionData, 4 * 3, vc);
      o.pushVertexBuffer(vb);
      var vb = o._vertexCoordBuffer = c.createVertexBuffer();
      vb.setCode('coord');
      vb._formatCd = EG3dAttributeFormat.Float2;
      vb.upload(o._vertexCoordData, 4 * 2, vc);
      o.pushVertexBuffer(vb);
      var vb = o._vertexColorBuffer = c.createVertexBuffer();
      vb.setCode('color');
      vb._formatCd = EG3dAttributeFormat.Byte4Normal;
      vb.upload(o._vertexColorData, 4, vc);
      o.pushVertexBuffer(vb);
      var ib = o._indexBuffer = c.createIndexBuffer();
      var i32 = context.capability().optionIndex32;
      if(i32){
         ib._strideCd = EG3dIndexStride.Uint32;
         ib.upload(new Uint32Array(o._indexData), 6 * tc);
      }else{
         ib._strideCd = EG3dIndexStride.Uint16;
         ib.upload(new Uint16Array(o._indexData), 6 * tc);
      }
      var mi = o.material().info();
      mi.effectCode = 'galaxy';
      mi.ambientColor.set(1, 1, 1, 1);
   }
}
with(MO){
   MO.FE3dGalaxyEffect = function FE3dGalaxyEffect(o){
      o = RClass.inherits(this, o, FG3dAutomaticEffect);
      o._code          = 'galaxy.automatic';
      o.drawRenderable = FE3dGalaxyEffect_drawRenderable;
      return o;
   }
   MO.FE3dGalaxyEffect_drawRenderable = function FE3dGalaxyEffect_drawRenderable(pg, pr){
      var o = this;
      var c = o._graphicContext;
      var g = c._native;
      var p = o._program;
      var vp = pg.calculate(EG3dRegionParameter.CameraPosition);
      var m = pr.material();
      var mi = m.info();
      o.bindMaterial(m);
      p.setParameter4('vc_rotation', pr._seed, 0, 0, 0);
      p.setParameter('vc_model_matrix', pr.currentMatrix());
      p.setParameter('vc_vp_matrix', pg.calculate(EG3dRegionParameter.CameraViewProjectionMatrix));
      p.setParameter('vc_camera_position', vp);
      p.setParameter4('fc_alpha', mi.alphaBase, mi.alphaRate, mi.alphaLevel, mi.alphaMerge);
      p.setParameter('fc_ambient_color', mi.ambientColor);
      o.bindAttributes(pr);
      o.bindSamplers(pr);
      c.drawTriangles(pr.indexBuffer());
   }
}
with(MO){
   MO.RE3dDemo = function RE3dDemo(){
      var o = this;
      o._setuped = false;
      o.onSetup  = RE3dDemo_onSetup;
      o.setup    = RE3dDemo_setup;
      return o;
   }
   MO.RE3dDemo_onSetup = function RE3dDemo_onSetup(){
      var ec = RConsole.find(FG3dEffectConsole);
      ec.register('control.control.galaxy', FE3dGalaxyEffect);
   }
   MO.RE3dDemo_setup = function RE3dDemo_setup(){
      var o = this;
      if(!o._setuped){
         o.onSetup();
         o._setuped = true;
      }
   }
   MO.RE3dDemo = new RE3dDemo();
}
