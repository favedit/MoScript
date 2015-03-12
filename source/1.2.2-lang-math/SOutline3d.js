//==========================================================
// <T>三维轮廓。</T>
//
// @struct
// @author maocy
// @version 141231
//==========================================================
function SOutline3d(){
   var o = this;
   SOutline3.call(o);
   //..........................................................
   // @attribute 中心点
   o.center    = new SPoint3();
   // @attribute 半径
   o.radius    = 0;
   // @attribute 顶点集合
   o.points    = new Array(24);
   //..........................................................
   // @method
   o.update    = SOutline3d_update;
   o.calculate = SOutline3d_calculate;
   return o;
}

//============================================================
// <T>根据轮廓更新数据。</T>
//
// @method
//============================================================
function SOutline3d_update(p){
   var o = this;
   // 获得数据
   var vi = o.min;
   var vix = vi.x;
   var viy = vi.y;
   var viz = vi.z;
   var va = o.max;
   var vax = va.x;
   var vay = va.y;
   var vaz = va.z;
   // 设置空间坐标
   var ps = o.points;
   ps[ 0] = -vix;
   ps[ 1] =  viy;
   ps[ 2] =  viz;
   ps[ 3] =  vix;
   ps[ 4] =  viy;
   ps[ 5] =  viz;
   ps[ 6] =  vix;
   ps[ 7] = -viy;
   ps[ 8] =  viz;
   ps[ 9] = -vix;
   ps[10] = -viy;
   ps[11] =  viz;
   ps[12] = -vax;
   ps[13] =  vay;
   ps[14] =  vaz;
   ps[15] =  vax;
   ps[16] =  vay;
   ps[17] =  vaz;
   ps[18] =  vax;
   ps[19] = -vay;
   ps[20] =  vaz;
   ps[21] = -vax;
   ps[22] = -vay;
   ps[23] =  vaz;
   // 计算中心位置
   var c = o.center;
   c.x = (vix + vax) * 0.5;
   c.y = (viy + vay) * 0.5;
   c.z = (viz + vaz) * 0.5;
   // 计算半径
   var cx = vax - vix;
   var cy = vay - viy;
   var cz = vaz - viz;
   o.radius = Math.sqrt(cx * cx + cy * cy + cz * cz) * 0.5;
}

//============================================================
// <T>根据点坐标计算数据。</T>
//
// @method
//============================================================
function SOutline3d_calculate(p){
   var o = this;
   // 计算空间内位置
   var vix = viy = viz = Number.MAX_VALUE;
   var vax = vay = vaz = -Number.MAX_VALUE;
   var i = 0;
   var d = o.points;
   while(i < 24){
      var x = d[i++];
      if(x < vix){
         vix = x;
      }
      if(x > vax){
         vax = x;
      }
      var y = d[i++];
      if(y < viy){
         viy = y;
      }
      if(y > vay){
         vay = y;
      }
      var z = d[i++];
      if(z < viz){
         viz = z;
      }
      if(z > vaz){
         vaz = z;
      }
   }
   o.min.set(vix, viy, viz);
   o.max.set(vax, vay, vaz);
   // 计算中心位置
   o.center.x = (vix + vax) * 0.5;
   o.center.y = (viy + vay) * 0.5;
   o.center.z = (viz + vaz) * 0.5;
   // 计算半径
   var cx = vax - vix;
   var cy = vay - viy;
   var cz = vaz - viz;
   o.radius = Math.sqrt(cx * cx + cy * cy + cz * cz) * 0.5;
}
