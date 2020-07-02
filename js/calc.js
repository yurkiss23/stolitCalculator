window.addEventListener('load', function(){

    let listBtnAdd=this.document.getElementsByClassName('addPos');

    for(let i=0;i<listBtnAdd.length;i++){
        listBtnAdd[i].onclick=addPos;
    }

    function addPos(){
        alert("додати найменування?");
    }
})