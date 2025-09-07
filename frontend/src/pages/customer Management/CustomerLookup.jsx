import React from 'react'
import CustomerSearch from './CustomerSearch';
import CustomerList from './CustomerList';
import CustomerDetails from './CustomerDetails';
import PurchaseHistory from './PurchaseHistory';

const CustomerLookup = () => {
    const [selectedCustomer, setSelectedCustomer] = React.useState(null);
    
  return (
    <div className='h-full flex flex-col '>
        <div className='fp-4 bg-card border-b'>
            <h2 className='text-2xl font-bold'>Customer Management</h2>
        </div>
        <div className='flex-1 flex overflow-hidden'>
            <div className='w-1/3 border-r flex flex-col'>
                <CustomerSearch/>
                <CustomerList setSelectedCustomer = {setSelectedCustomer}/>
            </div>
            <div className='w-2/3 flex flex-col overflow-y-auto'>
                <CustomerDetails customer={selectedCustomer}/>
                <PurchaseHistory customer={selectedCustomer}/>
            </div>
        </div>
    </div>
  )
}
export default CustomerLookup;