//FORMULARIO
import { useState,Dispatch,useEffect} from "react"
import { categories } from "../data/categories"
import {ActivityActions,ActivityState} from  "../reducers/activity-reducer" 
import { Activity } from "../types"
import { v4 as uuidv4 } from 'uuid'


type FromProps={
    dispatch:Dispatch<ActivityActions>,
    state:ActivityState
}
export default function Form({dispatch,state}:FromProps) {

    const inicialState:Activity={
        id:uuidv4(),
        category:1,
        name:'',
        hours:0}

    const [activity,setActivity]=useState<Activity>(inicialState)// estado de una actividad

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>|React.ChangeEvent<HTMLInputElement>){
        const isNumber=['category','horas'].includes(event.target.id)// si se disparo category u horas
        setActivity({...activity,[event.target.id]:isNumber? +event.target.value:event.target.value})
    }
     function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        dispatch({type: 'save-activity',payload:{newActivity:activity}})
        setActivity({...inicialState,id:uuidv4()}) // resetear el estado de la actividad al inicial
    }
    const isActivity= ()=>{
        const {name,hours}=activity
        return name.trim()!==''&& hours>0
    }
    useEffect(()=>{
        if(state.activeId) {
            const getActivitie=state.activities.filter(activitie=> activitie.id===state.activeId)
            setActivity(getActivitie[0])
        }
       
    },[state.activeId])
  return (
    <>
    <form onSubmit={handleSubmit} className=" space-y-5 bg-amber-50 shadow p-10 rounded-lg mt-10" >
        
        <div className=" grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categoria:</label>
            <select className="border border-slate-300 p-2 rounded-lg w-full bg-white"
             id="category" onChange={handleChange} >{
                categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))
             }
               
            </select>
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad:</label>
            <input id="name" type="text" className="border border-slate-300 p-2 rounded-lg"
            placeholder="Correr, Leer, Reunion" onChange={handleChange} value={activity.name}
           />

        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Horas:</label>
            <input id="hours" type="number" className="border border-slate-300 p-2 rounded-lg"
            placeholder="Horas" onChange={handleChange} value={activity.hours}
       />

        </div>
        <input value="Guardar" type="submit" className=" bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10 "
        disabled={!isActivity()}
        />
    </form>
    
    </>


)
}
