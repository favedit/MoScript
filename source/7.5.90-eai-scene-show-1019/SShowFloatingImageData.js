//==========================================================
// <T>预设聚焦参数。</T>
//
// @struct
//==========================================================
MO.SShowFloatingImageData = function SShowFloatingImageData(){
   var o                   = this;
   //..........................................................
   // @attribute
   o.name               = '';
   o.displayImageUrl    = '';
   o.longitude          = 0;
   o.latitude           = 0;

   o.startX             = 0;
   o.startY             = 0;
   o.endX               = 0;
   o.endY               = 0;
   o.popDuration        = 500;
   o.showDuration       = 5000;
   o.closeDuration      = 500;
   
   //..........................................................
   // @method
   return o;
}
