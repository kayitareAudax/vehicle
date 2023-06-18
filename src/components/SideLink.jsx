import React from 'react'
import {ChartBarIcon} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
const SideLink = ({text,to,icon:Icon,current}) => {
  return (
    <div className={`${current?'bg-secondColor':''} py-2 mb-2 items-center`}>
        <div className='flex flex-row ml-3 items-center'>
                <Icon className={`h-6 w-6 ${current?'text-white':'text-secondColor'} mr-4`}/>
                <Link to={to} className={`${current?'text-white':'text-secondColor'} text-sm`}>{text}</Link>
    </div>
    </div>
  )
}

export default SideLink
