📰 Building a Modern Social Media Application with Angular 20
🧩 Overview
---
In this project, I developed a fully functional Social Media Application using the latest features of Angular 20, leveraging Signals for reactive state management and enhancing user experience with tools like SweetAlert2, ngx-toastr, and ngx-pagination.
The project follows a modular, scalable architecture and applies advanced Angular concepts such as Guards, Resolver Guards, Injection Tokens, and lazy routing for performance optimization.

---
⚙️ Core Technologies
---

Angular 20

Signals for reactive state and live post updates

SweetAlert2 for beautiful confirmation and alert dialogs

ngx-toastr for interactive notifications

ngx-pagination for efficient post listing

Route Guards & Resolver Guards for secure and optimized navigation

Injection Token for global configuration and dependency customization

Angular Router for modular and lazy-loaded routes

---

💡 Project Description
---

The application allows users to:

Register and log in securely

Create, edit, and delete posts in real time

React to posts and view updates instantly using Angular Signals

Receive instant success or error messages via ngx-toastr

View confirmation dialogs before deleting posts using SweetAlert2

Browse posts efficiently through ngx-pagination

Enjoy a secure experience where only authenticated users can access certain routes

---
🚀 Key Features
---
🧠 1. Signals for Reactive State

Instead of relying solely on RxJS or Services with BehaviorSubject, the project uses Angular Signals to manage post state:
``bash 
        posts = signal<Post[]>([]);
         addPost(newPost: Post) {
               this.posts.update((current) => [newPost, ...current]);
              }









