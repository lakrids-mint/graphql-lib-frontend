export default interface Author {
    name: string,
    born?: number,
    id: number,
    bookCount: number

}


export default interface Book {
    title: string,
    author: string,
    published: number,
    genres: string[]
}