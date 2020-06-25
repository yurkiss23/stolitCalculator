window.addEventListener('load', function(){

    let dlg=document.getElementById("dlg");
    let dlgPrgs=this.document.getElementById("dlgPrgs");
    let btnDlg=document.getElementById("btnDlg");
    let listBtnClose=document.querySelectorAll("[data-close]");

    // let stopPrgs=
    for(let i=0;i<listBtnClose.length;i++){
        listBtnClose[i].onclick=function(){
            dlg.classList.add("hide");
        }
    }
    
    function stopPrgs(){
        dlgPrgs.classList.add("hide");
    }
    function showDlg(){
        dlg.classList.remove("hide");
    }
    btnDlg.onclick=function(){
        dlgPrgs.classList.remove("hide");
        setTimeout(stopPrgs,3000);
        setTimeout(showDlg,3300);
    }
})