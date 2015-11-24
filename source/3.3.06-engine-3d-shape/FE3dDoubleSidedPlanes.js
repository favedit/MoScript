//==========================================================
// <T>渲染双面矩形集合。</T>
//  
//  00 ── 01 
//  │      │
//  │      │
//  03 ── 02
//
// @class
// @author adu
// @history 150207
//==========================================================
MO.FE3dDoubleSidedPlanes = function FE3dDoubleSidedPlanes(o) {
   o = MO.Class.inherits(this, o, MO.FE3dDisplay);
   //..........................................................
   // @attribute
   o._front                   = null;
   o._back                    = null;
   o._axis                    = MO.Class.register(o, new MO.AGetSet('_axis'));
   o._frontUrl                = MO.Class.register(o, new MO.AGetSet('_frontUrl'));
   o._backUrl                 = MO.Class.register(o, new MO.AGetSet('_backUrl'));
   o._size                    = MO.Class.register(o, new MO.AGetter('_size'));
   o._splits                  = MO.Class.register(o, new MO.AGetter('_splits'));
   //..........................................................
   // @method
   o.construct                = MO.FE3dDoubleSidedPlanes_construct;
   o.setup                    = MO.FE3dDoubleSidedPlanes_setup;
   o.addPlaneRotation         = MO.FE3dDoubleSidedPlanes_addPlaneRotation;
   o.addPlaneRotationAxis     = MO.FE3dDoubleSidedPlanes_addPlaneRotationAxis;
   o.update                   = MO.FE3dDoubleSidedPlanes_update;
   o.turningAnimation         = MO.FE3dDoubleSidedPlanes_turningAnimation;
   return o;
}

MO.FE3dDoubleSidedPlanes_construct = function FE3dDoubleSidedPlanes_construct() {
   var o = this;
   o.__base.FE3dDisplay.construct.call(o);
   //设置属性
   o._size = new MO.SSize2();
   o._splits = new MO.SSize2();
}

MO.FE3dDoubleSidedPlanes_setup = function FE3dDoubleSidedPlanes_setup() {
   var o = this;
   if(!o._axis) {
      o._axis = new MO.SVector3(1, 1, 0);
   }
   o._axis.normalize();

   var front = o._front = MO.Class.create(MO.FE3dPlanes);
   front.linkGraphicContext(o);
   front.setOptionSelect(false);
   front.size().assign(o._size);
   front.splits().assign(o._splits);
   front.setUrl(o._frontUrl);
   front.material().info().sortLevel = 1;
   front.material().info().alphaRate = 1;
   front.setup();
   front.setVisible(true);
   o.push(front);

   var back = o._back = MO.Class.create(MO.FE3dPlanes);
   back.linkGraphicContext(o);
   back.setOptionSelect(false);
   back.size().assign(o._size);
   back.splits().assign(o._splits);
   back.setInitRotationAxis(o._axis, Math.PI);
   back.setUrl(o._backUrl);
   back.material().info().sortLevel = 1;
   back.material().info().alphaRate = 1;
   back.setup();
   back.setVisible(true);
   o.push(back);
}

MO.FE3dDoubleSidedPlanes_addPlaneRotation = function FE3dDoubleSidedPlanes_addPlaneRotation(planeX, planeY, x, y, z) {
   var o = this;
   var front = o._front;
   front.rotatePlane(planeX, planeY, x, y, z);
   var back = o._back;
   back.rotatePlane(planeX, planeY, x, y, z);
}

MO.FE3dDoubleSidedPlanes_addPlaneRotationAxis = function FE3dDoubleSidedPlanes_addPlaneRotationAxis(planeX, planeY, axis, angle) {
   var o = this;
   var front = o._front;
   front.rotatePlaneAxis(planeX, planeY, axis, angle);
   var back = o._back;
   back.rotatePlaneAxis(planeX, planeY, axis, angle);
}

MO.FE3dDoubleSidedPlanes_update = function FE3dDoubleSidedPlanes_update() {
   var o = this;
   o._front.updateAll();
   o._back.updateAll();
}

MO.FE3dDoubleSidedPlanes_turningAnimation = function FE3dDoubleSidedPlanes_turningAnimation() {
   var o = this;
   var section = MO.Class.create(MO.FTimelineSection);
   var splits = o._splits;
   var duration = 400;
   var start = new MO.SValue2(0, splits.height-1);
   for (var i = 0; i < splits.width; i++) {
      for (var j = 0; j < splits.height; j++) {
         var length = start.length2(i ,j);
         var delay = 1000 + length * 100;

         var front = o._front.getPlane(i, j);
         var action = MO.Class.create(MO.FE3dBoomerangTimelineAction);
         action.targetTranslate().set(0, 0, -2);
         action.setOptionSin(true);
         action.setDelay(delay)
         action.setDuration(duration);
         action.link(front.matrix());
         section.pushAction(action);
         var action = MO.Class.create(MO.FE3dRotateAxisTimelineAction);
         action.targetAxis().set(o._axis.x, o._axis.y, o._axis.z);
         action.setTargetAngle(Math.PI);
         action.setDelay(delay)
         action.setDuration(duration);
         action.link(front.matrix());
         section.pushAction(action);

         var back = o._back.getPlane(i, j);
         var action = MO.Class.create(MO.FE3dBoomerangTimelineAction);
         action.targetTranslate().set(0, 0, -2);
         action.setOptionSin(true);
         action.setDelay(delay)
         action.setDuration(duration);
         action.link(back.matrix());
         section.pushAction(action);
         var action = MO.Class.create(MO.FE3dRotateAxisTimelineAction);
         action.targetAxis().set(o._axis.x, o._axis.y, o._axis.z);
         action.setTargetAngle(Math.PI);
         action.setDelay(delay)
         action.setDuration(duration);
         action.link(back.matrix());
         section.pushAction(action);
      }
   }
   return section;
}