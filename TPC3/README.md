---
title: TPC3
date: 2024-03-04
authorId: A100604
authorName: Afonso Oliveira e Silva
ucSigla: EW
ucNome: Engenharia Web
---

# TPC3

## Resultados
- Normalização de um dataset (*script.py*)
- Criação de páginas com dados retirados de uma API de dados
- Interligações entre as páginas criadas
- Serviço que responde às seguintes rotas:
  - /filmes
  - /filmes/*idFilme*
  - /generos
  - /generos/*idGenero*
  - /ator
  - /ator*idAtor*

## Compilar
**Terminal:** [^1]
```
python3 script.py
```
```
json-server --watch filmesModified.json
```
```
node servidor.js
```
**Browser:**
```
http://localhost:2702/
```
[^1]: Executar os 2 últimos comandos em 2 terminais **separados**.
Parar os processos com *CTRL+C*.