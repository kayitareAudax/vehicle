import React from 'react'
import {ChartBarIcon} from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
const SideLink = ({text,to,icon:Icon}) => {
  const location=useLocation();
  const isActive=location.pathname==to
  return (
    <div className={`${isActive?'bg-secondColor':''} py-2 mb-2 items-center`}>
        <div className='flex flex-row ml-3 items-center'>
                <Icon className={`h-6 w-6 ${isActive?'text-white':'text-secondColor'} mr-4`}/>
                <Link to={to} className={`${isActive?'text-white':'text-secondColor'} text-sm`}>{text}</Link>
    </div>
    </div>
  )
}

export default SideLink
