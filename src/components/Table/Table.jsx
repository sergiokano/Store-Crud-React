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
          image: 'https://i.pravatar.cc',
          category: 'electronic'
        };
        method = "post";
      } else if (operation === 2) {
        params = {
          id: id,
          title: name.trim(),
          description: description.trim(),
          price: price,
          image: 'https://i.pravatar.cc',
          category: 'electronic'
        };
        method = "put";
      }
      saveProduct(params, method);
    }
  };
  const saveProduct = async (params, method) => {
    try {
      let response;
      if (method === "post") {
          response = await axios.post(url + "/products", params);
      } else if (method === "put") {
          response = await axios.put(`${url}/products/${params.id}`, params);
      }

      if (response.status === 200 || response.status === 201) {
          console.log("Producto guardado correctamente:", response.data);
          // Aquí puedes agregar cualquier otra lógica que necesites después de guardar el producto
      } else {
          console.error("Error al guardar el producto:", response);
      }
  } catch (error) {
      console.error("Hubo un error al hacer la solicitud:", error);
  }
};


  console.log(products);
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
                    <th>PRODUCTO</th> <th>DESCRIPCIÓN</th> <th>PRECIO</th>{" "}
                    <th></th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {products.map((product, i) => (
                    <tr key={product.id}>
                      <td>{i + 1}</td>
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
                          className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProducts"
                        >
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        &nbsp;
                        <button className="btn btn-danger">
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
