
//Codigo para SOMMERREGEN.HTML
var url = window.location.pathname.toLowerCase();
console.log(url);
if(url.includes("sommerregen.html")) {
    console.log("estamos en sommerregen");
    var imagenesMovidasPorClick = 1;//Default
    var imgMovPorClickSmall = 1;//Mobile
    var imgMovPorClickMedium = 2;//Tablet y Mobile horiz
    var imgMovPorClickLarge = 2;//Desktop

    var cantImgsEnCarousel = 9;
    var mobileMaxWidth = 480;
    var tabletMaxWidth = 880;
    //De a cuantas imagenes mostramos en cada pantalla
    var imagesEnMobile = 1;
    var imagesEnTablet = 2;
    var imagesEnDesktop = 4;

    function carouselBtnClick(button) {
        $(".circulo").removeClass("active");
        button.classList.add("active");
        var imgWidth = $("#slides div").outerWidth();
        var page = button.getAttribute("data-page");
        var newPosition = imgWidth * page * -1 * imagenesMovidasPorClick;
        //Falta funcionalidad si el ultimo movimiento mueve mas imagenes de las que hay
        //Esto no rompe nada, pero se ve un espacio en blanco donde irian mas fotos si hubiese
        $("#slides").css("transform","translateX("+newPosition+"px)");
        $("#slides").attr("data-current-page", page);
    }

    /* Mueve al carousel a la izq o derecha dependiendo de 'direction' */
    function carouselArrowClick(direction) {
        var currPage = Number($("#slides").attr("data-current-page"));
        var imgWidth = $("#slides div").outerWidth();
        //corrimiento de la pagina actual, +1 es a la derecha, -1 a la izq.
        var corrimiento = 1;
        if(direction == 'left') { corrimiento = -1 };
        currPage += corrimiento;
        //Si el movimiento se iria fuera del carousel, no hacemos nada
        if(currPage < 0 || imagenesRestantes(currPage) < 0) { return }
        //calculamos la nueva translateX() (css)
        var newPosition = imgWidth * currPage * -1 * imagenesMovidasPorClick;

        //Updateamos el slide
        $("#slides").attr("data-current-page", currPage);
        $("#slides").css("transform","translateX("+newPosition+"px)");
        $('#contador-slide').text(currPage+1);
        
        //Updateamos las bolitas tambien
        /* No estamos usando bolitas
        $(".circulo").each(function() {
            this.classList.remove('active');
            var btnPage = Number(this.getAttribute("data-page"));
            if(btnPage == currPage) {
                this.classList.add("active");
            }
        });*/
    }

    /* Devuelve cuantas paginas quedan por ver a la derecha */
    function imagenesRestantes(pagActual) {
        var imgWidth = Number($("#slides div").outerWidth());
        var carouselWidth = Number($("#carousel").outerWidth());
        var currPage = Number($("#slides").attr("data-current-page"));
        //sumamos la cantidad de imagenes que se ven en el carousel (carouselWidth/imgWidth)
        //mas la cantidad de imagenes que se corrieron (pagActual*imagenesMovidasPorClick)
        var imgActual = (carouselWidth/imgWidth) + (pagActual*imagenesMovidasPorClick);
        return cantImgsEnCarousel - imgActual;
    }
    // No estamos usando los botones
    /* Arma los botones que hagan falta para navegar por los items del carousel */
    /*function populateCarouselButtons() {
        //Limpiamos los botones previos
        $("#carousel1Buttons").html('');
        var numBtns = imagenesRestantes(0) / imagenesMovidasPorClick;
        //Agregamos el primer boton como activo
        var $div = $("<div>", {"class": "circulo active", "data-page": 0, "onclick": "carouselBtnClick(this);"});
        $("#carousel1Buttons").append($div);
        //Agregamos el resto, si hacen falta
        for(var i = 1; i <= numBtns; i++) {
            var $div = $("<div>", {"class": "circulo", "data-page": i, "onclick": "carouselBtnClick(this);"});
            $("#carousel1Buttons").append($div);
        }
    }*/
    /* Este tipo de funcionalidad serviria solo para mobile, que todavia no es soportando por esta pagina
    function resizeCarousel() {
        var bodyWidth = Number($("body").width());
        var imgWidth = Number($("#slides div").outerWidth());
        var $carousel = $("#carousel");

        if(bodyWidth < mobileMaxWidth) {
            imagenesMovidasPorClick = imgMovPorClickSmall;
            $carousel.css("width", imgWidth*imagesEnMobile+"px");
        } 
        else if (bodyWidth < tabletMaxWidth) {
            imagenesMovidasPorClick = imgMovPorClickMedium;
            $carousel.css("width", imgWidth*imagesEnTablet+"px");
        } 
        else {
            imagenesMovidasPorClick = imgMovPorClickLarge;
            $carousel.css("width", imgWidth*imagesEnDesktop+"px");
        }
    }*/
    /*
    $(document).ready(function(){
        resizeCarousel();
        populateCarouselButtons();
        window.addEventListener("resize", function() {
            resizeCarousel();
            populateCarouselButtons();    
        }, false);
    });
    */
}