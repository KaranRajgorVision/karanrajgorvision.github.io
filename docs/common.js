"use strict";(self.webpackChunkSellerBoardFE=self.webpackChunkSellerBoardFE||[]).push([[592],{210:(u,i,t)=>{t.r(i),t.d(i,{AuthModule:()=>R,HttpLoaderFactory:()=>p});var o=t(6814),n=t(6223),l=t(2032),h=t(5195),r=t(2296),v=t(9862),s=t(1896),e=t(3786),c=t(5879);const m=[{path:"register",component:e.y}];let D=(()=>{class a{static#t=this.\u0275fac=function(d){return new(d||a)};static#s=this.\u0275mod=c.oAB({type:a});static#r=this.\u0275inj=c.cJS({imports:[o.ez,s.Bz.forChild(m),s.Bz]})}return a})();var A=t(5940),U=t(9515),P=t(5061),I=t(8525),f=t(1274),L=t(4104),F=t(617),E=t(2939),g=t(6208);function p(a){return new P.w(a,"./assets/i18n/",".json")}let R=(()=>{class a{static#t=this.\u0275fac=function(d){return new(d||a)};static#s=this.\u0275mod=c.oAB({type:a});static#r=this.\u0275inj=c.cJS({providers:[U.sK],imports:[o.ez,n.u5,n.UX,h.QW,l.c,r.ot,v.JF,D,A.Cq,U.aw.forRoot({loader:{provide:U.Zw,useFactory:p,deps:[v.eN]}}),L.Nh,I.LD,f.g0,F.Ps,E.ZX,g.m,U.aw]})}return a})()},7801:(u,i,t)=>{t.d(i,{K:()=>h});var o=t(553),n=t(5879),l=t(9862);let h=(()=>{class r{constructor(s){this.http=s,this.baseAPIUrl=o.N.baseAPIURL}GetUsersList(){return this.http.get(`${this.baseAPIUrl}User/GetUserList`)}ImportHistoricalData(s){return this.http.post(`${this.baseAPIUrl}User/InsertHistoricalData`,s)}UpdateUserDataLink(s){return this.http.put(`${this.baseAPIUrl}User/UpdateUserDataLink`,s)}GetUserHistoricalDataFileList(s){return this.http.get(`${this.baseAPIUrl}User/GetUserHistoricalDataFileList?UserId=${s}`)}DeleteUnprocessedHistoricalFile(s){return this.http.post(`${this.baseAPIUrl}User/DeleteUnprocessedHistoricalFile`,s)}RevertUserHistoricalData(s){return this.http.post(`${this.baseAPIUrl}User/RevertUserHistoricalData`,s)}AcceptRejectHistoricalUserDataFile(s){return this.http.post(`${this.baseAPIUrl}User/AcceptRejectHistoricalUserDataFile`,s)}ViewUserUplodedFile(s){return this.http.get(`${this.baseAPIUrl}File/ViewUserUplodedFile`,{responseType:"arraybuffer",params:{HistoricalUserDataId:s}})}static#t=this.\u0275fac=function(e){return new(e||r)(n.LFG(l.eN))};static#s=this.\u0275prov=n.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"})}return r})()},2701:(u,i,t)=>{t.d(i,{H:()=>h});var o=t(553),n=t(5879),l=t(9862);let h=(()=>{class r{constructor(s){this.http=s}getList(s){return this.http.get(`${o.N.baseAPIURL}${s}`)}createData(s,e){return this.http.post(`${o.N.baseAPIURL}${s}`,e)}modifyData(s,e){return this.http.put(`${o.N.baseAPIURL}${s}`,e)}static#t=this.\u0275fac=function(e){return new(e||r)(n.LFG(l.eN))};static#s=this.\u0275prov=n.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"})}return r})()}}]);