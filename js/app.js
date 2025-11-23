const audio = document.getElementById("audio");
    const playBtn = document.getElementById("playBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const loopBtn = document.getElementById("loopBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const progress = document.getElementById("progress");
    const progressBar = document.getElementById("progressBar");
    const curTime = document.getElementById("curTime");
    const durTime = document.getElementById("durTime");

    const coverImg = document.getElementById("coverImg");
    const currentTitle = document.getElementById("currentTitle");
    const currentArtist = document.getElementById("currentArtist");
    const lyricsContent = document.getElementById("lyricsContent");
    const lyricsModalLabel = document.getElementById("lyricsModalLabel");

    const playlistGroup4 = document.getElementById("playlist-group4");
    const playlistGroup5 = document.getElementById("playlist-group5");
    const playlistGroup6 = document.getElementById("playlist-group6");

    // Datos de canciones por grupo
    const songs = {
      group4: [
        {
          title: "Vamos a bailar",
          artist: "Quinto año",
          url: "./assets/song1.mp3",
          cover: "./assets/2.jpeg",
          lyrics: "Verso 1\nMario se tiene que ir\nporque el hielo se va\na derretir y todos se van a arrepentir\n\nEstribillo\nEl profe, el profe es genial,\nsabe de computadoras y más y más,\ny toca la guitarra muy genial.\n\nVamos a bailar,\nvamos a bailar,\ny vamos a cantar..."
        },
        {
          title: "Canción 2 - Grupo 4",
          artist: "Grupo 4",
          url: "./assets/song2-g4.mp3",
          cover: "./assets/1.jpeg",
          lyrics: "Letra de la segunda canción del Grupo 4..."
        }
      ],
      group5: [
        {
          title: "Canción 1 - Grupo 5",
          artist: "Grupo 5",
          url: "./assets/song1-g5.mp3",
          cover: "./assets/10.jpeg",
          lyrics: "Letra de la primera canción del Grupo 5..."
        },
        {
          title: "Canción 2 - Grupo 5",
          artist: "Grupo 5",
          url: "./assets/song2-g5.mp3",
          cover: "./assets/8.jpeg",
          lyrics: "Letra de la segunda canción del Grupo 5..."
        }
      ],
      group6: [
        {
          title: "La prueba",
          artist: "Sexto año",
          url: "./assets/song2.mp3",
          cover: "./assets/6.jpeg",
          lyrics: "Letra de la primera canción del Grupo 6..."
        },
        {
          title: "Canción 2 - Grupo 6",
          artist: "Grupo 6",
          url: "./assets/song2-g6.mp3",
          cover: "./assets/11.jpeg",
          lyrics: "Letra de la segunda canción del Grupo 6..."
        }
      ]
    };

    let allSongs = [];
    let index = 0;

    // Cargar playlists
    function loadPlaylists() {
      Object.keys(songs).forEach((group, groupIndex) => {
        const container = group === 'group4' ? playlistGroup4 : 
                         group === 'group5' ? playlistGroup5 : playlistGroup6;
        
        songs[group].forEach((song, i) => {
          const songIndex = allSongs.length;
          allSongs.push(song);
          
          const div = document.createElement("div");
          div.className = "playlist-item";
          div.innerHTML = `<i class="bi bi-music-note-beamed"></i> ${song.title} — ${song.artist}`;
          div.onclick = () => loadSong(songIndex, true);
          container.appendChild(div);
        });
      });
    }

    function loadSong(i, play = false) {
      index = i;
      const song = allSongs[i];
      audio.src = song.url;
      currentTitle.textContent = song.title;
      currentArtist.textContent = song.artist;
      coverImg.src = song.cover;

      updateLyrics(song.lyrics, song.title);

      if (play) {
        audio.play().then(() => {
          playBtn.innerHTML = `<i class="bi bi-pause-fill"></i>`;
        }).catch(() => {
          playBtn.innerHTML = `<i class="bi bi-play-fill"></i>`;
        });
      } else {
        playBtn.innerHTML = `<i class="bi bi-play-fill"></i>`;
      }
    }

    function updateLyrics(text, title) {
      if (!text) {
        lyricsContent.innerHTML = "Letra no disponible para esta canción.";
      } else {
        lyricsContent.innerHTML = text.replace(/\n/g, "<br>");
      }
      lyricsModalLabel.textContent = `🎤 ${title || "Sin Título"} 🎤`;
      lyricsContent.scrollTop = 0;
    }

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
      index = (index - 1 + allSongs.length) % allSongs.length;
      loadSong(index, true);
    };

    nextBtn.onclick = () => {
      index = (index + 1) % allSongs.length;
      loadSong(index, true);
    };

    loopBtn.onclick = () => {
      audio.loop = !audio.loop;
      loopBtn.classList.toggle("active");
    };

    downloadBtn.onclick = () => {
      const song = allSongs[index];
      if (!song || !song.url) {
        alert("⚠️ No hay ninguna canción seleccionada");
        return;
      }
      
      const a = document.createElement("a");
      a.href = song.url;
      a.download = `${song.title} - ${song.artist}.mp3`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Animación de confirmación
      downloadBtn.style.transform = "scale(1.3) rotate(360deg)";
      setTimeout(() => {
        downloadBtn.style.transform = "";
      }, 500);
    };

    audio.addEventListener("timeupdate", () => {
      progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
      curTime.textContent = format(audio.currentTime);
      if (isFinite(audio.duration)) {
        durTime.textContent = format(audio.duration);
      }
    });

    audio.addEventListener("ended", () => {
      if (!audio.loop) {
        nextBtn.click();
      }
    });

    progressBar.onclick = (e) => {
      const x = e.offsetX;
      const width = progressBar.clientWidth;
      audio.currentTime = (x / width) * audio.duration;
    };

    function format(sec) {
      if (isNaN(sec) || !isFinite(sec)) return "0:00";
      const m = Math.floor(sec / 60);
      let s = Math.floor(sec % 60);
      if (s < 10) s = "0" + s;
      return `${m}:${s}`;
    }

    loadPlaylists();