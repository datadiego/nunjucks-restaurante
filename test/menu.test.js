import { describe, it, expect } from 'vitest'
import { menu } from '../menu.js'

describe('menu', () => {
  it('debe ser un array', () => {
    expect(Array.isArray(menu)).toBe(true)
  })

  it('debe tener 4 categorías', () => {
    expect(menu.length).toBe(4)
  })

  it('cada categoría debe tener nombre y platos', () => {
    menu.forEach(categoria => {
      expect(typeof categoria.nombre).toBe('string')
      expect(Array.isArray(categoria.platos)).toBe(true)
    })
  })

  it('los platos deben tener nombre y precio', () => {
    menu.forEach(categoria => {
      categoria.platos.forEach(plato => {
        expect(typeof plato.nombre).toBe('string')
        expect(typeof plato.precio).toBe('number')
      })
    })
  })

  it('la categoría "Entrantes" debe contener "Ensalada César"', () => {
    const entrantes = menu.find(c => c.nombre === 'Entrantes')
    expect(entrantes).toBeDefined()
    const ensalada = entrantes.platos.find(p => p.nombre === 'Ensalada César')
    expect(ensalada).toBeDefined()
    expect(ensalada.precio).toBe(8.50)
  })
})
