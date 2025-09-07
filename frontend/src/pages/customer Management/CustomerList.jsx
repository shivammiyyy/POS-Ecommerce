import React from 'react'
import CustomerCard from './CustomerCard';

const customers = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-202-555-0176",
    loyalityPoints: 120,
    totalOrders: 15,
    totalSpent: 1500.75,
    averageOrderValue: 1700.05
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1-202-555-0124",
    loyalityPoints: 854,
    totalOrders: 30,
    totalSpent: 3000.50,
    averageOrderValue: 2000.00
  },
  {
    id: 3,
    fullName: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "+1-202-555-0148",
    loyalityPoints: 784,
    totalOrders: 25,
    totalSpent: 2500.00,
    averageOrderValue: 1500.75
  },
  {
    id: 4,
    fullName: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1-202-555-0199",
    loyalityPoints: 478,
    totalOrders: 20,
    totalSpent: 2000.25,
    averageOrderValue: 1600.50
  },
  {
    id: 5,
    fullName: "David Brown",
    email: "david.brown@example.com",
    phone: "+1-202-555-0183",
    loyalityPoints: 451,
    totalOrders: 18,
    totalSpent: 1800.00,
    averageOrderValue: 1000.00
  },
];


 const CustomerList = ({ setSelectedCustomer }) => {
  return (
    <div className='flex-1 overflow-y-auto'>
      <div className='divide-y'>
        {customers.map((customer) => (
          <CustomerCard 
          className='cursor-pointer hover:bg-accent '
          setSelectedCustomer={setSelectedCustomer}
          key={customer.id} customer={customer} />
        ))}
      </div>

    </div>
  )
}

export default CustomerList;
