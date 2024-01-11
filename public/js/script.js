// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })();

  document.getElementById('menu-icon').addEventListener('click', function() {
    var navbarNavAltMarkup = document.getElementById('navbarNavAltMarkup');
    navbarNavAltMarkup.style.backgroundColor = ' #ebe8eb';
    navbarNavAltMarkup.style.padding="10px";
    navbarNavAltMarkup.style.borderRadius='20px;'
    // navbarNavAltMarkup.style.display='none';
    navbarNavAltMarkup.style.marginTop='45px';
  });

  // while(true){
    document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('menu-icon').addEventListener('click', function() {
    let container=document.getElementById('container-bp');
    var footerbp=document.getElementById('footerbp');
    footerbp.style.display='none';


    container.style.visibility='hidden';
    // container.style.display = (container.style.display === 'none') ? 'block' : 'none';
    document.getElementById('menu-icon').addEventListener('click', function() {
      let container1=document.getElementById('container-bp');
    var footerbp=document.getElementById('footerbp');

      container1.style.visibility='visible';
    footerbp.style.display='block';


      document.getElementById('menu-icon').addEventListener('click', function() {
        let container1=document.getElementById('container-bp');
    var footerbp=document.getElementById('footerbp');

        container1.style.visibility='hidden';
    footerbp.style.display='none';

        document.getElementById('menu-icon').addEventListener('click', function() {
        window.location.reload(true);
    });

    });

    });
    });
  });


    
  // }
    // document.getElementById('menu-icon').addEventListener('click', function() {
    //   let container=document.getElementById('container-bp');
    //   container.style.visibility='visible';
    //   // container.style.visibility = (container.style.visibility === 'hidden') ? 'visible' : 'hidden';
    
    //   });