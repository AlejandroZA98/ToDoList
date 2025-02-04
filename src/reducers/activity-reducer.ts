import { Activity } from "../types";

export type ActivityActions=
{type: 'save-activity',payload:{newActivity:Activity}}|
{type: 'edit-activity',payload:{id:Activity['id']}} |
{type: 'check-activity',payload:{id:Activity['id']}}|
{type: 'delete-activity',payload:{id:Activity['id']}}|
{type: 'restart-activities'}


export type ActivityState={
    activities: Activity[],
    activeId:Activity['id'],
    activitiesFinished: Activity[]
}
const localStorageActivities =() :Activity[] =>{
    const activities=localStorage.getItem('activities');
        return activities ? JSON.parse(activities) : []
}
const localStorageActivitiesFinished =() :Activity[] =>{
    const activitiesFinished=localStorage.getItem('activitiesFinished');
        return activitiesFinished ? JSON.parse(activitiesFinished) : []
}
export const initialState:ActivityState={
    activities:localStorageActivities(),
    activeId:'',
    activitiesFinished:localStorageActivitiesFinished()
}


export const activityReducer=(// estado de una lista de actividades
    state:ActivityState=initialState,
    action:ActivityActions
    
)=>{
    if(action.type==='save-activity'){
        let updatedeActivities:Activity[]
        if(state.activeId){
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
        return{
            ...state,
            activeId:action.payload.id // cambia el activeId
        }
    }
    if(action.type==='check-activity'){
        if(action.payload.id){
            const getActivitiesFinished=state.activities.filter(activitie=> activitie.id===action.payload.id)
            const getActivities=state.activities.filter(activitie=> activitie.id!=action.payload.id)

            //let finishedTasks:Activity[]

            return{
                ...state,
                activities:getActivities,
                activeId:'',
                activitiesFinished:[...state.activitiesFinished,getActivitiesFinished[0]]

            }
        }
       
    }
    if(action.type==='delete-activity'){
        return{
            ...state,
            activeId:'',
            activitiesFinished:state.activitiesFinished.filter(activitieFinished=> activitieFinished.id!=action.payload.id)
        }
    }
    if (action.type==='restart-activities'){
        return{
            activities:[],
            activeId:'',
            activitiesFinished:[]
        }
    }
    return state;
}