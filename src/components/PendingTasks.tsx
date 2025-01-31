import { Activity } from '../types'
import { Dispatch, useEffect } from "react"
import { ActivityActions } from "../reducers/activity-reducer"
import  { useMemo } from 'react'
import { categories } from '../data/categories'
import { PencilSquareIcon,CheckCircleIcon } from '@heroicons/react/24/outline'

type TasksProps = {
    activities:Activity[],
    dispatch: Dispatch<ActivityActions>}
    
export default function PendingTasks({activities,dispatch}:TasksProps) {
    const categoryName=useMemo(()=>
        (category:Activity['category'])=>categories.map(cat=> cat.id === category ? cat.name : ''),[activities])

    

  return (
    <>
        {activities.length===0?
        <p className='text-2xl text-center text-red-800 pt-5'>No hay actividades agregadas</p>:
            activities.map((activity) => (
                <div key={activity.id} className=' py-5 flex justify-between bg-withe mt-5  '>
                   <div className='space-y-2 flex-grow '>
                     <p className={` justify-center uppercase text-center font-bold  w-full bg-lime-500`}>{categoryName(+activity.category)}</p>
                     <p className='text-2xl font-bold pt-1'>{activity.name}</p>
                     <p className='font-black text-1xl text-lime-500'>Horas: {activity.hours}{' '}</p>
                    </div>  
                    <div className='flex gap-1 items-center'>
                        <button>
                       <PencilSquareIcon className='h-8 w-8 text-gray-800' onClick={()=>dispatch({type:'edit-activity',payload:{id:activity.id}})} />
                        </button>
                        <button>
                       <CheckCircleIcon className='h-8 w-8 text-blue-500' />
                        </button> 
                   </div>
                </div>
            ))
        }
    </>
  )
}

