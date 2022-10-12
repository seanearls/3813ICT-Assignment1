# 3813ICT-Assignment1
#3813ICT Assignment 1 - Sean Earls

# Chat App – Documentation

#### Git Link: https://github.com/seanearls/3813ICT-Assignment1.git

## Github
### Layout
The chat app was stored in a folder named assignment1. In this folder I created a server folder for storing all routes, JSON data, the listen file (server initiation), and the server file (imports, and requirement paths).
Inside the src/app folder I stored all the component folders, model folder, and services folder.

### Version Control
My method for version control was to commit after any successful changes/implementations to the app. I tried to commit and push any file in which I had implemented a new function or changes to a template. 
I had sometimes forgotten to commit for a short while which resulted in me having to commit all files with a message detailing everything I could remember changing.
I was mostly successful with committing the changes. However, I should have been more careful as it had resulted in some changes being committed without a record of what was changed.

## Data Structures
### Groups
Groups are made up of 5 components ID, gName, users, assistants, and channel.

ID – The ID of a group is represented as a number. This was used when routing to an instance of a group or group/channel.
gName – The gName (group name) is a string that represents the name of the group to be displayed on the groups, groupAdmin, and chat components. This was also used for finding and deleting a group.
Users – The users part of the group is an array of User data structures. This is used to store the user’s included in the group so that the groups page can display only the groups that a user is a part of.
Assistants – The assistants is an array of user’s names that are an assistant of the group. This is used to allow group assistants to view the configure group button.
Channel – Channel stores an array of channel data structures. These are the channels that can be accessed on the chat component.

### Users
Users are made up of 3 components: username, email, and role.

Username – Username is a string used for the user login. Usernames are used for comparisons to check whether a user is already registered, in a group, in a channel, deleting a user, and adding/removing a user from a channel or group.
Email – The email is a string that is currently only used when registering a user.
Role – A user’s role can be user, admin, or super. These are used for checking permissions of a user. For example, a normal user cannot create groups but an admin or super can.

### Channels
A channel is made up of 3 components: ID, cName, and users.

ID – ID is represented as a number. This is used for routing to a channel and is used as an index when creating a new channel.
cName – The cName (channel name) is a string that represents the name of a channel. This is the name displayed on the group/channel lists. It is also used as an index when deleting a channel.
Users – Users is an array of usernames. This is used for storing which users have access to a group.

### Messages
A message is made up of 2 components: username and message.

Username – The username is saved as the logged in user who sends the message.
Message – The message is the message that the user has typed in to send.


## REST API
authRoute – The auth route is used for the user login. The route requests a username from the login component and compares is with the users collection users’ usernames. If successful, the route sets user.valid to true then returns the user object. If the user object is returned the login component’s onLogin function checks user.valid. If user.valid is true the user is navigated to the groups component. If user.valid is false the login component will alert that the username is incorrect.

getUsersRoute – The users route is used for sending all users to the component that it is called. When a getUsers function is called, the component subscribes to the data that is received (the list of users).

onNewUserRoute – The new user route is used for creating a new user. It requests the username, email, password, and role that was input in the admin component, new user form. If the username is already in use the route will error and let the user know the username is already in use. If the username is not taken, the route will write the new user into the users collection of the databse. The route sends the new user and a boolean, “registered” back to the component. Registered is used for checking whether the new user was registered successfully.

editUserRoute – The edit user route it used for editing a user’s details in the database. The route first requests the username, new username, new email, and new role from the component. Next the updateOne() function is called on the users collection of the database, finding the requested username and updating with the requested new user information. Finally, the username is sent back to the route along with a bool, ‘success’ to confirm the user has been updated successfully.

deleteUserRoute – The delete user route is used for deleting a current user. The route requests the selected username from the admin component. The route then checks that the user is not the super user as they cannot be deleted. If it is not the super user, the deleteOne function is called to remove the user from the database. 

getGroupsRoute – The groups route is used for sending the groups data from the database to a component. The route reads the groups collection of the database and stores it in an object variable, groups. Groups is then sent back to the requesting component so that it can be used.

newGroupRoute – The new group route is creating a new group. The route requests the current admins and supers and stores in in a variable, users. A new group name is requested, and a new ID is requested which is the length of the groups data + 1. The route then inserts a new group to the groups collection with all the received data. The route then sends the new group and a success checking Boolean (groupMade) back to the component to indicate whether the group creating was successful or not.

deleteGroupRoute – The delete group route is used for deleting a group. The route first requests the ID of the group that is being deleted. The route then performs the deleteOne() function in the groups collection on the function with the matching ID .Finally, the route sends back the deleted group, and a Boolean, ‘deleted’ to indicate whether the deletion was a success.

