import swal2 from "sweetalert2";
import axios from "axios";

export const activeAcc = (log) => {
  swal2
    .fire({
      title: "Tu cuenta se encuentra desactivada",
      text: "Para reactivar tu cuenta contactate con despegue.info@gmail.com",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Abrir email",
      denyButtonText: "Salir",
    })
    .then((result) => {
      if (result.isConfirmed) {
        window.open('mailto:despegue.info@gmail.com', '_blank')
      } else if (result.isDenied) {
        log({
          returnTo: import.meta.env.VITE_VERCEL || "http://localhost:3000",
        }); //return to localhost/activar cuenta
      }
    });
};

export const bannedAcc = (log) => {
  swal2
    .fire({
      title: "Tu cuenta se encuentra suspendida",
      text: " Para recuperar tu cuenta podes comunicarte con: email@email.com  0800-555-1234",
      icon: "error",
      // showDenyButton: true,
      confirmButtonText: "OK",
      showConfirmButton: true,
      // denyButtonText: "Ok",
    })
    .then((result) => {
      if (result.isConfirmed) {
        log({
          returnTo: import.meta.env.VITE_VERLCE || "http://localhost:3000",
        }); //return to localhost/activar cuenta
        window.localStorage.removeItem("user");
      }
    });
};

export const succesAlert = (message) => {
  const Toast = swal2.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", swal2.stopTimer);
      toast.addEventListener("mouseleave", swal2.resumeTimer);
    },
  });

  Toast.fire({
    icon: "success",
    title: message,
  });
};

export const errorAlert = (message) => {
  const Toast = swal2.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", swal2.stopTimer);
      toast.addEventListener("mouseleave", swal2.resumeTimer);
    },
  });

  Toast.fire({
    icon: "error",
    title: message,
  });
};

export const notLogedForPurchase = (loginWithRedirect) => {
    swal2.fire({
        title: "Necesitas iniciar sesion para comprar",
        icon: "warning",
        showConfirmButton: true,
        confirmButtonText: "Iniciar sesion",
        showDenyButton: true,
        denyButtonText: "Cerrar"
    })
    .then((result) => {
        if(result.isConfirmed) loginWithRedirect({redirectUri: import.meta.env.VITE_VERCEL_CALLBACK || "http://localhost:3000/callback"})
    })
}

export const notVerify = () => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    swal2.fire({
        title: "Necesitar verificar el email antes de realizar una compra",
        icon: "warning",
        showConfirmButton: true,
        confirmButtonText: "Enviar mail de confirmacion",
        showDenyButton:true,
        denyButtonText: "Cerrar",
        showLoaderOnConfirm: true,
        user: user,
        preConfirm: async () => {
                    await axios.post('/auth0/verify', { user })
                        .then((response) => {
                            return response.data
                        })
                        .catch((error) => {
                            console.log(error);
                        })
        },
        allowOutsideClick: () => !swal2.isLoading()
    })
    .then((result) => {
        if(result.isConfirmed){
            return swal2.fire("Mail enviado con exito")
        }
    })
    .catch((error) => {
        return swal2.fire("Ha ocurrido un error con el envio de mail");
    })
}

export const noEmail = (history) => {
    swal2.fire({
        title: "Falta completar datos de tu perfil",
        icon: "warning",
        showConfirmButton: true,
        confirmButtonText: "Ir al perfil",
        denyButtonText: "Cerrar",
        showLoaderOnConfirm: true,
    })
    .then((result) => {
        if(result.isConfirmed) history.push('/user')
    })
    .catch((e) => console.log(e))
}

export const noLogViajes = (loginWithRedirect) => {
  swal2.fire({
    title : "Necesitas iniciar sesión para ver tus viajes.",
    icon: "warning",
    showConfirmButton: true,
    confirmButtonText: "Iniciar sesion",
    showDenyButton: true,
    denyButtonText: "Cerrar"
  })
  .then((result) => {
    if(result.isConfirmed) loginWithRedirect({redirectUri: import.meta.env.VITE_VERCEL_CALLBACK || "http://localhost:3000/callback" })
})
}