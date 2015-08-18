MO.EEaiChapter = new function EEaiChapter(){
   var o = this;
   o.Loading = 'loading';
   o.Login   = 'login';
   o.Scene   = 'scene';
   o.Chart   = 'chart';
   return o;
}
MO.EEaiConstant = new function EEaiConstant(){
   var o = this;
   o.DefaultCountry = "china";
   o.LogicService   = "eai.logic.service";
   o.ServiceHost    = "eai.host.service";
   o.Resource       = "eai.resource";
   return o;
}
MO.EEaiRate = new function EEaiRate(){
   var o = this;
   o.Line            = 0;
   o.Map             = 1;
   o.Investment      = 2;
   o.InvestmentRange = 3;
   return o;
}
MO.EEaiScene = new function EEaiScene(){
   var o = this;
   o.Group           = 'group';
   o.GroupReport     = 'group.report';
   o.Company         = 'company';
   o.Country         = 'country';
   o.ChartTotal      = 'chart.total';
   o.ChartHistory    = 'chart.history';
   o.ChartCustomer   = 'chart.customer';
   o.ChartMarketer   = 'chart.marketer';
   o.ChartDepartment = 'chart.department';
   o.ChartLive       = 'chart.live';
   o.ChartWorld      = 'chart.world';
   o.ChartSales      = 'chart.sales';
   o.ChartIndustry   = 'chart.industry';
   o.ChartInvestment = 'chart.investment';
   o.ChartCustomer   = 'chart.customer';
   o.ChartPerformence   = 'chart.performence';
   return o;
}
MO.Eai = new function FEai(){
   var o = this;
   o.Application = null;
   o.Canvas      = null;
   return o;
}
