export interface IRecipePuppy {
    title: string;
    version: number;
    href: string;
    results: IRecipePuppyResults[];    
}
export interface IRecipePuppyResults {
    title: string;
    href: string;
    ingredients: string;
    thumbnail: string;
}

export interface IRecipePuppyFilter {
  ingredient: string;
  checked: boolean;
}
