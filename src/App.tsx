
import './App.css'
import Form from './components/Form';
import './index.css';
import { useEffect, useMemo, useReducer } from "react"
import { activityReducer,initialState } from "./reducers/activity-reducer"
import PendingTasks from './components/PendingTasks';
import FinishedTasks from './components/FinishedTasks';

function App() {
const [state,dispatch]=useReducer(activityReducer,initialState)

useEffect(() =>{
  localStorage.setItem('activities', JSON.stringify(state.activities))
  localStorage.setItem('activitiesFinished', JSON.stringify(state.activitiesFinished))

},[state.activities, state.activitiesFinished])

const isDisabled=()=>useMemo(() => state.activities.length||state.activitiesFinished.length,[state.activities,state.activitiesFinished])


  return (
    <>
     <header className="bg-red-600 py-3">
        <div className=" max-w-4xl mx-auto flex justify-center items-center">
          <h1 className="text-center  text-lg font-bold text-white uppercase">Lista de Actividades diaria</h1>

          <button className="ml-60 bg-amber-100 hover:bg-amber-200 p-2 font-bold uppercase text-black cursor-pointer rounded-lg
          text-sm disabled:opacity-10 " disabled={!isDisabled()} onClick={()=>dispatch({type:'restart-activities'})} >Reiniciar Actividades</button>    
          
        </div>
        
      </header>
      <section className="bg-amber-100 py-20 px-20 gap-1.5 mx-auto grid md:grid-cols-3">

      <div className="">
          <h2 className="text-4xl font-black text-center ">Añade Actividades</h2>
          <div className="space-y-3">
          <Form
          dispatch={dispatch}
          state={state}></Form>
          </div>
    
      </div>

      <div className="">
          <h2 className="text-4xl font-black text-center ">Actividades pendientes</h2>
          <div className="">
           <PendingTasks
           activities={state.activities}
           dispatch={dispatch}></PendingTasks>
          </div>
    
      </div>

      <div className="">
          <h2 className="text-4xl font-black text-center ">Actividades terminadas</h2>
          <div className="space-y-3">
           <FinishedTasks
           activitiesFinished={state.activitiesFinished}
           dispatch={dispatch}></FinishedTasks>
          </div>
    
      </div>
        

      </section>


    </>
  )
}

export default App
