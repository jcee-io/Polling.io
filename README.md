Polling.io - An Application to Further Discussion
---

IMPORTANT NOTE: There was some vague errors in the last build, and this had to be rebuilt almost exactly the same to be deployment-friendly. However, all of the commits were lost. Please refer to the development branch to see the actual commits and not the fixed ones.

FUTURE DEVELOPMENTS: Please clone out of this branch.

This application uses the React-Auth (Token-based) boilerplate I've created as the initial commit. Here is the link:
https://github.com/jcruzz/react-router-auth-boilerplate-sql


Tech Stack: MariaDB, Redis, Node, Express, React, React-Router, JSONWebToken

User Stories
---
##Authenticated User
1) Keep polls and come back to access them
2) Share poll with friends
3) See the aggregate results of my polls
4) Delete own polls
5) Create a poll with any number of possible items
8) Create a new option on any poll

##Authenticated and Unauthenticated
1) Vote on everyone's polls
2) See poll results in chart form

System Design
---
![system](/polling-io-visual.png)
