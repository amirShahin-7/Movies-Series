import React from 'react'

const MoviesOnDesktop = () => {
    const movieList = [
        {
          title: 'Breaking Bad',
          coverImage: 'https://image.tmdb.org/t/p/w500/8X99k4D1QZAwjXwgs9PzRH3kQMG.jpg',
          genre: 'Drama',
          rating: '9.5',
          shortDescription: 'A high school chemistry teacher turned methamphetamine manufacturer faces tough challenges in a dangerous world.',
        },
        {
          title: 'Stranger Things',
          coverImage: 'https://image.tmdb.org/t/p/w500/4IRG91LPJlW73AaG13A6Pdt0xG2.jpg',
          genre: 'Sci-Fi',
          rating: '8.7',
          shortDescription: 'A group of young friends uncover a series of supernatural mysteries while trying to find their missing friend.',
        },
        {
          title: 'The Crown',
          coverImage: 'https://image.tmdb.org/t/p/w500/o6XbV0bg8RwiR8btjPfRDiwUuOX.jpg',
          genre: 'History',
          rating: '8.6',
          shortDescription: 'The reign of Queen Elizabeth II unfolds, following her transformation from princess to powerful monarch and leader of the Commonwealth.',
        },
        {
          title: 'Money Heist',
          coverImage: 'https://image.tmdb.org/t/p/w500/qWdxNn4kKpD9q0e6RLOd2fN6Kn9.jpg',
          genre: 'Thriller',
          rating: '8.3',
          shortDescription: 'A group of robbers carry out a series of meticulously planned heists while trying to avoid being captured by the police.',
        },
        {
          title: 'The Witcher',
          coverImage: 'https://image.tmdb.org/t/p/w500/kJbTzdlhzY03U0KT1J8aPp9UKFb.jpg',
          genre: 'Fantasy',
          rating: '8.1',
          shortDescription: 'The story of Geralt of Rivia, a monster hunter, navigating a world filled with political intrigue and deadly creatures.',
        },
      ];
  return (
    <div className="px-6 py-12 bg-[#F4F6F9]">
    <h2 className="text-3xl font-bold text-[#3D52A0] mb-8">Popular Series</h2>
    <div className="flex flex-wrap justify-evenly gap-6">
      {movieList.map((series, index) => (
        <div key={index} className="group relative w-full max-w-xs flex-shrink-0 transition-transform transform hover:scale-110">
          <div className="bg-[#EDE8F5] rounded-xl overflow-hidden shadow-lg cursor-pointer">
            <img
              src={series.coverImage}
              alt={series.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-[#3D52A0] truncate">{series.title}</h3>
              <div className="flex justify-between text-sm text-[#8697C4] mt-2">
                <span>{series.genre}</span>
                <span>{series.rating}</span>
              </div>
              <p className="text-sm text-[#3D52A0] mt-2 line-clamp-2">{series.shortDescription}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default MoviesOnDesktop