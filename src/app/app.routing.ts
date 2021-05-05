import { RouterModule } from '@angular/router';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PersonComponent } from './person/person.component';

const appRoutes = [
    { path: '', component: PersonComponent, pathMatch: 'full' },
    { path: 'person', component: PersonComponent, pathMatch: 'full' },
    { path: 'person-detail', component: PersonDetailComponent, pathMatch: 'full' }
];
export const routing = RouterModule.forRoot(appRoutes);