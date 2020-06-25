$(function(){
    const file=$("#fileSelect");
    const cropImg=$("#cropImg");
    let oldSrc=null;

    $("#test").on("click",function(){
        $("#fileSelect").click();
    });

    $("[data-close]").on("click", function () {
        $("#imgView").attr('src', oldSrc);
        cropImg.hide();
    });
    
    let $canvas=$("#canvas"),
        context=$canvas.get(0).getContext('2d');
    let minWidth=200;
    let isCropped=false;
    
    $("[data-success]").on('click', function (e) {
        e.preventDefault();
        var cropedImage = $canvas.cropper('getCroppedCanvas').toDataURL('image/jpg');
        $("#imgView").attr('src', cropedImage);
        cropImg.hide();
        isCropped = false;
    });

    file.on("change",function(){
        const flSelect=this.files;
        oldSrc=$("#imgView").attr('src');
        if(flSelect&&flSelect[0]){
            if(flSelect[0].type.match(/^image\//)){
                let rdr=new FileReader();
                rdr.onload=function(e){
                    let img=new Image();
                    img.onload = function () {
                        if (img.width <= minWidth || img.height <= minWidth) {
                            alert("Обрати зображення більше 200px");
                            return;
                        }
                        cropImg.show();
                        isCropped = true;
                        context.canvas.width = img.width;
                        context.canvas.height = img.height;
                        context.drawImage(img, 0, 0);
                        $canvas.cropper('destroy').cropper({
                            aspectRatio: 1 / 1,
                            viewMode: 1,
                            dragMode: 'move',
                            preview: '.img-preview',
                            crop: function (e) {
                                var data = e.detail;
                                //var h = Math.round(data.height);
                                var w = Math.round(data.width);
                                if (w <= minWidth && isCropped) {
                                    this.cropper.setData({ width: minWidth });
                                }
                            }
                        });
                    }
                    img.src=e.target.result;
                    $("#imgView").attr('src',e.target.result);
                }
                rdr.readAsDataURL(flSelect[0]);
            }else{
                alert("Select image");
            }
        }else{
            alert("Select file");
        }
    });
})