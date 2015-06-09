//..........................................................
// 实例化空间
MO.Eai = new function FEai(){
}
//..........................................................
// 实例化内容
MO.Eai.setup = function Eai_setup(){
   MO.Eai.Application = MO.RClass.create(MO.FEaiApplication);
   MO.Eai.Application.setup();
}
