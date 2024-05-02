export interface Movie {
    _id: string;
    name: string;
    description: string;
    genre: {
        _id: string;
        name: string;
    }
    cast: string[];
    director: string;
    image: {
        public_id: string;
        url: string;
    };
    trailer: string;
    duration: number;
    createdAt: string;
    updatedAt: string;
}
