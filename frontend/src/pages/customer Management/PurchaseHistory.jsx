import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar1Icon, DollarSign, ShoppingBag } from 'lucide-react';
import React from 'react'

const orders = [
  {
    id: 1,
    date: '2023-10-01',
    total: '150.00',
    createdAt:"2023-10-01T10:00:00Z",

  },
  {
    id: 2,
    date: '2023-09-15',   
    total: '85.00',
  },
  {
    id: 3,        
    date: '2023-08-30',
    total: '200.00',
  },
];
 const PurchaseHistory = () => {
  return (
    <div className='p-4 border-t'>
      <Card>
        <CardHeader className='flex flex-row items-center space-x-4 pb-2'>
          <ShoppingBag className='sm:w-6 sm:h-6' />
          <CardTitle >Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'></div>
          {orders.map((order) => (
            <div key={order.id} className='border rounded-lg p-4'>
              <div className='flex justify-between items-start mb-2'>
                <div>
                  <h3 className='font-medium'>Order #{order.id}</h3>
                  <Calendar1Icon className='text-sm text-muted-foreground' />{order.date}
                  
                </div>
              </div>
              <div className='text-right'>
                <div className='flex item-center gap-2 mb-1'>
                  <DollarSign className='text-sm text-muted-foreground' />
                
                </div>

              </div>

            </div>
          ))}
        </CardContent>
        
      </Card>
    </div>
  )
}

export default PurchaseHistory;
