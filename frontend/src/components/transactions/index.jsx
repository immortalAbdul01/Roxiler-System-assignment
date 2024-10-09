import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

function Transactions({ month,search }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/transaction?search=${search}&month=${month}&page=${page}`);
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [month, page,search]);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="transaction-container">
      <div className="pagination-controls">
        <button onClick={handlePrev} disabled={page === 1}>Prev</button>
        <div>{page}</div>
        <button onClick={handleNext} disabled={page === totalPages}>Next</button>
      </div>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Date of Sale</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item._id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>{item.description}</td>
              <td>{item.category}</td>
              <td>{item.sold ? "Yes" : "No"}</td>
              <td>{new Date(item.dateOfSale).toLocaleDateString()}</td>
              <td><img src={item.image} alt={item.title} style={{ width: "50px" }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default Transactions;
