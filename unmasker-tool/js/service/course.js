/*
    For long-term usage, decided the extension to keep a local database of all known UofT courses.
    and programs. 
    
    Maintaining a server for this database is expensive/too much work, and relying on static storage like github does 
    not guarantee future data availability incase the repo goes down. 
    
    Using automation, we compiled a set of useful links that expose both programs and their course requirements. 
    We then generate a CSV file of all known programs and courses and submit it to the web archive for crawling and preservation. 
    Afterwards, we request updates from the web archive.

    Our pipeline preprocessor first extracts all page content from the html and then uses a locally fine-tuned language model 
    to format the text before inserting it into the database. Finally, all UofT programs are classified as
    either Open or Closed, and each course is identified by its course code.

    If one woud like to refresh the extensions course/program db, they'd have to rerun the data generation script 
    followed by rebuild of the extension.    
*/

let courseService = (function () {
    "use strict";
  
    let module = {};
    
    /*
        Given a course, query for a list of programs that have this course
        as a program requirement. 

        The programs can either be open / closed.
        If a course is not found, then an error is thrown.
    */
    module.getRequiredPrograms = function (courseCode) {};
    module.getEligibleProgramRequirements = function () {}

    return module;
})();