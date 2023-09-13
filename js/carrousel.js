
window.addEventListener('load',function(){
    new Glider(document.querySelector('.carousel__lista'), {
        slidesToShow: 3,
        slidesToScroll:1,
        dots: '.carousel__indicadores',
        arrows: {
          prev: '.carousel__anterior',
          next: '.carousel__siguiente'
        },
        responsive: [
            {
              // screens greater than >= 775px
              breakpoint: 305,
              settings: {
                // Set to `auto` and provide item width to adjust to viewport
                slidesToShow: 1,
                slidesToScroll: 1,
                
              }
            },{
              // screens greater than >= 1024px
              breakpoint:1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
             
              }
            }
          ]
        
      });
    });

    window.addEventListener('load',function(){
      new Glider(document.querySelector('.carousel__lista2'), {
          slidesToShow: 1,
          slidesToScroll:1,
          dots: '.carousel__indicadores2',
          arrows: {
            prev: '.carousel__anterior2',
            next: '.carousel__siguiente2'
          },
          responsive: [
              {
                // screens greater than >= 775px
                breakpoint: 305,
                settings: {
                  // Set to `auto` and provide item width to adjust to viewport
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  
                }
              },{
                // screens greater than >= 1024px
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
               
                }
              }
            ]
          
        });
      });
    