newChannelRoute – The new channel route is used for creating a new channel in a group. The route first requests the channel name, channel ID, group ID, and admins from the component. Next the route checks the channel name does not already exist in with the corresponding group ID, sending an error back if it does. If the channel name doesn’t exist, the new data is pushed into the channels collection of the database. Finally, the channel name and a Boolean, channelMade, are sent back to the component to confirm the success.

deleteChannelRoute – The delete channel route removes a channel from a group. The route requests the ID of the channel to be deleted, and the group ID that corresponds. Next the route performs the deleteOne() function of the requested channel. Finally, the route sends back the channel ID, group ID, and a Boolean, ‘deleted’ to confirm its deletion.

addGroupAssistant – The add group assistant route is used for adding a user to the assistants array of a group in the groups collection of the database. First the route requests the username and group ID from the component. Next, the updateOne() function is called in the groups collection, searching for the requested group ID and pushing the requested username into the assistants array. Finally, the username is sent to the component, along with a bool, ‘userPromoted’ to confirm that the user was successfully promoted.

addGroupUser – The add group user route, is used for adding a user to the users array of a group in the groups collection of the database. First the route requests the username and group ID from the component. Next, the updateOne() function is called in the groups collection, searching for the requested group ID and pushing the requested username into the users array. Finally, the username is sent to the component, along with a bool, ‘userAdded’ to confirm that the user was successfully added to the group.

getAssistants – The get assistants route is used for retrieving the assistants of a group. First the route initiates some empty arrays: supers, admins, assistants, and nonAssistants. Next, it requests the group ID. The route then searches the users collection of the database to retrieve the admins and supers and assigns them to the corresponding arrays. Next, the route finds the group with the requested group ID in the groups collection of the database. The route then then checks which users in the collection are not included in the assistants array and assigns these to the nonAssistants array. The assistants from the collection (excluding ‘super’) are pushed to the assistants array. Finally, the four arrays are sent back to the component.

getChannels.- The get channels route is used for retrieving the channels from the database. The route finds all channels from the channels collection of the database and sends them back to the component.

removeGroupAssistant – The remove group assistant route is used for removing a user from the assistants array of a group in the groups database. First the route requests the username and the group ID from the component. Next, it performs the updateOne() function searching for the group ID and pulling the username from the assistants array. Finally, the username and a bool, ‘userDemoted’ (for checking whether the user was deleted) are sent back to the component.

removeGroupUser – The remove group user route is used for removing a user from the users array of a group in the groups database. First the route requests the username and the group ID from the component. Next, it performs the updateOne() function searching for the group ID and pulling the username from the users array. Finally, the username and a bool, ‘userRemoved’ (for checking whether the user was deleted) are sent back to the component.


## Angular Architecture
### Components

#### App Component
The App Component is the base of the application and can be navigated to using the ‘Home’ link in the navigation menu. The page contains the HTML for the navigation menu. The component file contains one function used for logging the user out of the account. When a user is not logged in the navigation displays two links, ‘Home’ and ‘Login’. If a user clicks the login link, they are taken to the login component.

#### Login Component
##### HTML File
The login component HTML contains a form in which a user can input their username and password, and a button which is linked to the onLogin() function stored in the component file.
##### Component File
The onLogin() function is the only function stored in the login component. This function first checks the user has entered text into both the username and password field, it will return an alert saying, “Please enter a username and password.” If either of the fields are left blank. This function is described in further detail in the above section “REST API”. Once the user has input a correct username and password, they are directed to the groups component.


#### Groups Component
##### HTML File 
The groups component HTML file welcomes the user and displays their username. Next on the page is a table listing out the groups that the logged-in user’s username is in the user list of. An open button is displayed at the end of each table row which navigates the user to the corresponding group page. If the logged-in user’s role is super or admin a delete button is also displayed allowing them to delete the group. Also, if the user is a super or admin a form at the bottom of the page is displayed allowing them to input a new group name and a ‘Create Group’ button which adds the new group name to the groups list in the database.
##### ComponentFile
The groups component page contains 6 functions: getGroups(), getAdmins(), openGroup(), getLastGroup(), addGroup(), and deleteGroup().

