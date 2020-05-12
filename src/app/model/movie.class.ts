export class Movie {
    id: number;
    title: string;
    rating: string;
    year: number;
    director: string;

    constructor(id: number = 0, title: string = "",
        rating: string = "", year: number = 0,
        director: string = "") {

    }

    about(): string {
        return `Movie Details:  id=${this.id}, title=${this.title}, 
                rating=${this.rating}, year=${this.year}, 
                director=${this.director}`;
    }
}
