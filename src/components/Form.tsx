import { useState } from "react"
import { categories } from "../data/categories"
import { Activity } from "../types"
import { v4 as uuidv4 } from 'uuid';

export default function Form() {
    const inicialState:Activity={
        id:uuidv4(),
        category:1,
        name:'',
        hours:1

    }
    const [activity,setActivity]=useState(inicialState)

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>|React.ChangeEvent<HTMLInputElement>){
        //console.log("Seleccionando Categoria", event.target.id, event.target.value)
        const isNumber=['category','horas'].includes(event.target.id)// validacion de tipo de dato
        setActivity({...activity,[event.target.id]:isNumber? +event.target.value:event.target.value})
    }


  return (
    <>
    <form 
    className=" space-y-5 bg-amber-50 shadow p-10 rounded-lg mt-10" >
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
            placeholder="Correr, Leer, Reunion" onChange={handleChange}
           />

        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Horas:</label>
            <input id="horas" type="number" className="border border-slate-300 p-2 rounded-lg"
            placeholder="Horas" onChange={handleChange}
       />

        </div>
        <input type="submit" className=" bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        />
    </form>
    
    </>


)
}
