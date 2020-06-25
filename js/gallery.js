$(function(){
    const addImg=$("#addImg");
    const dlgCrop=$("#dlgCrop");
    const file=$("#fileSelect");
    
    let flSelect=null;
    let galleryArr=new Array();
    let $canvas=$("#canvas"), context=$canvas.get(0).getContext("2d");
    let minWidth=200;
    let isCropped=false;
    
    addImg.on("click",function(){
        file.click();
    });
    $("[data-close]").on("click",function(){
        dlgCrop.hide();
        isCropped=false;
    });
    $("[data-success]").on("click",function(e){
        e.preventDefault();
        var cropedImage = $canvas.cropper("getCroppedCanvas").toDataURL("image/jpg");
        galleryArr[galleryArr.length]={name:flSelect[0], imgUrl:cropedImage};
        let newDiv=document.createElement("div");
        newDiv.className="col-xl-3 col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center";
        newDiv.innerHTML=
        `<figure class="figure">
            <button class="btn btn-outline-default">
                <img src="${cropedImage}" alt=""
                    class="figure-img img-fluid rounded">
                <figcaption class="figure-caption">${flSelect[0].name}</figcaption>
            </button>
        </figure>`;
        rowGrid.insertBefore(newDiv,rowGrid.firstChild);
        dlgCrop.hide();
        isCropped=false;
    });

    $("#toLeft").on("click",function(){
        $canvas.cropper("rotate",$("#toLeft").attr("data-option"));
    });
    $("#toRight").on("click",function(){
        $canvas.cropper("rotate",$("#toRight").attr("data-option"));
    });
    $("#zoom").on("click",function(){
        $canvas.cropper("zoom",$("#zoom").attr("data-option"));
    });
    
    file.on("change",function(){
        flSelect=this.files;
        if(flSelect&&flSelect[0]){
            if(flSelect[0].type.match(/^image\//)){
                let rdr=new FileReader();
                rdr.onload=function(e){
                    let img=new Image();
                    img.onload=function(){
                        if(img.width<=minWidth||img.height<=minWidth){
                            alert("Set image biggest 200px");
                            return;
                        }
                        dlgCrop.show();
                        isCropped=true;
                        context.canvas.width=img.width;
                        context.canvas.height=img.height;
                        context.drawImage(img,0,0);
                        $canvas.cropper("destroy").cropper({
                            aspectRatio: 1/1,
                            viewMode: 1,
                            dragMode:"move",
                            preview:".img-preview",
                            crop:function(e){
                                let data=e.detail;
                                let w=Math.round(data.width);
                                if(w<=minWidth&&isCropped){
                                    this.cropper.setData({width:minWidth});
                                }
                            }
                        });
                    }
                    img.src=e.target.result;
                }
                rdr.readAsDataURL(flSelect[0]);
            }
            else{
                alert("Select image");
            }
        }
        else{
            alert("Select file");
        }
    });
})