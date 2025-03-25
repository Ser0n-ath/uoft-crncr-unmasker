import { appComponents } from './components.js';
import { markService } from './service/mark.js';

import { APP_ACTIONS, appStore } from './state/app-state.js';
import { MARK_ACTIONS, markStore} from './state/mark-state.js';



function displayMarkPage() {
  // Start marks loading.
  markStore.dispatch({ type: MARK_ACTIONS.LOAD_MARKS });
  markService.getAcademicHistory()
    .then(academicHistory => {
      const filteredResults = markService.filterForMaskedCourses(academicHistory);
      markStore.dispatch({ type: MARK_ACTIONS.LOAD_MARKS_SUCCESS, marks: filteredResults });
    })
    .catch(error => {
      console.log(error);
      markStore.dispatch({ type: MARK_ACTIONS.LOAD_MARKS_FAILURE, message: error.message });
    });
}


/**
 * Renders the landing (or error) page.
 * This component only depends on the overall app state.
 */
function renderLandingPage() {
  const appContainer = document.querySelector(".app-body");
  const appState = appStore.getState();
  const markState = markStore.getState();

  // If an error occurred, show the error page.
  console.log(appState.status);
  if (appState.status.error) {
    appContainer.innerHTML = "";
    appContainer.appendChild(appComponents.createErrorPageComponent(() => {displayMarkPage()}, appState.status.message));
  }
  // Otherwise, if marks are not yet loaded, render the landing page.
  else if (!markState.status.loaded) {
    appContainer.innerHTML = "";
    appContainer.appendChild(appComponents.createLandingPageComponent(displayMarkPage));
  }
}

/**
 * Renders the marks (grades) page.
 * This component only depends on the mark state.
 */
function renderMarksPage() {
  const appContainer = document.querySelector(".app-body");
  const markState = markStore.getState();
  console.log(markState.status);

  if(markState.status.error){
    appContainer.innerHTML = "";
    console.log(markState);
    appContainer.appendChild(
      appComponents.createErrorPageComponent(() => {displayMarkPage()}, markState.status.message)
    )
  }else if (markState.status.loaded) {
    appContainer.innerHTML = "";
    appContainer.appendChild(appComponents.createGradesPageComponent(markState.marks));
  }

}

appStore.subscribe(renderLandingPage);
markStore.subscribe(renderMarksPage);

function bootstrapApplication() {
  appStore.dispatch({ type: APP_ACTIONS.LOAD_PAGE });
  console.log("The app has loaded!");
}

window.onload = () => {
  bootstrapApplication();
};
