export interface ILayoutHeader {
  title: string;
  link: string;
  image: IHeaderLogo;
}

export interface ILayoutPanel extends INavItem {
  items?: ILayoutPanel[];
}

export interface INavItem {
  title: string;
  icon?: string;
  link?: string;
}

export interface IHeaderLogo {
  url: string;
  name: string;
}