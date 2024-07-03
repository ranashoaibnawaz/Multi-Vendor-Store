import React, { useState } from 'react';
import './Admin.css';
import Image from '../assets/pdflogo.PNG'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';

const Admin = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [products, setProducts] = useState([]);

  const handleImageChange = (e) => {
    setProductImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      name: productName,
      description: productDescription,
      price: parseFloat(productPrice), // Convert price to float
      image: productImage,
    };

    setProducts([...products, newProduct]);
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductImage(null);
  };

  const totalPrice = products.reduce((sum, product) => sum + product.price, 0);

  const generatePDF = () => {
    const doc = new jsPDF();
    let page;
    const exportDate = format(new Date(), 'H:mm:ss MMM d, yyyy');

    const headers = ['Sr', 'Product Name', 'Description', 'Price'];
    let i = 1;
    let data = products.map(item => [i++, item.name, item.description, item.price]);
    data.push(['', 'Total', '', `${totalPrice}`]);

    doc.autoTable({
      margin: { top: 48, bottom: 10 },
      head: [headers],
      body: data,
      headStyles: {
        fillColor: [128, 128, 128],
        textColor: [0, 0, 0],
        lineColor: [0, 0, 0],
        lineWidth: 0.1,
        fontSize: 16,
        fontStyle: 'bold',
        halign: 'left'
      },
      bodyStyles: {
        fillColor: [255, 255, 55],
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        fontSize: 12,

      },
      columnStyles: {
        0: { halign: "left" },
        1: { halign: "left" },
        2: { halign: "left" },
        3: { halign: "left" },
      },
      didDrawPage: function () {
        doc.addImage(Image, 172, 10, 32, 25);
        doc.setFontSize(12);
        doc.text(`${exportDate}`, 165, 40);
        doc.setFontSize(26);
        doc.setFont('Lobster');
        doc.text("Multi Vendor Store", 100, 25, { align: 'center' });
        doc.setFontSize(20);
        doc.text("New Added Products", 100, 38, { align: 'center' });
        page = doc.getNumberOfPages();
      },
    });
    doc.setFontSize(10);
    for (let i = 1; i <= page; i++) {
      doc.setPage(i);
      doc.text('Page ' + i + " of " + page, 90, 288);
    }
    window.open(doc.output('bloburl'), '_blank');
  };

  const OrderConfirm = () => {
    toast.success("Add Successfully",{
      position:"top-center",
  })
  }

  return (
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productDescription">Product Description:</label>
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productImage">Product Image:</label>
          <input type="file" id="productImage" onChange={handleImageChange} />
        </div>
        <button type="submit" onClick={OrderConfirm}>Add Product</button>
      </form>
      <h2>Products List</h2>
      <div className="products-list">
        {products.map((product, index) => (
          <div key={index} className="product">
            <img src={product.image} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: Rs.{product.price}</p>
            </div>
          </div>
        ))}
      </div>
      <h2>Total Price: Rs.{totalPrice.toFixed(2)}</h2> {/* Display total price */}
      <div>
        <button className='sub_Button' onClick={generatePDF}>Download PDF</button>
      </div>
    </div>
  );
};

export default Admin;
