import { Input } from '@/components/ui/input';
import { SearchIcon, PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react'

const CustomerSearch = () => {
  return (
    <div className='p-4 border-b'>
      <div className='flex gap-2'>
        <div className='relative flex-1'>
          <Input placeholder='Search customers...'  type='text' className='pl-10' />
          <SearchIcon className='absolute left-2 top-1/2 transform -translate-y-1/2' />
        </div>
        <Button className='PY-5'><PlusIcon className='h-4 w-4 mr-4' /> Add New </Button>

      </div>

      
    </div>
  )
}
export default CustomerSearch;