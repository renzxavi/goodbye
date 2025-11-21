const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const curTime = document.getElementById("curTime");
const durTime = document.getElementById("durTime");
const playlistDiv = document.getElementById("playlist");
const loopToggle = document.getElementById("loopToggle");

const coverImg = document.getElementById("coverImg");
const currentTitle = document.getElementById("currentTitle");
const currentArtist = document.getElementById("currentArtist");

const lyricsBtn = document.getElementById("lyricsBtn");

// 🚨 ELEMENTOS DEL MODAL 🚨
const lyricsModalElement = document.getElementById('lyricsModal');
const lyricsContent = document.getElementById("lyricsContent"); 
const lyricsModalTitle = document.getElementById('lyricsModalLabel');

// *** DATOS DE CANCIONES ***
const songs = [
  {
    title: "Vamos a bailar",
    artist: "Quinto año",
    url: "assets/song1.mp3",
    cover: "https://picsum.photos/300?1",
    lyrics: "\nVerso 1\nMario se tiene que ir\nporque el hielo se va\na derretir y todos se van a arrepentir\nMario se fue a un bar\ny se encontró con una muchacha\nque estaba sentada en la barra\ntomando una piña colada.\n\nEstribillo\nEl profe, el profe es genial,\nsabe de computadoras y más y más,\ny toca la guitarra muy genial.\n\nVamos a bailar,\nvamos a bailar,\ny vamos a cantar,\nporque este año\nse va a acabar\ncon este ritmazo.\nporque el año se va a acabar\ny la gente va a explotar.\nporque este año se va a acabar,\ncon este ritmazo nos despedimos\nde este año que se va a llevar\nnuestros recuerdos con un solo año.\ny con este año nos despedimos.\n\nVerso 2\nPepe es fanático por\ndormir en el dormitorio y ático,\ny famoso por estar en el ático,\nel día que se salió,\nnadie lo reconoció,\npero a él no le importó.\n\nVerso 3\nLos derechos de los niños: alimentación,\nun hogar, no trabajar y demás,\nnecesitan estudiar.\n\nVerso 4\nUn día te conocí y supe\nque eras la persona perfecta que me iba a ayudar\na poder curar lo que me hicieron con una canción,\ncomo la que escribiste,\ny se me curó el corazón.\n\nVerso 5\nHoy escribo una canción para mi corazón,\ncuando llueve y hace sol\ny pienso que ya nada es como antes,\nme olvido de quién soy\n\nVerso 6\nHoy escribo una canción para mi corazón,\ncuando llueve y hace sol\ny pienso que ya nada es como antes,\nme olvido de quién soy\ny la verdad es que todo\npuede cambiar, pese a lo que pese,\nlos recuerdos… yeaa.\n"
  },
  {
    title: "",
    artist: "",
    url: "song2.mp3",
    cover: "https://picsum.photos/300?2",
    lyrics: "", 
  },
  {
    title: "",
    artist: "",
    url: "song3.mp3",
    cover: "https://picsum.photos/300?3",
    lyrics: null
  }
];

let index = 0;

/* Cargar playlist */
songs.forEach((s, i) => {
  const div = document.createElement("div");
  div.innerText = s.title + " — " + s.artist;
  div.onclick = () => loadSong(i, true);
  playlistDiv.appendChild(div);
});

function loadSong(i, play = false) {
  index = i;
  audio.src = songs[i].url;
  currentTitle.textContent = songs[i].title;
  currentArtist.textContent = songs[i].artist;
  coverImg.src = songs[i].cover;

  // 🚨 NUEVO: Actualizar la letra del modal con saltos de línea reales
  updateLyrics(songs[i].lyrics, songs[i].title);

  if (play) {
    audio.play().then(() => {
      playBtn.innerHTML = `<i class="bi bi-pause-fill"></i>`;
    }).catch(error => {
      console.warn("La reproducción falló:", error.message);
      playBtn.innerHTML = `<i class="bi bi-play-fill"></i>`;
    });
  } else {
    playBtn.innerHTML = `<i class="bi bi-play-fill"></i>`;
  }
}

// 🚨 FUNCIÓN PARA ACTUALIZAR LETRAS (REEMPLAZA SALTOS DE LÍNEA)
function updateLyrics(text, title) {
  if (!text) {
    lyricsContent.innerHTML = "Letra no disponible para esta canción.";
  } else {
    lyricsContent.innerHTML = text.replace(/\n/g, "<br>");
  }

  lyricsModalTitle.textContent = `${title || "Sin Título"}`;
  lyricsContent.scrollTop = 0;
}

/* Reproducción y Controles */
playBtn.onclick = () => {
  if ((!audio.src || audio.paused) && audio.currentTime === 0) {
    loadSong(index, true);
    return;
  }

  if (audio.paused) {
    audio.play().then(() => {
      playBtn.innerHTML = `<i class="bi bi-pause-fill"></i>`;
    });
  } else {
    audio.pause();
    playBtn.innerHTML = `<i class="bi bi-play-fill"></i>`;
  }
};

prevBtn.onclick = () => {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index, true);
};

nextBtn.onclick = () => {
  index = (index + 1) % songs.length;
  loadSong(index, true);
};

audio.addEventListener("timeupdate", () => {
  progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";

  curTime.textContent = format(audio.currentTime);
  if (isNaN(audio.duration)) {
    durTime.textContent = "0:00";
  } else if (durTime.textContent === "0:00" && isFinite(audio.duration)) {
    durTime.textContent = format(audio.duration);
  }
});

audio.addEventListener("ended", () => {
  if (!audio.loop) {
    nextBtn.click();
  }
});

/* Click en barra de progreso */
progressBar.onclick = (e) => {
  let x = e.offsetX;
  let width = progressBar.clientWidth;
  audio.currentTime = (x / width) * audio.duration;
};

function format(sec) {
  if (isNaN(sec) || !sec || !isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  let s = Math.floor(sec % 60);
  if (s < 10) s = "0" + s;
  return `${m}:${s}`;
}

/* Loop */
loopToggle.onchange = () => {
  audio.loop = loopToggle.checked;
};

// 🚨 Manejo del botón del modal
lyricsModalElement.addEventListener("show.bs.modal", () => {
  lyricsBtn.classList.add("is-open");
});

lyricsModalElement.addEventListener("hidden.bs.modal", () => {
  lyricsBtn.classList.remove("is-open");
});
