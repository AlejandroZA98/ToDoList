import { Activity } from "../types";

export type ActivityActions=
{type: 'save-activity',payload:{newActivity:Activity}}

export type ActivityState={
    activities: Activity[]
}
export const initialState:ActivityState={
    activities:[]
}

export const activityReducer=(// estado de una lista de actividades
    state:ActivityState=initialState,
    action:ActivityActions
)=>{
    if(action.type==='save-activity'){
        console.log("Guardando info",action.payload.newActivity)
        return{
            ...state,
            activities:[...state.activities,action.payload.newActivity]
        }
    }
    return state;
}