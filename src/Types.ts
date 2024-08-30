interface getModules {
  id: number;
  name: boolean;
  access: boolean;
  view: boolean;
  create: boolean;
  edit: boolean;
  delete: boolean;
}

export interface access_roles {
  id: number;
  dashboard: getModules;
  order: getModules;
  products: getModules;
  branch: getModules;
  order_history: getModules;
  inventory: getModules;
  user: getModules;
  department: getModules;
  kb: getModules;
  client: string;
  role: string;
}
