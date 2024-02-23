import json

def generate_city_index(json_file, output_index_file, output_city_files_dir):
    with open(json_file, 'r') as f:
        data = json.load(f)

    # Retira as conecções de cada cidade usando os codigos (c30:['c96', 'c88', 'c53',...])
    connections = {}
    for connection in data.get('ligacoes', []):
        origem_id = connection['origem']
        destino_id = connection['destino']
        if origem_id not in connections:
            connections[origem_id] = []
        connections[origem_id].append(destino_id)
    
    print(connections)

    with open(output_index_file, 'w') as index_file:
        index_file.write('<!DOCTYPE html>\n')
        index_file.write('<html>\n')
        index_file.write('<head>\n')
        index_file.write('<title>City Index</title>\n')
        index_file.write('<meta charset="UTF-8"/>\n')
        index_file.write('<link rel="stylesheet" href="miestilo.css">\n')
        index_file.write('</head>\n')
        index_file.write('<body>\n')
        index_file.write('<h1>City Index</h1>\n')
        index_file.write('<ul>\n')
        
        for city in data['cidades']:
            city_filename = f"{city['id']}.html"
            with open(f"{output_city_files_dir}/{city_filename}", 'w') as city_file:
                city_file.write('<!DOCTYPE html>\n')
                city_file.write('<html>\n')
                city_file.write('<head>\n')
                city_file.write(f'<title>{city["nome"]}</title>\n')
                city_file.write('<meta charset="UTF-8"/>\n')
                city_file.write('<link rel="stylesheet" href="mystyle.css">\n')
                city_file.write('</head>\n')
                city_file.write('<body>\n')
                city_file.write(f'<h1>{city["nome"]}</h1>\n')
                city_file.write('<p><strong>Population:</strong> {}</p>\n'.format(city["população"]))
                city_file.write('<p><strong>District:</strong> {}</p>\n'.format(city["distrito"]))
                city_file.write('<p><strong>Descrição:</strong> {}</p>\n'.format(city.get("descrição", "")))
                
                if city['id'] in connections:
                    city_file.write('<p><strong>Connections:</strong></p>\n')
                    city_file.write('<ul>\n')
                    for connection_id in connections[city['id']]:
                        connected_city = next((c for c in data['cidades'] if c['id'] == connection_id), None)
                        connected_city_filename = f"{connected_city['id']}.html"
                        print(connected_city)
                        if connected_city:
                            city_file.write(f'<li><a href="http://localhost:7777/{connected_city["id"]}">{connected_city["nome"]}</a></li>\n\n')
                    city_file.write('</ul>\n')
                    
                    
                city_file.write('<a href="http://localhost:7777/">Back to index</a>\n')  # Adjusted link
                city_file.write('</body>\n')
                city_file.write('</html>\n')
            print(city_filename)
            index_file.write(f'<li><a href="http://localhost:7777/{city["id"]}">{city["nome"]}</a></li>\n')  # Adjusted link

        index_file.write('</ul>\n')
        index_file.write('</body>\n')
        index_file.write('</html>\n')

# Usage example
generate_city_index('mapa-virtual.json', 'city_index.html', 'city_details')
