"use strict";(self.webpackChunkSellerBoardFE=self.webpackChunkSellerBoardFE||[]).push([[592],{3390:(u,i,t)=>{t.r(i),t.d(i,{AuthModule:()=>R,HttpLoaderFactory:()=>D});var e=t(6814),n=t(6223),c=t(2032),h=t(5195),a=t(2296),p=t(9862),s=t(1896),o=t(3786),l=t(5879);const P=[{path:"register",component:o.y}];let f=(()=>{class r{static#t=this.\u0275fac=function(U){return new(U||r)};static#s=this.\u0275mod=l.oAB({type:r});static#r=this.\u0275inj=l.cJS({imports:[e.ez,s.Bz.forChild(P),s.Bz]})}return r})();var v=t(5940),d=t(9515),I=t(5061),F=t(8525),L=t(1274),E=t(4104),m=t(617),y=t(2939),g=t(5313);let M=(()=>{class r{static#t=this.\u0275fac=function(U){return new(U||r)};static#s=this.\u0275mod=l.oAB({type:r});static#r=this.\u0275inj=l.cJS({imports:[e.ez,m.Ps,v.Cq,g.p0]})}return r})();function D(r){return new I.w(r,"./assets/i18n/",".json")}let R=(()=>{class r{static#t=this.\u0275fac=function(U){return new(U||r)};static#s=this.\u0275mod=l.oAB({type:r});static#r=this.\u0275inj=l.cJS({providers:[d.sK],imports:[e.ez,n.u5,n.UX,h.QW,c.c,a.ot,p.JF,f,v.Cq,d.aw.forRoot({loader:{provide:d.Zw,useFactory:D,deps:[p.eN]}}),E.Nh,F.LD,L.g0,m.Ps,y.ZX,M,d.aw]})}return r})()},2701:(u,i,t)=>{t.d(i,{H:()=>h});var e=t(553),n=t(5879),c=t(9862);let h=(()=>{class a{constructor(s){this.http=s}getList(s){return this.http.get(`${e.N.baseAPIURL}${s}`)}createData(s,o){return this.http.post(`${e.N.baseAPIURL}${s}`,o)}modifyData(s,o){return this.http.put(`${e.N.baseAPIURL}${s}`,o)}static#t=this.\u0275fac=function(o){return new(o||a)(n.LFG(c.eN))};static#s=this.\u0275prov=n.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"})}return a})()},9372:(u,i,t)=>{t.d(i,{K:()=>h});var e=t(553),n=t(5879),c=t(9862);let h=(()=>{class a{constructor(s){this.http=s,this.baseAPIUrl=e.N.baseAPIURL}GetUsersList(){return this.http.get(`${this.baseAPIUrl}User/GetUserList`)}ImportHistoricalData(s){return this.http.post(`${this.baseAPIUrl}User/InsertHistoricalData`,s)}UpdateUserDataLink(s){return this.http.put(`${this.baseAPIUrl}User/UpdateUserDataLink`,s)}GetUserHistoricalDataFileList(s){return this.http.get(`${this.baseAPIUrl}User/GetUserHistoricalDataFileList?UserId=${s}`)}DeleteUnprocessedHistoricalFile(s){return this.http.post(`${this.baseAPIUrl}User/DeleteUnprocessedHistoricalFile`,s)}RevertUserHistoricalData(s){return this.http.post(`${this.baseAPIUrl}User/RevertUserHistoricalData`,s)}AcceptRejectHistoricalUserDataFile(s){return this.http.post(`${this.baseAPIUrl}User/AcceptRejectHistoricalUserDataFile`,s)}ViewUserUplodedFile(s){return this.http.get(`${this.baseAPIUrl}File/ViewUserUplodedFile`,{responseType:"arraybuffer",params:{HistoricalUserDataId:s}})}static#t=this.\u0275fac=function(o){return new(o||a)(n.LFG(c.eN))};static#s=this.\u0275prov=n.Yz7({token:a,factory:a.\u0275fac,providedIn:"root"})}return a})()}}]);