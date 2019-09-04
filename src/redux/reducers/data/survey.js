import * as reducer from '../reducer';

const surveyReducer = (
  state = {
    submits: [],
    viewingSubmit: {},
    answers: [],
    editQuestions: [],
    questions: [],
    questionnaires: [],
    viewingQuestionnaire: {},
    createdQuestionnaires: [],
    createdSubmits: [],
    assignedPublishes: [],
    publishes: [],
    viewingPublish: {},
    createdPublishes: []
  }, action)=>{
  const newEditQuestions = state.editQuestions.slice(0);
  switch (action.type) {
    case 'updateSubmits':
      return {...state, submits: reducer.updateElements(state.submits, action.payload)};
    case 'viewSubmit':
      return {...state, viewingSubmit: action.payload};
    case 'updateAnswers':
      return {...state, answers: reducer.updateElements(state.answers, action.payload)};
    case 'updateQuestions':
      return {...state, questions: reducer.updateElements(state.questions, action.payload)};
    case 'updateQuestionnaires':
      return {...state, questionnaires: reducer.updateElements(state.questionnaires, action.payload)};
    case 'viewQuestionnaire':
      return {...state, viewingQuestionnaire: action.payload};
    case 'updateCreatedQuestionnaires':
        return {...state, createdQuestionnaires: reducer.updateElements(state.createdQuestionnaires, action.payload, true)};
    case 'updateCreatedSubmits':
        return {...state, createdSubmits: reducer.updateElements(state.createdSubmits, action.payload, true)};
    case 'updateAssignedPublishes':
        return {...state, assignedPublishes: reducer.updateElements(state.assignedPublishes, action.payload, true)};
    case 'updatePublishes':
      return {...state, publishes: reducer.updateElements(state.publishes, action.payload)};
    case 'viewPublish':
      return {...state, viewingPublish: action.payload};
    case 'updateCreatedPublishes':
        return {...state, createdPublishes: reducer.updateElements(state.createdPublishes, action.payload, true)};
    case 'setEditQuestion':
      newEditQuestions[action.payload.index] = action.payload.editQuestion;
      //newEditQuestions[action.payload.index]['edited'] = true;
      return {...state, editQuestions: newEditQuestions};
    case 'setEditQuestions':
      return {...state, editQuestions: action.payload};
    case 'killEditQuestionsItem':
      newEditQuestions[action.payload].killed = true;
      return {...state, editQuestions: newEditQuestions};
    case 'removeEditQuestionsItem':
      newEditQuestions.splice(action.payload,1);
      return {...state, editQuestions: newEditQuestions};
    case 'pushEditQuestions':
      return {...state, editQuestions: [...state.editQuestions, action.payload]};
    default:
      return state;
  }
}

export default surveyReducer;
