import React, { useEffect, useState } from 'react';
import Image from '../assets/pdflogo.PNG'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';

const SubTotal = ({ iteam }) => {
  const [price, setPrice] = useState(0);

  const TotalAmount = () => {
    let totalPrice = 0;
    iteam.map((item) => {
      totalPrice += item.price.cost;
      return null;
    });
    setPrice(totalPrice);
  };

  useEffect(() => {
    TotalAmount();
  }, [iteam]);

  const generatePDF = () => {
    const doc = new jsPDF();
    let page;
    const exportDate = format(new Date(), 'H:mm:ss MMM d, yyyy');

    const headers = ['Sr', 'Product Name', 'Description', 'Price'];
    let i = 1;
    let data = iteam.map(item => [i++, item.title.shortTitle, item.title.longTitle, item.price.cost]);
    data.push(['', 'Total', '', `${price}`]);

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
        doc.text("Cart Products", 100, 38, { align: 'center' });
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
    toast.success("Order Successfully Confirmed",{
      position:"top-center",
  })
  }

  return (
    <div>
      <div className='sub_item'>
        <h3>Subtotal ({iteam.length} item) : <strong> Rs.{price} </strong></h3>
      </div>
      <div>
        <button className='sub_Button' onClick={generatePDF}>Download PDF</button>
        <button className='sub_Button'onClick={OrderConfirm} >Order Confirm</button>
      </div>
    </div>
  );
};

export default SubTotal;
