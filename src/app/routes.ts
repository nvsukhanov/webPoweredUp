import { Routes } from '@angular/router';
import { NotFoundComponent } from '@app/not-found';
import { ROUTE_SECTIONS } from '@app/shared-misc';

export const ROUTES: Routes = [
    {
        path: '',
        redirectTo: ROUTE_SECTIONS.controllers,
        pathMatch: 'full',
    },
    {
        path: ROUTE_SECTIONS.about,
        loadComponent: () => import('@app/about').then(m => m.AboutComponent),
        pathMatch: 'full',
    },
    {
        path: ROUTE_SECTIONS.bluetoothUnavailable,
        loadComponent: () => import('@app/bluetooth-unavailable').then(m => m.BluetoothUnavailableComponent),
        pathMatch: 'full',
    },
    {
        path: ROUTE_SECTIONS.controllers,
        children: [
            {
                path: '',
                loadComponent: () => import('./controllers/controllers-list-page').then(m => m.ControllersListPageComponent),
                pathMatch: 'full'
            },
            {
                path: [ ':id' ].join('/'),
                loadComponent: () => import('./controllers/controller-page').then(m => m.ControllerPageComponent),
                pathMatch: 'full'
            }
        ]
    },
    {
        path: ROUTE_SECTIONS.hubs,
        children: [
            {
                path: '',
                loadComponent: () => import('./hubs/hubs-list-page').then(m => m.HubsListPageComponent),
                pathMatch: 'full',
            },
            {
                path: [ ':id' ].join('/'),
                loadComponent: () => import('./hubs/hub-view-page').then(m => m.HubViewPageComponent),
                pathMatch: 'full'
            },
            {
                path: [ ':id', ROUTE_SECTIONS.hubEdit ].join('/'),
                loadComponent: () => import('./hubs/hub-edit-page').then(m => m.HubEditPageComponent),
                pathMatch: 'full',
            }
        ]
    },
    {
        path: ROUTE_SECTIONS.controlSchemes,
        children: [
            {
                path: '',
                loadComponent: () => import('./control-schemes/control-scheme-list-page').then((m) => m.ControlSchemeListPageComponent),
                pathMatch: 'full',
            },
            {
                path: [ ':schemeName' ].join('/'),
                loadComponent: () => import('./control-schemes/control-scheme-page').then((m) => m.ControlSchemePageComponent),
                pathMatch: 'full',
            },
            {
                path: [ ':schemeName', ROUTE_SECTIONS.binding, ':bindingId' ].join('/'),
                loadComponent: () => import('./control-schemes/binding-edit-page').then((m) => m.BindingEditPageComponent),
                pathMatch: 'full'
            },
            {
                path: [ ':schemeName', ROUTE_SECTIONS.bindingCreate ].join('/'),
                loadComponent: () => import('./control-schemes/binding-create-page').then((m) => m.BindingCreatePageComponent),
                pathMatch: 'full'
            },
            {
                path: [ ':schemeName', ROUTE_SECTIONS.hubEdit, ':hubId', ROUTE_SECTIONS.portEdit, ':portId' ].join('/'),
                loadComponent: () => import('./control-schemes/port-config-edit-page').then((m) => m.PortConfigEditPageComponent),
                pathMatch: 'full'
            }
        ]
    },
    {
        path: ROUTE_SECTIONS.settings,
        loadComponent: () => import('@app/settings').then((m) => m.SettingsComponent),
        pathMatch: 'full'
    },
    {
        path: '**',
        component: NotFoundComponent,
    }
];
