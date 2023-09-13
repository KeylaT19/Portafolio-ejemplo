//Metodo para el subMenu desplazante en el responsive

const btnSubMenu = document.querySelectorAll(".submenu__btn");

for(let i=0; i < btnSubMenu.length; i++){
    btnSubMenu[i].addEventListener("click", function(){
        if(window.innerWidth < 1000){
            const subLinks = this.nextElementSibling;
            const height = subLinks.scrollHeight;
            
            if(subLinks.classList.contains("desplegar")){
                subLinks.classList.remove("desplegar");
                subLinks.removeAttribute("style");   
            }else{
                subLinks.classList.add("desplegar");
                subLinks.style.height = height+"px";    
            }
        }
    })
}