CS193X Final Project
====================

Project Name: Team Formation Hub
Your Name: Sophia Dew
Your SUNetID: sdew

Overview
--------
This website allows you to create or search for a group. Then you can add user profile cards to the group to find your next teammate!

Running
-------
npm install

mkdir MongoDB
mongod --dbpath MongoDB
mongosh

npm start

I recommend starting out by creating a group with a unique ID
Then, it should redirect you to the home page. From there, click List Groups to see the group ID (in case you forgot)
Type in that group ID into the box and click Submit!

Now, I recommend clicking 'Post Your Info' to create a profile card. From here, it will navigate to the group page where you can see your card.
If you insert a real LinkedIn URL, it should work when you click connect!


Features
--------
On the home page, you can list groups or create a new group
On the create group page, you must have an ID that doesn't exist yet
On the group page, you can delete profiles from the DOM (note this doesn't permenantly delete it from the group)
On the group page, there is a filter button (note this is just UI now, I had trouble figuring out how to filter)

Collaboration and libraries
---------------------------
None

Anything else?
-------------
Great! 
