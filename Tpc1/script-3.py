import xml.etree.ElementTree as ET
import shutil
import os
import re

html = """
<!DOCTYPE html>
<html>
<head>
    <title>TPC1 - EngWeb2024</title>
    <meta charset="UTF-8"/>
    <link rel="stylesheet" href="page_style.css">
</head>
<body>
"""

template = html

html += "\t<ul>\n"

# Verificar se existe a diretoria e elimina a mesma caso exista
if os.path.exists("htmlRuas"):
    shutil.rmtree("htmlRuas")
os.mkdir("htmlRuas")

# Caminho até aos ficheiros xml, encontram-se 2 diretorias a cima
directoryPath = '../../MapaRuas-materialBase/texto/'

listaRuas = []

# Processa o texto e destaca os elementos necessários
def processText(elem):
    text = ""
    if elem.text:
        text += elem.text
    for child in elem:
        if child.tag in ['data','entidade','lugar']:
            text += f"<b>{child.text}</b>"
        elif child.tag == 'para':
            text += processText(child)
        else:
            text += child.text if child.text else ''
        
        if child.tail:
            text += child.tail

    return text

for filename in os.listdir(directoryPath):
    nomeRuaSemEspacos = filename[7:-4]
    nomeRua = ' '.join(re.findall('[A-Z][^A-Z]*', filename[7:-4])) # Remover o MRB-XX e o .xml
    listaRuas.append(nomeRua)
    filePath = os.path.join(directoryPath, filename)
    
    tree = ET.parse(filePath)
    root = tree.getroot()

    meta = root.find('meta')
    corpo = root.find('corpo')
    listaCasas = corpo.find('lista-casas')

    # Criar página html para cada uma delas com conteúdo
    templateRua = template
    numeroRua = meta.find('número').text
    templateRua += f"\t<h1>Rua {numeroRua}: {meta.find('nome').text}</h1>\n"
    templateRua += f"\t<h2>Descrição</h2>\n"
    for paragrafos in corpo.findall('para'):
        texto = processText(paragrafos)
        templateRua += f"\t<p>{texto}</p>\n"
    templateRua += f"\t<h2>Imagens</h2>\n"
    for figura in corpo.findall('figura'):
        figuraPath = figura.find('imagem').get('path')[3:]
        templateRua += f"\t<img src='../../../MapaRuas-materialBase/{figuraPath}' style='max-height: 400px;'>\n"
        templateRua += f"\t<p>{figura.find('legenda').text}</p>\n"
    directoryFotoAtual = "../../MapaRuas-materialBase/atual/"
    for filename in os.listdir(directoryFotoAtual):
        if numeroRua in filename:
            print(filename)
            templateRua += f"\t<img src='../../../MapaRuas-materialBase/atual/{filename}' style='max-height: 400px;'>\n"
    templateRua += f"\t<h2>Lista de casas</h2>\n"
    if listaCasas is not None:
        for casa in listaCasas.findall('casa'):
            casa_numero = casa.find('número').text if casa.find('número') is not None else "N/A"
            enfiteuta = casa.find('enfiteuta').text if casa.find('enfiteuta') is not None else "N/A"
            foro = casa.find('foro').text if casa.find('foro') is not None else "N/A"
            if casa.find('desc') is not None:
                desc = processText(casa.find('desc'))
            else:
                desc = "N/A"

            templateRua += f"\t<p><b>Casa número: </b> {casa_numero}</p>\n"
            templateRua += f"\t<p><b>Enfiteuta: </b> {enfiteuta}</p>\n"
            templateRua += f"\t<p><b>Foro: </b> {foro}</p>\n"
            templateRua += f"\t<p><b>Descrição: </b> {desc}</p>\n"
    else:
        templateRua += "<p>N/A</p>\n"
    templateRua += f"\t<h5><a href='../ruasBraga.html'>Voltar</a><h5>\n"
    templateRua += "</body>\n"
    templateRua += "</html>"

    fileCidade = open(f"htmlRuas/{nomeRuaSemEspacos}.html", "w", encoding="utf-8")
    fileCidade.write(templateRua)
    fileCidade.close()

for elem in listaRuas: # ou sorted(listaRuas):
    nomeSemEspaços = elem.replace(" ","")
    html += f"\t\t<li><a href='htmlRuas/{nomeSemEspaços}.html'>{elem}</a></li>\n"

html += "\t<ul>\n"

html += "</body>\n"
html += "</html>"

file = open("ruasBraga.html", "w", encoding="utf-8")
file.write(html)
file.close()