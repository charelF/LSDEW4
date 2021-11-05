import { prefix } from "../lib/prefix"

export default function Authors() {
  const authors = [
    {
      name: "Aleksander Janczewski",
      link: "https://www.linkedin.com/in/aleksander-janczewski/",
      image: "/authors/alex.jpeg"
    },
    {
      name: "Gilles Magalhaes",
      link: "https://www.linkedin.com/in/gilles-magalhaes-ribeiro/",
      image: "/authors/gilles.jpeg"
    },
    {
      name: "Charel Felten",
      link: "https://www.linkedin.com/in/charel-felten/",
      image: "/authors/charel.jpeg"
    }
  ].map(author => ({
    ...author,
    image: prefix + author.image
  }))

  return (
    <ul className="my-8">
      {authors.map((author, idx) => (
        <li key={idx} className="block md:inline-block px-4 mb-2 md:mb-0">
          <a href={author.link} className="text-indigo-400 hover:text-indigo-800">
            <img src={author.image} className="inline-block h-8 w-8 rounded-full ring-2 ring-white" />
            <span className="pl-3 font-medium">{author.name}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}