###### Functions (explained in more detail in REST API section of documentation)
getGroups() – The getGroups() function retrieves all the groups from the database. Then checks which ones the logged-in user’s username appears in and adds these to the array ‘validGroups’. The validGroups data is then saved into the components groups array to be used for displaying in the group list on the HTML file.
getAdmins() – The getAdmins() function retrieves all the users stored in the database and checks which users’ roles are super or admin. These users are then stored in the ‘admins’ array in the component. This users in this list are added to the users list and admins list of newly created groups.
openGroup() – The openGroup() function is used for navigating the user to the group component of the corresponding group.
getLastGroup() – the getLastGroup() function retrieves the list of groups from the database.  Next, the newID variable on the component is set as the number of groups in the database plus one. This function is used for setting an ID for a newly created group.
addGroup() – The addGroup() function first checks if a new group name has been typed in, in the form on the HTML page, returning an alert requesting “Please enter a group name.” if not. If successful the new group is added to the database containing the new group name, the new ID (retrieved in the getLastGroup() function), a user list, and an assistant list (both initially set as the admins of the application).
deleteGroup() – The deleteGroup() function takes an ID as a parameter, which is set using an *ngFor loop on the HTML page (the function is called in a button containing the property (click)=”deleteGroup(group.ID)).


#### Group Component
##### HTML File
The HTML file of the group component first welcomes the user by their username. Next, similar to the groups component, is a table containing a list of the channels that are in the group. An open button is displayed at the end of each row in the table which navigates a user to the channel. A delete button is displayed to the assistants of the group which allows them to delete a channel. Next on the page is a create new channel form with a channel name input and a button linked to the addChannel() function of the group component. Next are four separate forms for adding or removing a user from the group and adding or removing an assistant to the group. These four forms contain the select form element with the options containing users that can be added or removed from the group and users in the group that can be promoted or demoted from assistant.

##### Component File
The component file contains 14 functions: getChannels(), getAdmins(), openChannel(), getLastChannel(), addChannel(), deleteChannel, removableUsers(), addableUsers(), getRoles(), removeAdminsFrom(), addAssistant(), removeAssistant(), and removeUser().

###### Functions (explained in more detail in REST API section of documentation)
getChannels() – The getChannels() function retrieves all channels from the database and adds all channels that the logged in user’s username appears in the users array of. These channels are assigned to a validChannels array. The results of this array are then assigned to the components channels array for usage on the page. 
getAdmins() – The getAdmins() functions retrieves a list of all users with the role of admin or super and assigns them to the components admins array. This is used for assigning the initial users of a channel. These users are also unable to be removed from a group’s user or assistant list.
openChannel() – The openChannel() function navigates the user to the channel page taking the group ID and the channel ID as parameters.
getLastChannel() – The getLastChannel() function is retrieves all the channels from the channel collection in the database. Next it reads the length of the channels and assigns the components newID variable to the length of the channels plus one. This is used for assigning a new ID to a newly created channel.
addChannel() – The addChannel() function is connected the add channel form section of the HTML. First the function checks whether a channel name was inputted, if not it returns an alert requesting “Please enter a channel name.”. The function also returns an alert stating if the channel already exists (explained in REST API section). If the channel creation was successful, an alert is displayed telling the user the channel name was created successfully. Finally, the function re-subscribes to the channel list to be displayed on the page.
deleteChannel() – The deleteChannel() function is used for deleting a channel in the current group, and takes the channel ID as the parameter. If successful, the user is alerted that the channel has been deleted. Finally, the function subscribes to the channel list again to display the updated data.
removableUsers() – Removeable users retrieves all groups from the database and assigns all users that are in a group to the removeUsers array. These are the users that can be removed from the group. Then, the function calls the addableUsers() function (explained below).
addableUsers() – Addable users retrieves all users from the database and checks which are not in the removeUsers array (assigned in the removeableUsers() function). The result is then assigned to the addUsers array.
getRoles() – The getRoles() function retrieves all supers and admins from the user database and assigns them to the supers and admins array. Also, the function retrieves all usernames in the assistants’array of the current group. This is used for retrieving all users that can be promoted or demoted from assistant of a group.
removeAdminsFrom() – The removeAdminsFrom() function, removes admins and supers from the array of users that can be demoted from assistant as they should always be assistants of a group.
addAssistant() – The addAssistant() function retrieves the selected username from the form on the HTML page. This username is then added to the assistants array of the current group. Next, this username is removed from the addAssistants array and removed from the removeAssistants array.
removeAssistant() – the removeAssistant() function, retrieves the selected username from the corresponding form on the HTML page. This username is then removed from the assistants array of the corresponding group in the database. Next this username is spliced from the removeAssistants array and added to the addAssistants array.
addUser() – The addUser() function first checks that a user has been selected in the corresponding form alerting the user if not. If successful, the selected username is added to the users array in the database for the corresponding group. That username is then removed from the addUsers array and added to the removeUsers array of the page. Finally, the function re-subscribes to the group collection in the database.
removeUser() – The removeUser() function first checks a user has been selected in the corresponding form, alerting the user if not If successful, the username is removed from the users array of the corresponding group in the database. Finally, that username is removed from the removeUsers array of the component and added to the addUsers array.


