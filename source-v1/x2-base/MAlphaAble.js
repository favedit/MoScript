// ============================================================
// MHideAble
// ============================================================
function MAlphaAble(o){
   o = RClass.inherits(this, o);
   /// 设置透明度
   o.setCtlAlpha         = MAlphaAble_setCtlAlpha;
   o.setGraduallyAlpha   = MAlphaAble_setGraduallyAlpha;
   o.graduallyAlpha      = MAlphaAble_graduallyAlpha;
   return o;
}
//------------------------------------------------------------
//a 控件透明度
//------------------------------------------------------------
function MAlphaAble_setCtlAlpha(a){
   var o = this;
   if(o.hPanel){
      if(0 > RInt.parse(a)){
         o.hPanel.style.filter="alpha(opacity=0)";
      }else{
         o.hPanel.style.filter="alpha(opacity="+RInt.parse(a)+")";
      }
   }else{
      alert("setCtlAlpha :no hPanel");
   }
}
//------------------------------------------------------------
// a:开始透明度
//------------------------------------------------------------
function MAlphaAble_setGraduallyAlpha(s,e,t){
   var o = this;
   // 格式判断
   s = RInt.parse(s) < 0  ? 0:RInt.parse(s);
   e = RInt.parse(e) >100 ? 100:RInt.parse(e);
   t = RInt.parse(t) <0 ? 1:RInt.parse(t);
   o.active = new TActive(o, o.onInterval);
   o.active.interval = 250;
   RConsole.find(FActiveConsole).push(o.active);
}
//------------------------------------------------------------
//a:开始透明度
//------------------------------------------------------------
function MAlphaAble_graduallyAlpha(){
   var o = this;
}