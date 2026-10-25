import React, { useEffect, useState } from 'react'
import api from '../../../api'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';


function ProductAdmin() {

  // step 1
  const [products,setProducts]=useState([])
  const [selectedProduct,setSelectedProduct]=useState();

  // step 2 :Create a function to fetch data from api
  const fetchProducts=async ()=>{
    try {

      const response=await api.get("/products");
      setProducts(response.data.content)
      
    } catch (error) {
      console.log(error)
      alert("Something went wrong")
    }
  }

  // Step 3: Call function in useEffect
  useEffect(()=>{
      fetchProducts();
  },[])

  //  To delete Product
  const handleDelete= async (id)=>{
    try {
       const response=await api.delete(`/products/${id}`)
      //  to refresh products
        fetchProducts();
       console.log(response);
       alert("Product deleted")
    } catch (error) {
      console.log(error)
      alert("Something went wrong")
    }
  }


  // useForm

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

// onSubmit

const onSubmit=async (data)=>{
  try {
   const response=await api.put(`/products/${selectedProduct.id}`,data);
   console.log(response);
   document.getElementById('close-button').click()
   fetchProducts()
  } catch (error) {
    console.log(error)
    alert("Something went wrong")
  }
}

// 
const handleToEdit=(product)=>{
   setSelectedProduct(product)
   console.log(product)
   reset({
      name:product.name,
      description:product.description,
      price:product.price,
      imageUrl:product.imageUrl
   })
}


  return (
    <div>
      <div className="container mt-4">
  <h3 className="mb-3">Product List</h3>

  <table className="table table-striped table-bordered table-hover">
    <thead className="table-dark">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
        <th>Category</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {products &&
        products.map((p, index) => (
          <tr key={p.id}>
            <td>{index + 1}</td>
            <td>{p.name}</td>
            <td>₹{p.price}</td>
            <td>{p.description}</td>
            <td>{p.category ? p.category.name :" Not assigned"}</td>

            <td>
              <button
                className="btn btn-primary btn-sm me-2"
                data-bs-toggle="modal" data-bs-target="#exampleModal"
                onClick={()=>handleToEdit(p)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={()=>handleDelete(p.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>

{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id='close-button'></button>
      </div>
      <div class="modal-body">
       <div className="admin-form-page">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Product management</p>
          <h1 className="dashboard-title">Update Product</h1>
         
        </div>

        <Link to="/admin/products" className="btn btn-outline-secondary dashboard-action-btn">
          Back to Products
        </Link>
      </div>

      <div className="admin-form-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label">Name</label>
              <input
                type="text"
                className={`form-control ${errors.name ? "input-error" : ""}`}
                placeholder="Product name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                })}
              />
              {errors.name && (
                <small className="error-message">{errors.name.message}</small>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">Price</label>
              <input
                type="number"
                step="0.01"
                className={`form-control ${errors.price ? "input-error" : ""}`}
                placeholder="0.00"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Price must be greater than or equal to 0",
                  },
                })}
              />
              {errors.price && (
                <small className="error-message">{errors.price.message}</small>
              )}
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label">Image URL</label>
              <input
                type="text"
                className={`form-control ${errors.imageUrl ? "input-error" : ""}`}
                placeholder="https://example.com/image.jpg"
                {...register("imageUrl", {
                  required: "Image URL is required",
                  
                })}
              />
              {errors.imageUrl && (
                <small className="error-message">
                  {errors.imageUrl.message}
                </small>
              )}
            </div>

            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                rows="5"
                className={`form-control ${errors.description ? "input-error" : ""}`}
                placeholder="Write a short product description"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
              />
              {errors.description && (
                <small className="error-message">
                  {errors.description.message}
                </small>
              )}
            </div>

            <div className="col-12">
              <button type="submit" className="admin-submit-btn">
                Update Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
      </div>
    
    </div>
  </div>
</div>
    </div>
  )
}

export default ProductAdmin