#### Chat Component
##### HTML File
The HTML file displays all messages of the current channel using an ngFor loop. Next is a small form with one field taking a message. The submit button calls the sendMessage() function of the component and adds the message to the message list displayed above.

##### Component File
The component file contains 4 functions: initToConnection(), sendMessage(), userJoined(), and channelDetails()

###### Functions
initToConnection() – initToConnection() calls the initSocket() function from the socket service to initialise the socket. Then calls the getMessage() function from the socket service to retrieve all the messages which are then subscribed to and pushed to the components messages array.
sendMessage() – the sendMessage() function first checks a message was typed into the form. If successful, the logged in user’s username and the typed message are saved as messageData which is then sent to the sendMessage() function of the socketService. If no message was typed in, the user is alerted saying “Please type a message to send.”
userJoined() – the userJoined() function retrieves the logged in user’s username and sends it to the userJoined function of the socket service.
channelDetails() – The channelDetails() function calls the channelDetails() function of the socket service, sending the current group ID, channel ID, and logged in user’s username. This is used to retrieve the current channels messages, so messages are not broadcasted to all channels.


#### Admin Component
##### HTML File
The HTML file of the admin component first welcomes the admin to the page with their username. Next is a form for registering a new user taking 5 inputs: username, email, password, password confirmation, and role. The submit button of this form calls the onNewUser() function of the component. After the first form is a second form in which is only displayed to super admins using an ngIf. First a current user is selected from a drop down list, and clicking the select button calls the getUser() function to retrieve the users details. Once a user is selected a form is displayed in which the admin can edit the user’s email, username, and role. Two buttons appear at the bottom of this form. The first button is to update the user’s details and calls the onEdit() function. The second button is a delete button and calls the onDelete() function.

##### Component File
The admin component contains 5 functions: getUser(), onNewUser(), getLastUserID(), onEdit(), and onDelete().

###### Functions
getUser() – the getUser() function first checks a user has been selected in the form. If not, the admin is alerted “Please select a user.” A for loop then checks which user has been selected and retrieves all their details to be displayed in the edit user form. 
onNewUser() – The onNewUser() function first checks all the fields have been entered, and alerts the admin if not. If the fields have been entered, the function then checks both passwords match, and alerts the admin if not. If passwords do match, the data is then sent to the server to check whether the username is already in use, alerting the admin if so. Finally, if there are no errors, the new user details are added to the users collection in the database. The newID variable is then incremented by one and the getUsers() function from the user service is called and subscribed to retrieve the updated list of users.
getLastUserID() – The getLastUserID() function retrieves the list of users from the database. Next, the newID function of the component is assigned with the length of the users list incremented by one. This is used for assigning a new ID to a new user.
onEdit() – The onEdit() function retrieves all the data that is entered into the edit user form on the HTML page. This data is then sent to the server to which it updates the corresponding users details in the database. Once successful, the admin is alerted that it was successful. Finally, the function re-subscribes to the users in the database to retrieve the updated list of users.
onDelete() – The onDelete() function, retrieves the selected user from the HTML page and sends the username to the server to be deleted. Once successful, the admin is alerted that the operation was successful. Next, the edit user form is hidden again. Finally, the function re-subscribes to the users in the database to retrieve the updated list of users.

#### Models
Four models were used in the application: Channel model, Group model, Message model, and User model.

#### Services
##### Groups Service
The groups service contains one function, getGroups(). This function subscribes to the getGroups route, used for displaying and manipulating group data.

#####User Service
The user service contains two functions, getUsers(), and onNewUser(). The getUsers() function subscribes to the getUsers route and is used for displaying and manipulating user data. The onNewUser() function takes a user as the parameter and posts it to the onNewUser route, used for creating a new user.

#####Socket Service
The socket service contains 6 functions: initSocket(), sendMessage(), userJoined(), userLeft(), channelDetails(), and getMessage(). The initSocket() function is used for initialising the socket connection. The sendMessage() function, takes a message as a parameter and emits it to the socket.js file in the server. The userJoined() function takes a username as a parameter and emits “username has joined the room” for an announcement. The userLeft() function works the same as the userJoined function, however, emits a message when a user has left the room. The channelDetails() function takes the channels details as a parameter and is used for segregating different rooms so messages don’t appear in all rooms. Finally, the getMessage() function is used for returning a sent message as an observable so subscribed users can view it.

