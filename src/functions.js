import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export function show_alerta(mensaje, icono, foco = "") {
  onfocus(foco);
  const MySwal = withReactContent(Swal);
  MySwal.fire({
    title: mensaje,
    icon: icono,
  });
}
function onfocus(foco) {
  if (foco !== "") {
    const element = document.getElementById(foco);
    if (element) {
      element.focus();
    } else {
      console.error(`El elemento con ID '${foco}' no se encontró en el DOM`);
    }
  }
}
