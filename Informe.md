"Argentina Vacuna", en una aplicación para realizar la trazabilidad de las vacunas adquiridas y distribuidas por el Ministerio de Salud de la Nación.

La solución permite llevar un registro de las distintas vacunas que se compran a los laboratorios, especificando datos como el tipo de vacuna, lote, fecha de vencimiento, etc. Estos lotes de vacunas se distribuyen posteriormente entre las diferentes provincias, pudiendo fraccionar un lote grande en varios envíos más pequeños con destino a múltiples provincias.

Cada provincia es responsable de recibir los lotes, almacenarlos correctamente y distribuirlos a los diferentes centros de vacunación bajo su jurisdicción. En dichos centros se registra finalmente la aplicación de cada dosis a un paciente en particular.

El sistema tabmien contempla la trazabilidad de eventuales pérdidas por mal estado, vencimientos o descartes, permitiendo registrar estas situaciones en cualquier etapa del proceso. Asimismo se pueden realizar reasignaciones entre centros vacunatorios coordinados por una misma provincia.

Por último, la solución brinda reportes estadísticos de utilidad para la gestión de las autoridades sanitarias, como ser stock disponible por provincia y tipo de vacuna, dosis aplicadas por localidad y tipo, personas que recibieron vacunas vencidas, entre otros.

> Capacidades del sistema: 

1. Registro de compras de vacunas:
- Permite ingresar partidas de vacunas adquiridas especificando datos como el laboratorio, tipo de vacuna, lote, fecha de vencimiento, cantidad, etc.
2. Distribución de vacunas:
- Registra la distribución de lotes de vacunas a las diferentes provincias.
- Permite fraccionar un lote grande en varios envíos más pequeños con destino a distintas provincias.
3. Gestión de inventario provincial:
- Cada provincia lleva el registro y trazabilidad de las vacunas que recibe.
- Registro de la recepción, almacenamiento, distribución a centros y descartes de vacunas.
4. Registro de aplicación de vacunas:
- Los centros de vacunación registran la aplicación de cada dosis a una persona en particular.
5. Reasignación de vacunas entre centros:
- Las provincias pueden registrar reasignaciones de partidas de vacunas entre sus distintos centros de vacunación.
6. Generación de reportes:
- Reportes estadísticos como vacunas compradas por laboratorio, stock por provincia, dosis aplicadas por localidad, personas con vacunas vencidas, etc.
7. Registro de descartes de vacunas:
- Permite registrar vacunas perdidas, vencidas o descartadas en cualquier etapa del proceso (depósito nación, depósito provincial y centros de vacunación).
- Captura información relevante de los descartes como fecha, motivo, responsable, etc.

> Instalación

Para instalar la aplicación, primero debe clonar el repositorio donde esta la aplicacion:

```bash
git clone https://github.com/usuario/mi-app.git
```

Luego accede al directorio de la aplicación:
```bash
cd mi-app
```
Instalar las dependencias npm:
```bash
npm install
```
Asegúrate de tener Node.js instalado en tu máquina. Luego para ejecutar la aplicación, utiliza el siguiente comando:

```bash
npm start
```

Esto iniciará el servidor Node con Express en http://localhost:8000
Antes de iniciar, asegúrate de tener MySQL instalado y haber importado la base de datos, ya que la aplicación lo necesita para funcionar.

> Listado de problemas surgidos durante el desarrollo;

### Trazabilidad de lotes fraccionados
- Problema: Era complejo hacer seguimiento cuando un lote se dividía en varios envíos más pequeños.
- Solución: Se implementó una estructura jerárquica de lotes y derivados vinculados.
### Restricción de acceso a funciones
- Problema: Cualquier usuario podía realizar cualquier operación sin control.
- Solución: Se establecieron roles para gestionar qué perfiles de usuario pueden realizar determinadas operaciones: cargar pedidos, registrar vacunaciones, consultar datos, etc.
### Administración de vacunas vencidas
- Problema: No había controles sobre caducidad de dosis al momento de registrar aplicaciones.
- Solución: Se agregaron notificaciones para indicar la situacion añ ususario.