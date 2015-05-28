function FGameObject(o){
   o = RClass.inherits(this, o, FObject);
   return o;
}
function FGmTemplateObject(o){
   o = RClass.inherits(this, o, FObject);
   return o;
}
var EGmEntityAction = new function EGmEntityAction(){
   var o = this;
   o.Unknown  = 0;
   o.ClipPlay = 1;
   o.Move     = 2;
   o.Rotation = 3;
   o.Scale    = 4;
   return o;
}
var EGmEntityClipAction = new function EGmEntityClipAction(){
   var o = this;
   o.Unknown  = 0;
   o.Play  = 1;
   o.Reset = 2;
   return o;
}
function SGmEntityClipAction(){
   var o = this;
   o.typeCd      = EGmEntityClipAction.Play;
   o.code        = null;
   o.count       = 0;
   o.optionForce = false;
   o.optionReset = false;
   return o;
}
function FGmEntity(o){
   o = RClass.inherits(this, o, FComponent);
   o._location      = null;
   o._rotation      = null;
   o._scale         = null;
   o._controllers   = null;
   o._displays      = null;
   o.construct      = FGmEntity_construct;
   o.location       = FGmEntity_location;
   o.rotation       = FGmEntity_rotation;
   o.scale          = FGmEntity_scale;
   o.findController = FGmEntity_findController;
   o.hasDisplay     = FGmEntity_hasDisplay;
   o.findDisplay    = FGmEntity_findDisplay;
   o.displays       = FGmEntity_displays;
   o.pushDisplay    = FGmEntity_pushDisplay;
   o.removeDisplay  = FGmEntity_removeDisplay;
   o.selectClip     = FGmEntity_selectClip;
   o.update         = FGmEntity_update;
   o.process        = FGmEntity_process;
   o.dispose        = FGmEntity_dispose;
   return o;
}
function FGmEntity_construct(){
   var o = this;
   o.__base.FComponent.construct.call(o);
   o._location = new SPoint3(0, 0, 0);
   o._rotation = new SVector3(0, 0, 0);
   o._scale = new SVector3(1, 1, 1);
   o._controllers = new TDictionary();
}
function FGmEntity_location(){
   return this._location;
}
function FGmEntity_rotation(){
   return this._rotation;
}
function FGmEntity_scale(){
   return this._scale;
}
function FGmEntity_findController(clazz){
   var o = this;
   var className = RClass.name(clazz);
   var controller = o._controllers.get(className);
   if(!controller){
      controller = RClass.create(clazz);
      controller.linkEntity(o);
      o._controllers.set(className, controller);
   }
   return controller;
}
function FGmEntity_hasDisplay(){
   var displays = this._displays;
   if(displays){
      return !displays.isEmpty();
   }
   return false;
}
function FGmEntity_findDisplay(code){
   var o = this;
   var displays = o._displays;
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         if(display.code() == code){
            return display;
         }
      }
   }
   return null
}
function FGmEntity_displays(){
   return this._displays;
}
function FGmEntity_pushDisplay(display){
   var o = this;
   var displays = o._displays;
   if(!displays){
      displays = o._displays = new TObjects();
   }
   displays.push(display);
}
function FGmEntity_removeDisplay(display){
   this._displays.remove(display);
}
function FGmEntity_selectClip(code){
   var o = this;
   var displays = o._displays;
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         display.selectClip(code);
      }
   }
}
function FGmEntity_update(){
   var o = this;
   var location = o._location;
   var rotation = o._rotation;
   var scale = o._scale;
   var displays = o._displays;
   if(displays){
      var count = displays.count();
      for(var i = 0; i < count; i++){
         var display = displays.at(i);
         var matrix = display.matrix();
         matrix.setAll(location.x, location.z, location.y, rotation.x, rotation.z, rotation.y, scale.x, scale.z, scale.y);
         matrix.update();
      }
   }
}
function FGmEntity_process(){
}
function FGmEntity_dispose(){
   var o = this;
   o._location = RObject.dispose(o._location);
   o._rotation = RObject.dispose(o._rotation);
   o._scale = RObject.dispose(o._scale);
   o.__base.FComponent.dispose.call(o);
}
function FGmEntityClipController(o){
   o = RClass.inherits(this, o, FGmEntityController);
   o._queue     = null;
   o.construct  = FGmEntityClipController_construct;
   o.play       = FGmEntityClipController_play;
   o.process    = FGmEntityClipController_process;
   o.dispose    = FGmEntityClipController_dispose;
   return o;
}
function FGmEntityClipController_construct(){
   var o = this;
   o.__base.FGmEntityController.construct.call(o);
   o._queue = new TObjects();
}
function FGmEntityClipController_play(action){
   var o = this;
   o._queue.push(action);
}
function FGmEntityClipController_process(){
   var o = this;
   o.__base.FGmEntityController.process.call(o);
}
function FGmEntityClipController_dispose(){
   var o = this;
   o.__base.FGmEntityController.dispose.call(o);
}
function FGmEntityController(o){
   o = RClass.inherits(this, o, FComponent);
   o._entity    = null;
   o.construct  = FGmEntityController_construct;
   o.linkEntity = FGmEntityController_linkEntity;
   o.process    = FGmEntityController_process;
   o.dispose    = FGmEntityController_dispose;
   return o;
}
function FGmEntityController_construct(){
   var o = this;
   o.__base.FComponent.construct.call(o);
}
function FGmEntityController_linkEntity(entity){
   var o = this;
   o._entity = entity;
}
function FGmEntityController_process(){
}
function FGmEntityController_dispose(){
   var o = this;
   o.__base.FComponent.dispose.call(o);
}
function FGmEntityMoveController(o){
   o = RClass.inherits(this, o, FGmEntityController);
   o.construct  = FGmEntityMoveController_construct;
   o.dispose    = FGmEntityMoveController_dispose;
   return o;
}
function FGmEntityMoveController_construct(){
   var o = this;
   o.__base.FGmEntityController.construct.call(o);
}
function FGmEntityMoveController_dispose(){
   var o = this;
   o.__base.FGmEntityController.dispose.call(o);
}
function FGmNpcEntity(o){
   o = RClass.inherits(this, o, FGmSpriteEntity);
   o.construct  = FGmNpcEntity_construct;
   o.dispose    = FGmNpcEntity_dispose;
   return o;
}
function FGmNpcEntity_construct(){
   var o = this;
   o.__base.FGmSpriteEntity.construct.call(o);
}
function FGmNpcEntity_dispose(){
   var o = this;
   o.__base.FGmSpriteEntity.dispose.call(o);
}
function FGmPlayerEntity(o){
   o = RClass.inherits(this, o, FGmRoleEntity);
   o.construct  = FGmPlayerEntity_construct;
   o.dispose    = FGmPlayerEntity_dispose;
   return o;
}
function FGmPlayerEntity_construct(){
   var o = this;
   o.__base.FGmRoleEntity.construct.call(o);
}
function FGmPlayerEntity_dispose(){
   var o = this;
   o.__base.FGmRoleEntity.dispose.call(o);
}
function FGmRoleEntity(o){
   o = RClass.inherits(this, o, FGmNpcEntity);
   o.construct  = FGmRoleEntity_construct;
   o.dispose    = FGmRoleEntity_dispose;
   return o;
}
function FGmRoleEntity_construct(){
   var o = this;
   o.__base.FGmNpcEntity.construct.call(o);
}
function FGmRoleEntity_dispose(){
   var o = this;
   o.__base.FGmNpcEntity.dispose.call(o);
}
function FGmSpriteEntity(o){
   o = RClass.inherits(this, o, FGmEntity);
   o._birthLocation   = null;
   o._targetLocation  = null;
   o._targetDirection = null;
   o._targetScale     = null;
   o._moveInterval    = 25;
   o._moveLastTick    = 0;
   o._moveSpeed       = 1;
   o.construct        = FGmSpriteEntity_construct;
   o.moveForward      = FGmSpriteEntity_moveForward;
   o.moveRotation     = FGmSpriteEntity_moveRotation;
   o.dispose          = FGmSpriteEntity_dispose;
   return o;
}
function FGmSpriteEntity_construct(){
   var o = this;
   o.__base.FGmEntity.construct.call(o);
   o._targetLocation = new SPoint3(0, 0, 0);
   o._targetDirection = new SVector3(0, -1, 0);
   o._scale = new SVector3(1, 1, 1);
}
function FGmEntity_setTargetDirection(x, y, z){
   var direction = this._targetDirection;
   direction.set(x, y, z);
   direction.normalize();
}
function FGmSpriteEntity_moveForward(distance){
   var o = this;
   o._location.x += o._targetDirection.x * distance;
   o._location.y += o._targetDirection.y * distance;
   o._location.z += o._targetDirection.z * distance;
}
function FGmSpriteEntity_moveRotation(angle){
   var o = this;
   o._rotation.z += angle;
   var value = o._rotation.z + Math.PI;
   var direction = o._targetDirection;
   direction.x = Math.sin(value);
   direction.y = Math.cos(value);
}
function FGmSpriteEntity_dispose(){
   var o = this;
   o._targetLocation = RObject.dispose(o._targetLocation);
   o._targetDirection = RObject.dispose(o._targetDirection);
   o._targetScale = RObject.dispose(o._targetScale);
   o.__base.FGmEntity.dispose.call(o);
}
function FGmStillEntity(o){
   o = RClass.inherits(this, o, FGmEntity);
   o.construct  = FGmStillEntity_construct;
   o.dispose    = FGmStillEntity_dispose;
   return o;
}
function FGmStillEntity_construct(){
   var o = this;
   o.__base.FGmEntity.construct.call(o);
}
function FGmStillEntity_dispose(){
   var o = this;
   o.__base.FGmEntity.dispose.call(o);
}
function FGmSceneObject(o){
   o = RClass.inherits(this, o, FObject);
   return o;
}
function FGmStageObject(o){
   o = RClass.inherits(this, o, FObject);
   return o;
}
