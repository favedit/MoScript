 //==========================================================
// <T>游戏角色对象。</T>
// <P>指和玩家对等的其他玩家。</P>
//
// @class
// @author maocy
// @history 150419
//==========================================================
function FGmRoleEntity(o){
   o = RClass.inherits(this, o, FGmNpcEntity);
   //..........................................................
   // @method
   o.construct  = FGmRoleEntity_construct;
   // @method
   o.dispose    = FGmRoleEntity_dispose;
   return o;
}

//==========================================================
// <T>构造处理。</T>
//
// @method
//==========================================================
function FGmRoleEntity_construct(){
   var o = this;
   o.__base.FGmNpcEntity.construct.call(o);
}

//==========================================================
// <T>释放处理。</T>
//
// @method
//==========================================================
function FGmRoleEntity_dispose(){
   var o = this;
   // 父处理
   o.__base.FGmNpcEntity.dispose.call(o);
}
