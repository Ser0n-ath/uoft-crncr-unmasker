export const appComponents = (() => {
    "use strict";
  
    const components = {};
  
    // Creates a loading button component with initial text, loading text, and an onClick callback.
    function createLoadingButtonComponent(initialText, loadingText, onClick){
      const container = document.createElement("div");
      container.innerHTML = `
        <button class="action-button centered-button">
          <span class="button-text">${initialText}</span>
          <span class="visually-hidden loading-indicator"></span>
        </button>
      `;
      const button = container.querySelector("button");
      const buttonText = container.querySelector(".button-text");
      const loaderIcon = container.querySelector(".loading-indicator");
  
      button.addEventListener("click", () => {
        loaderIcon.classList.remove("visually-hidden");
        buttonText.textContent = loadingText;
        button.disabled = true;
        onClick();
      });
  
      return container;
    };
  
    // Creates an error page component with a retry button.
    components.createErrorPageComponent = function (onRetry, errorMessage) {
      const errorPage = document.createElement("div");
      errorPage.innerHTML = `
        <div class="error-container">
          <div class="error-header">
            <img class="error-img" src="assets/error.svg" alt="Error Image">
            <h2>An error has occurred.</h2>
          </div>
          <div>
            <textarea class="error-message" readonly style="resize: none;" rows="5" cols="40"></textarea>
          </div>
        </div>
        <hr style="margin-top: 18px">
      `;
      const errorTextArea = errorPage.querySelector("textarea");
      errorTextArea.textContent = errorMessage;
      errorPage.appendChild(createLoadingButtonComponent("Retry", "Retrying", onRetry));
      return errorPage;
    };
  
    // Creates the grades page component displaying course grades and disclaimers.
    components.createGradesPageComponent = function (courseGrades) {
      const gradesPage = document.createElement("div");
  
      // Create header for the grades page.
      const headerDiv = document.createElement("div");
      headerDiv.innerHTML = `
        <h2><b>CR/NCR Grades</b></h2>
        <p>Select a row to view all open programs available for that course.</p>
      `;
  
      // Create the grades table
      const tableWrapper = document.createElement("div");
  
      function createTableRowComponent(courseGrade) {
        const row = document.createElement("tr");
        const courseCell = document.createElement("th");
        const gradeCell = document.createElement("td");
        courseCell.textContent = courseGrade.courseCode;
        gradeCell.textContent = courseGrade.mark;
        row.append(courseCell, gradeCell);
        return row;
      }
  
      const table = document.createElement("table");
      table.classList.add("data-table");
      table.innerHTML = `
        <thead>
          <tr>
            <th>Course</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody></tbody>
      `;
      const tbody = table.querySelector("tbody");
      courseGrades.forEach(courseGrade => tbody.appendChild(createTableRowComponent(courseGrade)));
      tableWrapper.appendChild(table);
  
      // Create disclaimer notice.
      const disclaimerDiv = document.createElement("div");
      disclaimerDiv.classList.add("action-notice-container");
      disclaimerDiv.innerHTML = `
      <br>
      <hr>
      <h2>Disclaimers</h2>
      <div class="list-container">
        <ul>
          <li>You assume full responsibility for using this tool.</li>
          <li>
            Follow me on my <a href="https://github.com/ser0n-ath" target="_blank" rel="noopener noreferrer">Github</a>
            🐾
          </li>
        </ul>
      </div>
      `;
  
      gradesPage.appendChild(headerDiv);
      gradesPage.appendChild(tableWrapper);
      gradesPage.appendChild(disclaimerDiv);
  
      return gradesPage;
    };
  
    // Creates the landing page component
    components.createLandingPageComponent = function (onLoadHistory) {
      const landingPage = document.createElement("div");
  
      // Create instructions.
      const instructionsDiv = document.createElement("div");
      instructionsDiv.classList.add("action-notice-container");
      instructionsDiv.innerHTML = `
        <h2>Instructions</h2>
        <div class="list-container">
          <ul>
            <li>Sign in to degreeexplorer</li>
            <li>Wait till the webpage has loaded</li>
            <li>Press the reload button below.</li>
          </ul>
        </div>
      `;
  
      // Create disclaimer.
      const disclaimerDiv = document.createElement("div");
      disclaimerDiv.classList.add("action-notice-container");
      disclaimerDiv.innerHTML = `
        <hr>
        <h2>Disclaimers</h2>
        <div class="list-container">
          <ul>
            <li>You assume full responsibility for using this tool.</li>
            <li>Using this tool to exploit infinite CR/NCR is forbidden.</li>
          </ul>
        </div>
      `;
  
      landingPage.appendChild(instructionsDiv);
      landingPage.appendChild(createLoadingButtonComponent("Load", "Loading History", onLoadHistory));
      landingPage.appendChild(disclaimerDiv);
  
      return landingPage;
    };
  
    return components;
  })();  