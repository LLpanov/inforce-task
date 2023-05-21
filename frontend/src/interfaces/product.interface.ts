export interface IProduct {
	id?:number;
	imageUrl?: string;
	name: string;
	count: number;
	size?: ISize
	weight: string;

}

export  interface ISize {
	width: number;
  height: number;
}