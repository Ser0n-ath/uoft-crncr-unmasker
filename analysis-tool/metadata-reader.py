'''
TODO (maybe in v2):

This file presents a set of utilities to collect open programs at uni
We start by performing an enumeration over
for i=0 to max s.t webpage returns error 404: 
https://www.utoronto.ca/academics/programs-directory?field_degrees_value=1&page={i}

We then collect this as a giant csv and submit it to webarchive for crawling.
When webarchive finishes crawling we will be notified.

We are to download the html files from page=0 to {i}, and perform parsing.
Collect all the programs / courses from https://utsc.calendar.utoronto.ca/section/{program}
Scape and reprocess into a db.
'''