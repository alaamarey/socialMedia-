📰 Building a Modern Social Media Application with Angular 20
🧩 Overview
---
In this project, I developed a fully functional Social Media Application using the latest features of Angular 20, leveraging Signals for reactive state management and enhancing user experience with tools like SweetAlert2, ngx-toastr, and ngx-pagination.
The project follows a modular, scalable architecture and applies advanced Angular concepts such as Guards, Resolver Guards, Injection Tokens, and lazy routing for performance optimization.

---
⚙️ Core Technologies
---

Angular 20

. Signals for reactive state and live post updates
. SweetAlert2 for beautiful confirmation and alert dialogs
. ngx-toastr for interactive notifications
. ngx-pagination for efficient post listing
. Route Guards & Resolver Guards for secure and optimized navigation
. Injection Token for global configuration and dependency customization
. Angular Router for modular and lazy-loaded routes

---

💡 Project Description
---

The application allows users to:

. Register and log in securely
. Create, edit, and delete posts in real time
. React to posts and view updates instantly using Angular Signals
. Receive instant success or error messages via ngx-toastr
. View confirmation dialogs before deleting posts using SweetAlert2
. Browse posts efficiently through ngx-pagination
. Enjoy a secure experience where only authenticated users can access certain routes

---
🚀 Key Features
---
🧠 1. Signals for Reactive State
Instead of relying solely on RxJS or Services with BehaviorSubject, the project uses Angular Signals to manage post state:
🧭 2. Routing with Guards
AuthGuard: prevents unauthenticated users from accessing private pages.
RoleGuard: ensures only admins can access admin routes
⚡ 3. Resolver Guards for Data Prefetching
Before navigating to a route, Resolvers fetch data to make the user experience smoother:
🎨 4. SweetAlert2 Integration
Used for confirmation before deleting a post:
🔔 5. Toastr Notifications
Used to show friendly success and error messages:

---
🧱 Architecture Highlights
--- 
. Reusable Components: buttons, and forms.
. Signal-based Data Flow: ensures real-time updates without heavy RxJS streams.
. Guarded Routing: maintains both user experience and application security.

---
🎯 Conclusion
----
This project demonstrates how Angular 20 can be used to build a responsive, reactive, and secure social media platform.
By combining Signals, Guards, Resolvers, and UI enhancements like SweetAlert2 and ngx-toastr, the app achieves an excellent balance between modern reactivity and professional user experience.


## 🚀 Live Demo

🔗 [View Website](https://social-media-rosy-gamma.vercel.app/login)  

