import { Activity } from "../types";

export type ActivityActions=
{type: 'save-activity',payload:{newActivity:Activity}}|
{type: 'edit-activity',payload:{id:Activity['id']}} |
{type: 'check-activity',payload:{id:Activity['id']}} 


export type ActivityState={
    activities: Activity[],
    activeId:Activity['id'],
    activitiesFinished: Activity[]
}
export const initialState:ActivityState={
    activities:[],
    activeId:'',
    activitiesFinished:[]
}

export const activityReducer=(// estado de una lista de actividades
    state:ActivityState=initialState,
    action:ActivityActions
    
)=>{
    if(action.type==='save-activity'){
        let updatedeActivities:Activity[]
        if(state.activeId){
            console.log("EDITANDO...") 
            updatedeActivities=state.activities.map(activity=> activity.id===state.activeId?action.payload.newActivity:activity)
        }else{
            updatedeActivities=[...state.activities,action.payload.newActivity]
        }
        return{
            ...state,
            activities:updatedeActivities,
            activeId:''
        }
       
    }
    if(action.type==='edit-activity'){
        console.log("Editando..",action.payload.id)
        return{
            ...state,
            activeId:action.payload.id // cambia el activeId
        }
    }
    if(action.type==='check-activity'){
        console.log("Editando..",action.payload.id)
        if(action.payload.id){
            console.log("EDITANDO...") 
            const getActivitiesFinished=state.activities.filter(activitie=> activitie.id===action.payload.id)
            const getActivities=state.activities.filter(activitie=> activitie.id!=action.payload.id)

            //let finishedTasks:Activity[]

            console.log(getActivitiesFinished)
            return{
                ...state,
                activities:getActivities,
                activeId:'',
                activitiesFinished:[...state.activitiesFinished,getActivitiesFinished[0]]

            }
        }
       
    }
    return state;
}