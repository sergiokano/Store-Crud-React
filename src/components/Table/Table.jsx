import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { show_alerta } from "../../functions";

const Table = () => {
  const url = "https://fakestoreapi.com";
  const [products, setProducts] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [operation, setOperation] = useState(1);
  const [head, setHead] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await axios.get(url + "/products");
    setProducts(res.data);
  };
  const openModal = (op, id, title, description, price) => {
    setOperation(op);
    setId("");
    setName("");
    setDescription("");
    setPrice("");
    if (op === 1) {
      setHead("Nuevo Producto");
    } else if (op === 2) {
      setHead("Editar Producto");
      setId(id);
      setName(title);
      setDescription(description);
      setPrice(price);
    }
    window.setTimeout(function () {
      document.getElementById("nombre").focus();
    }, 500);
  };
  const validate = () => {
    let params;
    let method;
    let endpoint;
    if (name.trim() === "") {
      show_alerta("Escribe el nombre del producto", "warning");
    } else if (description.trim() === "") {
      show_alerta("Escribe la descripción del producto", "warning");
    } else if (!price || String(price).trim() === "") {
      show_alerta("Escribe el precio del producto", "warning");
    } else {
      if (operation === 1) {
        params = {
          title: name.trim(),
          description: description.trim(),
          price: price,
          image: "https://i.pravatar.cc",
          category: "electronic",
        };
        method = "POST";
        endpoint = url + "/products";
      } else if (operation === 2) {
        params = {
          id: id,
          title: name.trim(),
          description: description.trim(),
          price: price,
          image: "https://i.pravatar.cc",
          category: "electronic",
        };
        method = "PUT";
        endpoint = url + "/products/" + id;
      }
      saveProduct(params, method, endpoint);
    }
  };
  const saveProduct = async (params, method, endpoint) => {
    await axios({
      method: method,
      url: endpoint,
      data: params,
    })
      .then(function (response) {
        console.log("response", response);
        const type = response.status === 200 ? "success" : "error";
        const msj = response.statusText;
        show_alerta(msj, type);
        if (type === "success") {
          document.getElementById("btnClose").click();
          if (operation === 1) {
            setProducts((prevProducts) => [...prevProducts, response.data]);
          } else if (operation === 2) {
            setProducts((prevProducts) => {
              return prevProducts.map((product) =>
                product.id === response.data.id ? response.data : product
              );
            });
          }
        }
      })
      .catch(function (error) {
        show_alerta("Error al guardar el producto", "error");
        console.log(error);
      });
  };

  const deleteProduct = (id, name) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "¿Confirmas que deseas eliminar el producto " + name + "?",
      icon: "warning",
      text: "Esta acción no se puede deshacer",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios({
            method: "DELETE",
            url: `${url}/products/${id}`,
          });
          const deletedProduct = response.data;
          console.log("products", products);
          setProducts((prevProducts) => {
            return prevProducts.filter(
              (product) => product.id !== deletedProduct.id
            );
          });

          show_alerta("Producto eliminado con éxito", "success");
          console.log("response", response);
        } catch (error) {
          show_alerta("Error al eliminar el producto", "error");
          console.log(error);
        }
      }
    });
  };

  return (
    <div className="app">
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-md-4 offset-4">
            <div className="d-grid mx-auto">
              <button
                onClick={() => openModal(1)}
                className="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#modalProducts"
              >
                <i className="fa-solid fa-circle-plus"></i> Añadir Producto
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-lg-8 offset-0 offset-lg-2">
            <div className="table-responsive">
              <div className="table table-bordered">
                <thead>
                  <tr>
                    <th></th>
                    <th>PRODUCTO</th> <th>DESCRIPCIÓN</th> <th>PRECIO</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {products.map((product, i) => (
                    <tr key={product.id}>
                      {/* Aquí tenia puesto un i+1 pero pongo el id para que se vea que se ha borrado mejor */}
                      <td>{product.id}</td>
                      <td>{product.title}</td>
                      <td>{product.description}</td>
                      <td>
                        {new Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "EUR",
                        }).format(product.price)}
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            openModal(
                              2,
                              product.id,
                              product.title,
                              product.description,
                              product.price
                            )
                          }
                          className="btn btn-warning"
                          data-bs-toggle="modal"
                          data-bs-target="#modalProducts"
                        >
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        &nbsp;
                        <button
                          onClick={() =>
                            deleteProduct(product.id, product.title)
                          }
                          className="btn btn-danger"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="modalProducts" className="modal fade" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <label className="h5">{head}</label>
              <button
                id="btnClose"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id" />
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-gift"></i>
                </span>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  placeholder="Nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-comment"></i>
                </span>
                <input
                  type="text"
                  id="descripcion"
                  className="form-control"
                  placeholder="Descripción"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="fa-solid fa-euro-sign"></i>
                </span>
                <input
                  type="text"
                  id="precio"
                  className="form-control"
                  placeholder="Precio"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="d-grid col-6 mx-auto">
                <button onClick={() => validate()} className="btn btn-success">
                  <i className="fa-solid fa-save"></i> Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
