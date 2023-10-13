$(document).ready(function(){
  let scroll_link = $('.scroll');

  scroll_link.click(function(e){
      e.preventDefault();
      let url = $('body').find($(this).attr('href')).offset().top;
      $('html, body').animate({
        scrollTop : url
      },700);
      $(this).parent().addClass('active');
      $(this).parent().siblings().removeClass('active');

      return false;
    });
  });


  let mainNavLinks = document.querySelectorAll(".scroll");
  let mainSections = document.querySelectorAll("section");

  window.addEventListener("scroll", event => {
    let fromTop = window.scrollY - 50;

    mainNavLinks.forEach(link => {
      let section = document.querySelector(link.hash);

      if (
        section.offsetTop <= fromTop + 505 &&
        section.offsetTop + section.offsetHeight > fromTop + 505
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });

  
// $('#client-speak').owlCarousel({
//   loop:true,
// autoplay:1000,
//   autoplayHoverPause:true,
// autoplayTimeout:3000,
//   margin:10,
//   nav:true,
//   responsive:{
//       0:{
//           items:1
//       },
//       600:{
//           items:2
//       },
//       1000:{
//           items:3
//       }
//   }
// })

// $('#before-after').owlCarousel({
//   loop:true,
// autoplay:1000,
//   autoplayHoverPause:true,
// autoplayTimeout:3000,
//   margin:10,
//   nav:true,
//   responsive:{
//       0:{
//           items:1
//       },
//       600:{
//           items:1
//       },
//       1000:{
//           items:1
//       }
//   }
// })

// $('#clients').owlCarousel({
//   loop:true,
// autoplay:1000,
//   autoplayHoverPause:true,
// autoplayTimeout:3000,
//   margin:10,
//   nav:true,
//   responsive:{
//       0:{
//           items:5
//       },
//       600:{
//           items:5
//       },
//       1000:{
//           items:5
//       }
//   }
// })
