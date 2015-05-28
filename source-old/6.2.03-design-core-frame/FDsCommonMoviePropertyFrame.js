//==========================================================
// <T>场景动画属性页面。</T>
//
// @class
// @author maocy
// @history 150316
//==========================================================
function FDsCommonMoviePropertyFrame(o){
   o = RClass.inherits(this, o, FUiForm);
   //..........................................................
   // @attribute
   o._visible         = false;
   // @attribute
   o._activeSpace     = null;
   o._activeMovie = null;
   // @attribute
   o._controlGuid     = null;
   o._controlCode     = null;
   o._controlLabel    = null;
   // @event
   //..........................................................
   o.onBuilded        = FDsCommonMoviePropertyFrame_onBuilded;
   o.onDataChanged    = FDsCommonMoviePropertyFrame_onDataChanged;
   //..........................................................
   // @method
   o.construct        = FDsCommonMoviePropertyFrame_construct;
   // @method
   o.loadObject       = FDsCommonMoviePropertyFrame_loadObject;
   // @method
   o.dispose          = FDsCommonMoviePropertyFrame_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FDsCommonMoviePropertyFrame_construct(){
   var o = this;
   // 父处理
   o.__base.FUiForm.construct.call(o);
}

//==========================================================
// <T>构建完成处理。</T>
//
// @method
// @param p:event:TEventProcess 事件处理
//==========================================================
function FDsCommonMoviePropertyFrame_onBuilded(p){
   var o = this;
   o.__base.FUiForm.onBuilded.call(o, p);
   // 关联对象
   o._controlCode.addDataChangedListener(o, o.onDataChanged);
   o._controlLabel.addDataChangedListener(o, o.onDataChanged);
   // 关联对象
   o._controlInterval.addDataChangedListener(o, o.onDataChanged);
   o._controlRotation.addDataChangedListener(o, o.onDataChanged);
}

//==========================================================
// <T>数据改变处理。</T>
// <P>不改变渲染器代码。</P>
//
// @method
// @param p:event:SEvent 事件
//==========================================================
function FDsCommonMoviePropertyFrame_onDataChanged(p){
   var o = this;
   var movie = o._activeMovie;
   var resource = movie.resource();
   // 设置参数
   resource.setCode(o._controlCode.get());
   resource.setLabel(o._controlLabel.get());
   resource.setInterval(o._controlInterval.get());
   resource.rotation().assign(o._controlRotation.get());
   // 重新加载数据
   movie.reloadResource();
}

//==========================================================
// <T>加载材质信息。</T>
//
// @method
// @param space:FE3dSpace 空间对象
// @param movie:FE3dMovie 动画对象
//==========================================================
function FDsCommonMoviePropertyFrame_loadObject(space, movie){
   var o = this;
   var resource = movie.resource();
   o._activeSpace = space;
   o._activeMovie = movie;
   // 设置参数
   o._controlGuid.set(resource.guid());
   o._controlCode.set(resource.code());
   o._controlLabel.set(resource.label());
   // 设置参数
   o._controlInterval.set(resource.interval());
   o._controlRotation.set(resource.rotation());
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FDsCommonMoviePropertyFrame_dispose(){
   var o = this;
   // 父处理
   o.__base.FUiForm.dispose.call(o);
}
