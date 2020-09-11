Firstly, thank you for viewing my project and giving me the opportunity to work on this over the last week, I enjoyed building this application and although I faced a lot of challenges throughout, I'm proud of what I was able to build.

My project is deployed and viewable at: bus-times-app.netlify.app or alternatively you can run this locally by running:

<npm install> to install frontend dependencies

<npm start> to load the dev server

Technologies/Packages

Built with React
Packages used include: react-google maps, axios, reach/combobox, react-google-maps/api,use-places-autocomplete, CSS modules.

My thought process for working on this project was to firstly, focus on the design and how I wanted the app to look and how I would go about achieving this goal thereafter. I spent the first hour looking for inspiration on the likes of dribble.com and looking at applications on the app store to get a good understanding of how intuitive a travel application can be.

Once I had this plan put together and knew what I wanted to build, how to do it and how to structure the app, I began with actually building the project. I recently worked on an application using React and axios that dealt with multiple API's and endpoints so felt I had a fair understanding of how to approach this and extract the information to display the relevant data on the UI.

The way I tackled any uncertainty around building the application was through reading through a lot of documentation on both the Google Maps API and the Transport API, mixed with watching videos on YouTube & Udemy to further understand how to correctly work with API's in React, as well as working with Google Maps effectively.

Some of the challenges I faced included:

1: Using different hooks with React and axios to access the correct information within the TransportAPI, and then translate that data into visual components that integrate with the Maps API.
2: Addressing some minor issues with responsiveness such as the table of data letting you know to scroll left/right on mobile
3: 1 or 2 minor issues with styling once deployed that did not seem to appear when running the project locally.
4: Faced a major issue upon deployment, receiving "For Development Purposes Only" error for Google Maps, this was the main challenge I faced right at the end and upon using Stack Overflow as well as contacting Google Support for further advice/info, I was able to solve this and it seems the issue was storing my apikey in a .env. file and transferring that over. However, in the process of solving this , I faced more challenges with parts of the application breaking and requiring new styling, + changes to the code structure. 5. Once I got the google maps working again on my deployed site, no markers were showing and I was receiving a "requested an insecure XMLHttpRequest endpoint" error, it turns out that overall I was having an error with gaining my api keys from the .env. file and finally fixed this so they are safely stored and not viewable to public.

I feel given more time if I were to approach building this application long term, I would like to add a route planner for the quickest travel time between 2 points, as well as being able to add a "Favourites" tab where users can store their most used/favourite bus stops if this app were to be used regularly. A cool feature would also be allowing the application to receive updates directly from TFL on which services are affected or delayed due to traffic/accidents etc. or potentially being able to track a specific bus and it's entire route for easier journey planning.

I'm still learning and would like to consistently improve my skill set and become as adept at my job as a Developer as quickly and efficiently as possible, hopefully within a company such as LiveSmart where, given my research, I feel the company is working on some incredibly exciting products and making a real impact in the industry, competing against more traditional services by the likes of Nuffield & Bupa.

Thanks again for viewing and I look forward to discussing this project in more detail.
