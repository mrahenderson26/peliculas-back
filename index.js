import express from 'express'
import cors from 'cors'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const peliculas = JSON.parse(
  readFileSync(join(__dirname, 'data', 'peliculas.json'), 'utf-8')
)

app.get('/api/peliculas', (_req, res) => {
  res.json(peliculas)
})

app.get('/api/peliculas/:titulo', (req, res) => {
  const movie = peliculas.find(
    (p) => p.titulo.toLowerCase() === req.params.titulo.toLowerCase()
  )

  if (!movie) {
    return res.status(404).json({ error: 'Película no encontrada' })
  }

  res.json(movie)
})

app.listen(PORT, () => {
  console.log(`API disponible en http://localhost:${PORT}/api/peliculas`)
})