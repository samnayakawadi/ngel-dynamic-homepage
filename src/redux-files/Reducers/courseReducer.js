import { PAID_COURSE_TYPE, FREE_COURSE_TYPE, SEARCH, CATEGORY,ENROLLED, SEARCHENGINE } from '../Types/courseTypes';

const initialState = {
    paidCourse: '',
    freeCourse: '',
    inputValue: '',
    categoryValue: '',
    searchEngine: ''
}

const courseReducer = (state = initialState, action) => {

  //  //console.log("helooooooooooooo" + action.payload, action.type);
    switch (action.type) {
        case PAID_COURSE_TYPE:


            return {
                ...state,
                paidCourse: action.payload
            }
      //      //console.log('AAAAAAAAAAAAAAAAAAAAAAAAAA ', state)
        case FREE_COURSE_TYPE:


            return {
                ...state,
                freeCourse: action.payload
            }

        case SEARCH:

            state = {
                ...state,
                inputValue: action.payload
            }
        case CATEGORY:

            state = {
                ...state,
                categoryValue: action.payload
            }
        case  SEARCHENGINE : 

            state = {
                ...state,
                searchEngine : action.payload
            }
        //return Object.assign({}, state, { inputValue: action.text });

        default: return state// return state
    }

}


export default courseReducer;
