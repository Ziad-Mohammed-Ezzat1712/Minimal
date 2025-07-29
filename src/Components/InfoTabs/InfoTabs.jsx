import React, { useState } from 'react';

// صور لكل تبويب
import Shipping from '../../assets/Shipping.png';
import Refund from '../../assets/Refund.png';
import additionalImg from '../../assets/Refund.png'; // صورة وهمية للقسم الأول

export default function InfoTabs() {
  const [activeTab, setActiveTab] = useState("additional");

  const tabClass = (tab) =>
    `px-4 py-2 font-bold cursor-pointer border-b-2 transition duration-200 ${
      activeTab === tab
        ? "text-black border-red-500"
        : "text-black border-transparent "
    }`;

  // بيانات التبويبات
  const tabs = {
    additional: {
  title: "Additional Information",
  content: (
    <>
      <div className="flex flex-col text-center py-10 items-center gap-8 text-[25px] font-semibold w-full">
        {/* Colors */}
        <div className="flex justify-between items-center gap-6 border-b w-full max-w-7xl pb-4">
          <span>Color:</span>
          <span>Black</span>
          <span>Blue</span>
          <span>Fuchsia</span>
          <span>Green</span>
        </div>

        {/* Sizes */}
        <div className="flex  justify-between items-center gap-6 w-full max-w-7xl">
          <span>Size:</span>
          <span>S</span>
          <span>M</span>
          <span>L</span>
          <span>XL</span>
        </div>
      </div>
    </>
  ),
},

    shipping: {
      title: "Shipping & Delivery",
      image: Shipping,
      content: (
           <>
           <div className='text-left'>
        <p className='text-[20px] text-[#606160] mb-10'>Here's a brief overview of our policies:

</p>
        <ol className="list-decimal pl-5 space-y-5 text-[20px] text-[#606160]">
          <li><span className='block'>Shipping Schedule: </span>
Our partner operates from Saturday to Thursday, 10 am to 6 pm, excluding holidays. </li>
          <li>
           <span className='block'> Maximum Delay: </span>Any delay beyond 5 days results in automatic return processing.
          </li>
          <li><span className='block'>Estimated Delivery:</span>Orders typically arrive within 2 to 8 working days.
</li>
          <li>
           <span className='block'>Shipping Fees: </span>Calculated by location and method during checkout.
</li>
          <li><span className='block'>Shipping Locations: </span>Currently shipping within Egypt.</li>
          <li><span className='block'> Address Accuracy: </span>Double-check your address for accurate delivery.</li>
          <li><span className='block'> Delivery Confirmation: </span>Email confirmation upon successful delivery.</li>
          <li><span className='block'>  Order Tracking:</span>You'll receive a tracking number via email for real-time updates.</li>
        </ol>
        <p className='text-[20px] text-[#606160] my-10'>For assistance, our customer service is ready to help. Thank you for choosing minmal – your satisfaction is our priority </p>
      </div>
        </>
      ),
    },
    refund: {
      title: "Refund and Returns",
      image: Refund,
      content: (
        <>
         <div className='text-left'>
        <p className='text-[20px] text-[#606160] mb-10'>Here's a brief overview of our policies:

</p>
        <ol className="list-decimal pl-5 space-y-5 text-[20px] text-[#606160]">
          <li><span className='block'>Eligibility: </span>
Replacement/return within 14 days with original invoice and item in original condition.
  </li>
          <li>
           <span className='block'>Options: </span>In-store return with invoice.Shipping return: Cairo/Giza (80 EGP), other governorates (100 EGP).


          </li>
          <li><span className='block'>Exclusions: </span>No exchange/refund for tights, beachwear, bags, belts, or offers.
</li>
          <li>
           <span className='block'>Procedure: </span>Notify customer service with invoice details.Choose in-store or shipping return.Follow provided shipping instructions.
</li>
          <li><span className='block'>Inspection: </span>  Returned items are inspected for eligibility.</li>
          <li><span className='block'>Refund: </span>  Issued via original payment method.</li>
        </ol>
        <p className='text-[20px] text-[#606160] mb-10'>For more details or assistance, reach out to our customer service. Thank you for choosing minimal – we're here to ensure your satisfaction.
 </p>
        </div>
        </>
      ),
    },
  };

  const { title, image, content } = tabs[activeTab];

  return (
    <div className="max-w-10xl mx-auto border-b border-t my-28 p-4 ">
      {/* Tabs */}
      <div className="flex gap-8 justify-center text-[25px] text-[#000000] mb-6">
        {Object.keys(tabs).map((key) => (
          <div key={key} className={tabClass(key)} onClick={() => setActiveTab(key)}>
            {tabs[key].title}
          </div>
        ))}
      </div>

   {/* Image + Content */}
<div
  className={`grid ${
    activeTab !== "additional" ? "md:grid-cols-2 items-start" : "place-items-center"
  } gap-6`}
>
  {/* الصورة تظهر فقط لو التاب مش additional */}
  {activeTab !== "additional" && (
    <img
      src={image}
      alt={title}
      className="w-[710px] h-[474px] rounded shadow-md object-cover"
    />
  )}

  {/* المحتوى */} 
  <div className={`${activeTab === "additional" ? "w-full  flex justify-center" : "max-w-xl"} py-2`}>
    <div>{content}</div>
  </div>
</div>


    </div>
  );
}
