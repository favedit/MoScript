//==========================================================
// <T>页面框架枚举。</T>
//
// @enum
// @author maocy
// @version 150210
//==========================================================
var EDsFrameSet = new function EDsFrameSet(){
   var o = this;
   // @member 私有框架页面
   o.PrivateSolutionFrameSet = 'resource.private.solution.FrameSet';
   o.PrivateProjectFrameSet  = 'resource.private.project.FrameSet';
   o.PrivateResourceFrameSet = 'resource.private.resource.FrameSet';
   o.PrivateBitmapFrameSet   = 'resource.private.bitmap.FrameSet';
   o.PrivateMaterialFrameSet = 'resource.private.material.FrameSet';
   o.PrivateModelFrameSet    = 'resource.private.model.FrameSet';
   o.PrivateTemplateFrameSet = 'resource.private.template.FrameSet';
   o.PrivateSceneFrameSet    = 'resource.private.scene.FrameSet';
   // @member 共享框架页面
   o.ShareResourceFrameSet   = 'resource.share.resource.FrameSet';
   o.ShareBitmapFrameSet     = 'resource.share.bitmap.FrameSet';
   o.ShareMaterialFrameSet   = 'resource.share.material.FrameSet';
   o.ShareModelFrameSet      = 'resource.share.model.FrameSet';
   o.ShareTemplateFrameSet   = 'resource.share.template.FrameSet';
   o.ShareSceneFrameSet      = 'resource.share.scene.FrameSet';
   return o;
}
