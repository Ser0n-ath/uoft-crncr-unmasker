/*
    Authentication is handled by embedding a LtpaToken2 in the request cookie header. 
    Since the httpOnly flag is enabled, the browser automatically includes these cookies when making
    outbound HTTP requests to its origin.

    Therefore, the user must be signed in with degreeexplorer active so that the request via
    the extension has a degreeexplorer origin.

    -- 
    
    The MarkService is responsible for fetching the academicHistory of a user, and performing the necessary
    transformation to extract their CR/NCR courses and marks
*/

export let markService = (function () {
    "use strict";
  
    let module = {};
    
    module.getAcademicHistory = async function () {
      const apiUrl = "https://degreeexplorer.utoronto.ca/degreeExplorer/rest/dxStudent/getAcademicHistory";
      
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          credentials: 'include'
        });
        
        if (!response.ok) {
          const contentType = response.headers.get("content-type");
          let errorDetail;
          
          if (contentType && contentType.includes("application/json")) {
            errorDetail = await response.json();
          } else {
            errorDetail = await response.text();
          }
          
          // Build an object with all available details
          const errorInfo = {
            url: apiUrl,
            method: "GET",
            status: response.status,
            statusText: response.statusText,
            details: errorDetail
          };
          
          throw new Error(`Fetch error: ${JSON.stringify(errorInfo)}`);
        }
        
        return await response.json();
      } catch (error) {
        // Include extra details from the caught error in the final message
        const fullErrorInfo = {
          url: apiUrl,
          errorName: error.name,
          errorMessage: error.message,
          errorStack: error.stack
        };
        throw new Error(`Note: You might not be on the degreeExplorer page, or signed in. Try again. Stack Trace: getAcademicHistory failed: ${JSON.stringify(fullErrorInfo)}`);
      }
    };

    
    /* 
      Filters and extracts the CR/NCR courses as well as their grade
      from the students academic history

      Need to do more test validations, but we have only sample size of 1.
      I guess issues will be logged when in public.
    */
    module.filterForMaskedCourses = function (academicHistory) {
      const result = [];
      academicHistory.facultyCourses.forEach(faculty => {
        faculty.studentSessions.forEach(session => {
          session.studentCourses.forEach(course => {
            const hasCRNCR = course.taggedComments.some(comment => comment.cmtText === "CR/NCR");
            if (hasCRNCR) {
              result.push({
                courseCode: course.courseTitle,
                mark: course.markPercentValue
              });
            }
          });
        });
      });

      return result;
    }

    return module;
})();