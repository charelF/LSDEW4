export default function Authors() {
  const authors = [
    {
      name: "Aleksander Janczewski",
      link: "https://www.linkedin.com/in/aleksander-janczewski/",
      image: "/LSDE_2021_W4/authors/alex.jpeg"
    },
    {
      name: "Gilles Magalhaes",
      link: "https://www.linkedin.com/in/gilles-magalhaes-ribeiro/",
      image: "/LSDE_2021_W4/authors/gilles.jpeg"
    },
    {
      name: "Charel Felten",
      link: "https://www.linkedin.com/in/charel-felten/",
      image: "/LSDE_2021_W4/authors/charel.jpeg"
    }
  ]

  return (
    <ul className="my-8">
      {authors.map((author, idx) => (
        <li key={idx} className="inline px-4">
          <a href={author.link} className="text-indigo-400 hover:text-indigo-800">
            <img src={author.image} className="inline-block h-8 w-8 rounded-full ring-2 ring-white" />
            <span className="pl-3 font-medium">{author.name}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}