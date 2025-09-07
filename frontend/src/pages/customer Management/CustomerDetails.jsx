import React from 'react'
import { Button } from '@/components/ui/button';
import { PlaneIcon, StarIcon, UserIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

 const CustomerDetails = ({ customer }) => {
  if(!customer) {
    return (
      <div className='flex flex-col items-center justify-center h-full text-muted-background'>
        <UserIcon className='h-16 w-16 mb-4' />
        <p className='mt-4'>No customer selected</p>
      </div>
    );
  }
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-6'>
        <div >
          <h2 >{customer.fullName}</h2>
          <p className="text-sm text-muted-foreground">{customer.email}</p>
          <p className="text-sm text-muted-foreground">{customer.phone}</p>
        </div>
        <Button>
          <PlaneIcon className='h-4 w-4 mr-1'/> Add Points
        </Button>
      </div>

      <div className='grid grid-cols-1 gap-4 mb-4 md:grid-cols-3'>

        <Card>
          <CardHeader>
            <CardTitle>Loyalty Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex item-center gap-2'>
              <StarIcon className='h-4 w-4 mr-1 text-yellow-500' />
              <span>{customer.loyaltyPoints} Points</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex item-center gap-2'>
              <StarIcon className='h-4 w-4 mr-1 text-yellow-500' />
              <span>{customer.totalOrders} Points</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex item-center gap-2'>
              <StarIcon className='h-4 w-4 mr-1 text-yellow-500' />
              <span>{customer.totalSpent} Points</span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>Purchase History</CardHeader>
          <CardContent>
            {customer.averageOrderValue ? (
              <p className='text-lg font-bold text-muted-foreground'>Average Order Value: ${customer.averageOrderValue.toFixed(2)}</p>
            ) : (
              <p>No purchase history available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default CustomerDetails;
