# SCHEDULER 
scheduler is a web application where users can view schedule jobs, update the jobs , create a new job and also delete the job

# Getting Started

## Prerequisites
[Node](https://nodejs.org/en/)


## Built With
 
 [Nuxt.js](https://nuxtjs.org/)
 
 [vue-Bootstrap](https://bootstrap-vue.org/)
 


## getting started
after cloning the project in cmd write

* ``` npm install ```

after packages are installed , run 
* ``` npm run dev ```

## File Structure

    |avaamo-frontend=akash
        | assets folder (where all images are kept)

        |components──  folder ( Components are what makes up the different parts of your page and can be reused and imported into your pages, layouts and even other components.)
    
                ├── AddNewJob.vue 
                
                ├── DeleteJob.vue
                
                ├── EditJob.vue

                ├── Footer.vue

                ├── HomeScheduler.vue

                ├── Navbar.vue

                ├── ViewSingleJob.vue
                
        
        |── Layout (any ui added here will be used for all pages, for example (footer and navbar are added here))
        
        |── pages (the pages directory contains your application views and routes)
                ├── index.vue (home page "/")
                ├── ADD 
                     ├── index.vue  (add page "/add")


Home page looks like this 

<img src="assets\github\homepage.png">

detail about each component
<img src="assets\github\detailhomepage.jpg">


## Home page details
* navbar - navbar containe two button, which naviagte to home and add page

* notification - whenever job ran successfully , we emit a socket with message  from server and then show it on front end

* search bar - user can search the job by its name

* Add button - on click will take it to Add new job page

* A job contain a "name" ,"updated date", "view more button" , "edit job" and "delete job"

* footer 

By default job is enable, When user click on pause button , that particular job is paused , job will be disbaled untill user resume it back

user can also see more details about the particular job , when they click on the name of that job

* View Single job
<img src="assets\github\ViewSingleJob.jpg">

* Edit Single Job

        Save button will be disabled untill all the required fields or error are resolved

<img src="assets\github\EditsingleJob.jpg">


* Delete a Job
<img src="assets\github\delete.jpg">




## Add page details

In this page user can Create a New job

<img src="assets\github\AddPage.jpg">

if adding job is success , success notification is opened and if its not the we show red cross mark in fe to show that particular job didnt run succesfully


