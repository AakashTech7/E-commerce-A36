import React, { useEffect, useState } from 'react'
import api from '../../../api'

function Products() {

  const [products, setProducts] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  const fetchProducts = async () => {
    try {

      const response = await api.get(`/products?page=${currentPage}&size=3`);
      setTotalPages(response.data.totalPages)// total no of pages
      setProducts(response.data.content)

    } catch (error) {
      alert("Something went wrong")
    }
  }


  useEffect(() => {
    fetchProducts()
  }, [currentPage])


  const addToCart=async (productId)=>{

    try {

      const response=await api.post(`/cart/add-to-cart/${productId}`,{
        quantity:1
      })

      alert("Product added into cart")
      
    } catch (error) {
      
      alert("Something went wrong")
    }

  }

  return (
    <div className="container py-4">

      <button className='btn btn-primary m-2'
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 0}
      >Previous</button>
      <button className='btn btn-primary m-2'
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
      >Next</button>

      <div className="row g-4">
        {products &&
          products.map((p) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={p.imageUrl}
                  className="card-img-top"
                  alt={p.name}
                  style={{ height: "220px", objectFit: "contain" }}
                />

                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text text-muted">
                    {p.description}
                  </p>

                  <p className="card-text text-muted ">
                    ${p.price}
                  </p>

                  <button className='btn btn-primary' onClick={()=>addToCart(p.id)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

}

export default Products