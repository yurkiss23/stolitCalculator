window.addEventListener('load', function(){
    
    let base=['qwe','asd','zxc'];
    let listBtnUpdate=this.document.getElementsByClassName("updateRow");
    let listBtnDelete=this.document.getElementsByClassName("deleteRow");
    
    for(let i=0;i<base.length;i++){
        let row=document.createElement("tr");
        row.innerHTML=
        `<td>${i+1}</td>
        <td>${base[i]}</td>
        <td>
        <button class="btn btn-outline-warning updateRow">
        <i class="fa fa-wrench" aria-hidden="true"></i>
        </button>
        <button class="btn btn-outline-danger deleteRow">
        <i class="fa fa-trash-o" aria-hidden="true"></i>
        </button>
        </td>`;
        data.appendChild(row);
    }
    for(let i=0;i<listBtnUpdate.length;i++){
        listBtnUpdate[i].onclick=updateRow;
    }
    for(let i=0;i<listBtnDelete.length;i++){
        listBtnDelete[i].onclick=deleteRow;
    }
    
    function updateRow(){
        let parent=this.parentNode;
        while(parent.nodeName!=="TR"){
            parent=parent.parentNode;
        }
        parent.children[1].innerHTML=prompt("new name",parent.children[1].innerHTML);
        dlgPrgs.classList.remove("hide");
        setTimeout(function(){
            dlgPrgs.classList.add("hide");
            notify.classList.remove("hide");
        },3000);
        setTimeout(function(){notify.classList.add("hide")},4000);
    }
    function deleteRow(){
        dlgPrgs.classList.remove("hide");
        setTimeout(function(){
            dlgPrgs.classList.add("hide");
            notify.classList.remove("hide");
        },2000);
        setTimeout(function(){notify.classList.add("hide")},3000);
        let parent=this.parentNode;
        while(parent.nodeName!=="TR"){
            parent=parent.parentNode;
        }
        parent.remove();
    }
    function addRow(){
        let row=document.createElement("tr");
        row.innerHTML=
        `<td>${base.length+1}</td>
        <td>${document.getElementById("addName").value}</td>
        <td>
        <button class="btn btn-outline-warning updateRow">
        <i class="fa fa-wrench" aria-hidden="true"></i>
        </button>
        <button class="btn btn-outline-danger deleteRow">
        <i class="fa fa-trash-o" aria-hidden="true"></i>
        </button>
        </td>`;
        base.push(addName.value);
        addName.value=null;
        data.appendChild(row);
        for(let i=0;i<listBtnUpdate.length;i++){
            listBtnUpdate[i].onclick=updateRow;
        }
        for(let i=0;i<listBtnDelete.length;i++){
            listBtnDelete[i].onclick=deleteRow;
        }
    }
    this.document.getElementById("add-data").onclick=function(){
        dlgPrgs.classList.remove("hide");
        setTimeout(function(){
            dlgPrgs.classList.add("hide");
            addRow();
            notify.classList.remove("hide");
        },1000);
        setTimeout(function(){notify.classList.add("hide")},2000);
    }

})