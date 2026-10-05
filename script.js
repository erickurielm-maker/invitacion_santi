const CONFIG = {
    fechaBautizo: new Date(2026, 11, 5, 16, 0, 0),
    whatsapp: '522461730350',
    mensaje: '¡Hola! Confirmo mi asistencia al bautizo de Henry Santiago 👶⚡',
    nombreBebe: 'Henry Santiago',
    apellidos: 'Muñoz Sánchez',
    fecha: 'Sábado, 5 de Diciembre 2026',
    hora: '5:00 PM',
    lugar: 'Parroquia de Santa María Acuitlapilco 4:00 PM',
    direccion: 'Acuitlapilco, Tlaxcala',
    papas: 'Erick Uriel Muñoz Muñoz   &  Valeria Sánchez Muñoz',
    padrinos: 'Nelli  Cuatepotzo Sánchez',
    familia: 'Familia Muñoz Sánchez'
};

let musicaActiva = false;
const musica = document.getElementById('musica-fondo');

function toggleMusica() {
    const btn = document.getElementById('btn-musica');
    const icono = document.getElementById('icono-musica');
    if (!musica) return;
    if (musicaActiva) {
        musica.pause();
        musicaActiva = false;
        icono.textContent = '🔇';
        btn.classList.remove('reproduciendo');
        btn.title = 'Reproducir música';
    } else {
        musica.play().then(() => {
            musicaActiva = true;
            icono.textContent = '🎵';
            btn.classList.add('reproduciendo');
            btn.title = 'Pausar música';
        }).catch(() => {
            alert('⚠️ No se encontró el archivo de música.\nAsegúrate de tener "musica.mp3" en la carpeta.');
        });
    }
}

function actualizarCuentaRegresiva() {
    const ahora = new Date();
    const diferencia = CONFIG.fechaBautizo - ahora;
    if (diferencia <= 0) {
        document.getElementById('dias').textContent = '🎉';
        document.getElementById('horas').textContent = '🎉';
        document.getElementById('minutos').textContent = '🎉';
        document.getElementById('segundos').textContent = '🎉';
        return;
    }
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
    document.getElementById('dias').textContent = String(dias).padStart(2, '0');
    document.getElementById('horas').textContent = String(horas).padStart(2, '0');
    document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
    document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
}

function configurarWhatsApp() {
    const btnWhatsApp = document.getElementById('btn-whatsapp');
    if (btnWhatsApp) {
        const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.mensaje)}`;
        btnWhatsApp.href = url;
    }
}

function actualizarDatos() {
    const elementos = {
        'nombre-bebe': CONFIG.nombreBebe,
        'fecha': CONFIG.fecha,
        'hora': CONFIG.hora,
        'lugar': CONFIG.lugar,
        'direccion': CONFIG.direccion,
        'papas': CONFIG.papas,
        'padrinos': CONFIG.padrinos,
        'footer-familia': CONFIG.familia
    };
    for (const [id, valor] of Object.entries(elementos)) {
        const el = document.getElementById(id);
        if (el && valor) el.textContent = valor;
    }
    const apellidosEl = document.querySelector('.apellidos');
    if (apellidosEl) apellidosEl.textContent = CONFIG.apellidos;
}

function crearNubes() {
    const container = document.getElementById('nubes-container');
    if (!container) return;
    const nubes = ['☁️', '☁️', '☁️', '🌤️', '☁️'];
    for (let i = 0; i < 6; i++) {
        const nube = document.createElement('div');
        nube.className = 'nube';
        nube.textContent = nubes[Math.floor(Math.random() * nubes.length)];
        nube.style.top = (Math.random() * 80) + '%';
        nube.style.fontSize = (2.5 + Math.random() * 3) + 'rem';
        nube.style.animationDuration = (30 + Math.random() * 30) + 's';
        nube.style.animationDelay = (Math.random() * 20) + 's';
        container.appendChild(nube);
    }
}

function crearDecoracion() {
    const container = document.getElementById('decoracion-container');
    if (!container) return;
    const emojis = ['⚡', '✨', '⭐', '💫', '🌟', '☁️', '🤍'];
    for (let i = 0; i < 10; i++) {
        const item = document.createElement('div');
        item.className = 'decoracion-item';
        item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        item.style.left = Math.random() * 100 + '%';
        item.style.fontSize = (1 + Math.random() * 1.2) + 'rem';
        item.style.animationDuration = (10 + Math.random() * 10) + 's';
        item.style.animationDelay = (Math.random() * 15) + 's';
        container.appendChild(item);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    actualizarDatos();
    configurarWhatsApp();
    crearNubes();
    crearDecoracion();
    setInterval(() => {
        const container = document.getElementById('decoracion-container');
        if (container && container.children.length > 20) container.innerHTML = '';
        crearDecoracion();
    }, 20000);
    actualizarCuentaRegresiva();
    setInterval(actualizarCuentaRegresiva, 1000);
    setTimeout(() => {
        if (musica) {
            musica.volume = 0.4;
            musica.play().then(() => {
                musicaActiva = true;
                document.getElementById('icono-musica').textContent = '🎵';
                document.getElementById('btn-musica').classList.add('reproduciendo');
            }).catch(() => {});
        }
    }, 1000);
});

document.addEventListener('visibilitychange', function() {
    if (document.hidden && musica && musicaActiva) {
        musica.pause();
    } else if (!document.hidden && musica && musicaActiva) {
        musica.play().catch(() => {});
    }
});
