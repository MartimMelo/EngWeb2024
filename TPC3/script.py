import json

movies = []
genres = set()
cast = set()

with open('filmes.json', 'r') as jsonFile:
    for line in jsonFile:
        line = json.loads(line)

        lineCast = line.get('cast', [])
        lineGenres = line.get('genres', [])

        movieData = {
            'id' : line['_id']['$oid'],
            'title' : line['title'],
            'year' : line['year'],
            'cast' : lineCast,
            'genres' : lineGenres
        }
        movies.append(movieData)

        cast.update(lineCast)
        genres.update(lineGenres)

finalStructure = {
    'movies' : movies,
    'genres' : sorted(list(genres)),
    'cast' : sorted(list(cast))
}
    

with open('filmesModified.json', 'w') as jsonFile:
    json.dump(finalStructure, jsonFile, indent=2)