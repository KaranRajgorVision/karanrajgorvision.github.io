"use strict";(self.webpackChunkSellerBoardFE=self.webpackChunkSellerBoardFE||[]).push([[246],{2246:(K,f,p)=>{p.r(f),p.d(f,{SettingModule:()=>V});var c=p(6814),g=p(1896),t=p(5879),l=p(5313),x=p(6593),b=p(7801),h=p(2425),_=p(9070),u=p(617),m=p(2296);const O=["fileUpload"];function M(e,o){1&e&&(t.TgZ(0,"p",13),t._uU(1,"File is required."),t.qZA())}function P(e,o){1&e&&(t.TgZ(0,"th",24),t._uU(1,"File Name"),t.qZA())}function v(e,o){if(1&e&&(t.TgZ(0,"td",25),t._uU(1),t.qZA()),2&e){const i=o.$implicit;t.xp6(1),t.hij(" ",i.fileName," ")}}function D(e,o){1&e&&(t.TgZ(0,"th",24),t._uU(1,"Created Date"),t.qZA())}function k(e,o){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const i=o.$implicit;t.xp6(1),t.Oqu(i.createdDate)}}function w(e,o){1&e&&(t.TgZ(0,"th",24),t._uU(1,"Status"),t.qZA())}function y(e,o){if(1&e&&(t.TgZ(0,"td",26),t._uU(1),t.qZA()),2&e){const i=o.$implicit;t.xp6(1),t.Oqu(i.status)}}function S(e,o){1&e&&t._UZ(0,"tr",27)}function Z(e,o){1&e&&t._UZ(0,"tr",28)}function T(e,o){if(1&e&&(t.TgZ(0,"div",14)(1,"table",15),t.ynx(2,16),t.YNc(3,P,2,0,"th",17),t.YNc(4,v,2,1,"td",18),t.BQk(),t.ynx(5,19),t.YNc(6,D,2,0,"th",17),t.YNc(7,k,2,1,"td",20),t.BQk(),t.ynx(8,21),t.YNc(9,w,2,0,"th",17),t.YNc(10,y,2,1,"td",20),t.BQk(),t.YNc(11,S,1,0,"tr",22),t.YNc(12,Z,1,0,"tr",23),t.qZA()()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("dataSource",i.dataSource),t.xp6(10),t.Q6J("matHeaderRowDef",i.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",i.displayedColumns)}}let F=(()=>{class e{constructor(i,n,a,s,d){this.sanitizer=i,this.userService=n,this.toastr=a,this.datePipe=s,this.globalSpinner=d,this.displayedColumns=["fileName","createdDate","status"],this.buttonClicked=!1,this.files=[],this.inputFileName="",this.fileData="",this.isLoaderShow=!1,this.filelistData=[]}ngOnInit(){const i=localStorage.getItem("authToken");if(i){const n=JSON.parse(i);n&&n.currentUserId&&(this.getUserId=n.currentUserId)}this.getFileData(this.getUserId)}onNoClick(){}onClick(i){this.fileUpload&&this.fileUpload.nativeElement.click()}onFileSelected(i){const n=i.target.files[0];n&&(this.inputFileName=n.name,this.fileData=n.name);let a=i.dataTransfer?i.dataTransfer.files:i.target.files;for(let d=0;d<a.length;d++){let U=a[d];this.validate(U)&&(U.objectURL=this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(a[d])),this.isMultiple()||(this.files=[]),this.files.push(a[d]))}this.fileData=a}clearInputElement(){this.fileUpload.nativeElement.value=""}isMultiple(){return this.multiple}validate(i){for(const n of this.files)if(n.name===i.name&&n.lastModified===i.lastModified&&n.size==n.size&&n.type==n.type)return!1;return!0}ImportHistoricalData(){if(this.buttonClicked=!0,this.fileData){this.globalSpinner.showSpinner();const i=new FormData;i.append("files",this.fileData[0],this.fileData[0].name),i.append("CreatedByUserId",String(this.getUserId)),i.append("UserId",String(this.getUserId)),i.append("IsApproved",JSON.stringify(!1)),this.userService.ImportHistoricalData(i).subscribe(n=>{n&&null!=n.payload&&n.isSuccess&&n.payload>0&&(this.toastr.success("File Uploaded Sucessfully !!","Success",{timeOut:3e3}),this.globalSpinner.hideSpinner(),this.getFileData(this.getUserId),this.inputFileName="",this.buttonClicked=!1,this.fileData="")},n=>{this.globalSpinner.hideSpinner(),n&&n.error?alert(n?.error?.errorMessage):alert("Oops some error occured."),this.onNoClick()})}}formatDate(i){return this.datePipe.transform(i,"yyyy-MM-dd")}getFileData(i){this.globalSpinner.showSpinner(),this.userService.GetUserHistoricalDataFileList(i)?.subscribe(n=>{if(n&&null!=n&&null!=n.payload&&n.payload){this.filelistData=n.payload;for(let a of this.filelistData){const s=this.formatDate(a.createdDate);a.createdDate=s}this.dataSource=new l.by(this.filelistData),this.globalSpinner.hideSpinner()}})}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(x.H7),t.Y36(b.K),t.Y36(h._W),t.Y36(c.uU),t.Y36(_.f))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-file-uploadlist"]],viewQuery:function(n,a){if(1&n&&t.Gf(O,5),2&n){let s;t.iGM(s=t.CRH())&&(a.fileUpload=s.first)}},inputs:{multiple:"multiple",files:"files"},features:[t._Bn([c.uU])],decls:20,vars:4,consts:[[1,"fileDailog_wrapper"],[1,"dialog_heading"],[1,"top-header"],[1,"title-name"],[1,"file-upload-box"],[1,"upload-file"],["id","ulopad-file","type","file",3,"change"],["fileUpload",""],["for","ulopad-file",1,"upload-text"],[1,"upload-text-inner"],["mat-raised-button","","color","primary",3,"disabled","click"],["class","validation",4,"ngIf"],["class","fileData mat-elevation-z8 cms-table",4,"ngIf"],[1,"validation"],[1,"fileData","mat-elevation-z8","cms-table"],["mat-table","",3,"dataSource"],["matColumnDef","fileName"],["mat-header-cell","","class","t-head",4,"matHeaderCellDef"],["mat-cell","","class","nameEllipsis",4,"matCellDef"],["matColumnDef","createdDate"],["mat-cell","",4,"matCellDef"],["matColumnDef","status"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell","",1,"t-head"],["mat-cell","",1,"nameEllipsis"],["mat-cell",""],["mat-header-row",""],["mat-row",""]],template:function(n,a){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h3",3),t._uU(4,"Upload File"),t.qZA()(),t.TgZ(5,"div",4)(6,"div",5)(7,"input",6,7),t.NdJ("change",function(d){return a.onFileSelected(d)}),t.qZA(),t.TgZ(9,"label",8)(10,"mat-icon"),t._uU(11,"cloud_upload"),t.qZA(),t.TgZ(12,"span",9),t._uU(13),t.qZA()()(),t.TgZ(14,"button",10),t.NdJ("click",function(){return a.ImportHistoricalData()}),t.TgZ(15,"mat-icon"),t._uU(16,"upload"),t.qZA(),t._uU(17,"Upload "),t.qZA(),t.YNc(18,M,2,0,"p",11),t.qZA()(),t.YNc(19,T,13,3,"div",12),t.qZA()),2&n&&(t.xp6(13),t.hij("",a.inputFileName?a.inputFileName:"Upload File "," "),t.xp6(1),t.Q6J("disabled",a.buttonClicked&&!a.inputFileName),t.xp6(4),t.Q6J("ngIf",!a.inputFileName&&a.buttonClicked),t.xp6(1),t.Q6J("ngIf",a.filelistData.length>0))},dependencies:[c.O5,u.Hw,l.BZ,l.fO,l.as,l.w1,l.Dz,l.nj,l.ge,l.ev,l.XQ,l.Gk,m.lW],styles:['.p-2[_ngcontent-%COMP%]{padding:20px}.input_fileupload--hidden[_ngcontent-%COMP%]{display:none}.t-head[_ngcontent-%COMP%]{font-size:1rem;color:#000;font-weight:500;text-align:start}.spinner-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh;position:fixed;inset:0;background-color:#00000080}.fileData[_ngcontent-%COMP%]{box-shadow:none;overflow:hidden;overflow-y:auto;width:100%;min-width:500px;max-height:500px}.fileData[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{margin-bottom:0}.fileData[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.fileData[_ngcontent-%COMP%]   .mat-mdc-cell[_ngcontent-%COMP%]{padding-top:8px!important}.fileData[_ngcontent-%COMP%]     .mat-mdc-table{white-space:nowrap;overflow:auto!important}table[_ngcontent-%COMP%], th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{border-collapse:collapse;padding:8px}.nameEllipsis[_ngcontent-%COMP%]{white-space:nowrap!important;max-width:200px!important;overflow:hidden!important;text-overflow:ellipsis!important}  .mdc-dialog__content>:last-child{float:right}.fileData[_ngcontent-%COMP%]   .mat-elevation-z8[_ngcontent-%COMP%]{box-shadow:none!important}.close[_ngcontent-%COMP%]{padding:20px 30px 20px 24px;float:right}.close[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]{background-color:#3f51b5;color:#fff}.action-btn[_ngcontent-%COMP%]{background-color:#ff4081;border:none;color:#fff;border-radius:5px;padding:5px 10px 0 5px;display:flex;align-items:center}.action-btn[_ngcontent-%COMP%]   .delete-btn[_ngcontent-%COMP%]{margin-bottom:4px}.action-btn[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:19px}.fileDailog_wrapper[_ngcontent-%COMP%]{padding:30px 15px}.top-header[_ngcontent-%COMP%]   h3.title-name[_ngcontent-%COMP%]{font-size:30px;padding-bottom:15px;position:relative;display:inline-block;font-weight:500;letter-spacing:.5px}.top-header[_ngcontent-%COMP%]   h3.title-name[_ngcontent-%COMP%]:after{content:"";position:absolute;left:0;top:100%;height:2px;background-color:#303f9f;max-width:80%;width:100%;margin:auto;border-radius:10px}.file-upload-box[_ngcontent-%COMP%]{padding-top:30px;position:relative;padding-bottom:30px;display:inline-block}.file-upload-box[_ngcontent-%COMP%]   .upload-file[_ngcontent-%COMP%]{display:inline-flex}.file-upload-box[_ngcontent-%COMP%]   .upload-file[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%]{display:none}.file-upload-box[_ngcontent-%COMP%]   .upload-file[_ngcontent-%COMP%]   .upload-text[_ngcontent-%COMP%]{padding:15px 30px;border:1px dashed gray}.file-upload-box[_ngcontent-%COMP%]   .upload-file[_ngcontent-%COMP%]   .upload-text[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%], .file-upload-box[_ngcontent-%COMP%]   .upload-file[_ngcontent-%COMP%]   .upload-text[_ngcontent-%COMP%]   .upload-text-inner[_ngcontent-%COMP%]{vertical-align:middle}.file-upload-box[_ngcontent-%COMP%]   .upload-file[_ngcontent-%COMP%]   .upload-text[_ngcontent-%COMP%]   .upload-text-inner[_ngcontent-%COMP%]{padding-left:15px;font-size:16px;text-transform:capitalize;font-weight:500}.file-upload-box[_ngcontent-%COMP%]   .mat-mdc-button-base[_ngcontent-%COMP%]{height:50px;margin-left:15px}.file-upload-box[_ngcontent-%COMP%]   .validation[_ngcontent-%COMP%]{color:red;font-size:.8rem;margin:5px 15px;position:absolute;left:0;bottom:0;right:0}']})}return e})(),C=(()=>{class e{static#t=this.UserUrl={getUserList:"User/GetUserList",insertHistoricalData:"User/InsertHistoricalData",importHistoricalData:"/User/ImportHistoricalData",getUserSalesDataByDateCard:"/User/GetUserSalesDataByDateCard",updateUserDataLink:"User/UpdateUserDataLink",importUserDataByLink:"User/ImportUserDataByLink",getUserHistoricalDataFileList:"User/GetUserHistoricalDataFileList",revertUserHistoricalData:"User/RevertUserHistoricalData",deleteUnprocessedHistoricalFile:"User/DeleteUnprocessedHistoricalFile",acceptRejectHistoricalUserDataFile:"User/AcceptRejectHistoricalUserDataFile",getUserUploadedLink:"User/GetUserUploadedLink",addUpdateUserLink:"User/AddUpdateUserLink",acceptRejectUserLink:"User/AcceptRejectUserLink"}}return e})();var r=p(6223),L=p(2701);const I=["uploadLink"];function N(e,o){1&e&&(t.ynx(0),t.TgZ(1,"p",10),t._uU(2,"URL link is required."),t.qZA(),t.BQk())}function A(e,o){1&e&&(t.ynx(0),t.TgZ(1,"p",10),t._uU(2,"Please enter a valid URL"),t.qZA(),t.BQk())}function Y(e,o){if(1&e&&(t.TgZ(0,"div"),t.YNc(1,N,3,0,"ng-container",8),t.YNc(2,A,3,0,"ng-container",8),t.qZA()),2&e){const i=t.oxw();let n,a;t.xp6(1),t.Q6J("ngIf",null==(n=i.updateUrlFrom.get("updateUrl"))?null:n.hasError("required")),t.xp6(1),t.Q6J("ngIf",(null==(a=i.updateUrlFrom.get("updateUrl"))?null:a.hasError("pattern"))&&!(null!=(a=i.updateUrlFrom.get("updateUrl"))&&a.hasError("required")))}}function q(e,o){1&e&&(t.TgZ(0,"th",20),t._uU(1,"link Url"),t.qZA())}function B(e,o){if(1&e&&(t.TgZ(0,"td",21),t._uU(1),t.qZA()),2&e){const i=o.$implicit;t.xp6(1),t.Oqu(i.linkUrl)}}function H(e,o){1&e&&(t.TgZ(0,"th",20),t._uU(1,"Uploaded By"),t.qZA())}function Q(e,o){if(1&e&&(t.TgZ(0,"td",21),t._uU(1),t.qZA()),2&e){const i=o.$implicit;t.xp6(1),t.Oqu(i.uploadedBy)}}function R(e,o){1&e&&(t.TgZ(0,"th",20),t._uU(1,"Status"),t.qZA())}function z(e,o){if(1&e&&(t.TgZ(0,"td",21),t._uU(1),t.qZA()),2&e){const i=o.$implicit;t.xp6(1),t.Oqu(i.status)}}function J(e,o){1&e&&t._UZ(0,"tr",22)}function E(e,o){1&e&&t._UZ(0,"tr",23)}function j(e,o){if(1&e&&(t.TgZ(0,"div",11)(1,"table",12),t.ynx(2,13),t.YNc(3,q,2,0,"th",14),t.YNc(4,B,2,1,"td",15),t.BQk(),t.ynx(5,16),t.YNc(6,H,2,0,"th",14),t.YNc(7,Q,2,1,"td",15),t.BQk(),t.ynx(8,17),t.YNc(9,R,2,0,"th",14),t.YNc(10,z,2,1,"td",15),t.BQk(),t.YNc(11,J,1,0,"tr",18),t.YNc(12,E,1,0,"tr",19),t.qZA()()),2&e){const i=t.oxw();t.xp6(1),t.Q6J("dataSource",i.dataSource),t.xp6(10),t.Q6J("matHeaderRowDef",i.displayedColumns),t.xp6(1),t.Q6J("matRowDefColumns",i.displayedColumns)}}let G=(()=>{class e{constructor(i,n,a,s){this.toastr=i,this.apiService=n,this.globalSpinner=a,this.formBuilder=s,this.displayedColumns=["linkUrl","status","uploadedBy"],this.isSubmit=!1,this.uploadLinkEmpty=!1,this.isLoaderShow=!1,this.pattern=/^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,this.updateUrlFrom=new r.cw({updateUrl:new r.NI("")})}ngOnInit(){this.updateUrlFrom=this.formBuilder.group({updateUrl:new r.NI("",[r.kI.required,r.kI.pattern(this.pattern)])});const i=localStorage.getItem("authToken");if(i){const n=JSON.parse(i);n&&n.currentUserId&&(this.getUserId=n.currentUserId)}this.getFileData(this.getUserId)}currectUrlUpload(i){this.isSubmit=!/^(?:(http(s)?)?(sftp)?(ftp)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(i)}uploadLinkEvent(i){if(this.isSubmit=!0,this.updateUrlFrom.valid&&this.isSubmit){const n={userID:this.getUserId,linkUrl:i.updateUrl};this.globalSpinner.showSpinner(),this.apiService.createData(C.UserUrl.addUpdateUserLink,n).subscribe({next:a=>{a&&a&&(this.toastr.success("Link Update Sucessfully !!","Success",{timeOut:3e3}),this.updateUrlFrom.get("updateUrl")?.setValue(""),this.isSubmit=!1,this.isLoaderShow=!1,this.globalSpinner.hideSpinner(),this.getFileData(this.getUserId))},error:a=>{this.isLoaderShow=!1,a&&a.error?alert(a?.error?.errorMessage):alert("Oops some error occured.")}})}else this.isSubmit=!0}getFileData(i){this.globalSpinner.showSpinner();const n=`${C.UserUrl.getUserUploadedLink}?UserId=${i}`;this.apiService.getList(n)?.subscribe(a=>{if(a&&null!=a&&null!=a.payload&&a.payload){this.responseData=a.payload;const s=[];s.push(a.payload),this.dataSource=new l.by(s),this.globalSpinner.hideSpinner()}})}static#t=this.\u0275fac=function(n){return new(n||e)(t.Y36(h._W),t.Y36(L.H),t.Y36(_.f),t.Y36(r.qu))};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-update-link"]],viewQuery:function(n,a){if(1&n&&t.Gf(I,5),2&n){let s;t.iGM(s=t.CRH())&&(a.uploadLink=s.first)}},decls:14,vars:3,consts:[[1,"fileDailog_wrapper"],[1,"dialog_heading"],[1,"top-header"],[1,"title-name"],[1,"link-upload-box"],[1,"upload-link-box",3,"formGroup"],["id","link-link","formControlName","updateUrl","placeholder","Please enter url link","type","text",1,"upload-link-input"],["mat-raised-button","","color","primary",3,"click"],[4,"ngIf"],["class","fileData mat-elevation-z8 cms-table",4,"ngIf"],[1,"validation"],[1,"fileData","mat-elevation-z8","cms-table"],["mat-table","",3,"dataSource"],["matColumnDef","linkUrl"],["mat-header-cell","","class","t-head",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","uploadedBy"],["matColumnDef","status"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell","",1,"t-head"],["mat-cell",""],["mat-header-row",""],["mat-row",""]],template:function(n,a){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h3",3),t._uU(4,"Update Link"),t.qZA()(),t.TgZ(5,"div",4)(6,"form",5)(7,"mat-icon"),t._uU(8,"cloud_upload"),t.qZA(),t._UZ(9,"input",6),t.qZA(),t.TgZ(10,"button",7),t.NdJ("click",function(){return a.uploadLinkEvent(a.updateUrlFrom.value)}),t._uU(11," Submit Link "),t.qZA(),t.YNc(12,Y,3,2,"div",8),t.qZA()(),t.YNc(13,j,13,3,"div",9),t.qZA()),2&n&&(t.xp6(6),t.Q6J("formGroup",a.updateUrlFrom),t.xp6(6),t.Q6J("ngIf",a.isSubmit),t.xp6(1),t.Q6J("ngIf",a.responseData&&a.responseData.linkUrl))},dependencies:[c.O5,u.Hw,l.BZ,l.fO,l.as,l.w1,l.Dz,l.nj,l.ge,l.ev,l.XQ,l.Gk,m.lW,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u],styles:['.p-2[_ngcontent-%COMP%]{padding:20px}.input_fileupload--hidden[_ngcontent-%COMP%]{display:none}.t-head[_ngcontent-%COMP%]{font-size:1rem;color:#000;font-weight:500;text-align:start}.spinner-container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;height:100vh;position:fixed;inset:0;background-color:#00000080}.fileData[_ngcontent-%COMP%]{box-shadow:none;overflow:auto;overflow-y:auto;width:100%;min-width:500px;max-height:500px;margin-top:15px}.fileData[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%]{margin-bottom:0}.fileData[_ngcontent-%COMP%]   .status[_ngcontent-%COMP%]{display:flex;justify-content:space-between}.fileData[_ngcontent-%COMP%]   .mat-mdc-cell[_ngcontent-%COMP%]{padding-top:8px!important}.fileData[_ngcontent-%COMP%]     .mat-mdc-table{white-space:nowrap;overflow:auto!important}table[_ngcontent-%COMP%], th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{border-collapse:collapse;padding:8px}.nameEllipsis[_ngcontent-%COMP%]{white-space:nowrap!important;max-width:200px!important;overflow:hidden!important;text-overflow:ellipsis!important}  .mdc-dialog__content>:last-child{float:right}.fileData[_ngcontent-%COMP%]   .mat-elevation-z8[_ngcontent-%COMP%]{box-shadow:none!important}.close[_ngcontent-%COMP%]{padding:20px 30px 20px 24px;float:right}.close[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]{background-color:#3f51b5;color:#fff}.action-btn[_ngcontent-%COMP%]{background-color:#ff4081;border:none;color:#fff;border-radius:5px;padding:5px 10px 0 5px;display:flex;align-items:center}.action-btn[_ngcontent-%COMP%]   .delete-btn[_ngcontent-%COMP%]{margin-bottom:4px}.action-btn[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{font-size:19px}.fileDailog_wrapper[_ngcontent-%COMP%]{padding:30px 15px}.top-header[_ngcontent-%COMP%]   h3.title-name[_ngcontent-%COMP%]{font-size:30px;padding-bottom:15px;position:relative;display:inline-block;font-weight:500;letter-spacing:.5px}.top-header[_ngcontent-%COMP%]   h3.title-name[_ngcontent-%COMP%]:after{content:"";position:absolute;left:0;top:100%;height:2px;background-color:#303f9f;max-width:80%;width:100%;margin:auto;border-radius:10px}.link-upload-box[_ngcontent-%COMP%]{padding-top:30px;position:relative;padding-bottom:30px;display:inline-block}.link-upload-box[_ngcontent-%COMP%]   .upload-link-box[_ngcontent-%COMP%]{position:relative;display:inline-block}.link-upload-box[_ngcontent-%COMP%]   .upload-link-box[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%]{position:absolute;transform:translateY(-50%);top:50%;left:0;padding:10px;height:unset!important;width:unset!important}.link-upload-box[_ngcontent-%COMP%]   .upload-link-box[_ngcontent-%COMP%]   .upload-link-input[_ngcontent-%COMP%]{padding:10px 15px 10px 45px;border:1px dashed gray;line-height:30px;font-size:16px;width:500px;min-width:200px}.link-upload-box[_ngcontent-%COMP%]   .upload-link-box[_ngcontent-%COMP%]   .upload-link-input[_ngcontent-%COMP%]:focus{outline:none}.link-upload-box[_ngcontent-%COMP%]   .mat-mdc-button-base[_ngcontent-%COMP%]{height:50px;margin-left:15px;vertical-align:top}.link-upload-box[_ngcontent-%COMP%]   .validation[_ngcontent-%COMP%]{color:red;font-size:.8rem;margin:5px 15px;position:absolute;left:0;bottom:0;right:0}.mat-mdc-table[_ngcontent-%COMP%]   .mat-mdc-row[_ngcontent-%COMP%]   .mat-column-linkUrl[_ngcontent-%COMP%]{text-wrap:wrap!important}']})}return e})();const $=[{path:"",component:(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275cmp=t.Xpm({type:e,selectors:[["app-main-section"]],decls:3,vars:0,consts:[[1,"setting-page"]],template:function(n,a){1&n&&(t.TgZ(0,"div",0),t._UZ(1,"app-file-uploadlist")(2,"app-update-link"),t.qZA())},dependencies:[F,G],styles:[".mat-mdc-cell[_ngcontent-%COMP%]:first-child{text-wrap:wrap!important;max-width:350px}"]})}return e})()}];let X=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[g.Bz.forChild($),g.Bz]})}return e})();var W=p(5940);let V=(()=>{class e{static#t=this.\u0275fac=function(n){return new(n||e)};static#e=this.\u0275mod=t.oAB({type:e});static#n=this.\u0275inj=t.cJS({imports:[c.ez,X,u.Ps,W.Cq,l.p0,m.ot,r.UX,r.u5]})}return e})()}}]);