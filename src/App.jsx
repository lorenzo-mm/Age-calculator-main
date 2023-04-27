import { useState } from 'react'
import './App.css'
import Arrow from '../assets/images/icon-arrow.svg'

export default function App () {
  const [fechaNacimiento, setFechaNacimiento] = useState({ dia: '', mes: '', año: '' })
  const [edad, setEdad] = useState(null)
  const [historial, setHistorial] = useState([])
  const [errorDia, setErrorDia] = useState(null)
  const [errorMes, setErrorMes] = useState(null)
  const [errorAño, setErrorAño] = useState(null)

  function calcularEdad () {
    // Verificar si se ha ingresado una fecha de nacimiento válida
    let hayErrores = false
    const errores = {}
    if (fechaNacimiento.dia === '' || fechaNacimiento.dia < 1 || fechaNacimiento.dia > 31) {
      errores.dia = 'Please enter a valid day'
      hayErrores = true
    }
    if (fechaNacimiento.mes === '' || fechaNacimiento.mes < 1 || fechaNacimiento.mes > 12) {
      errores.mes = 'Please enter a valid month'
      hayErrores = true
    }
    const añoActual = new Date().getFullYear()
    if (fechaNacimiento.año === '' || fechaNacimiento.año < 1900 || fechaNacimiento.año > añoActual) {
      errores.año = 'Please enter a valid year'
      hayErrores = true
    }
    if (hayErrores) {
      setEdad('-- years, -- months, -- days')
      setErrorDia(errores.dia || null)
      setErrorMes(errores.mes || null)
      setErrorAño(errores.año || null)
      return
    }

    // Convertir la fecha de nacimiento a un objeto de tipo Date
    const fechaNacimientoObj = new Date(`${fechaNacimiento.año}-${fechaNacimiento.mes}-${fechaNacimiento.dia}`)

    // Verificar si la fecha de nacimiento es inválida
    if (fechaNacimientoObj > new Date() || isNaN(fechaNacimientoObj)) {
      // Asignar un valor predeterminado de dos guiones si la fecha de nacimiento es inválida
      setEdad('-- years, -- months, -- days')
      setErrorDia('Please enter a valid day')
      setErrorMes('Please enter a valid month')
      setErrorAño('Please enter a valid year')
      return
    }

    // Verificar si el día, mes y año son menores que 1, 1 y 1900, respectivamente
    const diaNacimiento = fechaNacimientoObj.getDate() < 1 ? '--' : fechaNacimientoObj.getDate()
    const mesNacimiento = (fechaNacimientoObj.getMonth() + 1) < 1 ? '--' : (fechaNacimientoObj.getMonth() + 1) // Los meses en JavaScript van de 0 a 11, por lo que sumamos 1
    const añoNacimiento = fechaNacimientoObj.getFullYear() < 1900 ? '--' : fechaNacimientoObj.getFullYear()

    // Obtener la fecha actual
    const hoy = new Date()

    // Obtener el día, mes y año de la fecha actual
    const diaActual = hoy.getDate()
    const mesActual = hoy.getMonth() + 1 // Los meses en JavaScript van de 0 a 11, por lo que sumamos 1

    // Calcular la diferencia entre las dos fechas en milisegundos
    const diferenciaMs = hoy - fechaNacimientoObj

    // Convertir la diferencia a días
    const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24))

    // Calcular los años, meses y días a partir de la diferencia en días
    const años = Math.floor(diferenciaDias / 365)
    const meses = Math.floor((diferenciaDias % 365) / 30)
    const dias = Math.floor((diferenciaDias % 365) % 30)

    // Actualizar el estado de la edad
    setEdad(`${años} years, ${meses} months, ${dias} days`)

    // Actualizar el estado del historial
    setHistorial([...historial, { fecha: `${fechaNacimiento.dia}/${fechaNacimiento.mes}/${fechaNacimiento.año}`, edad: `${años} years, ${meses} months, ${dias} days` }])
  }

  return (
    <>
      <main>
        <div className='container'>
          <div>

            <form className='form'>
              <div className='input-container'>
                <div className='input-label'>DAY</div>
                <input
                  type='number'
                  className={`input ${errorDia ? 'error' : ''}`}
                  placeholder='01'
                  min='1'
                  max='31'
                  value={fechaNacimiento.dia}
                  onChange={(e) => setFechaNacimiento({ ...fechaNacimiento, dia: e.target.value })}
                />
                {errorDia && <div className='error-message'>{errorDia}</div>}
              </div>
              <div className='input-container'>
                <div className='input-label'>MONTH</div>
                <input
                  type='number'
                  className={`input ${errorMes ? 'error' : ''}`}
                  placeholder='04'
                  min='1'
                  max='12'
                  value={fechaNacimiento.mes}
                  onChange={(e) => setFechaNacimiento({ ...fechaNacimiento, mes: e.target.value })}
                />
                {errorMes && <div className='error-message'>{errorMes}</div>}
              </div>
              <div className='input-container'>
                <div className='input-label'>YEAR</div>
                <input
                  type='number'
                  className={`input ${errorAño ? 'error' : ''}`}
                  placeholder='1988'
                  min='1900'
                  max={new Date().getFullYear()}
                  value={fechaNacimiento.año}
                  onChange={(e) => setFechaNacimiento({ ...fechaNacimiento, año: e.target.value })}
                />
                {errorAño && <div className='error-message'>{errorAño}</div>}
              </div>
            </form>

            <div className='button' type='button' onClick={calcularEdad}>
              <img className='arrow' src={Arrow} alt='arrow' />
            </div>
            <div>
              <ul className='list'>
                <li>{edad ? <span className='age-number'>{edad.split(' ')[0]}</span> : '--'}  years</li>
                <li>{edad ? <span className='age-number'>{edad.split(' ')[2]}</span> : '--'}  months</li>
                <li>{edad ? <span className='age-number'>{edad.split(' ')[4]}</span> : '--'}  days</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
