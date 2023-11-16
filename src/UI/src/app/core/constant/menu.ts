import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Pages',
      separator: false,
      items: [
        {
          icon: 'heroBuildingStorefront',
          label: 'Dashboard',
          route: '/dashboard',
          children: [
            { label: 'Overview', route: '/dashboard' },
          ],
        },
        {
          icon:'heroFolderOpen',
          label: 'Management',
          route: '/management',
          children: [
            { label: 'Boxes Management', route: '/management/boxes' },
          ],
        },
      ],
    },
  ];
}