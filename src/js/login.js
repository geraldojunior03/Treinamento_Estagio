const form = {
    email: document.querySelector("#email"),
    senha: document.querySelector("#senha"),
    btnEntrar: document.querySelector("#btn-entrar")
  };
  
  const toastInfo = document.getElementById("toast");
  const progress = document.querySelector(".progress");
  const closeToast = document.querySelector(".xmark");
  
  closeToast.addEventListener('click', () => {
    toastInfo.classList.remove('active');
  
    setTimeout(() => {
      progress.classList.remove('active');
    }, 300);
  });
  
  form.btnEntrar.addEventListener('click', (e) => {
    // e.preventDefault();
  
    // const email = form.email.value;
    // const senha = form.senha.value;
  
    // if (!email || !senha) {
    //   alertaErro();
    //   return;
    // } else if (email.toLowerCase() !== usuarioValido.email || senha !== usuarioValido.senha) {
    //   alertaErro();
    //   return;
    // }
  
    efetuarLogin();
  });
  
  function alertaErro() {
    toastInfo.classList.add("active");
    progress.classList.add("active");
    setTimeout(() => {
      toastInfo.classList.remove("active");
      progress.classList.remove("active");
    }, 5000);
  }
  
  function efetuarLogin() {
    window.open("colaboradores.html", "_self");
  }