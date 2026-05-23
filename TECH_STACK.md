# Ficha Técnica y Construcción: Romance Dawn Gomu Capsule 👒

Este documento detalla la arquitectura de software, tecnologías y el diseño técnico detrás de **Romance Dawn: Gomu Capsule**, un RPG de aventuras tácticas de One Piece con estilo pixel-art interactivo medieval y ambientado en la mítica base pirata y la cubierta del barco de la Capitana Alvida.

---

## 🛠️ Stack Tecnológico (The Tech Stack)

El videojuego está construido con tecnologías modernas del ecosistema web para asegurar una ejecución superfluida, animaciones físicas y una respuesta instantánea a los controles de teclado o pantallas táctiles:

1. **Framework y Compilador:**
   - **React 18** (SPA): Gestión integral de componentes encapsulados y estado declarativo sincronizado de juego.
   - **Vite**: Servidor de desarrollo super veloz y empaquetador optimizado para producción de activos estáticos.
   - **TypeScript**: Estructura de tipos estricta y segura para modelar jugadores, enemigos, celdas y eventos de mapa, minimizando bugs en tiempo de ejecución.

2. **Estilizado y Layout:**
   - **Tailwind CSS**: Utilidades CSS para construir una retícula visual y un HUD de juego altamente responsivo (adaptable de móviles a pantallas Ultra-Wide con diseño Desktop-First).
   - **Google Fonts (Inter & JetBrains Mono)**: Tipografía limpia y técnica combinada con fuentes pixel / retro para indicadores del sistema de juego.

3. **Motor de Animaciones del Grid:**
   - **Framer Motion (`motion/react`)**: Gestiona la interpolación y cinemática en tiempo real de los pasos de Luffy y los enemigos usando físicas de muelle (*spring*), animaciones de daño de pantalla temblorosa (*shake*), retroceso (*flash*), y transiciones de diálogos o interfaz flotante de combate (*floating particles*).

4. **Efectos de Audio Retro (Audio Engine):**
   - **Web Audio API**: Generador de sintetizador en tiempo real dentro del cliente que reproduce efectos sonoros de acción, daño, victoria y desbloqueo, eliminando la necesidad de descargar archivos de audio externos de gran tamaño.

---

## 🎮 Sistema de Juego y Mecánicas Clave (Core Mechanics)

### 🗺️ Inteligencia Artificial de los Enemigos (AI Intellect)
- **Modo Alerta unificado:** En cuanto Luffy sale de su barril inicial, todos los piratas de la fase entran de forma coordinada en modo **Chasing (Persecución)** en lugar de patrullar pasivamente.
- **Enrutamiento Manhattan Inteligente:** Los enemigos calculan el desplazamiento óptimo hacia Luffy en cada turno, evaluando colisiones estáticas (paredes, mástiles, cofres, barriles cerrados) y previniendo traspasar o apilarse sobre otros enemigos activos o sobre el propio Luffy.

### 🔒 Bloqueo Gradual y Progresivo de Niveles (Stage Unlock Rules)
- **Persistencia en LocalStorage:** El progreso se almacena localmente de forma segura (`romance_dawn_max_unlocked_level`).
- **Nivel en curso & Desbloqueo Riguroso:** Solo se permite avanzar, cambiar o seleccionar niveles a través de los botones de navegación si el usuario ha completado satisfactoriamente los retos del nivel previo. Los niveles futuros se muestran con un icono de candado (`🔒 Nivel Bloqueado`).

---

## 🎨 Capitana Alvida: Rediseño Visual de Alta Fidelidad

En lugar de utilizar caracteres estándar o emojis básicos, el personaje principal de la villana **Capitana Alvida** ha sido rediseñado con especificaciones directas de **gráficos vectoriales interactivos (SVG)** que rinden homenaje a su spritesheet pixel-art original:

1. **Aspecto Estructural:**
   - **Su Cabello Característico:** Diseño voluptuoso en cascada de rizos en color fucsia oscuro (`#f43f5e`/`#ec4899`) con su icónico recogido o moño alto (*top-knot ponylock*) sujetado por una cinta dorada.
   - **Atuendo de Combate:** Chaleco pirata gris azulado sin mangas con bordes dorados, pantalones grises ajustados y una gran faja o fajín marrón pirata con hebilla dorada en la cintura.

2. **La Maza de Hierro (Iron Spiked Club):**
   - Un bastón de combate metálico gigante tachonado con clavos plateados.
   - **Rotación Dinámica:** Cambia su ángulo y posición según la dirección hacia la que Alvida se esté desplazando.
   - **Swing de Combate:** Al atacar, el arma realiza un arco de barrido dinámico de 120º a 150º acompañado de un destello blanco-amarillo que indica el impacto.

3. **Retroalimentación de Daño (Getting Hit & Stunned):**
   - Al ser golpeada o aturdida (*state: 'stunned'*), sus ojos se transforman instantáneamente en círculos blancos enormes con pupilas minúsculas (ojos de asombro y pánico) replicando con exactitud la animáción cómica de la spritesheet. El componente oscila y tiembla, mostrando estrellitas mareadas orbitando sobre su cabeza (`💫 MAREADO! 💫`).
