import { Routes } from '@angular/router';
import { ChangepasswordComponent } from '../core/auth/changepassword/changepassword.component';
import { LoginComponent } from '../core/auth/login/login.component';
import { RegisterComponent } from '../core/auth/register/register.component';
import { blockloginiftokenGuard } from '../core/guards/blockloginiftoken-guard';
import { postdetailsResolver } from '../core/guards/postdetails-resolver';
import { postsResolver } from '../core/guards/posts-resolver';
import { profilepostsResolver } from '../core/guards/profileposts-resolver';
import { AuthlayoutComponent } from '../core/layout/authlayout/authlayout.component';
import { MainlayoutComponent } from '../core/layout/mainlayout/mainlayout.component';
import { NotfoundComponent } from '../features/notfound/notfound.component';
import { PostdetailsComponent } from '../features/postdetails/postdetails.component';
import { ProfileComponent } from '../features/profile/profile.component';
import { TimelineComponent } from '../features/timeline/timeline.component';
import { UpdatepostComponent } from '../shared/components/post/components/updatepost/updatepost.component';
import { authGuard } from '../core/guards/auth-guard';

export const routes: Routes = [


    {
        path: '', redirectTo: 'timeline', pathMatch: 'full'

    },

    {
        path: '', component: AuthlayoutComponent,
        canActivate: [blockloginiftokenGuard],
        children: [
            {
                path: 'register', component: RegisterComponent, title: 'Register Page',
            },
            {
                path: 'login', component: LoginComponent, title: 'Login Page'
            }
        ]
    },

    {
        path: '', component: MainlayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'timeline', component: TimelineComponent, title: 'TimeLine Page', resolve: { 'timeline': postsResolver },
            },
            {
                path: 'profile', component: ProfileComponent, title: 'Profile Page', resolve: { 'profile': profilepostsResolver }
            },
            {
                path: 'postDetails/:postId', component: PostdetailsComponent, title: 'Post Details Page', resolve: { 'postdetails': postdetailsResolver }

            },
            {
                path: 'updatepost/:postId', component: UpdatepostComponent, title: 'Update Post  Page', resolve: { 'updatepost': postdetailsResolver }
            },
            {
                path: 'changePassword', component: ChangepasswordComponent, title: 'ChangePassword Page'
            }

        ]
    },

    {
        path: '**', component: NotfoundComponent, title: 'NotFound Page'

    }



];
