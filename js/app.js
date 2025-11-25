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
          title: "Dale alegría Peñarol",
          artist: "Cuarto año",
          url: "./assets/song1.mp3",
          cover: "./assets/2.jpeg",
          lyrics: "Estrofa 1\nDale alegría, alegría a mi corazón\nla Copa Libertadores es mi ascensión\ntenés que dejarlo todo por Peñarol\ntenés que dejar el alma y el corazón.\n\nEstrofa 2\ny ya verás,\nla Copa Libertadores vamos a ganar\nporque no somos como los de Nacional.\n\n(x2)"        },
        {
          title: "Mejor amiga",
          artist: "Cuarto año",
          url: "./assets/song2.mp3",
          cover: "./assets/1.jpeg",
          lyrics: "Estribillo 1\nNunca me rendiré,\nsiempre estaré para ti\npara lo que necesites\nnunca me rendiré.\n\nEstribillo\nNo eres de mi sangre y pareces\nmi hermanita,\neres la más leal, no me dices mentiras,\nsientes lo que siento y más si me lastiman,\nmejor amiga. \n(x2)\n\nEstribillo 3\nEres leal y no me dices mentiras,\nlo que sientes yo siento, mejor amiga.\nNunca me rendiré, siempre estaré para ti\nporque eres mi mejor amiga."
        }
      ],
      group5: [
        {
          title: "Nos despedimos",
          artist: "Quinto año",
          url: "./assets/song3.mp3",
          cover: "./assets/10.jpeg",
          lyrics: "Estrofa 1\nMario se tiene que ir\nporque el hielo se va a derretir\ny todos se van a arrepentir.\nMario se fue a un bar\ny se encontró con una muchacha\nque estaba sentada en la barra\ntomando una piña colada.\n\nEstribillo\nEl profe, el profe es genial\nsabe de computadoras y más y más\ny toca la guitarra muy genial.\nVamos a bailar,\nvamos a bailar\ny vamos a cantar\nporque este año se va a acabar,\ncon este ritmazo nos despedimos\nde este año que se va a llevar\nnuestros recuerdos con un solo año\ny con este año nos despedimos.\n\nEstrofa 2\nPepe es fanático por dormir en el dormitorio y ático\ny famoso por estar en el ático,\nel día que se salió nadie lo reconoció\npero a él no le importó.\n\nEstrofa 3\nLos derechos de los niños: alimentación,\nun hogar, no trabajar y demás,\nnecesitan estudiar.\n\nEstribillo\nEl profe, el profe es genial\nsabe de computadoras y más y más\ny toca la guitarra muy genial.\nVamos a bailar,\nvamos a bailar\ny vamos a cantar\nporque este año se va a acabar,\ncon este ritmazo nos despedimos\nde este año que se va a llevar\nnuestros recuerdos con un solo año\ny con este año nos despedimos."
        },
        {
          title: "Hoy escribo una canción",
          artist: "Quinto año",
          url: "./assets/song4.mp3",
          cover: "./assets/8.jpeg",
          lyrics: "Estrofa 1\nUn día te conocí y supe que\neras la persona perfecta que me iba\na poder curar lo que me hicieron\ncon una canción como la que me escribiste\ny me curó el corazón.\n\nEstribillo\nHoy escribo una canción para mi corazón\ncuando llueve y hace sol y pienso que ya nada\nes como antes.\n\nEstrofa 2\nMe olvido de quién soy y la verdad es que todo puede cambiar,\npase lo que pase los recuerdos se van. Yeah!\n\nUn día te conocí y supe que\neras la persona perfecta que me iba\na poder curar el corazón.\n\nEstribillo\nHoy te escribo una canción para mi corazón\ncuando llueve y hace sol y pienso que ya nada\nes como antes."
        }
      ],
      group6: [
        {
          title: "La prueba",
          artist: "Sexto año",
          url: "./assets/song5.mp3",
          cover: "./assets/6.jpeg",
          lyrics: "Estrofa 1\nLa clase se desespera\ncuando la maestra dice ‘prueba’,\nsacamos todo bajo y repetimos todo el año.\n\nEstrofa 2\nLa directora se quiere marchar\ncuando llegamos todos a molestar.\n\nEstrofa 3\nA la cuenta de una llegamos a primero,\npero no sé cómo pasamos de quinto a sexto.\n\n(x2)\n\nCoro\nEstos momentos que pasamos\npronto se van a acabar."
        },
        {
          title: "La fiesta del pop",
          artist: "Sexto año",
          url: "./assets/song6.mp3",
          cover: "./assets/11.jpeg",
          lyrics: "Estrofa 1\nMariana se tiene que ir\nporque el hielo se va a derretir\ny todos se van a arrepentir.\nMariana se fue a un bar\ny se encontró con un muchacho\nque estaba sentado en la barra\ntomando una piña colada.\n\nEstrofa 2\nYa casi van dos días y no va a dormir.\nCuando llega el viernes ella quiere salir,\nno pasa el mareo y ella quiere más;\ncon sus amigas\nse van a festejar."
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